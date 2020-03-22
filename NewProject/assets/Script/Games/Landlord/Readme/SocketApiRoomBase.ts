/**
 * 房间内基本的消息
 * 房间管理
 */
export interface UserId {
    // user_id: number
}

// 前后端监听消息字段
export const SERVER_EVENT_ROOM_BASE = {
    JOIN_REQ: "ROOM_BASE:JOIN_REQ",
    LEAVE_REQ: "ROOM_BASE:LEAVE_REQ",
    MSG_REQ: "ROOM_BASE:MSG_REQ",
}

export const CLIENT_EVENT_ROOM_BASE = {
    ERROR_RES: "ROOM_BASE:ERROR_RES",
    START_RES: "ROOM_BASE:START_RES",
    JOIN_RES: "ROOM_BASE:JOIN_RES",
    LEAVE_RES: "ROOM_BASE:LEAVE_RES",
    MSG_RES: "ROOM_BASE:MSG_RES",
}


export const ERROR_CORD = {
    SUCCESS: "0",      // 成功
    ERROR: "G4001",    // 通用错误

    ROOM_IS_FULL: "G4010",   // 房间已满
    PEOPLE_IN_THE_SEATS: "G4011", // 座位上有人了
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
