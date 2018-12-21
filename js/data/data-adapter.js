const ratio = (width, height) => height / width;

const getSizes = (containerWidth, containerHeight, imageWidth, imageHeight) => {
  const containerRatio = ratio(containerWidth, containerHeight);
  const imageRatio = ratio(imageWidth, imageHeight);
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
  let result = [];
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
