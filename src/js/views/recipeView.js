import {elements} from './slectors'
import {Fraction} from 'fractional'

export const activeLink = e => {
    
    //remove the acive class from all seblings
    const resultsArr = Array.from(document.querySelectorAll('.likes__link'));
    for(const result of resultsArr) {
        result.classList.remove('results__link--active')
    }
    
    //slect this result as active
    let el = e.target.closest('.likes__link');
    el.classList.add('results__link--active')
}

export const getRcipeId = () => {
    return window.location.hash.replace('#', '')
}
const fraction = count => {
    if(count) {
        const newCount = Math.round((count * 100))  / 100
        const [int, dec] = newCount.toString().split('.')
        if(!dec) {
            return newCount
        }
        if(int == 0) {
            const fr = new Fraction(newCount)
            return `${fr.numerator}/${fr.denominator}`
        } else {
            const fr = new Fraction(newCount -int);
            return `${int} ${fr.numerator}  / ${fr.denominator}`
            
        }
        
    }
    return " "
}
const creatIng = el => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${fraction(el.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${el.unit}</span>
            ${el.ingredient}
        </div>
    </li>
`
export const renderRecipe = (data, isSelected) => {
    const html = `
        <figure class="recipe__fig">
            <img src="${data.img}" alt="Tomato" class="recipe__img">
            <h1 class="recipe__title">
                <span>${data.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${data.time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${data.service}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-dec">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-inc">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-${isSelected ? 'heart-outlined' : 'heart'}"></use>
                </svg>
            </button>
        </div>



        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${data.ingredients.map(el => creatIng(el)).join('')}
            </ul>

            <button class="btn-small recipe__btn">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${data.allRes.publisher}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${data.allRes.source_url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
            
    `
    elements.recipe.insertAdjacentHTML('beforeend', html);
}

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
}

export const updateSer = (data) => {
    document.querySelector('.recipe__info-data--people').textContent = data.service;
    const ingCounts = Array.from(document.querySelectorAll('.recipe__count'));
    ingCounts.forEach((ingCount, i) => {
        ingCount.textContent = fraction(data.ingredients[i].count)
    });
}