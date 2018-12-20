import StatsView from './stats-view';
import GameHeaderView from './game-header-view';

class StatsScreen {
  constructor(onBackButton, answers, lives) {
    this.onBackButton = onBackButton;
    this.answers = answers;
    this.lives = lives;
  }

  render() {
    const stats = new StatsView(this.answers, this.lives);
    const header = new GameHeaderView(this.onBackButton, this.lives);
    header.render();
    stats.render();
  }
}

export default StatsScreen;
