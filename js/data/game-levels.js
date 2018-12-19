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

const isFinalQuestion = (game) => game.level > game.questions.length - 1;

const getCurrentLevel = (game) => game.level;

export {changeLevel, nextLevel, isFinalQuestion, getCurrentLevel};
