import AbstractView from "./abstract-view";
import getStatusBar from "./answers-status";

export default class Game1View extends AbstractView {
  constructor(callback, question, answers) {
    super(callback);
    this.question = question;
    this.answers = answers;
  }

  get template() {
    return `  <section class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      ${this.question.reduce((html, question, index) => html + `<div class="game__option">
        <img src="${question.image.url}" alt="Option ${index}" width="${question.image.width}" height="${question.image.height}">
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
    answers.forEach((label) => {
      label.control.addEventListener(`click`, () => {
        let checkedAnswers = [];
        answers.forEach((answer) => {
          if (answer.control.checked) {
            checkedAnswers.push(answer);
          }
        });
        if (checkedAnswers.length === 2) {
          callback((checkedAnswers.reduce(
              (flag, answer, index) => (flag && (answer.control.value === this.question[index].rightAnswer)), true)));
        }
      });
    });
  }
}
