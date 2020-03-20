
/**
 * 牌桌内资源
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class TableRes extends cc.Component {
    static Instance: TableRes = null;

    @property(cc.SpriteAtlas)
    pokerAtlas: cc.SpriteAtlas = null;
    @property(cc.Prefab)
    poker: cc.Prefab = null;

    nodePool: cc.NodePool = null;    //手牌节点池

    onLoad() {
        TableRes.Instance = this;
        this.nodePool = new cc.NodePool();
        this.initPool(30);
    };

    //初始化一定数量的手牌节点
    initPool(count: number = 20) {
        for (let i = 0; i < count; i++) {
            let poker = cc.instantiate(this.poker);
            this.nodePool.put(poker);
        }
    };

    //从对象池中获取poker节点
    getNode() {
        if (this.nodePool.size()) {
            return this.nodePool.get();
        }
        return cc.instantiate(this.poker);
    };

    //回收节点
    recycleNode(poker: cc.Node) {
        let script = poker.getComponent("Poker");
        script.reset();

        this.nodePool.put(poker);
    };

    //清理池中所有节点
    clearPool() {
        this.nodePool.clear();
    };

    getPokerFrameByName(name: string) {
        return this.pokerAtlas.getSpriteFrame(name);
    }
}
