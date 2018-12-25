import {MAX_TIME, FAST_TIME, SLOW_TIME, FAST_SCORE, CORRECT_SCORE, SLOW_SCORE, LIVE_SCORE} from "./game-settings";

const getAnswerWithTime = (time, answer) => {
  if (answer) {
    if (FAST_TIME > MAX_TIME - time) {
      return `fast`;
    } else if (SLOW_TIME < MAX_TIME - time) {
      return `slow`;
    }
    return `correct`;
  }
  return `wrong`;
};

const addAnswer = (game, answer) => {
  if (typeof answer === `boolean`) {
    return Object.freeze(Object.assign({}, game, {answers: game.answers.fill(getAnswerWithTime(game.timer, answer), game.level, game.level + 1)}));
  }
  throw new Error(`Incorrect answer value: ${answer}`);
};

const countRightAnswers = (answers) => answers.filter((answer) => (answer !== `wrong`)).length;

const countFastAnswers = (answers) => answers.filter((answer) => (answer === `fast`)).length;

const countSlowAnswers = (answers) => answers.filter((answer) => (answer === `slow`)).length;

const countScore = (answers, lives) => {
  if (lives < 0) {
    return -1;
  }
  let score = 0;
  for (const answer of answers) {
    switch (answer) {
      case `fast`:
        score += FAST_SCORE;
        break;
      case `correct`:
        score += CORRECT_SCORE;
        break;
      case `slow`:
        score += SLOW_SCORE;
        break;
    }
  }
  return score + lives * LIVE_SCORE;
};

export {addAnswer, countScore, countRightAnswers, countFastAnswers, countSlowAnswers};
