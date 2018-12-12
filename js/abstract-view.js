export default class AbstractView {
  constructor(callback, state = null, backButton = null) {
    this.callback = callback;
    this.state = state;
    this.backButton = backButton;
  }

  get template() {
  }

  get element() {
    const element = document.createElement(`div`);
    element.innerHTML = this.template;
    this.bind(element, this.callback);
    return element.children[0];
  }

  get _header() {
  }

  render() {
    const root = document.querySelector(`#main`);
    const element = this.element;
    const header = this._header;
    root.innerHTML = ``;
    if (header) {
      root.appendChild(header.element);
    }
    root.appendChild(element);
  }

  bind() {
  }

}
