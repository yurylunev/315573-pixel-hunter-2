import {assert} from "chai";
import {INITIAL_GAME} from "./game-data";
import {changeTimer, isTimerOff, tick, isWarningTimer} from "./game-timer";

describe(`Check time changer`, () => {

  it(`Should update time of the game`, () => {
    assert.equal(changeTimer(INITIAL_GAME, 1).timer, 1);
    assert.equal(changeTimer(INITIAL_GAME, 10).timer, 10);
    assert.throw(() => changeTimer(INITIAL_GAME, 102).timer, `Time should be less 30 sec`);
  });

  it(`Should not allow set negative values`, () => {
    assert.throws(() => changeTimer(INITIAL_GAME, -1).timer, /Time should not be negative value/);
  });

  it(`Should not allow set non number value`, () => {
    assert.throws(() => changeTimer(INITIAL_GAME, []).timer, /Time should be of type number/);
    assert.throws(() => changeTimer(INITIAL_GAME, {}).timer, /Time should be of type number/);
    assert.throws(() => changeTimer(INITIAL_GAME, undefined).timer, /Time should be of type number/);
    assert.throws(() => changeTimer(INITIAL_GAME, null).timer, /Time should be of type number/);
  });

  it(`Should be tick, expect 29`, () => {
    assert.equal(tick(changeTimer(INITIAL_GAME, 30)).timer, 29);
  });

  it(`Function warningTime should return true`, () => {
    assert.isTrue(isWarningTimer(changeTimer(INITIAL_GAME, 5)));
  });

  it(`Function warningTime should return false`, () => {
    assert.isFalse(isWarningTimer(changeTimer(INITIAL_GAME, 6)));
  });

  it(`Function isTimeOff should return true`, () => {
    assert.isTrue(isTimerOff(changeTimer(INITIAL_GAME, 0)));
  });

  it(`Function isTimeOff should return false`, () => {
    assert.isFalse(isTimerOff(changeTimer(INITIAL_GAME, 1)));
  });

  it(`Function isTimeOff should return Error message`, () => {
    assert.throw(() => isTimerOff(tick(changeTimer(INITIAL_GAME, 0))), /Time should not be negative value/);
    assert.throw(() => isTimerOff(changeTimer(INITIAL_GAME, 31)), /Time should be less 30 sec/);
  });
});
