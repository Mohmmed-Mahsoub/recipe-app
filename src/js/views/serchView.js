import {elements} from './slectors'
export const getQuery = () => elements.serchInput.value;

const renderRecipe = (recipe) => {
    const html = `
        <li>
            <a class="likes__link" href="#${recipe.recipe_id}">
                <figure class="likes__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${cutTitle(recipe.title)} ...</h4>
                    <p class="likes__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
        `;
    elements.showRes.insertAdjacentHTML('beforeend', html);
}

export const cutTitle = (title, limit = 17) => {
    const titleArr = title.split(' ');
    const newTitle = []
    titleArr.reduce((acc, cur) => {
        if(acc + cur.length <= limit) {
            newTitle.push(cur)
            return acc + cur.length
        }
    }, 0)
    return newTitle.join(' ')
}

const showButtons = (pageNum,type,iconDir) => {
    const html = `
        <button data-goto = ${pageNum} class="btn-inline results__btn--${type}">
            <span>Page ${pageNum}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${iconDir}"></use>
            </svg>
        </button>
    `
    elements.pagesButtons.insertAdjacentHTML('beforeend', html);
}

const cutRecipes = (recipes, page) => {
    let start = (page * 10) - 10;
    let end = page * 10;
    let pages = recipes.length / 10
    
    if(page == 1) {
        showButtons(page + 1, 'next', 'right')
    } else if(page == pages) {
        showButtons(page - 1, 'prev', 'left')
    } else {
        showButtons(page + 1, 'next', 'right');
        showButtons(page - 1, 'prev', 'left');
    }
    
    return recipes.slice(start, end)
}

export const showSerchRes = (recipes, page = 1) => {
     let Recipes = cutRecipes(recipes,page)
    for(const recipe of Recipes) {
        renderRecipe(recipe);
    }
}

export const clearInput = () => {
    elements.serchInput.value = '';
}

export const clearSerchRes = () => {
    elements.showRes.innerHTML = '';
    elements.pageBtn.innerHTML = '';
}

export const loader = (el) => {
    const html = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
        `;
    el.insertAdjacentHTML('beforeend', html);
}

export const clearLoader = () => {
    const elem = document.querySelector('.loader');
    elem.parentNode.removeChild(elem);
}