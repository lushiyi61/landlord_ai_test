/**
 * 玩家消息
 * 房间管理：金币模式
 */

export interface UserId {
    // user_id: number
}

// 前后端监听消息字段
export const SERVER_EVENT_ROOM_GOLD = {
    JOIN_REQ: "ROOM_GOLD:JOIN_REQ",
    LEAVE_REQ: "ROOM_GOLD:LEAVE_REQ",
    MSG_REQ: "ROOM_GOLD:MSG_REQ",
}

export const CLIENT_EVENT_ROOM_GOLD = {
    ERROR_RES: "ROOM_GOLD:ERROR_RES",
    START_RES: "ROOM_GOLD:START_RES",
    JOIN_RES: "ROOM_GOLD:JOIN_RES",
    LEAVE_RES: "ROOM_GOLD:LEAVE_RES",
    MSG_RES: "ROOM_GOLD:MSG_RES",
}


export const ERROR_CORD = {
    SUCCESS: "0",      // 成功
    ERROR: "G4001",    // 通用错误

    ROOM_IS_FULL: "G4010"   // 房间已满
}

//////////////////入参/////////////////////////
export interface JoinReq extends UserId {
    game_name: string,
    room_id?: string,
    seat_idx?: number,
}

//////////////////返回//////////////////////////
export interface ErrorRes {
    code: string;
}

export interface JoinRes {
    room_id: string,               // 房间ID 
    user_id: number,               // 房主
    game_name: string,             // 游戏名称
    game_begin: boolean,           // 是否开始了
    round_num: number,             // 回合数
    user_num: number,              // 房间人数
    configs: any,                  // 配置信息
    seat_info: number[],           // 座位上的玩家（玩家id）
    // look_info?: LookInfo,           // 旁观信息
}
