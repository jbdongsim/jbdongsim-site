(function () {
  // 중부산동심 방문자 수 (무료 카운터 abacus.jasoncameron.dev, 한국 시간 기준)
  // 같은 브라우저는 하루 한 번만 집계. Netlify 시절 누적(124)·11/24 오늘(15)을 이어서 표시.
  var wrap = document.querySelector('header.top .wrap');
  if (!wrap) return;
  var API = 'https://abacus.jasoncameron.dev', NS = 'jbdongsim-co-kr';
  var BASE_TOTAL = 124, BASE_DAY = { '2026-11-24': 15 };
  var el = document.createElement('div');
  el.className = 'visit-stat';
  el.setAttribute('aria-label', '방문자 수');
  el.innerHTML = '오늘 <b>-</b> · 누적 <b>-</b>';
  wrap.appendChild(el);
  var day = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
  var dayKey = 'day-' + day.replace(/-/g, '');
  var counted = false;
  try { counted = localStorage.getItem('jb-visit-day') === day; } catch (e) {}
  var bot = navigator.webdriver || /bot|crawl|spider|slurp|preview/i.test(navigator.userAgent);
  var hit = !counted && !bot;
  var fmt = function (n) { return Number(n || 0).toLocaleString('ko-KR'); };
  function call(key) {
    return fetch(API + (hit ? '/hit/' : '/get/') + NS + '/' + key, { cache: 'no-store' })
      .then(function (r) { if (r.status === 404) return { value: 0 }; if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { return Number(d.value) || 0; });
  }
  Promise.all([call(dayKey), call('total')])
    .then(function (v) {
      if (hit) { try { localStorage.setItem('jb-visit-day', day); } catch (e) {} }
      el.innerHTML = '오늘 <b>' + fmt(v[0] + (BASE_DAY[day] || 0)) + '</b> · 누적 <b>' + fmt(v[1] + BASE_TOTAL) + '</b>';
    })
    .catch(function () { el.remove(); });
})();
