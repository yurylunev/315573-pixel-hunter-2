import GreetingView from './greeting-view';

class GreetingScreen {
  constructor(onNextScreen) {
    this.onNextScreen = onNextScreen;
  }

  render(update) {
    const greeting = new GreetingView(this.onNextScreen);
    return greeting.render(update);
  }
}

export default GreetingScreen;
