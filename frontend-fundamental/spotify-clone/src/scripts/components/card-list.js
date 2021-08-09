import './card-item.js';

class CardList extends HTMLElement {
  constructor() {
    super();
    this._type = '';
    this._cards = [];
    this._itemClickEvent = null;
  }

  set type(type) {
    this._type = type;
    this.render();
  }

  set cards(cards) {
    this._cards = cards;
    this.render();
  }

  set itemClickEvent(event) {
    this._itemClickEvent = event;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="mb-4 font-bold">
        <div class="text-2xl">
          ${this._type.toUpperCase()}
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 list-container">

      </div>
    `;

    this._cards.forEach((card) => {
      const cardItemElement = document.createElement('card-item');
      cardItemElement.card = card;
      cardItemElement.clickEvent = this._itemClickEvent;
      this.querySelector('.list-container').appendChild(cardItemElement);
    });
  }
}

customElements.define('card-list', CardList);
