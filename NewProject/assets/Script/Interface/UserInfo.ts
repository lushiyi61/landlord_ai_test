export interface UserInfo extends UserInfoBase {
    // 服务端信息
    token: string,      // token
    gaming: boolean,    // 是否在游戏中


    // 微信小游戏 基础信息
    code: string,
    city: string,
    country: string,
    language: string,
    province: string,
    encryptedData: string,
    iv: string,
    
    // avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJp7tdOnYWfJDKlRr90yqbxWM6gvmayRtumNp4ITuP4hdTDXcQcGeAwic7GpQSMWeunJcpiat8Dtniag/132"
    // city: "Hengyang"
    // country: "China"
    // gender: 1
    // language: "zh_CN"
    // nickName: "邹健"
    // province: "Hunan"
}

interface UserInfoBase {
    // 服务端信息
    user_id: number,   // 用户ID

    // 微信小游戏 基础信息
    avatarUrl: string,
    gender: number,
    nickName: string,
}