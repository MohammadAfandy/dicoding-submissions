import feather from 'feather-icons/dist/feather.min.js';

class SearchInput extends HTMLElement {
  set active(active) {
    this._active = active;
    this.render();
  }

  set changeEvent(event) {
    this._changeEvent = event;
    this.render();
  }

  render() {
    this.setAttribute('class', 'rounded-md flex items-center bg-white text-black py-1 px-3 w-80');
    this.innerHTML = `
      <i class="mr-4" data-feather="search"></i>
      <input id="search-input" class="outline-none w-full" placeholder="Artists, songs, albums" />
    `;
    this.querySelector('input').addEventListener('change', this._changeEvent);
    feather.replace();
  }
}

customElements.define('search-input', SearchInput);
