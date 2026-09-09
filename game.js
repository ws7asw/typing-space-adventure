(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const screens = {
    start: $("screen-start"),
    game: $("screen-game"),
    pause: $("screen-pause"),
    over: $("screen-over"),
    manage: $("screen-manage"),
  };
  const playfield = $("playfield");
  const ship = $("ship");
  const keyboardEl = $("keyboard");
  const shipControls = $("ship-controls");
  const scoreEl = $("score");
  const stageEl = $("stage");
  const comboEl = $("combo");
  const livesEl = $("lives");
  const missileAmmoEl = $("missile-ammo");
  const btnFire = $("btn-fire");

  // ---------- 小朋友檔案（本機分開存，不是共用資料庫） ----------
  const PROFILES_KEY = "typingGameProfiles_v1";
  const LEGACY_CUSTOM_KEY = "typingGameCustom_v1";
  const LEGACY_LB_KEY = "typingGameLeaderboard_v1";

  function emptyCustom() {
    return { g1: [], g2: [], g3: [], g4: [], g5: [], g6: [], custom: [] };
  }
  function uid() {
    return "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }
  function loadProfilesMeta() {
    try {
      const raw = localStorage.getItem(PROFILES_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data && Array.isArray(data.list) && data.list.length) return data;
      }
    } catch (e) {}
    // 遷移舊版（無檔案）資料到「預設」
    const id = uid();
    const meta = { currentId: id, list: [{ id, name: "預設" }] };
    try {
      const oldCustom = localStorage.getItem(LEGACY_CUSTOM_KEY);
      if (oldCustom) localStorage.setItem(customKey(id), oldCustom);
      const oldLb = localStorage.getItem(LEGACY_LB_KEY);
      if (oldLb) localStorage.setItem(lbKey(id), oldLb);
      const oldBest = localStorage.getItem("bestScore");
      if (oldBest) localStorage.setItem(bestKey(id), oldBest);
      const oldName = localStorage.getItem("lastPlayerName");
      if (oldName) localStorage.setItem(nameKey(id), oldName);
    } catch (e) {}
    saveProfilesMeta(meta);
    return meta;
  }
  function saveProfilesMeta(meta) {
    try { localStorage.setItem(PROFILES_KEY, JSON.stringify(meta)); } catch (e) {}
  }
  function customKey(id) { return "typingGameCustom_v1__" + id; }
  function lbKey(id) { return "typingGameLeaderboard_v1__" + id; }
  function bestKey(id) { return "bestScore__" + id; }
  function nameKey(id) { return "lastPlayerName__" + id; }

  let profilesMeta = loadProfilesMeta();
  function currentProfile() {
    return profilesMeta.list.find((p) => p.id === profilesMeta.currentId) || profilesMeta.list[0];
  }
  function currentProfileId() {
    return currentProfile().id;
  }

  function loadCustom() {
    try {
      const raw = localStorage.getItem(customKey(currentProfileId()));
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return emptyCustom();
  }
  function saveCustom(data) {
    try { localStorage.setItem(customKey(currentProfileId()), JSON.stringify(data)); } catch (e) {}
  }
  let customData = loadCustom();

  function switchProfile(id) {
    if (!profilesMeta.list.some((p) => p.id === id)) return;
    profilesMeta.currentId = id;
    saveProfilesMeta(profilesMeta);
    customData = loadCustom();
    refreshProfileUI();
    refreshGradeDesc();
  }
  function addProfile(name) {
    const n = String(name || "").trim().slice(0, 12);
    if (!n) { alert("請輸入小朋友的名字"); return; }
    if (profilesMeta.list.some((p) => p.name === n)) {
      alert("已經有這個名字了，請換一個");
      return;
    }
    const id = uid();
    profilesMeta.list.push({ id, name: n });
    profilesMeta.currentId = id;
    saveProfilesMeta(profilesMeta);
    customData = emptyCustom();
    saveCustom(customData);
    refreshProfileUI();
    refreshGradeDesc();
  }
  function deleteProfile(id) {
    if (profilesMeta.list.length <= 1) {
      alert("至少要保留一個檔案");
      return;
    }
    const p = profilesMeta.list.find((x) => x.id === id);
    if (!p || !confirm(`確定刪除「${p.name}」的檔案？自訂單字與排行榜會一起刪除。`)) return;
    try {
      localStorage.removeItem(customKey(id));
      localStorage.removeItem(lbKey(id));
      localStorage.removeItem(bestKey(id));
      localStorage.removeItem(nameKey(id));
    } catch (e) {}
    profilesMeta.list = profilesMeta.list.filter((x) => x.id !== id);
    if (profilesMeta.currentId === id) profilesMeta.currentId = profilesMeta.list[0].id;
    saveProfilesMeta(profilesMeta);
    customData = loadCustom();
    refreshProfileUI();
    refreshGradeDesc();
  }
  function refreshProfileUI() {
    const group = $("profile-group");
    if (!group) return;
    const cur = currentProfile();
    group.innerHTML = "";
    profilesMeta.list.forEach((p) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip" + (p.id === cur.id ? " active" : "");
      btn.textContent = p.name;
      btn.dataset.profile = p.id;
      btn.addEventListener("click", () => switchProfile(p.id));
      btn.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        deleteProfile(p.id);
      });
      // 長按刪除（觸控）
      let holdTimer = null;
      btn.addEventListener("pointerdown", () => {
        holdTimer = setTimeout(() => deleteProfile(p.id), 700);
      });
      btn.addEventListener("pointerup", () => clearTimeout(holdTimer));
      btn.addEventListener("pointerleave", () => clearTimeout(holdTimer));
      btn.addEventListener("pointercancel", () => clearTimeout(holdTimer));
      group.appendChild(btn);
    });
    const desc = $("profile-desc");
    if (desc) {
      desc.textContent = `目前：${cur.name}。不同手機本來就分開；同一台也可建多個檔案。長按名字可刪除。`;
    }
    const manageTitle = $("manage-profile-label");
    if (manageTitle) manageTitle.textContent = `目前檔案：${cur.name}`;
  }

  // 字母練習：a–z 單一字母，提示鍵盤排位與指法
  const LETTER_HINTS = {
    q: "上排 · 左小指", w: "上排 · 左無名指", e: "上排 · 左中指",
    r: "上排 · 左食指", t: "上排 · 左食指",
    y: "上排 · 右食指", u: "上排 · 右食指", i: "上排 · 右中指",
    o: "上排 · 右無名指", p: "上排 · 右小指",
    a: "中排 · 左小指", s: "中排 · 左無名指", d: "中排 · 左中指",
    f: "中排 · 左食指", g: "中排 · 左食指",
    h: "中排 · 右食指", j: "中排 · 右食指", k: "中排 · 右中指",
    l: "中排 · 右無名指",
    z: "下排 · 左小指", x: "下排 · 左無名指", c: "下排 · 左中指",
    v: "下排 · 左食指", b: "下排 · 左食指",
    n: "下排 · 右食指", m: "下排 · 右食指",
  };
  function letterPool() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ch) => ({
      en: ch,
      zh: LETTER_HINTS[ch] + " · " + ch.toUpperCase(),
    }));
  }
  function isLetterMode() {
    return state.source === "letters";
  }

  // 取得某來源的完整單字池（內建 + 自訂）
  function getPool(source) {
    let pool = [];
    if (source === "letters") {
      return letterPool();
    }
    if (source === "all") {
      pool = flattenAll();
      Object.keys(customData).forEach((k) => { pool = pool.concat(customData[k] || []); });
    } else if (source === "custom") {
      pool = (customData.custom || []).slice();
    } else {
      pool = flattenGrade(source).concat(customData[source] || []);
    }
    // 去重（以英文為鍵，保留第一個）
    const seen = new Set();
    return pool.filter((w) => {
      const key = (w.en || "").toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // ---------- 遊戲狀態 ----------
  const state = {
    running: false, paused: false,
    source: "g1", level: 3, hint: true, speedUp: true,
    score: 0, stage: 1, lives: 3, combo: 0, maxCombo: 0,
    wordsCleared: 0, keysTyped: 0, keysCorrect: 0,
    words: [], active: null, pool: [],
    missiles: [],
    shipX: 50,
    fireCooldown: 0,
    missilesLeft: 3,
    spawnTimer: 0, spawnInterval: 2400, fallSpeed: 30,
    baseFallSpeed: 30, baseSpawnInterval: 2400,
    lastSpeedStage: 0,
    lastTime: 0, rafId: null, lastResult: null,
  };
  const SHIP_SPEED = 70; // % / 秒（自動追蹤）
  const FIRE_COOLDOWN = 0.28;
  const MISSILE_MAX = 3;

  // 緊急飛彈：固定威力，每局限 3 發（不升級）
  function missilePower() {
    return {
      tier: 1, speed: 520, hitW: 10, pierce: 1, splash: 0,
      count: 1, emoji: "🔥", label: "緊急飛彈", color: "#ff9f1c",
    };
  }

  /** 依分數計算目標速度（分數越高越快，平滑上限） */
  function speedFromScore(score, baseFall, baseSpawn) {
    const s = Math.max(0, score);
    // 約每 100 分明顯加快，最高約 2.3 倍
    const mult = 1 + Math.min(Math.sqrt(s / 100) * 0.35, 1.3);
    return {
      fallSpeed: Math.min(135, baseFall * mult),
      spawnInterval: Math.max(520, Math.round(baseSpawn / mult)),
      mult,
      speedStage: Math.floor(s / 100),
    };
  }

  function applyScoreSpeed(smooth) {
    if (!state.baseFallSpeed) return;
    // 關閉加速：維持難度起始速度
    if (!state.speedUp) {
      state.fallSpeed = state.baseFallSpeed;
      state.spawnInterval = state.baseSpawnInterval;
      return;
    }
    const target = speedFromScore(state.score, state.baseFallSpeed, state.baseSpawnInterval);
    if (smooth) {
      const t = 0.12;
      state.fallSpeed += (target.fallSpeed - state.fallSpeed) * t;
      state.spawnInterval += (target.spawnInterval - state.spawnInterval) * t;
    } else {
      state.fallSpeed = target.fallSpeed;
      state.spawnInterval = target.spawnInterval;
    }
    if (target.speedStage > state.lastSpeedStage) {
      state.lastSpeedStage = target.speedStage;
      state.stage = target.speedStage + 1;
      if (target.speedStage > 0) {
        sfx.stage();
        showBanner(`分數 ${state.score}！速度提升 🚀`);
      }
    }
  }

  /** 難度 1–10 → 速度、句子比例 */
  function difficultyParams(level) {
    const lv = Math.max(1, Math.min(10, level | 0));
    const t = (lv - 1) / 9;
    // 句子機率：Lv1–2 幾乎只有單字；越高句子越多、越長
    let sentenceChance = 0;
    if (lv >= 3) sentenceChance = 0.12 + (lv - 3) * 0.08; // ~0.12 → ~0.68
    return {
      level: lv,
      spawnInterval: Math.round(2900 - t * 1900), // 2900 → 1000
      fallSpeed: 20 + t * 48,                     // 20 → 68
      sentenceChance: Math.min(0.72, sentenceChance),
      label: "Lv." + lv,
      desc: diffDesc(lv, sentenceChance),
    };
  }
  function diffDesc(lv, chance) {
    if (lv <= 2) return "單字為主，掉落很慢，適合練習";
    if (lv <= 4) return "單字為主，開始出現短句，速度適中";
    if (lv <= 6) return "單字＋中短句混合，速度加快";
    if (lv <= 8) return "較多中長句，掉落快，挑戰手速";
    return "長句為主、掉落很快，高手挑戰！句子約 " + Math.round(Math.min(0.72, chance) * 100) + "%";
  }

  // （舊的答對升級飛彈已移除；改為每局固定 3 發緊急飛彈）

  // ---------- 音效 ----------
  let audioCtx = null;
  function beep(freq, dur = 0.08, type = "sine", vol = 0.15) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = type; o.frequency.value = freq; g.gain.value = vol;
      o.connect(g); g.connect(audioCtx.destination);
      const now = audioCtx.currentTime;
      o.start(now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      o.stop(now + dur);
    } catch (e) {}
  }
  const sfx = {
    key: () => beep(660, 0.05, "square", 0.08),
    wrong: () => beep(140, 0.15, "sawtooth", 0.12),
    clear: () => { beep(880, 0.09, "triangle", 0.14); setTimeout(() => beep(1320, 0.12, "triangle", 0.12), 70); },
    hurt: () => { beep(200, 0.2, "sawtooth", 0.2); setTimeout(() => beep(120, 0.25, "sawtooth", 0.18), 100); },
    stage: () => { beep(523, 0.1, "sine", 0.14); setTimeout(() => beep(784, 0.14, "sine", 0.14), 110); },
    fire: (tier) => {
      const f = [520, 640, 780, 920][tier - 1] || 520;
      beep(f, 0.07, "square", 0.1);
      if (tier >= 3) setTimeout(() => beep(f * 1.4, 0.1, "sawtooth", 0.08), 40);
    },
    hit: () => beep(440, 0.06, "triangle", 0.1),
  };

  function show(name) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
  }

  // ---------- 開始畫面選項 ----------
  function gradeInfo(source) {
    if (source === "letters") {
      return { label: "字母練習", desc: "單一字母 a–z，提示上／中／下排與左右指法" };
    }
    if (source === "all") return { label: "全部混合", desc: "一到六年級＋自訂單字全部一起挑戰！" };
    if (source === "custom") return { label: "自訂單字", desc: "你自己建立的單字（在「管理單字表」新增）。" };
    const set = GRADE_SETS[source];
    return set ? { label: set.label, desc: set.desc } : { label: "", desc: "" };
  }
  function refreshGradeDesc() {
    const info = gradeInfo(state.source);
    const count = getPool(state.source).length;
    if (state.source === "letters") {
      $("grade-desc").textContent = `${info.desc}（共 ${count} 個字母）`;
      return;
    }
    const sent = typeof SENTENCE_BANK !== "undefined" ? SENTENCE_BANK.length : 0;
    $("grade-desc").textContent = `${info.desc}（單字 ${count}／句子庫 ${sent}）`;
  }

  function refreshDiffUI() {
    const p = difficultyParams(state.level);
    $("diff-label").textContent = p.label;
    $("diff-desc").textContent = p.desc;
    $("difficulty-slider").value = String(p.level);
  }

  $("grade-group").addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    document.querySelectorAll("#grade-group .chip").forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    state.source = btn.dataset.grade;
    refreshGradeDesc();
  });
  $("difficulty-slider").addEventListener("input", () => {
    state.level = parseInt($("difficulty-slider").value, 10);
    refreshDiffUI();
  });
  $("hint-group").addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    document.querySelectorAll("#hint-group .chip").forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    state.hint = btn.dataset.hint === "on";
  });
  $("speedup-group").addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    document.querySelectorAll("#speedup-group .chip").forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    state.speedUp = btn.dataset.speedup === "on";
  });

  // ---------- 按鈕 ----------
  $("btn-start").addEventListener("click", startGame);
  $("btn-manage").addEventListener("click", openManage);
  $("btn-manage-back").addEventListener("click", () => { refreshGradeDesc(); show("start"); });
  $("btn-pause").addEventListener("click", pauseGame);
  $("btn-resume").addEventListener("click", resumeGame);
  $("btn-quit").addEventListener("click", quitToMenu);
  $("btn-again").addEventListener("click", startGame);
  $("btn-menu").addEventListener("click", quitToMenu);
  $("btn-add-profile").addEventListener("click", () => {
    const input = $("profile-name-input");
    addProfile(input.value);
    input.value = "";
  });
  $("profile-name-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      $("btn-add-profile").click();
    }
  });

  // ---------- 虛擬鍵盤 ----------
  const keyElements = {};
  (function buildKeyboard() {
    const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
    rows.forEach((row) => {
      const rowEl = document.createElement("div");
      rowEl.className = "krow";
      row.split("").forEach((ch) => {
        const k = document.createElement("div");
        k.className = "key";
        k.textContent = ch;
        k.addEventListener("pointerdown", (e) => {
          e.preventDefault();
          handleInput(ch);
          k.classList.add("press");
          setTimeout(() => k.classList.remove("press"), 90);
        });
        keyElements[ch] = k;
        rowEl.appendChild(k);
      });
      keyboardEl.appendChild(rowEl);
    });
    // 空白鍵（打句子用）
    const spaceRow = document.createElement("div");
    spaceRow.className = "krow";
    const spaceKey = document.createElement("div");
    spaceKey.className = "key space";
    spaceKey.textContent = "空白 space";
    spaceKey.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      onSpacePress();
      spaceKey.classList.add("press");
      setTimeout(() => spaceKey.classList.remove("press"), 90);
    });
    keyElements[" "] = spaceKey;
    spaceRow.appendChild(spaceKey);
    keyboardEl.appendChild(spaceRow);
  })();
  const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;

  // ================= 遊戲流程 =================
  function startGame() {
    const pool = getPool(state.source);
    if (pool.length === 0) {
      alert("這個單字表是空的！請先到「管理單字表」新增單字，或選其他年級。");
      return;
    }
    if (!audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }

    const sp = difficultyParams(state.level);
    Object.assign(state, {
      running: true, paused: false, score: 0, stage: 1, lives: 3,
      combo: 0, maxCombo: 0, wordsCleared: 0, keysTyped: 0, keysCorrect: 0,
      words: [], active: null, pool, missiles: [],
      shipX: 50, fireCooldown: 0, missilesLeft: MISSILE_MAX,
      spawnTimer: 0,
      spawnInterval: sp.spawnInterval,
      fallSpeed: sp.fallSpeed,
      baseFallSpeed: sp.fallSpeed,
      baseSpawnInterval: sp.spawnInterval,
      lastSpeedStage: 0,
      lastTime: 0,
    });
    document.querySelectorAll(".word, .particle, .floaty, .missile, .missile-beam").forEach((el) => el.remove());
    placeShip();
    updateHUD();
    updateMissileUI();
    show("game");
    shipControls.classList.add("show");
    // 字母練習／有句子／觸控時顯示鍵盤，方便對照位置
    if (isLetterMode() || isTouch || state.level >= 3) keyboardEl.classList.add("show");
    else keyboardEl.classList.remove("show");
    state.lastTime = performance.now();
    spawnWord();
    highlightNextKey();
    state.rafId = requestAnimationFrame(loop);
  }

  function pauseGame() {
    if (!state.running || state.paused) return;
    state.paused = true;
    cancelAnimationFrame(state.rafId);
    screens.pause.classList.add("active");
  }
  function resumeGame() {
    if (!state.paused) return;
    state.paused = false;
    screens.pause.classList.remove("active");
    state.lastTime = performance.now();
    state.rafId = requestAnimationFrame(loop);
  }
  function quitToMenu() {
    state.running = false; state.paused = false;
    cancelAnimationFrame(state.rafId);
    screens.pause.classList.remove("active");
    keyboardEl.classList.remove("show");
    shipControls.classList.remove("show");
    refreshGradeDesc();
    show("start");
  }

  function placeShip() {
    ship.style.left = state.shipX + "%";
  }

  function updateMissileUI() {
    const n = Math.max(0, state.missilesLeft | 0);
    missileAmmoEl.textContent = n > 0 ? "🔥".repeat(n) : "—";
    if (btnFire) {
      btnFire.disabled = n <= 0;
      btnFire.textContent = n > 0 ? `🔥 緊急飛彈 ×${n}` : "飛彈用完了";
      btnFire.classList.toggle("empty", n <= 0);
    }
  }

  /** 發射飛彈；homePos = {x,y} 時為導向（打字消除用，純特效，不耗彈） */
  function fireMissile(opts) {
    opts = opts || {};
    if (!state.running || state.paused) return;
    if (!opts.cosmetic && state.fireCooldown > 0) return;

    // 真發射：每局限 3 發
    if (!opts.cosmetic) {
      if (state.missilesLeft <= 0) {
        sfx.wrong();
        showBanner("飛彈用完了！只能靠打字 💪");
        updateMissileUI();
        return;
      }
      state.missilesLeft--;
      updateMissileUI();
    }

    const power = missilePower();
    const pfH = playfield.clientHeight;
    const startY = pfH - 52;
    const startXpct = state.shipX;

    const el = document.createElement("div");
    el.className = "missile tier1";
    el.textContent = power.emoji;
    el.style.left = startXpct + "%";
    el.style.top = startY + "px";
    el.style.color = power.color;
    playfield.appendChild(el);

    state.missiles.push({
      el, beam: null,
      x: startXpct,
      y: startY,
      vx: 0,
      speed: power.speed * (opts.cosmetic ? 1.35 : 1),
      hitW: power.hitW,
      pierce: 1,
      splash: 0,
      tier: 1,
      color: power.color,
      hitIds: new Set(),
      home: opts.homePos || null,
      cosmetic: !!opts.cosmetic,
    });

    if (!opts.cosmetic) {
      state.fireCooldown = FIRE_COOLDOWN;
      if (state.missilesLeft === 0) {
        showBanner("飛彈用完了！危急時才用喔");
      }
    }
    sfx.fire(1);
  }

  function destroyMissile(m) {
    if (m.el) m.el.remove();
    if (m.beam) m.beam.remove();
    state.missiles = state.missiles.filter((x) => x !== m);
  }

  function missileHitWord(m, w) {
    if (w.cleared || m.hitIds.has(w)) return;
    m.hitIds.add(w);
    sfx.hit();

    const victims = [w];
    if (m.splash > 0) {
      state.words.forEach((other) => {
        if (other === w || other.cleared) return;
        if (Math.abs(other.x - w.x) <= m.splash && Math.abs(other.y - w.y) <= m.splash * 5) {
          victims.push(other);
        }
      });
    }

    victims.forEach((v) => {
      if (!v.cleared) clearWord(v, { fromMissile: true });
    });

    m.pierce -= 1;
    if (m.pierce <= 0) destroyMissile(m);
  }

  function updateMissiles(dt) {
    const pfW = Math.max(playfield.clientWidth, 1);
    for (let i = state.missiles.length - 1; i >= 0; i--) {
      const m = state.missiles[i];
      if (!m) continue;

      if (m.home) {
        const tx = m.home.x;
        const ty = m.home.y + 12;
        const dxPx = ((tx - m.x) / 100) * pfW;
        const dyPx = ty - m.y;
        const dist = Math.hypot(dxPx, dyPx) || 1;
        const step = m.speed * dt;
        m.x += (dxPx / dist) * step / pfW * 100;
        m.y += (dyPx / dist) * step;
        if (dist < 28) {
          // 特效飛彈抵達目標後消失
          destroyMissile(m);
          continue;
        }
      } else {
        m.x += m.vx * dt * 8;
        m.y -= m.speed * dt;
      }

      m.x = Math.max(2, Math.min(98, m.x));
      m.el.style.left = m.x + "%";
      m.el.style.top = m.y + "px";
      if (m.beam) {
        m.beam.style.left = m.x + "%";
        const h = Math.max(16, playfield.clientHeight - m.y - 40);
        m.beam.style.height = h + "px";
      }

      if (m.y < -50) { destroyMissile(m); continue; }
      if (m.cosmetic) continue;

      for (let j = 0; j < state.words.length; j++) {
        const w = state.words[j];
        if (w.cleared || m.hitIds.has(w)) continue;
        if (Math.abs(w.x - m.x) <= m.hitW && Math.abs((w.y + 16) - m.y) <= 30) {
          missileHitWord(m, w);
          if (!state.missiles.includes(m)) break;
        }
      }
    }
  }

  function spawnWord() {
    const diff = difficultyParams(state.level);
    let data = null;
    let isSentence = false;

    // 字母練習：只掉單一字母，不出句子
    if (!isLetterMode() &&
        Math.random() < diff.sentenceChance &&
        typeof getSentencesForDifficulty === "function") {
      const list = getSentencesForDifficulty(state.level);
      if (list.length) {
        data = list[Math.floor(Math.random() * list.length)];
        isSentence = true;
      }
    }
    if (!data) {
      data = state.pool[Math.floor(Math.random() * state.pool.length)];
    }

    const raw = String(data.en);
    const text = raw.toLowerCase();
    const el = document.createElement("div");
    el.className = "word" + (isSentence ? " sentence" : "") + (isLetterMode() ? " letter-drill" : "");
    const display = isLetterMode() ? raw.toUpperCase() : raw;
    const enHtml = `<span class="en">${display.split("").map((c) => {
      if (c === " ") return `<span class="sp"> </span>`;
      return `<span>${escapeHtml(c)}</span>`;
    }).join("")}</span>`;
    const zhHtml = state.hint ? `<span class="zh">${escapeHtml(data.zh || "")}</span>` : "";
    el.innerHTML = enHtml + zhHtml;

    // 長句靠中間一點，避免貼邊裁切
    const margin = isSentence ? 18 : 12;
    const xPercent = margin + Math.random() * (100 - margin * 2);
    el.style.left = xPercent + "%";
    el.style.top = "-40px";
    playfield.appendChild(el);
    state.words.push({
      el, text, typed: 0, y: -40, x: xPercent,
      letters: el.querySelectorAll(".en span"),
      cleared: false,
      isSentence,
    });
  }

  /** 空白鍵：下一個要打空格 → 打字；否則發射 */
  function onSpacePress() {
    if (!state.running || state.paused) return;
    const needsSpace = state.active && !state.active.cleared &&
      state.active.text[state.active.typed] === " ";
    if (needsSpace) {
      handleInput(" ");
      return;
    }
    // 也可鎖定以空白開頭的目標（幾乎不會）
    if (!state.active) {
      let candidate = null;
      state.words.forEach((w) => {
        if (!w.cleared && w.text[0] === " " && (!candidate || w.y > candidate.y)) candidate = w;
      });
      if (candidate) { handleInput(" "); return; }
    }
    fireMissile();
  }

  function handleInput(ch) {
    if (!state.running || state.paused) return;
    if (ch !== " ") ch = ch.toLowerCase();
    state.keysTyped++;
    if (!state.active) {
      let candidate = null;
      state.words.forEach((w) => {
        if (!w.cleared && w.text[0] === ch && (!candidate || w.y > candidate.y)) candidate = w;
      });
      if (candidate) { state.active = candidate; candidate.el.classList.add("locked"); }
      else { wrongKey(); return; }
    }
    const w = state.active;
    if (w.text[w.typed] === ch) {
      state.keysCorrect++;
      w.letters[w.typed].classList.add("done");
      w.typed++;
      updateCursor(w);
      sfx.key();
      highlightNextKey();
      if (w.typed >= w.text.length) clearWord(w);
    } else {
      wrongKey();
    }
  }
  function wrongKey() {
    state.combo = 0;
    updateHUD();
    sfx.wrong();
  }
  function updateCursor(w) { w.letters.forEach((l, i) => l.classList.toggle("cur", i === w.typed)); }

  function clearWord(w, opts) {
    opts = opts || {};
    if (w.cleared) return;
    const homePos = { x: w.x, y: w.y };
    w.cleared = true;
    if (state.active === w) state.active = null;
    state.wordsCleared++;
    state.combo++;
    state.maxCombo = Math.max(state.maxCombo, state.combo);
    const points = (10 + w.text.length) * Math.max(1, state.combo);
    state.score += points;
    sfx.clear();
    explode(w);
    showFloaty(w.x, w.y, "+" + points);
    w.el.classList.add("pop");
    setTimeout(() => w.el.remove(), 300);
    state.words = state.words.filter((x) => x !== w);

    // 打字消除：發射導向飛彈特效；飛彈擊殺則不再多發
    if (!opts.fromMissile) {
      fireMissile({ cosmetic: true, homePos });
    }

    applyScoreSpeed(false);
    updateHUD();
    highlightNextKey();
  }

  function hurt(w) {
    state.lives--; state.combo = 0;
    if (state.active === w) state.active = null;
    w.el.remove();
    state.words = state.words.filter((x) => x !== w);
    ship.classList.add("hit");
    setTimeout(() => ship.classList.remove("hit"), 400);
    sfx.hurt();
    updateHUD();
    highlightNextKey();
    if (state.lives <= 0) gameOver();
  }

  function updateHUD() {
    scoreEl.textContent = state.score;
    stageEl.textContent = state.stage;
    comboEl.textContent = "x" + Math.max(1, state.combo);
    livesEl.textContent = state.lives > 0 ? "❤️".repeat(state.lives) : "💔";
  }

  function highlightNextKey() {
    Object.values(keyElements).forEach((k) => k.classList.remove("next"));
    let ch = null;
    if (state.active) ch = state.active.text[state.active.typed];
    else {
      let lowest = null;
      state.words.forEach((w) => { if (!w.cleared && (!lowest || w.y > lowest.y)) lowest = w; });
      if (lowest) ch = lowest.text[0];
    }
    if (ch == null) return;
    const key = ch === " " ? keyElements[" "] : keyElements[ch];
    if (key) key.classList.add("next");
  }

  /** 追蹤目標：鎖定中優先，否則最靠近底部（最緊急）的單字／句子 */
  function getTrackTarget() {
    if (state.active && !state.active.cleared) return state.active;
    let best = null;
    state.words.forEach((w) => {
      if (w.cleared) return;
      if (!best) { best = w; return; }
      // 優先 y 較大（較靠近地面），其次距離船較近
      if (w.y > best.y + 8) best = w;
      else if (Math.abs(w.y - best.y) <= 8 &&
        Math.abs(w.x - state.shipX) < Math.abs(best.x - state.shipX)) best = w;
    });
    return best;
  }

  function explode(w) {
    const rect = w.el.getBoundingClientRect();
    const pfRect = playfield.getBoundingClientRect();
    const cx = rect.left - pfRect.left + rect.width / 2;
    const cy = rect.top - pfRect.top + rect.height / 2;
    const colors = ["#ffd166", "#6c8cff", "#4ade80", "#ff8fab", "#fff"];
    for (let i = 0; i < 14; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = cx + "px"; p.style.top = cy + "px";
      p.style.background = colors[i % colors.length];
      playfield.appendChild(p);
      const angle = (Math.PI * 2 * i) / 14;
      const dist = 40 + Math.random() * 50;
      p.animate(
        [{ transform: "translate(0,0) scale(1)", opacity: 1 },
         { transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`, opacity: 0 }],
        { duration: 500 + Math.random() * 200, easing: "ease-out" }
      );
      setTimeout(() => p.remove(), 720);
    }
  }
  function showFloaty(xPercent, y, text) {
    const el = document.createElement("div");
    el.className = "floaty";
    el.textContent = text;
    el.style.left = xPercent + "%"; el.style.top = y + "px";
    el.style.transform = "translateX(-50%)";
    playfield.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }
  function showBanner(text) {
    const el = document.createElement("div");
    el.className = "floaty";
    el.textContent = text;
    el.style.left = "50%"; el.style.top = "40%";
    el.style.fontSize = "26px"; el.style.color = "#4ade80";
    el.style.transform = "translateX(-50%)";
    playfield.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }

  function loop(now) {
    if (!state.running || state.paused) return;
    const dt = Math.min(0.05, (now - state.lastTime) / 1000);
    state.lastTime = now;

    // 自動移向最近／鎖定中的目標
    const track = getTrackTarget();
    if (track) {
      const dx = track.x - state.shipX;
      if (Math.abs(dx) > 0.4) {
        const maxStep = SHIP_SPEED * dt;
        state.shipX = Math.max(6, Math.min(94, state.shipX + Math.sign(dx) * Math.min(Math.abs(dx), maxStep)));
        placeShip();
      }
    }
    if (state.fireCooldown > 0) state.fireCooldown -= dt;

    // 分數越高，速度平滑加快
    applyScoreSpeed(true);

    state.spawnTimer += dt * 1000;
    if (state.spawnTimer >= state.spawnInterval) {
      state.spawnTimer = 0; spawnWord(); highlightNextKey();
    }

    updateMissiles(dt);

    const bottom = playfield.clientHeight - 60;
    for (let i = state.words.length - 1; i >= 0; i--) {
      const w = state.words[i];
      if (w.cleared) continue;
      w.y += state.fallSpeed * dt;
      w.el.style.top = w.y + "px";
      if (w.y >= bottom) hurt(w);
    }
    state.rafId = requestAnimationFrame(loop);
  }

  function gameOver() {
    state.running = false;
    cancelAnimationFrame(state.rafId);
    keyboardEl.classList.remove("show");
    shipControls.classList.remove("show");
    document.querySelectorAll(".missile, .missile-beam").forEach((el) => el.remove());
    state.missiles = [];

    const acc = state.keysTyped > 0 ? Math.round((state.keysCorrect / state.keysTyped) * 100) : 100;
    const pid = currentProfileId();
    const best = Math.max(state.score, parseInt(localStorage.getItem(bestKey(pid)) || "0", 10));
    localStorage.setItem(bestKey(pid), best);

    state.lastResult = {
      score: state.score,
      words: state.wordsCleared,
      combo: state.maxCombo,
      acc,
      grade: state.source,
      saved: false,
    };

    $("final-score").textContent = state.score;
    $("final-words").textContent = state.wordsCleared;
    $("final-combo").textContent = state.maxCombo;
    $("final-acc").textContent = acc + "%";
    $("best-score").textContent = best;

    const nameEntry = $("name-entry");
    nameEntry.classList.remove("saved");
    $("save-status").textContent = state.score > 0
      ? "輸入名字後按「登錄成績」，即可進入 Top 10！"
      : "這次沒有分數，再玩一次挑戰排行榜吧！";
    $("btn-save-score").disabled = state.score <= 0;
    const nameInput = $("player-name");
    const lastName = localStorage.getItem(nameKey(currentProfileId())) || currentProfile().name || "";
    nameInput.value = lastName;
    nameInput.readOnly = false;

    renderLeaderboard();
    show("over");
    setTimeout(() => { try { nameInput.focus(); nameInput.select(); } catch (e) {} }, 80);
  }

  // ---------- 排行榜（依目前小朋友檔案分開） ----------
  const LB_MAX = 10;

  function loadLeaderboard() {
    try {
      const raw = localStorage.getItem(lbKey(currentProfileId()));
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) return arr;
      }
    } catch (e) {}
    return [];
  }

  function saveLeaderboard(list) {
    try { localStorage.setItem(lbKey(currentProfileId()), JSON.stringify(list.slice(0, LB_MAX))); } catch (e) {}
  }

  function gradeLabel(id) {
    if (id === "letters") return "字母";
    if (id === "all") return "全部";
    if (id === "custom") return "自訂";
    return (GRADE_SETS[id] && GRADE_SETS[id].label) || id;
  }

  function renderLeaderboard(highlightId) {
    const list = loadLeaderboard();
    const el = $("leaderboard-list");
    el.innerHTML = "";
    if (!list.length) {
      el.innerHTML = '<li class="lb-empty">還沒有紀錄，成為第一名吧！</li>';
      return;
    }
    list.forEach((row, i) => {
      const li = document.createElement("li");
      li.className = "lb-item" +
        (i === 0 ? " top1" : i === 1 ? " top2" : i === 2 ? " top3" : "") +
        (highlightId && row.id === highlightId ? " mine" : "");
      const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : String(i + 1);
      const dateStr = row.date ? formatDate(row.date) : "";
      li.innerHTML =
        `<span class="lb-rank">${medal}</span>` +
        `<span class="lb-name">${escapeHtml(row.name)}` +
        `<span class="lb-meta">${escapeHtml(gradeLabel(row.grade))} · 連擊×${row.combo || 0}${dateStr ? " · " + dateStr : ""}</span></span>` +
        `<span class="lb-score">${row.score}</span>`;
      el.appendChild(li);
    });
  }

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      const m = d.getMonth() + 1;
      const day = d.getDate();
      return m + "/" + day;
    } catch (e) { return ""; }
  }

  function submitScore() {
    const status = $("save-status");
    if (!state.lastResult || state.lastResult.saved) {
      status.textContent = "這次成績已經登錄過了。";
      return;
    }
    if (state.lastResult.score <= 0) {
      status.textContent = "分數為 0，無法登錄。";
      return;
    }
    let name = ($("player-name").value || "").trim();
    name = name.replace(/\s+/g, " ").slice(0, 12);
    if (!name) {
      status.textContent = "請先輸入姓名。";
      $("player-name").focus();
      return;
    }

    const entry = {
      id: "lb_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7),
      name,
      score: state.lastResult.score,
      words: state.lastResult.words,
      combo: state.lastResult.combo,
      acc: state.lastResult.acc,
      grade: state.lastResult.grade,
      date: new Date().toISOString(),
    };

    const list = loadLeaderboard();
    list.push(entry);
    list.sort((a, b) => b.score - a.score || (b.combo || 0) - (a.combo || 0) || (a.date > b.date ? 1 : -1));
    const trimmed = list.slice(0, LB_MAX);
    saveLeaderboard(trimmed);
    localStorage.setItem(nameKey(currentProfileId()), name);

    state.lastResult.saved = true;
    $("name-entry").classList.add("saved");
    $("player-name").readOnly = true;
    $("btn-save-score").disabled = true;

    const rank = trimmed.findIndex((r) => r.id === entry.id) + 1;
    if (rank > 0) {
      status.textContent = `已登錄！你是第 ${rank} 名 🏆`;
    } else {
      status.textContent = "已記錄，但未進入前 10 名，再挑戰一次！";
    }
    renderLeaderboard(entry.id);
  }

  $("btn-save-score").addEventListener("click", submitScore);
  $("player-name").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitScore();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.running) {
      if (state.paused) resumeGame(); else pauseGame();
      return;
    }
    if (!state.running || state.paused) return;

    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    if (e.key === " " || e.code === "Space") {
      e.preventDefault();
      onSpacePress();
      return;
    }
    if (/^[a-zA-Z]$/.test(e.key)) {
      handleInput(e.key);
      const k = keyElements[e.key.toLowerCase()];
      if (k) { k.classList.add("press"); setTimeout(() => k.classList.remove("press"), 90); }
    }
  });

  $("btn-fire").addEventListener("pointerdown", (e) => {
    e.preventDefault();
    fireMissile();
  });

  document.addEventListener("gesturestart", (e) => e.preventDefault());

  // ================= 單字表管理 =================
  const GRADE_OPTIONS = [
    { id: "g1", label: "一年級" }, { id: "g2", label: "二年級" },
    { id: "g3", label: "三年級" }, { id: "g4", label: "四年級" },
    { id: "g5", label: "五年級" }, { id: "g6", label: "六年級" },
    { id: "custom", label: "自訂單字" },
  ];
  let manageTarget = "g1";

  function openManage() {
    const sel = $("manage-grade");
    if (!sel.options.length) {
      GRADE_OPTIONS.forEach((o) => {
        const opt = document.createElement("option");
        opt.value = o.id; opt.textContent = o.label;
        sel.appendChild(opt);
      });
      sel.addEventListener("change", () => { manageTarget = sel.value; renderWordList(); });
    }
    manageTarget = (state.source === "all" || state.source === "letters") ? "g1" : state.source;
    sel.value = manageTarget;
    refreshProfileUI();
    renderWordList();
    show("manage");
  }

  function builtinFor(target) {
    return target === "custom" ? [] : flattenGrade(target);
  }

  function renderWordList() {
    const info = $("manage-info");
    const builtin = builtinFor(manageTarget);
    const custom = customData[manageTarget] || [];
    info.textContent = `內建 ${builtin.length} 字，自訂 ${custom.length} 字。內建字為唯讀，自訂字可刪除。`;

    const list = $("word-list");
    list.innerHTML = "";

    if (manageTarget !== "custom" && GRADE_SETS[manageTarget]) {
      GRADE_SETS[manageTarget].themes.forEach((theme) => {
        const h = document.createElement("div");
        h.className = "wl-theme";
        h.textContent = theme.name;
        list.appendChild(h);
        theme.words.forEach((w) => list.appendChild(rowEl(w, false)));
      });
    }
    if (custom.length) {
      const h = document.createElement("div");
      h.className = "wl-theme";
      h.textContent = "⭐ 自訂單字 Custom";
      list.appendChild(h);
      custom.forEach((w, idx) => list.appendChild(rowEl(w, true, idx)));
    }
    if (!list.children.length) {
      const empty = document.createElement("div");
      empty.className = "wl-empty";
      empty.textContent = "還沒有單字，從上方新增或批次匯入吧！";
      list.appendChild(empty);
    }
  }

  function rowEl(w, deletable, idx) {
    const row = document.createElement("div");
    row.className = "wl-item";
    row.innerHTML =
      `<span class="wl-en">${escapeHtml(w.en)}</span>` +
      `<span class="wl-zh">${escapeHtml(w.zh || "—")}</span>` +
      (deletable ? `<span class="wl-tag">自訂</span>` : "");
    if (deletable) {
      const del = document.createElement("button");
      del.className = "wl-del";
      del.textContent = "🗑";
      del.title = "刪除";
      del.addEventListener("click", () => {
        customData[manageTarget].splice(idx, 1);
        saveCustom(customData);
        renderWordList();
      });
      row.appendChild(del);
    }
    return row;
  }

  function addCustomWord(en, zh) {
    en = (en || "").trim();
    zh = (zh || "").trim();
    if (!en) return false;
    if (!customData[manageTarget]) customData[manageTarget] = [];
    const exists = customData[manageTarget].some((w) => w.en.toLowerCase() === en.toLowerCase());
    if (exists) return false;
    customData[manageTarget].push({ en, zh });
    return true;
  }

  // 新增單字
  $("btn-add").addEventListener("click", async () => {
    const enEl = $("add-en"), zhEl = $("add-zh"), status = $("add-status");
    let en = enEl.value.trim();
    let zh = zhEl.value.trim();
    if (!en) { status.textContent = "請先輸入英文單字。"; return; }
    if (!zh) {
      status.textContent = "翻譯中…";
      zh = await translate(en);
    }
    if (addCustomWord(en, zh)) {
      status.textContent = `已新增：${en} — ${zh || "（無中文）"}`;
      enEl.value = ""; zhEl.value = "";
      saveCustom(customData);
      renderWordList();
    } else {
      status.textContent = "這個單字已存在（或英文為空）。";
    }
  });

  // 自動翻譯按鈕
  $("btn-translate").addEventListener("click", async () => {
    const enEl = $("add-en"), zhEl = $("add-zh"), status = $("add-status");
    const en = enEl.value.trim();
    if (!en) { status.textContent = "請先輸入英文單字。"; return; }
    status.textContent = "翻譯中…";
    const zh = await translate(en);
    if (zh) { zhEl.value = zh; status.textContent = `翻譯結果：${zh}`; }
    else status.textContent = "翻譯失敗，請手動輸入中文（可能是離線或連線受限）。";
  });

  // 批次匯入
  $("btn-bulk").addEventListener("click", async () => {
    const text = $("bulk-text").value.trim();
    const auto = $("bulk-auto").checked;
    const status = $("bulk-status");
    if (!text) { status.textContent = "請先貼上單字。"; return; }

    let items = [];
    if (text.startsWith("[") || text.startsWith("{")) {
      try {
        const json = JSON.parse(text);
        const arr = Array.isArray(json) ? json : [json];
        items = arr.map((o) => ({ en: (o.en || "").trim(), zh: (o.zh || "").trim() }));
      } catch (e) { status.textContent = "JSON 格式錯誤。"; return; }
    } else {
      items = text.split(/\r?\n/).map((line) => {
        const parts = line.split(/[,，=\t]|\s{2,}/).map((s) => s.trim()).filter(Boolean);
        return { en: parts[0] || "", zh: parts[1] || "" };
      }).filter((it) => it.en);
    }

    let added = 0, translated = 0;
    for (const it of items) {
      if (!it.zh && auto) {
        status.textContent = `翻譯中… ${it.en}`;
        const t = await translate(it.en);
        if (t) { it.zh = t; translated++; }
      }
      if (addCustomWord(it.en, it.zh)) added++;
    }
    saveCustom(customData);
    renderWordList();
    status.textContent = `完成！新增 ${added} 個單字${auto ? `，自動翻譯 ${translated} 個` : ""}。`;
    $("bulk-text").value = "";
  });

  // 匯出
  $("btn-export").addEventListener("click", () => {
    const custom = customData[manageTarget] || [];
    const builtin = builtinFor(manageTarget);
    const data = builtin.concat(custom);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wordlist_${manageTarget}.json`;
    a.click();
    URL.revokeObjectURL(url);
    $("bulk-status").textContent = `已匯出 ${data.length} 個單字。`;
  });

  // ---------- 自動翻譯（免費 MyMemory API，支援 CORS） ----------
  async function translate(en) {
    try {
      const url = "https://api.mymemory.translated.net/get?q=" +
        encodeURIComponent(en) + "&langpair=en|zh-TW";
      const res = await fetch(url);
      const data = await res.json();
      let zh = (data && data.responseData && data.responseData.translatedText) || "";
      zh = zh.trim();
      // 若回傳結果與原文相同或含英文字母過多，視為失敗
      if (!zh || zh.toLowerCase() === en.toLowerCase()) return "";
      return zh;
    } catch (e) {
      return "";
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // 初始化
  refreshProfileUI();
  refreshGradeDesc();
  refreshDiffUI();
})();
