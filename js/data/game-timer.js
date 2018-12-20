const MAX_TIME = 30;
const changeTimer = (state, timer) => {
  if (typeof timer !== `number`) {
    throw new Error(`Time should be of type number: ${typeof timer}`);
  }
  if (timer < 0) {
    throw new Error(`Time should not be negative value: ${timer}`);
  }
  if (timer > MAX_TIME) {
    throw new Error(`Time should be less 30 sec: ${timer}`);
  }
  return Object.freeze(Object.assign({}, state, {timer}));
};
const tick = (state) => {
  return changeTimer(state, state.timer - 1);
};
const warningTimer = (state) => {
  return state.timer <= 5;
};
const isTimerOff = (state) => {
  return state.timer <= 0;
};
const resetTimer = (state) => Object.freeze(Object.assign({}, state, {timer: MAX_TIME}));

export {changeTimer, tick, warningTimer, isTimerOff, resetTimer, MAX_TIME};
