class Budget {
    constructor(av, sp, bud) {
        this.balance = document.querySelector('.total-balance span');
        this.spendings = document.querySelector('.total-spendings span');
        this.budget = document.querySelector('.total-budget span');
        this.spent = parseInt(sp);
        this.bal = parseInt(av);
        this.budg = parseInt(bud);
    }
    displayBudget(ou) {
        let calBal, calSpend, calBudg;
        if (ou == 0) {
            this.balance.textContent = this.bal;
            this.spendings.textContent = this.spent;
            this.budget.textContent = this.budg;
            storage.setLocalStorage(this.bal, this.spent, this.budg);
            console.log(this.bal);
            if (this.bal < 0) {
                this.balance.style.color = "red";
            }
        }
        else {
            calBudg = this.budg;
            calSpend = this.spent + ou;
            calBal = calBudg - calSpend;
            this.balance.textContent = calBal;
            this.spendings.textContent = calSpend;
            this.budget.textContent = calBudg;
            storage.setLocalStorage(calBal, calSpend, calBudg);
            if (calBal < 0) {
                this.balance.style.color = "red";
            }
        }
    }
}
