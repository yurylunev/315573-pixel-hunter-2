import {adaptServerData} from './data/data-adapter';
import {DEFAULT_NAME, APP_ID} from "./data/game-settings";

const SERVER_URL = `https://es.dump.academy/pixel-hunter/`;

class Loader {
  static async loadData() {
    const response = await fetch(`${SERVER_URL}/questions`);
    return adaptServerData(response.json());
  }

  static async loadResults(name = DEFAULT_NAME) {
    const data = await fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`);
    return data.json();
  }

  static async saveResults(stats, lives, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(Object.assign({}, {stats, lives})),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return await fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings);
  }
}

export default Loader;
