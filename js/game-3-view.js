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
    <p class="game__task">${this.question.text}</p>
    <form class="game__content  game__content--triple">
      ${this.question.images.reduce((html, image, index) => html + `<div class="game__option">
        <img src="${image.url}" alt="Option ${index}" width="${image.width}" height="${image.height}">
      </div>`, ``)}
    </form>
    ${getStatusBar(this.answers)}
  </section>`;
  }

  bind(element, callback) {
    const availableAnswers = Array.from(new Set(this.question.images.map((image) => image.rightAnswer)));
    const sameQuestions = this.question.images.filter((image) => image.rightAnswer === availableAnswers[0]);
    const currentRightAnswer = (sameQuestions.length === 1) ? availableAnswers[0] : availableAnswers[1];
    element.querySelectorAll(`.game__option`).forEach((answer, index) => {
      const isCorrect = this.question.images[index].rightAnswer === currentRightAnswer;
      if (DEBUG && isCorrect) {
        answer.style.cssText = DEBUG_STYLE;
      }
      answer.addEventListener(`click`, () => callback(isCorrect));
    });
  }
}

export default Game3View;
