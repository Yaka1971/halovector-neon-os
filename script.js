console.log("HALOVECTOR Neon OS Initialized");

/* HALOVECTOR FLASH INTRO WITH POWER BUTTON */
window.addEventListener("load", () => {
  const introVoice = document.getElementById("introVoice");

  const intro = document.createElement("div");
  intro.className = "halo-intro";

  intro.innerHTML = `
    <div class="halo-intro-content">
      <h1 class="halo-intro-title">HALOVECTOR</h1>
      <p class="halo-intro-subtitle">SYSTEMS STANDBY</p>
      <button class="halo-power-btn" id="haloPowerBtn">POWER ON</button>
      <div class="halo-intro-line"></div>
    </div>
  `;

  document.body.appendChild(intro);

  const powerBtn = document.getElementById("haloPowerBtn");

  if(powerBtn){
    powerBtn.addEventListener("click", () => {
      const subtitle = intro.querySelector(".halo-intro-subtitle");

      if(subtitle){
        subtitle.textContent = "SYSTEMS INITIATED";
      }

      powerBtn.textContent = "INITIALIZING...";
      powerBtn.classList.add("halo-power-active");

      if(introVoice){
        introVoice.volume = 1;
        introVoice.currentTime = 0;
        introVoice.play();
      }

      setTimeout(() => {
        intro.classList.add("halo-intro-exit");
      }, 2800);

      setTimeout(() => {
        intro.remove();
        startAuthenticationSequence();
      }, 3700);
    });
  }
});

/* CURSOR GLOW */
document.addEventListener("mousemove", (e) => {
  const glow = document.querySelector(".cursor-glow");

  if(glow){
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  }
});

/* SYNTH COMPUTER SOUNDS */
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

    activate(){}
  };
})();

/* AI AUTHENTICATION SYSTEM */
function startAuthenticationSequence(){
  const authOverlay = document.createElement("div");
  authOverlay.className = "auth-overlay";

  authOverlay.innerHTML = `
    <div class="auth-box">
      <h2 class="auth-title">AI AUTHENTICATION</h2>
      <p class="auth-status">VERIFYING USER ACCESS</p>

      <div class="auth-progress-wrap">
        <div class="auth-progress"></div>
      </div>

      <div class="auth-percent">0%</div>

      <div class="auth-lines">
        <p><span>[SCAN]</span> Initializing neural scan...</p>
        <p><span>[AI]</span> Verifying cinematic interface permissions...</p>
        <p><span>[CORE]</span> Linking reactor synchronization...</p>
        <p><span>[SECURITY]</span> Establishing encrypted access...</p>
      </div>

      <div class="auth-granted">ACCESS GRANTED</div>
    </div>
  `;

  document.body.appendChild(authOverlay);

  setTimeout(() => {
    authOverlay.classList.add("auth-overlay-active");
  }, 20);

  const progressBar = authOverlay.querySelector(".auth-progress");
  const percentText = authOverlay.querySelector(".auth-percent");
  const granted = authOverlay.querySelector(".auth-granted");

  let progress = 0;

  const authInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 4;

    if(progress > 100){
      progress = 100;
    }

    progressBar.style.width = progress + "%";
    percentText.textContent = progress + "%";

    if(progress >= 100){
      clearInterval(authInterval);
      granted.classList.add("auth-granted-active");
      AudioSystem.transition();

      setTimeout(() => {
        authOverlay.style.opacity = "0";

        setTimeout(() => {
          authOverlay.remove();
        }, 900);
      }, 1600);
    }
  }, 180);
}

/* BUTTON + LINK SOUNDS */
const interactiveItems = document.querySelectorAll(
  "button, nav a, .os-module, .floating-card, .terminal-frame, .command-module"
);

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

/* LIVE AI TERMINAL ENGINE */
const terminalMessages = [
  "BOOTING HALOVECTOR AI CORE...",
  "SYNCING NEURAL VISUAL ENGINE...",
  "CALIBRATING HOLOGRAPHIC OVERLAYS...",
  "STREAMING CYBERNETIC TELEMETRY...",
  "SCANNING REACTOR ENERGY OUTPUT...",
  "COMMAND CENTER INTERFACE ONLINE."
];

const terminalLogMessages = [
  "[AI] Live neural pathway stabilized.",
  "[CORE] Reactor pulse synchronized.",
  "[SCAN] Neon grid frequency calibrated.",
  "[HUD] Holographic overlays rendering.",
  "[DATA] Telemetry stream refreshed.",
  "[SECURITY] Interface shield active.",
  "[VISUAL] Cinematic motion field online.",
  "[STATUS] HALOVECTOR system integrity confirmed."
];

const typingText = document.getElementById("typingText");
const terminalLogs = document.querySelector(".terminal-logs");

let terminalMessageIndex = 0;
let terminalLetterIndex = 0;
let terminalActivated = false;

