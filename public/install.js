(() => {
  let deferredPrompt = null;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'pwa-install-button';
  button.textContent = 'تثبيت التطبيق';
  Object.assign(button.style, {
    position: 'fixed',
    right: '16px',
    bottom: '16px',
    zIndex: '9999',
    border: '1px solid rgba(129,140,248,.45)',
    borderRadius: '14px',
    padding: '11px 16px',
    background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
    color: '#fff',
    font: '700 14px Cairo, Inter, system-ui, sans-serif',
    boxShadow: '0 12px 30px rgba(0,0,0,.35)',
    cursor: 'pointer',
    display: 'none'
  });
  document.body.appendChild(button);

  const show = () => { if (!isStandalone) button.style.display = 'block'; };
  const hide = () => { button.style.display = 'none'; };

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
    show();
  });

  button.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      hide();
      return;
    }

    alert('للتثبيت: افتح قائمة المتصفح ⋮ ثم اختر «إضافة إلى الشاشة الرئيسية» أو «تثبيت التطبيق».');
  });

  window.addEventListener('appinstalled', hide);

  if (!('BeforeInstallPromptEvent' in window) && !isStandalone) {
    setTimeout(show, 1200);
  }
})();
