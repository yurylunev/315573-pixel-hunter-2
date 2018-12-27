import IntroView from './intro-veiw';

class IntroScreen {
  constructor(onNextScreen) {
    this.onNextScreen = onNextScreen;
  }

  render() {
    this.intro = new IntroView(this.onNextScreen);
    return this.intro.render();
  }

  fadeout() {
    this.intro.fadeout();
  }
}

export default IntroScreen;
