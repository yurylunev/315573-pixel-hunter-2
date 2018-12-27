import ErrorView from './error-view.js';

class ErrorScreen {
  constructor(error) {
    this.error = error;
  }

  render() {
    const errorScreen = new ErrorView(this.error);
    return errorScreen.render();
  }
}

export default ErrorScreen;
