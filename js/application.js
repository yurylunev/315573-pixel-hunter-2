import IntroScreen from './intro-screen';
import GreetingScreen from './greeting-screen';
import RulesScreen from './rules-screen';
import GameScreen from './game-screen';
import StatsScreen from './stats-screen';
import ErrorScreen from './error-screen';
import GameModel from './game-model';
import Loader from './loader';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

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
  static showIntro() {
    const intro = new IntroScreen(() => Application.showGreeting());
    intro.render();
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`)
      .then(checkStatus)
      .then((response) => response.json())
      .then((data) => {
        questions = data;
        let imagesURLs = [];
        data.forEach((level) => level.answers.forEach((answer) => imagesURLs.push(loadImage(answer.image.url))));
        return imagesURLs;
      })
      .then((imagePromises) => Promise.all(imagePromises))
      .then((images) => {
        loadedImages = images;
      })
      .then(() => Application.showGreeting())
      .catch((err) => Application.showError(err));
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
    const gameScreen = new GameScreen(model, () => Application.showStats(model), () => Application.showGreeting());
    gameScreen.startGame();
  }

  static showStats(model) {
    Loader.saveResults(model.answers, model.lives, model.playerName)
      .then(() => Loader.loadResults(model.playerName))
      .then((data) => {
        const statistics = new StatsScreen(() => Application.showGreeting(), data);
        statistics.showScores();
      })
      .catch(Application.showError);
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    errorScreen.render();
  }
}

export default Application;
