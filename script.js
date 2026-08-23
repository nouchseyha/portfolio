/* ══ SAKURA PARTICLES ══ */
(function(){
    const canvas = document.getElementById('sakura-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, petals = [];

    function resize(){ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    function createPetal(){
        return {
            x: Math.random() * W,
            y: -20,
            r: Math.random()*4+2,
            rot: Math.random()*Math.PI*2,
            rotSpd: (Math.random()-.5)*.04,
            vx: (Math.random()-.5)*1.5,
            vy: Math.random()*.8+.4,
            alpha: Math.random()*.6+.3,
            hue: Math.random()*20+340 // pinks
        };
    }

    for(let i=0;i<40;i++){ const p=createPetal(); p.y=Math.random()*H; petals.push(p); }

    function drawPetal(p){
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        // simple 5-petal flower shape
        for(let i=0;i<5;i++){
            const angle = (i/5)*Math.PI*2;
            const px = Math.cos(angle)*p.r;
            const py = Math.sin(angle)*p.r;
            ctx.ellipse(px*.7, py*.7, p.r*.7, p.r*.35, angle, 0, Math.PI*2);
        }
        ctx.fillStyle = `hsl(${p.hue},90%,75%)`;
        ctx.fill();
        ctx.restore();
    }

    function loop(){
        ctx.clearRect(0,0,W,H);
        // spawn
        if(petals.length < 60 && Math.random()<.05) petals.push(createPetal());
        petals.forEach((p,i)=>{
            p.x += p.vx + Math.sin(Date.now()*.001+i)*.3;
            p.y += p.vy;
            p.rot += p.rotSpd;
            drawPetal(p);
            if(p.y > H+20) petals.splice(i,1);
        });
        requestAnimationFrame(loop);
    }
    loop();
})();

/* ══ RING DOTS ══ */
(function(){
    const c = document.getElementById('ringCanvas');
    if(!c) return;
    const ctx = c.getContext('2d');
    const N=8, R=178;
    let t=0;
    function draw(){
        ctx.clearRect(0,0,360,360);
        for(let i=0;i<N;i++){
            const a = (i/N)*Math.PI*2 + t;
            const x = 180+Math.cos(a)*R;
            const y = 180+Math.sin(a)*R;
            ctx.beginPath();
            ctx.arc(x,y,4,0,Math.PI*2);
            ctx.fillStyle='rgba(255,107,157,.9)';
            ctx.shadowBlur=12;
            ctx.shadowColor='#ff6b9d';
            ctx.fill();
        }
        t+=.012;
        requestAnimationFrame(draw);
    }
    draw();
})();

/* ══ CURSOR ══ */
const dot=document.querySelector('.cursor-dot');
const ring=document.querySelector('.cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx-3}px,${my-3}px)`;});
(function animRing(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.transform=`translate(${rx-16}px,${ry-16}px)`;requestAnimationFrame(animRing);})();
document.querySelectorAll('a,button,.svc-card,.skill-card,.proj-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ring.classList.add('h');dot.classList.add('h');});
    el.addEventListener('mouseleave',()=>{ring.classList.remove('h');dot.classList.remove('h');});
});

/* ══ SCROLL REVEAL ══ */
const revObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

/* ══ NAVBAR ══ */
const nb=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
    nb.classList.toggle('scrolled',window.scrollY>60);
    let cur='';
    document.querySelectorAll('section[id]').forEach(s=>{if(window.scrollY>=s.offsetTop-140)cur=s.getAttribute('id');});
    document.querySelectorAll('.nav-link').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
});

/* ══ MOBILE MENU ══ */
const menuBtn=document.getElementById('menuBtn');
const closeBtn=document.getElementById('closeBtn');
const mm=document.getElementById('mobileMenu');
menuBtn.addEventListener('click',()=>{mm.classList.add('open');document.body.style.overflow='hidden';menuBtn.classList.add('open');});
closeBtn.addEventListener('click',()=>{mm.classList.remove('open');document.body.style.overflow='';menuBtn.classList.remove('open');});
document.querySelectorAll('.mobile-link').forEach(a=>a.addEventListener('click',()=>{mm.classList.remove('open');document.body.style.overflow='';menuBtn.classList.remove('open');}));

/* ══ TYPEWRITER ══ */
const phrases=['Front end developer.','Backend developer.','Full stack developer.','Student.'];
let pi=0,ci=0,del=false;
const tw=document.getElementById('typewriter');
function type(){
    const ph=phrases[pi];
    if(!del){tw.textContent=ph.slice(0,++ci);if(ci===ph.length){del=true;setTimeout(type,1800);return;}}
    else{tw.textContent=ph.slice(0,--ci);if(ci===0){del=false;pi=(pi+1)%phrases.length;}}
    setTimeout(type,del?40:80);
}type();

/* ══ SKILL BARS ══ */
const skObs=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting)e.target.querySelectorAll('.sk-fill').forEach(b=>b.classList.add('run'));
}),{threshold:.25});
document.querySelectorAll('.skills-grid').forEach(g=>skObs.observe(g));

/* ══ CONTACT FORM ══ */
document.getElementById('contactForm').addEventListener('submit',function(e){
    e.preventDefault();
    const btn=this.querySelector('button[type="submit"]');
    const orig=btn.innerHTML;
    btn.innerHTML='✓ Message Sent!';
    btn.style.background='#2dd4bf';
    btn.style.color='#07070d';
    setTimeout(()=>{btn.innerHTML=orig;btn.style.background='';btn.style.color='';},3000);
});

