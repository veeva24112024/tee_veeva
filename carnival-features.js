/**
 * Carnival Features - Amusement Park Interactive Features
 * ระบบลูกเล่นสวนสนุกแบบครบวงจร
 */

class CarnivalFeatures {
    constructor() {
        this.isInitialized = false;
        this.activeGames = new Set();
        this.init();
    }

    init() {
        if (this.isInitialized) return;

        // สร้าง Control Panel สำหรับเปิดลูกเล่นต่างๆ
        this.createControlPanel();

        // เริ่มต้นระบบทั้งหมด
        this.initMemoryGame();
        this.initSnowfall();
        this.initFireworks();
        this.initWhackAHeart();

        this.isInitialized = true;
        console.log('🎪 Carnival Features Initialized!');
    }

    createControlPanel() {
        const panel = document.createElement('div');
        panel.className = 'carnival-control-panel';
        panel.innerHTML = `
            <div class="carnival-panel-toggle" id="carnivalToggle">
                🎪
            </div>
            <div class="carnival-panel-content" id="carnivalPanel">
                <h3>🎡 Carnival Features</h3>
                <div class="carnival-buttons">
                    <button class="carnival-btn" data-feature="memory">🃏 Memory Game</button>
                    <button class="carnival-btn" data-feature="snow">❄️ Snow</button>
                    <button class="carnival-btn" data-feature="fireworks">🎆 Fireworks</button>
                    <button class="carnival-btn" data-feature="whack">💗 Whack-A-Heart</button>
                </div>
            </div>
        `;
        document.body.appendChild(panel);

        // Toggle Panel
        document.getElementById('carnivalToggle').addEventListener('click', () => {
            const content = document.getElementById('carnivalPanel');
            content.classList.toggle('active');
        });

        // Button Click Handlers
        document.querySelectorAll('.carnival-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const feature = e.target.dataset.feature;
                this.toggleFeature(feature);
                btn.classList.toggle('active');
            });
        });
    }

    toggleFeature(feature) {
        const features = {
            memory: () => this.showMemoryGame(),
            snow: () => this.toggleSnow(),
            fireworks: () => this.triggerFireworks(),
            whack: () => this.showWhackAHeart()
        };

        if (features[feature]) {
            features[feature]();
        }
    }

    // ========== MEMORY GAME ==========
    initMemoryGame() {
        this.memoryCards = ['💕', '💖', '💗', '💘', '💝', '💞', '💓', '❤️'];
    }

    showMemoryGame() {
        if (document.getElementById('memoryGameModal')) return;

        const cards = [...this.memoryCards, ...this.memoryCards].sort(() => Math.random() - 0.5);

        const modal = document.createElement('div');
        modal.id = 'memoryGameModal';
        modal.className = 'carnival-modal';
        modal.innerHTML = `
            <div class="carnival-modal-content">
                <span class="carnival-close">&times;</span>
                <h2>🃏 Memory Game</h2>
                <div class="memory-stats">
                    <span>Moves: <span id="memoryMoves">0</span></span>
                    <span>Matches: <span id="memoryMatches">0</span>/8</span>
                </div>
                <div class="memory-grid" id="memoryGrid"></div>
                <button class="carnival-reset-btn" id="memoryReset">🔄 Reset</button>
            </div>
        `;
        document.body.appendChild(modal);

        const grid = document.getElementById('memoryGrid');
        cards.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.emoji = emoji;
            card.dataset.index = index;
            card.innerHTML = '<div class="card-front">?</div><div class="card-back">' + emoji + '</div>';
            grid.appendChild(card);
        });

        this.initMemoryGameLogic();

        modal.querySelector('.carnival-close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        document.getElementById('memoryReset').addEventListener('click', () => {
            modal.remove();
            this.showMemoryGame();
        });
    }

    initMemoryGameLogic() {
        let flippedCards = [];
        let moves = 0;
        let matches = 0;

        document.querySelectorAll('.memory-card').forEach(card => {
            card.addEventListener('click', () => {
                if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
                if (flippedCards.length >= 2) return;

                card.classList.add('flipped');
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    moves++;
                    document.getElementById('memoryMoves').textContent = moves;

                    const [card1, card2] = flippedCards;
                    if (card1.dataset.emoji === card2.dataset.emoji) {
                        // Match!
                        setTimeout(() => {
                            card1.classList.add('matched');
                            card2.classList.add('matched');
                            matches++;
                            document.getElementById('memoryMatches').textContent = matches;

                            if (matches === 8) {
                                setTimeout(() => {
                                    alert('🎉 Congratulations! You won in ' + moves + ' moves!');
                                    this.triggerFireworks();
                                }, 500);
                            }
                        }, 500);
                        flippedCards = [];
                    } else {
                        // No match
                        setTimeout(() => {
                            card1.classList.remove('flipped');
                            card2.classList.remove('flipped');
                            flippedCards = [];
                        }, 1000);
                    }
                }
            });
        });
    }

    // ========== SNOWFALL ==========
    initSnowfall() {
        this.snowActive = false;
        this.snowInterval = null;
    }

    toggleSnow() {
        if (this.snowActive) {
            this.snowActive = false;
            if (this.snowInterval) clearInterval(this.snowInterval);
            document.querySelectorAll('.snowflake').forEach(s => s.remove());
        } else {
            this.snowActive = true;
            this.snowInterval = setInterval(() => this.createSnowflake(), 200);
        }
    }

    createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';

        document.body.appendChild(snowflake);

        setTimeout(() => snowflake.remove(), 5000);
    }

    // ========== FIREWORKS ==========
    initFireworks() {
        // Fireworks will be triggered on demand
    }

    triggerFireworks() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => this.createFirework(), i * 200);
        }
    }

    createFirework() {
        const colors = ['#FF4778', '#9D50BB', '#FFB6C1', '#FF95A8', '#FFD700', '#00F5FF'];
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.5);

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 2 + Math.random() * 2;
            particle.style.setProperty('--tx', Math.cos(angle) * velocity * 50 + 'px');
            particle.style.setProperty('--ty', Math.sin(angle) * velocity * 50 + 'px');

            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 1000);
        }
    }

    // ========== WHACK-A-HEART ==========
    initWhackAHeart() {
        // Will be shown on demand
    }

    showWhackAHeart() {
        if (document.getElementById('whackGameModal')) return;

        const modal = document.createElement('div');
        modal.id = 'whackGameModal';
        modal.className = 'carnival-modal';
        modal.innerHTML = `
            <div class="carnival-modal-content">
                <span class="carnival-close">&times;</span>
                <h2>💗 Whack-A-Heart</h2>
                <div class="whack-stats">
                    <span>Score: <span id="whackScore">0</span></span>
                    <span>Time: <span id="whackTime">30</span>s</span>
                </div>
                <div class="whack-grid" id="whackGrid">
                    ${Array(9).fill(0).map((_, i) => `<div class="whack-hole" data-index="${i}"></div>`).join('')}
                </div>
                <button class="carnival-reset-btn" id="whackStart">Start Game!</button>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('whackStart').addEventListener('click', () => this.startWhackGame());

        modal.querySelector('.carnival-close').addEventListener('click', () => {
            modal.remove();
            if (this.whackGameInterval) clearInterval(this.whackGameInterval);
            if (this.whackTimeInterval) clearInterval(this.whackTimeInterval);
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                if (this.whackGameInterval) clearInterval(this.whackGameInterval);
                if (this.whackTimeInterval) clearInterval(this.whackTimeInterval);
            }
        });
    }

    startWhackGame() {
        let score = 0;
        let timeLeft = 30;

        document.getElementById('whackScore').textContent = score;
        document.getElementById('whackTime').textContent = timeLeft;
        document.getElementById('whackStart').disabled = true;
        document.getElementById('whackStart').textContent = 'Playing...';

        // Clear existing hearts
        document.querySelectorAll('.whack-heart').forEach(h => h.remove());

        // Timer
        this.whackTimeInterval = setInterval(() => {
            timeLeft--;
            document.getElementById('whackTime').textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(this.whackGameInterval);
                clearInterval(this.whackTimeInterval);
                alert(`Game Over! Your score: ${score} 💖`);
                document.getElementById('whackStart').disabled = false;
                document.getElementById('whackStart').textContent = 'Play Again!';
            }
        }, 1000);

        // Spawn hearts
        this.whackGameInterval = setInterval(() => {
            const holes = document.querySelectorAll('.whack-hole');
            const randomHole = holes[Math.floor(Math.random() * holes.length)];

            if (randomHole.querySelector('.whack-heart')) return;

            const heart = document.createElement('div');
            heart.className = 'whack-heart';
            heart.textContent = '💖';
            randomHole.appendChild(heart);

            heart.addEventListener('click', () => {
                score++;
                document.getElementById('whackScore').textContent = score;
                heart.style.animation = 'heartPop 0.3s ease-out';
                setTimeout(() => heart.remove(), 300);
            });

            setTimeout(() => {
                if (heart.parentNode) heart.remove();
            }, 1500);
        }, 600);
    }

    // ========== UTILITY FUNCTIONS ==========
    triggerConfetti() {
        if (window.enhancedInteractive && window.enhancedInteractive.triggerConfetti) {
            window.enhancedInteractive.triggerConfetti();
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.carnivalFeatures = new CarnivalFeatures();
    });
} else {
    window.carnivalFeatures = new CarnivalFeatures();
}
