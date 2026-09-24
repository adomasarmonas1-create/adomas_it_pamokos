(() => {
  const CASE = window.CASE_W04;
  const screens = [...document.querySelectorAll(".screen")];
  const $ = id => document.getElementById(id);

  const state = {
    agent:null,
    roomIndex:0,
    challengeIndex:0,
    hp:3,
    score:0,
    mistakes:0,
    firstTry:0,
    failedCurrent:false,
    enemyHp:5,
    selectedMulti:[],
    selectedOrder:[]
  };

  let audioCtx=null;
  function tone(freq=440,dur=.06,type="square",gain=.035){
    try{
      audioCtx = audioCtx || new (window.AudioContext||window.webkitAudioContext)();
      const o=audioCtx.createOscillator(), g=audioCtx.createGain();
      o.type=type;o.frequency.value=freq;g.gain.value=gain;
      o.connect(g);g.connect(audioCtx.destination);o.start();
      g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+dur);
      o.stop(audioCtx.currentTime+dur);
    }catch(e){}
  }
  function sfx(kind){
    if(kind==="select"){tone(650,.04);setTimeout(()=>tone(820,.04),45)}
    if(kind==="good"){tone(180,.05,"square",.05);setTimeout(()=>tone(360,.07,"square",.04),55)}
    if(kind==="bad"){tone(92,.16,"sawtooth",.06)}
    if(kind==="door"){tone(120,.08,"square",.04);setTimeout(()=>tone(170,.08,"square",.04),90);setTimeout(()=>tone(240,.1,"square",.04),180)}
  }

  function show(id){
    screens.forEach(s=>s.classList.toggle("active",s.id===id));
    window.scrollTo({top:0,behavior:"instant"});
  }

  /* BOOT — click/touch only */
  function startFromBoot(){
    if(!state.agent) renderAgents();
    sfx("door");
    show("screenAgents");
  }
  $("bootContinue").onclick=startFromBoot;
  $("screenBoot").onclick=(ev)=>{
    if(ev.target.closest("button")) return;
    startFromBoot();
  };

  /* PIXEL PORTRAITS */
  const palettes=[
    {skin:["#5a3427","#a86745","#d69b69","#edc293"],hair:"#382420",hair2:"#5b3527",coat:"#435246",shirt:"#d7d0a4",accent:"#6f8e65"},
    {skin:["#5b3226","#aa6949","#dba079","#f1c8a5"],hair:"#241f24",hair2:"#443343",coat:"#323846",shirt:"#d6d1bb",accent:"#7685ba"},
    {skin:["#3b211d","#784534","#ad7458","#d5a07f"],hair:"#15151b",hair2:"#2c2934",coat:"#4a3439",shirt:"#c4c3a4",accent:"#9b6c80"},
    {skin:["#6b3e27","#b87348","#df9d6b","#f1c28e"],hair:"#6b4a23",hair2:"#99713b",coat:"#4d4639",shirt:"#d8d2ae",accent:"#6b87a5"},
    {skin:["#301f1c","#654033","#966752","#c28e72"],hair:"#111418",hair2:"#292d31",coat:"#303b42",shirt:"#c8ccb7",accent:"#6f927d"},
    {skin:["#5d3328","#9e6045","#d18b68","#eab99a"],hair:"#241b19",hair2:"#4c312a",coat:"#503a31",shirt:"#d7ccb2",accent:"#9a835e"}
  ];
  function px(ctx,x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(x,y,w,h)}
  function drawPortrait(canvas,agent){
    const ctx=canvas.getContext("2d");ctx.imageSmoothingEnabled=false;
    const p=palettes[agent.skin%palettes.length];
    ctx.clearRect(0,0,64,80);px(ctx,0,0,64,80,"#343638");
    px(ctx,3,63,58,17,"#17191a");px(ctx,8,54,48,22,p.coat);px(ctx,23,53,18,16,p.shirt);
    px(ctx,26,55,12,11,p.accent);px(ctx,29,55,6,14,"#1b2527");
    // neck
    px(ctx,25,44,14,13,p.skin[2]);px(ctx,27,47,10,9,p.skin[3]);
    // ears
    px(ctx,13,24,6,18,p.skin[1]);px(ctx,45,24,6,18,p.skin[1]);px(ctx,14,28,4,8,p.skin[2]);px(ctx,46,28,4,8,p.skin[2]);
    // face
    px(ctx,18,14,28,35,p.skin[2]);px(ctx,21,18,22,29,p.skin[3]);
    // jaw
    px(ctx,23,46,18,5,p.skin[2]);px(ctx,20,42,24,5,p.skin[3]);
    // hair variants
    if(agent.skin===0){px(ctx,16,9,31,10,p.hair);px(ctx,13,14,10,16,p.hair2);px(ctx,21,7,20,6,p.hair2)}
    if(agent.skin===1){px(ctx,15,8,33,9,p.hair);px(ctx,12,13,8,24,p.hair);px(ctx,43,12,8,24,p.hair);px(ctx,9,23,8,16,p.hair2);px(ctx,47,23,8,16,p.hair2)}
    if(agent.skin===2){px(ctx,14,8,36,11,p.hair);px(ctx,11,13,10,25,p.hair);px(ctx,43,12,10,24,p.hair);px(ctx,16,5,27,7,p.hair2)}
    if(agent.skin===3){px(ctx,16,7,32,11,p.hair2);px(ctx,13,12,10,19,p.hair);px(ctx,39,9,11,12,p.hair);px(ctx,19,5,21,6,p.hair)}
    if(agent.skin===4){px(ctx,14,7,37,12,p.hair);px(ctx,11,13,11,26,p.hair2);px(ctx,44,13,10,24,p.hair2);px(ctx,17,5,29,7,p.hair)}
    if(agent.skin===5){px(ctx,15,8,34,9,p.hair);px(ctx,12,13,9,21,p.hair2);px(ctx,43,13,9,21,p.hair2);px(ctx,18,6,26,6,p.hair2)}
    // brows / eyes
    px(ctx,21,25,8,2,"#3a2822");px(ctx,35,25,8,2,"#3a2822");
    px(ctx,22,28,7,5,"#e8e1c2");px(ctx,35,28,7,5,"#e8e1c2");
    px(ctx,25,29,3,4,"#17191b");px(ctx,36,29,3,4,"#17191b");
    // nose, mouth
    px(ctx,31,31,3,9,p.skin[1]);px(ctx,30,39,6,2,"#704033");px(ctx,26,42,13,2,"#713b3b");
    // unique detail
    if(agent.skin===0){px(ctx,20,27,10,1,"#191919");px(ctx,34,27,10,1,"#191919");px(ctx,30,28,4,1,"#191919")}
    if(agent.skin===1){px(ctx,18,52,28,3,"#22272a")}
    if(agent.skin===2){px(ctx,39,42,4,2,"#7e3d36")}
    if(agent.skin===3){px(ctx,20,16,5,3,p.hair2)}
    if(agent.skin===4){px(ctx,21,27,9,7,"rgba(70,95,95,.55)");px(ctx,34,27,9,7,"rgba(70,95,95,.55)");px(ctx,30,29,4,1,"#5d6f6f")}
    if(agent.skin===5){px(ctx,25,44,14,2,"#582c2b")}
  }

  function renderAgents(){
    const grid=$("agentGrid");grid.innerHTML="";
    CASE.agents.forEach(a=>{
      const card=document.createElement("button");card.className="agent-card";
      card.innerHTML='<canvas width="64" height="80"></canvas><div><b>'+a.name+'</b><small>'+a.desc+'</small><div class="agent-role">'+a.role+'</div></div>';
      drawPortrait(card.querySelector("canvas"),a);
      card.onclick=()=>{
        state.agent=a;sfx("select");
        [...grid.children].forEach(x=>x.classList.remove("selected"));card.classList.add("selected");
        $("agentHint").textContent=a.name+" // "+a.role;
        $("agentContinue").disabled=false;
      };
      grid.appendChild(card);
    });
  }
  $("agentContinue").onclick=()=>{
    if(!state.agent)return;sfx("door");
    drawPortrait($("briefPortrait"),state.agent);$("briefAgentName").textContent=state.agent.name;
    $("briefCopy").textContent=CASE.briefing;show("screenBriefing");
  };

  $("enterCase").onclick=()=>{sfx("door");startCase()};

  function startCase(){
    state.roomIndex=0;state.challengeIndex=0;state.hp=3;state.score=0;state.mistakes=0;state.firstTry=0;state.failedCurrent=false;
    drawPortrait($("hudPortrait"),state.agent);$("hudAgentName").textContent=state.agent.name;
    loadRoom();show("screenGame");
  }

  function room(){return CASE.rooms[state.roomIndex]}
  function challenge(){return room().challenges[state.challengeIndex]}

  function loadRoom(){
    state.challengeIndex=0;state.hp=3;state.enemyHp=room().challenges.length;state.failedCurrent=false;
    $("roomLabel").textContent=room().label;$("roomName").textContent=room().name;
    $("enemyName").textContent=room().enemy;$("enemyTag").textContent=room().enemyTag;
    $("objectiveText").textContent=room().objective;
    updateHud();renderChallenge();
  }

  function updateHud(){
    $("hpHud").textContent="♥".repeat(state.hp)+"·".repeat(3-state.hp);
    $("traceHud").textContent=String(state.score).padStart(3,"0");
    const max=room().challenges.length;
    $("enemyHpBar").style.width=Math.max(0,state.enemyHp/max*100)+"%";
    $("progressText").textContent=(state.challengeIndex+1)+" / "+max;
    $("questionCode").textContent="K"+String(state.challengeIndex+1).padStart(2,"0");
  }

  function evidenceHtml(list){
    if(!list||!list.length)return "";
    return list.map((e,i)=>'<div class="evidence-note"><b>['+(i+1)+']</b> '+e+'</div>').join("");
  }

  function renderChallenge(){
    state.selectedMulti=[];state.selectedOrder=[];
    const q=challenge();state.failedCurrent=false;
    $("promptText").textContent=q.prompt;
    $("evidenceStrip").innerHTML=evidenceHtml(q.evidence || (q.statement?['„'+q.statement+'“']:[]));
    $("feedbackBox").className="feedback hidden";$("feedbackBox").textContent="";
    $("nextQuestion").classList.add("hidden");
    const area=$("answerArea");area.innerHTML="";
    const typeMap={choice:"SPRENDIMAS",classify:"FAKTAS / PRIELAIDA",multi:"ĮRODYMŲ ATRANKA",order:"CHRONOLOGIJA"};
    $("questionType").textContent=typeMap[q.type]||"ANALIZĖ";

    if(q.type==="choice"){
      q.options.forEach((opt,i)=>{
        const b=document.createElement("button");b.className="answer-btn";b.textContent=String.fromCharCode(65+i)+". "+opt;
        b.onclick=()=>grade(i===q.correct,q,b);area.appendChild(b);
      });
    }
    if(q.type==="classify"){
      ["FAKTAS","PRIELAIDA"].forEach(v=>{
        const b=document.createElement("button");b.className="answer-btn";b.textContent="[ "+v+" ]";
        b.onclick=()=>grade(v===q.correct,q,b);area.appendChild(b);
      });
    }
    if(q.type==="multi"){
      const opts=q.options||q.evidence;
      opts.forEach((opt,i)=>{
        const b=document.createElement("button");b.className="select-btn";b.textContent=String.fromCharCode(65+i)+". "+opt;
        b.onclick=()=>{
          const ix=state.selectedMulti.indexOf(i);
          if(ix>=0)state.selectedMulti.splice(ix,1);else if(state.selectedMulti.length<q.correct.length)state.selectedMulti.push(i);
          b.classList.toggle("chosen",state.selectedMulti.includes(i));sfx("select");
        };area.appendChild(b);
      });
      const row=document.createElement("div");row.className="confirm-row";
      const confirm=document.createElement("button");confirm.className="mini-btn";confirm.textContent="PATVIRTINTI ATRANKĄ";
      confirm.onclick=()=>{
        const a=[...state.selectedMulti].sort((x,y)=>x-y),c=[...q.correct].sort((x,y)=>x-y);
        grade(JSON.stringify(a)===JSON.stringify(c),q,confirm);
      };row.appendChild(confirm);area.appendChild(row);
    }
    if(q.type==="order"){
      q.items.forEach((opt,i)=>{
        const b=document.createElement("button");b.className="order-btn";b.dataset.index=i;b.textContent=opt;
        b.onclick=()=>{
          const ix=state.selectedOrder.indexOf(i);
          if(ix>=0)state.selectedOrder.splice(ix,1);
          else if(state.selectedOrder.length<q.correct.length)state.selectedOrder.push(i);
          refreshOrderButtons();sfx("select");
        };area.appendChild(b);
      });
      const row=document.createElement("div");row.className="confirm-row";
      const reset=document.createElement("button");reset.className="mini-btn";reset.textContent="IŠ NAUJO";reset.onclick=()=>{state.selectedOrder=[];refreshOrderButtons()};
      const confirm=document.createElement("button");confirm.className="mini-btn";confirm.textContent="PATVIRTINTI SEKĄ";
      confirm.onclick=()=>grade(JSON.stringify(state.selectedOrder)===JSON.stringify(q.correct),q,confirm);
      row.append(reset,confirm);area.appendChild(row);
    }
    updateHud();
  }

  function refreshOrderButtons(){
    [...$("answerArea").querySelectorAll(".order-btn")].forEach(b=>{
      const i=Number(b.dataset.index),pos=state.selectedOrder.indexOf(i);
      b.classList.toggle("chosen",pos>=0);
      const clean=challenge().items[i];
      b.textContent=pos>=0?(pos+1)+". "+clean:clean;
    });
  }

  function lockAnswers(lock=true){
    $("answerArea").querySelectorAll("button").forEach(b=>b.disabled=lock);
  }

  function grade(ok,q,btn){
    if(ok){
      lockAnswers(true);sfx("good");
      if(!state.failedCurrent)state.firstTry++;
      state.score += state.failedCurrent?75:125;state.enemyHp--;
      $("feedbackBox").className="feedback";
      $("feedbackBox").innerHTML="<b>PĖDSAKAS PATVIRTINTAS.</b> "+q.good;
      $("hitFlash").classList.remove("fire");void $("hitFlash").offsetWidth;$("hitFlash").classList.add("fire");
      if(btn&&btn.classList)btn.classList.add("chosen");
      $("nextQuestion").classList.remove("hidden");
      $("nextQuestion").textContent=state.challengeIndex===room().challenges.length-1?"[ UŽBAIGTI SEKTORIŲ ]":"[ KITAS PĖDSAKAS ]";
      updateHud();
    }else{
      sfx("bad");state.failedCurrent=true;state.mistakes++;state.hp--;
      $("feedbackBox").className="feedback bad";
      $("feedbackBox").innerHTML="<b>TYRIMO KLAIDA.</b> "+q.bad;
      $("damageFlash").classList.remove("fire");void $("damageFlash").offsetWidth;$("damageFlash").classList.add("fire");
      $("viewportShell").classList.remove("shake");void $("viewportShell").offsetWidth;$("viewportShell").classList.add("shake");
      updateHud();
      if(state.hp<=0){setTimeout(()=>show("screenGameOver"),550)}
    }
  }

  $("nextQuestion").onclick=()=>{
    sfx("select");
    if(state.challengeIndex<room().challenges.length-1){
      state.challengeIndex++;renderChallenge();
    }else{
      finishRoom();
    }
  };

  function finishRoom(){
    if(state.roomIndex===CASE.rooms.length-1){showVictory();return}
    const current=room();
    const next=CASE.rooms[state.roomIndex+1];
    const overlay=$("doorTransition");
    $("doorTitle").textContent=current.label+" // IŠVALYTAS";
    $("doorSub").textContent="Durys į "+next.name+" atrakinamos...";
    overlay.classList.remove("hidden","open","walk");
    $("viewportShell").classList.add("room-cleared");
    sfx("good");
    setTimeout(()=>{overlay.classList.add("open");sfx("door")},450);
    setTimeout(()=>{overlay.classList.add("walk");$("viewportShell").classList.add("walking")},1200);
    setTimeout(()=>{
      state.roomIndex++;
      loadRoom();
      overlay.classList.add("hidden");
      overlay.classList.remove("open","walk");
      $("viewportShell").classList.remove("room-cleared","walking");
      sfx("door");
    },2600);
  }
  $("cutContinue").onclick=()=>{};

  $("retryRoom").onclick=()=>{
    state.hp=3;state.challengeIndex=0;state.enemyHp=room().challenges.length;state.failedCurrent=false;
    loadRoom();show("screenGame");sfx("door");
  };

  function showVictory(){
    drawPortrait($("victoryPortrait"),state.agent);
    $("victoryAgent").textContent=state.agent.name+" // "+state.agent.role;
    const total=CASE.rooms.reduce((n,r)=>n+r.challenges.length,0);
    const accuracy=Math.max(0,Math.round(state.firstTry/total*100));
    const rank=accuracy>=95?"S":accuracy>=85?"A":accuracy>=70?"B":"C";
    $("accuracyStat").textContent=accuracy+"%";
    $("scoreStat").textContent=String(state.score).padStart(4,"0");
    $("mistakeStat").textContent=state.mistakes;
    $("rankStat").textContent=rank;
    show("screenVictory");sfx("door");
  }
  $("replayGame").onclick=()=>{startCase()};

  /* PROCEDURAL 90s ROOM ART */
  const canvas=$("scene"),ctx=canvas.getContext("2d");ctx.imageSmoothingEnabled=false;
  function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(x|0,y|0,w|0,h|0)}
  function line(x1,y1,x2,y2,c,w=1){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(x1|0,y1|0);ctx.lineTo(x2|0,y2|0);ctx.stroke()}
  function text(t,x,y,c="#9da58f",size=6){ctx.fillStyle=c;ctx.font=size+'px monospace';ctx.fillText(t,x,y)}
  function drawFrame(ts){
    requestAnimationFrame(drawFrame);
    if(!$("screenGame").classList.contains("active"))return;
    const r=room(),theme=r.theme;
    ctx.clearRect(0,0,320,180);
    // base chamber perspective
    rect(0,0,320,180,"#06090a");
    const palettes={
      gateway:["#0d1718","#183033","#46605b","#806348","#a63d3d"],
      vault:["#0a1118","#132535","#28455a","#426b74","#904348"],
      archive:["#11100d","#29271d","#514a31","#7b6a3c","#9a443e"],
      core:["#12080b","#2a1117","#50212a","#7d3037","#c04c48"]
    };
    const p=palettes[theme];
    rect(0,0,320,36,p[1]);rect(0,36,320,98,p[0]);rect(0,134,320,46,"#090c0d");
    // ceiling / floor perspective
    line(0,36,110,67,p[2],2);line(320,36,210,67,p[2],2);line(0,180,110,120,p[2],2);line(320,180,210,120,p[2],2);
    rect(108,54,104,78,"#0d1213");rect(112,58,96,70,p[1]);rect(118,64,84,58,"#070a0b");
    // side structures
    for(let i=0;i<5;i++){
      const y=44+i*17;
      rect(8,y,62,11,p[1]);rect(12,y+2,20,7,p[2]);rect(36,y+2,28,7,"#0b1011");
      rect(250,y,62,11,p[1]);rect(256,y+2,28,7,"#0b1011");rect(288,y+2,18,7,p[2]);
    }
    // theme props
    if(theme==="gateway"){
      for(let i=0;i<4;i++){rect(20+i*17,57,12,7,"#213437");rect(22+i*17,59,8,3,i===2?p[4]:"#5d816f")}
      text("PAŠTO MAZGAS",18,52,"#81988a",6);
    }
    if(theme==="vault"){
      for(let x of [20,48,252,280]){rect(x,48,18,74,"#10191e");for(let y=53;y<116;y+=10){rect(x+3,y,12,5,(Math.floor(ts/400)+y+x)%3===0?"#4e9e91":"#273f4b")}}
      text("SESIJŲ ŽURNALAS",119,72,"#6b9eb0",6);text("11:42 NAUJA",126,83,"#c46c63",6);
    }
    if(theme==="archive"){
      for(let x of [16,42,68,236,262,288]){rect(x,49,18,78,"#28271e");for(let y=54;y<120;y+=11){rect(x+2,y,14,7,["#665839","#3f4d45","#714642"][(x+y)%3])}}
      text("VERSIJŲ",133,74,"#d0b26d",6);text("ISTORIJA",132,84,"#d0b26d",6);
    }
    if(theme==="core"){
      // circular core
      ctx.fillStyle="#32131a";ctx.beginPath();ctx.arc(160,91,34,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle=p[4];ctx.lineWidth=4;ctx.beginPath();ctx.arc(160,91,26+(Math.sin(ts/180)*2),0,Math.PI*2);ctx.stroke();
      rect(153,65,14,53,p[4]);rect(139,84,42,14,"#8f3438");text("ŠAKNIS",146,94,"#f2c19c",7);
    }
    // aiškus, didelis kiekvieno kambario priešas
    const remaining=state.enemyHp/Math.max(1,r.challenges.length);
    const pulse=(Math.sin(ts/170)+1)/2;
    ctx.globalAlpha=.9;
    if(theme==="gateway"){
      // LAIŠKŲ ŠMĖKLA — humanoidinis siluetas su "voko" galva
      rect(132,53,56,68,"#141718");
      rect(126,61,68,14,p[4]);
      rect(136,42,48,27,"#704347");
      line(136,43,160,61,"#d0b777",2); line(184,43,160,61,"#d0b777",2);
      rect(145,69,12,6,"#e5ce8c");rect(165,69,12,6,"#e5ce8c");
      rect(137,83,46,33,"#252b2b");rect(124,86,14,32,"#303637");rect(183,86,14,32,"#303637");
      if(remaining<.7){rect(128,57,9,4,"#b94a4d");rect(182,95,12,4,"#b94a4d")}
    } else if(theme==="vault"){
      // SESIJŲ ŠMĖKLA — aukšta skaitmeninė figūra
      rect(142,39,36,79,"#101419");
      rect(135,52,50,18,"#28465b");
      rect(145,45,30,22,"#1b2933");
      rect(149,52,8,6,"#8ed3c8");rect(164,52,8,6,"#8ed3c8");
      for(let y=72;y<113;y+=9){rect(139,y,44,4,(y/9)%2?p[3]:"#223642")}
      rect(128,78,10,38,"#17242d");rect(184,78,10,38,"#17242d");
      if(remaining<.5){rect(137,63,17,3,p[4]);rect(171,91,19,3,p[4])}
    } else if(theme==="archive"){
      // VEIDRODINIS FAILAS — gyvas bylos aplankas / mimikas
      rect(128,54,65,59,"#554b31");
      rect(136,46,31,12,"#74633d");
      rect(133,60,55,44,"#2b2a22");
      rect(141,68,14,10,"#d0b56e");rect(167,68,14,10,"#d0b56e");
      rect(143,88,36,5,"#9c4944");
      line(145,101,176,101,"#c5aa63",2);
      rect(119,75,10,36,"#49412d");rect(193,75,10,36,"#49412d");
      if(remaining<.6){rect(126,58,12,4,p[4]);rect(183,96,13,4,p[4])}
    } else {
      // ŠAKNINIS TRIKDIS — bosas, didesnis ir labiau dominuojantis
      ctx.fillStyle="#3b141b";ctx.beginPath();ctx.arc(160,86,42,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle=p[4];ctx.lineWidth=5;ctx.beginPath();ctx.arc(160,86,32+(Math.sin(ts/180)*3),0,Math.PI*2);ctx.stroke();
      rect(149,48,22,74,p[4]);rect(124,75,72,20,"#8f3438");
      rect(141,72,12,9,"#f1d08d");rect(168,72,12,9,"#f1d08d");
      rect(139,99,42,8,"#16090b");
      text("TRIKDIS",142,104,"#f0c09b",6);
    }
    ctx.globalAlpha=1;
    // foreground console
    rect(82,139,156,41,"#101617");rect(91,145,138,35,"#192225");
    rect(102,149,56,17,"#0b1011");rect(106,152,48,11,p[2]);
    for(let i=0;i<7;i++)rect(169+i*7,151,4,4,i%3===0?p[4]:"#65766e");
    text(state.agent?state.agent.id.toUpperCase():"AGENT",107,160,"#d2c58b",6);
    // subtle random CRT spark
    if(Math.floor(ts/140)%17===0)rect(0,Math.floor((ts/7)%180),320,1,"rgba(190,240,220,.18)");
  }
  renderAgents();
  requestAnimationFrame(drawFrame);
})();