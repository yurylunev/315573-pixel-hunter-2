import {assert} from "chai";
import {adaptServerData} from './data-adapter';

const serverData = [{
  "type": `one-of-three`,
  "question": `Найдите фото среди изображений`,
  "answers": [{
    "image": {
      "url": `https://k39.kn3.net/E07A38605.jpg`,
      "width": 304,
      "height": 455
    },
    "type": `painting`
  }, {
    "image": {
      "url": `https://k37.kn3.net/47F2604E3.jpg`,
      "width": 304,
      "height": 455
    },
    "type": `painting`
  }, {
    "image": {
      "url": `http://i.imgur.com/dWTKNtv.jpg`,
      "width": 304,
      "height": 455
    },
    "type": `photo`
  }]
}, {
  "type": `two-of-two`,
  "question": `Угадайте для каждого изображения фото или рисунок?`,
  "answers": [{
    "image": {
      "url": `http://i.imgur.com/GbcYNPw.jpg`,
      "width": 468,
      "height": 458
    },
    "type": `photo`
  }, {
    "image": {
      "url": `https://k38.kn3.net/AD92BA712.jpg`,
      "width": 468,
      "height": 458
    },
    "type": `painting`
  }]
}, {
  "type": `tinder-like`,
  "question": `Угадай, фото или рисунок?`,
  "answers": [{
    "image": {
      "url": `http://i.imgur.com/1KegWPz.jpg`,
      "width": 705,
      "height": 455
    },
    "type": `photo`
  }]
}];


const localData = [
  [
    {image: `https://k39.kn3.net/E07A38605.jpg`, rightAnswer: `paint`},
    {image: `https://k37.kn3.net/47F2604E3.jpg`, rightAnswer: `paint`},
    {image: `http://i.imgur.com/dWTKNtv.jpg`, rightAnswer: `photo`}
  ],
  [
    {image: `http://i.imgur.com/GbcYNPw.jpg`, rightAnswer: `photo`},
    {image: `https://k38.kn3.net/AD92BA712.jpg`, rightAnswer: `paint`}
  ],
  [
    {image: `http://i.imgur.com/1KegWPz.jpg`, rightAnswer: `photo`}
  ]
];

describe(`Adapt server data`, () => {

  it(`should have same format for answers`, () => {
    assert.deepEqual(adaptServerData(serverData), localData);
  });
});
