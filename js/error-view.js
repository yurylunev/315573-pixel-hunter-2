import AbstractView from './abstract-view.js';

class ErrorView extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `
      <div class="end">
        <p>Произошла ошибка: ${this.error.message}</p>
      </div>`;
  }

}

export default ErrorView;
