import greeting from "./greeting";
import rules from "./rules";
import game1 from "./game-1";
import game2 from "./game-2";
import game3 from "./game-3";
import stats from "./stats";
import {getQuestions} from "./data/game-questions";
import {INITIAL_GAME} from "./data/game-data";
import {decreaseLives, hasLives, isDead} from "./data/game-lives";
import {isFinalQuestion, nextLevel} from "./data/game-levels";
import {addAnswer} from "./data/game-score";

const renderScreen = (screen, callback, state) => showScreen(screen(callback, state));

const getGameContent = (questions, level) => [game2, game1, game3][questions[level].length - 1];

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

// const onContinueClick = () => renderScreen(rules, () => onGameStart(getQuestions(INITIAL_GAME)), onContinueClick);

// const onAsteriskClick = () => renderScreen(greeting, onContinueClick);

const rootElement = document.querySelector(`#main`);
const showScreen = (template) => {
  rootElement.innerHTML = ``;
  rootElement.appendChild(template);
};

const getElementFromTemplate = (template) => {
  const result = document.createElement(`div`);
  result.innerHTML = template;
  return result.children[0];
};

export {getElementFromTemplate, renderScreen, onAsteriskClick, onContinueClick};
