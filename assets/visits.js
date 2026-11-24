(function () {
  // 중부산동심 방문자 수 (무료 카운터 abacus.jasoncameron.dev, 한국 시간 기준)
  // 같은 브라우저는 하루 한 번만 집계. Netlify 시절 누적(124)·11/24 오늘(15)을 이어서 표시.
  var wrap = document.querySelector('header.top .wrap');
  if (!wrap) return;
  var API = 'https://abacus.jasoncameron.dev', NS = 'jbdongsim-co-kr';
  var BASE_TOTAL = 124, BASE_DAY = { '2026-11-24': 15 };
  var cta = document.querySelector('header.top a.btn-teal');
  var st = document.createElement('style');
  st.textContent = 'header.top a.btn-teal{position:relative}' +
    'header.top a.btn-teal .visit-stat{position:absolute;top:auto;right:auto;bottom:100%;left:50%;transform:translateX(-50%);margin-bottom:3px;font-size:11px;line-height:1;color:#8A98AD;font-weight:500;letter-spacing:-.01em;white-space:nowrap;pointer-events:none;text-align:center}' +
    'header.top a.btn-teal .visit-stat b{color:#5B6B82;font-weight:700}' +
    '@media (max-width:680px){header.top a.btn-teal .visit-stat{font-size:10px;margin-bottom:2px}}';
  document.head.appendChild(st);
  var el = document.createElement('span');
  el.className = 'visit-stat';
  el.setAttribute('aria-label', '방문자 수');
  el.innerHTML = '오늘 <b>-</b> · 누적 <b>-</b>';
  // 카운터 서버 응답이 느릴 수 있어, 이 브라우저가 마지막으로 본 숫자를 먼저 보여 준다
  try { var last = JSON.parse(localStorage.getItem('jb-visit-last') || 'null'); if (last && last.total) el.innerHTML = '오늘 <b>' + Number(last.day === new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10) ? last.today : 0).toLocaleString('ko-KR') + '</b> · 누적 <b>' + Number(last.total).toLocaleString('ko-KR') + '</b>'; } catch (e) {}
  if (cta) { el.setAttribute('aria-hidden', 'true'); cta.appendChild(el); } else { wrap.appendChild(el); }
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
      var td = v[0] + (BASE_DAY[day] || 0), tt = v[1] + BASE_TOTAL;
      el.innerHTML = '오늘 <b>' + fmt(td) + '</b> · 누적 <b>' + fmt(tt) + '</b>';
      try { localStorage.setItem('jb-visit-last', JSON.stringify({ day: day, today: td, total: tt })); } catch (e) {}
    })
    .catch(function () { if (/<b>-<\/b>/.test(el.innerHTML)) el.remove(); });
})();
