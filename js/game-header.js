import {getElementFromTemplate, onContinueClick, renderScreen} from "./utlis";
import greeting from "./screen-greeting";

const getLives = (lives, maxCount = 3) => {
  let html = ``;
  for (let i = maxCount; i > 0; i--) {
    html += (lives < i)
      ? `<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`
      : `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`;
  }
  return `<div class="game__lives">${html}</div>`;
};

const getHeader = (time, lives) => {
  const header = getElementFromTemplate(`  <header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
    ${(time !== undefined) ? `<div class="game__timer">${time}</div>` : ``}
    ${(lives) ? getLives(lives) : ``}
  </header>`);

  (header.querySelector(`button.back`)).addEventListener(`click`, () => {
    renderScreen(greeting, onContinueClick);
  });
  return header;
};

export default getHeader;
