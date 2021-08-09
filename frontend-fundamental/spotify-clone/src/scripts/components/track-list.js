import './track-item.js';

class TrackList extends HTMLElement {
  constructor() {
    super();
    this._card = null;
    this._tracks = [];
  }

  set card(card) {
    this._card = card;
    this.render();
  }

  set tracks(tracks) {
    this._tracks = tracks;
    this.render();
  }

  render() {
    const { name, type, image, description } = this._card;

    this.innerHTML = `
      <div class="flex flex-col items-center sm:flex-row sm:items-end mb-6">
        <div class="mr-6">
          ${image ? (`
            <img src="${image}" alt="${name}" class="w-52 h-52 rounded-xl" />
          `) : (`
            <div class="flex justify-center items-center w-52 h-52 bg-light-black-1 rounded-xl">
              <i class="w-24 h-24" data-feather="music"></i>
            </div>
          `)}
        </div>
        <div class="font-bold text-center sm:text-left">
          <div class="mb-2 text-lg">${type}</div>
          <div class="mb-4 text-4xl">${name}</div>
          <div class="mb-2 text-sm font-light">
            ${description || ''}
          </div>
        </div>
      </div>
      <div id="tracks-container">

      </div>
    `;

    const tracksContainer = this.querySelector('#tracks-container');
    this._tracks.forEach((track) => {
      const trackItemElement = document.createElement('track-item');
      trackItemElement.track = track;
      tracksContainer.appendChild(trackItemElement);
    });

    import('feather-icons/dist/feather.min.js').then((feather) => feather.replace());
  }
}

customElements.define('track-list', TrackList);
