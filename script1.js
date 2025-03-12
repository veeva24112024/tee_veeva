// Initialize AOS (Animate On Scroll) library
AOS.init({ duration: 1000, once: true });

// Variables to track timer values
let prevMonths = 0, prevDays = 0, prevHours = 0, prevMinutes = 0, prevSeconds = 0;

// Function to update the time counter
function updateTimer() {
    const startDate = new Date('2024-11-24T22:34:00');
    const now = new Date();
    const diff = now - startDate;

    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    updateNumber('months', months, prevMonths);
    updateNumber('days', days, prevDays);
    updateNumber('hours', hours, prevHours);
    updateNumber('minutes', minutes, prevMinutes);
    updateNumber('seconds', seconds, prevSeconds);

    prevMonths = months;
    prevDays = days;
    prevHours = hours;
    prevMinutes = minutes;
    prevSeconds = seconds;
}

// Update a number element with animation if changed
function updateNumber(id, newValue, prevValue) {
    const element = document.getElementById(id);
    if (element) {
        if (newValue !== prevValue) {
            element.classList.add('changed');
            setTimeout(() => element.classList.remove('changed'), 300);
        }
        element.textContent = newValue;
    }
}

// Create a floating heart animation
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '♥';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.color = `hsl(${Math.random() * 60 + 330}, 100%, 65%)`;
    heart.style.fontSize = `${Math.random() * 20 + 20}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

// Show memory popup with content
function showMemory(id) {
    const popup = document.getElementById('memoryPopup');
    const content = document.getElementById('memoryContent');
    const memories = {
        1: "♥",
        2: "♥",
        3: "♥",
        4: "♥"
    };
    content.textContent = memories[id] || "ไม่พบความทรงจำ";
    popup.style.display = 'block';
}

// Close popup
function closePopup() {
    document.getElementById('memoryPopup').style.display = 'none';
}

// "Yes" button action
function sayYes() {
    localStorage.setItem('saidYes', 'true');
    
    // Create multiple heart animations
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '♥';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = Math.random() * 100 + 'vh';
            heart.style.color = `hsl(${Math.random() * 60 + 330}, 100%, 65%)`;
            heart.style.fontSize = `${Math.random() * 20 + 20}px`;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }, i * 30);
    }
    
    // Create firework animations
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + 'vw';
            firework.style.top = Math.random() * 100 + 'vh';
            document.body.appendChild(firework);
            setTimeout(() => firework.remove(), 1000);
        }, i * 50);
    }
    
    // Create falling star animations
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.className = 'falling-star';
            star.style.left = Math.random() * 100 + 'vw';
            star.style.animationDuration = `${Math.random() * 1 + 1}s`;
            document.body.appendChild(star);
            setTimeout(() => star.remove(), 2000);
        }, i * 50);
    }
    
    // Redirect to congratulations page using URL obfuscation
    setTimeout(() => {
        // Encode the URL to hide the actual destination
        const encodedUrl = btoa('congratulations.html');
        // Use the encoded URL and decode it when redirecting
        window.location.href = decodeURL(encodedUrl);
    }, 2000);
}

// "No" button action
function moveButton(btn) {
    const x = Math.random() * (window.innerWidth - btn.offsetWidth);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight);
    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
    
    // Add sad face animation
    const sadFace = document.createElement('div');
    sadFace.innerHTML = '😢';
    sadFace.style.position = 'absolute';
    sadFace.style.left = '50%';
    sadFace.style.top = '50%';
    sadFace.style.transform = 'translate(-50%, -50%)';
    sadFace.style.fontSize = '40px';
    sadFace.style.animation = 'fadeOut 1s forwards';
    btn.appendChild(sadFace);
    setTimeout(() => sadFace.remove(), 1000);
}

// Heart explosion animation
function explodeHearts() {
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '♥';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.color = `hsl(${Math.random() * 60 + 330}, 100%, 65%)`;
        heart.style.animationDuration = `${Math.random() * 2 + 1}s`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }
}

// Show/hide puzzle answer
function solvePuzzle(card) {
    const answer = card.querySelector('.puzzle-text');
    if (answer) {
        answer.classList.toggle('revealed');
    }
}

// Show rainbow animation
function showRainbow(container) {
    const rainbow = container.querySelector('.rainbow');
    if (rainbow && !rainbow.classList.contains('visible')) {
        rainbow.classList.add('visible');
    }
}

// Open gate animation
function openGate(gate) {
    if (!gate.classList.contains('opened')) {
        gate.classList.add('opened');
    }
}

// Star creation interval
let starInterval;

// Create stars in the starry sky
function createStar(event, sky) {
    const rect = sky.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    sky.appendChild(star);

    setTimeout(() => star.remove(), 1500);

    if (!starInterval) {
        starInterval = setInterval(() => {
            const autoStar = document.createElement('div');
            autoStar.className = 'star';
            autoStar.style.left = `${Math.random() * rect.width}px`;
            autoStar.style.top = `${Math.random() * rect.height}px`;
            sky.appendChild(autoStar);
            setTimeout(() => autoStar.remove(), 1500);
        }, 200);
    }
}

// Stop automatic star creation
function stopStars(sky) {
    clearInterval(starInterval);
    starInterval = null;
}

// Release balloons animation
function releaseBalloons() {
    const messages = ["รักวีวานะ", "", "ตี๋ ♥ วีวา "];
    const colors = ['#ff4b6e', '#ffeb3b', '#42a5f5', '#66bb6a', '#ab47bc', '#ff7043'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.background = `radial-gradient(circle at 50% 30%, #ffffff, ${randomColor})`;
            balloon.style.setProperty('--string-color', randomColor);
            balloon.textContent = messages[Math.floor(Math.random() * messages.length)];
            balloon.style.left = `${Math.random() * 100}vw`;
            balloon.style.animationDuration = `${Math.random() * 2 + 4}s`;
            document.body.appendChild(balloon);
            setTimeout(() => balloon.remove(), 6000);
        }, i * 100);
    }
}

