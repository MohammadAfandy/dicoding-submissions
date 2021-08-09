import feather from 'feather-icons/dist/feather.min.js';

class MenuItem extends HTMLElement {
  get menu() {
    return this._menu;
  }

  set menu(menu) {
    this._menu = menu;
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    this.render();
  }

  static get observedAttributes() {
    return ['active'];
  }

  render() {
    const { icon, text } = this._menu;

    const isActive = this.getAttribute('active');
    const activeClass = isActive ? 'bg-gray-500 bg-opacity-50 text-white font-bold' : 'text-gray-400';

    this.setAttribute('class', `class="group flex px-6 py-2 mb-4 cursor-pointer text-sm items-center rounded-md hover:text-white ${activeClass}`);
    this.innerHTML = `
      <i class="mr-4" data-feather="${icon}"></i>
      <span class="menu-name">${text}</span>
    `;
    this.addEventListener('click', this._clickEvent);
    feather.replace();
  }
}

customElements.define('menu-item', MenuItem);
