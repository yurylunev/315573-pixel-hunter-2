import IntroView from './intro-veiw';
import GreetingView from './greeting-view';
import RulesView from "./rules-view";
// import game2 from "./game-2";
import Game1View from "./game-1-view";
import Game2View from "./game-2-view";
import Game3View from "./game-3-view";
// import game3 from "./game-3";
// import {isFinalQuestion, nextLevel} from "./data/game-levels";
// import stats from "./stats";
// import {addAnswer} from "./data/game-score";
// import {decreaseLives, hasLives, isDead} from "./data/game-lives";
import {getQuestions} from "./data/game-questions";
import {INITIAL_GAME} from "./data/game-data";
// import {renderScreen} from "./utils";

let state = getQuestions(INITIAL_GAME);
const game1 = new Game1View({
  onBackButton: () => intro.render(),
  callback: () => getGameContent(state.questions, state.level).render(),
  state
});
const game2 = new Game2View({
  onBackButton: () => intro.render(),
  callback: () => getGameContent(state.questions, state.level).render(),
  state
});
const game3 = new Game3View({
  onBackButton: () => intro.render(),
  callback: () => getGameContent(state.questions, state.level).render(),
  state
});
const rules = new RulesView({
  onBackButton: () => intro.render(),
  callback: () => {
    getGameContent(state.questions, state.level).render();
    return gameTick(state);
  },
  state
});
const greeting = new GreetingView({callback: () => rules.render()});
const intro = new IntroView({callback: () => greeting.render()});

const getGameContent = (questions, level) => [game2, game1, game3][questions[level].length - 1];
//
const gameTick = (state, returnValue) => {
  if (isFinalQuestion(state)) {
    return renderScreen(stats, addAnswer(state, returnValue));
  }
  if (returnValue === `wrong` && isDead(decreaseLives(state))) {
    return renderScreen(stats, addAnswer(decreaseLives(state), returnValue));
  }
  if (returnValue === `wrong` && hasLives(decreaseLives(state))) {
    return onGameStart(nextLevel(decreaseLives(addAnswer(state, returnValue))));
  }
  return onGameStart(nextLevel(addAnswer(state, returnValue)));
};

const onGameStart = (state) => renderScreen(getGameContent(state.questions, state.level), (returnValue) => gameTick(state, returnValue), state);

const onContinueClick = () => renderScreen(rules, () => onGameStart(getQuestions(INITIAL_GAME)), onContinueClick);


intro.render();
