import AbstractView from "./abstract-view";

const getElementFromTemplate = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element.children[0];
};

class GameHeaderView extends AbstractView {
  constructor(callback, lives = null, time = null, blink = false) {
    super(callback);
    this.lives = lives;
    this.timer = time;
    this.blink = blink;
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
    ${this._timerTemplate}
    ${this._getLivesTemplate}
  </header>`;
  }

  get _timerTemplate() {
    return `<div class="game__timer${this.blink ? ` blink` : ``}">${(this.timer !== null) ? this.timer : ``}</div>`;
  }

  get _getLivesTemplate() {
    const MAX_LIVES = 3;
    let html = ``;
    for (let i = MAX_LIVES; i > 0; i--) {
      html += (this.lives < i)
        ? `<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`
        : `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`;
    }
    return `<div class="game__lives">${(this.lives !== null) ? html : ``}</div>`;
  }

  updateLives() {
    const updateElement = this.root.querySelector(`header`);
    if (updateElement) {
      const lives = updateElement.querySelector(`.game__lives`);
      updateElement.replaceChild(getElementFromTemplate(this._getLivesTemplate), lives);
    }
  }

  updateTimer() {
    const updateElement = this.root.querySelector(`header`);
    if (updateElement) {
      const timer = updateElement.querySelector(`.game__timer`);
      updateElement.replaceChild(getElementFromTemplate(this._timerTemplate), timer);
    }
  }

  clean(element) {
    const header = element.querySelector(`header`);
    if (header) {
      header.remove();
    }
  }

  bind(element, callback) {
    element.querySelector(`.back`).addEventListener(`click`, callback);
  }
}

export default GameHeaderView;