function typeTerminalMessage(){
  if(!typingText) return;

  const currentMessage = terminalMessages[terminalMessageIndex];

  if(terminalLetterIndex < currentMessage.length){
    typingText.textContent += currentMessage.charAt(terminalLetterIndex);
    terminalLetterIndex++;
    setTimeout(typeTerminalMessage, 55);
  } else {
    setTimeout(() => {
      typingText.textContent = "";
      terminalLetterIndex = 0;
      terminalMessageIndex = (terminalMessageIndex + 1) % terminalMessages.length;
      typeTerminalMessage();
    }, 1700);
  }
}

function streamTerminalLog(){
  if(!terminalLogs) return;

  const newLog = document.createElement("p");
  const randomLog = terminalLogMessages[Math.floor(Math.random() * terminalLogMessages.length)];

  const splitPoint = randomLog.indexOf("]");
  const logTag = randomLog.slice(0, splitPoint + 1);
  const logMessage = randomLog.slice(splitPoint + 1);

  newLog.innerHTML = `<span>${logTag}</span>${logMessage}`;
  terminalLogs.appendChild(newLog);

  if(terminalLogs.children.length > 8){
    terminalLogs.removeChild(terminalLogs.children[0]);
  }
}

function activateTerminal(){
  if(terminalActivated) return;

  terminalActivated = true;

  const terminal = document.querySelector(".ai-terminal-section");

  if(terminal){
    terminal.classList.add("terminal-active");
  }

  typeTerminalMessage();

  setInterval(() => {
    streamTerminalLog();
  }, 2200);
}

/* VISUAL IMMERSION MODE */
function openVisualImmersionMode(){
  const overlay = document.createElement("div");
  overlay.className = "visual-mode-overlay";

  overlay.innerHTML = `
    <button class="visual-close-btn" aria-label="Close visual mode">×</button>

    <div class="visual-mode-grid"></div>
    <div class="visual-mode-scan"></div>

    <div class="visual-mode-core">
      <div class="visual-ring visual-ring-one"></div>
      <div class="visual-ring visual-ring-two"></div>
      <div class="visual-ring visual-ring-three"></div>
      <div class="visual-orb"></div>
    </div>

    <div class="visual-mode-content">
      <p>HALOVECTOR VISUAL IMMERSION MODE</p>
      <h2>HOLOGRAPHIC VISUAL ENGINE</h2>
      <span>RENDERING CINEMATIC NEON FIELD...</span>
    </div>

    <div class="visual-hud visual-hud-one">GRID SYNC: 99%</div>
    <div class="visual-hud visual-hud-two">LIGHT FIELD: ACTIVE</div>
    <div class="visual-hud visual-hud-three">DEPTH SCAN: ONLINE</div>
    <div class="visual-hud visual-hud-four">VISUAL CORE: STABLE</div>
  `;

  document.body.appendChild(overlay);
  document.body.classList.add("visual-mode-open");

  AudioSystem.transition();
  createSystemFlash();

  setTimeout(() => {
    overlay.classList.add("visual-mode-active");
  }, 20);

  const closeBtn = overlay.querySelector(".visual-close-btn");

  function closeVisualMode(){
    overlay.classList.remove("visual-mode-active");
    overlay.style.opacity = "0";
    document.body.classList.remove("visual-mode-open");

    setTimeout(() => {
      overlay.remove();
    }, 700);
  }

  closeBtn.addEventListener("click", closeVisualMode);

  overlay.addEventListener("click", (e) => {
    if(e.target === overlay){
      closeVisualMode();
    }
  });

  document.addEventListener("keydown", function escClose(e){
    if(e.key === "Escape"){
      closeVisualMode();
      document.removeEventListener("keydown", escClose);
    }
  });
}

const exploreVisualsButton = document.querySelector(".secondary-btn");

if(exploreVisualsButton){
  exploreVisualsButton.addEventListener("click", () => {
    openVisualImmersionMode();
  });
}

/* COMMAND CENTER INTERACTION */
function openCommandModule(module){
  const moduleTitle = module.querySelector("h3")?.textContent || "SYSTEM MODULE";
  const moduleLabel = module.querySelector(".module-top p")?.textContent || "HALOVECTOR";

  const overlay = document.createElement("div");
  overlay.className = "command-access-overlay";

  overlay.innerHTML = `
    <div class="command-access-box">
      <p class="command-access-kicker">${moduleLabel}</p>
      <h2>ACCESSING MODULE</h2>
      <h3>${moduleTitle}</h3>

      <div class="command-access-bar">
        <div class="command-access-fill"></div>
      </div>

      <p class="command-access-status">LINKING TO HALOVECTOR CORE...</p>
    </div>
  `;

  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.classList.add("command-access-active");
  }, 20);

  const fill = overlay.querySelector(".command-access-fill");
  const status = overlay.querySelector(".command-access-status");

  let progress = 0;

  const statuses = [
    "LINKING TO HALOVECTOR CORE...",
    "SYNCING MODULE DATA...",
    "VERIFYING COMMAND PATHWAY...",
    "STREAMING LIVE TELEMETRY...",
    "MODULE ACCESS GRANTED."
  ];

  const interval = setInterval(() => {
    progress += 20;

    fill.style.width = progress + "%";

    const statusIndex = Math.min(Math.floor(progress / 25), statuses.length - 1);
    status.textContent = statuses[statusIndex];

    if(progress >= 100){
      clearInterval(interval);
      AudioSystem.transition();

      setTimeout(() => {
        overlay.style.opacity = "0";

        setTimeout(() => {
          overlay.remove();
        }, 650);
      }, 900);
    }
  }, 260);
}

