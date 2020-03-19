// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { init_socket_game } from "./Landlord/WebSocket/ws";
import { get_configs } from "./configs";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    btn_call_value: cc.Node = null;

    @property(cc.Node)
    btn_push_cards: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.btn_call_value.active = false;
        this.btn_push_cards.active = false;
    }

    start() {
        // 初始化WS
        init_socket_game(get_configs().server);
        // 请求加入比赛场
    }

    // update (dt) {}

    /**
     * WS事件
     */
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
