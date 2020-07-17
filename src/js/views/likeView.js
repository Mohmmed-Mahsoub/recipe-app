import {elements} from './slectors';
import {cutTitle} from './serchView';
export const toggleIconBtn = (isSlected) => {
    let string = isSlected ? 'heart-outlined' : 'heart'
    document.querySelector('.recipe__love svg use').setAttribute('href', `img/icons.svg#icon-${string}`)
}
const clearLikeList = () => {
    const elems = document.querySelectorAll('.likes__list li')
    for(let elem of elems) {
        elem.parentNode.removeChild(elem);
    }
}
export const renderLikeRecipe = (recipeLike) => {
    if(recipeLike.length > 0) {
        document.querySelector('.likes').style.visibility = "visible";
    } else {
        document.querySelector('.likes').style.visibility = "hidden";
    }
    clearLikeList()
    recipeLike.forEach(element => {
        const html = `
            <li>
                <a class="likes__link" href="#${element.id}">
                    <figure class="likes__fig">
                        <img src="${element.img}" alt="Test">
                    </figure>
                    <div class="likes__data">
                        <h4 class="likes__name">${cutTitle(element.title)} ...</h4>
                        <p class="likes__author">${element.publisher}</p>
                    </div>
                </a>
            </li>
            `
        elements.likeList.insertAdjacentHTML('beforeend', html);
    
    });
}