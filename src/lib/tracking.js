let initialized = false;

export function initMarketingTracking({ gtmId, metaPixelId } = {}) {
  if (initialized) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];

  if (gtmId) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    injectScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`);
  }

  if (metaPixelId) {
    installMetaPixel(metaPixelId);
  }
}

export function track(event, payload = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...payload,
  });

  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', event, payload);
  }
}

function injectScript(src) {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function installMetaPixel(pixelId) {
  if (typeof window.fbq !== 'function') {
    const fbq = function (...args) {
      fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args);
    };

    window.fbq = fbq;
    window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];

    injectScript('https://connect.facebook.net/en_US/fbevents.js');
  }

  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
}
