const getStatusBar = (answers) => `<ul class="stats">
  ${answers.reduce((html, answer) => html + `<li class="stats__result stats__result--${answer}"></li>`, ``)}
  </ul>`;

export default getStatusBar;
