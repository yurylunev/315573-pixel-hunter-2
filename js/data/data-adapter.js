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

const loadImage = (url) => {
  return new Promise((onLoad, onError) => {
    const image = new Image();
    image.onload = () => onLoad(image);
    image.onerror = () => onError(`Не удалось загрузить картнку: ${url}`);
    image.src = url;
  });
};

async function adaptServerData(questionsFromServer) {
  const adaptedData = [];
  const images = [];
  const questions = await questionsFromServer;
  let i = 0;
  for (const level of questions) {
    for (const answer of level.answers) {
      images.push(await loadImage(answer.image.url));
    }
  }
  for (const level of questions) {
    adaptedData.push(level.answers.map((answer) => {
      return {
        image: Object.assign({}, {url: answer.image.url}, getSizes(answer.image.width, answer.image.height, images[i].width, images[i++].height)),
        rightAnswer: answer.type.slice(0, 5)
      };
    }));
  }
  return adaptedData;
}

export {adaptServerData};
