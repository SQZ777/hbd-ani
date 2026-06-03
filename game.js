const config = window.BIRTHDAY_GAME_CONFIG;

const screens = {
  start: document.querySelector("#startScreen"),
  game: document.querySelector("#gameScreen"),
  win: document.querySelector("#winScreen"),
};

const el = {
  gameTitle: document.querySelector("#gameTitle"),
  gameSubtitle: document.querySelector("#gameSubtitle"),
  difficultySelect: document.querySelector("#difficultySelect"),
  startBtn: document.querySelector("#startBtn"),
  stageTitle: document.querySelector("#stageTitle"),
  boardStage: document.querySelector("#boardStage"),
  board: document.querySelector("#board"),
  revealImage: document.querySelector("#revealImage"),
  revealProgress: document.querySelector("#revealProgress"),
  moves: document.querySelector("#moves"),
  matched: document.querySelector("#matched"),
  timer: document.querySelector("#timer"),
  restartBtn: document.querySelector("#restartBtn"),
  confettiLayer: document.querySelector("#confettiLayer"),
  winTitle: document.querySelector("#winTitle"),
  winMessage: document.querySelector("#winMessage"),
  finalMoves: document.querySelector("#finalMoves"),
  finalTime: document.querySelector("#finalTime"),
  memoryList: document.querySelector("#memoryList"),
  playAgainBtn: document.querySelector("#playAgainBtn"),
};

let state = {
  friendName: config.defaultFriendName || "阿妮",
  cards: [],
  opened: [],
  lock: false,
  moves: 0,
  matchedPairs: 0,
  totalPairs: 0,
  startedAt: null,
  timerId: null,
  usedMemories: [],
};

function template(str, name) {
  return str.replaceAll("{name}", name);
}

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

