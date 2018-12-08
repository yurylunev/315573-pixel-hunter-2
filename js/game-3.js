import Game3View from './game-3-view';
import {getElementFromTemplate} from "./utils";
import getHeader from "./game-header";

export default (callback, state) => {
  const game3 = new Game3View(state);
  const wrapper = document.createElement(`div`);
  const game3Element = getElementFromTemplate(game3.template);

  game3.bind(game3Element, callback);
  wrapper.appendChild(getHeader(state.time, state.lives));
  wrapper.appendChild(game3Element);

  return wrapper;
};
