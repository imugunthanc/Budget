const storage = new Storage();
const numbers = storage.getLocalStorage();
const budget = new Budget(numbers.available, numbers.spendings, numbers.budget);
const addBudget = new Paint();

function addingBudget() {
    addBudget.addition();
}
//Adding Purchase/Spending to the DOM
document.getElementById('submit').addEventListener('click', addingBudget);
window.addEventListener('DOMContentLoaded', () => {
    budget.displayBudget(0);
    storageCheck();
    displayOld();
    registerSW();
})

async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./sw.js');
        } catch (e) {
            console.log(`SW registration failed`);
        }
    }
}
function storageCheck() {
    let checkStore = localStorage.getItem('dom');
    if (checkStore !== null) {
    }
    else {
        localStorage.setItem('dom', JSON.stringify({ queue: [] }));
    }
}

function displayOld() {
    var oldDom = JSON.parse(localStorage.getItem('dom'));
    var outputs = "";
    oldDom.queue.forEach(item => {
        outputs +=
            `<div class="wrap">
                <p class="name">${item.name}</p>
                <p class="amount">${item.price}</p>
                <button class="action"><i class="material-icons">delete_outline</i></button>
            </div>`;
    });
    document.querySelector(".tracker").innerHTML = outputs;
}

function deleteItem() {
    let tracker = document.querySelector('.tracker');
    tracker.addEventListener('click', () => {
        target = event.target.parentElement;
        if (target.className == 'action') {
            let par = target.parentElement;
            tracker.removeChild(par);
        }
        else {
            console.log('No');
        }
    })
}
deleteItem();