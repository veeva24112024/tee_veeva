document.addEventListener('DOMContentLoaded', function() {
    
    const mainContainer = document.getElementById('mainContainer');
    const particlesContainer = document.getElementById('particlesContainer');
    const bgHearts = document.getElementById('bgHearts');
    const fireworksContainer = document.getElementById('fireworksContainer');
    const photoDots = document.querySelectorAll('.photo-dot');
    const photoFrames = document.querySelectorAll('.photo-frame');
    const bgMusic = document.getElementById('bgMusic');
    
    
    const animatedBg = document.getElementById('animatedBg');
    const loveAxis = document.getElementById('loveAxis');
    const colorOptions = document.querySelectorAll('.color-option');
    const mouseFollower = document.getElementById('mouseFollower');
    const subtitle = document.querySelector('.subtitle');
    
   
    const heartSound = document.getElementById('heartSound');
    const starSound = document.getElementById('starSound');
    const chimeSound = document.getElementById('chimeSound');
    const synthHeart = document.getElementById('synthHeart');
    const synthStar = document.getElementById('synthStar');
    const synthChime = document.getElementById('synthChime');
    
    let isMuted = false;
    let currentPhotoIndex = 0;
    let photoInterval;
    
    
    function createBackgroundCircles() {
        animatedBg.innerHTML = '';
        const circleCount = 10;
        
        for (let i = 0; i < circleCount; i++) {
            const circle = document.createElement('div');
            circle.classList.add('bg-circle');
        
            const size = Math.random() * 300 + 200;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            circle.style.width = `${size}px`;
            circle.style.height = `${size}px`;
            circle.style.left = `${posX}%`;
            circle.style.top = `${posY}%`;
            
           
            const duration = Math.random() * 20 + 20;
            const delay = Math.random() * 5;
            
            const keyframes = [
                { transform: 'translate(0, 0) scale(1)', opacity: 0.1 },
                { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() * 0.5 + 0.8})`, opacity: 0.2 },
                { transform: 'translate(0, 0) scale(1)', opacity: 0.1 }
            ];
            
            circle.animate(keyframes, {
                duration: duration * 1000,
                delay: delay * 1000,
                iterations: Infinity,
                direction: 'alternate',
                easing: 'ease-in-out'
            });
            
            animatedBg.appendChild(circle);
        }
    }
    
    
    function create3DLoveAxis() {
        loveAxis.innerHTML = '';
        const particleCount = 50;
        const axisSize = 500;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('love-particle');
            
            
            const x = (Math.random() - 0.5) * axisSize;
            const y = (Math.random() - 0.5) * axisSize;
            const z = (Math.random() - 0.5) * axisSize;
            
          
            const size = Math.random() * 20 + 10;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            
            const opacity = Math.random() * 0.5 + 0.3;
            particle.style.opacity = opacity;
            
            
            const animDuration = Math.random() * 20 + 20;
            const delay = Math.random() * 5;
            
            particle.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
            
            
            const keyframes = [
                { transform: `translate3d(${x}px, ${y}px, ${z}px) rotate(0deg)` },
                { transform: `translate3d(${x * 1.2}px, ${y * 0.8}px, ${z * 1.1}px) rotate(180deg)` },
                { transform: `translate3d(${x}px, ${y}px, ${z}px) rotate(360deg)` }
            ];
            
            particle.animate(keyframes, {
                duration: animDuration * 1000,
                delay: delay * 1000,
                iterations: Infinity,
                easing: 'ease-in-out'
            });
            
            loveAxis.appendChild(particle);
        }
    }
    
    
    function createParticles() {
        const particleCount = 100;
        const colors = ['#FFB6C1', '#FFC0CB', '#FFD1DC', '#FFFFFF'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
           
            const size = Math.random() * 4 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const opacity = Math.random() * 0.5 + 0.3;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.background = color;
            particle.style.opacity = opacity;
            
          
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.animate([
                { transform: 'translateY(0) translateX(0)', opacity: opacity },
                { transform: `translateY(-${Math.random() * 30 + 20}px) translateX(${Math.random() * 40 - 20}px)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                delay: delay * 1000,
                iterations: Infinity,
                direction: 'alternate',
                easing: 'ease-in-out'
            });
            
            particlesContainer.appendChild(particle);
        }
    }
    
 
    function createBackgroundHearts() {
        const heartCount = 20;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.classList.add('bg-heart');
            
            
            heart.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23FFF" d="M50,90 C100,65 90,10 50,30 C10,10 0,65 50,90 Z" /></svg>')`;
            
           
            const size = Math.random() * 100 + 50;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heart.style.left = `${posX}%`;
            heart.style.top = `${posY}%`;
            
            
            const duration = Math.random() * 10 + 10;
            
            heart.animate([
                { transform: 'scale(1)', opacity: 0.2 },
                { transform: 'scale(1.2)', opacity: 0.3 },
                { transform: 'scale(1)', opacity: 0.2 }
            ], {
                duration: duration * 1000,
                iterations: Infinity,
                easing: 'ease-in-out'
            });
            
            bgHearts.appendChild(heart);
        }
    }
    
    
    function initPhotoSlider() {
        
        photoInterval = setInterval(nextPhoto, 5000);
        
       
        photoDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showPhoto(index);
                
                
                if (!isMuted) {
                    starSound.currentTime = 0;
                    starSound.play().catch(e => console.log('เล่นเสียงไม่สำเร็จ:', e));
                }
                
                
                clearInterval(photoInterval);
                photoInterval = setInterval(nextPhoto, 5000);
            });
        });
    }
    
   
    function showPhoto(index) {
        photoFrames.forEach(frame => frame.classList.remove('active'));
        photoDots.forEach(dot => dot.classList.remove('active'));
        
        photoFrames[index].classList.add('active');
        photoDots[index].classList.add('active');
        
        currentPhotoIndex = index;
    }
    
    
    function nextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % photoFrames.length;
        showPhoto(currentPhotoIndex);
    }
    
   
    function createFireworks() {
        setInterval(() => {
            if (Math.random() > 0.7) {
                launchFirework();
            }
        }, 1000);
        
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                launchFirework();
            }, i * 300);
        }
    }
    
   
    function launchFirework() {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        
        
        const posX = 10 + Math.random() * 80;
        firework.style.left = `${posX}%`;
        
        
        const hue = 340 + Math.random() * 40;
        const color = `hsl(${hue}, 100%, 60%)`;
        firework.style.backgroundColor = color;
        
        fireworksContainer.appendChild(firework);
        
        
        const rocketAnimationDuration = 1 + Math.random() * 1;
        
        firework.animate([
            { bottom: '-10px', height: '10px' },
            { bottom: `${20 + Math.random() * 60}%`, height: '4px' }
        ], {
            duration: rocketAnimationDuration * 1000,
            easing: 'ease-out',
            fill: 'forwards'
        }).onfinish = function() {
            explodeFirework(firework, color, hue);
        };
    }
    
    
    function explodeFirework(firework, color, hue) {
        const particles = 30 + Math.random() * 20;
        const explosion = firework.getBoundingClientRect();
        const explosionX = explosion.left + explosion.width / 2;
        const explosionY = explosion.top;
        
        
        if (!isMuted && Math.random() > 0.7) {
            chimeSound.currentTime = 0;
            chimeSound.volume = 0.2;
            chimeSound.play().catch(e => console.log('เล่นเสียงไม่สำเร็จ:', e));
        }
        
       
        firework.remove();
        
       
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('firework');
            particle.style.width = '3px';
            particle.style.height = '3px';
            particle.style.backgroundColor = color;
            particle.style.position = 'fixed';
            particle.style.top = `${explosionY}px`;
            particle.style.left = `${explosionX}px`;
            particle.style.pointerEvents = 'none';
            fireworksContainer.appendChild(particle);
            
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 5;
            const lifetime = 1 + Math.random();
            
            
            particle.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { 
                    transform: `translate(calc(-50% + ${Math.cos(angle) * 100 * velocity}px), calc(-50% + ${Math.sin(angle) * 100 * velocity}px)) scale(0.5)`,
                    opacity: 0
                }
            ], {
                duration: lifetime * 1000,
                easing: 'cubic-bezier(0, 0.5, 0.5, 1)',
                fill: 'forwards'
            }).onfinish = function() {
                particle.remove();
            };
        }
    }
    
    
    function tryPlayMusic() {
        bgMusic.play().catch(function(error) {
            console.log("การเล่นอัตโนมัติอาจถูกบล็อก: ", error);
        });
    }
    
    tryPlayMusic();
    document.body.addEventListener('click', tryPlayMusic, { once: true });
    
    
    synthHeart.addEventListener('click', function() {
        heartSound.currentTime = 0;
        heartSound.play().catch(e => console.log('เล่นเสียงไม่สำเร็จ:', e));
        
       
        createHeartBurst();
    });
    
   
    synthStar.addEventListener('click', function() {
        starSound.currentTime = 0;
        starSound.play().catch(e => console.log('เล่นเสียงไม่สำเร็จ:', e));
        
        
        createStarBurst();
    });
    
   
    synthChime.addEventListener('click', function() {
        chimeSound.currentTime = 0;
        chimeSound.play().catch(e => console.log('เล่นเสียงไม่สำเร็จ:', e));
        
        
        createChimeBurst();
    });

    
    subtitle.addEventListener('click', function() {
       
        if (!isMuted) {
            heartSound.currentTime = 0;
            heartSound.volume = 0.5;
            heartSound.play().catch(e => console.log('เล่นเสียงไม่สำเร็จ:', e));
        }
        
        
        createGrandHeartExplosion();
    });
    
   
    function createGrandHeartExplosion() {
        
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '1000';
        document.body.appendChild(container);
        
       
        const heartCount = 100;
        
       
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '♥';
            heart.style.position = 'absolute';
            heart.style.top = '50%';
            heart.style.left = '50%';
            heart.style.fontSize = `${Math.random() * 20 + 15}px`;
            heart.style.color = `hsl(${340 + Math.random() * 30}, 100%, ${70 + Math.random() * 30}%)`;
            heart.style.userSelect = 'none';
            heart.style.zIndex = '1000';
            heart.style.opacity = Math.random() * 0.5 + 0.5;
            
            container.appendChild(heart);
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 300 + 50;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 0.5;
            
            heart.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1, offset: 0.1 },
                { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(${Math.random() * 0.7 + 0.5})`, opacity: 0 }
            ], {
                duration: duration * 1000,
                delay: delay * 1000,
                easing: 'cubic-bezier(0.11, 0.67, 0.43, 0.98)'
            }).onfinish = function() {
                heart.remove();
                if (container.children.length === 0) {
                    container.remove();
                }
            };
        }
        
        
        setTimeout(() => {
            createHeartShapedExplosion();
        }, 300);
    }
    
    
    function createHeartShapedExplosion() {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '1001';
        document.body.appendChild(container);
        
       
        const particleCount = 200;
        
        
        for (let i = 0; i < particleCount; i++) {
            
            const t = (i / particleCount) * Math.PI * 2;
            
           
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
            
            
            const scaleFactor = window.innerHeight / 50;
            const xPos = window.innerWidth / 2 + x * scaleFactor * 0.8;
            const yPos = window.innerHeight / 2 - y * scaleFactor * 0.8;
            
            
            const particle = document.createElement('div');
            particle.innerHTML = '♥';
            particle.style.position = 'absolute';
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.fontSize = `${Math.random() * 15 + 10}px`;
            particle.style.color = `hsl(${340 + Math.random() * 30}, 100%, ${70 + Math.random() * 30}%)`;
            particle.style.opacity = '0';
            container.appendChild(particle);
            
            
            const duration1 = 1500 + Math.random() * 1000;
            const duration2 = 1000 + Math.random() * 1500;
            const delay = Math.random() * 500;
            
            
            particle.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
                { transform: `translate(${xPos - window.innerWidth/2}px, ${yPos - window.innerHeight/2}px) scale(1)`, opacity: 1 }
            ], {
                duration: duration1,
                delay: delay,
                fill: 'forwards',
                easing: 'cubic-bezier(.25, .1, .25, 1)'
            }).onfinish = function() {
                
                particle.animate([
                    { opacity: 1 },
                    { opacity: 0 }
                ], {
                    duration: duration2,
                    fill: 'forwards',
                    easing: 'ease-out'
                }).onfinish = function() {
                    particle.remove();
                    if (container.children.length === 0) {
                        container.remove();
                    }
                };
            };
        }
    }
    
    
    function createHeartBurst() {
        const burstContainer = document.createElement('div');
        burstContainer.style.position = 'fixed';
        burstContainer.style.top = '0';
        burstContainer.style.left = '0';
        burstContainer.style.width = '100%';
        burstContainer.style.height = '100%';
        burstContainer.style.pointerEvents = 'none';
        burstContainer.style.zIndex = '10000';
        document.body.appendChild(burstContainer);
        
        
        const heartCount = 50;
        const colors = ['#FF4778', '#FF95A8', '#FFB6C1', '#FF0000'];
        const centerX = synthHeart.getBoundingClientRect().left + synthHeart.getBoundingClientRect().width / 2;
        const centerY = synthHeart.getBoundingClientRect().top + synthHeart.getBoundingClientRect().height / 2;
        
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '♥';
            heart.style.position = 'absolute';
            heart.style.left = centerX + 'px';
            heart.style.top = centerY + 'px';
            heart.style.fontSize = Math.random() * 15 + 12 + 'px';
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.textShadow = '0 0 5px rgba(255,255,255,0.5)';
            heart.style.zIndex = '10000';
            heart.style.transformOrigin = 'center';
            burstContainer.appendChild(heart);
            
            const angle = (i / heartCount) * Math.PI * 2 + (Math.random() * 0.5 - 0.25);
            const distance = 50 + Math.random() * 150;
            const duration = 1000 + Math.random() * 1500;
            
            heart.animate([
                { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 0 },
                { transform: 'translate(-50%, -50%) scale(1.5) rotate(180deg)', opacity: 1, offset: 0.1 },
                { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0.5) rotate(${Math.random() * 360 + 180}deg)`, opacity: 0.7, offset: 0.7 },
                { transform: `translate(calc(-50% + ${Math.cos(angle) * distance * 1.2}px), calc(-50% + ${Math.sin(angle) * distance * 1.2}px)) scale(0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
            }).onfinish = function() {
                heart.remove();
                if (burstContainer.children.length === 0) {
                    burstContainer.remove();
                }
            };
        }
        
        
        createCentralBurst(burstContainer, centerX, centerY);
    }
    
    function createStarBurst() {
        const burstContainer = document.createElement('div');
        burstContainer.style.position = 'fixed';
        burstContainer.style.top = '0';
        burstContainer.style.left = '0';
        burstContainer.style.width = '100%';
        burstContainer.style.height = '100%';
        burstContainer.style.pointerEvents = 'none';
        burstContainer.style.zIndex = '10000';
        document.body.appendChild(burstContainer);
        
       
        const starCount = 60;
        const colors = ['#FFD700', '#FFF8DC', '#FFFACD', '#FFFFFF', '#F0E68C'];
        const centerX = synthStar.getBoundingClientRect().left + synthStar.getBoundingClientRect().width / 2;
        const centerY = synthStar.getBoundingClientRect().top + synthStar.getBoundingClientRect().height / 2;
        
        
        for (let i = 0; i < starCount; i++) {
            
            const star = document.createElement('div');
            const starSize = Math.random() * 15 + 10;
            star.style.position = 'absolute';
            star.style.left = centerX + 'px';
            star.style.top = centerY + 'px';
            star.style.width = `${starSize}px`;
            star.style.height = `${starSize}px`;
            star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            star.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
            star.style.zIndex = '10000';
            burstContainer.appendChild(star);
            
            
            const spiralAngle = (i / starCount) * Math.PI * 8;
            const spiralRadius = i * 3;
            const distance = 30 + spiralRadius;
            const duration = 1500 + Math.random() * 1500;
            
            star.animate([
                { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 0 },
                { transform: 'translate(-50%, -50%) scale(1) rotate(180deg)', opacity: 1, offset: 0.1 },
                { transform: `translate(calc(-50% + ${Math.cos(spiralAngle) * distance}px), calc(-50% + ${Math.sin(spiralAngle) * distance}px)) scale(0.8) rotate(${Math.random() * 360 + 180}deg)`, opacity: 0.8, offset: 0.6 },
                { transform: `translate(calc(-50% + ${Math.cos(spiralAngle) * distance * 1.5}px), calc(-50% + ${Math.sin(spiralAngle) * distance * 1.5}px)) scale(0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
            }).onfinish = function() {
                star.remove();
                if (burstContainer.children.length === 0) {
                    burstContainer.remove();
                }
            };
        }
        
        
        createStarTrail(burstContainer, centerX, centerY);
    }
    
    
    function createStarTrail(container, x, y) {
        const trailCount = 8;
        const particlesPerTrail = 15;
        const colors = ['#FFD700', '#FFFACD', '#FFFFFF'];
        
        for (let trail = 0; trail < trailCount; trail++) {
            const angle = (trail / trailCount) * Math.PI * 2;
            
            for (let i = 0; i < particlesPerTrail; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = Math.random() * 5 + 2 + 'px';
                particle.style.height = particle.style.width;
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.borderRadius = '50%';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.boxShadow = '0 0 5px 2px rgba(255, 255, 255, 0.5)';
                container.appendChild(particle);
                
                
                const particleAngle = angle + (Math.random() * 0.3 - 0.15);
                const delay = i * 50;
                const distance = 20 + i * 10;
                
                setTimeout(() => {
                    particle.animate([
                        { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 0.8 },
                        { transform: `translate(calc(-50% + ${Math.cos(particleAngle) * distance}px), calc(-50% + ${Math.sin(particleAngle) * distance}px)) scale(0)`, opacity: 0 }
                    ], {
                        duration: 800 + Math.random() * 400,
                        easing: 'cubic-bezier(0, 0.9, 0.1, 1)'
                    }).onfinish = function() {
                        particle.remove();
                    };
                }, delay);
            }
        }
        
        
        const flash = document.createElement('div');
        flash.style.position = 'absolute';
        flash.style.left = x + 'px';
        flash.style.top = y + 'px';
        flash.style.width = '50px';
        flash.style.height = '50px';
        flash.style.backgroundColor = '#FFFFFF';
        flash.style.borderRadius = '50%';
        flash.style.filter = 'blur(5px)';
        flash.style.transform = 'translate(-50%, -50%)';
        container.appendChild(flash);
        
        flash.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
            { transform: 'translate(-50%, -50%) scale(3)', opacity: 0 }
        ], {
            duration: 500,
            easing: 'ease-out'
        }).onfinish = function() {
            flash.remove();
        };
    }
    
    
    function createChimeBurst() {
        const burstContainer = document.createElement('div');
        burstContainer.style.position = 'fixed';
        burstContainer.style.top = '0';
        burstContainer.style.left = '0';
        burstContainer.style.width = '100%';
        burstContainer.style.height = '100%';
        burstContainer.style.pointerEvents = 'none';
        burstContainer.style.zIndex = '10000';
        document.body.appendChild(burstContainer);
        
        const centerX = synthChime.getBoundingClientRect().left + synthChime.getBoundingClientRect().width / 2;
        const centerY = synthChime.getBoundingClientRect().top + synthChime.getBoundingClientRect().height / 2;
        
        
        for (let i = 0; i < 8; i++) {
            const ring = document.createElement('div');
            ring.style.position = 'absolute';
            ring.style.left = centerX + 'px';
            ring.style.top = centerY + 'px';
            ring.style.width = '20px';
            ring.style.height = '20px';
            ring.style.borderRadius = '50%';
            ring.style.border = '2px solid gold';
            ring.style.transform = 'translate(-50%, -50%)';
            ring.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
            burstContainer.appendChild(ring);
            
            const delay = i * 100;
            
            setTimeout(() => {
                ring.animate([
                    { transform: 'translate(-50%, -50%) scale(1)', opacity: 1, borderWidth: '2px' },
                    { transform: 'translate(-50%, -50%) scale(15)', opacity: 0, borderWidth: '1px' }
                ], {
                    duration: 1500,
                    easing: 'ease-out'
                }).onfinish = function() {
                    ring.remove();
                    if (burstContainer.children.length === 0) {
                        burstContainer.remove();
                    }
                };
            }, delay);
        }
        
        
        const noteCount = 12;
        const notes = ['♪', '♫', '♬', '♩'];
        const colors = ['#FFD700', '#FFA500', '#FFFFFF', '#FFC0CB'];
        
        for (let i = 0; i < noteCount; i++) {
            const note = document.createElement('div');
            note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
            note.style.position = 'absolute';
            note.style.left = centerX + 'px';
            note.style.top = centerY + 'px';
            note.style.fontSize = Math.random() * 15 + 15 + 'px';
            note.style.color = colors[Math.floor(Math.random() * colors.length)];
            note.style.textShadow = '0 0 5px rgba(255,255,255,0.8)';
            note.style.fontWeight = 'bold';
            note.style.zIndex = '10001';
            burstContainer.appendChild(note);
            
            const angle = (i / noteCount) * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            const duration = 1500 + Math.random() * 1000;
            
            note.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
                { transform: 'translate(-50%, -50%) scale(1.5)', opacity: 1, offset: 0.1 },
                { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance - 100}px)) scale(1) rotate(${Math.random() * 360}deg)`, opacity: 0.7, offset: 0.8 },
                { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance - 150}px)) scale(0.5) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.5, 0.1, 1)'
            }).onfinish = function() {
                note.remove();
            };
        }
    }
    
    
    function createSlowCentralBurst(container, x, y) {
        const particles = 40;
        const colors = ['#FFFFFF', '#FFCCD5', '#FFE6EA', '#FFF0F3'];
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 6 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.boxShadow = '0 0 10px 2px rgba(255, 255, 255, 0.3)';
            container.appendChild(particle);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 0.5 + Math.random() * 3; 
            const distance = 30 + Math.random() * 80;
            
            particle.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1, offset: 0.1 },
                { transform: `translate(calc(-50% + ${Math.cos(angle) * distance * velocity * 0.3}px), calc(-50% + ${Math.sin(angle) * distance * velocity * 0.3}px)) scale(0.8)`, opacity: 0.8, offset: 0.4 },
                { transform: `translate(calc(-50% + ${Math.cos(angle) * distance * velocity * 0.7}px), calc(-50% + ${Math.sin(angle) * distance * velocity * 0.7}px)) scale(0.5)`, opacity: 0.4, offset: 0.7 },
                { transform: `translate(calc(-50% + ${Math.cos(angle) * distance * velocity}px), calc(-50% + ${Math.sin(angle) * distance * velocity}px)) scale(0)`, opacity: 0 }
            ], {
                duration: 3000 + Math.random() * 1000, 
                easing: 'ease-in-out',
                fill: 'forwards'
            }).onfinish = function() {
                particle.remove();
            };
        }
    }
    
    
    function createCentralBurst(container, x, y) {
        const particles = 50;
        const colors = ['#FFFFFF', '#FFCCD5', '#FFE6EA', '#FFF0F3'];
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 6 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.boxShadow = '0 0 10px 2px rgba(255, 255, 255, 0.3)';
            container.appendChild(particle);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 1 + Math.random() * 5;
            const distance = 30 + Math.random() * 80;
            
            particle.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: `translate(calc(-50% + ${Math.cos(angle) * distance * velocity}px), calc(-50% + ${Math.sin(angle) * distance * velocity}px)) scale(0)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0, 0.9, 0.1, 1)'
            }).onfinish = function() {
                particle.remove();
            };
        }
    }
    
    
   
    
   
    function updateTimeTogether() {
        // วันที่เริ่มรู้จักกัน (24 พฤศจิกายน 2024 22:34 น.)
        const startDate = new Date(2024, 10, 24, 22, 34, 0);
        const currentDate = new Date();
        
       
        const diff = currentDate - startDate;
        
        // คำนวณเวลาที่ผ่านไป
        const msInSecond = 1000;
        const msInMinute = msInSecond * 60;
        const msInHour = msInMinute * 60;
        const msInDay = msInHour * 24;
        const msInMonth = msInDay * 30.436875; 
        
        
        const months = Math.floor(diff / msInMonth);
        const days = Math.floor((diff % msInMonth) / msInDay);
        const hours = Math.floor((diff % msInDay) / msInHour);
        const minutes = Math.floor((diff % msInHour) / msInMinute);
        const seconds = Math.floor((diff % msInMinute) / msInSecond);
        
        // แสดงผล
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }
    
  
    function updateCountdown() {
    
        const anniversaryStart = new Date(2025, 2, 9, 23, 59, 0);
        const currentDate = new Date();
    
  
        const oneMonthAnniversary = new Date(2025, 3, 9);
        const oneYearAnniversary = new Date(2026, 2, 9); 
        const fiveYearAnniversary = new Date(2030, 2, 9); 
        const tenYearAnniversary = new Date(2035, 2, 9); 
        const twentyYearAnniversary = new Date(2045, 2, 9); 
        const fiftyYearAnniversary = new Date(2075, 2, 9); 
        const twoYearAnniversary = new Date(2027, 2, 9);
        const threeYearAnniversary = new Date(2028, 2, 9);
        const sevenYearAnniversary = new Date(2032, 2, 9);
        const fifteenYearAnniversary = new Date(2040, 2, 9);
        
        
        const activeType = document.querySelector('.countdown-toggle.active').getAttribute('data-type');
        
        
        let targetDate;
        let dateText;
        
        switch(activeType) {
            case 'month':
                targetDate = oneMonthAnniversary;
                dateText = '9 เมษายน 2025';
                break;
            case 'year':
                targetDate = oneYearAnniversary;
                dateText = '9 มีนาคม 2026';
                break;
            case 'year5':
                targetDate = fiveYearAnniversary;
                dateText = '9 มีนาคม 2030';
                break;
            case 'year10':
                targetDate = tenYearAnniversary;
                dateText = '9 มีนาคม 2035';
                break;
            case 'year20':
                targetDate = twentyYearAnniversary;
                dateText = '9 มีนาคม 2045';
                break;
            case 'year50':
                targetDate = fiftyYearAnniversary;
                dateText = '9 มีนาคม 2075';
                break;
            default:
                targetDate = oneMonthAnniversary;
                dateText = '9 เมษายน 2025';

            case 'year2':
                targetDate = twoYearAnniversary;
                dateText = '9 มีนาคม 2027';
                break;
            case 'year3':
                targetDate = threeYearAnniversary;
                dateText = '9 มีนาคม 2028';
                break;   
            case 'year7':
                targetDate = sevenYearAnniversary;
                dateText = '9 มีนาคม 2032';
                break;          
            case 'year15':
                targetDate = fifteenYearAnniversary;
                dateText = '9 มีนาคม 2040';
                break;     
        }
        document.getElementById('countdown-date').textContent = dateText;
        
        
        const diff = targetDate - currentDate;
        
       
        if (diff < 0) {
            document.getElementById('countdown-days').textContent = '0';
            document.getElementById('countdown-hours').textContent = '0';
            document.getElementById('countdown-minutes').textContent = '0';
            document.getElementById('countdown-seconds').textContent = '0';
            return;
        }
        
      
        const msInSecond = 1000;
        const msInMinute = msInSecond * 60;
        const msInHour = msInMinute * 60;
        const msInDay = msInHour * 24;
        
        const days = Math.floor(diff / msInDay);
        const hours = Math.floor((diff % msInDay) / msInHour);
        const minutes = Math.floor((diff % msInHour) / msInMinute);
        const seconds = Math.floor((diff % msInMinute) / msInSecond);
        
        
        document.getElementById('countdown-days').textContent = days;
        document.getElementById('countdown-hours').textContent = hours;
        document.getElementById('countdown-minutes').textContent = minutes;
        document.getElementById('countdown-seconds').textContent = seconds;
    }
    
    
    document.querySelectorAll('.countdown-toggle').forEach(button => {
        button.addEventListener('click', function() {
            
            document.querySelectorAll('.countdown-toggle').forEach(btn => {
                btn.classList.remove('active');
            });
            
            
            this.classList.add('active');
            
           
            if (!isMuted) {
                heartSound.currentTime = 0;
                heartSound.volume = 0.4;
                heartSound.play().catch(e => console.log('เล่นเสียงไม่สำเร็จ:', e));
            }
            
            
            updateCountdown();
        });
    });
    
    
    document.addEventListener('mousemove', function(e) {
        if (mouseFollower) {
            mouseFollower.style.left = e.clientX + 'px';
            mouseFollower.style.top = e.clientY + 'px';
        }
    });
    
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            changeColorTheme(color);
            
           
            if (!isMuted) {
                chimeSound.currentTime = 0;
                chimeSound.volume = 0.3;
                chimeSound.play().catch(e => console.log('เล่นเสียงไม่สำเร็จ:', e));
            }
        });
    });
    
    
    function changeColorTheme(color) {
        let primaryColor, primaryLight;
        
        switch(color) {
            case 'pink':
                primaryColor = '#FF4778';
                primaryLight = '#FF95A8';
                break;
            case 'purple':
                primaryColor = '#8A2BE2';
                primaryLight = '#DA70D6';
                break;
            case 'red':
                primaryColor = '#FF0000';
                primaryLight = '#FF6B6B';
                break;
            case 'blue':
                primaryColor = '#1E90FF';
                primaryLight = '#87CEEB';
                break;
            case 'green':
                primaryColor = '#2E8B57'; 
                primaryLight = '#90EE90'; 
                break;    
            default:
                primaryColor = '#FF4778';
                primaryLight = '#FF95A8';
        }
        
        document.documentElement.style.setProperty('--primary', primaryColor);
        document.documentElement.style.setProperty('--primary-light', primaryLight);
        
        
        document.querySelector('.background').style.background = `radial-gradient(ellipse at center, ${primaryLight} 0%, ${primaryColor} 100%)`;
    }
    
   
    mainContainer.classList.add('active');
    
    
    createBackgroundCircles();
    create3DLoveAxis();
    
    
    createFireworks();
    createParticles();
    createBackgroundHearts();
    initPhotoSlider();
    
    
    setInterval(() => {
        updateTimeTogether();
        updateCountdown();
    }, 1000);
    
    
    updateTimeTogether();
    updateCountdown();
});