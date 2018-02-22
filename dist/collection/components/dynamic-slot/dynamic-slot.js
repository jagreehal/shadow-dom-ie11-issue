export class DynamicSlot {
    constructor() {
        this.selectedIndex = 0;
        this.items = [];
        this.updateDisplay = (description, item, index) => {
            description.removeAttribute('slot');
            if (description.getAttribute('data-name') === item.textContent) {
                description.setAttribute('slot', 'choice');
                item.style.backgroundColor = '#bad0e4';
                this.selectedIndex = index;
            }
        };
        this.handleClick = (item, index) => {
            item.addEventListener('click', () => {
                for (let i = 0; i < this.items.length; i = i + 1) {
                    this.items[i].style.backgroundColor = 'white';
                }
                for (let j = 0; j < this.descriptions.length; j = j + 1) {
                    this.updateDisplay(this.descriptions[j], item, index);
                }
            });
        };
        this.renderItemList = index => {
            return h("p", null, this.selectedIndex === index ? h("slot", { name: "choice" }) : '*');
        };
    }
    componentDidLoad() {
        // get all descriptions
        this.descriptions = [].slice.call(this.el.querySelectorAll('p'));
        // builds master list
        const ul = document.createElement('ul');
        this.descriptions.forEach(description => {
            const li = document.createElement('li');
            li.innerText = description.dataset.name;
            ul.appendChild(li);
        });
        ul.setAttribute('slot', 'master-list');
        this.el.appendChild(ul);
        this.items = [].slice.call(this.el.querySelectorAll('li'));
        this.items.forEach((item, index) => {
            this.handleClick(item, index);
        });
    }
    render() {
        // loop over items and output slot for the item selected
        // @ts-ignore
        const els = this.items.map((item, index) => {
            if (this.selectedIndex === index) {
                return (h("p", null,
                    h("slot", { name: "choice" })));
            }
            return h("p", null, "*");
        });
        return (h("article", null,
            h("div", null,
                h("slot", { name: "master-list" })),
            h("div", null, els)));
    }
    static get is() { return "dynamic-slot"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "el": { "elementRef": true }, "items": { "state": true }, "selectedIndex": { "state": true } }; }
}
