const addAnswer = (game, answer) => {
  switch (answer) {
    case `fast`:
    case `correct`:
    case `slow`:
    case `wrong`:
      return Object.freeze(Object.assign({}, game, {answers: [...game.answers, answer]}));
  }
  throw new Error(`Incorrect answer value: ${answer}`);
};

const countScore = (answers, lives) => {
  if ((answers.length < 10) || (lives < 0)) {
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

export {addAnswer, countScore};
