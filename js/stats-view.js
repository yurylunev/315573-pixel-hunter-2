import AbstractView from "./abstract-view";
import getStatusBar from "./answers-status";
import {hasLives, isDead} from "./data/game-lives";
import {countScore, fastAnswersCount, rightAnswersCount, slowAnswersCount} from "./data/game-score";

export default class StatsView extends AbstractView {
  get template() {
    return `  <section class="result">
    <h2 class="result__title">${(isDead(this.state)) ? `Поражение!` : `Победа!`}</h2>
    ${this._getResult(this.state)}
  </section>`;
  }

  _getResult() {
    if (isDead(this.state)) {
      return `<table class="result__table">
      <tr>
        <td>
          ${getStatusBar(this.state.answers)}
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>`;
    } else {
      return `<table class="result__table">
      <tr>
        <td colspan="2">
          ${getStatusBar(this.state.answers)}
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">${rightAnswersCount(this.state.answers) * 100}</td>
      </tr>
      ${this._getExtras(this.state)}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${countScore(this.state.answers, this.state.lives)}</td>
      </tr>
    </table>`;
    }
  }

  _getExtras() {
    const extraTemplate = (description, extraCount, extraScore) => `<tr>
        <td></td>
        <td class="result__extra">${description}:</td>
        <td class="result__extra">${extraCount} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× ${Math.abs(extraScore)}</td>
        <td class="result__total">${extraCount * extraScore}</td>
      </tr>`;
    let html = ``;
    if (fastAnswersCount(this.state.answers)) {
      html += extraTemplate(`Бонус за скорость:`, fastAnswersCount(this.state.answers), 50);
    }
    if (hasLives(this.state)) {
      html += extraTemplate(`Бонус за жизни`, this.state.lives, 50);
    }
    if (slowAnswersCount(this.state.answers)) {
      html += extraTemplate(`Штраф за медлительность`, slowAnswersCount(this.state.answers), -50);
    }
    return html;
  }
}
