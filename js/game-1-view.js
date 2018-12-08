import AbstractView from "./abstract-view";
import getStatusBar from "./answers-status";

export default class Game1View extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `  <section class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      ${this.state.questions[this.state.level].reduce((html, question, index) => html + `<div class="game__option">
        <img src="${question.image}" alt="Option ${index}" width="468" height="458">
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
    ${getStatusBar(this.state.answers)}
  </section>`;
  }

  bind(element, callback) {
    const answers = element.querySelectorAll(`.game__answer`);
    answers.forEach((label) => {
      label.control.addEventListener(`click`, () => {
        let checkedAnswers = [];
        answers.forEach((answer) => {
          if (answer.control.checked) {
            checkedAnswers.push(answer);
          }
        });
        if (checkedAnswers.length === 2) {
          if (checkedAnswers.reduce((flag, answer, index) => (flag && (answer.control.value === this.state.questions[this.state.level][index].rightAnswer)), true)) {
            callback(`correct`);
          } else {
            callback(`wrong`);
          }
        }
      });
    });
  }
}
