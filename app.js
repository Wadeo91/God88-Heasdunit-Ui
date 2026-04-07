const clockEl = document.getElementById("clock");
const tempValue = document.getElementById("tempValue");
const tempUp = document.getElementById("tempUp");
const tempDown = document.getElementById("tempDown");
const play = document.getElementById("play");
const track = document.getElementById("track");
const viewTitle = document.getElementById("viewTitle");
const startBtn = document.getElementById("startBtn");
const startPanel = document.getElementById("startPanel");
const playlistView = document.getElementById("playlistView");

const playlist = [
  "Midnight City — M83",
  "Blinding Lights — The Weeknd",
  "Levitating — Dua Lipa",
  "Sunset Lover — Petit Biscuit",
  "As It Was — Harry Styles",
];

const views = {
  home: "Home Dashboard",
  maps: "Maps",
  media: "Media",
  calls: "Calls",
  settings: "Vehicle Settings",
};

let playing = true;
let current = 0;

function updateClock() {
  clockEl.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function setTrack(index) {
  current = (index + playlist.length) % playlist.length;
  track.textContent = playlist[current];
  renderPlaylist();
}

function setTemp(value) {
  const bounded = Math.max(60, Math.min(84, value));
  tempValue.textContent = String(bounded);
}

function renderPlaylist() {
  playlistView.innerHTML = "";
  playlist.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song;
    if (index === current) {
      li.style.border = "1px solid rgba(96,165,250,0.7)";
    }
    li.addEventListener("click", () => setTrack(index));
    playlistView.appendChild(li);
  });
}

function switchView(targetView) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active-view", view.id === targetView);
  });

  document.querySelectorAll(".rail-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === targetView);
  });

  viewTitle.textContent = views[targetView] || "Dashboard";
}

document.querySelectorAll(".rail-btn").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

document.getElementById("prev").addEventListener("click", () => setTrack(current - 1));
document.getElementById("next").addEventListener("click", () => setTrack(current + 1));
play.addEventListener("click", () => {
  playing = !playing;
  play.textContent = playing ? "⏸" : "▶";
});

tempUp.addEventListener("click", () => setTemp(Number(tempValue.textContent) + 1));
tempDown.addEventListener("click", () => setTemp(Number(tempValue.textContent) - 1));

startBtn.addEventListener("click", () => {
  const hidden = startPanel.hasAttribute("hidden");
  if (hidden) {
    startPanel.removeAttribute("hidden");
    return;
  }
  startPanel.setAttribute("hidden", "");
});

document.addEventListener("click", (event) => {
  if (!startPanel.contains(event.target) && !startBtn.contains(event.target)) {
    startPanel.setAttribute("hidden", "");
  }
});

updateClock();
setInterval(updateClock, 1000);
setTrack(0);
switchView("home");
