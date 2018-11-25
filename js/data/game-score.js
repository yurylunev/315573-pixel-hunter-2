const answersSet = new Set([`fast`, `correct`, `slow`, `wrong`, `unknown`]);

const addAnswer = (game, answer) => {
  if (answersSet.has(answer)) {
    return Object.freeze(Object.assign({}, game, {answers: game.answers.fill(answer, game.level, game.level + 1)}));
  }
  throw new Error(`Incorrect answer value: ${answer}`);
};

const rightAnswersCount = (answers) => answers.filter((answer) => (answer !== `wrong`)).length;

const fastAnswersCount = (answers) => answers.filter((answer) => (answer === `fast`)).length;

const slowAnswersCount = (answers) => answers.filter((answer) => (answer === `slow`)).length;

const countScore = (answers, lives) => {
  if (lives < 0) {
    return -1;
  }
  let score = 0;
  for (let answer of answers) {
    switch (answer) {
      case `fast`:
        score += 150;
        break;
      case `correct`:
        score += 100;
        break;
      case `slow`:
        score += 50;
        break;
    }
  }
  return score + lives * 50;
};

export {addAnswer, countScore, rightAnswersCount, fastAnswersCount, slowAnswersCount};
