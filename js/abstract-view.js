export default class AbstractView {
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
    const root = document.querySelector(`#main`);
    const element = this.element;
    this.clean(root);
    root.appendChild(element);
  }

  bind() {
  }

  clean(element) {
    const section = element.querySelector(`section`);
    if (section) {
      section.remove();
    }
  }
}
