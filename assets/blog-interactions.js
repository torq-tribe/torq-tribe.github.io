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
    },
    // Reddit-informed article guides
    'anxiety-lobby-checkin': {
        title: 'Lobby Check-In',
        workout: 'Arrival',
        prescription: '2 minutes',
        steps: [
            'Enter during an off-peak window if possible',
            'Check in and put keys or bag away',
            'Take one slow breath before moving on',
            'Choose the first station from your plan'
        ],
        cue: 'act like you are running a simple errand.',
        avoid: 'turning the first visit into a full gym tour.'
    },
    'anxiety-walking-warmup': {
        title: 'Easy Walking Warm-Up',
        workout: 'Warm-Up',
        prescription: '5 minutes',
        steps: [
            'Set a pace where conversation is possible',
            'Relax the shoulders and jaw',
            'Breathe through the nose when you can',
            'Step off before you feel rushed'
        ],
        cue: 'finish warmer, not tired.',
        avoid: 'turning the warm-up into a cardio test.'
    },
    'anxiety-machine-tour': {
        title: 'Simple Machine Tour',
        workout: 'Orientation',
        prescription: '3 stops',
        steps: [
            'Pick one push, one pull, and one leg machine',
            'Read the movement path before sitting down',
            'Set the pin lighter than you think',
            'Do five practice reps slowly'
        ],
        cue: 'learn the setup before chasing effort.',
        avoid: 'changing every setting at once.'
    },
    'anxiety-light-chest-press': {
        title: 'Light Chest Press',
        workout: 'Push',
        prescription: '2 sets x 8 reps',
        steps: [
            'Set handles around mid-chest height',
            'Plant feet and sit tall',
            'Press until arms are almost straight',
            'Return until elbows are slightly behind ribs'
        ],
        cue: 'move the handles smoothly both ways.',
        avoid: 'locking elbows hard or shrugging.'
    },
    'anxiety-seated-row': {
        title: 'Seated Row',
        workout: 'Pull',
        prescription: '2 sets x 8 reps',
        steps: [
            'Sit tall with feet braced',
            'Reach without rounding hard',
            'Pull elbows toward lower ribs',
            'Return slowly until arms lengthen'
        ],
        cue: 'elbows travel back, not up.',
        avoid: 'jerking the handle with the low back.'
    },
    'anxiety-leg-press': {
        title: 'Beginner Leg Press',
        workout: 'Legs',
        prescription: '2 sets x 10 reps',
        steps: [
            'Place feet about shoulder-width on the platform',
            'Lower until knees bend comfortably',
            'Press through the full foot',
            'Stop before knees lock hard'
        ],
        cue: 'keep hips heavy on the seat.',
        avoid: 'letting heels lift off the platform.'
    },
    'anxiety-repeatable-plan': {
        title: 'Leave With a Repeatable Plan',
        workout: 'Exit',
        prescription: '1 note',
        steps: [
            'Record each machine and weight used',
            'Note one setup adjustment to remember',
            'Pick the next visit day',
            'Leave before you feel drained'
        ],
        cue: 'repeatability is the real first-day win.',
        avoid: 'adding extra work because you feel guilty.'
    },
    'etiquette-rerack-weights': {
        title: 'Rerack Weights',
        workout: 'Equipment',
        prescription: 'After every set-up',
        steps: [
            'Strip plates when you finish',
            'Match dumbbells by number or size',
            'Return cable handles to their hooks',
            'Check the area before you leave'
        ],
        cue: 'reset the station for the next person.',
        avoid: 'assuming someone else wants your loaded bar.'
    },
    'etiquette-wipe-bench': {
        title: 'Wipe Equipment',
        workout: 'Cleanliness',
        prescription: '10 seconds',
        steps: [
            'Find the nearest towel or spray station',
            'Wipe pads your body touched',
            'Let the surface dry briefly',
            'Throw away disposable wipes'
        ],
        cue: 'clean the contact points.',
        avoid: 'spraying electronics or weight stacks directly.'
    },
    'etiquette-clear-walkway': {
        title: 'Keep Walkways Clear',
        workout: 'Space',
        prescription: 'Always',
        steps: [
            'Scan for racks, benches, and paths',
            'Keep your bag against a wall or cubby',
            'Step aside between sets',
            'Leave room for spotters and lifters'
        ],
        cue: 'busy zones need breathing room.',
        avoid: 'camping in front of dumbbell racks.'
    },
    'etiquette-work-in': {
        title: 'Ask to Work In',
        workout: 'Sharing',
        prescription: 'One sentence',
        steps: [
            'Wait until their set is done',
            'Ask how many sets remain',
            'Ask to work in if weights are easy to swap',
            'Respect the answer and move on'
        ],
        cue: 'be brief and friendly.',
        avoid: 'interrupting mid-rep or standing too close.'
    },
    'etiquette-privacy': {
        title: 'Respect Filming Privacy',
        workout: 'Privacy',
        prescription: 'Every clip',
        steps: [
            'Film only when it helps your form',
            'Aim away from other people',
            'Keep tripods out of paths',
            'Delete clips that catch strangers clearly'
        ],
        cue: 'your form check should not become someone else\'s problem.',
        avoid: 'blocking equipment for a long recording setup.'
    },
    'etiquette-ask-help': {
        title: 'Ask for Help',
        workout: 'Support',
        prescription: 'When unsure',
        steps: [
            'Ask staff first when available',
            'Keep the question specific',
            'Thank them and try the adjustment',
            'Write the setting down for next time'
        ],
        cue: 'specific questions get useful answers.',
        avoid: 'asking someone to coach your whole workout mid-session.'
    },
    'overweight-chair-sit-to-stand': {
        title: 'Chair Sit-to-Stand',
        workout: 'Lower body',
        prescription: '2-3 sets x 6-10 reps',
        steps: [
            'Sit near the front edge of a sturdy chair',
            'Place feet under knees',
            'Lean forward slightly and stand tall',
            'Sit back down under control'
        ],
        cue: 'push the floor away through your whole foot.',
        avoid: 'dropping into the chair at the bottom.'
    },
    'overweight-wall-pushup': {
        title: 'Wall Push-Up',
        workout: 'Upper body',
        prescription: '2-3 sets x 8-12 reps',
        steps: [
            'Stand arm-length from a wall',
            'Place hands slightly wider than shoulders',
            'Lower chest toward the wall',
            'Press back without shrugging'
        ],
        cue: 'keep body tall from shoulders to heels.',
        avoid: 'letting elbows flare straight out.'
    },
    'overweight-seated-row': {
        title: 'Seated Machine Row',
        workout: 'Upper back',
        prescription: '2-3 sets x 8-12 reps',
        steps: [
            'Sit tall with chest supported if available',
            'Start with arms long',
            'Pull elbows toward lower ribs',
            'Return slowly to the start'
        ],
        cue: 'squeeze shoulder blades gently.',
        avoid: 'yanking with the low back.'
    },
    'overweight-recumbent-bike': {
        title: 'Recumbent Bike',
        workout: 'Cardio',
        prescription: '6-12 easy minutes',
        steps: [
            'Set the seat so knees stay slightly bent',
            'Choose a light resistance',
            'Pedal at a pace you can sustain',
            'Stop while you could still do more'
        ],
        cue: 'finish feeling warmed up, not crushed.',
        avoid: 'starting with sprint intervals.'
    },
    'overweight-supported-step-up': {
        title: 'Supported Step-Up',
        workout: 'Balance',
        prescription: '2 sets x 5-8 / side',
        steps: [
            'Choose a low stable step',
            'Hold a rail or wall lightly',
            'Step up through the front foot',
            'Step down slowly and reset'
        ],
        cue: 'make each rep quiet and controlled.',
        avoid: 'using a step so high you have to lunge.'
    },
    'overweight-farmer-carry': {
        title: 'Farmer Carry',
        workout: 'Full body',
        prescription: '3 walks x 20-40 steps',
        steps: [
            'Hold light weights at your sides',
            'Stand tall before walking',
            'Take short steady steps',
            'Set weights down before posture breaks'
        ],
        cue: 'walk like you are balancing a bowl on your head.',
        avoid: 'leaning backward or rushing.'
    },
    'tools-chest-press-machine': {
        title: 'Chest Press Machine',
        workout: 'Machine push',
        prescription: 'Best for learning pressing',
        steps: [
            'Set handles around mid-chest',
            'Sit tall with feet planted',
            'Press smoothly until arms nearly straighten',
            'Return with elbows controlled'
        ],
        cue: 'use the machine to learn the pattern.',
        avoid: 'maxing out before the movement feels clean.'
    },
    'tools-dumbbell-press': {
        title: 'Dumbbell Press',
        workout: 'Free-weight push',
        prescription: 'Best for control',
        steps: [
            'Set shoulder blades before pressing',
            'Start with dumbbells over elbows',
            'Lower until upper arms are comfortable',
            'Press without crashing weights together'
        ],
        cue: 'wrists stay stacked over elbows.',
        avoid: 'letting weights drift behind the shoulders.'
    },
    'tools-incline-pushup': {
        title: 'Incline Push-Up',
        workout: 'Bodyweight push',
        prescription: 'Best for convenience',
        steps: [
            'Place hands on a bench or rail',
            'Walk feet back until body is straight',
            'Lower chest toward hands',
            'Press the surface away'
        ],
        cue: 'make the body one long plank.',
        avoid: 'sagging hips or craning the neck.'
    },
    'tools-seated-row-machine': {
        title: 'Seated Row Machine',
        workout: 'Machine pull',
        prescription: 'Best for back feel',
        steps: [
            'Set seat and chest support if available',
            'Reach forward with control',
            'Pull elbows toward ribs',
            'Return without rounding hard'
        ],
        cue: 'pull with elbows, not hands.',
        avoid: 'leaning back to finish the rep.'
    },
    'tools-dumbbell-row': {
        title: 'Dumbbell Row',
        workout: 'Free-weight pull',
        prescription: 'Best for home gyms',
        steps: [
            'Brace one hand on a bench or thigh',
            'Let the dumbbell hang under shoulder',
            'Pull elbow toward hip',
            'Lower until arm is long again'
        ],
        cue: 'keep ribs square to the floor.',
        avoid: 'twisting the torso for momentum.'
    },
    'tools-goblet-squat': {
        title: 'Goblet Squat',
        workout: 'Free-weight legs',
        prescription: 'Best for squat practice',
        steps: [
            'Hold the weight close to chest',
            'Set feet just outside hips',
            'Sit down between the knees',
            'Drive up through the full foot'
        ],
        cue: 'elbows point down as chest stays tall.',
        avoid: 'folding forward as you stand.'
    },
    'cardio-walking-warmup': {
        title: '5-Minute Warm-Up Walk',
        workout: 'Before weights',
        prescription: '5 minutes easy',
        steps: [
            'Start at a relaxed pace',
            'Add a slight incline only if comfortable',
            'Keep breathing steady',
            'Stop while legs still feel fresh'
        ],
        cue: 'warm, not tired.',
        avoid: 'turning the warm-up into a workout.'
    },
    'cardio-strength-first': {
        title: 'Strength-First Lift',
        workout: 'Main goal',
        prescription: 'Lift before long cardio',
        steps: [
            'Warm up briefly',
            'Do the hardest lift first',
            'Keep rest periods controlled',
            'Log weights and reps before cardio'
        ],
        cue: 'spend your best energy on the main lift.',
        avoid: 'pre-fatiguing with hard intervals.'
    },
    'cardio-post-lift-zone-2': {
        title: 'Post-Lift Zone 2',
        workout: 'After weights',
        prescription: '10-25 minutes easy',
        steps: [
            'Choose bike, incline walk, or easy row',
            'Keep effort conversational',
            'Stay relaxed through shoulders',
            'End before form or mood crashes'
        ],
        cue: 'you should be able to talk.',
        avoid: 'chasing a suffer score after every lift.'
    },
    'cardio-separate-day': {
        title: 'Separate Cardio Day',
        workout: 'Endurance',
        prescription: '20-40 minutes',
        steps: [
            'Pick a day away from heavy legs when possible',
            'Warm up gradually',
            'Hold a sustainable pace',
            'Recover before the next hard lift'
        ],
        cue: 'separation keeps quality high.',
        avoid: 'stacking hard cardio before heavy squats.'
    },
    'cardio-recovery-walk': {
        title: 'Easy Recovery Walk',
        workout: 'Recovery',
        prescription: '10-30 minutes',
        steps: [
            'Walk at a pace that feels restorative',
            'Keep posture tall and relaxed',
            'Use it after meals if helpful',
            'Stop if soreness worsens sharply'
        ],
        cue: 'leave feeling better than when you started.',
        avoid: 'turning every walk into a timed test.'
    },
    'recomp-maintenance-lift': {
        title: 'Maintenance + Lifting',
        workout: 'Recomp',
        prescription: 'Best unsure default',
        steps: [
            'Pick a beginner lifting plan',
            'Eat similar portions most days',
            'Hit protein consistently',
            'Review strength and waist trend'
        ],
        cue: 'let training create the signal.',
        avoid: 'changing calories after one bad mirror day.'
    },
    'recomp-small-deficit-meal': {
        title: 'Small Deficit',
        workout: 'Cut',
        prescription: 'If fat loss is priority',
        steps: [
            'Reduce portions slightly',
            'Keep protein high',
            'Lift to maintain or gain strength',
            'Track energy and mood'
        ],
        cue: 'small and sustainable beats aggressive.',
        avoid: 'crashing calories until training suffers.'
    },
    'recomp-lean-surplus-meal': {
        title: 'Lean Surplus',
        workout: 'Bulk',
        prescription: 'If already lean',
        steps: [
            'Add one small daily serving',
            'Keep protein steady',
            'Push progressive overload',
            'Watch waist gain rate'
        ],
        cue: 'gain slowly enough to train better.',
        avoid: 'using a bulk as permission to ignore nutrition.'
    },
    'recomp-protein-target': {
        title: 'Protein Target',
        workout: 'Nutrition',
        prescription: 'Daily anchor',
        steps: [
            'Choose a realistic daily target',
            'Place protein in each meal',
            'Use simple repeatable foods',
            'Adjust only after a few weeks'
        ],
        cue: 'consistency matters more than perfect timing.',
        avoid: 'saving all protein for one meal.'
    },
    'recomp-progress-tracking': {
        title: 'Photos and Measurements',
        workout: 'Tracking',
        prescription: 'Weekly',
        steps: [
            'Take photos in the same lighting',
            'Measure waist at the same time of day',
            'Log key lift numbers',
            'Compare weekly averages'
        ],
        cue: 'look for trends, not single days.',
        avoid: 'making decisions from one weigh-in.'
    },
    'recomp-eight-week-review': {
        title: '8-Week Reassessment',
        workout: 'Review',
        prescription: 'Every 8 weeks',
        steps: [
            'Review strength changes',
            'Check waist and photo trend',
            'Ask how energy and adherence felt',
            'Choose one direction for the next block'
        ],
        cue: 'decide from data and consistency.',
        avoid: 'pivoting because of one rough week.'
    },
    'sore-warmup-test': {
        title: 'Mild Soreness Warm-Up',
        workout: 'Test',
        prescription: '5-10 minutes',
        steps: [
            'Start with walking or cycling',
            'Add easy range-of-motion reps',
            'Notice whether movement improves',
            'Choose the session only after the test'
        ],
        cue: 'movement should feel better, not worse.',
        avoid: 'deciding from the first stiff step.'
    },
    'sore-form-check': {
        title: 'Form Check',
        workout: 'Technique',
        prescription: 'First warm-up sets',
        steps: [
            'Use an empty bar or light weight',
            'Film one easy set if useful',
            'Check range of motion and control',
            'Proceed only if reps look normal'
        ],
        cue: 'normal movement is the green light.',
        avoid: 'forcing heavy work with altered form.'
    },
    'sore-active-recovery-walk': {
        title: 'Active Recovery Walk',
        workout: 'Recovery',
        prescription: '10-30 minutes',
        steps: [
            'Choose a relaxed route',
            'Keep pace conversational',
            'Let arms swing naturally',
            'Stop before fatigue builds'
        ],
        cue: 'finish looser than you started.',
        avoid: 'turning recovery into punishment cardio.'
    },
    'sore-swap-muscle-group': {
        title: 'Swap Muscle Group',
        workout: 'Adjustment',
        prescription: 'Same day option',
        steps: [
            'Identify the sore area',
            'Pick movements that do not aggravate it',
            'Keep effort moderate',
            'Return to the original plan next session'
        ],
        cue: 'train around soreness, not through pain.',
        avoid: 'using swaps to dodge every hard exercise.'
    },
    'sore-deload-session': {
        title: 'Deload Session',
        workout: 'Lower stress',
        prescription: '50-70% normal work',
        steps: [
            'Cut load or sets by about one-third',
            'Move every rep cleanly',
            'Skip grinders and finishers',
            'Log how recovery feels later'
        ],
        cue: 'leave the gym fresher than usual.',
        avoid: 'turning a deload into a secret max day.'
    },
    'sore-rest-day': {
        title: 'Rest Day',
        workout: 'Full recovery',
        prescription: '24-48 hours',
        steps: [
            'Sleep and hydrate normally',
            'Eat enough protein and regular meals',
            'Do light mobility if it feels good',
            'Return when movement is normal'
        ],
        cue: 'rest supports the next good session.',
        avoid: 'earning rest only after burnout.'
    },
    'bodyweight-incline-pushup': {
        title: 'Wall or Incline Push-Up',
        workout: 'Push',
        prescription: '3 sets x 8-15 reps',
        steps: [
            'Place hands on a wall, bench, or rail',
            'Walk feet back to a straight body line',
            'Lower chest toward the surface',
            'Press away without shrugging'
        ],
        cue: 'make every rep look identical.',
        avoid: 'sagging hips as fatigue builds.'
    },
    'bodyweight-squat': {
        title: 'Bodyweight Squat',
        workout: 'Legs',
        prescription: '3 sets x 10-20 reps',
        steps: [
            'Set feet around shoulder-width',
            'Reach arms forward for balance',
            'Sit down between the knees',
            'Stand by pushing through the full foot'
        ],
        cue: 'knees track the same direction as toes.',
        avoid: 'cutting depth shorter every rep.'
    },
    'bodyweight-split-squat': {
        title: 'Split Squat',
        workout: 'Single leg',
        prescription: '2-3 sets x 6-12 / side',
        steps: [
            'Step into a long stable stance',
            'Keep torso tall',
            'Lower until back knee approaches the floor',
            'Drive through the front foot to stand'
        ],
        cue: 'move straight down and up.',
        avoid: 'front knee collapsing inward.'
    },
    'bodyweight-inverted-row': {
        title: 'Inverted or Table Row',
        workout: 'Pull',
        prescription: '3 sets x 6-12 reps',
        steps: [
            'Use a sturdy table, bar, or rings',
            'Set body in a straight line',
            'Pull chest toward the edge or bar',
            'Lower until arms are long'
        ],
        cue: 'pull elbows toward ribs.',
        avoid: 'using a wobbly surface.'
    },
    'bodyweight-plank': {
        title: 'Forearm Plank',
        workout: 'Core',
        prescription: '3 holds x 20-45 sec',
        steps: [
            'Set elbows under shoulders',
            'Step feet back and squeeze glutes',
            'Keep ribs pulled down gently',
            'Stop before hips sag'
        ],
        cue: 'hold a long straight line.',
        avoid: 'holding past clean position.'
    },
    'bodyweight-dead-bug': {
        title: 'Dead Bug',
        workout: 'Core control',
        prescription: '3 sets x 6-10 / side',
        steps: [
            'Lie on back with arms up and knees bent',
            'Brace so low back stays quiet',
            'Extend opposite arm and leg slowly',
            'Return and switch sides'
        ],
        cue: 'move slowly enough to stay stable.',
        avoid: 'arching the low back off the floor.'
    }
    // End Reddit-informed article guides
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
