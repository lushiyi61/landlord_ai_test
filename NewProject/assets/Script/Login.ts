// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { set_my_wx_code, set_my_wx_info, get_my_info } from "./Manager/UserMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        // CC_WECHATGAME 这个是 creator 全局宏用来判断是否在微信小游戏环境下
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.getSetting({
                success: (res) => {
                    // 已授权
                    if (res.authSetting["scope.userInfo"]) {
                        this.wxLogin();
                    } else {   // 显示授权按钮
                        let sysInfo = wx.getSystemInfoSync();
                        let button = wx.createUserInfoButton({
                            type: "text",
                            text: "微信登录",
                            style: {
                                left: sysInfo.windowWidth / 2 - 50,
                                top: sysInfo.windowHeight / 2 - 30,
                                width: 100,
                                height: 60,
                                backgroundColor: "#c7a976",
                                color: "#5c5941",
                                borderColor: "#5c5941",
                                textAlign: "center",
                                fontSize: 16,
                                borderWidth: 4,
                                borderRadius: 4,
                                lineHeight: 60,
                            }
                        });
                        button.onTap((res) => {
                            if (res.userInfo) {
                                button.destroy();
                                this.wxLogin();
                            } else {
                                wx.showModal({
                                    title: "温馨提示",
                                    content: "本游戏需要您的用户信息登录游戏。",
                                    showCancel: false,
                                });
                            }
                        });
                        button.show();
                    }
                }
            });
        }
    }

    wxLogin() {
        wx.login({
            success: (res) => {
                // res中包含code
                // console.warn(res.code);
                set_my_wx_code(res.code);
                // 获取用户信息
                wx.getUserInfo({
                    withCredentials: true,      // 必须在wx.login之后，这里才能为true
                    success: function (result) {
                        // result中包含encryptedData和iv
                        // console.warn(result);
                        set_my_wx_info(
                            result.userInfo.avatarUrl,
                            result.userInfo.gender,
                            result.userInfo.nickName,
                            result.userInfo.city,
                            result.userInfo.country,
                            result.userInfo.language,
                            result.userInfo.province,
                            result.encryptedData,
                            result.iv,
                        );
                        // 将res.code、result.encryptedData、result.iv发送到服务器
                        console.warn(get_my_info());
                        cc.director.loadScene("Running");
                    },
                    fail: function (result) {
                        // 错误处理
                    },
                });
            },
            fail: (res) => {
                // 错误处理
            },
        })
    }
    // update (dt) {}
}
