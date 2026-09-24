(()=>{
 const body=document.body, grade=body.dataset.grade, world=body.dataset.world;
 const D=(window.IT_CURRICULUM||{})[grade];
 const list=D&&D[world]||[];
 const names={kiberagentai:"KIBERAGENTAI",netvila:"NETVILA"};
 const colors={kiberagentai:"Kibernetinis saugumas, bylos ir įrodymų analizė.",netvila:"Algoritmai, duomenys ir problemų sprendimas."};
 document.getElementById("title").textContent=D.label+" · "+names[world];
 document.getElementById("desc").textContent=colors[world]+" Lygiai pateikiami ta pačia savaičių seka kaip klasės ilgalaikiame IT plane.";
 const grid=document.getElementById("grid");
 if(!list.length){grid.innerHTML='<div class="empty">Šiam pusmečiui lygių dar nėra.</div>';return;}
 list.sort((a,b)=>a.week-b.week).forEach(l=>{
   const c=document.createElement("article");c.className="card "+(l.status==="planned"?"disabled":"");
   const status=l.status==="prototype"?"PROTOTIPAS":l.status==="legacy"?"SENAS BUILDAS":"PLANUOJAMA";
   let href="#";
   if(l.url) href=l.url;
   else if(world==="kiberagentai"&&l.engineId) href="../../kiberagentai/?grade="+grade+"&level="+encodeURIComponent(l.engineId);
   const action=l.status==="planned"?"Bus kuriama pagal planą":"Atidaryti lygį →";
   c.innerHTML='<div class="week">'+l.week+' SAVAITĖ</div><div class="date">'+l.date+'</div><h3>'+l.title+'</h3><div class="meta"><span class="badge '+l.status+'">'+status+'</span><a class="btn '+(world==="netvila"?"net":"")+'" href="'+href+'">'+action+'</a></div>';
   grid.appendChild(c);
 });
})();