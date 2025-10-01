// Theme Fix V2 - แก้ไขปัญหาสีไม่เปลี่ยนแบบสมบูรณ์

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.themeSwitcher) {
            // Override applyTheme function
            window.themeSwitcher.applyTheme = function(themeName) {
                const theme = this.themes[themeName];
                if (!theme) return;

                console.log('🎨 Applying theme:', themeName, theme);

                this.currentTheme = themeName;

                // ===== STEP 1: CSS Variables =====
                const root = document.documentElement;
                root.style.setProperty('--primary', theme.primary);
                root.style.setProperty('--primary-light', theme.primaryLight);
                root.style.setProperty('--primary-lighter', theme.primaryLighter);

                // ===== STEP 2: Force Update Body Background =====
                document.body.style.setProperty('background', theme.gradient, 'important');
                document.body.style.setProperty('background-image', '', 'important');

                // ===== STEP 3: Update .background Element =====
                const bgElements = document.querySelectorAll('.background, #background, [class*="bg"]');
                bgElements.forEach(el => {
                    el.style.setProperty('background', theme.gradient, 'important');
                    el.style.setProperty('background-image', '', 'important');
                });

                // ===== STEP 4: Update Animated Background =====
                const animatedBg = document.getElementById('animatedBg');
                if (animatedBg) {
                    animatedBg.style.setProperty('background', theme.gradient, 'important');
                }

                // ===== STEP 5: Scan and Update ALL Elements =====
                console.log('🔍 Scanning all elements...');
                let updatedCount = 0;

                document.querySelectorAll('*').forEach(el => {
                    const computed = window.getComputedStyle(el);
                    const bg = computed.background;
                    const bgColor = computed.backgroundColor;
                    const bgImage = computed.backgroundImage;

                    // Check if element has gradient background
                    const hasGradient = (bg && bg.includes('gradient')) ||
                                       (bgImage && bgImage.includes('gradient'));

                    if (hasGradient) {
                        // Check if it's a pink/red gradient that should be changed
                        const isPinkish = bg.includes('255, 193') ||
                                        bg.includes('248, 225') ||
                                        bg.includes('255, 71') ||
                                        bg.includes('255, 149') ||
                                        bg.includes('255, 182') ||
                                        bg.includes('FFC1CC') ||
                                        bg.includes('F8E1E9') ||
                                        bg.includes('FF4778') ||
                                        bg.includes('FF95A8') ||
                                        bgImage.includes('#FF');

                        if (isPinkish || el.tagName === 'BODY' || el.classList.contains('background')) {
                            // Full background change
                            el.style.setProperty('background', theme.gradient, 'important');
                            updatedCount++;
                        } else if (el.tagName === 'BUTTON' ||
                                  el.classList.contains('btn') ||
                                  el.classList.contains('button') ||
                                  el.getAttribute('role') === 'button') {
                            // Button gradient
                            el.style.setProperty('background', `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`, 'important');
                            updatedCount++;
                        }
                    }

                    // Check inline styles
                    const inlineStyle = el.getAttribute('style');
                    if (inlineStyle) {
                        if (inlineStyle.includes('gradient') &&
                           (inlineStyle.includes('#FF') || inlineStyle.includes('rgb(255'))) {
                            el.style.setProperty('background', `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`, 'important');
                            updatedCount++;
                        }

                        // Update solid colors
                        if (inlineStyle.includes('background') &&
                           (inlineStyle.includes('#FF4778') || inlineStyle.includes('rgb(255, 71, 120)'))) {
                            el.style.setProperty('background-color', theme.primary, 'important');
                            updatedCount++;
                        }
                    }
                });

                console.log(`✅ Updated ${updatedCount} elements`);

                // ===== STEP 6: Update Specific Selectors =====
                const selectors = {
                    // Buttons
                    '.love-button': `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`,
                    '.yes-button': `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`,
                    '.response-button.yes-button': `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`,
                    '.audio-toggle': `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`,
                    '.interactive-btn': `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`,
                    '.demo-button': `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`,
                    '.theme-toggle-btn': `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`,

                    // Backgrounds
                    'body': theme.gradient,
                    '.background': theme.gradient,
                    '#animatedBg': theme.gradient,

                    // Active elements
                    '.countdown-toggle.active': theme.primary,
                    '.color-option.active': `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`
                };

                Object.entries(selectors).forEach(([selector, value]) => {
                    document.querySelectorAll(selector).forEach(el => {
                        el.style.setProperty('background', value, 'important');
                        if (selector.includes('body') || selector.includes('background')) {
                            el.style.setProperty('background-image', '', 'important');
                        }
                    });
                });

                // ===== STEP 7: Update Colors =====
                // Text colors
                document.querySelectorAll('.title, .subtitle, h1, h2, h3').forEach(el => {
                    const color = window.getComputedStyle(el).color;
                    if (color.includes('255, 71, 120') || color.includes('255, 193, 204')) {
                        el.style.setProperty('color', theme.primary, 'important');
                    }
                });

                // Border colors
                document.querySelectorAll('*').forEach(el => {
                    const borderColor = window.getComputedStyle(el).borderColor;
                    if (borderColor.includes('255, 71, 120')) {
                        el.style.setProperty('border-color', theme.primary, 'important');
                    }
                });

                // ===== STEP 8: Update Shadows =====
                const rgbPrimary = hexToRgb(theme.primary);
                const rgbLight = hexToRgb(theme.primaryLight);

                // Text shadows
                document.querySelectorAll('.title, .subtitle, .slide, .message').forEach(el => {
                    const textShadow = window.getComputedStyle(el).textShadow;
                    if (textShadow && textShadow !== 'none') {
                        el.style.textShadow = `0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px ${theme.primaryLight}`;
                    }
                });

                // Box shadows
                document.querySelectorAll('button, .card, .slide, .gallery-container, .message').forEach(el => {
                    const boxShadow = window.getComputedStyle(el).boxShadow;
                    if (boxShadow && boxShadow !== 'none' && boxShadow.includes('255')) {
                        el.style.boxShadow = `0 10px 30px rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.3)`;
                    }
                });

                // ===== STEP 9: Update Special Elements =====
                // Floating hearts
                document.querySelectorAll('.floating-heart, .spinning-heart, .heart').forEach(el => {
                    el.style.setProperty('color', theme.primary, 'important');
                    const bgImage = el.style.backgroundImage;
                    if (bgImage && bgImage.includes('FF')) {
                        el.style.backgroundImage = bgImage.replace(/#FF[0-9A-F]{4}/gi, theme.primary);
                    }
                });

                // Color options
                document.querySelectorAll('.color-option').forEach(el => {
                    if (el.getAttribute('data-color') === 'pink') {
                        el.style.setProperty('background', theme.primary, 'important');
                    }
                });

                // ===== STEP 10: Update Particles & Effects =====
                if (window.particleSystem) {
                    window.particleSystem.updateColor(theme.primary);
                }

                // Update cursor
                const cursorDot = document.querySelector('.cursor-dot');
                const cursorOutline = document.querySelector('.cursor-outline');
                if (cursorDot) {
                    cursorDot.style.setProperty('background', theme.primary, 'important');
                    cursorDot.style.setProperty('box-shadow', `0 0 20px ${theme.primary}`, 'important');
                }
                if (cursorOutline) {
                    cursorOutline.style.setProperty('border-color', theme.primary, 'important');
                }

                // ===== STEP 11: Force Repaint =====
                document.body.style.display = 'none';
                document.body.offsetHeight; // Force reflow
                document.body.style.display = '';

                // ===== STEP 12: Save & Notify =====
                localStorage.setItem('selectedTheme', themeName);
                this.showNotification(`ธีม "${theme.name}" ถูกเลือกแล้ว! ✨`);

                console.log('✅ Theme applied successfully!');
                console.log('Background:', document.body.style.background);
            };

            console.log('✅ Theme Fix V2 loaded!');
        }
    }, 500);
});

