// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { init_socket_game, socket_game } from "./Landlord/WebSocket/ws";
import { get_configs } from "./configs";
import { CLIENT_EVENT_ROOM_BASE, SERVER_EVENT_ROOM_BASE, JoinReq } from "./Landlord/Readme/SocketApiRoomBase";
import { SERVER_EVENT_GAME, HoldCardsPush, CallValuePush, GAME_STATE } from "./Landlord/Readme/SocketApiGameDDZ";
import TableRes from "./Landlord/PokerUtil/TableRes";
import Poker from "./Landlord/PokerUtil/Poker";

const { ccclass, property } = cc._decorator;

interface Choose {
    choose_start_x: number;
    choose_start_idx: number;
    choose_before: boolean[];
    cards_between: number;
}

interface Push {
    choose_cards: Set<number>;
    type: number;
    can_push: boolean;
}

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Animation)
    ani_game_start: cc.Animation = null;

    @property(cc.Node)
    btn_call_value: cc.Node = null;

    @property(cc.Node)
    btn_push_cards: cc.Node = null;

    @property(cc.Node)
    node_landlord_cards: cc.Node = null;

    @property(cc.Node)
    node_seat_left: cc.Node = null;

    @property(cc.Node)
    node_seat_rigth: cc.Node = null;

    @property(cc.Node)
    node_seat_self: cc.Node = null;

    @property(cc.Node)
    node_hold: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:


    seat_num: number = 3;
    seat_idx: number = null;
    holds: number[] = null;

    choose: Choose = null;
    push: Push = null;
    // push_cards: PushCards = null;

    onLoad() {
        /**
         * 界面
         */
        this.btn_call_value.active = false;
        this.btn_push_cards.active = false;

    }

    start() {
        // 初始化WS
        init_socket_game(get_configs().server);
        for (const key in SERVER_EVENT_GAME) {
            if (SERVER_EVENT_GAME.hasOwnProperty(key)) {
                const element = SERVER_EVENT_GAME[key];
                socket_game.add_event(element);
            }
        }

        /**
         * WS事件
         */
        socket_game.eventDispatcher.on(CLIENT_EVENT_ROOM_BASE.JOIN_RES, this.onEvent_JoinRoom, this);
        socket_game.eventDispatcher.on(CLIENT_EVENT_ROOM_BASE.START_RES, this.onEvent_GameStart, this);
        socket_game.eventDispatcher.on(SERVER_EVENT_GAME.HOLD, this.onEvent_HoldPush, this);
        socket_game.eventDispatcher.on(SERVER_EVENT_GAME.CALL, this.onEvent_CallValue, this);

        // 请求进入房间
        setTimeout(() => {
            const params: JoinReq = {
                game_name: "DDZ"
            }
            socket_game.send_msg(SERVER_EVENT_ROOM_BASE.JOIN_REQ, params);
        }, 5000);


    }

    // update (dt) {}

    /**
     * WS事件
     */
    // 玩家进入房间
    onEvent_JoinRoom(params: JoinReq) {
        cc.log(params);
    }

    onEvent_GameStart() {
        cc.log("Game start");

        if (this.ani_game_start) {
            let ani = this.ani_game_start.getComponent(cc.Animation);
            ani.play();
        }
    }

    onEvent_HoldPush(params: HoldCardsPush) {
        this.doUpdateBankerCards();
        this.doUpdateHoldsCards(params.holds, false);
        cc.log(params);
    }

    onEvent_CallValue(params: CallValuePush) {
        if (params.state != GAME_STATE.CALL) return;
        if (params.turn == this.seat_idx) {
            // this.doUpdateCallBanker(params.banker);
        } else {
            this.btn_call_value.active = false;
        }
    }
    // 玩家出牌
    // onEventPush_PushCards(params: PushCards) {
    //     cc.log("onEventPush PushCards");
    //     if (params.state != GAME_STATE.PLAY) return;
    //     if (params.turn == this.seat_idx) {
    //         this.push_cards = params;
    //         this.doUpdatePushCard(params);
    //     } else {
    //         this.btn_push_cards.active = false;
    //     }
    // }

    /**
     * 
     */

    /**
     * 用户点击事件
     */
    // 抢地主
    onClickCallValue(event: any, customEventData: any) {
        // const params: CallBankerReq = {
        //     call_value: Number(customEventData)
        // }
        // socket_game.send_msg(SERVER_EVENT_GAME.CALL_REQ, params);
    }

    // 出牌
    onClickPushCards(event: any, customEventData: any) {
        // const params: PushCardsReq = {
        //     cards: Array.from(this.push.choose_cards),
        //     type: this.push.type,
        // }
        // switch (customEventData) {
        //     case "1": {
        //         params.type = CARD_TYPE.PASS;
        //         socket_game.send_msg(SERVER_EVENT_GAME.PUSH_REQ, params);
        //         break;
        //     }
        //     case "2": {
        //         break;
        //     }
        //     case "3": {
        //         if (this.push.can_push)
        //             socket_game.send_msg(SERVER_EVENT_GAME.PUSH_REQ, params);
        //         break;
        //     }
        // }
    }


    /**
     * 显示效果
     */

    doUpdateBankerCards = (cards: number[] = new Array(3).fill(-1)) => {
        const children = this.node_landlord_cards.children;
        for (let i = children.length - 1; i >= 0; i--) {
            TableRes.Instance.recycleNode(children[i]);
        }

        cards.map(card => {
            const node = TableRes.Instance.getNode();
            node.parent = this.node_landlord_cards;
            const poker: Poker = node.getComponent("Poker");
            poker.setValueAndColorByID(card);
        })
    }

    doUpdateHoldsCards = (cards: number[], sort: boolean) => {
        if (sort) {
            cards.map(card => {
                const node = TableRes.Instance.getNode();
                node.parent = this.node_hold;
                const poker: Poker = node.getComponent("Poker");
                poker.setValueAndColorByID(card);
                // cc.log(poker.node.x); // 40
            })
            this.holds = cards;
        } else {
            this.doUpdateHoldsCards(cards, true);
            this.holds = cards.sort((a, b) => { return b - a });
            setTimeout(this.doRecycleHoldsCards, 1000, this.holds);
            setTimeout(this.doUpdateHoldsCards, 2000, this.holds, true);
        }

        // if (!this.choose.cards_between && cards.length >= 2) {
        //     const children = this.node_holds_cards_self.children;
        //     this.choose.cards_between = children[1].x - children[0].x;
        // }
    }

    doRecycleHoldsCards = (cards: number[]) => {
        const children = this.node_hold.children;
        const tmp = [];
        children.map(child => {
            const poker: Poker = child.getComponent("Poker");
            if (cards.indexOf(poker.poker_id) != -1) {
                tmp.push(child);
            }
        })

        for (let i = tmp.length - 1; i >= 0; i--) {
            TableRes.Instance.recycleNode(tmp[i]);
        }
    }
}
