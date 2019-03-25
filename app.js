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
                <p class="item-id">${item.id}</p>
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
            let idContent = parseInt(par.querySelector('.item-id').innerHTML);
            tracker.removeChild(par);
            let list = JSON.parse(localStorage.getItem('dom'));
            list.queue.forEach(li => {
                if (li.id == idContent) {
                    let indexID = list.queue.indexOf(li);
                    list.queue.splice(indexID, 1);
                    localStorage.setItem('dom', JSON.stringify(list));
                }
            })
        }
        reCalculate();
    })
}
deleteItem();

//Clear All Inputs and Rest the Budget Value//
document.getElementById('clear-all').addEventListener('click', ClearAll);
// document.getElementById('clear-all').addEventListener('click', reCalculate);
function ClearAll() {
    let check = popup();
    storage.setLocalStorage(check, 0, check);
    localStorage.setItem('dom', JSON.stringify({ queue: [] }));
    localStorage.setItem('counter', 0);
    document.querySelector('.tracker').innerHTML = '';
}
function popup() {
    var budgetInput = prompt("Set Your New Budget", 500);
    if (budgetInput != null) {
        document.querySelector('.total-budget span').innerHTML = parseInt(budgetInput);
        document.querySelector('.total-balance span').innerHTML = parseInt(budgetInput);
        document.querySelector('.total-spendings span').innerHTML = 0;
    }
    return budgetInput;
}

function reCalculate() {
    let list = JSON.parse(localStorage.getItem('dom'));
    let calcSpend = 0;
    list.queue.forEach(li => {
        calcSpend += parseInt(li.price);
        return calcSpend;
    })
    let budg = parseInt(localStorage.getItem('budget'));
    let avail = budg - calcSpend;
    document.querySelector('.total-balance span').innerHTML = avail;
    document.querySelector('.total-spendings span').innerHTML = calcSpend;
    localStorage.setItem('spendings', calcSpend);
    localStorage.setItem('available', avail);
}