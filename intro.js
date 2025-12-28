// Canvas trading lines
const canvas = document.getElementById('lines');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create multiple lines
let lines = [];
const lineCount = 5;
for(let i=0;i<lineCount;i++){
    lines.push({
        x:canvas.width/2 + (i-2)*60,
        y:canvas.height/2 + 50,
        speed: Math.random()*0.5 + 0.5,
        points:[]
    });
}

function animateLines(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    lines.forEach(line=>{
        // add new point
        line.points.push({x:line.x, y:line.y - line.speed});
        // keep max points
        if(line.points.length>30) line.points.shift();
        // draw line
        ctx.beginPath();
        ctx.moveTo(line.points[0].x, line.points[0].y);
        for(let i=1;i<line.points.length;i++){
            ctx.lineTo(line.points[i].x, line.points[i].y);
        }
        ctx.strokeStyle='rgba(99,102,241,0.8)';
        ctx.lineWidth=2;
        ctx.stroke();
    });
    requestAnimationFrame(animateLines);
}
animateLines();

// Lightweight particles
const particlesContainer = document.querySelector('.particles');
const particleCount = 15; // very light
for(let i=0;i<particleCount;i++){
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.position='absolute';
    p.style.width=`${Math.random()*2+1}px`;
    p.style.height=`${Math.random()*2+1}px`;
    p.style.background='#6366f1';
    p.style.borderRadius='50%';
    p.style.left=`${Math.random()*100}%`;
    p.style.top=`${Math.random()*100}%`;
    p.style.opacity=Math.random();
    particlesContainer.appendChild(p);
}

// Animate particles lightly
const particleElements = document.querySelectorAll('.particle');
setInterval(()=>{
    particleElements.forEach(p=>{
        p.style.transform = `translate(${Math.random()*4-2}px, ${Math.random()*4-2}px)`;
        p.style.opacity = 0.3 + Math.random()*0.7;
    });
},400);

// Redirect after animation
setTimeout(()=>{ window.location.href="index1.html"; },5000);
