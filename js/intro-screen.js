import IntroView from './intro-veiw';

class IntroScreen {
  constructor(onNextScreen) {
    this.onNextScreen = onNextScreen;
  }

  render() {
    const intro = new IntroView(this.onNextScreen);
    return intro.render();
  }
}

export default IntroScreen;
