
// // import { get_user_info } from "../User_mgr";
// // import { SERVER_EVENT_BASE, AuthReq, } from "../../Api/SocketApi_Base";
// // import SocketClient from "../../Frameworks/Net/SocketClient";
// // import { SERVER_EVENT_MATCH, CLIENT_EVENT_MATCH, MatchStart } from "../../Api/SocketApi_Match";
// // import { eventDispatcher, EVENT_MATCH, EVENT_GAME } from "../../Frameworks/Event/EventDispatcher";
// // import { CLIENT_EVENT_GAME, Holds, Table, CallBanker, CallBankerRes, PushCards, Banker, PushCardsRes } from "../../Api/SocketApi_Game";

import SocketClient from "../../Net/SocketClient";
import { SERVER_EVENT_BASE, CLIENT_EVENT_BASE, GuestRes } from "../Readme/SocketApiBase";
import { set_my_info } from "../../Manager/UserMgr";
import { CLIENT_EVENT_ROOM_BASE } from "../Readme/SocketApiRoomBase";

export let socket_game: SocketClient = null;

// /**
//  * 
//  * @param url 
//  * @param reconnect 大厅通知是否是重连
//  */
export function init_socket_game(url: string, reconnect: boolean = false) {
    // if (socket_game || reconnect) {
    //     reconnect = true;   // 需要重连
    // }
    socket_game = new SocketClient(url, cc.sys.isNative);
    socket_game.add_handler("connect", handleConnect);
    socket_game.add_handler(CLIENT_EVENT_BASE.GUEST_RES, handleGuestRes);
    for (const key in CLIENT_EVENT_ROOM_BASE) {
        if (CLIENT_EVENT_ROOM_BASE.hasOwnProperty(key)) {
            const element = CLIENT_EVENT_ROOM_BASE[key];
            socket_game.add_event(element);
        }
    }


    // if (reconnect) {
    //     // 发送重连请求
    //     socket_game.send_msg(SERVER_EVENT_MATCH.RECONNECT_REQ, {}, 2000);
    // }
}

const handleConnect = () => {
    // 发送验证
    socket_game.send_msg(SERVER_EVENT_BASE.GUEST_REQ, {});
}

const handleGuestRes = (data: GuestRes) => {
    set_my_info(data.user_id);
}

// const handleDisconnect = (data) => {
//     cc.log(data);
//     socket_game.disconnect();
//     // 去大厅去取 game server连接信息
//     // setTimeout();
// }

