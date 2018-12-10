export default class AbstractView {
  constructor(props) {
    if (props) {
      if (props.callback) {
        this.callback = props.callback;
      }
      if (props.onBackButton) {
        this.onBackButton = props.onBackButton;
      }
      if (props.state) {
        this.state = props.state;
      }
    }
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
