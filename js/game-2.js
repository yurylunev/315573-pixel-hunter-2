import Game2View from './game-2-view';
import getHeader from "./game-header";

export default (callback, state) => {
  const game2 = new Game2View(state);
  const wrapper = document.createElement(`div`);
  const game2Element = Game2View.getElementFromTemplate(game2.template);

  game2.bind(game2Element, callback);
  wrapper.appendChild(getHeader(state.time, state.lives));
  wrapper.appendChild(game2Element);

  return wrapper;
};
