import bootApp from './app';

let config = {};

function getRootElement() {
  return document.getElementById('graphmilker');
}

function createApp() {
  const element = document.createElement('div');
  element.id = 'graphmilker';
  document.body.appendChild(element);

  bootApp(element, config);
}

function hide() {
  const element = getRootElement();
  element.style.display = 'none';
}

function show() {
  const element = getRootElement();
  if (element) {
    element.style.display = 'block';
  } else {
    createApp();
  }
}

function setConfig(configObj) {
  config = configObj;
}

window.graphmilker = {
  hide,
  setConfig,
  show
};
