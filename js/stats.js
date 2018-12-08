import StatsView from './stats-view';
import {getElementFromTemplate} from "./utils";
import getHeader from "./game-header";

export default (state) => {
  const stats = new StatsView(state);
  const wrapper = document.createElement(`div`);
  const statsElement = getElementFromTemplate(stats.template);

  stats.bind(statsElement);
  wrapper.appendChild(getHeader());
  wrapper.appendChild(statsElement);

  return wrapper;
};
