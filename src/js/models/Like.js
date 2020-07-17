export default class likeData {
    constructor() {
        this.like = []
    }
    addLikeData(id, title, img, publisher) {
        const like = {
            id,
            title,
            img,
            publisher,
        }
        this.like.push(like);
        //store data in local storage
        this.storeData()
    }
    removeLikeData(id) {
        const likeIndex = this.like.findIndex(el => el.id === id);
        this.like.splice(likeIndex, 1);
        //store data in local storage
        this.storeData()
    }
    isSelected(id) {
        return this.like.findIndex(el => el.id === id) !== -1;
    }
    storeData() {
        localStorage.setItem('likes', JSON.stringify(this.like))
    }
    getData() {
        const storage =JSON.parse(localStorage.getItem('likes'));
        if(storage) {
            this.like = storage
        }
    }

}