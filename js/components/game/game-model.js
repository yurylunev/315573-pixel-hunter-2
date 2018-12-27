import {INITIAL_GAME} from "../../utils/game-data";
import {isFinalQuestion, getNextLevel} from "../../data/game-levels";
import {getCurrentQuestion, getQuestions} from "../../data/game-questions";
import {decreaseLives, isDead} from "../../data/game-lives";
import {addAnswer} from "../../data/game-score";
import {isTimerOff, resetTimer, tick, isWarningTimer} from "../../data/game-timer";

class GameModel {
  constructor(playerName, questions) {
    this.playerName = playerName;
    this.questions = questions;
    this.restart();
  }

  get lives() {
    return this._state.lives;
  }

  get timer() {
    return this._state.timer;
  }

  get answers() {
    return this._state.answers;
  }

  get currentQuestion() {
    return getCurrentQuestion(this._state);
  }

  get isTimerOff() {
    return isTimerOff(this._state);
  }

  get warningTimer() {
    return isWarningTimer(this._state);
  }

  set _timer(timerID) {
    this.timerID = timerID;
  }

  isFinalQuestion() {
    return isFinalQuestion(this._state);
  }

  nextLevel() {
    this._state = getNextLevel(this._state);
    this.resetTimer();
  }

  restart() {
    this._state = getQuestions(INITIAL_GAME, this.questions);
    this.resetTimer();
  }

  resetTimer() {
    this._state = resetTimer(this._state);
  }

  tick() {
    this._state = tick(this._state);
  }

  stopTick() {
    clearTimeout(this.timerID);
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
