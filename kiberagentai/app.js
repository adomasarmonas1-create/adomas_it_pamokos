(() => {
  const DATA = window.KIBERAGENTAI_LEVELS || {};
  const qs = new URLSearchParams(location.search);
  let activeGrade = qs.get("grade") || "4";
  let activeLevel = null;
  let stageIndex = 0;
  let xp = 0;
  let correctCount = 0;
  let locked = false;
  let lives = 3;
  let openedEvidence = 0;

  const catalogView = document.getElementById("catalogView");
  const gameView = document.getElementById("gameView");
  const finishView = document.getElementById("finishView");
  const gradeStrip = document.getElementById("gradeStrip");
  const gradeTitle = document.getElementById("gradeTitle");
  const gradeGoal = document.getElementById("gradeGoal");
  const levelGrid = document.getElementById("levelGrid");
  const statusChip = document.getElementById("statusChip");

  const caseId = document.getElementById("caseId");
  const stageHud = document.getElementById("stageHud");
  const xpHud = document.getElementById("xpHud");
  const progressBar = document.getElementById("progressBar");
  const roomHud = document.getElementById("roomHud");
  const livesHud = document.getElementById("livesHud");
  const sceneViewport = document.getElementById("sceneViewport");
  const evidenceTip = document.getElementById("evidenceTip");
  const missionOverlay = document.getElementById("missionOverlay");
  const missionOverlayButton = document.getElementById("missionOverlayButton");
  const caseKicker = document.getElementById("caseKicker");
  const caseTitle = document.getElementById("caseTitle");
  const caseBrief = document.getElementById("caseBrief");
  const evidenceBoard = document.getElementById("evidenceBoard");
  const taskPrompt = document.getElementById("taskPrompt");
  const choices = document.getElementById("choices");
  const feedback = document.getElementById("feedback");
  const nextBtn = document.getElementById("nextBtn");

  function isMission() {
    return Boolean(activeLevel && activeLevel.mode === "field-mission");
  }

  function updateLives() {
    livesHud.textContent = "SKYDAI " + "♥".repeat(lives) + "♡".repeat(Math.max(0, 3 - lives));
    livesHud.classList.toggle("critical", lives === 1);
  }

  function interlude(title, body, buttonText) {
    document.getElementById("missionOverlayTitle").textContent = title;
    document.getElementById("missionOverlayText").textContent = body;
    missionOverlayButton.textContent = buttonText;
    missionOverlay.classList.remove("hidden");
    missionOverlayButton.focus();
  }

  function closeInterlude() {
    missionOverlay.classList.add("hidden");
    window.scrollTo({top:0,behavior:"smooth"});
  }

  missionOverlayButton.addEventListener("click", closeInterlude);

  function updateEvidenceGate() {
    if (!isMission()) return;
    const total = activeLevel.stages[stageIndex].evidence.length;
    const ready = openedEvidence >= total;
    evidenceTip.textContent = ready
      ? "✓ Įrodymai surinkti. Dabar pasirink ir pagrįsk sprendimą."
      : "ATVERK ĮRODYMUS: " + openedEvidence + " / " + total + " · Spausk ant visų užuominų kortelių.";
    evidenceTip.classList.toggle("ready", ready);
    choices.querySelectorAll(".choice").forEach(button => { button.disabled = !ready; });
  }

  function setUrl(grade, level) {
    const u = new URL(location.href);
    u.searchParams.set("grade", grade);
    if (level) u.searchParams.set("level", level);
    else u.searchParams.delete("level");
    history.replaceState({}, "", u);
  }

  function renderGrades() {
    gradeStrip.innerHTML = "";
    Object.keys(DATA).sort((a,b)=>Number(a)-Number(b)).forEach(grade => {
      const btn = document.createElement("button");
      btn.className = "grade-btn" + (grade === activeGrade ? " active" : "");
      btn.textContent = grade + " klasė";
      btn.onclick = () => {
        activeGrade = grade;
        renderGrades();
        renderCatalog();
        setUrl(activeGrade, null);
      };
      gradeStrip.appendChild(btn);
    });
  }

  function renderCatalog() {
    const g = DATA[activeGrade];
    if (!g) return;
    gradeTitle.textContent = g.title;
    gradeGoal.textContent = g.goal;
    levelGrid.innerHTML = "";
    if (!g.levels.length) {
      levelGrid.innerHTML = '<div class="empty">Šiai klasei lygiai dar ruošiami.</div>';
      return;
    }
    g.levels.forEach((level, idx) => {
      const card = document.createElement("article");
      card.className = "level-card";
      card.innerHTML = `
        <div class="level-number">LYGIS ${idx + 1} · ${level.id}</div>
        <h3>${level.title}</h3>
        <p>${level.subtitle}</p>
        <div class="meta">
          <span>${level.difficulty}</span>
          <span>~${level.minutes} min</span>
          <span>${level.stages.length} etapai</span>
        </div>
        <button class="primary-btn">Atidaryti bylą →</button>
      `;
      card.querySelector("button").onclick = () => startLevel(level.id);
      levelGrid.appendChild(card);
    });
  }

  function findLevel(id) {
    const g = DATA[activeGrade];
    return g && g.levels.find(l => l.id === id);
  }

  function startLevel(id) {
    const level = findLevel(id);
    if (!level) return;
    activeLevel = level;
    stageIndex = 0;
    xp = 0;
    correctCount = 0;
    locked = false;
    lives = isMission() ? (level.lives || 3) : 3;
    catalogView.classList.add("hidden");
    finishView.classList.add("hidden");
    gameView.classList.remove("hidden");
    statusChip.textContent = "BYLA AKTYVI";
    caseId.textContent = activeGrade + " klasė · " + level.id + " · " + level.title;
    setUrl(activeGrade, level.id);
    renderStage();
    if (isMission()) {
      interlude("OPERACIJA: UŽRAKINTA PASKYRA", activeLevel.intro || activeLevel.briefing, "Įeiti į pirmą kambarį →");
    } else {
      window.scrollTo({top:0,behavior:"smooth"});
    }
  }

  function renderStage() {
    locked = false;
    const stage = activeLevel.stages[stageIndex];
    stageHud.textContent = (stageIndex + 1) + " / " + activeLevel.stages.length;
    xpHud.textContent = "XP " + xp;
    progressBar.style.width = (stageIndex / activeLevel.stages.length * 100) + "%";
    caseKicker.textContent = stage.kicker;
    caseTitle.textContent = stage.title;
    caseBrief.textContent = stage.brief;
    openedEvidence = 0;
    roomHud.classList.toggle("hidden", !isMission());
    livesHud.classList.toggle("hidden", !isMission());
    sceneViewport.classList.toggle("hidden", !isMission());
    evidenceTip.classList.toggle("hidden", !isMission());
    if (isMission()) {
      const room = activeLevel.rooms[(stage.room || 1) - 1];
      const roomNumber = stage.room || 1;
      roomHud.textContent = "KAMBARYS " + roomNumber + " / " + activeLevel.rooms.length;
      document.getElementById("sceneSignal").textContent = "● RYŠYS AKTYVUS";
      document.getElementById("sceneSector").textContent = "SEKTORIUS 0" + roomNumber;
      document.getElementById("sceneSymbol").textContent = room.symbol || "▣";
      document.getElementById("sceneRoomName").textContent = room.name;
      document.getElementById("sceneRoomCaption").textContent = room.caption;
      sceneViewport.dataset.room = String(roomNumber);
      updateLives();
    }

    evidenceBoard.innerHTML = "";
    stage.evidence.forEach(item => {
      const el = document.createElement(isMission() ? "button" : "article");
      el.className = "evidence" + (isMission() ? " evidence-flip" : "");
      if (isMission()) {
        el.type = "button";
        el.setAttribute("aria-expanded", "false");
        const type = document.createElement("div");
        type.className = "type";
        type.textContent = item.type;
        const title = document.createElement("strong");
        title.textContent = item.title;
        const detail = document.createElement("p");
        detail.textContent = "▧ SPAUSK – PERŽIŪRĖTI UŽUOMINĄ";
        el.append(type, title, detail);
        el.addEventListener("click", () => {
          if (el.classList.contains("revealed")) return;
          el.classList.add("revealed");
          el.setAttribute("aria-expanded", "true");
          detail.textContent = item.text;
          openedEvidence += 1;
          updateEvidenceGate();
        });
      } else {
        el.innerHTML = `<div class="type">${item.type}</div><strong>${item.title}</strong><p>${item.text}</p>`;
      }
      evidenceBoard.appendChild(el);
    });

    taskPrompt.textContent = stage.prompt;
    choices.innerHTML = "";
    feedback.className = "feedback hidden";
    feedback.textContent = "";
    nextBtn.classList.add("hidden");

    stage.choices.forEach((choice, idx) => {
      const btn = document.createElement("button");
      btn.className = "choice";
      btn.textContent = String.fromCharCode(65 + idx) + ". " + choice.text;
      btn.onclick = () => answer(choice, btn);
      choices.appendChild(btn);
    });
    updateEvidenceGate();
  }

  function answer(choice, btn) {
    if (locked || (isMission() && openedEvidence < activeLevel.stages[stageIndex].evidence.length)) return;
    locked = true;
    const all = [...choices.querySelectorAll(".choice")];
    const stage = activeLevel.stages[stageIndex];
    all.forEach((b, idx) => {
      if (stage.choices[idx].correct) b.classList.add("correct");
      else if (b !== btn) b.classList.add("dim");
      b.disabled = true;
    });

    if (choice.correct) {
      xp += 100;
      correctCount++;
      btn.classList.add("correct");
      feedback.className = "feedback good";
      feedback.innerHTML = "<strong>✓ Sprendimas pagrįstas.</strong><br>" + choice.feedback;
    } else {
      if (isMission()) {
        lives = Math.max(0, lives - 1);
        updateLives();
      }
      btn.classList.add("wrong");
      feedback.className = "feedback bad";
      feedback.innerHTML = "<strong>× Patikrink savo sprendimą.</strong><br>" + choice.feedback
        + (isMission() ? "<br><strong>–1 apsaugos skydas.</strong>" : "");
    }
    if (isMission() && stage.lesson) {
      const note = document.createElement("p");
      note.className = "teaching-note";
      note.textContent = "AGENTŪROS IŠVADA: " + stage.lesson;
      feedback.appendChild(note);
    }
    xpHud.textContent = "XP " + xp;
    nextBtn.textContent = isMission() && lives === 0
      ? "Peržiūrėti misijos rezultatą →"
      : (stageIndex === activeLevel.stages.length - 1 ? "Uždaryti bylą →" : "Kitas įrodymas →");
    nextBtn.classList.remove("hidden");
  }

  function nextStage() {
    if (isMission() && lives === 0) {
      showFinish(true);
      return;
    }
    if (stageIndex < activeLevel.stages.length - 1) {
      const currentRoom = activeLevel.stages[stageIndex].room;
      stageIndex++;
      renderStage();
      const nextRoom = activeLevel.stages[stageIndex].room;
      if (isMission() && currentRoom !== nextRoom) {
        const room = activeLevel.rooms[(nextRoom || 1) - 1];
        interlude("DURYS ATRAKINTOS · KAMBARYS " + nextRoom,
          "Perėjai į sektorių „" + room.name + "“. Naujos užuominos jau laukia. Atidžiai patikrink kiekvieną įrodymą.",
          "Įeiti į kambarį →");
      }
    } else {
      showFinish(false);
    }
  }

  function showFinish(failed = false) {
    progressBar.style.width = "100%";
    gameView.classList.add("hidden");
    finishView.classList.remove("hidden");
    statusChip.textContent = failed ? "REIKIA PASTIPRINIMO" : "BYLA UŽDARYTA";
    const total = activeLevel.stages.length;
    const pct = Math.round(correctCount / total * 100);
    document.getElementById("finishTitle").textContent = failed
      ? "Apsaugos skydai išseko"
      : (activeLevel.title + " – baigta");
    document.getElementById("finishText").textContent = failed
      ? "Agentūros signalas nutrūko. Tu jau gavai naudingų paaiškinimų – grįžk į bylą ir pabandyk dar kartą."
      : (isMission()
        ? activeLevel.outro
        : (pct === 100
          ? "Visuose etapuose iškart pasirinkai geriausiai įrodymais pagrįstą sprendimą."
          : "Bylą užbaigei. Peržiūrėk paaiškinimus ir, jei reikia, pakartok lygį – tikslas ne spėti, o pagrįsti."));
    document.getElementById("scoreCard").textContent = isMission()
      ? `${correctCount} / ${total} teisingų · ${xp} XP · ${lives} skydai liko`
      : `${correctCount} / ${total} pirmu bandymu · ${xp} XP`;
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function goCatalog() {
    missionOverlay.classList.add("hidden");
    activeLevel = null;
    gameView.classList.add("hidden");
    finishView.classList.add("hidden");
    catalogView.classList.remove("hidden");
    statusChip.textContent = "PASIRUOŠĘS";
    setUrl(activeGrade, null);
    renderCatalog();
    window.scrollTo({top:0,behavior:"smooth"});
  }

  document.getElementById("backBtn").onclick = goCatalog;
  document.getElementById("finishBackBtn").onclick = goCatalog;
  document.getElementById("replayBtn").onclick = () => startLevel(activeLevel.id);
  nextBtn.onclick = nextStage;

  renderGrades();
  renderCatalog();

  const directLevel = qs.get("level");
  if (directLevel && findLevel(directLevel)) startLevel(directLevel);
})();