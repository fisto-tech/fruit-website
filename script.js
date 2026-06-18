const fruitsData = [
    { id: 'kiwi', title: 'KIWI', subtitle: 'Tangy & Fresh', bg: 'kiwi-bg.webp', videoBg: './assets/videos/kiwi-fruit.mp4', bottle: 'kiwi-bottle.webp', fruit: 'kiwi-fruit.webp', color: '#8DC63F' },
    { id: 'strawberry', title: 'STRAWBERRY', subtitle: 'Sweet & Refreshing', bg: 'strawberry-bg.webp', videoBg: './assets/videos/strawberry-fruit.mp4', bottle: 'strawberry-bottle.webp', fruit: 'strawberry-fruit.webp', color: '#ED1C24' },
    { id: 'mango', title: 'MANGO', subtitle: 'Tropical Delight', bg: 'mango-bg.webp', videoBg: './assets/videos/mango-fruit.mp4', bottle: 'mango-bottle.webp', fruit: 'mango-fruit.webp', color: '#F7931E' },
    { id: 'guava', title: 'GUAVA', subtitle: 'Sweet Fruit Earth', bg: 'guava-bg.webp', videoBg: './assets/videos/guava-fruit.mp4', bottle: 'guava-bottle.webp', fruit: 'guava-fruit.webp', color: '#F26522' },
    { id: 'dragon-fruit', title: 'DRAGON FRUIT', subtitle: 'Exotic Superfruit', bg: 'dragon-fruit-bg.webp', videoBg: './assets/videos/dragon-fruit.mp4', bottle: 'dragon-fruit-bottle.webp', fruit: 'dragon-fruit.webp', color: '#D91C5C' },
    { id: 'orange', title: 'ORANGE', subtitle: 'Citrus Boost', bg: 'orange-bg.webp', videoBg: './assets/videos/orange-fruit.mp4', bottle: 'orange-bottle.webp', fruit: 'orange-fruit.webp', color: '#F15A24' },
    { id: 'avocado', title: 'AVOCADO', subtitle: 'Creamy & Nutritious', bg: 'avacado-bg.webp', videoBg: './assets/videos/avacado-fruit.mp4', bottle: 'avacado-bottle.webp', fruit: 'avacado-fruit.webp', color: '#39B54A' },
    { id: 'blueberry', title: 'BLUEBERRY', subtitle: 'Tropical Delight', bg: 'blueberry-bg.webp', videoBg: './assets/videos/blueberry-fruit.mp4', bottle: 'blueberry-bottle.webp', fruit: 'blueberry-fruit.webp', color: '#2E3192' },
    { id: 'watermelon', title: 'WATERMELON', subtitle: 'Cool & Hydrating', bg: 'watermelon-bg.webp', videoBg: './assets/videos/watermelon-fruit.mp4', bottle: 'watermelon-bottle.webp', fruit: 'watermelon-fruit.webp', color: '#ED1E79' },
    { id: 'grape', title: 'GRAPES', subtitle: 'Sweet Crush Drops', bg: 'grape-bg.webp', bottle: 'grape-bottle.webp', fruit: 'grape-fruit.webp', videoBg: './assets/videos/grapes-fruit.mp4',  color: '#662D91' },
    { id: 'pomegranate', title: 'POMEGRANATE', subtitle: 'Naturally Energizing', bg: 'pomogranate-bg.webp', bottle: 'pomogranate-bottle.webp', fruit: 'pomegranate-fruit.webp', videoBg: './assets/videos/pomogranate-fruit.mp4', color: '#C1272D' }
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

function updateRadius() {
    // The user styled wheel-container at bottom: -30vw
    // By setting radius to a percentage of innerWidth, we simulate 'vw' units
    if (window.innerWidth <= 768) {
        // Reduced radius and raised wheel container to bring the cards perfectly close together
        // fixing the disjointed alignment on mobile devices
        radius = window.innerWidth * 0.80;
    }
    else if (window.innerWidth <= 991) {
        // Strict vw match for tablet: wheel container is -50vw.
        // A radius of 95vw places the active card at exactly 45vw above the bottom, moving curve up and increasing card gaps
        radius = window.innerWidth * 0.95;
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

    if (initial) {
        bottle1.src = `${basePath}bottle-images/${fruit.bottle}`;
        fruit1.src = `${basePath}card-images/${fruit.fruit}`;
        bottle1.classList.add('active');
        fruit1.classList.add('active');
        bottle2.classList.remove('active');
        fruit2.classList.remove('active');
    } else {
        const activeBottle = bottle1.classList.contains('active') ? bottle1 : bottle2;
        const inactiveBottle = bottle1.classList.contains('active') ? bottle2 : bottle1;

        const activeFruit = fruit1.classList.contains('active') ? fruit1 : fruit2;
        const inactiveFruit = fruit1.classList.contains('active') ? fruit2 : fruit1;

        inactiveBottle.src = `${basePath}bottle-images/${fruit.bottle}`;
        inactiveFruit.src = `${basePath}card-images/${fruit.fruit}`;

        inactiveBottle.onload = () => {
            inactiveBottle.classList.add('active');
            activeBottle.classList.remove('active');

            inactiveFruit.classList.add('active');
            activeFruit.classList.remove('active');
        };
    }

    // Hide active card, show others
    extendedData.forEach((f, idx) => {
        const card = document.getElementById(`card-${idx}`);
        if (idx === activeIndex) {
            card.classList.add('active');
            card.style.opacity = '0';
            card.style.pointerEvents = 'none';
        } else {
            card.classList.remove('active');
            card.style.opacity = '1';
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