function shuffle(array) {
  const cloned = [...array];
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

function getPairCount() {
  const difficulty = el.difficultySelect.value;
  if (difficulty === "easy") return 4;
  if (difficulty === "hard") return 8;
  return 6;
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function updateTimer() {
  if (!state.startedAt) return;
  el.timer.textContent = formatTime(Date.now() - state.startedAt);
}

function startTimer() {
  stopTimer();
  state.startedAt = Date.now();
  updateTimer();
  state.timerId = setInterval(updateTimer, 500);
}

function stopTimer() {
  if (state.timerId) clearInterval(state.timerId);
  state.timerId = null;
}

function buildCards(memories) {
  return shuffle(memories.flatMap(memory => [
    { ...memory, cardId: `${memory.id}-a` },
    { ...memory, cardId: `${memory.id}-b` },
  ]));
}

function updateRevealProgress() {
  const progress = state.totalPairs === 0 ? 0 : state.matchedPairs / state.totalPairs;
  el.boardStage.style.setProperty("--reveal-progress", progress.toFixed(4));
  el.revealProgress.textContent = `${Math.round(progress * 100)}%`;
}

function launchConfetti() {
  el.confettiLayer.innerHTML = "";

  const pieceCount = 60;
  const colors = ["#ff6f91", "#ff9671", "#ffd166", "#845ec2", "#00c2a8", "#ffffff"];

  for (let index = 0; index < pieceCount; index += 1) {
    const piece = document.createElement("span");
    const size = 8 + Math.random() * 10;
    const left = 50 + (Math.random() * 2 - 1) * 10;
    const delay = Math.random() * 100;
    const duration = 900 + Math.random() * 1000;
    const drift = (Math.random() * 2 - 1) * 280;
    const rise = -120 - Math.random() * 120;
    const color = colors[Math.floor(Math.random() * colors.length)];

    piece.className = "confetti-piece";
    piece.style.setProperty("--left", `${left}%`);
    piece.style.setProperty("--size", `${size}px`);
    piece.style.setProperty("--delay", `${delay}ms`);
    piece.style.setProperty("--duration", `${duration}ms`);
    piece.style.setProperty("--drift", `${drift}px`);
    piece.style.setProperty("--rise", `${rise}px`);
    piece.style.setProperty("--color", color);

    el.confettiLayer.appendChild(piece);
  }

  window.setTimeout(() => {
    el.confettiLayer.innerHTML = "";
  }, 2600);
}

function renderBoard() {
  el.board.innerHTML = "";
  el.board.className = `board pairs-${state.totalPairs}`;

  state.cards.forEach(card => {
    const button = document.createElement("button");
    button.className = "card";
    button.type = "button";
    button.dataset.cardId = card.cardId;
    button.dataset.memoryId = card.id;
    button.setAttribute("aria-label", `翻開 ${card.title}`);

    button.innerHTML = `
      <span class="card-inner">
        <span class="card-face card-back">
          <span class="sparkle">✦</span>
          <span class="back-text">Birthday</span>
        </span>
        <span class="card-face card-front">
          <img src="${card.image}" alt="${card.title}" />
          <span class="caption">${card.title}</span>
        </span>
      </span>
    `;

    button.addEventListener("click", () => flipCard(button, card));
    el.board.appendChild(button);
  });
}

function flipCard(button, card) {
  if (state.lock) return;
  if (button.classList.contains("open") || button.classList.contains("matched")) return;

  button.classList.add("open");
  state.opened.push({ button, card });

  if (state.opened.length === 2) {
    state.moves += 1;
    el.moves.textContent = state.moves;
    checkMatch();
  }
}

function checkMatch() {
  const [first, second] = state.opened;
  const isMatch = first.card.id === second.card.id;

  if (isMatch) {
    first.button.classList.add("matched");
    second.button.classList.add("matched");
    state.opened = [];
    state.matchedPairs += 1;
    el.matched.textContent = `${state.matchedPairs}/${state.totalPairs}`;
    updateRevealProgress();

    if (state.matchedPairs === state.totalPairs) {
      setTimeout(showWin, 650);
    }
    return;
  }

  state.lock = true;
  setTimeout(() => {
    first.button.classList.remove("open");
    second.button.classList.remove("open");
    state.opened = [];
    state.lock = false;
  }, 850);
}

function startGame() {
  state.friendName = config.defaultFriendName || "阿妮";

  const pairCount = Math.min(getPairCount(), config.memories.length);
  state.usedMemories = config.memories.slice(0, pairCount);
  state.totalPairs = pairCount;
  state.cards = buildCards(state.usedMemories);
  state.opened = [];
  state.lock = false;
  state.moves = 0;
  state.matchedPairs = 0;

  el.moves.textContent = "0";
  el.matched.textContent = `0/${state.totalPairs}`;
  el.timer.textContent = "00:00";
  el.stageTitle.textContent = template(config.stageTitleTemplate, state.friendName);
  el.revealImage.src = config.revealImage || state.usedMemories[state.usedMemories.length - 1]?.image || "";
  updateRevealProgress();

  renderBoard();
  showScreen("game");
  startTimer();
}

function showWin() {
  stopTimer();
  const finalTime = el.timer.textContent;

  el.winTitle.textContent = template(config.winTitleTemplate, state.friendName);
  el.winMessage.textContent = template(config.winMessageTemplate, state.friendName);
  el.finalMoves.textContent = state.moves;
  el.finalTime.textContent = finalTime;

  el.memoryList.innerHTML = state.usedMemories.map(memory => `
    <article class="memory-item">
      <img src="${memory.image}" alt="${memory.title}" />
      <div>
        <h3>${memory.title}</h3>
        <p>${memory.message}</p>
      </div>
    </article>
  `).join("");

  showScreen("win");
  requestAnimationFrame(() => {
    launchConfetti();
  });
}

function init() {
  el.gameTitle.textContent = template(config.titleTemplate, config.defaultFriendName || "阿妮");
  el.gameSubtitle.textContent = config.subtitle;
  el.revealImage.src = config.revealImage || config.memories[config.memories.length - 1]?.image || "";
  updateRevealProgress();

  el.startBtn.addEventListener("click", startGame);
  el.restartBtn.addEventListener("click", startGame);
  el.playAgainBtn.addEventListener("click", () => {
    showScreen("start");
  });
}

init();
