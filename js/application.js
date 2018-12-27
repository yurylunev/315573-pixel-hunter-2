import IntroScreen from './components/intro/intro-screen';
import GreetingScreen from './components/greeting/greeting-screen';
import RulesScreen from './components/rules/rules-screen';
import GameScreen from './components/game/game-screen';
import StatsScreen from './components/statistics/stats-screen';
import ErrorScreen from './components/error/error-screen';
import ConfirmScreen from './components/confirm/confirm-screen';
import GameModel from './components/game/game-model';
import Loader from './utils/loader';

let questions;

class Application {
  static async loadIntro() {
    const intro = new IntroScreen(() => Application.showGreeting());
    intro.render();
    try {
      questions = await Loader.loadData();
      setTimeout(() => Application.showGreeting(), 1000);
    } catch (e) {
      Application.showError(new Error(`${e.status}: ${e.statusText}`));
    } finally {
      intro.fadeout();
    }
  }

  static showIntro() {
    Application.loadIntro().catch((e) => Application.showError(e));
  }

  static showGreeting() {
    const greeting = new GreetingScreen(() => Application.showRules());
    greeting.render(false);
  }

  static showRules() {
    const rules = new RulesScreen((playerName) => Application.showGame(playerName), () => Application.showGreeting());
    rules.render();
  }

  static showGame(userName) {
    const model = new GameModel(userName, questions);
    const gameScreen = new GameScreen(model, () => Application.showStats(model), () => Application.showConfirm(model));
    gameScreen.startGame();
  }

  static async loadStats(model) {
    let data;
    try {
      await Loader.saveResults(model.answers, model.lives, model.playerName);
      data = await Loader.loadResults(model.playerName);
    } finally {
      const statistics = new StatsScreen(() => Application.showGreeting(), data);
      statistics.showScores();
    }
  }

  static showStats(model) {
    Application.loadStats(model).catch((e) => Application.showError(e));
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    errorScreen.render();
  }

  static showConfirm(model) {
    const confirm = new ConfirmScreen(() => {
      model.stopTick();
      Application.showGreeting();
    });
    confirm.show();
  }
}

export default Application;
