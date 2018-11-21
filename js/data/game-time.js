const changeTime = (game, time) => {
  if (typeof time !== `number`) {
    throw new Error(`Time should be of type number: ${typeof time}`);
  }
  if (time < 0) {
    throw new Error(`Time should not be negative value: ${time}`);
  }
  if (time > 30) {
    throw new Error(`Time should be less 30 sec: ${time}`);
  }
  return Object.freeze(Object.assign({}, game, {time}));
};
const tick = (game) => {
  return changeTime(game, game.time - 1);
};
const warningTime = (game) => {
  return game.time <= 5;
};
const isTimeOff = (game) => {
  return game.time <= 0;
};

export {changeTime, tick, warningTime, isTimeOff};
