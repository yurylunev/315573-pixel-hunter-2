import {ROOT_ELEMENT} from "./data/game-settings";

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

  render() {
    this.clean(ROOT_ELEMENT);
    this.elemInstance = this.element;
    ROOT_ELEMENT.appendChild(this.elemInstance);
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
