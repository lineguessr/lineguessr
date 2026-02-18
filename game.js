let pool = [];
let active = null;
let locked = false;

const imgEl = document.getElementById('sampleImage');
const choicesEl = document.getElementById('choices');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('nextBtn');

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

async function load() {
  const res = await fetch('data.json');
  const data = await res.json();
  pool = data.samples;
  next();
}

function next() {
  locked = false;
  resultEl.textContent = '';
  resultEl.className = 'result';

  active = pick(pool);

  const imgNum = String(Math.floor(Math.random() * 2) + 1).padStart(3, '0');
  imgEl.src = `powders/${active.id}/${imgNum}.jpg`;

  renderChoices();
}

function renderChoices() {
  choicesEl.innerHTML = '';

  shuffle(pool).forEach(item => {
    const btn = document.createElement('button');
    btn.textContent = item.label;
    btn.onclick = () => guess(item.id);
    choicesEl.appendChild(btn);
  });
}

function guess(id) {
  if (locked) return;
  locked = true;

  if (id === active.id) {
    resultEl.textContent = 'Correct';
    resultEl.classList.add('correct');
  } else {
    resultEl.textContent = 'Wrong';
    resultEl.classList.add('wrong');
  }
}

nextBtn.addEventListener('click', next);

load();
