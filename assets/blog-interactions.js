document.addEventListener('DOMContentLoaded', () => {
    initMagneticCanvas();
    initMagneticHover();
    initScrollProgress();
    initExerciseCarousels();
});

function initMagneticCanvas() {
    const canvas = document.getElementById('gravity-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Get colors from CSS variables
    const style = getComputedStyle(document.body);
    const primaryColor = style.getPropertyValue('--primary').trim() || '#e0b85b';
    const accentColor = style.getPropertyValue('--accent').trim() || '#2f8b76';

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
    const color2 = getRGBA(accentColor, 0.12);

    // Create blobs
    const blobs = [];
    const numBlobs = Math.min(6, Math.floor((width * height) / 150000) + 2);

    for (let i = 0; i < numBlobs; i++) {
        blobs.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 200 + 200, // Large soft shapes
            baseX: Math.random() * width,
            baseY: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            color: i % 2 === 0 ? color1 : color2
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

        blobs.forEach((blob) => {
            // Natural drift
            blob.baseX += blob.vx;
            blob.baseY += blob.vy;

            // Bounce off walls smoothly
            if (blob.baseX - blob.radius < -100 || blob.baseX + blob.radius > width + 100) {
                blob.vx *= -1;
            }
            if (blob.baseY - blob.radius < -100 || blob.baseY + blob.radius > height + 100) {
                blob.vy *= -1;
            }

            // Magnetic Repulsion from mouse
            let repelX = 0;
            let repelY = 0;

            if (mouse.active) {
                const dx = blob.baseX - mouse.x;
                const dy = blob.baseY - mouse.y;
                const dist = Math.hypot(dx, dy);
                
                const magnetRadius = 400; // Range of the magnetic field
                if (dist < magnetRadius && dist > 0) {
                    // Force gets stronger as it gets closer
                    const force = (magnetRadius - dist) / magnetRadius;
                    repelX = (dx / dist) * force * 150; // Max displacement
                    repelY = (dy / dist) * force * 150;
                }
            }

            // Smooth interpolation towards the target position
            blob.x += ((blob.baseX + repelX) - blob.x) * 0.05 || 0;
            blob.y += ((blob.baseY + repelY) - blob.y) * 0.05 || 0;
            
            // Initialization safeguard
            if (isNaN(blob.x)) blob.x = blob.baseX;
            if (isNaN(blob.y)) blob.y = blob.baseY;

            // Draw blob with massive soft radial gradient
            const gradient = ctx.createRadialGradient(
                blob.x, blob.y, 0,
                blob.x, blob.y, blob.radius
            );
            gradient.addColorStop(0, blob.color);
            gradient.addColorStop(0.5, blob.color.replace(/0\.\d+/, '0.05')); // Softer edge
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.beginPath();
            ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
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

function initExerciseCarousels() {
    const carousels = document.querySelectorAll('[data-carousel]');
    if (!carousels.length) return;

    carousels.forEach((carousel) => {
        const track = carousel.querySelector('[data-carousel-track]');
        const section = carousel.closest('.exercise-gallery');
        const previousButton = section?.querySelector('[data-carousel-prev]');
        const nextButton = section?.querySelector('[data-carousel-next]');

        if (!track || !previousButton || !nextButton) return;

        const getScrollAmount = () => {
            const slide = track.querySelector('.exercise-slide');
            if (!slide) return track.clientWidth;
            const styles = window.getComputedStyle(track);
            const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
            return slide.getBoundingClientRect().width + gap;
        };

        previousButton.addEventListener('click', () => {
            track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        nextButton.addEventListener('click', () => {
            track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });
    });
}
