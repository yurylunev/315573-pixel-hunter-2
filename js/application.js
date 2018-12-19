import IntroScreen from './intro-screen';
import GreetingScreen from './greeting-screen';
import RulesScreen from './rules-screen';
import GameScreen from './game-screen';
import StatsScreen from './stats-screen';
import GameModel from "./game-model";

class Application {
  static showIntro() {
    const intro = new IntroScreen(() => Application.showGreeting());
    intro.render();
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
    const model = new GameModel(userName);
    const gameScreen = new GameScreen(model, (answers, lives) => Application.showStats(answers, lives), () => Application.showGreeting());
    gameScreen.startGame();
  }

  static showStats(answers, lives) {
    const statistics = new StatsScreen(() => Application.showGreeting(), answers, lives);
    statistics.render();
  }
}

export default Application;
