const modal = document.querySelectorAll('dialog');

const html = document.querySelector('.button-html');
html.onclick = () => {
  modal[0].showModal();
}

function closeModal() {
  modal[0].close();
}

const css = document.querySelector('.button-css');
css.onclick = () => {
  modal[1].showModal();
}

function closeModal() {
  modal[1].close();
}

const js = document.querySelector('.button-js');
js.onclick = () => {
  modal[2].showModal();
}

function closeModal() {
  modal[2].close();
}

const react = document.querySelector('.button-react');
react.onclick = () => {
  modal[3].showModal();
}

function closeModal() {
  modal[3].close();
}

const nodejs = document.querySelector('.button-nodeJS');
nodejs.onclick = () => {
  modal[4].showModal();
}

function closeModal() {
  modal[4].close();
}
