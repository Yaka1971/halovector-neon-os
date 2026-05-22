console.log("HALOVECTOR Neon OS Initialized");

/* CURSOR GLOW */
document.addEventListener("mousemove", (e) => {
  const glow = document.querySelector(".cursor-glow");

  if(glow){
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  }
});

/* SYNTH COMPUTER SOUNDS - NO AUDIO FILES NEEDED */
const AudioSystem = (() => {
  let audioCtx;

  function init(){
    if(!audioCtx){
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function tone(freq = 440, duration = 0.08, type = "sine", volume = 0.04){
    init();

    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.value = freq;

    gain.gain.setValueAtTime(volume * 0.6, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  }

  return {
    click(){
      tone(620, 0.05, "triangle", 0.025);
      setTimeout(() => tone(920, 0.05, "sine", 0.02), 45);
    },

    hover(){
      tone(520, 0.035, "sine", 0.012);
    },

    boot(){
      tone(220, 0.22, "sine", 0.012);

      setTimeout(() => {
        tone(330, 0.24, "sine", 0.014);
      }, 180);

      setTimeout(() => {
        tone(440, 0.28, "triangle", 0.016);
      }, 420);

      setTimeout(() => {
        tone(660, 0.35, "sine", 0.014);
      }, 720);
    },

    activate(){
      tone(700, 0.07, "triangle", 0.018);
      setTimeout(() => tone(980, 0.07, "sine", 0.014), 90);
    }
  };
})();

/* BUTTON + LINK SOUNDS */
const interactiveItems = document.querySelectorAll("button, nav a, .os-module, .floating-card");

interactiveItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    AudioSystem.hover();
    item.classList.add("interface-hover");
  });

  item.addEventListener("mouseleave", () => {
    item.classList.remove("interface-hover");
  });

  item.addEventListener("click", () => {
    AudioSystem.click();
    item.classList.add("interface-click");

    setTimeout(() => {
      item.classList.remove("interface-click");
    }, 350);
  });
});

/* BOOT SEQUENCE */
window.addEventListener("load", () => {
  AudioSystem.boot();

  const bootScreen = document.createElement("div");
  bootScreen.className = "boot-screen";

  bootScreen.innerHTML = `
    <div class="boot-box">
      <h2>HALOVECTOR OS</h2>
      <p class="boot-line">INITIALIZING CINEMATIC INTERFACE...</p>
      <p class="boot-line">LOADING VISUAL ENGINE...</p>
      <p class="boot-line">CONNECTING NEURAL LINK...</p>
      <p class="boot-line">SYSTEM ONLINE</p>
      <div class="boot-bar">
        <div class="boot-fill"></div>
      </div>
    </div>
  `;

  document.body.appendChild(bootScreen);

  setTimeout(() => {
    bootScreen.classList.add("boot-exit");
    AudioSystem.activate();
  }, 2600);

  setTimeout(() => {
    bootScreen.remove();
  }, 3400);
});

/* SCROLL REVEAL ACTIVATION */
const revealItems = document.querySelectorAll(".system-panel, .os-module, .floating-card");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add("reveal-active");
      AudioSystem.activate();
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.25
});

revealItems.forEach((item) => {
  item.classList.add("reveal-item");
  revealObserver.observe(item);
});

/* BUTTON RIPPLE FLASH */
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const ripple = document.createElement("span");
    ripple.className = "energy-ripple";

    const rect = button.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

/* RANDOM MICRO FLASHES */
setInterval(() => {
  const cards = document.querySelectorAll(".floating-card, .os-module");

  if(cards.length){
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    randomCard.classList.add("micro-flash");

    setTimeout(() => {
      randomCard.classList.remove("micro-flash");
    }, 250);
  }
}, 2800);
