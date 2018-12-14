import AbstractView from "./abstract-view";
import getStatusBar from "./answers-status";

export default class Game3View extends AbstractView {
  get template() {
    return `  <section class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      ${this.state.questions[this.state.level].reduce((html, question, index) => html + `<div class="game__option">
        <img src="${question.image}" alt="Option ${index}" width="304" height="455">
      </div>`, ``)}
    </form>
    ${getStatusBar(this.state.answers)}
  </section>`;
  }

  bind(element, callback) {
    element.querySelectorAll(`.game__option`).forEach((answer, index) => {
      answer.addEventListener(`click`,
          () => callback(this.state, (this.state.questions[this.state.level][index].rightAnswer === `paint`)));
    });
  }
}