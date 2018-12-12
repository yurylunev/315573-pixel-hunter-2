import IntroView from './intro-veiw';
import GreetingView from './greeting-view';
import RulesView from "./rules-view";
import Game1View from "./game-1-view";
import Game2View from "./game-2-view";
import Game3View from "./game-3-view";
import StatsView from "./stats-view";
import {isFinalQuestion, nextLevel} from "./data/game-levels";
import {addAnswer} from "./data/game-score";
import {decreaseLives, hasLives, isDead} from "./data/game-lives";
import {getQuestions} from "./data/game-questions";
import {INITIAL_GAME} from "./data/game-data";

const rules = new RulesView(() => onGameStart(getQuestions(INITIAL_GAME)));
const greeting = new GreetingView(() => rules.render());
const intro = new IntroView(() => greeting.render());

const gameView = (state) =>
  new [Game2View, Game1View, Game3View][state.questions[state.level].length - 1]((game, returnedValue) =>
    gameTick(game, returnedValue), state, () => greeting.render());

const gameTick = (state, returnValue) => {
  if (isFinalQuestion(state)) {
    const stats = new StatsView(null, addAnswer(state, returnValue));
    stats.render();
  } else if (returnValue === `wrong` && isDead(decreaseLives(state))) {
    const stats = new StatsView(null, addAnswer(decreaseLives(state), returnValue));
    stats.render();
  } else if (returnValue === `wrong` && hasLives(decreaseLives(state))) {
    onGameStart(nextLevel(decreaseLives(addAnswer(state, returnValue))));
  } else {
    onGameStart(nextLevel(addAnswer(state, returnValue)));
  }
};

const onGameStart = (state) => gameView(state).render();

intro.render();
