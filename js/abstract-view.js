class AbstractView {
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
    this.elemInstance = this.element;
    this.root.appendChild(this.elemInstance);
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
