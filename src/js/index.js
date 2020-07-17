import {elements} from './views/slectors';
import * as serchView from './views/serchView';
import serchResults from './models/Serch';
import * as recipeView from './views/recipeView';
import recipeData from './models/Recipe';
import * as listView from './views/listView';
import listData from './models/List';
import * as likeView from './views/likeView';
import likeData from './models/Like';

//store all data to make it avalable for all app
export const state = {}

/****************
* Serch controler
****************/
const controlSearch = async () => {
    //clear previous serch results
    serchView.clearSerchRes()
    
    //store query that the user entered
    const query = serchView.getQuery();
    if(query) {
        //load until data come
        serchView.loader(elements.showRes)
        //get serch results and stor it in state object
        state.serch = new serchResults(query)
        await state.serch.getResults()
        //clear loader
        serchView.clearLoader();

        //show the serch results in UI
        serchView.showSerchRes(state.serch.data)
    }
    //clear input
    serchView.clearInput()
}


elements.serchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch()
});

elements.pagesButtons.addEventListener('click', e => {
    //clear previous serch results
    serchView.clearSerchRes()

    //get data about the page num from button
    let pageNum = parseInt(e.target.closest('.btn-inline').dataset.goto);
    
    //show the serch results in UI
    serchView.showSerchRes(state.serch.data, pageNum)
});

/******************
* Recipe controler
******************/
const controlRecipe = async () => {
    //clear previous serch results
    recipeView.clearRecipe()
    //store query from URL hash id
    const query = recipeView.getRcipeId();
    if(query) {
        //load until data come
        serchView.loader(elements.recipe);

        //get recipe data and stor it in state object
        state.recipe = new recipeData(query)
        await state.recipe.getRecipe();
        //calclate services and time
        state.recipe.calcTime();
        state.recipe.calcService();
        state.recipe.handelIngredients();
        //clear loader
        serchView.clearLoader();
        
        //render this recipe data on UI
        const id = state.recipe.allRes.recipe_id
        recipeView.renderRecipe(state.recipe, !state.like.isSelected(id))
        

    }
    
}

//when user click on a serch result
elements.showRes.addEventListener('click', e => {
    //slect this result as active
    recipeView.activeLink(e);
});

//select this result data
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))

//decrese and increse recipe services and ingrediants
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-dec, .btn-dec *')) {
        //decrese recipe services and ingrediants
        if(state.recipe.service > 1) {
            state.recipe.adjustSurvAndIng('dec')
            recipeView.updateSer(state.recipe)
        }
        
    }else if(e.target.matches('.btn-inc, .btn-inc *')) {
        //decrese recipe services and ingrediants
        state.recipe.adjustSurvAndIng('inc')
        recipeView.updateSer(state.recipe)

    //create shoping list
    } else if(e.target.closest('.recipe__btn')) {
        listControl();
        listView.clearList()
        listView.addList(state.list.item)
    //create likes list
    }else if(e.target.closest('.recipe__love')) {
        
        likeControl();
    }
    
});


/******************
* List controler
******************/
const listControl = () => {
    state.list = new listData();
    state.recipe.ingredients.forEach(el => {
        state.list.addItemData(el.count, el.unit, el.ingredient)
    })
}

elements.list.addEventListener('click', e=> {
    if(e.target.closest('.shopping__delete')) {
        const id = e.target.closest('.shopping__item').dataset.id
        state.list.delItemData(id)
        listView.delItemList(id)
    } else if(e.target.matches('.count-input')) {
        const id = e.target.closest('.shopping__item').dataset.id;
        const inpVal = parseFloat(e.target.value)
        state.list.updateItemData(id, inpVal)
    }
});

/******************
* Like controler
******************/
window.addEventListener('load', () => {
    state.like = new likeData();
    state.like.getData();
    //toggle add and remove recipe from like UI
    likeView.renderLikeRecipe(state.like.like)
});

const likeControl = () => {
    if(!state.like) {
        state.like = new likeData();
    }
    const id = state.recipe.allRes.recipe_id
    if(!state.like.isSelected(id)) {
        //toggle add and remove recipe from like data
        state.like.addLikeData(
            id,
            state.recipe.title,
            state.recipe.img,
            state.recipe.allRes.publisher
        )
        
        //toggle icon activate
        likeView.toggleIconBtn(false);
    } else {
        state.like.removeLikeData(id)
        //toggle icon activate
        likeView.toggleIconBtn(true);
    }
    
    //toggle add and remove recipe from like UI
    likeView.renderLikeRecipe(state.like.like)
    
}
