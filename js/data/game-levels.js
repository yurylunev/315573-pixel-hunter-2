const changeLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }
  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }
  return Object.freeze(Object.assign({}, game, {level}));
};

const nextLevel = (game) => {
  return changeLevel(game, game.level + 1);
};

const isFinalQuestion = (game) => {
  return game.level === game.questions.length - 1;
};

export {changeLevel, nextLevel, isFinalQuestion};
