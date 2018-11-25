const changeLives = (game, lives) => {
  if (typeof lives !== `number`) {
    throw new Error(`Lives should be of type number`);
  }
  if (lives < -1) {
    throw new Error(`Lives should not be negative value`);
  }
  return Object.freeze(Object.assign({}, game, {lives}));
};

const decreaseLives = (game) => {
  if (game.lives === -1) {
    return Object.freeze(game);
  }
  return changeLives(game, game.lives - 1);
};

const isDead = (game) => (game.lives === -1);

const hasLives = (game) => (game.lives >= 0);

export {changeLives, decreaseLives, isDead, hasLives};
