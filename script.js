console.log("HALOVECTOR Neon OS Initialized");

/* CURSOR GLOW */
document.addEventListener("mousemove", (e) => {
  const glow = document.querySelector(".cursor-glow");

  if(glow){
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  }
});

/* SYNTH COMPUTER SOUNDS - FOR CLICK / HOVER ONLY */
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

    gain.gain.setValueAtTime(volume * 0.45, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  }

  return {
    click(){
      tone(620, 0.05, "triangle", 0.02);
      setTimeout(() => tone(920, 0.05, "sine", 0.015), 45);
    },

    hover(){
      tone(520, 0.035, "sine", 0.01);
    },

    transition(){
      tone(420, 0.06, "sine", 0.012);
      setTimeout(() => tone(760, 0.08, "triangle", 0.014), 80);
      setTimeout(() => tone(1040, 0.1, "sine", 0.012), 180);
    },

    activate(){
      /* Silent to prevent unwanted clunk sounds */
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

/* BOOT SEQUENCE - VISUAL ONLY */
window.addEventListener("load", () => {
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
  }, 2600);

  setTimeout(() => {
    bootScreen.remove();
  }, 3400);
});

/* ENTER SYSTEM CINEMATIC REACTOR ACTIVATION */
const enterButton = document.querySelector(".primary-btn");
const startupSound = document.getElementById("startupSound");

function createSystemFlash(){
  const flash = document.createElement("div");
  flash.className = "system-flash";
  document.body.appendChild(flash);

  setTimeout(() => {
    flash.classList.add("system-flash-active");
  }, 20);

  setTimeout(() => {
    flash.remove();
  }, 1200);
}

function createZoomOverlay(){
  const overlay = document.createElement("div");
  overlay.className = "reactor-zoom-overlay";
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.classList.add("reactor-zoom-active");
  }, 20);

  setTimeout(() => {
    overlay.remove();
  }, 1600);
}

function activateDashboard(){
  const panel = document.querySelector(".system-panel");
  const modules = document.querySelectorAll(".os-module");

  if(panel){
    panel.classList.add("dashboard-powered");
  }

  modules.forEach((module, index) => {
    setTimeout(() => {
      module.classList.add("module-powered");
    }, index * 180);
  });
}

function activateReactor(){
  const reactorSection = document.querySelector(".reactor-section");
  const reactorCore = document.querySelector(".reactor-core");
  const reactorOrb = document.querySelector(".reactor-orb");
  const reactorRings = document.querySelectorAll(".reactor-ring");
  const hudChips = document.querySelectorAll(".hud-chip");

  if(reactorSection){
    reactorSection.classList.add("reactor-section-active");
  }

  if(reactorCore){
    reactorCore.classList.add("reactor-core-active");
  }

  if(reactorOrb){
    reactorOrb.classList.add("reactor-orb-active");
  }

  reactorRings.forEach((ring, index) => {
    setTimeout(() => {
      ring.classList.add("reactor-ring-active");
    }, index * 160);
  });

  hudChips.forEach((chip, index) => {
    setTimeout(() => {
      chip.classList.add("hud-chip-active");
    }, 500 + index * 180);
  });
}

if(enterButton){
  enterButton.addEventListener("click", () => {
    if(startupSound){
      startupSound.volume = 0.4;
      startupSound.currentTime = 0;
      startupSound.play();
    }

    AudioSystem.transition();
    createSystemFlash();
    createZoomOverlay();

    document.body.classList.add("system-entering");

    setTimeout(() => {
      const reactor = document.querySelector("#visuals");

      if(reactor){
        reactor.scrollIntoView({
          behavior:"smooth",
          block:"center"
        });
      }
    }, 650);

    setTimeout(() => {
      activateDashboard();
      activateReactor();
      document.body.classList.remove("system-entering");
      document.body.classList.add("system-entered");
    }, 1400);
  });
}

/* SCROLL REVEAL ACTIVATION */
const revealItems = document.querySelectorAll(".system-panel, .os-module, .floating-card, .reactor-section, .contact-panel");

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
  const cards = document.querySelectorAll(".floating-card, .os-module, .hud-chip");

  if(cards.length){
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    randomCard.classList.add("micro-flash");

    setTimeout(() => {
      randomCard.classList.remove("micro-flash");
    }, 250);
  }
}, 2800);
