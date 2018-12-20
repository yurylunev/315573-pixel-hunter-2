import {adaptServerData} from "./data-adapter";

const testQuestions = [
  [
    {image: `http://i.imgur.com/1KegWPz.jpg`, rightAnswer: `photo`},
    {image: `https://k42.kn3.net/CF42609C8.jpg`, rightAnswer: `paint`}
  ],
  [
    {image: `https://k42.kn3.net/D2F0370D6.jpg`, rightAnswer: `paint`}
  ],
  [
    {image: `https://k32.kn3.net/5C7060EC5.jpg`, rightAnswer: `paint`},
    {image: `http://i.imgur.com/1KegWPz.jpg`, rightAnswer: `photo`},
    {image: `http://i.imgur.com/DKR1HtB.jpg`, rightAnswer: `photo`}
  ],
  [
    {image: `http://i.imgur.com/1KegWPz.jpg`, rightAnswer: `photo`},
    {image: `https://k42.kn3.net/CF42609C8.jpg`, rightAnswer: `paint`}
  ],
  [
    {image: `https://k42.kn3.net/D2F0370D6.jpg`, rightAnswer: `paint`}
  ],
  [
    {image: `https://k32.kn3.net/5C7060EC5.jpg`, rightAnswer: `paint`},
    {image: `http://i.imgur.com/1KegWPz.jpg`, rightAnswer: `photo`},
    {image: `http://i.imgur.com/DKR1HtB.jpg`, rightAnswer: `photo`}
  ],
  [
    {image: `http://i.imgur.com/1KegWPz.jpg`, rightAnswer: `photo`},
    {image: `https://k42.kn3.net/CF42609C8.jpg`, rightAnswer: `paint`}
  ],
  [
    {image: `https://k42.kn3.net/D2F0370D6.jpg`, rightAnswer: `paint`}
  ],
  [
    {image: `https://k32.kn3.net/5C7060EC5.jpg`, rightAnswer: `paint`},
    {image: `http://i.imgur.com/1KegWPz.jpg`, rightAnswer: `photo`},
    {image: `http://i.imgur.com/DKR1HtB.jpg`, rightAnswer: `photo`}
  ],
  [
    {image: `http://i.imgur.com/1KegWPz.jpg`, rightAnswer: `photo`},
    {image: `https://k42.kn3.net/CF42609C8.jpg`, rightAnswer: `paint`}
  ]
];

const getQuestions = (game, questionsFromServer) => {
  return Object.freeze(Object.assign({}, game, {
    questions: adaptServerData(questionsFromServer),
    answers: []
  }));
};

const getTestQuestions = (game) => {
  return Object.freeze(Object.assign({}, game, {
    questions: testQuestions,
    answers: []
  }));
};

const getCurrentQuestion = (game) => {
  return game.questions[game.level];
};

export {getQuestions, getCurrentQuestion, getTestQuestions};
