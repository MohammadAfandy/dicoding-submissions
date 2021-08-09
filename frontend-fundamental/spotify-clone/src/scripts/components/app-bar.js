/**
 * harusnya importnya dari 'feather-icons'
 * tapi coba dari file feather.min.js karena ukurannya lebih kecil
 */
import feather from 'feather-icons/dist/feather.min.js';

class AppBar extends HTMLElement {
  constructor() {
    super();
    this._search = false;
  }

  connectedCallback() {
    this.render();
  }

  get searchValue() {
    return this.querySelector('#search-input').value;
  }

  set search(isSearch) {
    this._search = isSearch;
    this.render();
  }

  set searchEvent(event) {
    this._searchEvent = event;
    this.render();
  }

  set mobileMenuEvent(event) {
    this._mobileMenuEvent = event;
    this.render();
  }

  render() {
    this.setAttribute('class', 'fixed flex box-shadow w-auto items-center justify-between left-0 sm:left-52 right-0 top-0 px-8 h-16 z-10');

    this.innerHTML = `
      <div class="flex sm:hidden items-center">
        <i data-feather="menu" id="mobile-btn" class="cursor-pointer"></i>
      </div>
      <div class="${this._search ? 'flex' : 'hidden'} items-center justify-center">
        <div id="search-input-container" class="rounded-md flex items-center bg-white text-black py-1 px-3 w-full md:w-80">
          <i class="mr-4" data-feather="search"></i>
          <input id="search-input" class="outline-none w-full" placeholder="albums, artists, playlists" value="" />
        </div>
      </div>
      <div class="${this._search ? 'hidden' : ''}">
        <span>Created By Mohammad Afandy</span>
      </div>
      <div class="flex items-center">
        <i class="mr-4" data-feather="user"></i>
        <span class="hidden sm:block">username</span>
      </div>
    `;

    this.querySelector('#search-input').addEventListener('input', this._searchEvent);
    feather.replace();

    // ini harus setelah feather.replace karena eventlistener nya bisa tereplace oleh fungsi dari feather
    this.querySelector('#mobile-btn').addEventListener('click', this._mobileMenuEvent);
  }
}

customElements.define('app-bar', AppBar);
