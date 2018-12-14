import IntroView from './intro-veiw';
import GreetingView from './greeting-view';
import RulesView from "./rules-view";
import Game1View from "./game-1-view";
import Game2View from "./game-2-view";
import Game3View from "./game-3-view";
import StatsView from "./stats-view";
import {isFinalQuestion, nextLevel} from "./data/game-levels";
import {addAnswer} from "./data/game-score";
import {decreaseLives, isDead} from "./data/game-lives";
import {getQuestions} from "./data/game-questions";
import {INITIAL_GAME} from "./data/game-data";
import GameHeader from "./game-header-view";

const rules = new RulesView(() => {
  const state = getQuestions(INITIAL_GAME);
  const gameHeader = new GameHeader(() => greeting.render(), state.lives, state.time);
  gameHeader.render();
  onGame(state);
});
const greeting = new GreetingView(() => {
  const gameHeader = new GameHeader(() => greeting.render());
  gameHeader.render();
  rules.render();
});
const intro = new IntroView(() => greeting.render());

const gameView = (state) => {
  const currentQuestion = state.questions[state.level];
  return new [Game2View, Game1View, Game3View][currentQuestion.length - 1]((answer) =>
    gameTick(state, answer), currentQuestion, state.answers);
};

const gameTick = (state, answer) => {
  let nextState = addAnswer(state, answer);
  if (answer) {
    if (isFinalQuestion(state)) {
      const stats = new StatsView(nextState);
      stats.render();
    }
  } else {
    nextState = decreaseLives(nextState);
    const gameHeader = new GameHeader(() => greeting.render(), nextState.lives, nextState.time);
    gameHeader.render();
    if (isDead(nextState) || isFinalQuestion(nextState)) {
      const stats = new StatsView(nextState);
      stats.render();
    }
  }
  onGame(nextLevel(nextState));
};

const onGame = (state) => gameView(state).render();

intro.render();
