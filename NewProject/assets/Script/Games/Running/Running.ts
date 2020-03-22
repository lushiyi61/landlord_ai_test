// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { UserInfoBase } from "../../Interface/UserInfo";
import { get_my_info } from "../../Manager/UserMgr";

const { ccclass, property } = cc._decorator;

// 游戏数据
interface UserGameInfo extends UserInfoBase {
    score: number,
}

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Animation)
    ani_game_start: cc.Animation = null;

    @property(cc.Node)
    btn_push_cards: cc.Node = null;

    @property(cc.Node)
    node_seat_up: cc.Node = null;

    @property(cc.Node)
    node_seat_left: cc.Node = null;

    @property(cc.Node)
    node_seat_rigth: cc.Node = null;

    @property(cc.Node)
    node_seat_self: cc.Node = null;

    @property(cc.Node)
    node_hold: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    seat_num: number = 3;
    user_game_infos: UserGameInfo[] = new Array(this.seat_num);
    onLoad() {
        this.btn_push_cards.active = false;
        const user_info = get_my_info();
        const my_game_info: UserGameInfo = {
            score: 0,
            ...user_info,
        }
        this.user_game_infos[0] = my_game_info;
        this.doUpdateUserInfo();
    }

    start() {

    }

    // update (dt) {}

    // UI
    doUpdateUserInfo() {
        this.user_game_infos.map((user_info, index) => {
            let node: cc.Node = null;
            switch (index) {
                case 0: node = this.node_seat_self; break;
                case 1: node = this.node_seat_rigth; break;
                case 2: node = this.node_seat_up; break;
                case 3: node = this.node_seat_left; break;
            }
            if (index == 2 && this.seat_num == 3) {
                node = this.node_seat_left;
            }

            const avatar = node.getChildByName("avatar");
            cc.loader.load({
                url: user_info.avatarUrl,
                type: 'jpg'
            }, (error, tuxture) => {
                if (!error) {
                    const frame = new cc.SpriteFrame(tuxture);
                    avatar.getComponent(cc.Sprite).spriteFrame = frame;
                }
            });
            const name = node.getChildByName("name");
            name.getComponent(cc.Label).string = user_info.nickName;
            const score = node.getChildByName("score");
            score.getComponent(cc.Label).string = user_info.score.toString();
        })
    }
}
