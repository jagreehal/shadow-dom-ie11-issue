import { Component, Element, State } from '@stencil/core';

@Component({
  tag: 'dynamic-slot',
  shadow: true
})
export class DynamicSlot {
  descriptions: any;

  @Element() el;
  @State() selectedIndex = 0;
  @State() items = [];

  updateDisplay = (description, item, index) => {
    description.removeAttribute('slot');

    if (description.getAttribute('data-name') === item.textContent) {
      description.setAttribute('slot', 'choice');
      item.style.backgroundColor = '#bad0e4';
      this.selectedIndex = index;
    }
  };

  handleClick = (item, index) => {
    item.addEventListener('click', () => {
      for (let i = 0; i < this.items.length; i = i + 1) {
        this.items[i].style.backgroundColor = 'white';
      }

      for (let j = 0; j < this.descriptions.length; j = j + 1) {
        this.updateDisplay(this.descriptions[j], item, index);
      }
    });
  };

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

  renderItemList = index => {
    return <p>{this.selectedIndex === index ? <slot name="choice" /> : '*'}</p>;
  };

  render() {
    // loop over items and output slot for the item selected
    // @ts-ignore
    const els = this.items.map((item, index) => {
      if (this.selectedIndex === index) {
        return (
          <p>
            <slot name="choice" />
          </p>
        );
      }
      return <p>*</p>;
    });
    return (
      <article>
        <div>
          <slot name="master-list" />
        </div>

        <div>{els}</div>
      </article>
    );
  }
}
