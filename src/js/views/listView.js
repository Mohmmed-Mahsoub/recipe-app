import {elements} from './slectors'

export const clearList = () => {
    const elems = document.querySelectorAll('.shopping__item');
    for(let elem of elems) {
        elem.parentNode.removeChild(elem);
    }
}

export const addList = (listData) => {
    
    listData.forEach(ing => {
        
        const html = `
        <li class="shopping__item" data-id = "${ing.id}">
            <div class="shopping__count">
                <input type="number" value="${ing.count}" step="${ing.count}" class="count-input">
                <p>${ing.unit}</p>
            </div>
            <p class="shopping__description">${ing.ingrediants}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
        `
        elements.list.insertAdjacentHTML('beforeend', html);
        
    })
    
}

export const delItemList = id => {
    const item = document.querySelector(`[data-id="${id}"]`);
    item.parentNode.removeChild(item)
}