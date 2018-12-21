import IntroScreen from './intro-screen';
import GreetingScreen from './greeting-screen';
import RulesScreen from './rules-screen';
import GameScreen from './game-screen';
import StatsScreen from './stats-screen';
import ErrorScreen from './error-screen';
import GameModel from './game-model';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

let questions;

class Application {
  static showIntro() {
    const intro = new IntroScreen(() => Application.showGreeting());
    intro.render();
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`)
      .then(checkStatus)
      .then((response) => response.json())
      .then((data) => {
        questions = data;
      })
      .then(()=>Application.showGreeting())
      .catch((err) => Application.showError(err));
  }

  static showGreeting() {
    const greeting = new GreetingScreen(() => Application.showRules());
    greeting.render();
  }

  static showRules() {
    const rules = new RulesScreen(() => Application.showGame(`xaLT`), () => Application.showGreeting());
    rules.render();
  }

  static showGame(userName) {
    const model = new GameModel(userName, questions);
    const gameScreen = new GameScreen(model, (answers, lives) => Application.showStats(answers, lives), () => Application.showGreeting());
    gameScreen.startGame();
  }

  static showStats(answers, lives) {
    const statistics = new StatsScreen(() => Application.showGreeting(), answers, lives);
    statistics.render();
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    errorScreen.render();
  }
}

export default Application;
