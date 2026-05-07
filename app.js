const clockEl = document.getElementById("clock");
const viewTitle = document.getElementById("viewTitle");
const railButtons = document.querySelectorAll(".rail-app");
const tileButtons = document.querySelectorAll(".tile[data-view]");
const playlistView = document.getElementById("playlistView");
const track = document.getElementById("track");
const play = document.getElementById("play");
const tempValue = document.getElementById("tempValue");
const dspReadout = document.getElementById("dspReadout");

const playlist = [
  "Midnight City — M83",
  "Blinding Lights — The Weeknd",
  "Levitating — Dua Lipa",
  "Starboy — The Weeknd",
  "As It Was — Harry Styles",
];

const titles = {
  home: "Android Dashboard",
  maps: "Navigation",
  media: "Music",
  dsp: "OPTMN8 DSP",
  calls: "Phone",
  settings: "System Settings",
};

let playing = true;
let current = 0;

function updateClock() {
  clockEl.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function switchView(viewId) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active-view", view.id === viewId);
  });

  railButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewId);
  });

  viewTitle.textContent = titles[viewId] || "Android Dashboard";
}

function setTrack(index) {
  current = (index + playlist.length) % playlist.length;
  track.textContent = playlist[current];
  renderPlaylist();
}

function renderPlaylist() {
  playlistView.innerHTML = "";
  playlist.forEach((song, idx) => {
    const item = document.createElement("li");
    item.textContent = song;
    item.style.border = idx === current ? "1px solid #3ddc84" : "1px solid transparent";
    item.addEventListener("click", () => setTrack(idx));
    playlistView.appendChild(item);
  });
}

function setTemp(next) {
  const bounded = Math.max(60, Math.min(84, next));
  tempValue.textContent = String(bounded);
}

function updateDspReadout() {
  const bass = document.getElementById("bass").value;
  const mid = document.getElementById("mid").value;
  const treble = document.getElementById("treble").value;
  const sub = document.getElementById("sub").value;
  dspReadout.textContent = `Bass ${bass >= 0 ? "+" : ""}${bass} • Mid ${mid >= 0 ? "+" : ""}${mid} • Treble ${treble >= 0 ? "+" : ""}${treble} • Sub ${sub >= 0 ? "+" : ""}${sub}`;
}

function applyPreset(name) {
  const presets = {
    flat: { bass: 0, mid: 0, treble: 0, sub: 0 },
    driver: { bass: 2, mid: 3, treble: 2, sub: 1 },
    bass: { bass: 8, mid: 1, treble: 2, sub: 7 },
  };

  const selected = presets[name];
  if (!selected) return;

  Object.entries(selected).forEach(([key, value]) => {
    document.getElementById(key).value = value;
  });

  updateDspReadout();
}

railButtons.forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

tileButtons.forEach((tile) => {
  tile.addEventListener("click", () => switchView(tile.dataset.view));
});

document.getElementById("prev").addEventListener("click", () => setTrack(current - 1));
document.getElementById("next").addEventListener("click", () => setTrack(current + 1));
play.addEventListener("click", () => {
  playing = !playing;
  play.textContent = playing ? "⏸" : "▶";
});

document.getElementById("tempUp").addEventListener("click", () => setTemp(Number(tempValue.textContent) + 1));
document.getElementById("tempDown").addEventListener("click", () => setTemp(Number(tempValue.textContent) - 1));

["bass", "mid", "treble", "sub"].forEach((id) => {
  document.getElementById(id).addEventListener("input", updateDspReadout);
});

document.querySelectorAll(".preset").forEach((button) => {
  button.addEventListener("click", () => applyPreset(button.dataset.preset));
});

document.getElementById("homeBtn").addEventListener("click", () => switchView("home"));
document.getElementById("backBtn").addEventListener("click", () => history.back());
document.getElementById("appsBtn").addEventListener("click", () => switchView("home"));

updateClock();
setInterval(updateClock, 1000);
setTrack(0);
switchView("home");
updateDspReadout();
