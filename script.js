const fruitsData = [
    { id: 'kiwi', title: 'KIWI', subtitle: 'Tangy & Fresh', bg: 'kiwi-bg.webp', videoBg: './assets/videos/kiwi-fruit.mp4', bottle: 'kiwi-bottle.webp', fruit: 'kiwi-fruit.webp', color: '#8DC63F', stat: '110', label: 'CALORIES', f1: 'High in Vitamin C', f2: 'Aids Digestion', f3: 'Immunity Booster' },
    { id: 'strawberry', title: 'STRAWBERRY', subtitle: 'Sweet & Refreshing', bg: 'strawberry-bg.webp', videoBg: './assets/videos/strawberry-fruit.mp4', bottle: 'strawberry-bottle.webp', fruit: 'strawberry-fruit.webp', color: '#ED1C24', stat: '95', label: 'CALORIES', f1: 'Antioxidant Rich', f2: 'Heart Healthy', f3: 'Zero Fat' },
    { id: 'mango', title: 'MANGO', subtitle: 'Tropical Delight', bg: 'mango-bg.webp', videoBg: './assets/videos/mango-fruit.mp4', bottle: 'mango-bottle.webp', fruit: 'mango-fruit.webp', color: '#F7931E', stat: '130', label: 'CALORIES', f1: 'Rich in Vitamin A', f2: 'Energy Booster', f3: 'Tropical Flavor' },
    { id: 'guava', title: 'GUAVA', subtitle: 'Sweet Fruit Earth', bg: 'guava-bg.webp', videoBg: './assets/videos/guava-fruit.mp4', bottle: 'guava-bottle.webp', fruit: 'guava-fruit.webp', color: '#F26522', stat: '105', label: 'CALORIES', f1: 'Fiber Rich', f2: 'Low Glycemic', f3: 'Pink Guava Extract' },
    { id: 'dragon-fruit', title: 'DRAGON FRUIT', subtitle: 'Exotic Superfruit', bg: 'dragon-fruit-bg.webp', videoBg: './assets/videos/dragon-fruit.mp4', bottle: 'dragon-fruit-bottle.webp', fruit: 'dragon-fruit.webp', color: '#D91C5C', stat: '90', label: 'CALORIES', f1: 'Prebiotic Fiber', f2: 'Iron Rich', f3: 'Exotic Taste' },
    { id: 'orange', title: 'ORANGE', subtitle: 'Citrus Boost', bg: 'orange-bg.webp', videoBg: './assets/videos/orange-fruit.mp4', bottle: 'orange-bottle.webp', fruit: 'orange-fruit.webp', color: '#F15A24', stat: '115', label: 'CALORIES', f1: '100% Daily Vit C', f2: 'Hydrating', f3: 'No Concentrates' },
    { id: 'avocado', title: 'AVOCADO', subtitle: 'Creamy & Nutritious', bg: 'avacado-bg.webp', videoBg: './assets/videos/avacado-fruit.mp4', bottle: 'avacado-bottle.webp', fruit: 'avacado-fruit.webp', color: '#39B54A', stat: '150', label: 'CALORIES', f1: 'Healthy Fats', f2: 'Creamy Texture', f3: 'Satiating' },
    { id: 'blueberry', title: 'BLUEBERRY', subtitle: 'Antioxidant Power', bg: 'blueberry-bg.webp', videoBg: './assets/videos/blueberry-fruit.mp4', bottle: 'blueberry-bottle.webp', fruit: 'blueberry-fruit.webp', color: '#2E3192', stat: '85', label: 'CALORIES', f1: 'Brain Health', f2: 'Super Antioxidants', f3: 'Low Sugar' },
    { id: 'watermelon', title: 'WATERMELON', subtitle: 'Cool & Hydrating', bg: 'watermelon-bg.webp', videoBg: './assets/videos/watermelon-fruit.mp4', bottle: 'watermelon-bottle.webp', fruit: 'watermelon-fruit.webp', color: '#ED1E79', stat: '75', label: 'CALORIES', f1: '92% Water', f2: 'Electrolytes', f3: 'Post-Workout' },
    { id: 'grape', title: 'GRAPES', subtitle: 'Sweet Crush Drops', bg: 'grape-bg.webp', bottle: 'grape-bottle.webp', fruit: 'grape-fruit.webp', videoBg: './assets/videos/grapes-fruit.mp4',  color: '#662D91', stat: '120', label: 'CALORIES', f1: 'Resveratrol Rich', f2: 'Natural Energy', f3: 'Pure Extract' },
    { id: 'pomegranate', title: 'POMEGRANATE', subtitle: 'Naturally Energizing', bg: 'pomogranate-bg.webp', bottle: 'pomogranate-bottle.webp', fruit: 'pomegranate-fruit.webp', videoBg: './assets/videos/pomogranate-fruit.mp4', color: '#C1272D', stat: '140', label: 'CALORIES', f1: 'Heart Healthy', f2: 'Vibrant Taste', f3: '100% Pure' }
];

