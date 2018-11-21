import {assert} from "chai";
import {INITIAL_GAME} from "./game-data";
import {changeLevel, nextLevel} from "./game-levels";

describe(`Check level changer`, () => {

  it(`Should update level of the game`, () => {
    assert.equal(changeLevel(INITIAL_GAME, 1).level, 1);
    assert.equal(changeLevel(INITIAL_GAME, 3).level, 3);
  });

  it(`Should not allow set negative values`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, -1).level, /Level should not be negative value/);
    assert.throws(() => changeLevel(INITIAL_GAME, -10).level, /Level should not be negative value/);
  });

  it(`Should not allow set non number value`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, []).level, /Level should be of type number/);
    assert.throws(() => changeLevel(INITIAL_GAME, {}).level, /Level should be of type number/);
    assert.throws(() => changeLevel(INITIAL_GAME, undefined).level, /Level should be of type number/);
    assert.throws(() => changeLevel(INITIAL_GAME, null).level, /Level should be of type number/);
  });

  it(`Should next level, expect 1`, () => {
    assert.equal(nextLevel(INITIAL_GAME).level, 1);
  });

  it(`Should next level, expect 10`, () => {
    assert.equal(nextLevel(changeLevel(INITIAL_GAME, 9)).level, 10);
  });
});
