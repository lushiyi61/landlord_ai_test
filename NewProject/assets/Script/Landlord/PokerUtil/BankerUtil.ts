export const CARD_TYPE = {
    PASS: 0,    // 过
    SINGLE: 1,  // 单
    DOUBLE: 2,  // 对
    SEQUNECE: 3,    // 顺子
    MORE_DOUBLE: 4,   // 连对
    THREE_PICK: 5,  // 三个
    THREE_PICK_ONE: 6,  // 三带一
    THREE_PICK_DOUBLE: 7,  // 三带一对
    MORE_THREE_PICK: 8,  // 飞机
    MORE_THREE_PICK_ONE: 9,  // 飞机带单
    MORE_THREE_PICK_DOUBLE: 10,  // 飞机带对
    FOUR_PICK_TWO: 11, // 四个带2个
    FOUR_PICK_DOUBLE: 12, // 四带两对
    BOOM: 20,  // 炸弹
}

// 获取牌的值
function get_poker_value(card: number) {
    return Math.floor(card / 4);
}

// //0 方块 1梅花 2红桃 3黑桃
// function get_poker_color(card: number) {
//     return card % 4;
// }

//获取卡牌数据 * 王的值为13
function get_value_list(card_list: number[], keep_king: boolean = false): number[] {
    const value_list = [];
    for (let card of card_list) {
        let value = get_poker_value(card);
        if (keep_king && value == 13) {
            value_list.push(card);
        } else {
            value_list.push(value);
        }
    }
    value_list.sort((a, b) => { return a - b; })
    return value_list;
}

/**
 * 统计
 * @param {numbers} value_list 
 */
function do_value_statistics(value_list: number[]): Map<number, number> {
    const tmp: Map<number, number> = new Map();
    value_list.map(card => {
        if (tmp.has(card)) {
            tmp.set(card, tmp.get(card) + 1);
        } else {
            tmp.set(card, 1);
        }
    })
    return tmp;
}

export function get_push_type(cards: number[]): number {
    const value_list = get_value_list(cards.sort((a, b) => { return a - b }));
    // SINGLE: 1,  // 单
    if (check_is_single(value_list)) return CARD_TYPE.SINGLE;
    // DOUBLE: 2,  // 对
    if (check_is_double(value_list)) return CARD_TYPE.DOUBLE;
    // SEQUNECE: 3,    // 顺子
    if (check_is_sequnece(value_list)) return CARD_TYPE.SEQUNECE;
    // MORE_DOUBLE: 4,   // 连对
    if (check_is_more_double(value_list)) return CARD_TYPE.MORE_DOUBLE;
    // THREE_PICK: 5,  // 三个
    if (check_is_three_pick(value_list)) return CARD_TYPE.THREE_PICK;
    // THREE_PICK_ONE: 6,  // 三带一
    if (check_is_three_pick_one(value_list)) return CARD_TYPE.THREE_PICK_ONE;
    // THREE_PICK_DOUBLE: 7,  // 三带一对
    if (check_is_three_pick_double(value_list)) return CARD_TYPE.THREE_PICK_DOUBLE;
    // MORE_THREE_PICK: 8,  // 飞机
    if (check_is_more_three_pick(value_list)) return CARD_TYPE.MORE_THREE_PICK;
    // MORE_THREE_PICK_ONE: 9,  // 飞机带单
    if (check_is_more_three_pick_one(value_list)) return CARD_TYPE.MORE_THREE_PICK_ONE;
    // MORE_THREE_PICK_DOUBLE: 10,  // 飞机带对
    if (check_is_more_three_pick_double(value_list)) return CARD_TYPE.MORE_THREE_PICK_DOUBLE;
    // FOUR_PICK_TWO: 11, // 四个带2个
    if (check_is_four_pick_two(value_list)) return CARD_TYPE.FOUR_PICK_TWO
    // FOUR_PICK_DOUBLE: 12, // 四带两对
    if (check_is_four_pick_double(value_list)) return CARD_TYPE.FOUR_PICK_DOUBLE;
    // BOOM: 20,  // 炸弹
    if (check_is_boom(value_list)) return CARD_TYPE.BOOM;

    return -99;
}