// Helper function
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 255, g: 71, b: 120 };
}

// Add dynamic CSS to override everything
const dynamicStyle = document.createElement('style');
dynamicStyle.id = 'theme-override-v2';
dynamicStyle.textContent = `
    /* Force all backgrounds to use theme colors */
    body {
        background: var(--primary-gradient, linear-gradient(135deg, #FFC1CC 0%, #F8E1E9 100%)) !important;
    }

    .background {
        background: var(--primary-gradient, linear-gradient(135deg, #FFC1CC 0%, #F8E1E9 100%)) !important;
    }

    /* Force all gradients on buttons */
    .love-button,
    .yes-button,
    .response-button.yes-button,
    .audio-toggle,
    .interactive-btn,
    .demo-button,
    .theme-toggle-btn,
    button[style*="gradient"] {
        background: linear-gradient(135deg, var(--primary), var(--primary-light)) !important;
    }

    /* Active states */
    .countdown-toggle.active {
        background: var(--primary) !important;
    }

    /* Cursor */
    .cursor-dot {
        background: var(--primary) !important;
        box-shadow: 0 0 20px var(--primary) !important;
    }

    .cursor-outline {
        border-color: var(--primary) !important;
    }

    /* Effects */
    .scroll-progress {
        background: linear-gradient(90deg, var(--primary), var(--primary-light), var(--primary-lighter)) !important;
    }

    .visualizer-bar {
        background: linear-gradient(to top, var(--primary), var(--primary-light)) !important;
    }
`;
document.head.appendChild(dynamicStyle);

// Update gradient CSS variable when theme changes
document.addEventListener('DOMContentLoaded', () => {
    const observer = new MutationObserver(() => {
        const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
        const primaryLight = getComputedStyle(document.documentElement).getPropertyValue('--primary-light').trim();

        if (primary && primaryLight) {
            document.documentElement.style.setProperty('--primary-gradient',
                `linear-gradient(135deg, ${primaryLight} 0%, ${primary} 100%)`);
        }
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['style']
    });
});

console.log('🎨 Theme Fix V2 styles loaded!');
