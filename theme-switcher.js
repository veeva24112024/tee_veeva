// Theme Switcher - เปลี่ยนธีมสี

class ThemeSwitcher {
    constructor() {
        this.themes = {
            pink: {
                name: 'Pink Romance',
                primary: '#FF4778',
                primaryLight: '#FF95A8',
                primaryLighter: '#FFB6C1',
                gradient: 'linear-gradient(135deg, #FFC1CC 0%, #F8E1E9 100%)'
            },
            purple: {
                name: 'Purple Dream',
                primary: '#8A2BE2',
                primaryLight: '#DA70D6',
                primaryLighter: '#E6B8F5',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            },
            blue: {
                name: 'Ocean Blue',
                primary: '#1E90FF',
                primaryLight: '#87CEEB',
                primaryLighter: '#B0E0E6',
                gradient: 'linear-gradient(135deg, #667eea 0%, #00d2ff 100%)'
            },
            red: {
                name: 'Passionate Red',
                primary: '#FF0000',
                primaryLight: '#FF6B6B',
                primaryLighter: '#FFB3B3',
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
            },
            green: {
                name: 'Fresh Green',
                primary: '#23a35a',
                primaryLight: '#90EE90',
                primaryLighter: '#C1FFC1',
                gradient: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)'
            },
            sunset: {
                name: 'Sunset Orange',
                primary: '#FF6B35',
                primaryLight: '#FFA07A',
                primaryLighter: '#FFDAB9',
                gradient: 'linear-gradient(135deg, #f83600 0%, #f9d423 100%)'
            },
            lavender: {
                name: 'Lavender Dreams',
                primary: '#9370DB',
                primaryLight: '#D8BFD8',
                primaryLighter: '#E6E6FA',
                gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
            },
            midnight: {
                name: 'Midnight Blue',
                primary: '#191970',
                primaryLight: '#4169E1',
                primaryLighter: '#6495ED',
                gradient: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)'
            }
        };

        this.currentTheme = 'pink';
        this.init();
    }

    init() {
        this.createThemeSwitcher();
        this.loadSavedTheme();
    }

    createThemeSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';
        switcher.innerHTML = `
            <button class="theme-toggle-btn" id="themeToggleBtn">
                <span class="theme-icon">🎨</span>
            </button>
            <div class="theme-panel" id="themePanel">
                <div class="theme-panel-header">
                    <h3>เลือกธีมสี</h3>
                    <button class="theme-panel-close" id="themePanelClose">&times;</button>
                </div>
                <div class="theme-options">
                    ${Object.entries(this.themes).map(([key, theme]) => `
                        <button class="theme-option" data-theme="${key}">
                            <div class="theme-preview" style="background: ${theme.gradient}"></div>
                            <span class="theme-name">${theme.name}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(switcher);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .theme-switcher {
                position: fixed;
                bottom: 20px;
                left: 20px;
                z-index: 10000;
            }

            .theme-toggle-btn {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: none;
                background: linear-gradient(135deg, var(--primary), var(--primary-light));
                color: white;
                font-size: 28px;
                cursor: pointer;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                transition: all 0.3s ease;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .theme-toggle-btn:hover {
                transform: scale(1.1) rotate(15deg);
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
            }

            .theme-panel {
                position: absolute;
                bottom: 80px;
                left: 0;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                border-radius: 20px;
                padding: 20px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                width: 300px;
                max-height: 500px;
                overflow-y: auto;
                opacity: 0;
                transform: translateY(20px) scale(0.9);
                pointer-events: none;
                transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }

            .theme-panel.active {
                opacity: 1;
                transform: translateY(0) scale(1);
                pointer-events: all;
            }

            .theme-panel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 2px solid rgba(0, 0, 0, 0.1);
            }

            .theme-panel-header h3 {
                margin: 0;
                color: var(--primary);
                font-size: 18px;
                font-family: 'Prompt', sans-serif;
            }

            .theme-panel-close {
                background: none;
                border: none;
                font-size: 28px;
                color: #999;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .theme-panel-close:hover {
                color: var(--primary);
                transform: rotate(90deg);
            }

            .theme-options {
                display: grid;
                grid-template-columns: 1fr;
                gap: 10px;
            }

            .theme-option {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 12px;
                border: 2px solid transparent;
                border-radius: 12px;
                background: white;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .theme-option:hover {
                border-color: var(--primary);
                transform: translateX(5px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }

            .theme-option.active {
                border-color: var(--primary);
                background: rgba(255, 71, 120, 0.1);
            }

            .theme-preview {
                width: 50px;
                height: 50px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }

            .theme-name {
                font-family: 'Prompt', sans-serif;
                color: #333;
                font-weight: 500;
            }

            @media (max-width: 768px) {
                .theme-switcher {
                    bottom: 10px;
                    left: 10px;
                }

                .theme-toggle-btn {
                    width: 50px;
                    height: 50px;
                    font-size: 24px;
                }

                .theme-panel {
                    width: 280px;
                }
            }
        `;
        document.head.appendChild(style);

        // Add event listeners
        this.addEventListeners();
    }

    addEventListeners() {
        const toggleBtn = document.getElementById('themeToggleBtn');
        const panel = document.getElementById('themePanel');
        const closeBtn = document.getElementById('themePanelClose');
        const themeOptions = document.querySelectorAll('.theme-option');

        toggleBtn.addEventListener('click', () => {
            panel.classList.toggle('active');
        });

        closeBtn.addEventListener('click', () => {
            panel.classList.remove('active');
        });

        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                this.applyTheme(theme);

                // Update active state
                themeOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');

                // Close panel after selection
                setTimeout(() => {
                    panel.classList.remove('active');
                }, 300);
            });
        });

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.theme-switcher')) {
                panel.classList.remove('active');
            }
        });
    }

    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;

        this.currentTheme = themeName;

        // Apply CSS variables with !important
        document.documentElement.style.setProperty('--primary', theme.primary);
        document.documentElement.style.setProperty('--primary-light', theme.primaryLight);
        document.documentElement.style.setProperty('--primary-lighter', theme.primaryLighter);

        // Apply gradient to body/background
        const background = document.querySelector('.background');
        if (background) {
            background.style.background = theme.gradient;
            background.style.backgroundImage = theme.gradient;
        }

        // Force update body background
        if (document.body.style.background) {
            document.body.style.background = theme.gradient;
        }

        // Update all gradients
        this.updateAllGradients(theme);

        // Update particles color
        this.updateParticlesColor(theme.primary);

        // Save theme preference
        localStorage.setItem('selectedTheme', themeName);

        // Show notification
        this.showNotification(`ธีม "${theme.name}" ถูกเลือกแล้ว! ✨`);
    }

    updateAllGradients(theme) {
        // Update buttons with gradients
        const selectors = [
            '.love-button',
            '.yes-button',
            '.audio-toggle',
            '.interactive-btn',
            '.demo-button',
            '.theme-toggle-btn',
            'button[style*="gradient"]'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                const currentBg = window.getComputedStyle(el).background;
                if (currentBg.includes('gradient') || currentBg.includes('linear')) {
                    el.style.background = `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`;
                    el.style.backgroundImage = `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`;
                }
            });
        });

        // Update countdown toggles
        document.querySelectorAll('.countdown-toggle.active').forEach(el => {
            el.style.background = theme.primary;
        });

        // Update text shadows
        document.querySelectorAll('.title, .subtitle').forEach(el => {
            el.style.textShadow = `0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px ${theme.primaryLight}`;
        });
    }

    updateParticlesColor(color) {
        // Update particle colors if particle system exists
        if (window.particleSystem) {
            window.particleSystem.updateColor(color);
        }
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('selectedTheme') || 'pink';
        if (savedTheme && this.themes[savedTheme]) {
            this.applyTheme(savedTheme);

            // Update active state
            setTimeout(() => {
                const option = document.querySelector(`[data-theme="${savedTheme}"]`);
                if (option) {
                    option.classList.add('active');
                }
            }, 100);
        } else {
            // Set pink as active by default
            setTimeout(() => {
                const pinkOption = document.querySelector('[data-theme="pink"]');
                if (pinkOption) {
                    pinkOption.classList.add('active');
                }
            }, 100);
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            background: linear-gradient(135deg, var(--primary), var(--primary-light));
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            font-family: 'Prompt', sans-serif;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10001;
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);

        // Animate out
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(-100px)';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
}

// Initialize theme switcher when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.themeSwitcher = new ThemeSwitcher();
    });
} else {
    window.themeSwitcher = new ThemeSwitcher();
}
