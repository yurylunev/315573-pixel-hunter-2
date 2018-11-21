import {assert} from "chai";
import {INITIAL_GAME} from "./game-data";
import {changeTime, isTimeOff, tick, warningTime} from "./game-time";

describe(`Check time changer`, () => {

  it(`Should update time of the game`, () => {
    assert.equal(changeTime(INITIAL_GAME, 1).time, 1);
    assert.equal(changeTime(INITIAL_GAME, 10).time, 10);
    assert.throw(() => changeTime(INITIAL_GAME, 102).time, `Time should be less 30 sec`);
  });

  it(`Should not allow set negative values`, () => {
    assert.throws(() => changeTime(INITIAL_GAME, -1).time, /Time should not be negative value/);
  });

  it(`Should not allow set non number value`, () => {
    assert.throws(() => changeTime(INITIAL_GAME, []).time, /Time should be of type number/);
    assert.throws(() => changeTime(INITIAL_GAME, {}).time, /Time should be of type number/);
    assert.throws(() => changeTime(INITIAL_GAME, undefined).time, /Time should be of type number/);
    assert.throws(() => changeTime(INITIAL_GAME, null).time, /Time should be of type number/);
  });

  it(`Should be tick, expect 29`, () => {
    assert.equal(tick(changeTime(INITIAL_GAME, 30)).time, 29);
  });

  it(`Function warningTime should return true`, () => {
    assert.isTrue(warningTime(changeTime(INITIAL_GAME, 5)));
  });

  it(`Function warningTime should return false`, () => {
    assert.isFalse(warningTime(changeTime(INITIAL_GAME, 6)));
  });

  it(`Function isTimeOff should return true`, () => {
    assert.isTrue(isTimeOff(changeTime(INITIAL_GAME, 0)));
  });

  it(`Function isTimeOff should return false`, () => {
    assert.isFalse(isTimeOff(changeTime(INITIAL_GAME, 1)));
  });

  it(`Function isTimeOff should return Error message`, () => {
    assert.throw(() => isTimeOff(tick(changeTime(INITIAL_GAME, 0))), /Time should not be negative value/);
    assert.throw(() => isTimeOff(changeTime(INITIAL_GAME, 31)), /Time should be less 30 sec/);
  });
});
