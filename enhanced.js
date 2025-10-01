// Enhanced Interactive JavaScript

class EnhancedInteractive {
    constructor() {
        this.init();
    }

    init() {
        this.initCustomCursor();
        this.initMagneticElements();
        this.initRippleEffect();
        this.initPhotoZoom();
        this.initParallax();
        this.initScrollProgress();
        this.initConfetti();
        this.initSoundEffects();
        this.initEnhancedLoading();
        this.init3DCardTilt();
        this.initFireflies();
    }

    // ========== Custom Cursor ==========
    initCustomCursor() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursorDot);

        const cursorOutline = document.createElement('div');
        cursorOutline.className = 'cursor-outline';
        document.body.appendChild(cursorOutline);

        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Create trail effect
            if (Math.random() > 0.7) {
                const trail = document.createElement('div');
                trail.className = 'cursor-trail';
                trail.style.left = mouseX + 'px';
                trail.style.top = mouseY + 'px';
                document.body.appendChild(trail);

                setTimeout(() => trail.remove(), 500);
            }
        });

        // Smooth follow animation
        const animateCursor = () => {
            dotX += (mouseX - dotX) * 0.3;
            dotY += (mouseY - dotY) * 0.3;
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            cursorDot.style.transform = `translate(${dotX - 5}px, ${dotY - 5}px)`;
            cursorOutline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px)`;

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Cursor interactions
        document.querySelectorAll('a, button, .photo-dot, .calendar-day').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform += ' scale(2)';
                cursorOutline.style.transform += ' scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = cursorDot.style.transform.replace(' scale(2)', '');
                cursorOutline.style.transform = cursorOutline.style.transform.replace(' scale(1.5)', '');
            });
        });
    }

    // ========== Magnetic Effect ==========
    initMagneticElements() {
        const magneticElements = document.querySelectorAll('.love-button, .response-button, .back-btn');

        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ========== Ripple Effect ==========
    initRippleEffect() {
        document.querySelectorAll('button, .photo-dot, .countdown-toggle').forEach(el => {
            el.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // ========== Photo Zoom Modal ==========
    initPhotoZoom() {
        const modal = document.createElement('div');
        modal.className = 'photo-zoom-modal';
        modal.innerHTML = `
            <img class="photo-zoom-content" src="" alt="Zoomed Photo">
            <button class="photo-zoom-close">&times;</button>
        `;
        document.body.appendChild(modal);

        const zoomContent = modal.querySelector('.photo-zoom-content');
        const closeBtn = modal.querySelector('.photo-zoom-close');

        // Add click to all photos
        document.querySelectorAll('.photo-frame').forEach(photo => {
            photo.style.cursor = 'pointer';
            photo.addEventListener('click', function() {
                const bgImage = window.getComputedStyle(this).backgroundImage;
                const imageUrl = bgImage.slice(5, -2); // Remove url(" and ")

                zoomContent.src = imageUrl;
                modal.classList.add('active');

                // Play sound
                this.playSound('click');
            });
        });

        // Close modal
        const closeModal = () => {
            modal.classList.remove('active');
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // ========== Parallax Effect ==========
    initParallax() {
        const parallaxElements = document.querySelectorAll('.container, .gallery-container, .message');

        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            parallaxElements.forEach((el, index) => {
                const speed = (index + 1) * 10;
                el.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
            });
        });
    }

    // ========== Scroll Progress ==========
    initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            progressBar.style.width = scrollPercent + '%';
        });
    }

    // ========== Confetti Effect ==========
    initConfetti() {
        const yesButton = document.getElementById('yesButton');

        if (yesButton) {
            yesButton.addEventListener('click', () => {
                this.createConfetti();
            });
        }
    }

    createConfetti(count = 100) {
        const colors = ['#FF4778', '#FF95A8', '#FFB6C1', '#FFD1DC', '#FFE6EA'];

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
                confetti.style.animationDelay = Math.random() * 0.5 + 's';

                document.body.appendChild(confetti);

                setTimeout(() => confetti.remove(), 3000);
            }, i * 30);
        }
    }

    // ========== Sound Effects ==========
    initSoundEffects() {
        this.sounds = {
            click: this.createSound(800, 0.1, 'sine'),
            hover: this.createSound(600, 0.05, 'sine'),
            success: this.createSound(1000, 0.2, 'triangle')
        };

        // Add hover sounds
        document.querySelectorAll('button, .photo-dot').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.playSound('hover');
            });
        });
    }

    createSound(frequency, duration, type = 'sine') {
        return {
            frequency,
            duration,
            type
        };
    }

    playSound(soundName) {
        if (!this.sounds[soundName]) return;

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = this.sounds[soundName].frequency;
        oscillator.type = this.sounds[soundName].type;

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + this.sounds[soundName].duration
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + this.sounds[soundName].duration);
    }

    // ========== Enhanced Loading ==========
    initEnhancedLoading() {
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'enhanced-loading';
        loadingScreen.innerHTML = `
            <div class="loading-hearts-container">
                <span class="loading-heart-item">♥</span>
                <span class="loading-heart-item">♥</span>
                <span class="loading-heart-item">♥</span>
                <span class="loading-heart-item">♥</span>
                <span class="loading-heart-item">♥</span>
            </div>
            <div class="loading-text-enhanced">กำลังโหลดความรัก...</div>
        `;
        document.body.appendChild(loadingScreen);

        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => loadingScreen.remove(), 1000);
            }, 2000);
        });
    }

    // ========== 3D Card Tilt ==========
    init3DCardTilt() {
        const cards = document.querySelectorAll('.gallery-container, .message, .anniversary-timer');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // ========== Fireflies (Glowing Flying Lights) ==========
    initFireflies() {
        const fireflyCount = 15;

        for (let i = 0; i < fireflyCount; i++) {
            setTimeout(() => {
                this.createFirefly();
            }, i * 300);
        }

        // Create new fireflies periodically
        setInterval(() => {
            if (document.querySelectorAll('.firefly').length < fireflyCount) {
                this.createFirefly();
            }
        }, 3000);
    }

    createFirefly() {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';

        // Create firefly structure with body and wings
        firefly.innerHTML = `
            <div class="firefly-body">
                <div class="firefly-glow"></div>
            </div>
            <div class="firefly-wing-left"></div>
            <div class="firefly-wing-right"></div>
        `;

        // Random starting position
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        firefly.style.left = startX + 'px';
        firefly.style.top = startY + 'px';

        // Random animation duration (slower = more realistic)
        const duration = 10 + Math.random() * 10; // 10-20 seconds
        firefly.style.animationDuration = duration + 's';

        // Random animation delay
        firefly.style.animationDelay = Math.random() * 3 + 's';

        // Random scale for size variation
        const scale = 0.8 + Math.random() * 0.6; // 0.8-1.4
        firefly.style.setProperty('--firefly-scale', scale);

        // Random glow intensity delay for natural flickering
        const glowDelay = Math.random() * 2;
        firefly.querySelector('.firefly-glow').style.animationDelay = glowDelay + 's';

        // Random end position with more natural zigzag pattern
        const angle = Math.random() * Math.PI * 2;
        const distance = 200 + Math.random() * 400;
        const endX = startX + Math.cos(angle) * distance;
        const endY = startY + Math.sin(angle) * distance;

        // Add waypoints for more natural curved flight path
        const midX1 = startX + (endX - startX) * 0.33 + (Math.random() - 0.5) * 200;
        const midY1 = startY + (endY - startY) * 0.33 + (Math.random() - 0.5) * 200;
        const midX2 = startX + (endX - startX) * 0.66 + (Math.random() - 0.5) * 200;
        const midY2 = startY + (endY - startY) * 0.66 + (Math.random() - 0.5) * 200;

        firefly.style.setProperty('--start-x', '0px');
        firefly.style.setProperty('--start-y', '0px');
        firefly.style.setProperty('--mid-x1', (midX1 - startX) + 'px');
        firefly.style.setProperty('--mid-y1', (midY1 - startY) + 'px');
        firefly.style.setProperty('--mid-x2', (midX2 - startX) + 'px');
        firefly.style.setProperty('--mid-y2', (midY2 - startY) + 'px');
        firefly.style.setProperty('--end-x', (endX - startX) + 'px');
        firefly.style.setProperty('--end-y', (endY - startY) + 'px');

        document.body.appendChild(firefly);

        // Remove and recreate after animation completes
        setTimeout(() => {
            firefly.remove();
            this.createFirefly();
        }, (duration + 3) * 1000);
    }
}

// ========== Particle Background ==========
class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particle-canvas';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 71, 120, ${particle.opacity})`;
            this.ctx.fill();
        });

        // Draw connections
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(255, 71, 120, ${0.2 * (1 - distance / 150)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ========== Text Animation ==========
class TextAnimation {
    static waveText(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.display = 'inline-block';

        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.setProperty('--index', index);
            span.classList.add('wave-text');
            element.appendChild(span);
        });
    }

    static typeWriter(element, speed = 100) {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;

        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };

        type();
    }
}

