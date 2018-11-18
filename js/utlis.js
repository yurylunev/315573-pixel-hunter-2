const rootElement = document.querySelector(`#main`);
const showScreen = (template) => {
  rootElement.innerHTML = ``;
  rootElement.appendChild(template);
};

const getElementFromTemplate = (template) => {
  const result = document.createElement(`div`);
  result.innerHTML = template;
  return result;
};

export {getElementFromTemplate, showScreen};
