(() => {
  const CASE = window.CASE_W04;
  const $ = id => document.getElementById(id);
  const screens = [...document.querySelectorAll(".screen")];
  const dialogue = document.querySelector(".dialogue");
  const enemyCard = document.querySelector(".enemy-card");

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
    selectedOrder:[],
    enemyHitUntil:0,
    enemyAttackUntil:0,
    enemyState:"idle",
    enemyDefeatStart:0,
    transitioning:false,
    transitionStart:0
  };

  const clamp = (v,a=0,b=1) => Math.max(a,Math.min(b,v));

  let audioCtx=null;
  function tone(freq=440,dur=.06,type="square",gain=.035){
    try{
      audioCtx = audioCtx || new (window.AudioContext||window.webkitAudioContext)();
      const o=audioCtx.createOscillator(), g=audioCtx.createGain();
      o.type=type; o.frequency.value=freq; g.gain.value=gain;
      o.connect(g); g.connect(audioCtx.destination); o.start();
      g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+dur);
      o.stop(audioCtx.currentTime+dur);
    }catch(e){}
  }
  function sfx(kind){
    if(kind==="select"){tone(650,.04);setTimeout(()=>tone(820,.04),45)}
    if(kind==="good"){tone(180,.05,"square",.05);setTimeout(()=>tone(360,.07,"square",.04),55)}
    if(kind==="bad"){tone(92,.16,"sawtooth",.06)}
    if(kind==="door"){tone(115,.08,"square",.04);setTimeout(()=>tone(165,.08,"square",.04),90);setTimeout(()=>tone(240,.11,"square",.04),180)}
    if(kind==="fall"){tone(120,.08,"sawtooth",.05);setTimeout(()=>tone(78,.16,"sawtooth",.04),80)}
  }

  function show(id){
    screens.forEach(s=>s.classList.toggle("active",s.id===id));
    window.scrollTo({top:0,behavior:"instant"});
  }

  function startFromBoot(){
    sfx("door");
    show("screenAgents");
  }
  $("bootContinue").onclick=startFromBoot;
  $("screenBoot").onclick=ev=>{ if(!ev.target.closest("a") && !ev.target.closest("button")) startFromBoot(); };

  /* AGENTŲ PORTRETAI */
  const palettes=[
    {skin:["#5a3427","#a86745","#d69b69","#edc293"],hair:"#382420",hair2:"#5b3527",coat:"#435246",shirt:"#d7d0a4",accent:"#6f8e65"},
    {skin:["#5b3226","#aa6949","#dba079","#f1c8a5"],hair:"#241f24",hair2:"#443343",coat:"#323846",shirt:"#d6d1bb",accent:"#7685ba"},
    {skin:["#3b211d","#784534","#ad7458","#d5a07f"],hair:"#15151b",hair2:"#2c2934",coat:"#4a3439",shirt:"#c4c3a4",accent:"#9b6c80"},
    {skin:["#6b3e27","#b87348","#df9d6b","#f1c28e"],hair:"#6b4a23",hair2:"#99713b",coat:"#4d4639",shirt:"#d8d2ae",accent:"#6b87a5"},
    {skin:["#301f1c","#654033","#966752","#c28e72"],hair:"#111418",hair2:"#292d31",coat:"#303b42",shirt:"#c8ccb7",accent:"#6f927d"},
    {skin:["#5d3328","#9e6045","#d18b68","#eab99a"],hair:"#241b19",hair2:"#4c312a",coat:"#503a31",shirt:"#d7ccb2",accent:"#9a835e"}
  ];
  function px(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(x|0,y|0,w|0,h|0)}
  function drawPortrait(canvas,agent){
    const c=canvas.getContext("2d"), p=palettes[agent.skin%palettes.length];
    c.imageSmoothingEnabled=false;c.clearRect(0,0,64,80);
    px(c,0,0,64,80,"#343638");px(c,3,63,58,17,"#17191a");px(c,8,54,48,22,p.coat);px(c,23,53,18,16,p.shirt);
    px(c,26,55,12,11,p.accent);px(c,29,55,6,14,"#1b2527");px(c,25,44,14,13,p.skin[2]);px(c,27,47,10,9,p.skin[3]);
    px(c,13,24,6,18,p.skin[1]);px(c,45,24,6,18,p.skin[1]);px(c,14,28,4,8,p.skin[2]);px(c,46,28,4,8,p.skin[2]);
    px(c,18,14,28,35,p.skin[2]);px(c,21,18,22,29,p.skin[3]);px(c,23,46,18,5,p.skin[2]);px(c,20,42,24,5,p.skin[3]);
    if(agent.skin===0){px(c,16,9,31,10,p.hair);px(c,13,14,10,16,p.hair2);px(c,21,7,20,6,p.hair2)}
    if(agent.skin===1){px(c,15,8,33,9,p.hair);px(c,12,13,8,24,p.hair);px(c,43,12,8,24,p.hair);px(c,9,23,8,16,p.hair2);px(c,47,23,8,16,p.hair2)}
    if(agent.skin===2){px(c,14,8,36,11,p.hair);px(c,11,13,10,25,p.hair);px(c,43,12,10,24,p.hair);px(c,16,5,27,7,p.hair2)}
    if(agent.skin===3){px(c,16,7,32,11,p.hair2);px(c,13,12,10,19,p.hair);px(c,39,9,11,12,p.hair);px(c,19,5,21,6,p.hair)}
    if(agent.skin===4){px(c,14,7,37,12,p.hair);px(c,11,13,11,26,p.hair2);px(c,44,13,10,24,p.hair2);px(c,17,5,29,7,p.hair)}
    if(agent.skin===5){px(c,15,8,34,9,p.hair);px(c,12,13,9,21,p.hair2);px(c,43,13,9,21,p.hair2);px(c,18,6,26,6,p.hair2)}
    px(c,21,25,8,2,"#3a2822");px(c,35,25,8,2,"#3a2822");px(c,22,28,7,5,"#e8e1c2");px(c,35,28,7,5,"#e8e1c2");
    px(c,25,29,3,4,"#17191b");px(c,36,29,3,4,"#17191b");px(c,31,31,3,9,p.skin[1]);px(c,30,39,6,2,"#704033");px(c,26,42,13,2,"#713b3b");
    if(agent.skin===0){px(c,20,27,10,1,"#191919");px(c,34,27,10,1,"#191919");px(c,30,28,4,1,"#191919")}
    if(agent.skin===4){px(c,21,27,9,7,"rgba(70,95,95,.55)");px(c,34,27,9,7,"rgba(70,95,95,.55)");px(c,30,29,4,1,"#5d6f6f")}
  }

  function renderAgents(){
    const grid=$("agentGrid");grid.innerHTML="";
    CASE.agents.forEach(a=>{
      const card=document.createElement("button");
      card.className="agent-card";
      card.innerHTML='<canvas width="64" height="80"></canvas><div><b>'+a.name+'</b><small>'+a.desc+'</small><div class="agent-role">'+a.role+'</div></div>';
      drawPortrait(card.querySelector("canvas"),a);
      card.onclick=()=>{
        state.agent=a;sfx("select");
        [...grid.children].forEach(x=>x.classList.remove("selected"));
        card.classList.add("selected");
        $("agentHint").textContent=a.name+" // "+a.role;
        $("agentContinue").disabled=false;
      };
      grid.appendChild(card);
    });
  }
  renderAgents();

  $("agentContinue").onclick=()=>{
    if(!state.agent)return;
    sfx("door");
    drawPortrait($("briefPortrait"),state.agent);
    $("briefAgentName").textContent=state.agent.name;
    $("briefCopy").textContent=CASE.briefing;
    show("screenBriefing");
  };
  $("enterCase").onclick=()=>{sfx("door");startCase()};

  function room(){return CASE.rooms[state.roomIndex]}
  function challenge(){return room().challenges[state.challengeIndex]}

  function startCase(){
    state.roomIndex=0;state.challengeIndex=0;state.hp=3;state.score=0;state.mistakes=0;state.firstTry=0;
    state.failedCurrent=false;state.transitioning=false;state.enemyState="idle";
    drawPortrait($("hudPortrait"),state.agent);
    $("hudAgentName").textContent=state.agent.name;
    show("screenGame");
    loadRoom(true);
  }

  function showRoomReveal(){
    $("revealSector").textContent=room().label;
    $("revealRoom").textContent=room().name;
    $("revealEnemy").textContent="GRĖSMĖ: "+room().enemy;
    $("roomReveal").classList.remove("hidden");
    setTimeout(()=>$("roomReveal").classList.add("hidden"),1450);
  }

  function loadRoom(reveal=false){
    state.challengeIndex=0;state.hp=3;state.enemyHp=room().challenges.length;state.failedCurrent=false;
    state.enemyState="idle";state.enemyHitUntil=0;state.enemyAttackUntil=0;state.enemyDefeatStart=0;
    $("roomLabel").textContent=room().label;$("roomName").textContent=room().name;
    $("enemyName").textContent=room().enemy;$("enemyTag").textContent=room().enemyTag;
    $("objectiveText").textContent=room().objective;
    enemyCard.classList.remove("defeated");
    dialogue.classList.remove("transitioning");
    updateHud();renderChallenge();
    if(reveal) showRoomReveal();
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
    state.selectedMulti=[];state.selectedOrder=[];state.failedCurrent=false;
    const q=challenge();
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
          if(state.transitioning)return;
          const ix=state.selectedMulti.indexOf(i);
          if(ix>=0)state.selectedMulti.splice(ix,1);
          else if(state.selectedMulti.length<q.correct.length)state.selectedMulti.push(i);
          b.classList.toggle("chosen",state.selectedMulti.includes(i));sfx("select");
        };
        area.appendChild(b);
      });
      const row=document.createElement("div");row.className="confirm-row";
      const confirm=document.createElement("button");confirm.className="mini-btn";confirm.textContent="PATVIRTINTI ATRANKĄ";
      confirm.onclick=()=>{
        const a=[...state.selectedMulti].sort((x,y)=>x-y),c=[...q.correct].sort((x,y)=>x-y);
        grade(JSON.stringify(a)===JSON.stringify(c),q,confirm);
      };
      row.appendChild(confirm);area.appendChild(row);
    }
    if(q.type==="order"){
      q.items.forEach((opt,i)=>{
        const b=document.createElement("button");b.className="order-btn";b.dataset.index=i;b.textContent=opt;
        b.onclick=()=>{
          if(state.transitioning)return;
          const ix=state.selectedOrder.indexOf(i);
          if(ix>=0)state.selectedOrder.splice(ix,1);
          else if(state.selectedOrder.length<q.correct.length)state.selectedOrder.push(i);
          refreshOrderButtons();sfx("select");
        };
        area.appendChild(b);
      });
      const row=document.createElement("div");row.className="confirm-row";
      const reset=document.createElement("button");reset.className="mini-btn";reset.textContent="IŠ NAUJO";
      reset.onclick=()=>{state.selectedOrder=[];refreshOrderButtons()};
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
      b.textContent=pos>=0?(pos+1)+". "+challenge().items[i]:challenge().items[i];
    });
  }

  function lockAnswers(lock=true){
    $("answerArea").querySelectorAll("button").forEach(b=>b.disabled=lock);
  }

  function flash(id,cls){
    const el=$(id);el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);
  }

  function grade(ok,q,btn){
    if(state.transitioning)return;
    if(ok){
      lockAnswers(true);sfx("good");
      if(!state.failedCurrent)state.firstTry++;
      state.score += state.failedCurrent?75:125;
      state.enemyHp--;
      state.enemyHitUntil=performance.now()+420;
      $("feedbackBox").className="feedback";
      $("feedbackBox").innerHTML="<b>PĖDSAKAS PATVIRTINTAS.</b> "+q.good;
      flash("hitFlash","fire");
      if(btn&&btn.classList)btn.classList.add("chosen");
      updateHud();

      const last=state.challengeIndex===room().challenges.length-1;
      if(last){
        state.enemyState="defeat";
        state.enemyDefeatStart=performance.now()+180;
        enemyCard.classList.add("defeated");
        $("nextQuestion").classList.add("hidden");
        sfx("fall");
        if(state.roomIndex===CASE.rooms.length-1){
          setTimeout(showVictory,2400);
        }else{
          setTimeout(startRoomTransition,1550);
        }
      }else{
        $("nextQuestion").textContent="[ KITAS PĖDSAKAS ]";
        $("nextQuestion").classList.remove("hidden");
      }
    }else{
      sfx("bad");state.failedCurrent=true;state.mistakes++;state.hp--;
      state.enemyAttackUntil=performance.now()+480;
      $("feedbackBox").className="feedback bad";
      $("feedbackBox").innerHTML="<b>TYRIMO KLAIDA.</b> "+q.bad;
      flash("damageFlash","fire");
      const shell=$("viewportShell");shell.classList.remove("shake");void shell.offsetWidth;shell.classList.add("shake");
      updateHud();
      if(state.hp<=0)setTimeout(()=>show("screenGameOver"),550);
    }
  }

  $("nextQuestion").onclick=()=>{
    if(state.transitioning)return;
    sfx("select");
    if(state.challengeIndex<room().challenges.length-1){
      state.challengeIndex++;
      state.enemyState="idle";
      renderChallenge();
    }
  };

  function startRoomTransition(){
    if(state.transitioning)return;
    state.transitioning=true;
    state.transitionStart=performance.now();
    dialogue.classList.add("transitioning");
    $("objectiveText").textContent="GRĖSMĖ PAŠALINTA · DURYS ATRAKINTOS";
    sfx("door");
    setTimeout(()=>{
      if(!state.transitioning)return;
      state.roomIndex++;
      state.transitioning=false;
      state.transitionStart=0;
      loadRoom(true);
      sfx("door");
    },3350);
  }

  $("retryRoom").onclick=()=>{
    state.hp=3;state.challengeIndex=0;state.enemyHp=room().challenges.length;
    state.failedCurrent=false;state.transitioning=false;state.enemyState="idle";
    show("screenGame");loadRoom(true);sfx("door");
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
  $("replayGame").onclick=startCase;

  /* 90s FIRST-PERSON PIXEL ART */
  const canvas=$("scene"),ctx=canvas.getContext("2d");
  ctx.imageSmoothingEnabled=false;
  function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(x|0,y|0,w|0,h|0)}
  function line(x1,y1,x2,y2,c,w=1){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(x1|0,y1|0);ctx.lineTo(x2|0,y2|0);ctx.stroke()}
  function label(t,x,y,c="#9da58f",size=6){ctx.fillStyle=c;ctx.font=size+"px monospace";ctx.fillText(t,x,y)}

  const roomPalettes={
    gateway:["#0d1718","#183033","#46605b","#806348","#a63d3d","#d5b96c"],
    vault:["#0a1118","#132535","#28455a","#426b74","#904348","#78b9b0"],
    archive:["#11100d","#29271d","#514a31","#7b6a3c","#9a443e","#d0b26d"],
    core:["#12080b","#2a1117","#50212a","#7d3037","#c04c48","#e0ad66"]
  };

  function drawDoor(p,open=0){
    const x=118,y=34,w=84,h=101;
    rect(x-5,y-5,w+10,h+10,"#050707");
    rect(x-2,y-2,w+4,h+4,p[2]);
    rect(x,y,w,h,"#080b0c");
    const panel=Math.round(39*(1-open));
    if(panel>0){
      rect(x+3,y+3,panel,h-6,p[1]);
      rect(x+w-3-panel,y+3,panel,h-6,p[1]);
      for(let yy=y+12;yy<y+h-8;yy+=17){
        line(x+6,yy,x+panel,yy,p[2],1);
        line(x+w-panel,yy,x+w-6,yy,p[2],1);
      }
    }
    const glow=open>0 ? p[5] : p[4];
    rect(155,40,10,4,glow);
    rect(157,41,6,2,open>0?"#f5e7a8":"#7d2529");
    if(open>0){
      ctx.globalAlpha=.18+open*.34;
      rect(x+8,y+7,w-16,h-14,p[5]);
      ctx.globalAlpha=1;
    }
  }

  function drawRoom(theme,ts,doorOpen=0){
    const p=roomPalettes[theme];
    rect(0,0,320,180,"#050708");
    rect(0,0,320,35,p[1]);rect(0,35,320,100,p[0]);rect(0,135,320,45,"#090c0d");
    line(0,35,112,65,p[2],2);line(320,35,208,65,p[2],2);
    line(0,180,112,121,p[2],2);line(320,180,208,121,p[2],2);
    line(0,135,112,118,"#1b2424",1);line(320,135,208,118,"#1b2424",1);
    drawDoor(p,doorOpen);

    for(let i=0;i<5;i++){
      const y=43+i*17;
      rect(7,y,66,12,p[1]);rect(11,y+2,22,8,p[2]);rect(38,y+2,29,8,"#0a0f10");
      rect(247,y,66,12,p[1]);rect(253,y+2,27,8,"#0a0f10");rect(286,y+2,21,8,p[2]);
    }

    if(theme==="gateway"){
      label("PAŠTO MAZGAS",14,31,"#8ca49a",6);
      for(let i=0;i<4;i++){rect(18+i*17,53,12,7,"#213437");rect(21+i*17,55,7,3,i===2?p[4]:"#5d816f")}
    }else if(theme==="vault"){
      label("SESIJŲ ŽURNALAS",12,31,"#7ea6b4",6);
      for(let x of [18,47,255,284]){
        rect(x,47,18,76,"#10191e");
        for(let y=52;y<118;y+=10)rect(x+3,y,12,5,(Math.floor(ts/420)+y+x)%3===0?"#4e9e91":"#273f4b");
      }
    }else if(theme==="archive"){
      label("ĮRODYMŲ ARCHYVAS",12,31,"#b39b62",6);
      for(let x of [15,40,65,240,265,290]){
        rect(x,48,17,76,"#28271e");
        for(let y=53;y<119;y+=11)rect(x+2,y,13,7,["#665839","#3f4d45","#714642"][(x+y)%3]);
      }
    }else{
      label("IZOLIAVIMO BRANDUOLYS",11,31,"#bd6a67",6);
      for(let x of [24,278]){
        rect(x,48,18,72,"#28121a");
        for(let y=54;y<115;y+=12)rect(x+4,y,10,6,(y/12)%2?p[4]:p[3]);
      }
    }

    rect(78,142,164,38,"#0e1415");rect(87,147,146,33,"#192225");
    rect(100,151,58,16,"#0a1011");rect(104,154,50,10,p[2]);
    for(let i=0;i<8;i++)rect(170+i*7,153,4,4,i%3===0?p[4]:"#65766e");
    label("AGENTAS",107,162,"#d2c58b",6);
  }

  function enemyTransform(ts,defeat){
    const hit=ts<state.enemyHitUntil, attack=ts<state.enemyAttackUntil;
    const bob=Math.round(Math.sin(ts/220)*1.5);
    const jitter=hit ? ((Math.floor(ts/45)%2)*6-3) : 0;
    const scale=attack?1.09:1;
    ctx.save();
    ctx.globalAlpha=Math.max(0,1-defeat);
    ctx.translate(160+jitter,90+bob+defeat*18);
    ctx.scale(scale*(1+defeat*.15),scale*(1-defeat*.42));
    ctx.translate(-160,-90);
    return {hit,attack};
  }
  function endEnemy(){ctx.restore()}

  function debris(ts,p,color){
    if(p<.18)return;
    ctx.globalAlpha=(1-p)*.85;
    for(let i=0;i<14;i++){
      const a=i*.9+ts/500, d=18+p*42;
      rect(160+Math.cos(a)*d,83+Math.sin(a*1.3)*d*.55,2+(i%3),2+(i%2),color);
    }
    ctx.globalAlpha=1;
  }

  function drawGatewayEnemy(ts,defeat){
    const t=enemyTransform(ts,defeat), flash=t.hit?"#eac9a6":null;
    const outline="#060707", dark=flash||"#1b2020", coat=flash||"#303737", rust=flash||"#7e3b3d", paper=flash||"#c8b77e", eye="#f3df91";
    // kojos
    rect(143,112,14,29,outline);rect(145,113,11,27,coat);rect(164,112,14,29,outline);rect(165,113,11,27,coat);
    rect(139,137,19,6,outline);rect(164,137,19,6,outline);
    // rankos
    rect(119,73,14,48,outline);rect(122,76,10,42,coat);rect(188,73,14,48,outline);rect(189,76,10,42,coat);
    rect(117,115,16,9,outline);rect(188,115,16,9,outline);
    // kūnas
    rect(131,67,59,50,outline);rect(135,70,51,44,dark);
    rect(142,72,37,8,rust);rect(150,84,21,24,"#202626");
    // kaklas
    rect(152,60,17,10,outline);rect(155,61,11,9,coat);
    // galva-vokas
    rect(139,36,43,28,outline);rect(142,39,37,22,paper);
    line(143,40,160,54,rust,2);line(178,40,160,54,rust,2);
    rect(148,49,8,5,eye);rect(166,49,8,5,eye);rect(151,50,3,4,"#1a1410");rect(168,50,3,4,"#1a1410");
    rect(152,58,18,3,rust);
    // glitch juostos
    rect(126,82,17,3,rust);rect(181,95,16,3,rust);
    endEnemy();debris(ts,defeat,"#9e4a4b");
  }

  function drawVaultEnemy(ts,defeat){
    const t=enemyTransform(ts,defeat), flash=t.hit?"#cde7e0":null;
    const outline="#05080b", armor=flash||"#233845", armor2=flash||"#35566a", glow=flash||"#75c9bd", eye="#d7f2cf";
    rect(142,111,15,31,outline);rect(145,112,11,28,armor);rect(165,111,15,31,outline);rect(166,112,11,28,armor);
    rect(138,138,21,6,outline);rect(164,138,21,6,outline);
    rect(119,70,15,50,outline);rect(122,73,10,45,armor);rect(188,70,15,50,outline);rect(190,73,10,45,armor);
    rect(132,65,58,52,outline);rect(136,68,50,46,armor);
    rect(143,76,36,8,armor2);rect(151,88,20,18,"#121d24");rect(154,91,14,4,glow);rect(154,99,14,4,glow);
    rect(151,58,20,10,outline);rect(154,59,14,9,armor2);
    rect(141,32,42,30,outline);rect(145,36,34,23,armor2);
    rect(149,43,9,7,eye);rect(166,43,9,7,eye);rect(152,45,4,4,"#0a1114");rect(168,45,4,4,"#0a1114");
    rect(153,54,18,3,glow);
    for(let y=72;y<111;y+=11)rect(137,y,48,3,(y/11)%2?glow:"#1c2d37");
    endEnemy();debris(ts,defeat,"#5ea99f");
  }

  function drawArchiveEnemy(ts,defeat){
    const t=enemyTransform(ts,defeat), flash=t.hit?"#ead9aa":null;
    const outline="#080806", folder=flash||"#695d3a", paper=flash||"#bca66a", dark=flash||"#37342a", crack="#9a4744";
    rect(141,112,16,29,outline);rect(144,113,12,27,dark);rect(165,112,16,29,outline);rect(166,113,12,27,dark);
    rect(137,138,22,6,outline);rect(164,138,22,6,outline);
    rect(117,72,16,48,outline);rect(121,75,11,43,folder);rect(189,72,16,48,outline);rect(191,75,11,43,folder);
    rect(130,65,62,53,outline);rect(134,69,54,45,folder);
    rect(141,75,40,31,dark);rect(148,81,26,5,paper);rect(148,90,31,4,paper);rect(148,99,20,4,paper);
    rect(149,58,23,10,outline);rect(152,59,17,9,folder);
    // aplanko formos galva
    rect(138,35,45,28,outline);rect(142,39,37,21,folder);rect(145,34,18,7,outline);rect(147,36,15,5,paper);
    rect(148,46,9,6,paper);rect(166,46,9,6,paper);rect(151,48,3,3,"#17140d");rect(168,48,3,3,"#17140d");
    line(143,41,177,59,crack,2);line(161,39,154,59,crack,1);
    rect(152,56,17,3,crack);
    endEnemy();debris(ts,defeat,"#b08c52");
  }

  function drawCoreEnemy(ts,defeat){
    const t=enemyTransform(ts,defeat), flash=t.hit?"#f0c0a0":null;
    const outline="#070506", armor=flash||"#3d1b22", armor2=flash||"#642832", red=flash||"#b34145", core=flash||"#e1ad63", eye="#ffe0a2";
    // kojos
    rect(136,111,20,33,outline);rect(140,113,15,29,armor2);rect(166,111,20,33,outline);rect(167,113,15,29,armor2);
    rect(131,139,27,7,outline);rect(165,139,27,7,outline);
    // masyvios rankos
    rect(105,65,25,55,outline);rect(110,69,18,47,armor2);rect(192,65,25,55,outline);rect(194,69,18,47,armor2);
    rect(102,112,28,12,outline);rect(192,112,28,12,outline);
    // torsas
    rect(124,58,74,61,outline);rect(129,63,64,52,armor);
    rect(136,68,50,42,armor2);
    // branduolys
    ctx.fillStyle=outline;ctx.beginPath();ctx.arc(161,88,18,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=red;ctx.beginPath();ctx.arc(161,88,14,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle=core;ctx.lineWidth=3;ctx.beginPath();ctx.arc(161,88,9+Math.sin(ts/180)*2,0,Math.PI*2);ctx.stroke();
    // kaklas ir galva
    rect(148,50,27,12,outline);rect(152,52,19,10,armor2);
    rect(136,24,50,31,outline);rect(141,29,40,23,armor2);
    rect(146,35,10,7,eye);rect(167,35,10,7,eye);rect(150,37,4,4,"#17090a");rect(169,37,4,4,"#17090a");
    rect(151,47,20,3,red);
    // ragai / antenos
    rect(137,18,7,14,outline);rect(178,18,7,14,outline);rect(141,16,5,9,red);rect(177,16,5,9,red);
    endEnemy();debris(ts,defeat,"#c74c4d");
  }

  function drawEnemy(theme,ts,defeat){
    if(defeat>=1)return;
    if(theme==="gateway")drawGatewayEnemy(ts,defeat);
    else if(theme==="vault")drawVaultEnemy(ts,defeat);
    else if(theme==="archive")drawArchiveEnemy(ts,defeat);
    else drawCoreEnemy(ts,defeat);
  }

  function transitionCaption(t,nextName){
    ctx.save();
    ctx.textAlign="center";
    if(t<700){
      rect(94,10,132,20,"rgba(5,7,7,.86)");
      label("GRĖSMĖ PAŠALINTA",160,23,"#e2cf8d",8);
    }else if(t<1450){
      rect(96,10,128,20,"rgba(5,7,7,.86)");
      label("DURYS ATRAKINTOS",160,23,"#9fd39b",8);
    }else{
      rect(74,10,172,20,"rgba(5,7,7,.86)");
      label("ŽENGIAMA Į: "+nextName,160,23,"#d9c889",7);
    }
    ctx.restore();
  }

  function drawFrame(ts){
    requestAnimationFrame(drawFrame);
    if(!$("screenGame").classList.contains("active"))return;
    const r=room(),theme=r.theme;
    let t=state.transitioning ? ts-state.transitionStart : -1;
    const doorOpen=state.transitioning ? clamp((t-600)/700) : 0;
    const walk=state.transitioning ? clamp((t-1350)/1300) : 0;
    const fade=state.transitioning ? clamp((t-2550)/650) : 0;
    let defeat=0;
    if(state.enemyState==="defeat"){
      defeat=clamp((ts-state.enemyDefeatStart)/850);
    }

    ctx.clearRect(0,0,320,180);
    ctx.save();
    const zoom=1+walk*.82;
    const bob=state.transitioning && walk>0 ? Math.sin(walk*Math.PI*8)*1.5 : 0;
    ctx.translate(160,90+bob);ctx.scale(zoom,zoom);ctx.translate(-160,-90);
    drawRoom(theme,ts,doorOpen);
    drawEnemy(theme,ts,defeat);
    ctx.restore();

    if(state.transitioning){
      transitionCaption(t,CASE.rooms[state.roomIndex+1].name);
      if(fade>0){ctx.globalAlpha=fade;rect(0,0,320,180,"#000");ctx.globalAlpha=1}
    }

    if(Math.floor(ts/140)%19===0){
      ctx.globalAlpha=.15;rect(0,Math.floor((ts/7)%180),320,1,"#d4efe0");ctx.globalAlpha=1;
    }
  }

  requestAnimationFrame(drawFrame);
})();