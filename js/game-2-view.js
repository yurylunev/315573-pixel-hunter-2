import AbstractView from "./abstract-view";
import getStatusBar from "./answers-status";
import {DEBUG, DEBUG_STYLE} from "./settings";

export default class Game2View extends AbstractView {
  constructor(callback, question, answers) {
    super(callback);
    this.question = question;
    this.answers = answers;
  }

  get template() {
    return `  <section class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${this.question[0].image.url}" alt="Option 1" width="${this.question[0].image.width}" height="${this.question[0].image.height}">
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
    ${getStatusBar(this.answers)}
  </section>`;
  }

  bind(element, callback) {
    element.querySelectorAll(`.game__answer`).forEach((answer) => {
      const isCorrect = this.question[0].rightAnswer === answer.control.value;
      if (DEBUG && isCorrect) {
        answer.querySelector(`span`).style.cssText = DEBUG_STYLE;
      }
      answer.control.addEventListener(`click`, () => callback(isCorrect));
    });
  }
}
