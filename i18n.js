// ── LANGUAGE SWITCHER ─────────────────────────────────────────
(function () {
  function applyLang(lang) {
    // Simple text content
    document.querySelectorAll('[data-ru]').forEach(el => {
      el.textContent = lang === 'kz' ? (el.dataset.kz || el.dataset.ru) : el.dataset.ru;
    });

    // innerHTML (for elements with nested tags like <em>)
    document.querySelectorAll('[data-ru-html]').forEach(el => {
      el.innerHTML = lang === 'kz' ? (el.dataset.kzHtml || el.dataset.ruHtml) : el.dataset.ruHtml;
    });

    // Input placeholders
    document.querySelectorAll('[data-ru-ph]').forEach(el => {
      el.placeholder = lang === 'kz' ? (el.dataset.kzPh || el.dataset.ruPh) : el.dataset.ruPh;
    });

    // Lang toggle button label (shows the OTHER language)
    const btn = document.getElementById('langToggle');
    if (btn) btn.textContent = lang === 'kz' ? 'РУС' : 'ҚАЗ';

    // Persist & set html[lang]
    localStorage.setItem('bs_lang', lang);
    document.documentElement.setAttribute('lang', lang === 'kz' ? 'kk' : 'ru');

    // Notify other scripts (count, services)
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  window.getLang = () => localStorage.getItem('bs_lang') || 'ru';
  window.applyLang = applyLang;

  document.addEventListener('DOMContentLoaded', () => {
    applyLang(getLang());
    const btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', () => {
        applyLang(getLang() === 'ru' ? 'kz' : 'ru');
      });
    }
  });
})();
