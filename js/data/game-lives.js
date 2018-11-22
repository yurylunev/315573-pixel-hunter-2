const changeLives = (state, lives) => {
  if (typeof lives !== `number`) {
    throw new Error(`Lives should be of type number`);
  }
  if (lives < -1) {
    throw new Error(`Lives should not be negative value`);
  }
  return Object.freeze(Object.assign({}, state, {lives}));
};

const isDead = (state) => (state.lives === -1);

const decreaseLives = (state) => {
  if (isDead(state)) {
    return Object.freeze(state);
  }
  return changeLives(state, state.lives - 1);
};

export {changeLives, decreaseLives, isDead};
