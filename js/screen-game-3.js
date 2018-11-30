import {getElementFromTemplate} from "./utlis";
import getHeader from "./game-header";
import getStatusBar from "./answers-status";

const game3 = (callback, state) => {
  const wrapper = document.createElement(`div`);
  const game3Element = getElementFromTemplate(`  <section class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      ${state.questions[state.level].reduce((html, question, index) => html + `<div class="game__option">
        <img src="${question.image}" alt="Option ${index}" width="304" height="455">
      </div>`, ``)}
    </form>
    ${getStatusBar(state.answers)}
  </section>`);

  game3Element.querySelectorAll(`.game__option`).forEach((answer, index) => {
    if (state.questions[state.level][index].rightAnswer === `paint`) {
      answer.addEventListener(`click`, () => callback(`correct`));
    } else {
      answer.addEventListener(`click`, () => callback(`wrong`));
    }
  });

  wrapper.appendChild(getHeader(state.time, state.lives));
  wrapper.appendChild(game3Element);
  return wrapper;
};

export default game3;
