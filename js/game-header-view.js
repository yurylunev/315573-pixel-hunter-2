import AbstractView from "./abstract-view";

export default class GameHeader extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `  <header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
    ${(this.state.time !== undefined) ? `<div class="game__timer">${this.state.time}</div>` : ``}
    ${(this.state.lives) ? this._getLives() : ``}
  </header>`;
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

  get _getLives() {
    const MAX_LIVES = 3;
    let html = ``;
    for (let i = MAX_LIVES; i > 0; i--) {
      html += (this.state.lives < i)
        ? `<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`
        : `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`;
    }
    return `<div class="game__lives">${html}</div>`;
  }
}
