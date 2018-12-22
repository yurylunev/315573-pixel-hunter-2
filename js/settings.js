const hash = window.location.hash.replace(`#`, ``);
const DEBUG = hash.toLowerCase() === `debug`;
const DEBUG_STYLE = `border: 4px solid lightcoral`;

export {DEBUG, DEBUG_STYLE};
