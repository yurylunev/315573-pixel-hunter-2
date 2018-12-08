export default class AbstractView {
  constructor() {

  }

  get template() {
  }

  get element() {
  }

  render() {
  }

  bind() {
  }

  static getElementFromTemplate(template) {
    const result = document.createElement(`div`);
    result.innerHTML = template;
    return result.children[0];
  }

}
