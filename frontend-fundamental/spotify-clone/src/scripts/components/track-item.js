class TrackItem extends HTMLElement {
  set track(track) {
    this._track = track;
    this.render();
  }

  render() {
    this.setAttribute('class', 'flex justify-between w-full py-2 px-4 hover:bg-gray-100 hover:bg-opacity-25 rounded-md text-sm');

    const {
      name,
      artists,
      duration_ms,
    } = this._track;

    this.innerHTML = `
      <div class="flex items-center pr-10 min-w-0">
        <div class="flex flex-col justify-end min-w-0">
          <div class="truncate font-bold">
            ${name}
          </div>
          <div class="truncate font-light">
            ${artists}
          </div>
        </div>
      </div>
      <div>
        ${new Date(duration_ms).toISOString().substr(14, 5)}
      </div>
    `;
  }
}

customElements.define('track-item', TrackItem);
