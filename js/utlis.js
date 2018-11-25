import greeting from "./screen-greeting";
import rules from "./screen-rules";
import game1 from "./screen-game-1";
import {getQuestions} from "./data/game-questions";
import {INITIAL_GAME} from "./data/game-data";
import game2 from "./screen-game-2";
import game3 from "./screen-game-3";
import stats from "./screen-stats";
import {decreaseLives, hasLives, isDead} from "./data/game-lives";
import {isFinalQuestion, nextLevel} from "./data/game-levels";
import {addAnswer} from "./data/game-score";

const renderScreen = (screen, callback, state) => showScreen(screen(callback, state));

const getGameContent = (questions, level) => [game2, game1, game3][questions[level].length - 1];

const gameTick = (state, returnValue) => {
  if (returnValue === `wrong` && isDead(decreaseLives(state))) {
    return renderScreen(stats, addAnswer(decreaseLives(state), returnValue));
  }
  if (returnValue === `wrong` && hasLives(decreaseLives(state))) {
    return onGameStart(nextLevel(decreaseLives(addAnswer(state, returnValue))));
  }
  if (isFinalQuestion(state)) {
    return renderScreen(stats, addAnswer(state, returnValue));
  }
  return onGameStart(nextLevel(addAnswer(state, returnValue)));
};

const onGameStart = (state) => renderScreen(getGameContent(state.questions, state.level), (returnValue) => gameTick(state, returnValue), state);

const onContinueClick = () => renderScreen(rules, () => onGameStart(getQuestions(INITIAL_GAME)), onContinueClick);

const onAsteriskClick = () => renderScreen(greeting, onContinueClick);


const rootElement = document.querySelector(`#main`);
const showScreen = (template) => {
  rootElement.innerHTML = ``;
  rootElement.appendChild(template);
};

const getElementFromTemplate = (template) => {
  const result = document.createElement(`div`);
  result.innerHTML = template;
  return result;
};

export {getElementFromTemplate, showScreen, renderScreen, onAsteriskClick, onContinueClick};
