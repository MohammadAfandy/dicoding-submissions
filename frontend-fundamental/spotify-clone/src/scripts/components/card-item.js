class CardItem extends HTMLElement {
  get card() {
    return this._card;
  }

  set card(card) {
    this._card = card;
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  render() {
    this.setAttribute('class', 'group block cursor-pointer h-72 min-w-52 transition duration-300 ease-in-out p-4 bg-light-black hover:bg-light-black-1 rounded-xl');

    const {
      name,
      image,
      description,
    } = this._card;

    this.innerHTML = `
      <div>
        ${image ? (`
          <img src="${image}" alt="${name}" class="w-full h-48 rounded-xl" />
        `) : (`
          <div class="flex justify-center items-center w-full h-48 bg-light-black-1 rounded-xl">
            <i class="w-24 h-24" data-feather="music"></i>
          </div>
        `)}
      </div>
      <div class="text-sm font-bold mt-2">
        <div class="truncate">${name}</div>
        <div class="text-sm font-light text-gray-300 truncate">
          ${description || ''}
        </div>
      </div>
    `;
    this.addEventListener('click', this._clickEvent);

    /**
     * ini masih bingung juga kenapa di file ini aja yang harus dynamic import feather-icon nya
     * padahal di file lain bisa pake import biasa
     * mungkin karena di render innerHTML nya pake condition
     */
    import('feather-icons/dist/feather.min.js').then((feather) => feather.replace());
  }
}

customElements.define('card-item', CardItem);
