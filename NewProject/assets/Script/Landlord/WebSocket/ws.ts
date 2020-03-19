
// // import { get_user_info } from "../User_mgr";
// // import { SERVER_EVENT_BASE, AuthReq, } from "../../Api/SocketApi_Base";
// // import SocketClient from "../../Frameworks/Net/SocketClient";
// // import { SERVER_EVENT_MATCH, CLIENT_EVENT_MATCH, MatchStart } from "../../Api/SocketApi_Match";
// // import { eventDispatcher, EVENT_MATCH, EVENT_GAME } from "../../Frameworks/Event/EventDispatcher";
// // import { CLIENT_EVENT_GAME, Holds, Table, CallBanker, CallBankerRes, PushCards, Banker, PushCardsRes } from "../../Api/SocketApi_Game";

import SocketClient from "../../Net/SocketClient";

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
    // socket_game.add_handler("connect", handleConnect);
    // socket_game.add_handler("disconnect", handleDisconnect);
    // socket_game.add_handler(CLIENT_EVENT_MATCH.MATCH_STRAT, handleMatchStart);
    // socket_game.add_handler(CLIENT_EVENT_GAME.HOLD, handleHoldsChange);
    // socket_game.add_handler(CLIENT_EVENT_GAME.TABLE, handleTableInfo);
    // socket_game.add_handler(CLIENT_EVENT_GAME.CALL, handleCallBanker);
    // socket_game.add_handler(CLIENT_EVENT_GAME.CALL_RES, handleCallBankerRes);
    // socket_game.add_handler(CLIENT_EVENT_GAME.BANKER, handlePushBanker);
    // socket_game.add_handler(CLIENT_EVENT_GAME.PUSH, handlePushCards);
    // socket_game.add_handler(CLIENT_EVENT_GAME.PUSH_RES, handlePushCardsRes);


    // if (reconnect) {
    //     // 发送重连请求
    //     socket_game.send_msg(SERVER_EVENT_MATCH.RECONNECT_REQ, {}, 2000);
    // }
}

// const handleConnect = () => {
//     // 发送验证
//     const params: AuthReq = {
//         token: get_user_info().token
//     }
//     socket_game.send_msg(SERVER_EVENT_BASE.AUTH_REQ, params);
// }

// const handleDisconnect = (data) => {
//     cc.log(data);
//     socket_game.disconnect();
//     // 去大厅去取 game server连接信息
//     // setTimeout();
// }

// const handleMatchStart = (data: MatchStart) => {
//     const params: MatchStart = data;
//     cc.log(`handleMatchStart: ${JSON.stringify(params)}`);
//     eventDispatcher.emit(EVENT_MATCH.MATCH_START, params);
// }

// const handleHoldsChange = (data: Holds) => {
//     const params: Holds = data;
//     cc.log(`handleHoldsChange: ${JSON.stringify(params)}`);
//     eventDispatcher.emit(EVENT_GAME.HOLDS_CHANGE, params);
// }

// const handleTableInfo = (data: Table) => {
//     cc.log(data);
//     eventDispatcher.emit(EVENT_GAME.TABLE_INFO, data);
// }

// const handleCallBanker = (data: CallBanker) => {
//     cc.log(data)
//     eventDispatcher.emit(EVENT_GAME.CALL_BANKER, data);
// }

// const handleCallBankerRes = (data: CallBankerRes) => {
//     cc.log(data)
//     eventDispatcher.emit(EVENT_GAME.CALL_BANKER_RES, data);
// }

// const handlePushBanker = (data: Banker) => {
//     cc.log(data)
//     eventDispatcher.emit(EVENT_GAME.BANKER, data);
// }

// const handlePushCards = (data: PushCards) => {
//     cc.log(data)
//     eventDispatcher.emit(EVENT_GAME.PUSH_CARD, data);
// }

// const handlePushCardsRes = (data: PushCardsRes) => {
//     cc.log(data)
//     eventDispatcher.emit(EVENT_GAME.PUSH_CARD_RES, data);
// }
