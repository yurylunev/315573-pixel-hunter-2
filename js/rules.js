import RulesView from './rules-view';
import HeaderView from "./game-header-view";
import {getElementFromTemplate, onContinueClick} from './utils';

export default (callback, state) => {
  const rules = new RulesView();
  const header = new HeaderView(state);
  const wrapper = document.createElement(`div`);
  const rulesElement = getElementFromTemplate(rules.template);
  const headerElement = getElementFromTemplate(header.template);

  rules.bind(rulesElement, callback);
  header.bind(headerElement, () => onContinueClick);
  wrapper.appendChild(headerElement);
  wrapper.appendChild(rulesElement);

  return wrapper;
};
