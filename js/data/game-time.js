const changeTime = (state, time) => {
  if (typeof time !== `number`) {
    throw new Error(`Time should be of type number: ${typeof time}`);
  }
  if (time < 0) {
    throw new Error(`Time should not be negative value: ${time}`);
  }
  if (time > 30) {
    throw new Error(`Time should be less 30 sec: ${time}`);
  }
  return Object.freeze(Object.assign({}, state, {time}));
};
const tick = (state) => {
  return changeTime(state, state.time - 1);
};
const warningTime = (state) => {
  return state.time <= 5;
};
const isTimeOff = (state) => {
  return state.time <= 0;
};

export {changeTime, tick, warningTime, isTimeOff};
