/* ═══════════════════════════════════════════════════════════════
   SHOW DIGITAL SHIELD v1.0
   Protection & Watermark System
   © 2026 Show Digital — All Rights Reserved
   
   This script protects websites built by Show Digital.
   Unauthorized removal of this script is prohibited.
   ═══════════════════════════════════════════════════════════════ */
(function() {
  'use strict';

  // ── Run when DOM is ready ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _sdInit);
  } else {
    _sdInit();
  }

  function _sdInit() {
    // _sdInjectWatermark(); // COMMENTED OUT: watermark now hardcoded in HTML
    _sdSetupProtections();
    _sdConsoleWarning();
    _sdDebuggerTrap();
  }

  // ═══════════════════════════════════════
  // 1. WATERMARK INJECTION
  // ═══════════════════════════════════════
  function _sdInjectWatermark() {
    var scriptTag = document.currentScript || document.querySelector('script[src*="shield.js"]');
    var dataAccent = scriptTag ? scriptTag.getAttribute('data-accent') : null;
    var dataTheme = scriptTag ? scriptTag.getAttribute('data-theme') : null;

    // Auto-detect accent color from project CSS variables
    var root = getComputedStyle(document.documentElement);
    var accentColor = dataAccent ||
      root.getPropertyValue('--accent').trim() ||
      root.getPropertyValue('--clr-accent').trim() ||
      root.getPropertyValue('--color-cta').trim() ||
      root.getPropertyValue('--color-primary').trim() ||
      root.getPropertyValue('--natural-green').trim() ||
      root.getPropertyValue('--primary').trim() ||
      root.getPropertyValue('--olive').trim() ||
      '#0d9488';

    // Always append to body for floating design
    var container = document.body;

    // Detect dark vs light theme
    var isFooterDark = false;
    if (dataTheme === 'dark') {
      isFooterDark = true;
    } else if (dataTheme === 'light') {
      isFooterDark = false;
    } else {
      var containerTextColor = window.getComputedStyle(container).color;
      isFooterDark = !_sdIsDarkColor(containerTextColor);
    }

    // Ensure the accent color contrasts well
    if (!dataAccent) {
      var computedAccent = _sdGetComputedRGB(accentColor);
      var isAccentDark = _sdIsDarkColor(computedAccent);
      
      if (isFooterDark && isAccentDark) {
        accentColor = '#2dd4bf'; // Light teal fallback for dark theme
      } else if (!isFooterDark && !isAccentDark) {
        accentColor = '#0f766e'; // Dark teal fallback for light theme
      }
    }

    var isDark = isFooterDark;

    // Create floating watermark element
    var wm = document.createElement('div');
    wm.className = 'sd-shield-wm';
    wm.setAttribute('data-nosnippet', '');
    wm.innerHTML =
      '<div class="sd-shield-wm-inner">' +
        '<svg class="sd-shield-wm-icon" viewBox="0 0 24 24" fill="none" stroke="' + accentColor + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' +
        '</svg>' +
        '<span>Designed & Built by <strong>Hassnain</strong> &mdash; ' +
        '<a href="https://showdigital.web.app" target="_blank" rel="noopener noreferrer">Show Digital</a></span>' +
      '</div>';

    // Inject styles
    var s = document.createElement('style');
    s.textContent =
      '.sd-shield-wm{' +
        'position:fixed;' +
        'bottom:24px;' +
        'left:24px;' +
        'padding:10px 16px;' +
        'border-radius:50px;' +
        'font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;' +
        'font-size:12px;' +
        'letter-spacing:0.02em;' +
        'color:' + (isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)') + ';' +
        'background:' + (isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)') + ';' +
        'backdrop-filter:blur(10px);' +
        '-webkit-backdrop-filter:blur(10px);' +
        'border:1px solid ' + (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)') + ';' +
        'box-shadow:0 8px 24px rgba(0,0,0,0.15);' +
        'z-index:9999;' +
        'transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);' +
        'display:inline-flex;' +
        'align-items:center;' +
        'pointer-events:auto;' +
      '}' +
      '.sd-shield-wm:hover{' +
        'transform:translateY(-3px);' +
        'box-shadow:0 12px 28px rgba(0,0,0,0.25);' +
        'color:' + (isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)') + ';' +
        'border-color:' + (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)') + ';' +
      '}' +
      '.sd-shield-wm-inner{' +
        'display:inline-flex;' +
        'align-items:center;' +
        'gap:8px;' +
      '}' +
      '.sd-shield-wm-icon{' +
        'width:14px;' +
        'height:14px;' +
        'flex-shrink:0;' +
        'opacity:0.9;' +
      '}' +
      '.sd-shield-wm strong{' +
        'font-weight:600;' +
        'color:' + (isDark ? '#fff' : '#000') + ';' +
      '}' +
      '.sd-shield-wm a{' +
        'color:' + accentColor + ';' +
        'text-decoration:none;' +
        'font-weight:600;' +
        'transition:opacity 0.3s ease;' +
      '}' +
      '.sd-shield-wm a:hover{opacity:0.8;}' +
      '@media (max-width: 768px) {' +
        '.sd-shield-wm { bottom: 16px; left: 16px; padding: 8px 12px; font-size: 10px; }' +
        '.sd-shield-wm-icon { width: 12px; height: 12px; }' +
      '}';
    document.head.appendChild(s);

    container.appendChild(wm);
  }

  // ═══════════════════════════════════════
  // 2. ANTI-COPY PROTECTIONS (Middle Ground)
  // ═══════════════════════════════════════
  function _sdSetupProtections() {
    // Block keyboard shortcuts that enable cloning
    document.addEventListener('keydown', function(e) {
      var k = e.key ? e.key.toLowerCase() : '';

      // F12 — DevTools
      if (e.keyCode === 123 || k === 'f12') {
        e.preventDefault(); e.stopPropagation(); return false;
      }
      // Ctrl+U — View Source
      if ((e.ctrlKey || e.metaKey) && k === 'u') {
        e.preventDefault(); e.stopPropagation(); return false;
      }
      // Ctrl+S — Save Page
      if ((e.ctrlKey || e.metaKey) && k === 's') {
        e.preventDefault(); e.stopPropagation(); return false;
      }
      // Ctrl+Shift+I — DevTools
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && k === 'i') {
        e.preventDefault(); e.stopPropagation(); return false;
      }
      // Ctrl+Shift+J — Console
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && k === 'j') {
        e.preventDefault(); e.stopPropagation(); return false;
      }
      // Ctrl+Shift+C — Element Picker
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && k === 'c') {
        e.preventDefault(); e.stopPropagation(); return false;
      }
    }, true);

    // Prevent image dragging (can't drag-save images)
    document.addEventListener('dragstart', function(e) {
      if (e.target.tagName === 'IMG' || e.target.tagName === 'SVG') {
        e.preventDefault();
      }
    });

    // Block right-click context menu
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });
  }

  // ═══════════════════════════════════════
  // 3. CONSOLE WARNING
  // ═══════════════════════════════════════
  function _sdConsoleWarning() {
    var line = '═'.repeat(50);
    console.log(
      '\n%c' + line +
      '\n  ⚠️  PROTECTED BY SHOW DIGITAL' +
      '\n' + line,
      'color:#0d9488;font-size:14px;font-weight:bold;'
    );
    console.log(
      '%c  This website was designed & built by Hassnain from Show Digital.\n' +
      '  Unauthorized copying, cloning, or reproduction is strictly prohibited.\n' +
      '  Contact: showdigital.agency@gmail.com\n' +
      '  Website: https://showdigital.web.app\n',
      'color:#888;font-size:11px;'
    );
    console.log(
      '%c' + line + '\n',
      'color:#0d9488;font-size:14px;'
    );
  }

  // ═══════════════════════════════════════
  // UTILITY: Detect dark background
  // ═══════════════════════════════════════
  function _sdIsDarkColor(colorStr) {
    if (!colorStr) return false;
    var m = colorStr.match(/\d+/g);
    if (!m || m.length < 3) return false;
    var r = parseInt(m[0]), g = parseInt(m[1]), b = parseInt(m[2]);
    // Perceived brightness formula
    var brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  }

  // ═══════════════════════════════════════
  // UTILITY: Convert any CSS color to RGB
  // ═══════════════════════════════════════
  function _sdGetComputedRGB(colorStr) {
    var d = document.createElement('div');
    d.style.color = colorStr;
    d.style.display = 'none';
    document.body.appendChild(d);
    var computed = window.getComputedStyle(d).color;
    document.body.removeChild(d);
    return computed;
  }

  // ═══════════════════════════════════════
  // 4. DEBUGGER TRAP (Anti-DevTools)
  // ═══════════════════════════════════════
  function _sdDebuggerTrap() {
    // 1. Safe from screen rotation / split-screen because it purely measures JS execution time, not window size.
    // 2. Synchronously hides the body before debugger hits, so the screen is blank WHILE they are paused!
    setInterval(function() {
      var start = new Date().getTime();
      
      // Hide body. Normal users won't see a flicker because JS is single-threaded and restores it instantly.
      var oldDisplay = document.body ? document.body.style.display : '';
      if (document.body) document.body.style.display = 'none';
      
      Function("debugger")();
      
      var end = new Date().getTime();
      
      // If it took >200ms to run the debugger, it means DevTools paused execution.
      if (end - start > 200) {
        if (document.head) document.head.innerHTML = '';
        if (document.body) {
          document.body.innerHTML = "<div style='display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#fff;font-family:sans-serif;font-size:24px;text-align:center;padding:20px;width:100vw;'><p>Developer Tools are strictly prohibited on this website.<br><span style='font-size:14px;color:#888;margin-top:10px;display:block;'>Access Denied.</span></p></div>";
          document.body.style.display = 'block';
        }
      } else {
        if (document.body) document.body.style.display = oldDisplay;
      }
    }, 500);
  }

})();