// ========== Initialize Everything ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initialize enhanced interactive features
    new EnhancedInteractive();
    new ParticleBackground();

    // Apply text animations
    const titles = document.querySelectorAll('.title, .subtitle');
    titles.forEach(title => {
        if (title.classList.contains('title')) {
            TextAnimation.waveText(title);
        }
    });

    // Add interactive classes
    document.querySelectorAll('button').forEach(btn => {
        btn.classList.add('interactive-btn');
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add floating animation to hearts
    document.querySelectorAll('.floating-heart, .balloon').forEach(el => {
        el.classList.add('float-animation');
    });

    // Enhanced countdown with celebration
    const checkAnniversary = () => {
        const countdownDays = document.getElementById('countdown-days');
        if (countdownDays && countdownDays.textContent === '0') {
            const enhanced = new EnhancedInteractive();
            enhanced.createConfetti(200);

            // Add celebration message
            const celebrationMsg = document.createElement('div');
            celebrationMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 40px 60px;
                border-radius: 20px;
                font-size: 32px;
                font-family: 'Prompt', sans-serif;
                z-index: 10000;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                animation: fadeInScale 1s ease forwards;
            `;
            celebrationMsg.textContent = '🎉 สุขสันต์วันครบรอบ! 🎉';
            document.body.appendChild(celebrationMsg);

            setTimeout(() => {
                celebrationMsg.style.opacity = '0';
                setTimeout(() => celebrationMsg.remove(), 1000);
            }, 5000);
        }
    };

    setInterval(checkAnniversary, 1000);

    console.log('✨ Enhanced Interactive System Initialized! ✨');
});

// ========== Export for use in other scripts ==========
window.EnhancedInteractive = EnhancedInteractive;
window.ParticleBackground = ParticleBackground;
window.TextAnimation = TextAnimation;
