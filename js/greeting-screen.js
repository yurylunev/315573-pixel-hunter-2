import GreetingView from './greeting-view';

class GreetingScreen {
  constructor(onNextScreen) {
    this.onNextScreen = onNextScreen;
  }

  render() {
    const greeting = new GreetingView(this.onNextScreen);
    return greeting.render();
  }
}

export default GreetingScreen;
