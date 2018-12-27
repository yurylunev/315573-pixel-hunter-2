import GameHeaderView from '../header/game-header-view';
import Game2View from "./game-2-view";
import Game1View from "./game-1-view";
import Game3View from "./game-3-view";

class GameScreen {
  constructor(model, onLastScreen, onFirstScreen) {
    this.model = model;
    this.onLastScreen = onLastScreen;
    this.onFirstScreen = onFirstScreen;
  }

  gameView() {
    return new [Game2View, Game1View, Game3View][this.model.currentQuestion.images.length - 1]((answer) =>
      this._gameTick(answer), this.model.currentQuestion, this.model.answers);
  }

  _gameTick(answer) {
    this.model.addAnswer(answer);
    this.model.nextLevel();
    if (answer) {
      if (this.model.isFinalQuestion()) {
        return this.stopGame();
      }
    } else {
      this.model.takeLive();
      const gameHeader = new GameHeaderView(this.onFirstScreen, this.model.lives);
      gameHeader.updateLives();
      if (this.model.isDead() || this.model.isFinalQuestion()) {
        return this.stopGame();
      }
    }
    return this.gameView().render();
  }

  _startTimer() {
    this.model._timer = setTimeout(() => this._timerTick(), 1000);
  }

  _timerTick() {
    const gameHeader = new GameHeaderView(this.onFirstScreen, this.model.lives, this.model.timer, this.model.warningTimer);
    gameHeader.updateTimer();
    if (this.model.isTimerOff) {
      this._gameTick(false);
      if (!this.model.isDead()) {
        this._startTimer();
      }
    } else {
      this.model.tick();
      this._startTimer();
    }
  }

  stopGame() {
    this.model.stopTick();
    this.onLastScreen(this.model.answers, this.model.lives);
  }

  startGame() {
    const gameHeader = new GameHeaderView(this.onFirstScreen, this.model.lives, this.model.timer);
    const gameContent = this.gameView();
    gameHeader.render();
    gameContent.render();
    this._timerTick();
  }
}

export default GameScreen;
