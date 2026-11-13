/* FrenchExam.ie Christmas gift promotion, 2026.
   Until 27 November: printed books (allow ~3 weeks for printing and delivery).
   28 November to 24 December: instant PDFs as last-minute gifts.
   From 25 December: nothing shows, so this file can be left in place or removed.
   Black Friday, 27 November until SALE_END: the bar becomes a "20% off every PDF" bar,
   and the PDF gift cards show the sale price (Payhip applies the discount itself).
   Include on a page with: <script src="/christmas-gift.js" defer></script> */
(function () {
  var now = new Date();
  var printedDeadline = new Date('2026-11-28T00:00:00');
  var end = new Date('2026-12-25T00:00:00');
  if (now >= end) return;
  var printed = now < printedDeadline;
  var saleStart = new Date('2026-11-27T00:00:00');
  var SALE_END = new Date('2026-12-01T00:00:00'); // sale runs to the end of Monday 30 Nov
  var onSale = now >= saleStart && now < SALE_END;

  var barHTML = onSale
    ? '🖤 <strong>Black Friday: 20% off every PDF</strong> until Monday 30 Nov. No code needed. ' +
      (printed ? '<span class="xg-pill">Last day to order printed books for Christmas</span> ' : '') +
      '<a href="/shop.html#christmas">Shop the sale &rarr;</a>'
    : printed
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
    '.xg-bar.xg-sale{background:linear-gradient(90deg,#111827,#1f3a5f)}' +
    '.xg-was{font-size:1rem;font-weight:600;color:rgba(255,255,255,.6);text-decoration:line-through;margin-right:8px}' +
    '.xg-off{display:inline-block;font-family:"DM Sans",Arial,sans-serif;font-size:.72rem;font-weight:700;background:#c8102e;color:#fff;border-radius:999px;padding:3px 9px;margin-left:8px;vertical-align:middle}' +
    '.xg-strike{opacity:.6;font-weight:inherit;margin-right:2px}' +
    '.xg-note{font-size:.84rem!important;color:rgba(255,255,255,.75)!important;margin:14px 0 0!important}' +
    '@media (max-width:820px){.xg-grid{grid-template-columns:1fr}.xg-card{padding:24px 20px}.xg-card h2{font-size:1.5rem}}';

  var items = printed ? [
    ['The Complete Collection, printed', 'Success Guide + Essay Builder + Journal Intime Builder. Everything for Higher Level French.', '€84.99', null, 'https://payhip.com/b/FV3Ho', 'Order printed collection'],
    ['Success Guide + Essay Builder, printed', 'The full-exam notes plus the essay workbook, together at a lower price.', '€54.99', null, 'https://payhip.com/b/x8IiK', 'Order printed bundle'],
    ['The Written French Pack, printed', 'Essay Builder + Journal Intime Builder for the written paper.', '€59.99', null, 'https://payhip.com/b/xoZyW', 'Order printed pack']
  ] : [
    ['The Complete Collection, PDFs', 'Success Guide + Essay Builder + Journal Intime Builder, ready to download instantly.', '€44.99', '€35.99', 'https://payhip.com/b/3OskK', 'Download the collection'],
    ['Success Guide + Essay Builder, PDFs', 'The full-exam notes plus the essay workbook, together at a lower price.', '€34.99', '€27.99', 'https://payhip.com/b/vRa96', 'Download the bundle'],
    ['The Written French Pack, PDFs', 'Essay Builder + Journal Intime Builder for the written paper.', '€34.99', '€27.99', 'https://payhip.com/b/5rXHt', 'Download the pack']
  ];

  function track(label) {
    return "if(window.gtag){gtag('event','christmas_gift_click',{item:'" + label + "'});}";
  }

  function addBar() {
    var bar = document.createElement('div');
    bar.className = onSale ? 'xg-bar xg-sale' : 'xg-bar';
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
        '<div class="xg-price">' + (onSale && it[3]
          ? '<span class="xg-was">' + it[2] + '</span>' + it[3] + '<span class="xg-off">20% OFF</span>'
          : it[2]) + '</div>' +
        '<a href="' + it[4] + '" target="_blank" rel="noopener" onclick="' + track(it[0]) + '">' + it[5] + ' &rarr;</a></div>';
    }).join('');
    var sec = document.createElement('section');
    sec.className = 'xg-shop';
    sec.id = 'christmas';
    sec.innerHTML = '<div class="xg-card">' +
      '<div class="xg-eyebrow">' + (onSale && !printed ? '🖤 Black Friday · 20% off PDFs' : printed ? '🎄 Christmas gifts' : '🎁 Last-minute gifts') + '</div>' +
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

  // During the sale, show the 20% PDF price wherever a PDF price appears on the page.
  var PDF_SALE = {
    '0po6d': ['€19.99', '€15.99'], // Leaving Cert French Notes (Success Guide)
    'T5gzB': ['€19', '€15.20'],    // Essay Builder
    'PyOi3': ['€19.99', '€15.99'], // Journal Intime Builder
    '3OskK': ['€44.99', '€35.99'], // Complete Collection
    '5rXHt': ['€34.99', '€27.99'], // Written French Pack
    'vRa96': ['€34.99', '€27.99']  // Success Guide + Essay Builder
  };
  function salePrice(el, was, now) {
    if (el.getAttribute('data-xg-sale')) return;
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    var re = new RegExp(was.replace(/[.]/g, '\\.') + '(?!\\.?[0-9])');
    for (var i = 0; i < nodes.length; i++) {
      var t = nodes[i].nodeValue, m = t.match(re);
      if (!m) continue;
      var span = document.createElement('span');
      span.innerHTML = t.slice(0, m.index).replace(/</g, '&lt;') +
        '<s class="xg-strike">' + was + '</s> ' + now +
        t.slice(m.index + was.length).replace(/</g, '&lt;');
      nodes[i].parentNode.replaceChild(span, nodes[i]);
      el.setAttribute('data-xg-sale', '1');
      return;
    }
  }
  function applySalePrices() {
    Object.keys(PDF_SALE).forEach(function (key) {
      var was = PDF_SALE[key][0], now = PDF_SALE[key][1];
      var links = document.querySelectorAll('a[href*="payhip.com/b/' + key + '"]');
      Array.prototype.forEach.call(links, function (a) {
        if (a.closest('.xg-shop')) return;
        salePrice(a, was, now);
        // A price box next to the button, in the same card or option
        var box = a.parentNode;
        for (var up = 0; box && up < 3; up++, box = box.parentNode) {
          var price = box.querySelector && box.querySelector('.price');
          if (price) { salePrice(price, was, now); break; }
        }
      });
    });
  }

  function init() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    addBar();
    addShopSection();
    if (onSale) applySalePrices();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
