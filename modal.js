// ── МАСТЕР: форма регистрации ─────────────────────────────────
(function () {
  const overlay = document.getElementById('masterModal');
  if (!overlay) return;

  const modal        = overlay.querySelector('.modal');
  const formEl       = document.getElementById('masterRegForm');
  const successBlock = document.getElementById('masterRegSuccess');

  // Открыть
  document.querySelectorAll('.js-open-master-modal').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Закрыть — крестик
  overlay.querySelector('.modal-close').addEventListener('click', closeModal);

  // Закрыть — клик по затемнению (не по самому модалу)
  overlay.addEventListener('click', e => {
    if (!modal.contains(e.target)) closeModal();
  });

  // Закрыть — Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Отправка
  if (formEl) {
    formEl.addEventListener('submit', () => {
      setTimeout(() => {
        formEl.style.display = 'none';
        successBlock.style.display = 'block';
      }, 600);
    });
  }
})();
