import styles from './loading-spinner.module.css';

class LoadingSpinner extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="absolute top-1/3 inset-x-0 mx-auto w-32">
        <div class="${styles.loader} ease-linear rounded-full border-8 h-32 w-full"></div>
      </div>
    `;
  }
}

customElements.define('loading-spinner', LoadingSpinner);
