import PokerUtil from "./PokerUtil";
import TableRes from "./TableRes";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Poker extends cc.Component {

    @property(cc.Sprite)
    card: cc.Sprite = null;

    @property(cc.Sprite)
    cover: cc.Sprite = null;

    poker_id: number = -1;
    isUp: boolean = false;//是否弹起
    nodeY: number = 0;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.setChooseAdverse, this, true);
    };


    start() {

    };

    //重置数据
    reset() {
        this.poker_id = -1;
        this.isUp = false;
        this.nodeY = 0;
    };

    //根据ID设置值和花色 14-A 15-2 16-王
    setValueAndColorByID(ID: number) {
        this.poker_id = ID;
        this.isUp = false;
        this.nodeY = this.node.y;
        var val = PokerUtil.getPokerValueByID(ID);
        var col = PokerUtil.getPokerColor(ID);
        //id为-1则卡牌是盖住的
        if (ID == -1) {
            var color = 3;
            this.card.spriteFrame = TableRes.Instance.getPokerFrameByName("card_bg" + color);
            return;
        }
        //大小王单独处理
        if (val == 16) {
            var pre_num = col % 2 == 0 ? "card_joker_small" : "card_joker_big";
            this.card.spriteFrame = TableRes.Instance.getPokerFrameByName(pre_num);
        } else {
            this.card.spriteFrame = TableRes.Instance.getPokerFrameByName("card_" + col + "_" + val);
        }
    };

    setChooseAdverse() {
        this.isUp = !this.isUp;
        if (this.isUp) {
            this.node.y = this.nodeY + 30;
        } else {
            this.node.y = this.nodeY;
        }
    }

    setChoose(choose: boolean) {
        this.isUp = choose;
        if (this.isUp) {
            this.node.y = this.nodeY + 30;
        } else {
            this.node.y = this.nodeY;
        }
    }

    //明暗
    setBlack(show: boolean) {
        this.cover.node.active = show;
    };

    isBlack() {
        return this.cover.node.active;
    };

    // update (dt) {}
}
