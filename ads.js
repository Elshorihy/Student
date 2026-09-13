(() => {
  const cfg = window.OMNITRACK_ADS || {};
  if (!cfg.ENABLED || !cfg.ADSENSE_CLIENT) return;

  const loadScript = () => new Promise((resolve, reject) => {
    if (window.adsbygoogle) return resolve();
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(cfg.ADSENSE_CLIENT)}`;
    s.crossOrigin = 'anonymous';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });

  const makeAd = (slot) => {
    if (!slot) return null;
    const wrap = document.createElement('div');
    wrap.className = 'omni-ad my-5 flex justify-center min-h-[90px]';
    wrap.innerHTML = `<ins class="adsbygoogle" style="display:block;width:100%;min-height:90px" data-ad-client="${cfg.ADSENSE_CLIENT}" data-ad-slot="${slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
    return wrap;
  };

  const mount = async () => {
    try {
      await loadScript();
      const main = document.querySelector('main');
      if (!main) return;
      if (cfg.TOP_SLOT && !document.querySelector('[data-omni-ad-top]')) {
        const ad = makeAd(cfg.TOP_SLOT);
        if (ad) { ad.dataset.omniAdTop = '1'; main.prepend(ad); }
      }
      if (cfg.BOTTOM_SLOT && !document.querySelector('[data-omni-ad-bottom]')) {
        const ad = makeAd(cfg.BOTTOM_SLOT);
        if (ad) { ad.dataset.omniAdBottom = '1'; main.append(ad); }
      }
      document.querySelectorAll('.adsbygoogle').forEach(() => { try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {} });
    } catch {}
  };

  new MutationObserver(mount).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('load', mount, { once: true });
})();
