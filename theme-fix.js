// Theme Fix - แก้ไขปัญหาสีไม่เปลี่ยน

// Override applyTheme function
document.addEventListener('DOMContentLoaded', function() {
    // Wait for theme switcher to load
    setTimeout(() => {
        if (window.themeSwitcher) {
            // Store original function
            const originalApplyTheme = window.themeSwitcher.applyTheme.bind(window.themeSwitcher);

            // Override with fixed version
            window.themeSwitcher.applyTheme = function(themeName) {
                const theme = this.themes[themeName];
                if (!theme) return;

                console.log('Applying theme:', themeName, theme);

                this.currentTheme = themeName;

                // 1. Apply CSS variables
                const root = document.documentElement;
                root.style.setProperty('--primary', theme.primary);
                root.style.setProperty('--primary-light', theme.primaryLight);
                root.style.setProperty('--primary-lighter', theme.primaryLighter);

                // 2. Update background - ต้องเปลี่ยนพื้นหลังหลักให้แน่ใจ
                const background = document.querySelector('.background');
                if (background) {
                    background.style.cssText = `background: ${theme.gradient} !important;`;
                }

                // 3. Update body - บังคับเปลี่ยนพื้นหลัง
                document.body.style.background = theme.gradient;
                document.body.style.backgroundImage = '';

                // 4. Update animated background
                const animatedBg = document.getElementById('animatedBg');
                if (animatedBg) {
                    animatedBg.style.background = theme.gradient;
                }

                // 5. Update ALL elements ที่มี gradient background
                const allElements = document.querySelectorAll('*');
                allElements.forEach(el => {
                    const computed = window.getComputedStyle(el);
                    const bg = computed.background;
                    const bgImage = computed.backgroundImage;

                    // ถ้ามี gradient และเป็นสีชมพู/แดง ให้เปลี่ยน
                    if ((bg && bg.includes('gradient')) || (bgImage && bgImage.includes('gradient'))) {
                        // เช็คว่าเป็นพื้นหลังที่ต้องเปลี่ยนหรือไม่
                        const shouldChange =
                            bg.includes('255, 193, 204') || // #FFC1CC
                            bg.includes('248, 225, 233') || // #F8E1E9
                            bg.includes('255, 71, 120') ||  // #FF4778
                            bg.includes('255, 149, 168') || // #FF95A8
                            bg.includes('rgb(255') ||
                            bgImage.includes('#FF') ||
                            el.classList.contains('background') ||
                            el.tagName === 'BODY';

                        if (shouldChange) {
                            el.style.background = theme.gradient;
                            el.style.backgroundImage = '';
                        }
                    }

                    // Update inline gradient styles
                    const inlineStyle = el.getAttribute('style');
                    if (inlineStyle && inlineStyle.includes('gradient')) {
                        if (inlineStyle.includes('#FF') || inlineStyle.includes('rgb(255')) {
                            el.style.background = `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`;
                        }
                    }
                });

                // 5. Update specific buttons
                const buttonSelectors = [
                    '.love-button',
                    '.yes-button',
                    '.response-button.yes-button',
                    '.audio-toggle',
                    '.interactive-btn',
                    '.demo-button',
                    '.theme-toggle-btn',
                    '.countdown-toggle.active',
                    '.color-option.color-pink'
                ];

                buttonSelectors.forEach(selector => {
                    document.querySelectorAll(selector).forEach(btn => {
                        btn.style.cssText = btn.style.cssText +
                            `background: linear-gradient(45deg, ${theme.primary}, ${theme.primaryLight}) !important;`;
                    });
                });

                // 6. Update text colors
                document.querySelectorAll('.title, .subtitle, h1, h2, h3').forEach(el => {
                    if (window.getComputedStyle(el).color.includes('255, 71, 120')) {
                        el.style.color = theme.primary;
                    }
                });

                // 7. Update hearts and special elements
                document.querySelectorAll('.floating-heart, .spinning-heart').forEach(el => {
                    const bgImage = el.style.backgroundImage;
                    if (bgImage && bgImage.includes('FF6B8B')) {
                        const hexColor = theme.primary.replace('#', '%23');
                        el.style.backgroundImage = bgImage.replace(/FF6B8B/g, hexColor.substring(3));
                    }
                });

                // 8. Update shadows
                document.querySelectorAll('.slide, .message, .title').forEach(el => {
                    const textShadow = window.getComputedStyle(el).textShadow;
                    if (textShadow && textShadow !== 'none') {
                        el.style.textShadow = `0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px ${theme.primaryLight}`;
                    }
                });

                // 9. Update box shadows
                document.querySelectorAll('.love-button, .slide, .gallery-container').forEach(el => {
                    const boxShadow = window.getComputedStyle(el).boxShadow;
                    if (boxShadow && boxShadow !== 'none') {
                        el.style.boxShadow = boxShadow.replace(/rgba?\([^)]+\)/g,
                            `rgba(${parseInt(theme.primary.slice(1,3), 16)}, ${parseInt(theme.primary.slice(3,5), 16)}, ${parseInt(theme.primary.slice(5,7), 16)}, 0.4)`);
                    }
                });

                // 10. Update particles if exists
                if (window.particleSystem) {
                    window.particleSystem.updateColor(theme.primary);
                }

                // 11. Save theme
                localStorage.setItem('selectedTheme', themeName);

                // 12. Show notification
                this.showNotification(`ธีม "${theme.name}" ถูกเลือกแล้ว! ✨`);

                // 13. Force repaint
                document.body.offsetHeight;

                console.log('Theme applied successfully!');
            };

            console.log('✅ Theme fix loaded!');
        }
    }, 500);
});

// Helper function to convert hex to rgba
function hexToRgba(hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Add global style override
const style = document.createElement('style');
style.id = 'theme-override';
style.textContent = `
    /* Force theme colors */
    .love-button,
    .yes-button,
    .response-button.yes-button,
    .audio-toggle,
    .interactive-btn,
    .demo-button,
    .theme-toggle-btn {
        background: linear-gradient(45deg, var(--primary), var(--primary-light)) !important;
    }

    .countdown-toggle.active {
        background: var(--primary) !important;
    }

    .title,
    .subtitle {
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px var(--primary-light) !important;
    }

    .slide,
    .message,
    .gallery-container {
        box-shadow: 0 10px 30px rgba(255, 71, 120, 0.2) !important;
    }

    /* Cursor colors */
    .cursor-dot {
        background: var(--primary) !important;
        box-shadow: 0 0 20px var(--primary) !important;
    }

    .cursor-outline {
        border-color: var(--primary) !important;
    }

    .cursor-trail {
        background: linear-gradient(45deg, var(--primary), var(--primary-light)) !important;
    }

    /* Scroll progress */
    .scroll-progress {
        background: linear-gradient(90deg, var(--primary), var(--primary-light), var(--primary-lighter)) !important;
    }

    /* Visualizer */
    .visualizer-bar {
        background: linear-gradient(to top, var(--primary), var(--primary-light)) !important;
    }

    /* Confetti */
    .confetti {
        background: var(--primary) !important;
    }

    /* Ripple */
    .ripple {
        background: rgba(255, 255, 255, 0.6) !important;
    }

    /* Particles */
    .particle {
        opacity: 0.5 !important;
    }
`;
document.head.appendChild(style);

console.log('🎨 Theme fix styles loaded!');
