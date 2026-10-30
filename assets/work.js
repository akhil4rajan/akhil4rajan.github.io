(function () {
  var root = document.documentElement, btn = document.getElementById('themeBtn');
  var meta = document.querySelector('meta[name="theme-color"]');
  function apply(t) { root.setAttribute('data-theme', t); if (meta) meta.setAttribute('content', t === 'light' ? '#F5F8FB' : '#070B14'); btn.setAttribute('aria-label', t === 'light' ? 'Switch to dark theme' : 'Switch to light theme'); }
  apply(root.getAttribute('data-theme') || 'light');
  btn.addEventListener('click', function () { var t = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light'; apply(t); try { localStorage.setItem('theme', t); } catch (e) {} });

  var copy = document.getElementById('copyLink');
  if (copy) copy.addEventListener('click', function () {
    var url = location.origin + location.pathname, label = copy.querySelector('span');
    function done(ok) { label.textContent = ok ? 'Link copied' : url; setTimeout(function () { label.textContent = 'Copy link'; }, 2400); }
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { done(true); }, function () { done(false); });
    else done(false);
  });
  document.querySelectorAll('.slides').forEach(function (box) {
    var track = box.querySelector('.track'), imgs = track.querySelectorAll('img'), n = imgs.length;
    var prev = box.querySelector('.prev'), next = box.querySelector('.next'), count = box.querySelector('.count');
    function index() { return Math.round(track.scrollLeft / Math.max(1, track.clientWidth)); }
    function go(i) { track.scrollTo({ left: Math.max(0, Math.min(n - 1, i)) * track.clientWidth }); }
    function update() { var i = index(); count.textContent = (i + 1) + ' / ' + n; prev.disabled = i === 0; next.disabled = i === n - 1; }
    prev.addEventListener('click', function () { go(index() - 1); });
    next.addEventListener('click', function () { go(index() + 1); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index() + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(index() - 1); }
    });
    track.addEventListener('scroll', update, { passive: true });
    update();
  });
})();
