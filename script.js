const planetData = {
    sun: {
        name: "The Sun",
        type: "Yellow Dwarf Star",
        img: "sun.png",
        desc: "The Sun is the heart of our Solar System. Its massive gravity holds all planets in orbit, and its nuclear fusion provides the heat and light that sustain life on Earth.",
        distance: "0 km (Center)",
        day: "27 Earth Days",
        temp: "5,500°C",
        moons: "8 Planets"
    },
    mercury: {
        name: "Mercury",
        type: "Terrestrial Planet",
        img: "mercury.png",
        desc: "The smallest and innermost planet in the Solar System. Mercury speeds around the Sun every 88 days, experiencing extreme temperature swings.",
        distance: "57.9M km",
        day: "59 Earth Days",
        temp: "167°C",
        moons: "0"
    },
    venus: {
        name: "Venus",
        type: "Terrestrial Planet",
        img: "venus.png",
        desc: "Often called Earth's twin due to similar size, Venus has a thick toxic atmosphere that traps heat, making it the hottest planet in our Solar System.",
        distance: "108.2M km",
        day: "243 Earth Days",
        temp: "464°C",
        moons: "0"
    },
    earth: {
        name: "Earth",
        type: "Terrestrial Planet",
        img: "earth.png",
        desc: "Our home world and the only known planet to harbor life. About 71% of Earth's surface is covered with liquid water oceans.",
        distance: "149.6M km",
        day: "24 Hours",
        temp: "15°C",
        moons: "1"
    },
    mars: {
        name: "Mars",
        type: "Terrestrial Planet",
        img: "mars.png",
        desc: "Known as the Red Planet due to iron oxide on its surface. Mars hosts Olympus Mons, the largest volcano in the Solar System.",
        distance: "227.9M km",
        day: "24.6 Hours",
        temp: "-65°C",
        moons: "2"
    },
    jupiter: {
        name: "Jupiter",
        type: "Gas Giant",
        img: "jupiter.png",
        desc: "The largest planet in our Solar System—more than twice as massive as all other planets combined. Famous for its Great Red Spot storm.",
        distance: "778.5M km",
        day: "9.9 Hours",
        temp: "-110°C",
        moons: "95"
    },
    saturn: {
        name: "Saturn",
        type: "Gas Giant",
        img: "saturn.png",
        desc: "Adorned with a dazzling system of icy rings, Saturn is a gas giant composed mostly of hydrogen and helium.",
        distance: "1.43B km",
        day: "10.7 Hours",
        temp: "-140°C",
        moons: "146"
    },
    uranus: {
        name: "Uranus",
        type: "Ice Giant",
        img: "uranus.png",
        desc: "An ice giant with a pale cyan color caused by methane gas. Uranus rotates on its side at a nearly 98-degree tilt.",
        distance: "2.87B km",
        day: "17.2 Hours",
        temp: "-195°C",
        moons: "28"
    },
    neptune: {
        name: "Neptune",
        type: "Ice Giant",
        img: "neptune.png",
        desc: "The farthest major planet from the Sun. Neptune is dark, cold, and whipped by supersonic winds faster than the speed of sound.",
        distance: "4.5B km",
        day: "16.1 Hours",
        temp: "-200°C",
        moons: "16"
    }
};

const planets = document.querySelectorAll('[data-planet]');
const infoCard = document.getElementById('infoCard');
const closeCardBtn = document.getElementById('closeCard');
const compareCard = document.getElementById('compareCard');
const closeCompareBtn = document.getElementById('closeCompare');
const compareModeBtn = document.getElementById('compareModeBtn');
const toggleAnimBtn = document.getElementById('toggleAnimBtn');
const toggleViewBtn = document.getElementById('toggleViewBtn');
const toggleOrbitBtn = document.getElementById('toggleOrbitBtn');
const speedSlider = document.getElementById('speedSlider');
const speedVal = document.getElementById('speedVal');
const yearCounter = document.getElementById('yearCounter');
const universe = document.getElementById('universe');
const orbits = document.querySelectorAll('.orbit');
const quickNavBtns = document.querySelectorAll('[data-select]');

function openPlanetInfo(key) {
    const data = planetData[key];
    if (!data) return;

    planets.forEach(p => p.classList.remove('selected-planet'));
    const targetImg = document.querySelector(`[data-planet="${key}"]`);
    if (targetImg) targetImg.classList.add('selected-planet');

    document.getElementById('cardImg').src = data.img;
    document.getElementById('cardTitle').textContent = data.name;
    document.getElementById('cardType').textContent = data.type;
    document.getElementById('cardDesc').textContent = data.desc;
    document.getElementById('cardDist').textContent = data.distance;
    document.getElementById('cardDay').textContent = data.day;
    document.getElementById('cardTemp').textContent = data.temp;
    document.getElementById('cardMoons').textContent = data.moons;

    compareCard.classList.add('hidden');
    infoCard.classList.remove('hidden');
}

planets.forEach(planet => {
    planet.addEventListener('click', (e) => {
        e.stopPropagation();
        openPlanetInfo(planet.getAttribute('data-planet'));
    });
});

quickNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        openPlanetInfo(btn.getAttribute('data-select'));
    });
});

closeCardBtn.addEventListener('click', () => {
    infoCard.classList.add('hidden');
    planets.forEach(p => p.classList.remove('selected-planet'));
});

let isPaused = false;
toggleAnimBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    universe.classList.toggle('paused', isPaused);
    toggleAnimBtn.textContent = isPaused ? 'Resume' : 'Pause';
});

let is3D = true;
toggleViewBtn.addEventListener('click', () => {
    is3D = !is3D;
    universe.classList.toggle('tilted', is3D);
    toggleViewBtn.textContent = is3D ? '2D Top View' : '3D Tilt View';
});

let axisHidden = false;
toggleOrbitBtn.addEventListener('click', () => {
    axisHidden = !axisHidden;
    orbits.forEach(orbit => orbit.classList.toggle('hide-axis', axisHidden));
    toggleOrbitBtn.textContent = axisHidden ? 'Show Axis' : 'Hide Axis';
});

let speedMultiplier = 1;
speedSlider.addEventListener('input', () => {
    speedMultiplier = parseFloat(speedSlider.value);
    speedVal.textContent = speedMultiplier.toFixed(1) + 'x';

    document.querySelectorAll('[data-base]').forEach(el => {
        const base = parseFloat(el.getAttribute('data-base'));
        el.style.animationDuration = (base / speedMultiplier) + 's';
    });
});

let currentYear = 2026;
let lastTime = performance.now();
function updateYear(now) {
    const dt = (now - lastTime) / 1000;
    lastTime = now;
    if (!isPaused) {
        currentYear += (dt / 25) * speedMultiplier;
        yearCounter.textContent = Math.floor(currentYear);
    }
    requestAnimationFrame(updateYear);
}
requestAnimationFrame(updateYear);

const asteroidBelt = document.getElementById('asteroidBelt');
const beltRadius = 226;
for (let i = 0; i < 110; i++) {
    const rock = document.createElement('div');
    rock.className = 'asteroid';
    const angle = (i / 110) * Math.PI * 2 + Math.random() * 0.2;
    const r = beltRadius + (Math.random() * 14 - 7);
    const x = beltRadius + r * Math.cos(angle);
    const y = beltRadius + r * Math.sin(angle);
    const size = Math.random() * 2.5 + 1.2;
    rock.style.width = size + 'px';
    rock.style.height = size + 'px';
    rock.style.left = x + 'px';
    rock.style.top = y + 'px';
    asteroidBelt.appendChild(rock);
}

const selectA = document.getElementById('selectA');
const selectB = document.getElementById('selectB');
const compareTable = document.getElementById('compareTable');

Object.keys(planetData).forEach(key => {
    const optA = new Option(planetData[key].name, key);
    const optB = new Option(planetData[key].name, key);
    selectA.add(optA);
    selectB.add(optB);
});
selectA.value = 'earth';
selectB.value = 'mars';

function renderComparison() {
    const a = planetData[selectA.value];
    const b = planetData[selectB.value];
    compareTable.innerHTML = `
        <div class="compare-row"><strong>${a.name}</strong><span>Metric</span><strong>${b.name}</strong></div>
        <div class="compare-row"><span>${a.type}</span><span>Type</span><span>${b.type}</span></div>
        <div class="compare-row"><span>${a.distance}</span><span>Distance</span><span>${b.distance}</span></div>
        <div class="compare-row"><span>${a.day}</span><span>Day</span><span>${b.day}</span></div>
        <div class="compare-row"><span>${a.temp}</span><span>Temp</span><span>${b.temp}</span></div>
        <div class="compare-row"><span>${a.moons}</span><span>Moons</span><span>${b.moons}</span></div>
    `;
}

selectA.addEventListener('change', renderComparison);
selectB.addEventListener('change', renderComparison);

compareModeBtn.addEventListener('click', () => {
    infoCard.classList.add('hidden');
    renderComparison();
    compareCard.classList.remove('hidden');
});

closeCompareBtn.addEventListener('click', () => {
    compareCard.classList.add('hidden');
});

const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');
let stars = [];
let shootingStars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({ length: 160 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.3,
        alpha: Math.random(),
        delta: (Math.random() * 0.02) + 0.005
    }));
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function spawnShootingStar() {
    shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.4),
        len: Math.random() * 90 + 60,
        speed: Math.random() * 10 + 8,
        alpha: 1
    });
}
setInterval(spawnShootingStar, 4500);

function animateSpace() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => {
        s.alpha += s.delta;
        if (s.alpha >= 1 || s.alpha <= 0.15) s.delta *= -1;
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
    });

    shootingStars.forEach((ss, idx) => {
        ss.x += ss.speed;
        ss.y += ss.speed * 0.5;
        ss.alpha -= 0.02;

        const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.len, ss.y - ss.len * 0.5);
        grad.addColorStop(0, `rgba(255, 255, 255, ${ss.alpha})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.len, ss.y - ss.len * 0.5);
        ctx.stroke();

        if (ss.alpha <= 0) shootingStars.splice(idx, 1);
    });

    requestAnimationFrame(animateSpace);
}
animateSpace();