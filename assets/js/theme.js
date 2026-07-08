// Theme management module (Light/Dark theme)

const THEME_KEY = 'sanuma-theme';

// Get current theme from localStorage or system preferences
export function getSavedTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    return saved;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme) {
    const root = document.documentElement;

    root.setAttribute("data-theme", theme);

    localStorage.setItem(THEME_KEY, theme);

    const metaThemeColor = document.querySelector(
        'meta[name="theme-color"]'
    );

    if (metaThemeColor) {
        metaThemeColor.content =
            theme === "dark"
                ? "#0A0A0A"
                : "#FFFFFF";
    }
}

// Toggle between light and dark
export function toggleTheme() {
  const current = getSavedTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
  
  // Dispatch custom event for dynamic entities like ThreeJS scenes
  window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: next } }));
  return next;
}

// Initialize the theme toggle UI listeners
export function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  if (!toggleBtns.length) return;
  
  toggleBtns.forEach(btn => {
    // Set initial aria-label
    const current = getSavedTheme();
    btn.setAttribute('aria-label', `Switch to ${current === 'dark' ? 'light' : 'dark'} theme`);
    
    btn.addEventListener('click', () => {
      const nextTheme = toggleTheme();
      btn.setAttribute('aria-label', `Switch to ${nextTheme === 'dark' ? 'light' : 'dark'} theme`);
    });
  });
}
