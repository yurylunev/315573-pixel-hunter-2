const changeLevel = (state, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }
  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }
  return Object.freeze(Object.assign({}, state, {level}));
};

const nextLevel = (state) => {
  return changeLevel(state, state.level + 1);
};

export {changeLevel, nextLevel};
