// import { TableInfo } from "../interface/table_info";

interface OperationInfo {
    table_id: string;    // 桌子UUID
    state: GAME_STATE;     // 游戏状态
    seat_idx?: number;    // 操作者座位号 
    target?: number[];    // 消息接收者  null 全桌推送
}

interface GameStateInfo {
    turn: number;    // 轮到谁操作了
    time_out: number;  // 超时时间（单位秒）
    // rate: number;     // 当前积分倍数（如斗地主炸弹翻倍）
    // state: GAME_STATE;  // 当前游戏状态  跑得快只有一个出牌状态
}

// 后端监听消息字段
export const SERVER_EVENT_GAME = {
    HOLD: "GAME:HOLD_INFO",   // 玩家手牌数据
    INOF: "GAME:TABLE_INFO",  // 本桌游戏数据
    CALL: "GAME:CALL_CARD",   // 玩家抢地主推送
    PUSH: "GAME:PUSH_CARD",   // 玩家出牌推送
    AUTO: "GAME:AUTO_PUSH",   // 玩家托管状态推送
}


// 游戏状态机
export enum GAME_STATE {
    INIT,   // 初始化中
    CALL,   // 叫地主
    PUSH,   // 游戏中
    OVER,   // 游戏结束
}

//////////////////入参/////////////////////////
export interface TableInfoReq extends OperationInfo { }

export interface CallValueReq extends OperationInfo { }

export interface PushCardsReq extends OperationInfo {
    type: number;
    cards: number[];
}

export interface AutoPushReq extends OperationInfo {
    auto: boolean;   // 设置托管  或  解除托管
}

//////////////////返回//////////////////////////
export interface GameStartPush {
    seats: number;   // 座位数
    config: any;     // 游戏用到的配置文件
}

export interface CallValueRes {

}

// 通知叫地主
export interface CallValuePush extends GameStateInfo, OperationInfo {
    landlord_value: number,
    landlord_cards?: number[],      // 地主牌
    seat_idx?: number,
    call_value?: number,
}

// 通知出牌
export interface PushCardsPush extends GameStateInfo, OperationInfo {
    type?: number;
    cards?: number[];
}

// 通知发牌
export interface HoldCardsPush extends OperationInfo {
    holds: number[];
    hold_num: number[];
}

// 广播玩家设置托管、取消托管
export interface AutoPushPush extends OperationInfo {
    auto: boolean;
}