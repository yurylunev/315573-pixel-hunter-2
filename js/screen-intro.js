import {getElementFromTemplate, showScreen} from "./utlis";
import greeting from "./screen-greeting";

const intro = () => {
  const introElement = getElementFromTemplate(`  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf
      Sparnaay.</p>
  </section>`);

  (introElement.querySelector(`.intro__asterisk`)).addEventListener(`click`, () => {
    showScreen(greeting());
  });
  return introElement;
};

export default intro;
