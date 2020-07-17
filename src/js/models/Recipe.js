import axios from 'axios';

export default class recipeData {
    constructor(query) {
        this.query = query
    }

    async getRecipe() {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        try {
            const res = await axios(`${proxy}https://recipesapi.herokuapp.com/api/get?rId=${this.query}`);
            this.allRes = res.data.recipe
            this.title = res.data.recipe.title;
            this.img = res.data.recipe.image_url;
            this.ingredients = res.data.recipe.ingredients
        } catch(error) {
            alert(error)
        }
    }

    calcTime() {
        this.time = Math.ceil((this.ingredients.length / 3)) * 15
    }
    calcService() {
        this.service = 4
    }
    handelIngredients() {
        const units = ['cups', 'teaspoons', 'teaspoon', 'tablespoons', 'tablespoon', 'ounces', 'ounce', 'pounds'];
        const newunits = ['cup', 'tsp', 'tsp', 'tbsp', 'tbsp', 'oz', 'oz', 'pound'];
        const allUnits = [...newunits, 'kg']
        let newIngredients = this.ingredients.map(el => { //map return new arry so it needs to store it / every change on an element needs to store / after make change you must return the elemnt o store in new array
            // short anf cut units
            let ingredient = el.toLowerCase();
            units.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, allUnits[i])
            });
            //remove ()
            ingredient = ingredient.replace(/\s*\(.*?\)\s*/g, ' ');
            ingredient = ingredient.replace(',', '')
            //Separation of units and counts
            let ingredientArr = ingredient.split(' ');
            let unitIndex = ingredientArr.findIndex(ing => { //or ingredientArr.findIndex(ing => newunits.includes(ing))  // The findIndex() method returns the index of the first element in an array that pass a test (provided as a function).
                return allUnits.includes(ing)
            });
            
            let ingObject;
            if(unitIndex > -1) {
                //there is a unit
                const countArr = ingredientArr.slice(0, unitIndex);
                let count;
                if(countArr.length === 1) {
                    count = eval(ingredientArr[0].replace('+', '').replace('-', '+'))
                } else if(countArr.length > 1) {
                    count = eval(ingredientArr.slice(0, unitIndex).join('+'))
                }
                
                ingObject = {
                    count,
                    unit: ingredientArr[unitIndex],
                    ingredient: ingredientArr.slice(unitIndex + 1).join(' ')
                }
                
            } else if(unitIndex === -1 && parseInt(ingredientArr[0])){
                //there is NO unit BUT there is a count
                ingObject = {
                    count: parseInt(ingredientArr[0]),
                    unit: '',
                    ingredient: ingredientArr.slice(1).join(' ')
                }
            } else if(unitIndex === -1) {
                //there is NO unit and there is NO count
                ingObject= {
                    count: 1,
                    unit: '',
                    ingredient //ingredient: ingredient
                }
            }

            return ingObject
        });
        this.ingredients = newIngredients;
        
    }
    adjustSurvAndIng(type) {
        const newService = type === 'dec' ? this.service - 1 : this.service + 1;
        this.ingredients.forEach(ing => {
            ing.count = ing.count * (newService / this.service)
            
        });
       this.service = newService;
    }
    
}