const basePath = './assets/images/';
let activeIndex = 0; // Start with kiwi
let currentRotation = 0;

// Duplicate data to create a full 360-degree continuous wheel without visible jumping
const extendedData = [...fruitsData, ...fruitsData];
const totalCards = extendedData.length; // 22
const angleStep = 360 / totalCards; // ~16.36 degrees
let radius = 900; // Will be dynamic based on screen size

let autoRotateInterval;

document.addEventListener('DOMContentLoaded', () => {
    updateRadius(); // Calculate initial radius
    initBackgrounds();
    initCards();
    updateShowcase(activeIndex, true);
    startAutoRotate();
});

window.addEventListener('resize', () => {
    updateRadius();
    updateCardPositions();
});

function toggleMobileNav() {
    const nav = document.querySelector('.nav-pill');
    const btn = document.getElementById('hamburger-btn');
    nav.classList.toggle('mobile-active');
    btn.classList.toggle('is-open');
}

function updateRadius() {
    // The user styled wheel-container at bottom: -30vw
    // By setting radius to a percentage of innerWidth, we simulate 'vw' units
    if (window.innerWidth <= 500) {
        // Moderate radius for mobile
        radius = window.innerWidth * 1.05;
    }
    else if (window.innerWidth <= 768) {
        // Moderate radius for tablet
        radius = window.innerWidth * 0.80;
    }
    else if (window.innerWidth <= 991) {
        // Large radius for tablet — pushes cards far apart along the arc
        radius = window.innerWidth * 1.7;
    }
    else if (window.innerWidth <= 1300) {
        radius = window.innerWidth * 0.49;
    }
    else {
        // Default radius for desktop
        radius = window.innerWidth * 0.45; // acts like 45vw
    }
}

