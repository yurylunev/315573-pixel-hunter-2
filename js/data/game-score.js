import {MAX_TIME} from './game-timer';

const getAnswerWithTime = (time, answer) => {
  if (answer) {
    if (time > MAX_TIME - 10) {
      return `fast`;
    } else if (time < MAX_TIME - 20) {
      return `slow`;
    }
    return `correct`;
  }
  return `wrong`;
};

const addAnswer = (game, answer) => {
  if (typeof answer === `boolean`) {
    const newAnswer = getAnswerWithTime(game.timer, answer);
    return Object.freeze(Object.assign({}, game, {answers: [...game.answers, newAnswer]}));
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
