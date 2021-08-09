import './menu-list.js';

const menus = [
  {
    id: 'link-playlist',
    icon: 'music',
    text: 'Top Playlist',
  },
  {
    id: 'link-new-release',
    icon: 'headphones',
    text: 'New Releases',
  },
  {
    id: 'link-search',
    icon: 'search',
    text: 'Search',
  }
];

class Navbar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav class="hidden sm:flex fixed top-0 flex-col bg-light-black w-52 pr-2 pt-5 h-full animate-slide sm:animate-none">
        <div class="px-6 mb-8 text-2xl">
          Spotify Clone
        </div>
        <div class="mb-4" id="menu-container">

        </div>
      </nav>
    `;

    const menuListElement = document.createElement('menu-list');
    menuListElement.menus = menus;
    this.querySelector('#menu-container').appendChild(menuListElement);
  }
}

customElements.define('nav-bar', Navbar);
