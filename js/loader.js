import {adaptServerData} from './data/data-adapter';

const SERVER_URL = `https://es.dump.academy/pixel-hunter/`;

const DEFAULT_NAME = `xaLT`;
const APP_ID = 198407023;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (res) => res.json();

class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`)
      .then(checkStatus)
      .then(toJSON)
      .then(adaptServerData);
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`).then(checkStatus).then(toJSON);
  }

  static saveResults(stats, lives, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(Object.assign({}, {stats, lives})),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings)
      .then(checkStatus);
  }
}
export default Loader;
