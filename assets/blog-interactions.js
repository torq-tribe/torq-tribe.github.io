document.addEventListener('DOMContentLoaded', () => {
    initMatterPhysics();
    initMagneticHover();
    initScrollProgress();
});

function initMatterPhysics() {
    const canvas = document.getElementById('gravity-bg');
    if (!canvas || typeof Matter === 'undefined') return;

    // Matter.js module aliases
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint;

    // Create an engine
    const engine = Engine.create();
    
    // Create a renderer
    const render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            background: 'transparent',
            wireframes: false,
            pixelRatio: window.devicePixelRatio
        }
    });

    // Get colors from CSS variables
    const style = getComputedStyle(document.body);
    const primaryColor = style.getPropertyValue('--primary').trim() || '#e0b85b';
    const accentColor = style.getPropertyValue('--accent').trim() || '#2f8b76';
    
    // Convert hex to solid hex for Matter.js
    function rgb2hex(rgb){
         rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
         return (rgb && rgb.length === 4) ? "#" +
          ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
          ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
          ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    }
    
    // Fallback if variables are already hex
    const color1 = primaryColor.startsWith('#') ? primaryColor : rgb2hex(primaryColor) || '#e0b85b';
    const color2 = accentColor.startsWith('#') ? accentColor : rgb2hex(accentColor) || '#2f8b76';

    const bodies = [];
    const numShapes = Math.min(12, Math.floor(window.innerWidth / 100)); // Responsive density

    // Create organic looking shapes (circles, soft polygons)
    for (let i = 0; i < numShapes; i++) {
        const radius = Math.random() * 80 + 40;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * -500 - 100; // Drop from above screen
        
        const isCircle = Math.random() > 0.5;
        const color = Math.random() > 0.5 ? color1 : color2;
        
        let body;
        if (isCircle) {
            body = Bodies.circle(x, y, radius, {
                restitution: 0.6,
                friction: 0.1,
                render: {
                    fillStyle: color,
                    opacity: 0.15 // Translucent like glass
                }
            });
        } else {
            body = Bodies.polygon(x, y, Math.floor(Math.random() * 3) + 5, radius, {
                restitution: 0.5,
                chamfer: { radius: radius * 0.4 }, // Soft rounded corners
                render: {
                    fillStyle: color,
                    opacity: 0.12
                }
            });
        }
        bodies.push(body);
    }

    // Walls & Floor
    const wallOptions = { 
        isStatic: true, 
        render: { visible: false } 
    };
    
    const floor = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth * 2, 100, wallOptions);
    const leftWall = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight * 2, wallOptions);
    const rightWall = Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight * 2, wallOptions);

    // Add all bodies to the world
    Composite.add(engine.world, [...bodies, floor, leftWall, rightWall]);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    Composite.add(engine.world, mouseConstraint);
    
    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Run the renderer
    Render.run(render);

    // Create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Handle Resize
    window.addEventListener('resize', () => {
        render.bounds.max.x = window.innerWidth;
        render.bounds.max.y = window.innerHeight;
        render.options.width = window.innerWidth;
        render.options.height = window.innerHeight;
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;

        // Reposition floor and walls
        Matter.Body.setPosition(floor, { x: window.innerWidth / 2, y: window.innerHeight + 50 });
        Matter.Body.setPosition(rightWall, { x: window.innerWidth + 50, y: window.innerHeight / 2 });
        Matter.Body.setPosition(leftWall, { x: -50, y: window.innerHeight / 2 });
    });
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
