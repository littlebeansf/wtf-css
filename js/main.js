/* ============================================
   WTF.CSS — MAIN CONTROLLER
   ============================================ */

const DEMOS = {
  eyelid: {
    num: '01',
    name: 'Eye Awakening',
    tech: 'scroll + clip-path',
    file: 'demos/eyelid.html'
  },
  liquid: {
    num: '02',
    name: 'Liquid Text',
    tech: 'SVG filter + canvas',
    file: 'demos/liquid.html'
  },
  depth: {
    num: '03',
    name: 'False Depth',
    tech: '3D parallax + mouse',
    file: 'demos/depth.html'
  },
  glitch: {
    num: '04',
    name: 'Signal Decay',
    tech: 'clip-path + VHS noise',
    file: 'demos/glitch.html'
  },
  particles: {
    num: '05',
    name: 'Matter → Ghost',
    tech: 'canvas pixel sampling',
    file: 'demos/particles.html'
  },
  seidr: {
    num: '06',
    name: 'SEIÐR',
    tech: 'canvas iris + runes',
    file: 'demos/seidr.html'
  }
};

let currentDemo = null;

function loadDemo(id, navEl) {
  if (id === currentDemo) return;
  currentDemo = id;

  const demo = DEMOS[id];
  if (!demo) return;

  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  if (navEl) navEl.classList.add('active');

  // Update label
  document.getElementById('labelNum').textContent = demo.num;
  document.getElementById('labelName').textContent = demo.name;
  document.getElementById('labelTech').textContent = demo.tech;

  // Swap demo frame
  const frame = document.getElementById('demoFrame');

  // Fade out old
  frame.style.opacity = '0';
  frame.style.transform = 'scale(0.99)';
  frame.style.transition = 'opacity 0.25s ease-in, transform 0.25s ease-in';

  setTimeout(() => {
    // Load new iframe
    const iframe = document.createElement('iframe');
    iframe.src = demo.file;
    iframe.setAttribute('loading', 'eager');
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    frame.innerHTML = '';
    frame.appendChild(iframe);

    // Fade in
    requestAnimationFrame(() => {
      frame.style.opacity = '1';
      frame.style.transform = 'scale(1)';
      frame.style.transition = 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  }, 200);

  // Close mobile sidebar
  if (window.innerWidth <= 768) {
    closeSidebar();
  }
}

// MOBILE SIDEBAR
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const isOpen = sidebar.classList.contains('open');
  if (isOpen) {
    closeSidebar();
  } else {
    sidebar.classList.add('open');
    overlay.classList.add('open');
  }
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

// THEME TOGGLE
(function() {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      toggle.innerHTML = theme === 'dark'
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    });
  }
})();

// KEYBOARD NAV
document.addEventListener('keydown', e => {
  const demoIds = Object.keys(DEMOS);
  const currentIdx = demoIds.indexOf(currentDemo);

  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    const next = demoIds[(currentIdx + 1) % demoIds.length];
    const btn = document.querySelector(`[data-demo="${next}"]`);
    loadDemo(next, btn);
  }
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    const prev = demoIds[(currentIdx - 1 + demoIds.length) % demoIds.length];
    const btn = document.querySelector(`[data-demo="${prev}"]`);
    loadDemo(prev, btn);
  }
});

// INIT — load first demo
window.addEventListener('DOMContentLoaded', () => {
  const firstBtn = document.querySelector('[data-demo="eyelid"]');
  loadDemo('eyelid', firstBtn);
});
