import GreetingView from './greeting-view';
import {getElementFromTemplate} from "./utils";

export default () => {
  const greeting = new GreetingView();
  const greetingElement = getElementFromTemplate(greeting.template);

  greeting.bind(greetingElement);

  return greetingElement;
};
