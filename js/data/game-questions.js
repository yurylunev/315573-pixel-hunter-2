const getQuestions = (game, questions) => Object.freeze(Object.assign({}, game, {
  questions,
  answers: Array(questions.length).fill(`unknown`)
}));

const getCurrentQuestion = (game) => game.questions[game.level];

export {getQuestions, getCurrentQuestion};
