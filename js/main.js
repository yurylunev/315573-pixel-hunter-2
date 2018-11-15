'use strict';
const screens = [`intro`, `greeting`, `rules`, `game-1`, `game-2`, `game-3`, `stats`]
  .map((screenName) => document.querySelector(`template#${screenName}`));
const rootElement = document.querySelector(`#main`);
let currentScreen = -1;

const wrap = (it) => {
  const shadow = document.createElement(`div`);
  const content = it.content.cloneNode(true);
  shadow.appendChild(content);
  return shadow.cloneNode(true);
};

const nextScreen = () => Math.min(screens.length - 1, Math.max(0, currentScreen + 1));
const previousScreen = () => Math.min(screens.length - 1, Math.max(0, currentScreen - 1));

const showScreen = (screenNumber) => {
  if (currentScreen !== screenNumber) {
    rootElement.innerHTML = ``;
    rootElement.appendChild(wrap(screens[screenNumber]));
    currentScreen = screenNumber;
  }
};

showScreen(0);

document.addEventListener(`keyup`, (event) => {
  switch (event.key) {
    case `ArrowRight`:
      showScreen(nextScreen());
      break;
    case `ArrowLeft`:
      showScreen(previousScreen());
      break;
  }
});

const arrows = document.createElement(`div`);
arrows.classList.add(`arrows__wrap`);
arrows.innerHTML = `<style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>`;

const arrowButtons = arrows.querySelectorAll(`button.arrows__btn`);
arrowButtons[0].addEventListener(`click`, () => {
  showScreen(nextScreen());
});
arrowButtons[1].addEventListener(`click`, () => {
  showScreen(previousScreen());
});

document.body.appendChild(arrows);
