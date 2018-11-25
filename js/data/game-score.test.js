import {assert} from "chai";
import {addAnswer, countScore} from "./game-score";
import {INITIAL_GAME} from "./game-data";
import {nextLevel} from "./game-levels";
import {decreaseLives} from "./game-lives";
import {getQuestions} from "./game-questions";

const ANSWERS_LESS_10 = [`wrong`, `correct`, `fast`, `wrong`, `wrong`, `wrong`, `unknown`, `unknown`, `unknown`, `unknown`];
const ANSWERS_CORRECT = [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`];
const ANSWERS_FAST = [`fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`];
const ANSWERS_SLOW = [`wrong`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `wrong`, `slow`, `wrong`];
const ANSWERS_1000 = [`wrong`, `correct`, `fast`, `fast`, `slow`, `fast`, `fast`, `slow`, `fast`, `wrong`];

const generateState = (answers) => {
  let state = getQuestions(INITIAL_GAME);
  for (let answer of answers) {
    if (answer !== `wrong`) {
      state = Object.assign(nextLevel(addAnswer(state, answer)));
    } else {
      state = Object.assign(nextLevel(addAnswer(decreaseLives(state), answer)));
    }
  }
  return Object.freeze(state);
};

describe(`Check count score`, () => {

  it(`Should be correct answers array when add new answer`, () => {
    assert.deepEqual(generateState(ANSWERS_LESS_10).answers, ANSWERS_LESS_10);
    assert.deepEqual(generateState(ANSWERS_CORRECT).answers, ANSWERS_CORRECT);
  });

  it(`Should not allow add incorrect answer value`, () => {
    assert.throws(() => addAnswer(generateState(ANSWERS_LESS_10), `incorrect`), `Incorrect answer value`);
    assert.throws(() => addAnswer(generateState(ANSWERS_LESS_10), ``), `Incorrect answer value`);
    assert.throws(() => addAnswer(generateState(ANSWERS_LESS_10), null), `Incorrect answer value`);
    assert.throws(() => addAnswer(generateState(ANSWERS_LESS_10), undefined), `Incorrect answer value`);
    assert.throws(() => addAnswer(generateState(ANSWERS_LESS_10), []), `Incorrect answer value`);
  });

  describe(`Answers less then 10`, () => {
    it(`Should be -1`, () => {
      assert.equal(countScore(generateState(ANSWERS_LESS_10).answers, generateState(ANSWERS_LESS_10).lives), -1);
    });
  });

  describe(`10 correct answers`, () => {

    it(`Should be 1150`, () => {
      assert.equal(countScore(generateState(ANSWERS_CORRECT).answers, 3), 1150);
    });
  });

  describe(`Count score with any answers`, () => {

    it(`Should be minimum score`, () => {
      assert.equal(countScore(generateState(ANSWERS_SLOW).answers, 0), 350);
    });

    it(`Should be maximum score`, () => {
      assert.equal(countScore(generateState(ANSWERS_FAST).answers, 3), 1650);
    });

    it(`Should be 1000 score`, () => {
      assert.equal(countScore(generateState(ANSWERS_1000).answers, 1), 1000);
    });
  });
});
