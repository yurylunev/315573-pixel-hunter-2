import {assert} from "chai";
import {addAnswer, countScore} from "./game-score";
import {INITIAL_GAME} from "../utils/game-data";

const testQuestions = [
  [
    {image: `http://i.imgur.com/1KegWPz.jpg`, rightAnswer: `photo`},
    {image: `https://k42.kn3.net/CF42609C8.jpg`, rightAnswer: `paint`}
  ],
  [
    {image: `https://k42.kn3.net/D2F0370D6.jpg`, rightAnswer: `paint`}
  ],
  [
    {image: `https://k32.kn3.net/5C7060EC5.jpg`, rightAnswer: `paint`},
    {image: `http://i.imgur.com/1KegWPz.jpg`, rightAnswer: `photo`},
    {image: `http://i.imgur.com/DKR1HtB.jpg`, rightAnswer: `photo`}
  ],
  [
    {image: `http://i.imgur.com/1KegWPz.jpg`, rightAnswer: `photo`},
    {image: `https://k42.kn3.net/CF42609C8.jpg`, rightAnswer: `paint`}
  ],
  [
    {image: `https://k42.kn3.net/D2F0370D6.jpg`, rightAnswer: `paint`}
  ],
  [
    {image: `https://k32.kn3.net/5C7060EC5.jpg`, rightAnswer: `paint`},
    {image: `http://i.imgur.com/1KegWPz.jpg`, rightAnswer: `photo`},
    {image: `http://i.imgur.com/DKR1HtB.jpg`, rightAnswer: `photo`}
  ],
  [
    {image: `http://i.imgur.com/1KegWPz.jpg`, rightAnswer: `photo`},
    {image: `https://k42.kn3.net/CF42609C8.jpg`, rightAnswer: `paint`}
  ],
  [
    {image: `https://k42.kn3.net/D2F0370D6.jpg`, rightAnswer: `paint`}
  ],
  [
    {image: `https://k32.kn3.net/5C7060EC5.jpg`, rightAnswer: `paint`},
    {image: `http://i.imgur.com/1KegWPz.jpg`, rightAnswer: `photo`},
    {image: `http://i.imgur.com/DKR1HtB.jpg`, rightAnswer: `photo`}
  ],
  [
    {image: `http://i.imgur.com/1KegWPz.jpg`, rightAnswer: `photo`},
    {image: `https://k42.kn3.net/CF42609C8.jpg`, rightAnswer: `paint`}
  ]
];
const ANSWERS_LESS_10 = [`wrong`, `correct`, `fast`, `wrong`, `wrong`, `wrong`];
const ANSWERS_CORRECT = [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`];
const ANSWERS_FAST = [`fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`];
const ANSWERS_SLOW = [`wrong`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `wrong`, `slow`, `wrong`];
const ANSWERS_1000 = [`wrong`, `correct`, `fast`, `fast`, `slow`, `fast`, `fast`, `slow`, `fast`, `wrong`];

const getTestQuestions = (game) => Object.freeze(Object.assign({}, game, {
  questions: testQuestions,
  answers: []
}));

const generateState = (answers) => Object.freeze(Object.assign({}, getTestQuestions(INITIAL_GAME), {answers}));

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
