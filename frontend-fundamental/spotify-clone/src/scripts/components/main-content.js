class MainContent extends HTMLElement {
  constructor() {
    super();
    this._content = null;
    this._loading = false;
  }

  connectedCallback() {
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="text-center">
        <h1 class="text-2xl mb-4">
          Selamat Datang di Aplikasi Spotify Clone
        </h1>
        <h3>
          Aplikasi ini merupakan submission tugas akhir untuk kelas "Belajar Fundamental Front-End Web Development"
        </h3>
        <h3>
          Aplikasi ini bisa digunakan untuk mencari data artist, album, playlist yang ada di spotify
        </h3>
      </div>
    `;
    this._content = container;
    this.render();
  }

  // it takes html node element as parameter
  set content(content) {
    this._content = content;
    this.render();
  }

  set loading(loading) {
    this._loading = loading;
    this.render();
  }

  render() {
    this.innerHTML = '';
    this.setAttribute('class', 'relative overflow-auto flex flex-col w-auto sm:ml-52 mt-16 px-4 py-4');
    this.style.height = 'calc(100vh - 4rem)'; // 4rem from tailwind mt-16

    if (this._loading) {
      import('../components/loading-spinner.js').then(() => {
        const loadingElement = document.createElement('loading-spinner');
        this.appendChild(loadingElement);
      });
    } else {
      if (this._content) {
        this.appendChild(this._content);
      }
    }
  }

  renderError(error) {
    const errorContainer = document.createElement('div');
    errorContainer.setAttribute('class', 'text-red-400');
    errorContainer.innerHTML = error;
    this._content = errorContainer;
  }
}

customElements.define('main-content', MainContent);