function updateCardPositions() {
    extendedData.forEach((fruit, index) => {
        const card = document.getElementById(`card-${index}`);
        if (card) {
            const angle = index * angleStep;
            card.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(${-radius}px)`;
        }
    });
}

function startAutoRotate() {
    // Automatically rotate right-to-left every 5 seconds
    autoRotateInterval = setInterval(() => {
        // Right-to-left means incrementing the index
        let nextIndex = activeIndex + 1;
        if (nextIndex >= totalCards) {
            nextIndex = 0;
        }
        updateShowcase(nextIndex);
    }, 5000);
}

function resetAutoRotate() {
    clearInterval(autoRotateInterval);
    startAutoRotate();
}

function initBackgrounds() {
    const bgContainer = document.getElementById('background-container');
    fruitsData.forEach((fruit, index) => {
        if (fruit.videoBg) {
            const videoLayer = document.createElement('video');
            videoLayer.className = 'bg-layer';
            videoLayer.id = `bg-${index}`;
            videoLayer.src = fruit.videoBg;
            videoLayer.autoplay = true;
            videoLayer.loop = true;
            videoLayer.muted = true;
            videoLayer.playsInline = true;
            bgContainer.appendChild(videoLayer);
        } else {
            const bgLayer = document.createElement('div');
            bgLayer.className = 'bg-layer';
            bgLayer.id = `bg-${index}`;
            bgLayer.style.backgroundImage = `url('${basePath}fruits-bg/${fruit.bg}')`;
            bgContainer.appendChild(bgLayer);
        }
    });
}

function initCards() {
    const container = document.getElementById('wheel-container');

    extendedData.forEach((fruit, index) => {
        const angle = index * angleStep;

        const card = document.createElement('div');
        card.className = 'card';
        card.id = `card-${index}`;

        // Static position on the 360-degree wheel
        card.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(${-radius}px)`;

        card.innerHTML = `
            <div class="card-img-container">
                <img src="${basePath}card-images/${fruit.fruit}" alt="${fruit.title}">
            </div>
            <h3 style="color: ${fruit.color}">${fruit.title}</h3>
            <p>${fruit.subtitle}</p>
        `;

        card.addEventListener('click', () => {
            if (activeIndex !== index) {
                updateShowcase(index);
                resetAutoRotate(); // Reset timer when manually clicked
            }
        });

        container.appendChild(card);
    });
}

function updateShowcase(newIndex, initial = false) {
    const oldIndex = activeIndex;

    // Calculate shortest rotation path on the continuous wheel
    let diff = newIndex - oldIndex;
    if (diff > totalCards / 2) diff -= totalCards;
    if (diff < -totalCards / 2) diff += totalCards;

    currentRotation -= diff * angleStep;
    activeIndex = newIndex;

    // The active fruit data maps back to the original 11 items
    const fruitDataIndex = activeIndex % fruitsData.length;
    const oldFruitDataIndex = oldIndex % fruitsData.length;
    const fruit = fruitsData[fruitDataIndex];

    // Rotate Wheel Container
    const wheel = document.getElementById('wheel-container');
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // Update Backgrounds
    if (!initial) {
        document.getElementById(`bg-${oldFruitDataIndex}`).classList.remove('active');
    }
    document.getElementById(`bg-${fruitDataIndex}`).classList.add('active');

    // Update Bottle (Crossfade)
    const bottle1 = document.getElementById('bottle-1');
    const bottle2 = document.getElementById('bottle-2');
    const fruit1 = document.getElementById('fruit-1');
    const fruit2 = document.getElementById('fruit-2');

    // Update the action pill stats dynamically
    const actionStat = document.getElementById('action-stat');
    const actionLabel = document.getElementById('action-label');
    if (actionStat && actionLabel) {
        // Simple fade animation for the text
        actionStat.style.opacity = '0';
        actionLabel.style.opacity = '0';
        setTimeout(() => {
            actionStat.innerText = fruit.stat || '100';
            actionLabel.innerText = fruit.label || 'CALORIES';
            actionStat.style.opacity = '1';
            actionLabel.style.opacity = '1';
        }, 300);
    }

    if (initial) {
        bottle1.src = `${basePath}bottle-images/${fruit.bottle}`;
        fruit1.src = `${basePath}card-images/${fruit.fruit}`;
        bottle1.classList.add('active');
        fruit1.classList.add('active');
        bottle2.classList.remove('active', 'exiting');
        fruit2.classList.remove('active', 'exiting');
    } else {
        const activeBottle = bottle1.classList.contains('active') ? bottle1 : bottle2;
        const inactiveBottle = bottle1.classList.contains('active') ? bottle2 : bottle1;

        const activeFruit = fruit1.classList.contains('active') ? fruit1 : fruit2;
        const inactiveFruit = fruit1.classList.contains('active') ? fruit2 : fruit1;

        // Old elements exit
        activeBottle.classList.remove('active');
        activeBottle.classList.add('exiting');
        activeFruit.classList.remove('active');
        activeFruit.classList.add('exiting');

        // New elements prepare
        inactiveBottle.classList.remove('exiting');
        inactiveFruit.classList.remove('exiting');
        
        inactiveBottle.src = `${basePath}bottle-images/${fruit.bottle}`;
        inactiveFruit.src = `${basePath}card-images/${fruit.fruit}`;
        
        // Force reflow to instantly snap them to the hidden background position
        void inactiveBottle.offsetWidth;
        void inactiveFruit.offsetWidth;

        // New elements enter
        inactiveBottle.classList.add('active');
        inactiveFruit.classList.add('active');
    }

    // Hide active card, show others using CSS classes
    extendedData.forEach((f, idx) => {
        const card = document.getElementById(`card-${idx}`);
        if (idx === activeIndex) {
            card.classList.add('active');
            card.style.pointerEvents = 'none';
        } else {
            card.classList.remove('active');
            card.style.pointerEvents = 'auto';
        }
    });
}

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// ── Stat Counter Animation ──────────────────────────────────────────────────
function animateCounter(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = "true";

    // If it's a text-only stat (e.g. "Zero"), just leave it
    if (el.dataset.text) return;

    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1800; // ms
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;

    // For 1M+ bottles, show as "1M+" immediately but count up to it
    const displayTarget = target >= 1000000 ? 1 : target;
    const displaySuffix = target >= 1000000 ? "M+" : suffix;

    const timer = setInterval(() => {
        current += displayTarget / steps;
        if (current >= displayTarget) {
            el.textContent = displayTarget + displaySuffix;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current) + displaySuffix;
        }
    }, stepTime);
}

