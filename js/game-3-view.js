import AbstractView from "./abstract-view";
import getStatusBar from "./answers-status";

export default class Game3View extends AbstractView {
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
        <img src="${question.image}" alt="Option ${index}" width="304" height="455">
      </div>`, ``)}
    </form>
    ${getStatusBar(this.answers)}
  </section>`;
  }

  bind(element, callback) {
    element.querySelectorAll(`.game__option`).forEach((answer, index) => {
      answer.addEventListener(`click`,
          () => callback((this.question[index].rightAnswer === `paint`)));
    });
  }
}
