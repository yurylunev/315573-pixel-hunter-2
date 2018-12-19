import AbstractView from "./abstract-view";
import getStatusBar from "./answers-status";
import {countScore, fastAnswersCount, rightAnswersCount, slowAnswersCount} from "./data/game-score";

class StatsView extends AbstractView {
  constructor(answers, lives) {
    super();
    this.answers = answers;
    this.lives = lives;
  }

  get _isDead() {
    return this.lives === -1;
  }

  get template() {
    return `  <section class="result">
    <h2 class="result__title">${(this._isDead) ? `Поражение!` : `Победа!`}</h2>
    ${this._getResult()}
  </section>`;
  }

  _getResult() {
    if (this._isDead) {
      return `<table class="result__table">
      <tr>
        <td>
          ${getStatusBar(this.answers)}
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>`;
    } else {
      return `<table class="result__table">
      <tr>
        <td colspan="2">
          ${getStatusBar(this.answers)}
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">${rightAnswersCount(this.answers) * 100}</td>
      </tr>
      ${this._getExtras()}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${countScore(this.answers, this.lives)}</td>
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
    if (fastAnswersCount(this.answers)) {
      html += extraTemplate(`Бонус за скорость:`, fastAnswersCount(this.answers), 50);
    }
    if (!this._isDead) {
      html += extraTemplate(`Бонус за жизни`, this.lives, 50);
    }
    if (slowAnswersCount(this.answers)) {
      html += extraTemplate(`Штраф за медлительность`, slowAnswersCount(this.answers), -50);
    }
    return html;
  }
}

export default StatsView;
