import GameHeaderView from './game-header-view';
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
    return new [Game2View, Game1View, Game3View][this.model.currentQuestion.length - 1]((answer) =>
      this._gameTick(answer), this.model.currentQuestion, this.model.answers);
  }

  _gameTick(answer) {
    this.model.addAnswer(answer);
    this.model.nextLevel();
    if (answer) {
      if (this.model.isFinalQuestion()) {
        return this.onLastScreen(this.model.answers, this.model.lives);
      }
    } else {
      this.model.takeLive();
      const gameHeader = new GameHeaderView(this.onFirstScreen, this.model.lives);
      gameHeader.render();
      if (this.model.isDead() || this.model.isFinalQuestion()) {
        return this.onLastScreen(this.model.answers, this.model.lives);
      }
    }
    return this.gameView().render();
  }

  startGame() {
    const gameHeader = new GameHeaderView(this.onFirstScreen, this.model.lives);
    const gameContent = this.gameView();
    gameHeader.render();
    gameContent.render();
  }
}

export default GameScreen;
