import './card-list.js';
import './card-item.js';

class SearchList extends HTMLElement {
  constructor() {
    super();
    this._type = '';
    this._results = [];
    this._seeAllEvent = null;
    this._itemClickEvent = null;
  }

  get type() {
    return this._type;
  }

  get results() {
    return this._results;
  }

  set results(results) {
    this._results = results;
    this.render();
  }

  set type(type) {
    this._type = type;
    this.render();
  }

  set seeAllEvent(event) {
    this._seeAllEvent = event;
    this.render();
  }

  set itemClickEvent(event) {
    this._itemClickEvent = event;
    this.render();
  }

  render() {
    this.setAttribute('class', 'block mb-8');
    this.innerHTML = `
      <div class="mb-4 flex justify-between items-end mr-8 font-bold">
        <div class="text-2xl">
          ${this._type.toUpperCase()}
        </div>
        <span class="hover:underline cursor-pointer see-all">
          See All
        </span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 list-container">

      </div>
    `;

    this._results.slice(0, 5).forEach((card) => {
      const cardItemElement = document.createElement('card-item');
      cardItemElement.card = card;
      cardItemElement.clickEvent = this._itemClickEvent;
      this.querySelector('.list-container').appendChild(cardItemElement);
    });

    this.querySelector('.see-all').addEventListener('click', this._seeAllEvent);
  }
}

customElements.define('search-list', SearchList);
