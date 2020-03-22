import { UserInfo } from "../Interface/UserInfo";

const user_info: UserInfo = {
    user_id: 0,
    token: "",
    gaming: false,
    city: "",
    country: "",
    language: "",
    province: "",
    avatarUrl: "",
    gender: 0,
    nickName: "",
    code: "",
    encryptedData: "",
    iv: "",
}

export function get_my_info(): UserInfo {
    return user_info;
}

export function set_my_info(user_id: number) {
    user_info.user_id = user_id;
}

export function set_my_token(token: string) {
    user_info.token = token;
}

export function set_my_wx_code(code: string) {
    user_info.code = code;
}

export function set_my_wx_info(
    avatarUrl: string,
    gender: number,
    nickName: string,
    city: string,
    country: string,
    language: string,
    province: string,
    encryptedData: string,
    iv: string,
) {
    Object.assign(user_info, {
        avatarUrl,
        gender,
        nickName,
        city,
        country,
        language,
        province,
        encryptedData,
        iv,
    })
}