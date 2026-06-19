(function () {
  'use strict';

  function copyText(text, btn) {
    function done() {
      var prev = btn.textContent;
      btn.textContent = 'COPIED';
      setTimeout(function () { btn.textContent = prev; }, 1200);
    }
    function fallbackCopy() {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      done();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
  }

  Array.prototype.slice.call(document.querySelectorAll('[data-copy-target]')).forEach(function (btn) {
    btn.addEventListener('click', function () {
      var el = document.getElementById(btn.getAttribute('data-copy-target'));
      if (!el) return;
      var clone = el.cloneNode(true);
      Array.prototype.slice.call(clone.querySelectorAll('button')).forEach(function (b) { b.remove(); });
      copyText(clone.textContent.trim(), btn);
    });
  });

  Array.prototype.slice.call(document.querySelectorAll('[data-copy-text]')).forEach(function (btn) {
    btn.addEventListener('click', function () {
      copyText(btn.getAttribute('data-copy-text') || '', btn);
    });
  });

  var menu = document.querySelector('.site-menu');
  if (menu) {
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) menu.removeAttribute('open');
    });
  }
})();
