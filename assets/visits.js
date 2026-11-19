(function () {
  var wrap = document.querySelector('header.top .wrap');
  if (!wrap) return;
  var el = document.createElement('div');
  el.className = 'visit-stat';
  el.setAttribute('aria-label', '방문자 수');
  el.innerHTML = '오늘 <b>-</b> · 누적 <b>-</b>';
  wrap.appendChild(el);
  var day = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
  var counted = false;
  try { counted = localStorage.getItem('jb-visit-day') === day; } catch (e) {}
  var bot = navigator.webdriver || /bot|crawl|spider|slurp|preview/i.test(navigator.userAgent);
  var hit = !counted && !bot;
  var fmt = function (n) { return Number(n || 0).toLocaleString('ko-KR'); };
  fetch('/api/visits' + (hit ? '?hit=1' : ''), { method: hit ? 'POST' : 'GET', cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (hit) { try { localStorage.setItem('jb-visit-day', day); } catch (e) {} }
      el.innerHTML = '오늘 <b>' + fmt(d.today) + '</b> · 누적 <b>' + fmt(d.total) + '</b>';
    })
    .catch(function () { el.remove(); });
})();
