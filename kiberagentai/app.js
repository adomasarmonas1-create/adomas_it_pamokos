(() => {
  const DATA = window.KIBERAGENTAI_LEVELS || {};
  const qs = new URLSearchParams(location.search);
  let activeGrade = qs.get("grade") || "4";
  let activeLevel = null;
  let stageIndex = 0;
  let xp = 0;
  let correctCount = 0;
  let locked = false;

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
  const caseKicker = document.getElementById("caseKicker");
  const caseTitle = document.getElementById("caseTitle");
  const caseBrief = document.getElementById("caseBrief");
  const evidenceBoard = document.getElementById("evidenceBoard");
  const taskPrompt = document.getElementById("taskPrompt");
  const choices = document.getElementById("choices");
  const feedback = document.getElementById("feedback");
  const nextBtn = document.getElementById("nextBtn");

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
    catalogView.classList.add("hidden");
    finishView.classList.add("hidden");
    gameView.classList.remove("hidden");
    statusChip.textContent = "BYLA AKTYVI";
    caseId.textContent = activeGrade + " klasė · " + level.id + " · " + level.title;
    setUrl(activeGrade, level.id);
    renderStage();
    window.scrollTo({top:0,behavior:"smooth"});
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

    evidenceBoard.innerHTML = "";
    stage.evidence.forEach(item => {
      const el = document.createElement("article");
      el.className = "evidence";
      el.innerHTML = `<div class="type">${item.type}</div><strong>${item.title}</strong><p>${item.text}</p>`;
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
  }

  function answer(choice, btn) {
    if (locked) return;
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
      btn.classList.add("wrong");
      feedback.className = "feedback bad";
      feedback.innerHTML = "<strong>× Šita išvada per silpna.</strong><br>" + choice.feedback;
    }
    xpHud.textContent = "XP " + xp;
    nextBtn.textContent = stageIndex === activeLevel.stages.length - 1 ? "Uždaryti bylą →" : "Kitas įrodymas →";
    nextBtn.classList.remove("hidden");
  }

  function nextStage() {
    if (stageIndex < activeLevel.stages.length - 1) {
      stageIndex++;
      renderStage();
    } else {
      showFinish();
    }
  }

  function showFinish() {
    progressBar.style.width = "100%";
    gameView.classList.add("hidden");
    finishView.classList.remove("hidden");
    statusChip.textContent = "BYLA UŽDARYTA";
    const total = activeLevel.stages.length;
    const pct = Math.round(correctCount / total * 100);
    document.getElementById("finishTitle").textContent = activeLevel.title + " – baigta";
    document.getElementById("finishText").textContent =
      pct === 100
        ? "Visuose etapuose iškart pasirinkai geriausiai įrodymais pagrįstą sprendimą."
        : "Bylą užbaigei. Peržiūrėk paaiškinimus ir, jei reikia, pakartok lygį – tikslas ne spėti, o pagrįsti.";
    document.getElementById("scoreCard").textContent = `${correctCount} / ${total} pirmu bandymu · ${xp} XP`;
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function goCatalog() {
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