const adaptServerData = (data) => data.reduce((result, level) =>
  [...result, (level.answers.map((answer) => ({
    image: answer.image.url,
    rightAnswer: answer.type.slice(0, 5)
  })))
  ], []);

export {adaptServerData};
