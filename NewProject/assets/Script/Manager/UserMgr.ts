const user_info: UserInfo = {
    user_id: 0,
    token: "",
    nickname: "",
    headimg: "",
    gaming: false,
}

export function get_my_info(): UserInfo {
    return user_info;
}

export function set_my_info(user_id: number) {
    user_info.user_id = user_id;
}