function check_is_single(value_list: number[]): boolean {
    return value_list.length == 1; // A
}

function check_is_double(value_list: number[]): boolean {
    // 对 BB: B != 13(joker)
    const value_set = new Set(value_list);
    return value_list.length == 2 && // AA
        value_set.size == 1 && // not AB
        value_set[0] != 13; // not joker
}

function check_is_sequnece(value_list: number[]): boolean {
    const value_set = new Set(value_list);
    return value_list.length >= 5 && // AAAAA....
        value_set.size == value_list.length &&  // ABCDE...F
        value_list[value_list.length - 1] < 12 &&   // not joker and 2
        value_list[value_list.length - 1] - value_list[0] == value_list.length - 1;  // not ABEFG
}

function check_is_more_double(value_list: number[]): boolean {
    const value_set = new Set(value_list);
    const statistics = do_value_statistics(value_list);
    for (let key in statistics) {
        if (statistics[key] != 2) return false;
    }

    return value_list.length >= 6 &&  // AAAAAA...
        // value_list.length % 2 == 0 &&
        value_list.length == value_set.size * 2 && // not ABBCCDD
        value_list[value_list.length - 1] < 12 &&   // not joker and 2
        value_set[value_set.size - 1] - value_set[0] == value_set.size - 1;  // not ABEFG
}

function check_is_three_pick(value_list: number[]): boolean {
    const value_set = new Set(value_list);
    return value_list.length == 3 &&  // AAA
        value_set.size == 1 // not ABC
}

function check_is_three_pick_one(value_list: number[]): boolean {
    const value_set = new Set(value_list);
    return value_list.length == 4 &&    // AAAA
        value_list[1] == value_list[2] &&  // not AABB
        value_set.size == 2 // AB not AAAA
}

function check_is_three_pick_double(value_list: number[]): boolean {
    const value_set = new Set(value_list);
    return value_list.length == 5 && // AAAAA
        value_list[value_list.length - 1] != 13 && // not joker 
        value_list[1] != value_list[3] &&   // not AAAAB
        value_set.size == 2; // AB
}

function check_is_more_three_pick(value_list: number[]): boolean {
    if (value_list.length < 6 || value_list.length % 3 != 0) return false;   // 飞机
    const statistics = do_value_statistics(value_list);
    for (let key in statistics) {
        if (statistics[key] != 3) return false;
    }
    const value_set = new Set(value_list);
    return value_set[value_set.size - 1] - value_set[0] == value_set.size - 1;
}

function check_is_more_three_pick_one(value_list: number[]): boolean {  // 注意，可能含有带3个的干扰项
    if (value_list.length < 8 || value_list.length % 4 != 0) return false;   // 飞机 带单
    const statistics = do_value_statistics(value_list);  // 4, 4, 4, 5, 5, 5, 6, 6, 6, 'J', 'J', 'J'   4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8  'J', 'J', 'J'  Q A 
    const value_set = new Set();
    for (let key in statistics) {
        if (statistics[key] == 3) {
            value_set.add(Number(key));
        }
    }
    if ((value_list.length / 4) != value_set.size) { // 含干扰项，且只有一个干扰相
        return (value_set[value_set.size - 1] - value_set[1] == value_set.size - 2) || (value_set[value_set.size - 2] - value_set[0] == value_set.size - 2)
    }
    return value_set[value_set.size - 1] - value_set[0] == value_set.size - 1;
}

function check_is_more_three_pick_double(value_list: number[]): boolean {
    if (value_list.length < 10 || value_list.length % 5 != 0) return false;   // 飞机 带对
    const statistics = do_value_statistics(value_list);
    const set_value: number[] = [];
    for (let key in statistics) {
        if (statistics[key] == 3) {
            set_value.push(Number(key));
        } else if (statistics[key] % 2 != 0 || Number(key) === 13) {
            return false;
        }
    }
    return set_value[set_value.length - 1] - set_value[0] == set_value.length - 1;
}

