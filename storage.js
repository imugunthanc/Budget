class Storage {
    constructor() {
        this.available;
        this.spendings;
        this.budget;
        // this.dom =
        //     {
        //         queue:
        //             [
        //                 { id: 0, name: "Dummy", price: 50 }
        //             ]
        //     };
        this.counter;
    }
    getLocalStorage() {
        if (localStorage.getItem('available') === null) {
            this.available = 1000;
        }
        else {
            this.available = localStorage.getItem('available');
        }
        if (localStorage.getItem('spendings') === null) {
            this.spendings = 0;
        }
        else {
            this.spendings = localStorage.getItem('spendings');
        }
        if (localStorage.getItem('budget') === null) {
            this.budget = 1000;
        }
        else {
            this.budget = localStorage.getItem('budget');
        }
        if (localStorage.getItem('counter') === null) {
            this.counter = 0;
        }
        else {
            this.counter = localStorage.getItem('counter');
        }
        return {
            available: this.available,
            spendings: this.spendings,
            budget: this.budget,
            counter: this.counter
        }
    }
    setLocalStorage(available, spendings, budget) {
        localStorage.setItem('available', available);
        localStorage.setItem('spendings', spendings);
        localStorage.setItem('budget', budget);
    }
    pushIt() {
        var restoredDom = JSON.parse(localStorage.getItem('dom'));
        var inName = document.getElementById('spent-for');
        var inPrice = document.getElementById('spent-amount');
        let countCheck = parseInt(localStorage.getItem('counter'));
        restoredDom.queue.push({
            id: countCheck,
            name: inName.value,
            price: inPrice.value
        });
        localStorage.setItem('dom', JSON.stringify(restoredDom));
        countCheck = countCheck + 1;
        localStorage.setItem('counter', JSON.stringify(countCheck));
        return this.counter;
    }
}