// Add custom style for balloon strings
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .balloon::after {
            background: var(--string-color, #ff4b6e);
        }
    </style>
`);

// Initialize everything when page loads
function initialize() {
    // Start time counter
    updateTimer();
    setInterval(updateTimer, 1000);
    
    // Create floating hearts periodically
    setInterval(createHeart, 500);
    
    // Play background music
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.play().catch(error => {
        console.log("Autoplay prevented:", error);
        document.addEventListener('click', () => bgMusic.play(), { once: true });
    });
    
    // Back to top button functionality
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Create periodic falling stars in the final question section
    setInterval(() => {
        const finalQuestion = document.querySelector('.final-question');
        if (finalQuestion) {
            const star = document.createElement('div');
            star.className = 'falling-star';
            star.style.left = Math.random() * 100 + '%';
            finalQuestion.querySelector('.shooting-star-container').appendChild(star);
            setTimeout(() => star.remove(), 2000);
        }
    }, 2000);
}

// URL obfuscation functions
function encodeURL(url) {
    // Simple encoding using base64
    return btoa(url);
}

function decodeURL(encodedUrl) {
    // Decode the base64 encoded URL
    return atob(encodedUrl);
}

// URL history obfuscation
history.pushState = (function(originalPushState) {
    return function(state, title, url) {
        // Encode URL for history
        const encodedUrl = encodeURL(url);
        return originalPushState.call(this, state, title, encodedUrl);
    };
})(history.pushState);

// Handle all links on the page to use obfuscated URLs
function obfuscateLinks() {
    const links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
            const encodedHref = encodeURL(href);
            link.setAttribute('data-real-href', encodedHref);
            link.setAttribute('href', 'javascript:void(0)');
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const realHref = decodeURL(this.getAttribute('data-real-href'));
                window.location.href = realHref;
            });
        }
    }
}

// Run initialization when window loads
window.addEventListener('load', function() {
    initialize();
    obfuscateLinks();
});
