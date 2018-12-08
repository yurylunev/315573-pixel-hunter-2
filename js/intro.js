import IntroView from './intro-veiw';
import {getElementFromTemplate} from "./utils";

export default () => {
  const intro = new IntroView();
  const introElement = getElementFromTemplate(intro.template);
  intro.bind(introElement);
  return introElement;
};
