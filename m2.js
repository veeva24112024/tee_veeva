document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const loveButton = document.getElementById('loveButton');
    const responseContainer = document.getElementById('responseContainer');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const heartBurst = document.getElementById('heartBurst');
    const fireworks = document.querySelectorAll('.firework');
    const dusts = document.querySelectorAll('.dust');
    const bgMusic = document.getElementById('bgMusic');
    const audioToggle = document.getElementById('audioToggle');
    const volumeSlider = document.getElementById('volumeSlider');
    
    let currentSlide = 0;
    let autoSlideTimer;
    let isMuted = false;

    // แสดงสไลด์ที่กำหนด
    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        slides[index].classList.add('active');
    }

    // เปลี่ยนสไลด์อัตโนมัติ
    function startAutoSlide() {
        showSlide(currentSlide);
        
        autoSlideTimer = setInterval(() => {
            currentSlide++;
            
            if (currentSlide < slides.length) {
                showSlide(currentSlide);
                
                // เมื่อถึงสไลด์สุดท้าย
                if (currentSlide === slides.length - 1) {
                    // แสดงสไลด์สุดท้ายเป็นเวลา 3 วินาที
                    setTimeout(() => {
                        // ซ่อนสไลด์สุดท้าย
                        slides[currentSlide].classList.remove('active');
                        
                        // รอให้สไลด์หายไปก่อน แล้วค่อยแสดงเวลาที่รู้จักกันและปุ่ม
                        setTimeout(() => {
                            // แสดงเวลาที่รู้จักกัน
                            document.getElementById('timeTogether').classList.add('active');
                            
                            // หลังจากนั้น 1 วินาที แสดงปุ่ม
                            setTimeout(() => {
                                loveButton.classList.add('active');
                                
                                // เรียกใช้ลูกเล่นพลุและฝุ่น
                                triggerFireworks();
                                triggerDust();
                            }, 1000);
                        }, 1000);
                    }, 3000);
                    
                    // หยุดการเลื่อนสไลด์อัตโนมัติ
                    clearInterval(autoSlideTimer);
                }
            }
        }, 4500);
    }

    // เรียกใช้ลูกเล่นพลุ
    function triggerFireworks() {
        fireworks.forEach((firework, index) => {
            firework.style.left = `${20 + (index * 30)}%`;
            setTimeout(() => {
                firework.classList.add('ready');
            }, index * 500);
        });
    }

    // เรียกใช้ลูกเล่นฝุ่นกระจาย
    function triggerDust() {
        dusts.forEach((dust, index) => {
            dust.style.left = `${30 + (index * 20)}%`;
            dust.style.top = `${40 + (index * 10)}%`;
            setTimeout(() => {
                dust.classList.add('active');
            }, index * 700 + 1000);
        });
    }

    // สร้างหัวใจเด้งออกมาเมื่อกดปุ่ม Yes
    function createHeartBurst() {
        heartBurst.innerHTML = '';
        heartBurst.classList.add('active');
        
        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart-particle');
            
            // สุ่มขนาด
            const size = Math.random() * 20 + 10;
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            
            // สุ่มตำแหน่ง
            heart.style.top = '50%';
            heart.style.left = '50%';
            
            // สุ่มสี
            const colors = ['#FF4778', '#FF95A8', '#FFB6C1', '#FFD1DC'];
            heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // สุ่มมุม
            const angle = Math.random() * 360;
            const distance = Math.random() * 1000 + 200;
            const duration = Math.random() * 3 + 2;
            
            heart.style.borderRadius = '50%';
            heart.style.position = 'absolute';
            heart.style.transform = 'translate(-50%, -50%)';
            heart.style.animation = `heartBurst ${duration}s forwards`;
            heart.style.animationTimingFunction = 'ease-out';
            
            // คำนวณตำแหน่งสุดท้าย
            const endX = Math.cos(angle * Math.PI / 180) * distance;
            const endY = Math.sin(angle * Math.PI / 180) * distance;
            
            heart.style.setProperty('--end-x', `${endX}px`);
            heart.style.setProperty('--end-y', `${endY}px`);
            
            heartBurst.appendChild(heart);
        }
        
        // เพิ่ม CSS animation สำหรับ heart-particle
        const style = document.createElement('style');
        style.textContent = `
            .heart-particle {
                opacity: 0;
            }
            @keyframes heartBurst {
                0% { 
                    transform: translate(-50%, -50%) scale(0); 
                    opacity: 1;
                }
                50% { 
                    opacity: 1; 
                }
                100% { 
                    transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(1); 
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ปุ่มฉันขอเป็นแฟนคุณนะ
    loveButton.addEventListener('click', function() {
        responseContainer.classList.add('active');
    });

    // ปุ่มตกลง
    yesButton.addEventListener('click', function() {
        // ลิงก์ไปที่หน้า congratulations.html
        window.location.href = 'congratulations.html';
    });

    // ปุ่มขอคิดดูก่อน (จะหนีไม่พ้น)
    noButton.addEventListener('mouseenter', function() {
        // สุ่มตำแหน่งใหม่เมื่อ hover
        const randomX = Math.random() * (window.innerWidth - 150);
        const randomY = Math.random() * (window.innerHeight - 50);
        
        this.style.position = 'absolute';
        this.style.left = `${randomX}px`;
        this.style.top = `${randomY}px`;
    });

    // ควบคุมเสียงเพลง
    audioToggle.addEventListener('click', function() {
        if (isMuted) {
            bgMusic.volume = volumeSlider.value;
            audioToggle.textContent = '♪';
            isMuted = false;
        } else {
            bgMusic.volume = 0;
            audioToggle.textContent = '♪̸';
            isMuted = true;
        }
    });
    
    volumeSlider.addEventListener('input', function() {
        if (!isMuted) {
            bgMusic.volume = this.value;
        }
    });
    
    // ตั้งค่าระดับเสียงเริ่มต้น
    bgMusic.volume = volumeSlider.value;
    
    // พยายามเล่นเพลงทันทีที่โหลดหน้า
    function tryPlayMusic() {
        bgMusic.play().catch(function(error) {
            console.log("การเล่นอัตโนมัติอาจถูกบล็อก: ", error);
            
            // เพิ่มไอคอนแจ้งเตือนถ้าเพลงเล่นไม่ได้
            let notification = document.createElement('div');
            notification.innerHTML = '🔊 คลิกเพื่อเล่นเพลง';
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.left = '50%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.backgroundColor = 'rgba(255, 71, 120, 0.8)';
            notification.style.color = 'white';
            notification.style.padding = '10px 20px';
            notification.style.borderRadius = '30px';
            notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            notification.style.zIndex = '1000';
            notification.style.cursor = 'pointer';
            notification.style.fontFamily = "'Prompt', sans-serif";
            notification.style.fontSize = '14px';
            
            notification.onclick = function() {
                bgMusic.play();
                this.remove();
            };
            
            document.body.appendChild(notification);
            
            // ให้แจ้งเตือนหายไปอัตโนมัติหลังจาก 8 วินาที
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.remove();
                }
            }, 8000);
        });
    }
    
    // พยายามเล่นเพลงทันทีที่โหลดหน้า
    tryPlayMusic();
    
    // รองรับกรณีหน้าถูกโหลดสมบูรณ์แล้ว
    if (document.readyState === 'complete') {
        tryPlayMusic();
    } else {
        window.addEventListener('load', tryPlayMusic);
    }
    
    // รองรับการปฏิสัมพันธ์ของผู้ใช้
    document.body.addEventListener('click', function() {
        tryPlayMusic();
    }, { once: true });
    
    // รองรับการกดปุ่มใดๆ
    document.body.addEventListener('keydown', function() {
        tryPlayMusic();
    }, { once: true });
    
    // คำนวณเวลาที่รู้จักกัน
    function updateTimeTogether() {
        // วันที่เริ่มรู้จักกัน (24 พฤศจิกายน 2024 22:34 น.)
        const startDate = new Date(2024, 10, 24, 22, 34, 0); // เดือนใน JavaScript เริ่มจาก 0 (มกราคม = 0)
        const currentDate = new Date();
        
        // คำนวณความแตกต่างในมิลลิวินาที
        const diff = currentDate - startDate;
        
        // คำนวณเวลาที่ผ่านไป
        const msInSecond = 1000;
        const msInMinute = msInSecond * 60;
        const msInHour = msInMinute * 60;
        const msInDay = msInHour * 24;
        const msInMonth = msInDay * 30.436875; // ค่าเฉลี่ยวันต่อเดือน
        
        // คำนวณแต่ละหน่วยเวลา
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
    
    // อัพเดทเวลาทุกๆ 1 วินาที
    setInterval(updateTimeTogether, 1000);
    
    // อัพเดทเวลาครั้งแรก
    updateTimeTogether();
    
    // เริ่มการทำงาน
    startAutoSlide();
});