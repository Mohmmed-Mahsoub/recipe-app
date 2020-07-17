import axios from 'axios';

export default class serchResults {
    constructor(query) {
        this.query = query
    }

    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        try {
            const res = await axios(`${proxy}https://recipesapi.herokuapp.com/api/search?q=${this.query}&`);
            this.data = res.data.recipes
        } catch(error) {
            alert(error)
        }
    }
}