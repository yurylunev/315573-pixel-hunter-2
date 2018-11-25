const questionsFromServer = [
  [
    [`http://i.imgur.com/1KegWPz.jpg`, `photo`],
    [`https://k42.kn3.net/CF42609C8.jpg`, `paint`]
  ],
  [
    [`https://k42.kn3.net/D2F0370D6.jpg`, `paint`]
  ],
  [
    [`https://k32.kn3.net/5C7060EC5.jpg`, `paint`],
    [`http://i.imgur.com/1KegWPz.jpg`, `photo`],
    [`http://i.imgur.com/DKR1HtB.jpg`, `photo`]
  ],
  [
    [`http://i.imgur.com/1KegWPz.jpg`, `photo`],
    [`https://k42.kn3.net/CF42609C8.jpg`, `paint`]
  ],
  [
    [`https://k42.kn3.net/D2F0370D6.jpg`, `paint`]
  ],
  [
    [`https://k32.kn3.net/5C7060EC5.jpg`, `paint`],
    [`http://i.imgur.com/1KegWPz.jpg`, `photo`],
    [`http://i.imgur.com/DKR1HtB.jpg`, `photo`]
  ],
  [
    [`http://i.imgur.com/1KegWPz.jpg`, `photo`],
    [`https://k42.kn3.net/CF42609C8.jpg`, `paint`]
  ],
  [
    [`https://k42.kn3.net/D2F0370D6.jpg`, `paint`]
  ],
  [
    [`https://k32.kn3.net/5C7060EC5.jpg`, `paint`],
    [`http://i.imgur.com/1KegWPz.jpg`, `photo`],
    [`http://i.imgur.com/DKR1HtB.jpg`, `photo`]
  ],
  [
    [`http://i.imgur.com/1KegWPz.jpg`, `photo`],
    [`https://k42.kn3.net/CF42609C8.jpg`, `paint`]
  ]
];

const getQuestions = (game) => {
  let questions = questionsFromServer;
  return Object.freeze(Object.assign({}, game, {
    questions,
    answers: Array(questions.length).fill(`unknown`)
  }));
};

export {getQuestions};
