const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

let items = [];

shoppingForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    items.push(`${shoppingForm.item.value}`);
    const html = items.map( function(item) {
        return`
        <li class='shopping-item'>
        <input type='checkbox'>
        <span>${item}</span>
        <button class='deleteButt' >&times</button>
        </li>
        `
    }).join('');
    list.innerHTML = html;
    e.target.reset();
    list.dispatchEvent( new CustomEvent('itemsUpdated'));
}


function handleDelete() {
    //const deleteButt = document.querySelectorAll('.deleteButt');
    this.currentTarget.parentElement.remove();
};

function handleCheck() {

}

function mirrorLocalStorage() {
    console.log(list)
    localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
    if (!items.length) {
        let lsItems = JSON.parse(localStorage.getItem('items'));
        console.log(lsItems)
        items = [...lsItems];
        console.log(items)
    }
    list.dispatchEvent(new CustomEvent('restore'))
}

list.addEventListener('itemsUpdated',mirrorLocalStorage)
list.addEventListener('restore', handleSubmit);
restoreFromLocalStorage();
