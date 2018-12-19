import {INITIAL_GAME} from "./data/game-data";
import {isFinalQuestion, nextLevel, getCurrentLevel} from "./data/game-levels";
import {getCurrentQuestion, getQuestions} from "./data/game-questions";
import {decreaseLives, isDead} from "./data/game-lives";
import {addAnswer} from "./data/game-score";

class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this.restart();
  }

  get lives() {
    return this._state.lives;
  }

  get answers() {
    return this._state.answers;
  }

  get currentLevel() {
    return getCurrentLevel(this._state);
  }

  get currentQuestion() {
    return getCurrentQuestion(this._state);
  }

  isFinalQuestion() {
    return isFinalQuestion(this._state);
  }

  nextLevel() {
    this._state = nextLevel(this._state);
  }

  restart() {
    this._state = getQuestions(INITIAL_GAME);
  }

  isDead() {
    return isDead(this._state);
  }

  addAnswer(answer) {
    this._state = addAnswer(this._state, answer);
  }

  takeLive() {
    this._state = decreaseLives(this._state);
  }
}

export default GameModel;
