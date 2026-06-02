/**
 * Amigura P3 � Yarn cursor, opt-in micro-sound, idle-safe rAF
 */
(function () {
  "use strict";

  const SOUND_STORAGE_KEY = "amigura-sound";
  const SOUND_CLICK_WAV = "assets/sounds/click.wav";
  const SOUND_CLICK_MP3 = "assets/sounds/click.mp3";
  const SOUND_RUSTLE_WAV = "assets/sounds/rustle.wav";
  const SOUND_RUSTLE_MP3 = "assets/sounds/rustle.mp3";
  const SOUND_VOLUME = 0.05;
  const RUSTLE_VOLUME = 0.04;
  const TRAIL_LENGTH = 12;
  const IDLE_MS = 2500;
  const RUSTLE_DEBOUNCE_MS = 400;

  const mqHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  /** @type {AudioContext | null} */
  let audioCtx = null;
  /** @type {AudioBuffer | null} */
  let clickBuffer = null;
  /** @type {AudioBuffer | null} */
  let rustleBuffer = null;
  let soundEnabled = false;
  let soundAssetsLoading = false;
  let lastRustleAt = 0;
  let delightBound = false;
  let delightInitialized = false;

  /** @type {HTMLCanvasElement | null} */
  let canvas = null;
  /** @type {CanvasRenderingContext2D | null} */
  let ctx = null;
  /** @type {Array<{ x: number, y: number }>} */
  const trail = [];
  let targetX = 0;
  let targetY = 0;
  let posX = 0;
  let posY = 0;
  let isInteractive = false;
  /** @type {number | null} */
  let rafId = null;
  /** @type {ReturnType<typeof setTimeout> | null} */
  let idleTimer = null;
  let pointerInView = false;

  function canUseYarnCursor() {
    return mqHover.matches && !mqReduced.matches;
  }

  function readSoundPreference() {
    return localStorage.getItem(SOUND_STORAGE_KEY) === "on";
  }

  function writeSoundPreference(on) {
    localStorage.setItem(SOUND_STORAGE_KEY, on ? "on" : "off");
  }

  function updateSoundToggleUi() {
    const toggle = document.getElementById("soundToggle");
    if (!toggle) return;
    const t =
      window.Irem && window.Irem.I18n
        ? window.Irem.I18n.t.bind(window.Irem.I18n)
        : function (k) {
            return k;
          };
    toggle.setAttribute("aria-pressed", String(soundEnabled));
    toggle.setAttribute("aria-label", soundEnabled ? t("sound.on") : t("sound.off"));
    toggle.setAttribute("title", soundEnabled ? t("sound.on") : t("sound.off"));
    toggle.classList.toggle("is-sound-on", soundEnabled);
  }

  function ensureAudioContext() {
    if (audioCtx) return audioCtx;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
    return audioCtx;
  }

  /**
   * @param {string} url
   * @returns {Promise<AudioBuffer | null>}
   */
  function loadAudioBuffer(url) {
    const actx = ensureAudioContext();
    if (!actx) return Promise.resolve(null);

    return fetch(url)
      .then(function (res) {
        if (!res.ok) return null;
        return res.arrayBuffer();
      })
      .then(function (buf) {
        if (!buf || !audioCtx) return null;
        return audioCtx.decodeAudioData(buf);
      })
      .catch(function () {
        return null;
      });
  }

  function loadSoundAssets() {
    if (soundAssetsLoading || (clickBuffer && rustleBuffer)) return;
    soundAssetsLoading = true;

    Promise.all([
      loadAudioBuffer(SOUND_CLICK_WAV).then(function (b) {
        return b || loadAudioBuffer(SOUND_CLICK_MP3);
      }),
      loadAudioBuffer(SOUND_RUSTLE_WAV).then(function (b) {
        return b || loadAudioBuffer(SOUND_RUSTLE_MP3);
      }),
    ]).then(function (buffers) {
      if (buffers[0]) clickBuffer = buffers[0];
      if (buffers[1]) rustleBuffer = buffers[1];
      soundAssetsLoading = false;
    });
  }

  /**
   * @param {"click" | "rustle"} type
   */
  function playSound(type) {
    if (!soundEnabled) return;

    const actx = ensureAudioContext();
    if (!actx) return;

    if (actx.state === "suspended") {
      actx.resume();
    }

    const buffer = type === "click" ? clickBuffer : rustleBuffer;
    const volume = type === "click" ? SOUND_VOLUME : RUSTLE_VOLUME;

    if (buffer) {
      const source = actx.createBufferSource();
      const gain = actx.createGain();
      source.buffer = buffer;
      gain.gain.value = volume;
      source.connect(gain);
      gain.connect(actx.destination);
      source.start(0);
      return;
    }

    playSynthSound(type, volume);
  }

  /**
   * @param {"click" | "rustle"} type
   * @param {number} volume
   */
  function playSynthSound(type, volume) {
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    const gain = audioCtx.createGain();
    gain.gain.value = volume;
    gain.connect(audioCtx.destination);

    if (type === "click") {
      const osc = audioCtx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.04);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.07);
      return;
    }

    const bufferSize = audioCtx.sampleRate * 0.06;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const source = audioCtx.createBufferSource();
    source.buffer = noiseBuffer;
    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 520;
    filter.Q.value = 0.6;
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    source.connect(filter);
    filter.connect(gain);
    source.start(now);
    source.stop(now + 0.09);
  }

  function setSoundEnabled(on) {
    soundEnabled = on;
    writeSoundPreference(on);
    updateSoundToggleUi();

    if (on) {
      ensureAudioContext();
      loadSoundAssets();
      if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
      }
    }
  }

  function getAccentColors() {
    const style = getComputedStyle(document.documentElement);
    return {
      bright:
        style.getPropertyValue("--color-accent-bright").trim() || "#c9a227",
      peach: style.getPropertyValue("--color-peach").trim() || "#e8b89a",
    };
  }

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function stopCursorLoop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (idleTimer !== null) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }
  }

  function scheduleIdleStop() {
    if (idleTimer !== null) clearTimeout(idleTimer);
    idleTimer = setTimeout(stopCursorLoop, IDLE_MS);
  }

  function drawCursor() {
    if (!ctx || !canvas || !pointerInView) {
      rafId = null;
      return;
    }

    posX += (targetX - posX) * 0.2;
    posY += (targetY - posY) * 0.2;

    trail.unshift({ x: posX, y: posY });
    if (trail.length > TRAIL_LENGTH) trail.length = TRAIL_LENGTH;

    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);

    const colors = getAccentColors();
    const stroke = isInteractive ? colors.bright : colors.peach;

    if (trail.length > 1) {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 0; i < trail.length - 1; i++) {
        const alpha = (1 - i / trail.length) * 0.55;
        const width = 1.5 + (1 - i / trail.length) * 2.5;
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(trail[i].x, trail[i].y);
        ctx.lineTo(trail[i + 1].x, trail[i + 1].y);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = isInteractive ? 0.95 : 0.8;
    ctx.fillStyle = stroke;
    ctx.shadowBlur = isInteractive ? 14 : 0;
    ctx.shadowColor = colors.bright;
    ctx.beginPath();
    ctx.arc(posX, posY, isInteractive ? 4.5 : 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    rafId = requestAnimationFrame(drawCursor);
    scheduleIdleStop();
  }

  function startCursorLoop() {
    if (rafId !== null) return;
    rafId = requestAnimationFrame(drawCursor);
  }

  function initYarnCursor() {
    if (!canUseYarnCursor() || canvas) return;

    document.documentElement.classList.add("has-yarn-cursor");
    canvas = document.createElement("canvas");
    canvas.className = "yarn-cursor";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    resizeCanvas();
    document.addEventListener(
      "mousemove",
      function (e) {
        targetX = e.clientX;
        targetY = e.clientY;
        pointerInView = true;
        if (!posX && !posY) {
          posX = targetX;
          posY = targetY;
        }
        startCursorLoop();
      },
      { passive: true }
    );

    document.addEventListener(
      "mouseleave",
      function () {
        pointerInView = false;
        isInteractive = false;
        trail.length = 0;
        stopCursorLoop();
        if (ctx) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      },
      { passive: true }
    );

    document.addEventListener(
      "mouseover",
      function (e) {
        const t = e.target;
        if (!(t instanceof Element)) return;
        if (
          t.closest(
            'a, button, .product-card, input, textarea, select, [role="button"], .wizard__figure-card, .wizard__swatch'
          )
        ) {
          isInteractive = true;
        }
      },
      { passive: true }
    );

    document.addEventListener(
      "mouseout",
      function (e) {
        const t = e.target;
        const related = e.relatedTarget;
        if (!(t instanceof Element)) return;
        if (
          !t.closest(
            'a, button, .product-card, input, textarea, select, [role="button"], .wizard__figure-card, .wizard__swatch'
          )
        ) {
          return;
        }
        if (
          related instanceof Element &&
          related.closest(
            'a, button, .product-card, input, textarea, select, [role="button"], .wizard__figure-card, .wizard__swatch'
          )
        ) {
          return;
        }
        isInteractive = false;
      },
      { passive: true }
    );

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopCursorLoop();
        if (ctx) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    });

    window.addEventListener("resize", resizeCanvas, { passive: true });

    function onMotionPreferenceChange() {
      if (mqReduced.matches) destroyYarnCursor();
    }

    function onHoverCapabilityChange() {
      if (!mqHover.matches) destroyYarnCursor();
    }

    if (mqReduced.addEventListener) {
      mqReduced.addEventListener("change", onMotionPreferenceChange);
    }
    if (mqHover.addEventListener) {
      mqHover.addEventListener("change", onHoverCapabilityChange);
    }
  }

  function destroyYarnCursor() {
    stopCursorLoop();
    document.documentElement.classList.remove("has-yarn-cursor");
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
    canvas = null;
    ctx = null;
    trail.length = 0;
  }

  /**
   * @param {Event} e
   */
  function onDelightClick(e) {
    if (!soundEnabled) return;
    const target = /** @type {HTMLElement} */ (e.target);
    if (
      target.closest(
        "button, .hero__cta, .product-card__buy, .wizard__btn--next, .wizard__btn, .newsletter__submit, .modal-panel__cta, .atelier-strip__cta, .cookie-banner__btn"
      )
    ) {
      playSound("click");
    }
  }

  /**
   * @param {MouseEvent} e
   */
  function onDelightMouseOver(e) {
    if (!soundEnabled) return;
    const target = /** @type {HTMLElement} */ (e.target);
    const card = target.closest(".product-card");
    if (!card) return;

    const now = Date.now();
    if (now - lastRustleAt < RUSTLE_DEBOUNCE_MS) return;
    lastRustleAt = now;
    playSound("rustle");
  }

  function bindDelightHandlers() {
    if (delightBound) return;
    delightBound = true;

    document.addEventListener("click", onDelightClick);
    document.addEventListener("mouseover", onDelightMouseOver);

    document.addEventListener("click", function (e) {
      const target = /** @type {HTMLElement} */ (e.target);
      if (!target.closest("#soundToggle")) return;
      setSoundEnabled(!soundEnabled);
      if (soundEnabled) playSound("click");
    });
  }

  function shouldUseYarnCursor() {
    return document.body.dataset.page === "home";
  }

  function initDelight() {
    if (delightInitialized) return;
    delightInitialized = true;

    bindDelightHandlers();
    setSoundEnabled(readSoundPreference());

    if (canUseYarnCursor() && shouldUseYarnCursor()) {
      initYarnCursor();
    }
  }

  function boot() {
    document.addEventListener("amigura:ready", initDelight, { once: true });
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        initDelight();
      },
      { once: true }
    );
  }

  boot();
})();
