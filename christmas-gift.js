/* FrenchExam.ie Christmas gift promotion, 2026.
   Until 27 November: printed books (allow ~3 weeks for printing and delivery).
   28 November to 24 December: instant PDFs as last-minute gifts.
   From 25 December: nothing shows, so this file can be left in place or removed.
   Include on a page with: <script src="/christmas-gift.js" defer></script> */
(function () {
  var now = new Date();
  var printedDeadline = new Date('2026-11-28T00:00:00');
  var end = new Date('2026-12-25T00:00:00');
  if (now >= end) return;
  var printed = now < printedDeadline;

  var barHTML = printed
    ? '🎄 <strong>The perfect Christmas gift for a Leaving Cert student:</strong> printed French notes &amp; workbooks. <span class="xg-pill">Order by Fri 27 Nov</span> <a href="/shop.html#christmas">Shop gifts &rarr;</a>'
    : '🎁 <strong>Last-minute Christmas gift?</strong> Our Leaving Cert French notes &amp; workbooks are instant PDF downloads. <a href="/shop.html#christmas">Shop gifts &rarr;</a>';

  var css = '' +
    '.xg-bar{background:linear-gradient(90deg,#14532d,#1f3a5f);color:#fff;text-align:center;padding:11px 16px;font:600 .92rem/1.45 "DM Sans",Arial,sans-serif}' +
    '.xg-bar strong{color:#fff}' +
    '.xg-bar a{color:#f3dfb5;font-weight:700;text-decoration:underline;text-underline-offset:3px;margin-left:4px;white-space:nowrap}' +
    '.xg-pill{display:inline-block;background:rgba(255,255,255,.18);border-radius:999px;padding:2px 10px;margin:0 4px;white-space:nowrap}' +
    '@media (max-width:640px){.xg-bar{font-size:.8rem;padding:9px 12px}}' +
    '.xg-shop{max-width:1100px;margin:28px auto 8px;padding:0 20px;scroll-margin-top:96px}' +
    '.xg-card{background:linear-gradient(135deg,#14532d 0%,#1f3a5f 100%);color:#fff;border-radius:22px;padding:30px 30px 26px;box-shadow:0 14px 34px rgba(17,24,39,.14);font-family:"DM Sans",Arial,sans-serif}' +
    '.xg-eyebrow{display:inline-block;background:rgba(255,255,255,.14);color:#f3dfb5;font-size:.76rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:6px 12px;border-radius:999px;margin:0 0 12px}' +
    '.xg-card h2{font-family:"Playfair Display",Georgia,serif;color:#fff;font-size:1.9rem;line-height:1.2;margin:0 0 10px}' +
    '.xg-card p{color:rgba(255,255,255,.88);font-size:1rem;line-height:1.65;margin:0 0 18px;max-width:760px}' +
    '.xg-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}' +
    '.xg-item{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:16px;padding:16px 16px 14px;display:flex;flex-direction:column}' +
    '.xg-item b{font-size:1rem;color:#fff;margin-bottom:4px}' +
    '.xg-item span{font-size:.88rem;color:rgba(255,255,255,.78);line-height:1.5;flex:1}' +
    '.xg-price{font-family:"Playfair Display",Georgia,serif;font-size:1.5rem;font-weight:800;color:#f3dfb5;margin:8px 0 10px}' +
    '.xg-item a{display:block;text-align:center;background:#c5a46d;color:#1f3a5f!important;font-weight:700;text-decoration:none;border-radius:999px;padding:11px 14px}' +
    '.xg-item a:hover{background:#d4b682}' +
    '.xg-note{font-size:.84rem!important;color:rgba(255,255,255,.75)!important;margin:14px 0 0!important}' +
    '@media (max-width:820px){.xg-grid{grid-template-columns:1fr}.xg-card{padding:24px 20px}.xg-card h2{font-size:1.5rem}}';

  var items = printed ? [
    ['The Complete Collection, printed', 'Success Guide + Essay Builder + Journal Intime Builder. Everything for Higher Level French.', '€84.99', 'https://payhip.com/b/FV3Ho', 'Order printed collection'],
    ['Success Guide + Essay Builder, printed', 'The full-exam notes plus the essay workbook, together at a lower price.', '€54.99', 'https://payhip.com/b/x8IiK', 'Order printed bundle'],
    ['The Written French Pack, printed', 'Essay Builder + Journal Intime Builder for the written paper.', '€59.99', 'https://payhip.com/b/xoZyW', 'Order printed pack']
  ] : [
    ['The Complete Collection, PDFs', 'Success Guide + Essay Builder + Journal Intime Builder, ready to download instantly.', '€44.99', 'https://payhip.com/b/3OskK', 'Download the collection'],
    ['Success Guide + Essay Builder, PDFs', 'The full-exam notes plus the essay workbook, together at a lower price.', '€34.99', 'https://payhip.com/b/vRa96', 'Download the bundle'],
    ['The Written French Pack, PDFs', 'Essay Builder + Journal Intime Builder for the written paper.', '€34.99', 'https://payhip.com/b/5rXHt', 'Download the pack']
  ];

  function track(label) {
    return "if(window.gtag){gtag('event','christmas_gift_click',{item:'" + label + "'});}";
  }

  function addBar() {
    var bar = document.createElement('div');
    bar.className = 'xg-bar';
    bar.innerHTML = barHTML;
    var stripe = document.querySelector('.tricolore-stripe');
    if (stripe && stripe.parentNode === document.body) stripe.insertAdjacentElement('afterend', bar);
    else document.body.insertBefore(bar, document.body.firstChild);
  }

  function addShopSection() {
    var anchor = document.getElementById('collection');
    if (!anchor) return;
    var cards = items.map(function (it) {
      return '<div class="xg-item"><b>' + it[0] + '</b><span>' + it[1] + '</span>' +
        '<div class="xg-price">' + it[2] + '</div>' +
        '<a href="' + it[3] + '" target="_blank" rel="noopener" onclick="' + track(it[0]) + '">' + it[4] + ' &rarr;</a></div>';
    }).join('');
    var sec = document.createElement('section');
    sec.className = 'xg-shop';
    sec.id = 'christmas';
    sec.innerHTML = '<div class="xg-card">' +
      '<div class="xg-eyebrow">' + (printed ? '🎄 Christmas gifts' : '🎁 Last-minute gifts') + '</div>' +
      '<h2>' + (printed ? 'A Christmas gift that helps with the Leaving Cert' : 'Instant gifts for a Leaving Cert student') + '</h2>' +
      '<p>' + (printed
        ? 'Our printed Higher Level French notes and workbooks make a brilliant present for a 5th or 6th year student. Written by Nicola Rowan, a French teacher and SEC examiner.'
        : 'Too late for post? Our PDF notes and workbooks download straight away, so you can print them at home or send them on by email in time for Christmas.') + '</p>' +
      '<div class="xg-grid">' + cards + '</div>' +
      '<p class="xg-note">' + (printed
        ? '🇮🇪 Printed books are posted within Ireland. Printing and delivery take about 3 weeks, so <strong>please order by Friday 27 November</strong> to have them before Christmas.'
        : 'Printed books can still be ordered, but they won’t arrive before Christmas.') + '</p>' +
      '</div>';
    anchor.parentNode.insertBefore(sec, anchor);
    if (location.hash === '#christmas') sec.scrollIntoView();
  }

  function init() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    addBar();
    addShopSection();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
