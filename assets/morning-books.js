(function () {
  var root = document.getElementById('morning-books');
  if (!root) return;
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var DOW = ['일','월','화','수','목','금','토'];
  var kstToday = function () { return new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10); };
  var parse = function (d) { var p = d.split('-'); return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])); };
  var fmt = function (dt) { return dt.toISOString().slice(0, 10); };
  var label = function (d) { var dt = parse(d); return (dt.getUTCMonth() + 1) + '월 ' + dt.getUTCDate() + '일 ' + DOW[dt.getUTCDay()] + '요일'; };
  var today = kstToday();
  var nowKst = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 16);
  var isOpen = function (b) { return (b.date + 'T' + (b.time || '07:00')) <= nowKst; };
  var all = (window.MORNING_BOOKS || []).filter(function (b) { return b && b.date && b.title; }).sort(function (a, b) { return a.date < b.date ? -1 : 1; });
  all.forEach(function (b, i) { b.no = i + 1; });
  var books = all.filter(isOpen);
  var latest = books[books.length - 1];
  var nextWeekday = function (d) { var dt = parse(d); do { dt = new Date(dt.getTime() + 864e5); } while (dt.getUTCDay() === 0 || dt.getUTCDay() === 6); return fmt(dt); };
  var palette = ['#F5B841,#F26B4E', '#7BB6E8,#3B82C4', '#9ED2B8,#1F8A70', '#C7B3EE,#7A5AC8', '#F7A7A0,#E0567A'];
  var grad = function (b) { return 'linear-gradient(160deg,' + palette[(b.no || 0) % palette.length] + ')'; };
  var cover = function (b, cls) {
    return b.cover ? '<img class="' + cls + '" src="' + esc(b.cover) + '" alt="' + esc(b.title) + ' 표지" loading="lazy">'
      : '<div class="' + cls + ' mb-fake" style="background:' + grad(b) + '"><b>' + esc(b.title) + '</b><span>' + esc(b.author || '') + '</span></div>';
  };
  var tagsHtml = function (b) { return (b.tags || []).length ? '<div class="mb-tags">' + b.tags.map(function (t) { return '<span>#' + esc(t) + '</span>'; }).join('') + '</div>' : ''; };
  var meta = function (b) { return [b.author, b.publisher].filter(Boolean).map(esc).join(' · ') + ((b.audience || []).length ? ' · 추천: ' + b.audience.map(esc).join(' · ') : ''); };
  var monthCount = function (b) { var m = b.date.slice(0, 7); return books.filter(function (x) { return x.date.slice(0, 7) === m && x.date <= b.date; }).length; };

  var todayHtml;
  if (latest) {
    var b = latest;
    todayHtml = '<article class="mb-today" id="book-' + b.date + '">' + cover(b, 'mb-cover') +
      '<div class="mb-body"><span class="mb-badge"><i>No.' + b.no + '</i>' + label(b.date) + (b.date === today ? ' · 오늘의 책' : '') + ' · 읽는 시간 ' + (b.readMin || 3) + '분</span>' +
      '<h3>' + esc(b.title) + '</h3><p class="mb-meta">' + meta(b) + '</p>' +
      (b.quote ? '<blockquote class="mb-quote">“' + esc(b.quote) + '”</blockquote>' : '') +
      '<div class="mb-points">' + (b.points || []).slice(0, 3).map(function (p, i) { return '<div><b>핵심 ' + (i + 1) + '</b>' + esc(p) + '</div>'; }).join('') + '</div>' +
      '<div class="mb-use">' + (b.atSchool ? '<div><b>원에서는</b> ' + esc(b.atSchool) + '</div>' : '') + (b.atHome ? '<div><b>가정에서는</b> ' + esc(b.atHome) + '</div>' : '') + '</div>' +
      tagsHtml(b) +
      '<div class="mb-btns">' + (b.video ? '<button type="button" class="btn btn-navy mb-video" data-video="' + b.date + '">1분 영상으로 보기</button>' : '') + '<button type="button" class="btn btn-yellow" data-book="' + b.date + '">전체 요약 읽기 →</button><button type="button" class="btn btn-line mb-share" data-book="' + b.date + '">공유하기</button></div></div></article>';
  } else {
    var first = nextWeekday(today);
    todayHtml = '<article class="mb-today mb-empty"><div class="mb-cover mb-fake" style="background:linear-gradient(160deg,#F5B841,#F26B4E)"><b>첫 번째 책을<br>준비하고 있어요</b><span>원장님이 읽는 아침책방</span></div>' +
      '<div class="mb-body"><span class="mb-badge"><i>No.1</i>' + label(first) + ' 아침 공개</span><h3>첫 책이 곧 찾아옵니다</h3>' +
      '<p class="mb-meta">평일 아침 7시, 책 한 권을 3분 요약과 1분 영상으로 전해 드립니다.</p>' +
      '<blockquote class="mb-quote">“하루 3분, 원장님의 아침을 여는 한 권”</blockquote>' +
      '<div class="mb-points"><div><b>핵심 요약</b>책의 요점을 세 줄로</div><div><b>원에서는</b>교실에서 바로 써 볼 활동 1가지</div><div><b>가정에서는</b>아이와 나눌 질문 1가지</div></div></div></article>';
  }

  // 이번 주 책장 (월~금)
  var t = parse(today), dow = t.getUTCDay();
  var monday = new Date(t.getTime() - ((dow + 6) % 7) * 864e5);
  if (dow === 6 || dow === 0) monday = new Date(monday.getTime());
  var shelf = '';
  var nextIdx = all.findIndex(function (x) { return x.date > today; });
  for (var i = 0; i < 5; i++) {
    var d = fmt(new Date(monday.getTime() + i * 864e5));
    var bk = all.filter(function (x) { return x.date === d; })[0];
    var name = DOW[i + 1];
    if (bk && isOpen(bk)) {
      shelf += '<button type="button" class="mb-day' + (d === today ? ' on' : '') + '" data-book="' + d + '">' + cover(bk, 'mb-mini') + '<span>' + name + ' · ' + (d === today ? '<b>오늘</b>' : esc(bk.title)) + '</span></button>';
    } else if (d >= today) {
      var hint = (latest && latest.hint && d === nextWeekday(today)) ? '힌트: “' + esc(latest.hint) + '”' : '아침 7시 공개';
      shelf += '<div class="mb-day lock"><div class="mb-mini mb-lock">' + (d === today ? '오전 7시 공개' : d === nextWeekday(today) ? '내일 공개' : '곧 공개') + '</div><span>' + name + ' · ' + hint + '</span></div>';
    } else {
      shelf += '<div class="mb-day rest"><div class="mb-mini mb-lock">' + (all.length && d < all[0].date ? '책방 오픈 전' : '쉬어가는 날') + '</div><span>' + name + '</span></div>';
    }
  }
  var monthNow = today.slice(0, 7);
  var countLine = '이번 달 ' + books.filter(function (x) { return x.date.slice(0, 7) === monthNow; }).length + '권 · 지금까지 ' + books.length + '권';

  // 지난 책 모아보기
  var past = books.slice(0, -1).reverse();
  var months = [], tags = [];
  past.forEach(function (x) { var m = x.date.slice(0, 7); if (months.indexOf(m) < 0) months.push(m); (x.tags || []).forEach(function (g) { if (tags.indexOf(g) < 0) tags.push(g); }); });
  var archive = past.length ? '<div class="mb-arch-head"><h4>지난 책 모아보기</h4><div class="mb-chips"><button type="button" class="on" data-f="all">전체</button>' +
      months.map(function (m) { return '<button type="button" data-f="m:' + m + '">' + (+m.slice(5)) + '월</button>'; }).join('') +
      tags.slice(0, 8).map(function (g) { return '<button type="button" data-f="t:' + esc(g) + '">#' + esc(g) + '</button>'; }).join('') + '</div></div>' +
      '<div class="mb-arch">' + past.map(function (x) { return '<button type="button" class="mb-item" data-book="' + x.date + '" data-m="' + x.date.slice(0, 7) + '" data-t="' + esc((x.tags || []).join('|')) + '">' + cover(x, 'mb-mini') + '<small>No.' + x.no + ' · ' + label(x.date).replace('요일', '') + '</small><b>' + esc(x.title) + '</b></button>'; }).join('') + '</div>'
    : '';

  root.innerHTML = '<div class="wrap"><div class="mb-head"><div><div class="eyebrow">MORNING BOOK · 평일 아침</div><h2>원장님이 읽는 아침책방</h2><p>평일 아침 7시, 책 한 권을 3분 요약과 1분 영상으로 전해 드립니다. 원에서 바로 써 볼 활동과 가정에서 나눌 질문도 함께 담았어요.</p></div></div>' +
    todayHtml +
    '<div class="mb-week"><h4>이번 주 책장</h4><span>' + countLine + '</span></div><div class="mb-shelf">' + shelf + '</div>' + archive + '</div>';

  // 전체 요약 창
  var dlg = document.createElement('dialog');
  dlg.className = 'mb-dialog';
  document.body.appendChild(dlg);
  var open = function (date) {
    var x = all.filter(function (y) { return y.date === date && isOpen(y); })[0];
    if (!x) return;
    dlg.innerHTML = '<div class="mb-dlg-head"><span>원장님이 읽는 아침책방 · No.' + x.no + '</span><button type="button" class="mb-close" aria-label="닫기">×</button></div>' +
      '<div class="mb-dlg-body"><div class="mb-dlg-top">' + cover(x, 'mb-cover sm') + '<div><span class="mb-badge"><i>No.' + x.no + '</i>' + label(x.date) + ' · 읽는 시간 ' + (x.readMin || 3) + '분</span><h3>' + esc(x.title) + '</h3><p class="mb-meta">' + meta(x) + '</p>' + tagsHtml(x) + '</div></div>' +
      (x.quote ? '<blockquote class="mb-quote">“' + esc(x.quote) + '”</blockquote>' : '') +
      (x.video ? '<h4>1분 영상 요약</h4><div class="mb-vwrap"><video controls playsinline preload="none"' + (x.poster ? ' poster="' + esc(x.poster) + '"' : '') + '><source src="' + esc(x.video) + '" type="video/mp4"></video></div>' : '') + '<h4>핵심 요약</h4><ol class="mb-ol">' + (x.points || []).map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ol>' +
      ((x.summary || []).length ? '<h4>책 내용 정리</h4>' + x.summary.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') : '') +
      '<div class="mb-use">' + (x.atSchool ? '<div><b>원에서는</b> ' + esc(x.atSchool) + '</div>' : '') + (x.atHome ? '<div><b>가정에서는</b> ' + esc(x.atHome) + '</div>' : '') + '</div>' +
      '<p class="mb-note">이 요약은 중부산동심이 책을 읽고 정리한 글입니다. 자세한 내용은 책에서 확인해 주세요.</p>' +
      '<div class="mb-btns"><button type="button" class="btn btn-line mb-share" data-book="' + x.date + '">공유하기</button></div></div>';
    dlg.showModal();
    if (history.replaceState) history.replaceState(null, '', '#book-' + x.date);
  };
  var openVideo = function (date) {
    var x = all.filter(function (y) { return y.date === date && isOpen(y); })[0];
    if (!x || !x.video) return;
    dlg.innerHTML = '<div class="mb-dlg-head"><span>1분 영상 · ' + esc(x.title) + '</span><button type="button" class="mb-close" aria-label="닫기">×</button></div><div class="mb-dlg-body"><div class="mb-vwrap"><video controls autoplay playsinline' + (x.poster ? ' poster="' + esc(x.poster) + '"' : '') + '><source src="' + esc(x.video) + '" type="video/mp4"></video></div><div class="mb-btns" style="justify-content:center"><button type="button" class="btn btn-yellow" data-book="' + x.date + '">전체 요약 읽기 →</button><button type="button" class="btn btn-line mb-share" data-book="' + x.date + '">공유하기</button></div></div>';
    dlg.showModal();
  };
  var toast = function (msg) { var el = document.createElement('div'); el.className = 'mb-toast'; el.textContent = msg; document.body.appendChild(el); setTimeout(function () { el.remove(); }, 2200); };
  var share = function (date) {
    var x = all.filter(function (y) { return y.date === date; })[0]; if (!x) return;
    var url = location.origin + '/#book-' + date;
    var text = '[원장님이 읽는 아침책방] ' + x.title + (x.quote ? ' - “' + x.quote + '”' : '');
    if (navigator.share) { navigator.share({ title: x.title, text: text, url: url }).catch(function () {}); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(text + '\n' + url).then(function () { toast('링크를 복사했어요. 카카오톡에 붙여 넣어 공유해 주세요.'); }); }
  };
  document.addEventListener('click', function (e) {
    var s = e.target.closest('.mb-share'); if (s) { e.preventDefault(); share(s.dataset.book); return; }
    if (e.target.closest('.mb-close') || e.target === dlg) { dlg.close(); return; }
    var vb = e.target.closest('.mb-video'); if (vb) { openVideo(vb.dataset.video); return; }
    var o = e.target.closest('[data-book]'); if (o && (root.contains(o) || dlg.contains(o))) { open(o.dataset.book); return; }
    var f = e.target.closest('.mb-chips button');
    if (f) {
      root.querySelectorAll('.mb-chips button').forEach(function (b) { b.classList.toggle('on', b === f); });
      var v = f.dataset.f;
      root.querySelectorAll('.mb-item').forEach(function (it) {
        var show = v === 'all' || (v.indexOf('m:') === 0 && it.dataset.m === v.slice(2)) || (v.indexOf('t:') === 0 && it.dataset.t.split('|').indexOf(v.slice(2)) >= 0);
        it.hidden = !show;
      });
    }
  });
  dlg.addEventListener('close', function () { dlg.querySelectorAll('video').forEach(function (v) { v.pause(); }); if (location.hash.indexOf('#book-') === 0 && history.replaceState) history.replaceState(null, '', location.pathname + location.search); });
  var m = location.hash.match(/^#book-(\d{4}-\d{2}-\d{2})$/);
  if (m) { setTimeout(function () { root.scrollIntoView(); open(m[1]); }, 300); }
})();
