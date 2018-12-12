import AbstractView from "./abstract-view";
import getStatusBar from "./answers-status";
import GameHeader from "./game-header-view";

export default class Game2View extends AbstractView {
  get template() {
    return `  <section class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${this.state.questions[this.state.level][0].image}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    ${getStatusBar(this.state.answers)}
  </section>`;
  }

  get _header() {
    return new GameHeader(this.backButton, this.state);
  }

  bind(element, callback) {
    element.querySelectorAll(`.game__answer`).forEach((answer) => {
      if (this.state.questions[this.state.level][0].rightAnswer === answer.control.value) {
        answer.control.addEventListener(`click`, () => callback(this.state, `correct`));
      } else {
        answer.control.addEventListener(`click`, () => callback(this.state, `wrong`));
      }
    });
  }
}
