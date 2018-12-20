export default class AbstractView {
  constructor(callback) {
    this.callback = callback;
    this.root = document.querySelector(`#main`);
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
    this.clean(this.root);
    this.root.appendChild(this.element);
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
