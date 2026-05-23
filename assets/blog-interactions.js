document.addEventListener('DOMContentLoaded', () => {
    initGravityBackground();
    initMagneticHover();
    initScrollProgress();
});

function initGravityBackground() {
    const canvas = document.getElementById('gravity-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Get colors from CSS variables
    const style = getComputedStyle(document.body);
    const primaryColor = style.getPropertyValue('--primary').trim() || '#e0b85b';
    const accentColor = style.getPropertyValue('--accent').trim() || '#2f8b76';

    // Helper to convert hex/named colors to rgba
    function getRGBA(colorStr, alpha) {
        if (colorStr.startsWith('#')) {
            const hex = colorStr.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        return colorStr;
    }

    const color1 = getRGBA(primaryColor, 0.15);
    const color2 = getRGBA(accentColor, 0.15);

    // Create bubbles
    const bubbles = [];
    const numBubbles = Math.min(6, Math.floor((width * height) / 120000) + 2);

    for (let i = 0; i < numBubbles; i++) {
        bubbles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 150 + 150,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            color: i % 2 === 0 ? color1 : color2,
            targetRadius: Math.random() * 150 + 150
        });
    }

    const mouse = { x: -1000, y: -1000, active: false };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
        mouse.active = false;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'screen';

        bubbles.forEach((bubble) => {
            // Drift velocity updates
            bubble.x += bubble.vx;
            bubble.y += bubble.vy;

            // Bounce on walls
            if (bubble.x - bubble.radius < 0 || bubble.x + bubble.radius > width) {
                bubble.vx *= -1;
            }
            if (bubble.y - bubble.radius < 0 || bubble.y + bubble.radius > height) {
                bubble.vy *= -1;
            }

            // Keep bounds
            bubble.x = Math.max(-bubble.radius, Math.min(width + bubble.radius, bubble.x));
            bubble.y = Math.max(-bubble.radius, Math.min(height + bubble.radius, bubble.y));

            // Gravity/Attraction to mouse cursor
            if (mouse.active) {
                const dx = mouse.x - bubble.x;
                const dy = mouse.y - bubble.y;
                const dist = Math.hypot(dx, dy);

                if (dist < 380) {
                    const pull = (380 - dist) / 380;
                    bubble.vx += (dx / dist) * pull * 0.05;
                    bubble.vy += (dy / dist) * pull * 0.05;
                    
                    // Distort shape by breathing radius on attraction
                    bubble.radius += (bubble.targetRadius * 1.15 - bubble.radius) * 0.05;
                } else {
                    bubble.radius += (bubble.targetRadius - bubble.radius) * 0.05;
                }
            } else {
                bubble.radius += (bubble.targetRadius - bubble.radius) * 0.05;
            }

            // Cap velocity
            const speedLimit = 2.5;
            const currentSpeed = Math.hypot(bubble.vx, bubble.vy);
            if (currentSpeed > speedLimit) {
                bubble.vx = (bubble.vx / currentSpeed) * speedLimit;
                bubble.vy = (bubble.vy / currentSpeed) * speedLimit;
            }
            // Friction
            bubble.vx *= 0.98;
            bubble.vy *= 0.98;

            // Draw bubble with soft radial gradient
            const gradient = ctx.createRadialGradient(
                bubble.x, bubble.y, 0,
                bubble.x, bubble.y, bubble.radius
            );
            gradient.addColorStop(0, bubble.color);
            gradient.addColorStop(0.5, bubble.color.replace('0.15', '0.07').replace('0.28', '0.12'));
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.beginPath();
            ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

function initMagneticHover() {
    const magnets = document.querySelectorAll('.magnetic-el');
    
    magnets.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate3d(${x * 0.35}px, ${y * 0.35}px, 0)`;
            el.style.transition = 'none';
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate3d(0, 0, 0)';
            el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });
}

function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}
