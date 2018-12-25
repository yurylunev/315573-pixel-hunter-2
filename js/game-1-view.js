import AbstractView from "./abstract-view";
import getStatusBar from "./answers-status";
import {DEBUG, DEBUG_STYLE} from "./data/debug-settings";

class Game1View extends AbstractView {
  constructor(callback, question, answers) {
    super(callback);
    this.question = question;
    this.answers = answers;
  }

  get template() {
    return `  <section class="game">
    <p class="game__task">${this.question.text}</p>
    <form class="game__content">
      ${this.question.images.reduce((html, image, index) => html + `<div class="game__option">
        <img src="${image.url}" alt="Option ${index}" width="${image.width}" height="${image.height}">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question${index}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question${index}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`, ``)}
    </form>
    ${getStatusBar(this.answers)}
  </section>`;
  }

  bind(element, callback) {
    const answers = element.querySelectorAll(`.game__answer`);
    answers.forEach((label, i) => {
      const isCorrect = this.question.images[i < 2 ? 0 : 1].rightAnswer === label.control.value;
      if (DEBUG && isCorrect) {
        label.querySelector(`span`).style.cssText = DEBUG_STYLE;
      }
      label.control.addEventListener(`click`, () => {
        const checkedAnswers = [];
        answers.forEach((answer) => {
          if (answer.control.checked) {
            checkedAnswers.push(answer);
          }
        });
        if (checkedAnswers.length === 2) {
          callback((checkedAnswers.reduce((flag) => (flag && isCorrect), true)));
        }
      });
    });
  }
}

export default Game1View;
