const changeLives = (game, lives) => {
  if (typeof lives !== `number`) {
    throw new Error(`Lives should be of type number`);
  }
  if (lives < -1) {
    throw new Error(`Lives should not be negative value`);
  }
  return Object.freeze(Object.assign({}, game, {lives}));
};

const decreaseLives = (game) => (isDead(game)) ? Object.freeze(game) : changeLives(game, game.lives - 1);

const isDead = (game) => (game.lives === -1);

export {changeLives, decreaseLives, isDead};
