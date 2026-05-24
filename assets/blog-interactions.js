document.addEventListener('DOMContentLoaded', () => {
    initMagneticCanvas();
    initMagneticHover();
    initScrollProgress();
    initExerciseCarousels();
    initExerciseGuides();
});

const EXERCISE_GUIDES = {
    'low-bar-squat': {
        title: 'Barbell Low Bar Back Squat',
        workout: 'Workout A',
        prescription: '3 sets x 8-10 reps',
        steps: [
            'Setup bar across rear shoulders',
            'Brace and unlock hips',
            'Squat with knees tracking over toes',
            'Drive up through midfoot'
        ],
        cue: 'keep chest proud and bar tight.',
        avoid: 'knees collapsing inward.'
    },
    'bench-press': {
        title: 'Barbell Bench Press',
        workout: 'Workout A',
        prescription: '3 sets x 8-10 reps',
        steps: [
            'Plant feet and set shoulder blades',
            'Grip bar evenly',
            'Lower to lower chest with control',
            'Press up without losing shoulder position'
        ],
        cue: 'keep wrists stacked.',
        avoid: 'bouncing the bar.'
    },
    'bent-over-row': {
        title: 'Barbell Bent Over Row',
        workout: 'Workout A',
        prescription: '3 sets x 8-10 reps',
        steps: [
            'Hinge to a strong flat-back position',
            'Let bar hang below shoulders',
            'Pull elbows back toward lower ribs',
            'Lower under control'
        ],
        cue: 'torso stays still.',
        avoid: 'turning it into a shrug.'
    },
    'lateral-raise': {
        title: 'Dumbbell Lateral Raise',
        workout: 'Workout A',
        prescription: '3 sets x 12-15 reps',
        steps: [
            'Stand tall with soft elbows',
            'Raise dumbbells out to sides',
            'Stop around shoulder height',
            'Lower slowly'
        ],
        cue: 'lead with elbows.',
        avoid: 'swinging with momentum.'
    },
    'romanian-deadlift': {
        title: 'Barbell Romanian Deadlift',
        workout: 'Workout B',
        prescription: '1 set x 5 reps',
        steps: [
            'Stand tall with bar close',
            'Push hips back with slight knee bend',
            'Lower until hamstrings load',
            'Stand by driving hips forward'
        ],
        cue: 'bar stays close.',
        avoid: 'rounding the back.'
    },
    'overhead-press': {
        title: 'Barbell Overhead Press',
        workout: 'Workout B',
        prescription: '3 sets x 8-10 reps',
        steps: [
            'Start at upper chest',
            'Brace ribs and glutes',
            'Press bar overhead',
            'Finish stacked over shoulders'
        ],
        cue: 'head moves through after bar clears.',
        avoid: 'leaning far back.'
    },
    'lat-pulldown': {
        title: 'Lat Pulldown',
        workout: 'Workout B',
        prescription: '3 sets x 8-10 reps',
        steps: [
            'Sit tall and grip wide bar',
            'Lean slightly back',
            'Pull elbows down to upper chest',
            'Return with control'
        ],
        cue: 'elbows drive down.',
        avoid: 'pulling behind the neck.'
    },
    'walking-lunge': {
        title: 'Dumbbell Walking Lunge',
        workout: 'Workout B',
        prescription: '3 sets x 10 reps / side',
        steps: [
            'Hold dumbbells at sides',
            'Step forward into a stable stance',
            'Lower until back knee hovers',
            'Drive through front foot into next step'
        ],
        cue: 'torso tall.',
        avoid: 'front knee caving inward.'
    },
    'home-floor-press': {
        title: 'Dumbbell Floor Press',
        workout: 'Upper Day',
        prescription: '4 sets x 10-15 reps',
        steps: [
            'Lie on the floor with dumbbells over chest',
            'Plant feet and tuck elbows slightly',
            'Lower until upper arms touch the floor',
            'Press up over shoulders'
        ],
        cue: 'keep shoulder blades pinned to the floor.',
        avoid: 'bouncing elbows off the floor.'
    },
    'home-pendlay-row': {
        title: 'Single Arm Dumbbell Pendlay Row',
        workout: 'Upper Day',
        prescription: '4 sets x 10-15 reps / side',
        steps: [
            'Hinge with one hand braced',
            'Let the dumbbell start from the floor',
            'Pull elbow back toward hip',
            'Set the weight down each rep'
        ],
        cue: 'square hips and ribs to the floor.',
        avoid: 'twisting the torso to lift the weight.'
    },
    'home-overhead-press': {
        title: 'Dumbbell Overhead Press',
        workout: 'Upper Day',
        prescription: '3 sets x 10-12 reps',
        steps: [
            'Start dumbbells at shoulders',
            'Brace ribs and glutes',
            'Press upward with forearms vertical',
            'Lower to shoulders under control'
        ],
        cue: 'wrists stay over elbows.',
        avoid: 'arching the low back.'
    },
    'home-bicep-curl': {
        title: 'Dumbbell Bicep Curl',
        workout: 'Upper Day',
        prescription: '3 sets x 12-15 reps',
        steps: [
            'Stand tall with dumbbells by sides',
            'Keep elbows close to ribs',
            'Curl without shoulders rolling forward',
            'Lower slowly to full arm length'
        ],
        cue: 'squeeze at the top.',
        avoid: 'swinging the hips.'
    },
    'home-goblet-squat': {
        title: 'Dumbbell Goblet Squat',
        workout: 'Lower Day',
        prescription: '4 sets x 12-20 reps',
        steps: [
            'Hold one dumbbell tight at chest',
            'Set feet just outside hips',
            'Sit down between the knees',
            'Drive up through the full foot'
        ],
        cue: 'elbows point down.',
        avoid: 'collapsing the chest.'
    },
    'home-double-db-rdl': {
        title: 'Double Dumbbell Romanian Deadlift',
        workout: 'Lower Day',
        prescription: '4 sets x 10-15 reps',
        steps: [
            'Hold dumbbells in front of thighs',
            'Soften knees and brace',
            'Push hips back with weights close',
            'Stand by squeezing glutes'
        ],
        cue: 'feel hamstrings load.',
        avoid: 'rounding the back.'
    },
    'home-walking-lunge': {
        title: 'Dumbbell Walking Lunge',
        workout: 'Lower Day',
        prescription: '3 sets x 12 reps / side',
        steps: [
            'Hold dumbbells at sides',
            'Step into a long stable stride',
            'Lower back knee toward floor',
            'Drive through front foot into next step'
        ],
        cue: 'torso stays tall.',
        avoid: 'stepping too narrow.'
    },
    'home-calf-raise': {
        title: 'Standing Calf Raise',
        workout: 'Lower Day',
        prescription: '3 sets x 15-20 reps',
        steps: [
            'Stand tall holding dumbbells',
            'Press through the big toes',
            'Pause at the top',
            'Lower heels slowly'
        ],
        cue: 'use the full range.',
        avoid: 'bouncing reps.'
    },
    'ppl-bench-press': {
        title: 'Barbell Bench Press',
        workout: 'Push Day',
        prescription: '4 sets x 8-10 reps',
        steps: [
            'Plant feet and set shoulder blades',
            'Grip bar evenly',
            'Lower to lower chest with control',
            'Press up without losing shoulder position'
        ],
        cue: 'keep wrists stacked.',
        avoid: 'bouncing the bar.'
    },
    'ppl-db-overhead-press': {
        title: 'Dumbbell Overhead Press',
        workout: 'Push Day',
        prescription: '3 sets x 8-12 reps',
        steps: [
            'Start dumbbells at shoulders',
            'Brace ribs and glutes',
            'Press straight overhead',
            'Finish with arms stacked over shoulders'
        ],
        cue: 'forearms stay vertical.',
        avoid: 'leaning far back.'
    },
    'ppl-incline-db-bench': {
        title: 'Incline Dumbbell Bench Press',
        workout: 'Push Day',
        prescription: '3 sets x 10-12 reps',
        steps: [
            'Set bench around 30-45 degrees',
            'Plant feet and set shoulder blades',
            'Lower dumbbells to upper chest',
            'Press up slightly inward'
        ],
        cue: 'elbows stay under wrists.',
        avoid: 'flaring shoulders high.'
    },
    'ppl-tricep-pushdown': {
        title: 'Cable Tricep Pushdown',
        workout: 'Push Day',
        prescription: '3 sets x 12-15 reps',
        steps: [
            'Set cable high and stand tall',
            'Pin elbows near ribs',
            'Press handle down until arms straighten',
            'Control the return'
        ],
        cue: 'elbows stay still.',
        avoid: 'leaning bodyweight onto the cable.'
    },
    'ppl-bent-over-row': {
        title: 'Barbell Bent Over Row',
        workout: 'Pull Day',
        prescription: '4 sets x 8-10 reps',
        steps: [
            'Hinge to a strong flat-back position',
            'Let bar hang below shoulders',
            'Pull elbows back toward lower ribs',
            'Lower under control'
        ],
        cue: 'torso stays still.',
        avoid: 'turning it into a shrug.'
    },
    'ppl-lat-pulldown': {
        title: 'Lat Pulldown',
        workout: 'Pull Day',
        prescription: '3 sets x 10-12 reps',
        steps: [
            'Sit tall and grip the wide bar',
            'Lean slightly back',
            'Pull elbows down to upper chest',
            'Return with control'
        ],
        cue: 'elbows drive down.',
        avoid: 'pulling behind the neck.'
    },
    'ppl-face-pull': {
        title: 'Cable Face Pull',
        workout: 'Pull Day',
        prescription: '3 sets x 15 reps',
        steps: [
            'Set rope around face height',
            'Step back with arms extended',
            'Pull toward nose or forehead',
            'Rotate thumbs back and control return'
        ],
        cue: 'elbows stay high and wide.',
        avoid: 'shrugging shoulders.'
    },
    'ppl-bicep-curl': {
        title: 'Dumbbell Bicep Curl',
        workout: 'Pull Day',
        prescription: '3 sets x 10-12 reps',
        steps: [
            'Stand tall with dumbbells by sides',
            'Keep elbows close to ribs',
            'Curl without shoulders rolling forward',
            'Lower slowly to full arm length'
        ],
        cue: 'squeeze at the top.',
        avoid: 'swinging the hips.'
    },
    'ppl-back-squat': {
        title: 'Barbell Back Squat',
        workout: 'Leg Day',
        prescription: '4 sets x 6-8 reps',
        steps: [
            'Set bar tight across upper back',
            'Brace before each rep',
            'Squat with knees tracking over toes',
            'Drive up through midfoot'
        ],
        cue: 'keep pressure through the midfoot.',
        avoid: 'folding into a good morning.'
    },
    'ppl-romanian-deadlift': {
        title: 'Barbell Romanian Deadlift',
        workout: 'Leg Day',
        prescription: '3 sets x 8-10 reps',
        steps: [
            'Stand tall with bar close',
            'Push hips back with slight knee bend',
            'Lower until hamstrings load',
            'Stand by driving hips forward'
        ],
        cue: 'bar stays close.',
        avoid: 'rounding the back.'
    },
    'ppl-leg-press': {
        title: 'Leg Press Machine',
        workout: 'Leg Day',
        prescription: '3 sets x 10-15 reps',
        steps: [
            'Set feet around mid-platform',
            'Brace and unlock the sled',
            'Lower knees toward chest with control',
            'Press without hard-locking knees'
        ],
        cue: 'keep full foot on the platform.',
        avoid: 'hips lifting from the pad.'
    },
    'ppl-calf-raise': {
        title: 'Standing Calf Raise Machine',
        workout: 'Leg Day',
        prescription: '4 sets x 15-20 reps',
        steps: [
            'Set shoulders under pads',
            'Lower heels into a stretch',
            'Drive up to tall toes',
            'Pause before lowering'
        ],
        cue: 'own the stretch at the bottom.',
        avoid: 'tiny bounce reps.'
    }
};

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

