import StatsView from './stats-view';
import GameHeaderView from './game-header-view';

class StatsScreen {
  constructor(onBackButton, data) {
    this.onBackButton = onBackButton;
    this.data = data;
  }

  showScores() {
    const stats = new StatsView(this.data);
    const header = new GameHeaderView(this.onBackButton);
    header.render();
    stats.render();
  }
}

export default StatsScreen;
