const addAnswer = (state, answer) => {
  switch (answer) {
    case `fast`:
    case `correct`:
    case `slow`:
    case `wrong`:
      return Object.freeze(Object.assign({}, state, {answers: [...state.answers, answer]}));
  }
  throw new Error(`Incorrect answer value: ${answer}`);
};

const countScore = (answers, lives) => {
  if ((answers.length < 10) || (lives < 0)) {
    return -1;
  }
  let score = 0;
  for (let answer of answers) {
    if (answer !== `wrong`) {
      score += 100;
      switch (answer) {
        case `fast`:
          score += 50;
          break;
        case `slow`:
          score -= 50;
      }
    }
  }
  return score + lives * 50;
};

export {addAnswer, countScore};
