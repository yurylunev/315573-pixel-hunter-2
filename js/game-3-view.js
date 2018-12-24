import AbstractView from "./abstract-view";
import getStatusBar from "./answers-status";
import {DEBUG, DEBUG_STYLE} from "./data/debug-settings";

class Game3View extends AbstractView {
  constructor(callback, question, answers) {
    super(callback);
    this.question = question;
    this.answers = answers;
  }

  get template() {
    return `  <section class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      ${this.question.reduce((html, question, index) => html + `<div class="game__option">
        <img src="${question.image.url}" alt="Option ${index}" width="${question.image.width}" height="${question.image.height}">
      </div>`, ``)}
    </form>
    ${getStatusBar(this.answers)}
  </section>`;
  }

  bind(element, callback) {
    element.querySelectorAll(`.game__option`).forEach((answer, index) => {
      const isCorrect = this.question[index].rightAnswer === `paint`;
      if (DEBUG && isCorrect) {
        answer.style.cssText = DEBUG_STYLE;
      }
      answer.addEventListener(`click`, () => callback(isCorrect));
    });
  }
}

export default Game3View;