function check_is_four_pick_two(value_list: number[]): boolean {
    if (value_list.length != 6) return false;
    const statistics = do_value_statistics(value_list);
    for (let key in statistics) {
        if (statistics[key] == 4) return true
    }
    return false;
}

function check_is_four_pick_double(value_list: number[]): boolean {
    const value_set = new Set(value_list);
    if (value_set.size != 3 && value_list.length != 8) return false;
    const statistics = do_value_statistics(value_list);
    let has_four = false;
    for (let key in statistics) {
        if (statistics[key] % 2 != 0) return false;
        if (statistics[key] == 4) has_four = true;
    }
    return has_four;
}

function check_is_boom(value_list: number[]): boolean {
    const value_set = new Set(value_list);
    return value_set.size == 1 && // AAAA
        (value_list.length == 4 || value_list[0] == 13)  // AAAA or joker joker
}


/////////////////////////////////////////////////////////////////////////
/**
 * 比较第一个牌值
 * @param {number} big_card 
 * @param {numbers} cards 
 */
function check_can_single(cards: number[], big_card: number): number {
    if (get_poker_value(cards[0]) == 13) {
        return cards[0] > big_card ? cards[0] : -402;
    }
    if (get_poker_value(cards[0]) > get_poker_value(big_card)) {
        return cards[0];
    }
    return -401;
}

/**
 * 比较最后一个牌值
 * @param {number} big_card
 * @param {numbers} cards
 */
function check_can_sequnece(cards: number[], big_card: number): number {
    const last_index = cards.length - 1;
    if (get_poker_value(cards[last_index]) > get_poker_value(big_card)) {
        return cards[last_index];
    }
    return -403;
}

function check_can_three_pick(cards: number[], big_card: number): number {
    const the_card = get_big_card_by_statistics(cards, 3);
    return the_card > big_card ? the_card : -405;
}

function check_can_more_three_pick(cards: number[], big_card: number): number { // 注意，可能含有带3个的干扰项
    const value_list = get_value_list(cards);       // 手牌的值
    const statistics = do_value_statistics(value_list);  // 4, 4, 4, 5, 5, 5, 6, 6, 6, 'J', 'J', 'J'   4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8  'J', 'J', 'J'  Q A 
    const set_value = [];
    for (let key in statistics) {
        if (statistics[key] == 3) {
            set_value.push(key);
        }
    }
    if (Math.floor(value_list.length / 4) != set_value.length) { // 含干扰项，且只有一个干扰相
        if (set_value[set_value.length - 1] - set_value[1] == set_value.length - 2) {
            return set_value[set_value.length - 1] * 4;
        } else { // if (set_value[set_value.length - 2] - set_value[0] == set_value.length - 2){
            return set_value[set_value.length - 2] * 4;
        }
    }

    const the_card = get_big_card_by_statistics(cards, 3);
    return the_card > big_card ? the_card : -406;
}

function check_can_four_pick(cards: number[], big_card: number): number {
    const the_card = get_big_card_by_statistics(cards, 4);
    return the_card > big_card ? the_card : -407;
}

function check_can_boom(cards: number[], big_card: number): number {
    return check_can_sequnece(cards, big_card);
}

function get_big_card_by_statistics(card_list: number[], num: number): number {
    const value_list = get_value_list(card_list);
    const statistics = do_value_statistics(value_list);
    const tmp = [];
    statistics.forEach((value, key) => {
        if (value == num) {
            tmp.push(key * 4);
        }
    })
    return tmp[tmp.length - 1];
}

