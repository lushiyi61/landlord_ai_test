
const { ccclass, property } = cc._decorator;

@ccclass
class PokerUtil {

    //得到逻辑值
    getPokerValueByID(ID: number) {
        return Math.floor(ID / 4) + 3;
    };

    //得到牌面值
    getPokerIDByValue(value: number) {
        if (value < 3) value = 3;
        return (value - 3) * 4;
    };

    //得到花色
    getPokerColor(ID: number) {
        return ID % 4;
    };
}
export default new PokerUtil();