
AOS.init({ duration: 1000, once: true });


let prevMonths = 0, prevDays = 0, prevHours = 0, prevMinutes = 0, prevSeconds = 0;


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


function closePopup() {
    document.getElementById('memoryPopup').style.display = 'none';
}


function sayYes() {
    localStorage.setItem('saidYes', 'true');
    
    
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
    
   
    setTimeout(() => {
        
        const encodedUrl = btoa('congratulations.html');
        
        window.location.href = decodeURL(encodedUrl);
    }, 2000);
}


function moveButton(btn) {
    const x = Math.random() * (window.innerWidth - btn.offsetWidth);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight);
    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
    
    
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


function solvePuzzle(card) {
    const answer = card.querySelector('.puzzle-text');
    if (answer) {
        answer.classList.toggle('revealed');
    }
}


function showRainbow(container) {
    const rainbow = container.querySelector('.rainbow');
    if (rainbow && !rainbow.classList.contains('visible')) {
        rainbow.classList.add('visible');
    }
}


function openGate(gate) {
    if (!gate.classList.contains('opened')) {
        gate.classList.add('opened');
    }
}


let starInterval;


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


function stopStars(sky) {
    clearInterval(starInterval);
    starInterval = null;
}


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


document.head.insertAdjacentHTML('beforeend', `
    <style>
        .balloon::after {
            background: var(--string-color, #ff4b6e);
        }
    </style>
`);


function initialize() {
    
    updateTimer();
    setInterval(updateTimer, 1000);
    
   
    setInterval(createHeart, 500);
    
   
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.play().catch(error => {
        console.log("Autoplay prevented:", error);
        document.addEventListener('click', () => bgMusic.play(), { once: true });
    });
    
   
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


function encodeURL(url) {
    
    return btoa(url);
}

function decodeURL(encodedUrl) {
    
    return atob(encodedUrl);
}


history.pushState = (function(originalPushState) {
    return function(state, title, url) {
        
        const encodedUrl = encodeURL(url);
        return originalPushState.call(this, state, title, encodedUrl);
    };
})(history.pushState);


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


window.addEventListener('load', function() {
    initialize();
    obfuscateLinks();
});
