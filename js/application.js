import IntroScreen from './intro-screen';
import GreetingScreen from './greeting-screen';
import RulesScreen from './rules-screen';
import GameScreen from './game-screen';
import StatsScreen from './stats-screen';
import ErrorScreen from './error-screen';
import ConfirmScreen from './confirm-screen';
import GameModel from './game-model';
import Loader from './loader';

const loadImage = (url) => {
  return new Promise((onLoad, onError) => {
    const image = new Image();
    image.onload = () => onLoad(image);
    image.onerror = () => onError(`Не удалось загрузить картнку: ${url}`);
    image.src = url;
  });
};

let questions;
let loadedImages;

class Application {
  static async loadIntro() {
    const intro = new IntroScreen(() => Application.showGreeting());
    intro.render();
    try {
      let imagesURLs = [];
      const response = await fetch(`https://es.dump.academy/pixel-hunter/questions`);
      questions = await response.json();
      for (const level of questions) {
        for (const answer of level.answers) {
          imagesURLs.push(loadImage(answer.image.url));
        }
      }
      loadedImages = await Promise.all(imagesURLs);
    } catch (e) {
      Application.showError(new Error(`${e.status}: ${e.statusText}`));
    } finally {
      intro.fadeout();
      setTimeout(() => Application.showGreeting(), 1000);
    }
  }

  static showIntro() {
    Application.loadIntro().catch((e) => Application.showError(e));
  }

  static showGreeting() {
    const greeting = new GreetingScreen(() => Application.showRules());
    greeting.render();
  }

  static showRules() {
    const rules = new RulesScreen((playerName) => Application.showGame(playerName), () => Application.showGreeting());
    rules.render();
  }

  static showGame(userName) {
    const model = new GameModel(userName, questions, loadedImages);
    const gameScreen = new GameScreen(model, () => Application.showStats(model), () => Application.showConfirm());
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

  static showConfirm() {
    const confirm = new ConfirmScreen(() => Application.showGreeting());
    confirm.show();
  }
}

export default Application;
