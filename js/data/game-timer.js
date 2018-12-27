import {MAX_TIME, WARNING_TIME} from "../utils/game-settings";

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

const tick = (state) => changeTimer(state, state.timer - 1);

const isWarningTimer = (state) => state.timer <= WARNING_TIME;

const isTimerOff = (state) => state.timer <= 0;

const resetTimer = (state) => Object.freeze(Object.assign({}, state, {timer: MAX_TIME}));

export {changeTimer, tick, isWarningTimer, isTimerOff, resetTimer};
