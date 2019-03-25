class Paint {
    constructor() {
        this.spendingAmount = document.getElementById('spent-amount');
        this.spendingName = document.getElementById('spent-for');
        this.balance = document.querySelector('.total-balance span');
        this.spendings = document.querySelector('.total-spendings span');
        this.budget = document.querySelector('.total-budget span');
        this.tracker = document.querySelector('.tracker');
    }
    addition() {
        let output = parseInt(this.spendingAmount.value);
        let spentFor = this.spendingName.value;
        let count = storage.pushIt();
        if (output === '' || spentFor === '') {
            console.log('Empty');
        }
        else {
            let child =
                `<div class="wrap">
                <p class="name">${spentFor}</p>
                <p class="amount">${output}</p>
                <p class="item-id">${count}</p>
                <button class="action"><i class="material-icons">delete_outline</i></button>
            </div>`;
            this.tracker.insertAdjacentHTML('afterbegin', child);
            var newInput = storage.getLocalStorage();
            var newBudg = new Budget(newInput.available, newInput.spendings, newInput.budget);
            newBudg.displayBudget(output);
            this.spendingAmount.value = '';
            this.spendingName.value = '';
        }
    }

}