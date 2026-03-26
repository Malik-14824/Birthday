document.addEventListener("DOMContentLoaded", () => {
    // 1. Floating Hearts Animation
    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "❤";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 2 + 3 + "s";
        heart.style.fontSize = Math.random() * 15 + 10 + "px";
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
    setInterval(createHeart, 400);
});

// 2. Page Navigation & Music Handling
const bgMusic = document.getElementById("bg-music");

function startExperience() {
    // Play music on first interaction
    bgMusic.play().catch(e => console.log("Autoplay blocked"));
    nextPage(0);
}

function nextPage(currentPageIndex) {
    // Hide current page
    document.getElementById(`page${currentPageIndex}`).classList.remove("active");
    
    // Show next page
    const nextPageIndex = currentPageIndex + 1;
    document.getElementById(`page${nextPageIndex}`).classList.add("active");

    // Trigger fireworks if it's the final page
    if (nextPageIndex === 10) {
        startFireworks();
    }
}

function replayMusic() {
    bgMusic.currentTime = 0;
    bgMusic.play();
}

// 3. Fireworks Animation
function startFireworks() {
    const canvas = document.getElementById('fireworks');
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    let particles = [];
    
    function createFirework(x, y) {
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: x, y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                alpha: 1,
                color: `hsl(${Math.random() * 360}, 100%, 70%)`
            });
        }
    }

    function animateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.02; // fade out
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();
            
            if (p.alpha <= 0) particles.splice(index, 1);
        });
        ctx.globalAlpha = 1;
        requestAnimationFrame(animateFireworks);
    }

    setInterval(() => {
        createFirework(Math.random() * canvas.width, Math.random() * canvas.height * 0.5);
    }, 800);
    
    animateFireworks();
}