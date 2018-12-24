import AbstractView from "./abstract-view";
import getStatusBar from "./answers-status";
import {countScore, countFastAnswers, countRightAnswers, countSlowAnswers} from "./data/game-score";
import {isDead} from "./data/game-lives";

class StatsView extends AbstractView {
  constructor(data) {
    super();
    this.data = data.sort((a, b) => b.date - a.date);
  }

  get template() {
    return `  <section class="result">
    <h2 class="result__title">${(isDead(this.data[0])) ? `Поражение!` : `Победа!`}</h2>
    ${this.data.reduce((html, score, index) => html + this._getResult(score, index + 1), ``)}
  </section>`;
  }

  _getResult(score, index) {
    if (isDead(score)) {
      return `<table class="result__table">
      <tr>
        <td class="result__number">${index}.</td>
        <td>
          ${getStatusBar(score.stats)}
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>`;
    } else {
      return `<table class="result__table">
      <tr>
        <td class="result__number">${index}.</td>
        <td colspan="2">
          ${getStatusBar(score.stats)}
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">${countRightAnswers(score.stats) * 100}</td>
      </tr>
      ${this._getExtras(score)}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${countScore(score.stats, score.lives)}</td>
      </tr>
    </table>`;
    }
  }

  _getExtras(score) {
    const extraTemplate = (description, extraCount, extraScore) => `<tr>
        <td></td>
        <td class="result__extra">${description}:</td>
        <td class="result__extra">${extraCount} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× ${Math.abs(extraScore)}</td>
        <td class="result__total">${extraCount * extraScore}</td>
      </tr>`;
    let html = ``;
    if (countFastAnswers(score.stats)) {
      html += extraTemplate(`Бонус за скорость`, countFastAnswers(score.stats), 50);
    }
    if (!isDead(score)) {
      html += extraTemplate(`Бонус за жизни`, score.lives, 50);
    }
    if (countSlowAnswers(score.stats)) {
      html += extraTemplate(`Штраф за медлительность`, countSlowAnswers(score.stats), -50);
    }
    return html;
  }
}

export default StatsView;
