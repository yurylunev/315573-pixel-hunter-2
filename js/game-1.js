import Game1View from './game-1-view';
import {getElementFromTemplate} from "./utils";
import getHeader from "./game-header";

export default (callback, state) => {
  const game1 = new Game1View(state);
  const wrapper = document.createElement(`div`);
  const game1Element = getElementFromTemplate(game1.template);

  game1.bind(game1Element, callback);
  wrapper.appendChild(getHeader(state.time, state.lives));
  wrapper.appendChild(game1Element);

  return wrapper;
};