function triggerStatBars() {
    document.querySelectorAll(".stat-item").forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            item.classList.add("active");
            // Trigger bar fill via inline style
            const fill = item.querySelector(".stat-bar-fill");
            if (fill && !fill.dataset.animated) {
                fill.dataset.animated = "true";
                const w = fill.style.width;
                fill.style.width = "0%";
                setTimeout(() => { fill.style.width = w; }, 100);
            }
            // Trigger counter
            const numEl = item.querySelector(".stat-number");
            if (numEl) animateCounter(numEl);
        }
    });
}

window.addEventListener("scroll", triggerStatBars);
triggerStatBars();

// Preloader Logic using sessionStorage
document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    // Check if the preloader has already been shown in this session
    if (sessionStorage.getItem("fistoPreloaderShown")) {
        // If yes, hide it immediately without animation
        preloader.style.display = "none";
    } else {
        // If no, show it and let it fade out after 2.5 seconds
        setTimeout(() => {
            preloader.classList.add("hidden");
            // Set flag in session storage
            sessionStorage.setItem("fistoPreloaderShown", "true");
            
            // Optionally remove from DOM after transition finishes
            setTimeout(() => {
                preloader.style.display = "none";
            }, 800); // matches the 0.8s CSS transition
        }, 2500); // 2.5 seconds artificial loading time
    }
});

// Popup Logic
function openProductPopup(indexOverride) {
    let fruitDataIndex;
    if (typeof indexOverride === 'number') {
        fruitDataIndex = indexOverride;
    } else {
        fruitDataIndex = activeIndex % fruitsData.length;
    }
    const fruit = fruitsData[fruitDataIndex];
    
    // Populate Data
    document.getElementById('popup-bottle').src = `${basePath}bottle-images/${fruit.bottle}`;
    document.getElementById('popup-fruit').src = `${basePath}card-images/${fruit.fruit}`;
    document.getElementById('popup-title').innerText = fruit.title;
    document.getElementById('popup-subtitle').innerText = fruit.subtitle;
    document.getElementById('popup-subtitle').style.color = fruit.color;
    document.getElementById('popup-badge').style.color = fruit.color;
    document.querySelector('.popup-bg-shape').style.background = fruit.color;
    
    // Features
    document.getElementById('popup-f1').innerText = fruit.f1 || 'No Added Sugar';
    document.getElementById('popup-f2').innerText = fruit.f2 || 'Rich in Vitamins';
    document.getElementById('popup-f3').innerText = fruit.f3 || 'Cold Pressed Extraction';
    
    // Update SVG stroke colors
    document.querySelectorAll('.popup-features li svg').forEach(svg => {
        svg.style.stroke = fruit.color;
    });

    // Show popup
    document.getElementById('product-popup-overlay').classList.add('active');
    
    // Stop rotation when popup is open
    clearInterval(autoRotateInterval);
}

function closeProductPopup() {
    document.getElementById('product-popup-overlay').classList.remove('active');
    resetAutoRotate(); // Resume rotation
}