//检测牌型与牌是否相符
export function check_card_data(type: number, cards: number[]): boolean {
    const card_values = get_value_list(cards);       // 手牌的值
    switch (type) {
        // case CARD_TYPE.PASS:    // 过
        //     return card_data.length == 0;
        case CARD_TYPE.SINGLE:  // 单
            return check_is_single(card_values);
        case CARD_TYPE.DOUBLE:  // 对
            return check_is_double(card_values);
        case CARD_TYPE.SEQUNECE:    // 顺子
            return check_is_sequnece(card_values);
        case CARD_TYPE.MORE_DOUBLE:   // 连对
            return check_is_more_double(card_values);
        case CARD_TYPE.THREE_PICK:   // 三个
            return check_is_three_pick(card_values);
        case CARD_TYPE.THREE_PICK_ONE:  // 三个
            return check_is_three_pick_one(card_values);
        case CARD_TYPE.THREE_PICK_DOUBLE:  // 三个
            return check_is_three_pick_double(card_values);
        case CARD_TYPE.MORE_THREE_PICK:  // 飞机
            return check_is_more_three_pick(card_values);
        case CARD_TYPE.MORE_THREE_PICK_ONE:   // 飞机
            return check_is_more_three_pick_one(card_values);
        case CARD_TYPE.MORE_THREE_PICK_DOUBLE:  // 飞机
            return check_is_more_three_pick_double(card_values);
        case CARD_TYPE.FOUR_PICK_TWO: // 四个
            return check_is_four_pick_two(card_values);
        case CARD_TYPE.FOUR_PICK_DOUBLE: // 四个
            return check_is_four_pick_double(card_values);
        case CARD_TYPE.BOOM:  // 炸弹
            return check_is_boom(card_values);
        default: return false;
    }
}

// 根据牌型，比较大小
export function check_type_same(type: number, out_cards: number[], big_card: number): number {
    switch (type) {
        // case CARD_TYPE.PASS:    // 过
        //     return card_data.length == 0;
        case CARD_TYPE.SINGLE:  // 单
        case CARD_TYPE.DOUBLE:  // 对
            return check_can_single(out_cards, big_card);
        case CARD_TYPE.SEQUNECE:    // 顺子
        case CARD_TYPE.MORE_DOUBLE:   // 连对
            return check_can_sequnece(out_cards, big_card);
        case CARD_TYPE.THREE_PICK:   // 三个
        case CARD_TYPE.THREE_PICK_ONE:  // 三个
        case CARD_TYPE.THREE_PICK_DOUBLE:  // 三个
            return check_can_three_pick(out_cards, big_card);
        case CARD_TYPE.MORE_THREE_PICK:  // 飞机
        case CARD_TYPE.MORE_THREE_PICK_ONE:   // 飞机
        case CARD_TYPE.MORE_THREE_PICK_DOUBLE:  // 飞机
            return check_can_more_three_pick(out_cards, big_card);
        case CARD_TYPE.FOUR_PICK_TWO: // 四个
        case CARD_TYPE.FOUR_PICK_DOUBLE: // 四个
            return check_can_four_pick(out_cards, big_card);
        case CARD_TYPE.BOOM:  // 炸弹
            return check_can_boom(out_cards, big_card);
        default: return -400;
    }
}

/**
 * 检测待出卡牌是否合法（是否是手牌）
 * @param holds Set<number>
 * @param out_cards Set<number>
 */
export function check_card_holds(holds: number[], out_cards: number[]) {
    const tmp_cards = new Set([...holds, ...out_cards]);
    return tmp_cards.size == holds.length;
}


// 是否可以出牌，否返回-1，是返回card值（不严格分花色）PushCardsRes
export function check_can_push(push_card: any, type: number, cards: number[], seat_idx: number): number {
    cards.sort((a, b) => { return a - b });
    // // 检测card_data 牌与牌型是否相符
    // if (!check_card_data(type, cards)) {
    //     return - 100;
    // }
    // console.log(push_card);
    if (push_card && push_card.seat_idx && push_card.seat_idx != seat_idx) {   // 上家出牌不为空，且不是我
        // 牌型一样，比较大小
        // 牌型不一样，后者必须是炸弹
        if (push_card.type == type) {
            if (type == CARD_TYPE.BOOM && cards.length == 2) {
                return cards[1]; // 2个牌的炸弹，肯定是王炸咯
            }
            if (cards.length != cards.length) {
                return -200; // 出牌数量不一致
            }
            return check_type_same(type, cards, push_card.biggest);
        } else if (type != CARD_TYPE.BOOM) {
            return -300;
        }
    }

    return check_type_same(type, cards, -1); // 炸普通牌型 或  本家开始出牌，随便出
}

