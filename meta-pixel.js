/* FrenchExam.ie Meta Pixel (ID 1130590656433465), loaded only with consent.
   - Adds a "Marketing" option to the existing cookie banner (every page, whether the banner is
     built into the page or added by site-analytics.js). "Accept all" includes it; "Reject
     non-essential" excludes it; "Choose settings" lets the visitor tick it separately. On the
     book pages, whose banner only offers "Accept analytics", marketing is never switched on by
     that button, only by ticking it under "Choose settings".
   - The choice is saved as `marketing` in the same localStorage key the banner already uses
     ("frenchexam_cookie_choices_v1"), so a visitor only ever chooses once.
   - Events: PageView on every page; InitiateCheckout when a visitor clicks through to the
     course sign-up on Systeme.io.
   Include AFTER site-analytics.js on a page with: <script src="/meta-pixel.js" defer></script> */
(function () {
  var PIXEL_ID = '1130590656433465';
  var STORAGE_KEY = 'frenchexam_cookie_choices_v1';
  var pixelLoaded = false;

  function readChoices() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; } }
  function setMarketing(value) {
    var c = readChoices() || {};
    c.marketing = !!value;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(c)); } catch (e) {}
    if (value) loadPixel();
  }

  function loadPixel() {
    if (pixelLoaded) return;
    pixelLoaded = true;
    /* Meta's standard base code */
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  function addMarketingOption() {
    var options = document.getElementById('cookieOptions');
    if (!options || document.getElementById('marketingConsent')) return;
    var labels = options.querySelectorAll('label');
    var last = labels[labels.length - 1];
    var label = document.createElement('label');
    label.className = last ? last.className : 'cookie-option';
    label.innerHTML = '<input type="checkbox" id="marketingConsent"> <span><strong>Marketing</strong><br>Allows the Meta Pixel to measure how our Facebook and Instagram adverts perform.</span>';
    options.appendChild(label);
    var banner = document.getElementById('cookieBanner');
    var desc = document.getElementById('cookieDescription') || (banner && banner.querySelector('p'));
    if (desc && !/Meta Pixel/.test(desc.innerHTML)) {
      desc.innerHTML = desc.innerHTML.replace(/(You can accept|Read our)/, 'If you allow marketing cookies, the Meta Pixel measures our Facebook and Instagram adverts. $1');
    }
  }

  function wrap(name, after, before) {
    var original = window[name];
    if (typeof original !== 'function' || original.__metaWrapped) return;
    var wrapped = function () {
      var pre = before ? before() : undefined;
      var result = original.apply(this, arguments);
      after(pre);
      return result;
    };
    wrapped.__metaWrapped = true;
    window[name] = wrapped;
  }

  function hookBanner() {
    addMarketingOption();
    var checked = function () { var el = document.getElementById('marketingConsent'); return !!(el && el.checked); };
    var syncBox = function () {
      addMarketingOption();
      var el = document.getElementById('marketingConsent');
      var c = readChoices();
      if (el) el.checked = !!(c && c.marketing);
    };
    /* Banner function names differ between page templates */
    wrap('acceptAllCookies', function () { setMarketing(true); });
    ['rejectOptionalCookies', 'rejectOptional'].forEach(function (n) { wrap(n, function () { setMarketing(false); }); });
    ['saveCookieSettings', 'saveSettings'].forEach(function (n) { wrap(n, function (v) { setMarketing(v); }, checked); });
    wrap('openCookieSettings', syncBox);
  }

  function init() {
    hookBanner();
    var c = readChoices();
    if (c && c.marketing) loadPixel();
  }

  /* Course sign-up clicks (Systeme.io) */
  document.addEventListener('click', function (e) {
    if (typeof window.fbq !== 'function') return; // no marketing consent, nothing is sent
    var a = e.target.closest && e.target.closest('a[href]');
    if (a && /systeme\.io/.test(a.getAttribute('href') || '')) window.fbq('track', 'InitiateCheckout');
  }, true);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
