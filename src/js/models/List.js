import uniqid from 'uniqid';

export default class listData {
    constructor() {
        this.item = []
    }
    addItemData(count, unit, ingrediants) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingrediants
        }
        this.item.push(item)
    }

    delItemData(id) {
        const itemIndex = this.item.findIndex(el => el.id === id);
        this.item.splice(itemIndex, 1)
    }
    updateItemData(id, newCount) {
        this.item.find(el => el.id === id).count = newCount;
    }
}