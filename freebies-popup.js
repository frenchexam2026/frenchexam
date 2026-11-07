/* FrenchExam.ie freebies sign-up popup (all pages).
   Same offer and MailerLite form as the home page popup ("Join & Get Free Freebies Every 10 Days",
   adds people to FrenchExam.ie Leads + Free Notes). Plain HTML form, so it works whatever the
   visitor chose in the cookie banner.
   Shows once the visitor has scrolled halfway down the page (or after 30 seconds of reading),
   never on the home page twice, and not again for 14 days after it's closed, or ever after signing up.
   Shares its memory with the home page popup (same localStorage key).
   Include on a page with: <script src="/freebies-popup.js" defer></script> */
(function () {
  if (document.getElementById('freebiesPopup')) return; // page already has its own popup (home page)

  var STORAGE_KEY = 'frenchexam_freebies_popup_v1';
  var DISMISS_DAYS = 14;
  var SCROLL_SHARE = 0.5;
  var MAX_WAIT_MS = 30000;
  var MIN_WAIT_MS = 4000;
  var ACTION = 'https://assets.mailerlite.com/jsonp/2489675/forms/198943139069690915/subscribe';

  function getState() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; } }
  function setState(s) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch (e) {} }
  function shouldShow() {
    var s = getState();
    if (!s) return true;
    if (s.signedUpAt) return false;
    if (s.dismissedAt && (Date.now() - s.dismissedAt) / 86400000 < DISMISS_DAYS) return false;
    return true;
  }
  if (!shouldShow()) return;

  var css = '' +
    '.fxp-overlay{position:fixed;inset:0;background:rgba(15,23,42,.58);display:none;align-items:center;justify-content:center;padding:20px;z-index:9998}' +
    '.fxp-overlay.show{display:flex}' +
    '.fxp-box{width:min(100%,500px);background:#fff;border-radius:22px;padding:36px 28px 28px;box-shadow:0 18px 45px rgba(0,0,0,.18);text-align:center;position:relative;overflow:hidden;font-family:"DM Sans",Arial,sans-serif;animation:fxpFade .3s ease}' +
    '@keyframes fxpFade{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}' +
    '.fxp-tri{position:absolute;top:0;left:0;right:0;height:5px;display:flex}' +
    '.fxp-tri span{flex:1}.fxp-tri span:nth-child(1){background:#0055a4}.fxp-tri span:nth-child(2){background:#fff}.fxp-tri span:nth-child(3){background:#c8102e}' +
    '.fxp-close{position:absolute;top:12px;right:14px;background:none;border:0;font-size:26px;line-height:1;color:#5d6675;cursor:pointer;padding:4px}' +
    '.fxp-badge{display:inline-block;margin-bottom:16px;background:#f7f0e1;color:#1f3a5f;border:1px solid rgba(197,164,109,.3);border-radius:999px;padding:8px 14px;font-size:.88rem;font-weight:700}' +
    '.fxp-box h2{color:#1f3a5f;font-family:"Playfair Display",Georgia,serif;font-size:clamp(1.6rem,4vw,2.1rem);margin:0 0 10px;line-height:1.2}' +
    '.fxp-box p{color:#5d6675;margin:0 0 18px;font-size:1rem;line-height:1.55}' +
    '.fxp-form{display:flex;flex-direction:column;gap:10px;text-align:left}' +
    '.fxp-form input{width:100%;box-sizing:border-box;padding:14px 16px;border:1px solid #cfd6e0;border-radius:12px;font:inherit;font-size:1rem}' +
    '.fxp-form input:focus{outline:2px solid #1f3a5f;outline-offset:1px}' +
    '.fxp-form button{width:100%;padding:14px 18px;border:0;border-radius:999px;background:#1f3a5f;color:#fff;font:inherit;font-weight:700;font-size:1rem;cursor:pointer}' +
    '.fxp-form button:disabled{opacity:.7;cursor:default}' +
    '.fxp-err{margin:0;color:#c8102e;font-size:.88rem}' +
    '.fxp-ok{padding:16px;border-radius:14px;background:#f7f4ee}' +
    '.fxp-ok h3{margin:0 0 6px;color:#1f3a5f;font-family:"Playfair Display",Georgia,serif;font-size:1.3rem}' +
    '.fxp-ok p{margin:0}' +
    '.fxp-small{margin:14px 0 0!important;font-size:.8rem!important}' +
    '.fxp-hidden{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}' +
    '@media(max-width:520px){.fxp-box{padding:30px 20px 22px}}';

  var html = '' +
    '<div class="fxp-box">' +
      '<div class="fxp-tri"><span></span><span></span><span></span></div>' +
      '<button type="button" class="fxp-close" aria-label="Close">&times;</button>' +
      '<div class="fxp-badge">🇫🇷 Join &amp; Get Free Freebies Every 10 Days</div>' +
      '<h2 id="fxpTitle">Free French Study Freebies</h2>' +
      '<p>Sign up and get a brand-new free resource every 10 days: French Crimes mistakes to avoid, grammar cheat sheets, oral exam phrases, and more. All free, no strings attached.</p>' +
      '<form class="fxp-form" id="fxpForm" action="' + ACTION + '" method="post" target="fxpFrame" novalidate>' +
        '<label for="fxpEmail" class="fxp-hidden">Your email address</label>' +
        '<input type="email" id="fxpEmail" name="fields[email]" placeholder="Your email address" autocomplete="email" inputmode="email" required>' +
        '<input type="hidden" name="ml-submit" value="1"><input type="hidden" name="anticsrf" value="true">' +
        '<p class="fxp-err" id="fxpErr" role="alert" hidden></p>' +
        '<button type="submit">Send me the freebies</button>' +
      '</form>' +
      '<div class="fxp-ok" id="fxpOk" hidden role="status"><h3>Merci ! You\'re in 🎉</h3><p>Check your inbox: your first freebie is on its way.</p></div>' +
      '<iframe name="fxpFrame" title="Sign-up" style="display:none" tabindex="-1" aria-hidden="true"></iframe>' +
      '<p class="fxp-small">No spam. Unsubscribe anytime.</p>' +
    '</div>';

  function init() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.className = 'fxp-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'fxpTitle');
    overlay.innerHTML = html;
    document.body.appendChild(overlay);

    var form = overlay.querySelector('#fxpForm');
    var input = overlay.querySelector('#fxpEmail');
    var err = overlay.querySelector('#fxpErr');
    var btn = form.querySelector('button[type="submit"]');
    var shown = false, start = Date.now(), timer;

    function close() {
      overlay.classList.remove('show');
      var s = getState() || {};
      if (!s.signedUpAt) setState({ dismissedAt: Date.now() });
    }
    function show() {
      if (shown || !shouldShow()) return;
      shown = true;
      overlay.classList.add('show');
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    }
    function onScroll() {
      var doc = document.documentElement;
      var max = (doc.scrollHeight - window.innerHeight) || 1;
      if (window.scrollY / max >= SCROLL_SHARE && Date.now() - start >= MIN_WAIT_MS) show();
    }
    function showError(msg) { err.textContent = msg; err.hidden = false; btn.disabled = false; btn.textContent = 'Send me the freebies'; }
    function success() {
      form.hidden = true;
      overlay.querySelector('#fxpOk').hidden = false;
      setState({ signedUpAt: Date.now(), dismissedAt: Date.now() });
    }

    overlay.querySelector('.fxp-close').addEventListener('click', close);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay.classList.contains('show')) close(); });

    form.addEventListener('submit', function (e) {
      var v = (input.value || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { e.preventDefault(); showError('Please enter a valid email address.'); input.focus(); return; }
      input.value = v;
      err.hidden = true;
      btn.disabled = true; btn.textContent = 'Sending…';
      if (!window.fetch || !window.FormData) return;
      e.preventDefault();
      fetch(form.action, { method: 'POST', body: new FormData(form) })
        .then(function (r) { return r.json(); })
        .then(function (d) { if (d && d.success) success(); else showError("Sorry, that email address didn't work. Please check it and try again."); })
        .catch(function () { form.submit(); setTimeout(success, 900); });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    timer = setTimeout(show, MAX_WAIT_MS);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
