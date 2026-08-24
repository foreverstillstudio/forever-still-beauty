/* ============================================================
   FOREVER STILL BEAUTY — Lead capture via The Courier
   Every signup form on the site posts here. Leads are saved to
   the Courier D1 database (tenant "forever-still-beauty") and
   emailed to the owner. Replaces MailerLite + Formspree.

   Wires three surfaces automatically on every page it loads:
     .newsletter__form   — <form> with an email input + a sibling
                            .newsletter__success message
     .footer__mini-form  — <div> with an email input + a button
   Endpoint + tenant are the only things to change if either moves.
   ============================================================ */
(function () {
  var ENDPOINT = 'https://courier.chrissy-499.workers.dev/submit';
  var TENANT   = 'forever-still-beauty';

  function send(email, source) {
    return fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ tenant: TENANT, email: email, source: source })
    }).then(function (r) { return r.json(); });
  }

  document.addEventListener('DOMContentLoaded', function () {

    /* Newsletter forms (hero / section captures) */
    document.querySelectorAll('.newsletter__form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        var email = input ? input.value.trim() : '';
        if (!email) return;
        var btn = form.querySelector('button');
        var label = btn ? btn.textContent : '';
        if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
        send(email, 'beauty-newsletter').then(function (x) {
          if (x && x.ok) {
            var success = form.parentElement.querySelector('.newsletter__success');
            form.style.display = 'none';
            if (success) success.style.display = 'block';
          } else if (btn) { btn.disabled = false; btn.textContent = 'Try again'; }
        }).catch(function () {
          if (btn) { btn.disabled = false; btn.textContent = label || 'Try again'; }
        });
      });
    });

    /* Footer mini-forms (div + button, no <form>) */
    document.querySelectorAll('.footer__mini-form').forEach(function (wrap) {
      var btn   = wrap.querySelector('button');
      var input = wrap.querySelector('input[type="email"]');
      if (!btn || !input) return;
      btn.addEventListener('click', function () {
        var email = input.value.trim();
        if (!email) return;
        btn.disabled = true; btn.textContent = 'Sending…';
        send(email, 'beauty-footer').then(function (x) {
          if (x && x.ok) {
            input.value = '';
            btn.textContent = 'Subscribed ✓';
            btn.style.background = '#9A7A50';
          } else { btn.disabled = false; btn.textContent = 'Try again'; }
        }).catch(function () {
          btn.disabled = false; btn.textContent = 'Try again';
        });
      });
    });

  });
})();
