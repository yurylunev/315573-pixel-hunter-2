const ration = (width, height) => height / width;

const getSizes = (containerWidth, containerHeight, imageWidth, imageHeight) => {
  const containerRatio = ration(containerWidth, containerHeight);
  const imageRatio = ration(imageWidth, imageHeight);
  let width;
  let height;
  if (containerRatio > imageRatio) {
    width = containerWidth;
    height = Math.round(imageHeight * containerWidth / imageWidth);
  } else {
    width = Math.round(imageWidth * containerHeight / imageHeight);
    height = containerHeight;
  }
  return ({width, height});
};

const adaptServerData = (questions, images) => {
  const result = [];
  let i = 0;
  for (const level of questions) {
    result.push(level.answers.map((answer) => {
      return {
        image: Object.assign({}, {url: answer.image.url}, getSizes(answer.image.width, answer.image.height, images[i].width, images[i++].height)),
        rightAnswer: answer.type.slice(0, 5)
      };
    }));
  }
  return result;
};

export {adaptServerData};
