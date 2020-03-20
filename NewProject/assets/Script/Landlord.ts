// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { init_socket_game, socket_game } from "./Landlord/WebSocket/ws";
import { get_configs } from "./configs";
import { CLIENT_EVENT_ROOM_BASE, SERVER_EVENT_ROOM_BASE, JoinReq } from "./Landlord/Readme/SocketApiRoomBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Animation)
    ani_game_start: cc.Animation = null;

    @property(cc.Node)
    btn_call_value: cc.Node = null;

    @property(cc.Node)
    btn_push_cards: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

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

        /**
         * WS事件
         */
        socket_game.eventDispatcher.on(CLIENT_EVENT_ROOM_BASE.JOIN_RES, this.onEvent_JoinRoom, this);
        socket_game.eventDispatcher.on(CLIENT_EVENT_ROOM_BASE.START_RES, this.onEvent_GameStart, this);

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
}
