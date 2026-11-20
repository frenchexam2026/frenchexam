/* FrenchExam.ie site-wide analytics (Google Analytics 4, G-CSW23XG5QJ).
   1. Cookie consent: pages that already have the cookie banner (home, notes, videos, etc.) keep
      their own. On every other page this file adds the same banner, using the same saved choice
      (localStorage key "frenchexam_cookie_choices_v1"), so a visitor only ever chooses once.
      Google Analytics only loads after the visitor accepts analytics cookies.
   2. Click tracking: records the clicks that matter in GA4 (only for visitors who accepted):
        buy_click        – any Payhip shop button (product, format, page)
        course_click     – any link to the course sign-up on Systeme.io
        generate_lead    – any MailerLite sign-up form submitted (freebies popup, masterclass, etc.)
        email_click      – any "email us" link (incl. mock oral bookings)
        preview_click    – flip-through previews of the books (Heyzine)
   Include on a page with: <script src="/site-analytics.js" defer></script> */
(function () {
  var GA_ID = 'G-CSW23XG5QJ';
  var STORAGE_KEY = 'frenchexam_cookie_choices_v1';

  var PRODUCTS = {
    '0po6d': ['Success Guide', 'pdf'],
    'j0D9t': ['Success Guide', 'printed'],
    'T5gzB': ['Essay Builder', 'pdf'],
    'NE9RH': ['Essay Builder', 'printed'],
    'PyOi3': ['Journal Intime Builder', 'pdf'],
    'SAHjR': ['Journal Intime Builder', 'printed'],
    '3OskK': ['Complete Collection', 'pdf'],
    'FV3Ho': ['Complete Collection', 'printed'],
    'vRa96': ['Success Guide + Essay Builder', 'pdf'],
    'x8IiK': ['Success Guide + Essay Builder', 'printed'],
    '5rXHt': ['Written French Pack', 'pdf'],
    'xoZyW': ['Written French Pack', 'printed']
  };

  /* ---------- 1. Consent + loading GA (only on pages without their own banner) ---------- */
  var pageHasOwnBanner = typeof window.loadFrenchExamAnalytics === 'function' || !!document.getElementById('cookieBanner');

  if (!pageHasOwnBanner) {
    var loaded = { analytics: false, forms: false };

    window.loadFrenchExamAnalytics = function () {
      if (loaded.analytics) return;
      loaded.analytics = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', GA_ID, { anonymize_ip: true });
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
      document.head.appendChild(s);
    };

    window.loadFrenchExamMailerLite = function () {
      if (loaded.forms) return;
      loaded.forms = true;
      (function (w, d, e, u, f, l, n) { w[f] = w[f] || function () { (w[f].q = w[f].q || []).push(arguments); }; l = d.createElement(e); l.async = 1; l.src = u; n = d.getElementsByTagName(e)[0]; n.parentNode.insertBefore(l, n); })(window, document, 'script', 'https://assets.mailerlite.com/js/universal.js', 'ml');
      window.ml('account', '2489675');
    };

    var readChoices = function () { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; } };
    var applyChoices = function (c) {
      if (!c) return;
      if (c.analytics) window.loadFrenchExamAnalytics();
      if (c.forms) window.loadFrenchExamMailerLite();
    };
    var closeBanner = function () { var b = document.getElementById('cookieBanner'); if (b) b.classList.remove('show'); };
    var storeChoices = function (analytics, forms) {
      var c = { analytics: !!analytics, forms: !!forms, savedAt: new Date().toISOString() };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(c)); } catch (e) {}
      applyChoices(c);
      closeBanner();
    };

    window.acceptAllCookies = function () { storeChoices(true, true); };
    window.rejectOptionalCookies = function () { storeChoices(false, false); };
    window.saveCookieSettings = function () {
      storeChoices(document.getElementById('analyticsConsent').checked, document.getElementById('formsConsent').checked);
    };
    window.toggleCookieOptions = function () {
      document.getElementById('cookieOptions').classList.add('open');
      document.getElementById('cookieSaveBtn').style.display = 'inline-block';
      document.getElementById('cookieChooseBtn').style.display = 'none';
    };
    window.openCookieSettings = function () {
      addBanner();
      var c = readChoices() || { analytics: false, forms: false };
      document.getElementById('analyticsConsent').checked = !!c.analytics;
      document.getElementById('formsConsent').checked = !!c.forms;
      window.toggleCookieOptions();
      document.getElementById('cookieBanner').classList.add('show');
    };

    var addBanner = function () {
      if (document.getElementById('cookieBanner')) return;
      var css = '' +
        '.fxc-banner{position:fixed;left:18px;right:18px;bottom:18px;z-index:9999;max-width:980px;margin:0 auto;background:#fff;border:1px solid rgba(31,58,95,.16);border-radius:18px;box-shadow:0 20px 60px rgba(17,24,39,.22);padding:22px;display:none;font-family:"DM Sans",Arial,sans-serif;text-align:left}' +
        '.fxc-banner.show{display:block}' +
        '.fxc-banner h2{font-family:"Playfair Display",Georgia,serif;color:#1f3a5f;font-size:1.45rem;margin:0 0 7px}' +
        '.fxc-banner p{color:#5d6675;font-size:.93rem;margin:0;line-height:1.6}' +
        '.fxc-banner p a{color:#1f3a5f}' +
        '.fxc-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}' +
        '.fxc-btn{border:1px solid #1f3a5f;border-radius:999px;padding:10px 16px;background:#fff;color:#1f3a5f;font-weight:700;cursor:pointer;font-family:inherit;font-size:.95rem}' +
        '.fxc-btn.primary{background:#1f3a5f;color:#fff}' +
        '.fxc-banner .cookie-options{display:none;margin-top:16px;padding-top:15px;border-top:1px solid rgba(31,58,95,.12)}' +
        '.fxc-banner .cookie-options.open{display:grid;gap:11px}' +
        '.fxc-banner .cookie-option{display:flex;align-items:flex-start;gap:10px;color:#1f2937;font-size:.92rem}' +
        '.fxc-banner .cookie-option input{width:18px;height:18px;margin-top:2px;flex-shrink:0}';
      var st = document.createElement('style');
      st.textContent = css;
      document.head.appendChild(st);
      var b = document.createElement('aside');
      b.className = 'fxc-banner';
      b.id = 'cookieBanner';
      b.setAttribute('role', 'dialog');
      b.setAttribute('aria-labelledby', 'cookieTitle');
      b.innerHTML = '' +
        '<h2 id="cookieTitle">Your cookie choices</h2>' +
        '<p id="cookieDescription">We use necessary technology to operate this website. With your permission, we also use Google Analytics to understand website use and MailerLite technology for signup forms and popups. You can accept, reject or choose separately. Read our <a href="/legal.html#cookies">Cookie Policy</a>.</p>' +
        '<div class="cookie-options" id="cookieOptions">' +
          '<label class="cookie-option"><input type="checkbox" checked disabled> <span><strong>Necessary</strong><br>Required to remember your choice and operate the website.</span></label>' +
          '<label class="cookie-option"><input type="checkbox" id="analyticsConsent"> <span><strong>Analytics</strong><br>Allows Google Analytics to measure visits and website use.</span></label>' +
          '<label class="cookie-option"><input type="checkbox" id="formsConsent"> <span><strong>Signup forms and popups</strong><br>Allows MailerLite technology used for optional forms and popups.</span></label>' +
        '</div>' +
        '<div class="fxc-actions">' +
          '<button type="button" class="fxc-btn primary" onclick="acceptAllCookies()">Accept all</button>' +
          '<button type="button" class="fxc-btn" onclick="rejectOptionalCookies()">Reject non-essential</button>' +
          '<button type="button" class="fxc-btn" id="cookieChooseBtn" onclick="toggleCookieOptions()">Choose settings</button>' +
          '<button type="button" class="fxc-btn" id="cookieSaveBtn" onclick="saveCookieSettings()" style="display:none">Save choices</button>' +
        '</div>';
      document.body.appendChild(b);
    };

    var initConsent = function () {
      var c = readChoices();
      if (c) { applyChoices(c); return; }
      addBanner();
      document.getElementById('cookieBanner').classList.add('show');
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initConsent);
    else initConsent();
  }

  /* ---------- 2. Click and sign-up tracking (all pages) ---------- */
  function page() { var p = location.pathname.replace(/^\//, '').replace(/\.html$/, ''); return (!p || p === 'index') ? 'home' : p; }
  function label(el) { return (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80); }
  function send(name, params) {
    if (typeof window.gtag !== 'function') return; // no analytics consent, so nothing is sent
    params.page = page();
    params.transport_type = 'beacon';
    window.gtag('event', name, params);
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var m = href.match(/payhip\.com\/b\/(\w+)/);
    if (m) {
      var p = PRODUCTS[m[1]] || ['Unknown (' + m[1] + ')', 'unknown'];
      send('buy_click', { product: p[0], format: p[1], product_id: m[1], link_text: label(a) });
      return;
    }
    if (/systeme\.io/.test(href)) { send('course_click', { link_text: label(a) }); return; }
    if (/^mailto:/i.test(href)) {
      var subj = (href.match(/subject=([^&]+)/i) || [])[1];
      send('email_click', { email_subject: subj ? decodeURIComponent(subj) : '(none)', link_text: label(a) });
      return;
    }
    if (/heyzine\.com/.test(href)) { send('preview_click', { link_text: label(a) }); return; }
  }, true);

  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || f.tagName !== 'FORM') return;
    var action = f.getAttribute('action') || '';
    if (/mailerlite\.com/.test(action) || /ml-embedded|ml-block-form/.test(f.className)) {
      if (f.checkValidity && !f.checkValidity()) return; // e.g. email left blank: not a real sign-up
      var fm = action.match(/forms\/(\d+)/);
      send('generate_lead', { form_id: fm ? fm[1] : '(unknown)', form_name: f.id || '(unnamed)' });
    }
  }, true);
})();