function initExerciseGuides() {
    const modal = document.getElementById('exerciseGuideModal');
    if (!modal) return;

    const panel = modal.querySelector('.exercise-modal-panel');
    const closeButton = modal.querySelector('.exercise-modal-close');
    const image = modal.querySelector('[data-exercise-modal-image]');
    const workout = modal.querySelector('[data-exercise-modal-workout]');
    const reps = modal.querySelector('[data-exercise-modal-reps]');
    const title = modal.querySelector('[data-exercise-modal-title]');
    const summary = modal.querySelector('[data-exercise-modal-summary]');
    const steps = modal.querySelector('[data-exercise-modal-steps]');
    const cue = modal.querySelector('[data-exercise-modal-cue]');
    const avoid = modal.querySelector('[data-exercise-modal-avoid]');
    const closeControls = modal.querySelectorAll('[data-exercise-close]');
    const cards = Array.from(document.querySelectorAll('.exercise-slide[data-exercise-id]'));
    const rows = Array.from(document.querySelectorAll('.exercise-row[data-exercise-id]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!panel || !image || !workout || !reps || !title || !summary || !steps || !cue || !avoid) {
        return;
    }

    let lastGuideTrigger = null;
    let selectedCardTimeout = null;
    let storedBodyOverflow = '';

    const findCard = (exerciseId) => cards.find((card) => card.dataset.exerciseId === exerciseId);
    const getMotionBehavior = () => reduceMotion.matches ? 'auto' : 'smooth';

    function focusWithoutScroll(element) {
        if (!element) return;

        try {
            element.focus({ preventScroll: true });
        } catch {
            element.focus();
        }
    }

    function getCardText(card, selector) {
        return card?.querySelector(selector)?.textContent.trim() || '';
    }

    function setActiveStep(activeIndex) {
        steps.querySelectorAll('.exercise-step').forEach((step, index) => {
            const isActive = index === activeIndex;
            step.classList.toggle('is-active', isActive);
            step.querySelector('button')?.setAttribute('aria-pressed', String(isActive));
        });
    }

    function buildSteps(guide) {
        steps.replaceChildren();

        guide.steps.forEach((stepText, index) => {
            const step = document.createElement('li');
            const button = document.createElement('button');
            const count = document.createElement('span');
            const copy = document.createElement('span');

            step.className = 'exercise-step';
            step.style.setProperty('--step-delay', `${index * 80}ms`);
            button.className = 'exercise-step-button';
            button.type = 'button';
            button.setAttribute('aria-pressed', 'false');
            count.className = 'exercise-step-count';
            count.textContent = String(index + 1).padStart(2, '0');
            copy.className = 'exercise-step-copy';
            copy.textContent = stepText;

            button.append(count, copy);
            step.append(button);
            steps.append(step);

            button.addEventListener('click', () => {
                setActiveStep(index);
            });
        });

        setActiveStep(0);
    }

    function populateGuide(exerciseId) {
        const guide = EXERCISE_GUIDES[exerciseId];
        const card = findCard(exerciseId);
        const cardImage = card?.querySelector('img');

        if (!guide || !card || !cardImage) return false;

        image.src = cardImage.getAttribute('src') || '';
        image.alt = `${cardImage.alt || guide.title} expanded exercise guide`;
        workout.textContent = guide.workout || getCardText(card, '.exercise-chip');
        reps.textContent = guide.prescription || getCardText(card, '.exercise-prescription');
        title.textContent = guide.title;
        summary.textContent = getCardText(card, '.exercise-slide-body p');
        cue.textContent = guide.cue;
        avoid.textContent = guide.avoid;
        buildSteps(guide);

        return true;
    }

    function highlightExerciseCard(exerciseId) {
        const card = findCard(exerciseId);
        if (!card) return;

        if (selectedCardTimeout) {
            window.clearTimeout(selectedCardTimeout);
        }

        cards.forEach((exerciseCard) => exerciseCard.classList.remove('is-selected'));
        card.classList.add('is-selected');

        selectedCardTimeout = window.setTimeout(() => {
            card.classList.remove('is-selected');
        }, reduceMotion.matches ? 900 : 1800);
    }

    function centerExerciseCard(exerciseId) {
        const card = findCard(exerciseId);
        const track = card?.closest('[data-carousel-track]');
        const section = card?.closest('.exercise-gallery');

        if (!card || !track) return;

        section?.scrollIntoView({ block: 'center', behavior: getMotionBehavior() });

        const targetLeft = card.offsetLeft - ((track.clientWidth - card.clientWidth) / 2);
        track.scrollTo({
            left: Math.max(0, targetLeft),
            behavior: getMotionBehavior()
        });

        highlightExerciseCard(exerciseId);
    }

    function openGuide(exerciseId, trigger) {
        if (!populateGuide(exerciseId)) return;

        lastGuideTrigger = trigger instanceof HTMLElement ? trigger : null;
        storedBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');

        window.requestAnimationFrame(() => {
            const focusTarget = closeButton || panel;
            focusWithoutScroll(focusTarget);
            window.setTimeout(() => focusWithoutScroll(focusTarget), 80);
        });
    }

    function closeGuide() {
        if (!modal.classList.contains('is-open')) return;

        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = storedBodyOverflow;

        if (lastGuideTrigger?.isConnected) {
            focusWithoutScroll(lastGuideTrigger);
        }
    }

    function openFromCard(card) {
        const exerciseId = card.dataset.exerciseId;
        openGuide(exerciseId, card);
    }

    function openFromRow(row) {
        const exerciseId = row.dataset.exerciseId;
        centerExerciseCard(exerciseId);
        window.setTimeout(() => {
            openGuide(exerciseId, row);
        }, reduceMotion.matches ? 0 : 320);
    }

    function handleKeyboardOpen(event, openAction) {
        if (event.key !== 'Enter' && event.key !== ' ') return;

        event.preventDefault();
        openAction();
    }

    function trapModalFocus(event) {
        if (event.key !== 'Tab' || !modal.classList.contains('is-open')) return;

        const focusable = Array.from(modal.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])'))
            .filter((element) => !element.hasAttribute('disabled') && element.offsetParent !== null);

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    cards.forEach((card) => {
        card.addEventListener('click', () => openFromCard(card));
        card.addEventListener('keydown', (event) => {
            handleKeyboardOpen(event, () => openFromCard(card));
        });
    });

    rows.forEach((row) => {
        row.addEventListener('click', () => openFromRow(row));
        row.addEventListener('keydown', (event) => {
            handleKeyboardOpen(event, () => openFromRow(row));
        });
    });

    closeControls.forEach((control) => {
        control.addEventListener('click', closeGuide);
    });

    modal.addEventListener('keydown', trapModalFocus);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeGuide();
        }
    });
}
