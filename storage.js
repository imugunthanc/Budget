class Storage {
    constructor() {
        this.available;
        this.spendings;
        this.budget;
        this.dom =
            {
                queue:
                    [
                        { id: 0, name: "Dummy", price: 50 }
                    ]
            };
        this.counter = 0;

    }
    getLocalStorage() {
        if (localStorage.getItem('available') === null) {
            this.available = 0;
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

        return {
            available: this.available,
            spendings: this.spendings,
            budget: this.budget
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
        restoredDom.queue.push({
            id: this.counter,
            name: inName.value,
            price: inPrice.value
        });
        localStorage.setItem('dom', JSON.stringify(restoredDom));
        // outputIt();
        this.counter = this.counter + 1;
    }

}