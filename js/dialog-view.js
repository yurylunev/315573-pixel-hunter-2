import AbstractView from "./abstract-view";
/**
 * Модуль DialogView описывает внешний вид и поведение
 * диалоговых окон в нашем приложении
 **/
export default class DialogView extends AbstractView {
  constructor(title, content) {
    super();
    this.title = title;
    this.content = content;
  }

  /** Геттер template создаёт разметку экрана */
  get template() {
    return `<dialog>
<form class="dialog-form" autocomplete="off">

    <div class="dialog-header">
      ${this.title}
      <span class="dialog-close">×</span>
    </div>

    <div class="dialog-content">
      ${this.content}
    </div>

    <div class="dialog-footer">
      <button class="button dialog-submit">OK</button>
      <button class="button dialog-cancel">Отмена</button>
    </div>
  </form>
</dialog>`;
  }

  /**
   * Метод bind описывает поведение диалогового окна.
   * Обратите внимание, что метод не вызывает напрямую действия,
   * которые должны произойти по нажатию на кнопку, а вместо
   * этого вызывает коллбэк onConfirm или onCancel
   * в зависимости от выбора пользователя, который будет
   * переопределяться снаружи (паттерн «Слушатель»)
   **/
  bind() {
    const closeButton = this.element.querySelector(`.dialog-close`);
    const cancelButton = this.element.querySelector(`.dialog-cancel`);
    const confirmButton = this.element.querySelector(`.dialog-submit`);

    const cancelHandler = (evt) => {
      evt.stopPropagation();
      evt.preventDefault();

      this.onCancel();
    };

    cancelButton.addEventListener(`click`, cancelHandler);
    closeButton.addEventListener(`click`, cancelHandler);

    confirmButton.addEventListener(`click`, (evt) => {
      evt.stopPropagation();
      evt.preventDefault();

      this.onConfirm();
    });

  }

  onCancel() {
  }

  onConfirm() {
  }
}