document.querySelectorAll(".command-module").forEach((module) => {
  module.addEventListener("click", () => {
    module.classList.add("command-module-active");
    openCommandModule(module);

    setTimeout(() => {
      module.classList.remove("command-module-active");
    }, 1200);
  });
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
      const terminal = document.querySelector("#terminal");

      if(terminal){
        terminal.scrollIntoView({
          behavior:"smooth",
          block:"center"
        });
      }
    }, 650);

    setTimeout(() => {
      activateDashboard();
      activateTerminal();
      document.body.classList.remove("system-entering");
      document.body.classList.add("system-entered");
    }, 1400);

    setTimeout(() => {
      activateReactor();
    }, 2200);
  });
}

/* START TERMINAL WHEN VISIBLE */
const terminalSection = document.querySelector(".ai-terminal-section");

if(terminalSection){
  const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        activateTerminal();
        terminalObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.35
  });

  terminalObserver.observe(terminalSection);
}

/* SCROLL REVEAL ACTIVATION */
const revealItems = document.querySelectorAll(
  ".system-panel, .os-module, .floating-card, .ai-terminal-section, .terminal-frame, .command-center-section, .command-module, .reactor-section, .contact-panel"
);

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
  const cards = document.querySelectorAll(
    ".floating-card, .os-module, .hud-chip, .terminal-frame, .command-module"
  );

  if(cards.length){
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    randomCard.classList.add("micro-flash");

    setTimeout(() => {
      randomCard.classList.remove("micro-flash");
    }, 250);
  }
}, 2800);
/* =========================
   AI ORB ASSISTANT ENGINE
========================= */

const aiOrbButton = document.getElementById("aiOrbButton");
const aiOrbHud = document.getElementById("aiOrbHud");
const aiOrbAssistant = document.getElementById("aiOrbAssistant");
const aiDiagnosticText = document.getElementById("aiDiagnosticText");

const diagnostics = [
  "Scanning visual systems...",
  "Neural matrix stable...",
  "Ambient intelligence online...",
  "Quantum telemetry synced...",
  "Tracking interface activity...",
  "Holographic systems active...",
  "Reactor synchronization stable..."
];

let diagnosticIndex = 0;

/* ROTATING DIAGNOSTICS */

if(aiDiagnosticText){

  setInterval(() => {

    aiDiagnosticText.style.opacity = "0";

    setTimeout(() => {

      diagnosticIndex++;
      
      if(diagnosticIndex >= diagnostics.length){
        diagnosticIndex = 0;
      }

      aiDiagnosticText.textContent = diagnostics[diagnosticIndex];

      aiDiagnosticText.style.opacity = "1";

    }, 250);

  }, 2600);

}

/* ORB TOGGLE */

if(aiOrbButton && aiOrbHud){

  aiOrbButton.addEventListener("click", () => {

    aiOrbHud.classList.toggle("orb-hud-open");

    AudioSystem.click();

  });

}

/* ORB CURSOR FOLLOW - STRONGER MAGNETIC MOTION */

document.addEventListener("mousemove", (e) => {

  if(!aiOrbAssistant) return;

  const moveX =
    (e.clientX - window.innerWidth / 2) * 0.035;

  const moveY =
    (e.clientY - window.innerHeight / 2) * 0.035;

  aiOrbAssistant.style.transform =
    `translate(${moveX}px, ${moveY}px)`;

});

/* ORB REACTION */

if(aiOrbButton){

  aiOrbButton.addEventListener("mouseenter", () => {

    aiOrbButton.style.transform = "scale(1.08)";
    AudioSystem.hover();

  });

  aiOrbButton.addEventListener("mouseleave", () => {

    aiOrbButton.style.transform = "scale(1)";

  });

}
/* =========================
   AI ORB CURSOR FOLLOW FIX
========================= */

window.addEventListener("load", () => {
  const orbAssistant = document.getElementById("aiOrbAssistant");

  if(!orbAssistant){
    console.log("AI Orb Assistant not found");
    return;
  }

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener("mousemove", (e) => {
    targetX = (e.clientX - window.innerWidth / 2) * 0.06;
    targetY = (e.clientY - window.innerHeight / 2) * 0.06;
  });

  function animateOrb(){
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    orbAssistant.style.transform =
      `translate3d(${currentX}px, ${currentY}px, 0)`;

    requestAnimationFrame(animateOrb);
  }

  animateOrb();
});
