import {ROOT_ELEMENT} from "./data/game-settings";

const rootElement = document.querySelector(ROOT_ELEMENT);

class AbstractView {
  constructor(callback) {
    this.callback = callback;
  }

  get template() {
  }

  get element() {
    const element = document.createElement(`div`);
    element.innerHTML = this.template;
    this.bind(element, this.callback);
    return element.children[0];
  }

  render(update = true) {
    if (update) {
      this.clean(rootElement);
    } else {
      rootElement.innerHTML = ``;
    }
    this.elemInstance = this.element;
    rootElement.appendChild(this.elemInstance);
  }

  bind() {
  }

  fadeout() {
    this.elemInstance.classList.add(`intro__fadeout`);
  }

  clean(element) {
    const section = element.querySelector(`section`);
    if (section) {
      section.remove();
    }
  }
}

export default AbstractView;
