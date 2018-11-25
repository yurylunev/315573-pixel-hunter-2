import {getElementFromTemplate, onContinueClick, renderScreen} from "./utlis";
import greeting from "./screen-greeting";
import getStatusBar from "./answers-status";
import {hasLives, isDead} from "./data/game-lives";
import getHeader from "./game-header";
import {countScore, fastAnswersCount, rightAnswersCount, slowAnswersCount} from "./data/game-score";

const getExtras = (state) => {
  const extraTemplate = (description, extraCount, extraScore) => `<tr>
        <td></td>
        <td class="result__extra">${description}:</td>
        <td class="result__extra">${extraCount} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× ${Math.abs(extraScore)}</td>
        <td class="result__total">${extraCount * extraScore}</td>
      </tr>`;
  let html = ``;
  if (fastAnswersCount(state.answers)) {
    html += extraTemplate(`Бонус за скорость:`, fastAnswersCount(state.answers), 50);
  }
  if (hasLives(state)) {
    html += extraTemplate(`Бонус за жизни`, state.lives, 50);
  }
  if (slowAnswersCount(state.answers)) {
    html += extraTemplate(`Штраф за медлительность`, slowAnswersCount(state.answers), -50);
  }
  return html;
};

const getResult = (state) => {
  if (isDead(state)) {
    return `<table class="result__table">
      <tr>
        <td>
          ${getStatusBar(state.answers)}
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>`;
  } else {
    return `<table class="result__table">
      <tr>
        <td colspan="2">
          ${getStatusBar(state.answers)}
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">${rightAnswersCount(state.answers) * 100}</td>
      </tr>
      ${getExtras(state)}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${countScore(state.answers, state.lives)}</td>
      </tr>
    </table>`;
  }
};
const stats = (state) => {
  const statsElement = getElementFromTemplate(`${getHeader(state.time, state.lives)}
  <section class="result">
    <h2 class="result__title">${(isDead(state)) ? `Поражение!` : `Победа!`}</h2>
    ${getResult(state)}
  </section>`);

  (statsElement.querySelector(`button.back`)).addEventListener(`click`, () => {
    renderScreen(greeting, onContinueClick);
  });
  return statsElement;
};

export default stats;
