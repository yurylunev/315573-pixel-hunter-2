import GameHeaderView from './game-header-view';
import RulesView from './rules-view';

class RulesScreen {
  constructor(onNextScreen, onFirstScreen) {
    this.onNextScreen = onNextScreen;
    this.onFirstScreen = onFirstScreen;
  }

  render() {
    const rules = new RulesView((userName) => this.onNextScreen(userName));
    const header = new GameHeaderView(this.onFirstScreen);
    header.render();
    rules.render();
  }
}

export default RulesScreen;
