import AbstractView from '../abstract-view.js';

class ConfirmView extends AbstractView {
  get template() {
    return `<section class="modal">
    <form class="modal__inner">
      <button class="modal__close" type="button">
        <span class="visually-hidden">Закрыть</span>
      </button>
      <h2 class="modal__title">Подтверждение</h2>
      <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal__button-wrapper">
        <button class="modal__btn">Ок</button>
        <button class="modal__btn">Отмена</button>
      </div>
    </form>
  </section>`;
  }

  bind(element, callback) {
    const removeModal = () => {
      element.remove();
    };
    const onFirstScreen = (e) => {
      e.preventDefault();
      removeModal();
      return callback();
    };
    const onCloseButton = (e) => {
      e.preventDefault();
      removeModal();
      return this.hide();
    };
    document.body.appendChild(element);
    const buttons = element.querySelectorAll(`button.modal__btn`);
    buttons[0].addEventListener(`click`, (e) => onFirstScreen(e));
    buttons[1].addEventListener(`click`, (e) => onCloseButton(e));
    element.querySelector(`button.modal__close`).addEventListener(`click`, (e) => onCloseButton(e));
  }

  show() {
    this.element.style.display = `flex`;
  }

  hide() {
    this.element.style.display = `none`;
  }

}

export default ConfirmView;
