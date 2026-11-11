/* The Journal: show the newest Forever Still Beauty Instagram posts, pulled through
   The Herald (TownSquare → The Herald → Connect Instagram, business "forever-still-beauty").
   Until Instagram is connected (or if anything fails), the placeholder panels stay. */
(function () {
  var API = 'https://gettheherald.app';
  var SLUG = 'forever-still-beauty';
  var entries = document.querySelectorAll('.journal__entry');
  if (!entries.length || !window.fetch) return;

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  fetch(API + '/api/public/businesses/' + SLUG + '/ig-photos?limit=' + entries.length)
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) {
      var photos = ((d && d.photos) || []).filter(function (p) { return p && p.src; });
      if (photos.length < entries.length) return; // keep the placeholders until every slot has a photo

      Array.prototype.forEach.call(entries, function (entry, i) {
        var p = photos[i];
        var n = 'No. ' + (i < 9 ? '0' : '') + (i + 1);
        var alt = p.caption || 'Forever Still Beauty on Instagram';
        var img = '<img loading="lazy" decoding="async" src="' + esc(p.thumb || p.src) + '" alt="' + esc(alt) + '">';
        var frame = entry.querySelector('.journal__frame');
        frame.innerHTML = p.link
          ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener" aria-label="View this post on Instagram (opens in a new tab)">' + img + '</a>'
          : img;
        entry.querySelector('.journal__meta').textContent = 'On Instagram · ' + n;
        var cap = entry.querySelector('.journal__caption');
        if (p.caption) cap.textContent = p.caption; else cap.remove();
      });
    })
    .catch(function () { /* keep the placeholders */ });
})();
