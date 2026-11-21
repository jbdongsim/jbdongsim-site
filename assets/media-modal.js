/* 중부산동심 공통 자료 팝업: 카탈로그(사이트 이미지) · 영상(유튜브/사이트 mp4) · 웹 자료(iframe) · 부모교육 자세히 보기 */
(function () {
  var LIB = {"나은프로젝트":{"mp4":"assets/video-naun.mp4"},"드아트빌":{"yt":"VH5B8QKvYU0"},"프레아트빌":{"yt":"VH5B8QKvYU0"},"한국프로젝트":{"yt":"5M71XQOQAUE"},"점핑잉글리시":{"cat":["jumping",1],"mp4":"assets/video-jumping.mp4"},"챗키드로":{"cat":["chatkidro",1],"yt":"j-lABwWfYeU"},"하임슐레":{"cat":["heim",2],"yt":"44Qi4JZx0Yw"},"꼬모아르떼":{"cat":["como",2],"mp4":"assets/video-como.mp4"},"수학어드벤쳐":{"cat":["math",13],"yt":"1Y4joLOKvPU"},"매쓰캥거루":{"cat":["kangaroo",2],"yt":"mnqWXx6q9eg"},"테비박스":{"cat":["tevi",2],"yt":"1xMreF0I3_M"},"한글어드벤처":{"cat":["hangul",15],"yt":"YNncKp5VlNE"},"이야기모자":{"cat":["iyagi",14],"yt":"ezWyWAiUy2o"},"플레이콩":{"cat":["playkong",14],"yt":"FAlfhPOWWAk"},"초록별 도보미":{"cat":["chorok",14],"yt":"nF2I4IOCMrA"},"누리과정 플러스":{"cat":["nuri",27],"yt":"OvA4Lk_D8js"},"윙스 (WINGS)":{"cat":["wings",6],"yt":"Doh-z7O-AT4"},"책보플러스":{"cat":["chaekbo",16]},"도대체과학연구소":{"cat":["dodaeche",16],"yt":"fKQAAekBknA"},"젤리아이":{"cat":["jelly",18]},"셀업키즈 (SEL UP)":{"cat":["selup",14],"mp4":"assets/video-selup.mp4"},"아이마이미":{"cat":["imimi",24],"yt":"0IWJkLha3zg"},"엉뚱한 과학":{"cat":["eongttung",15],"yt":"k99iMQq_krM"},"세힘":{"cat":["sehim",25],"yt":"mPxON3v35-U"},"오플레이":{"cat":["oplay",28],"yt":"0enHcdh1vqY"},"까르르한글수학":{"cat":["kkarr",55]}};
  var EXTRA = { bag: { title: '가방 카탈로그', cat: ['bag', 56], cta: '원 운영 지원' } };
  var css = document.createElement('style');
  css.textContent = [
    '.mm{position:fixed;inset:0;z-index:150;background:rgba(10,22,44,.62);display:none;align-items:center;justify-content:center;padding:16px;box-sizing:border-box}',
    '.mm.on{display:flex}body.mm-lock{overflow:hidden}',
    '.mm-box{position:relative;width:min(980px,100%);max-height:min(92vh,100%);background:#fff;border-radius:26px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.35)}',
    '.mm-head{display:flex;align-items:center;gap:12px;padding:18px 20px 12px 24px;border-bottom:1px solid #EEF1F6}',
    '.mm-head h3{margin:0;font-size:19px;font-weight:800;color:#12294A;flex:1;line-height:1.35}',
    '.mm-head small{display:block;font-size:12.5px;font-weight:700;color:#7A8699;margin-bottom:2px}',
    '.mm-x{flex:none;width:42px;height:42px;border-radius:50%;border:0;background:#F1F4F9;color:#12294A;font-size:26px;line-height:42px;cursor:pointer}',
    '.mm-tabs[hidden]{display:none!important}.mm-tabs{display:flex;gap:8px;padding:12px 24px 0}.mm-tabs button{border:1.5px solid #D5DCE7;background:#fff;color:#12294A;font:inherit;font-size:14px;font-weight:800;padding:8px 16px;border-radius:999px;cursor:pointer}.mm-tabs button.on{background:#12294A;border-color:#12294A;color:#fff}',
    '.mm-body{overflow:auto;-webkit-overflow-scrolling:touch;padding:16px 24px 20px;flex:1}',
    '.mm-video{position:relative;width:100%;aspect-ratio:16/9;border-radius:16px;overflow:hidden;background:#000}.mm-video iframe,.mm-video video{position:absolute;inset:0;width:100%;height:100%;border:0}',
    '.mm-label{font-size:15px;font-weight:800;color:#12294A;margin:4px 0 10px}',
    '.mm-pages{display:grid;gap:12px}.mm-pages img{width:100%;height:auto;display:block;border-radius:12px;background:#F4F6FA;box-shadow:0 2px 10px rgba(18,41,74,.08)}',
    '.mm-hint{font-size:12.5px;color:#7A8699;margin:10px 0 0}',
    '.mm-frame{width:100%;height:min(70vh,760px);border:0;border-radius:14px;background:#F4F6FA}',
    '.mm-foot{display:grid;gap:10px;padding:14px 24px 20px;border-top:1px solid #EEF1F6}',
    '.mm-foot a,.mm-foot button{display:block;text-align:center;font:inherit;font-size:16px;font-weight:800;padding:15px;border-radius:999px;text-decoration:none;cursor:pointer}',
    '.mm-cta{background:#1D3150;color:#fff;border:0}.mm-share{background:#F3F6FB;color:#1D3150;border:1.5px solid #D5DCE7}',
    '.mm-pe .pe-card-top{display:flex;gap:16px;align-items:flex-start;margin-bottom:12px}.mm-pe .pe-card-top img{width:120px;border-radius:12px}',
    '.mm-pe .pe-images img{max-width:100%;height:auto}.mm-pe .pe-detail-body{display:block!important}',
    '@media(min-width:700px){.mm-foot{grid-template-columns:2fr 1fr}}',
    '@media(max-width:600px){.mm{padding:8px}.mm-box{border-radius:20px;max-height:94vh}.mm-head{padding:14px 14px 10px 18px}.mm-body{padding:12px 14px 16px}.mm-tabs{padding:10px 14px 0}.mm-foot{padding:12px 14px 16px}.mm-pe .pe-card-top img{width:88px}}'
  ].join('');
  document.head.appendChild(css);
  var box = document.createElement('div');
  box.className = 'mm'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
  box.innerHTML = '<div class="mm-box"><div class="mm-head"><h3></h3><button type="button" class="mm-x" aria-label="닫기">×</button></div><div class="mm-tabs" hidden></div><div class="mm-body"></div><div class="mm-foot"><a class="mm-cta" href="/contact#quick-contact">상담하기</a><button type="button" class="mm-share">링크 공유</button></div></div>';
  document.body.appendChild(box);
  var $ = function (s) { return box.querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
  var current = null;
  function videoHtml(it) {
    if (it.yt) return '<div class="mm-video"><iframe src="https://www.youtube-nocookie.com/embed/' + it.yt + '?autoplay=1&rel=0&playsinline=1" title="' + esc(it.title || '영상') + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>';
    if (it.mp4) return '<div class="mm-video"><video src="' + it.mp4 + '" controls autoplay playsinline preload="metadata"></video></div>';
    return '';
  }
  function catHtml(it) {
    var s = it.cat[0], n = it.cat[1], h = '<div class="mm-pages">';
    for (var i = 1; i <= n; i++) h += '<img src="images/cat-' + s + '-' + pad(i) + '.jpg" alt="' + esc(it.title || '') + ' 카탈로그 ' + i + '쪽" loading="' + (i < 3 ? 'eager' : 'lazy') + '">';
    return h + '</div><p class="mm-hint">' + n + '쪽 · 휴대폰에서는 두 손가락으로 확대해 보세요.</p>';
  }
  function show(view) {
    var it = current; if (!it) return;
    [].forEach.call($('.mm-tabs').children, function (b) { b.classList.toggle('on', b.dataset.v === view); });
    var body = $('.mm-body');
    if (view === 'video') body.innerHTML = '<div class="mm-label">' + (it.videoLabel || '제품 영상') + '</div>' + videoHtml(it);
    else if (view === 'cat') body.innerHTML = catHtml(it);
    else if (view === 'frame') body.innerHTML = '<iframe class="mm-frame" src="' + it.frame + '" title="' + esc(it.title) + '" allowfullscreen></iframe>';
    else if (view === 'html') body.innerHTML = it.html;
    body.scrollTop = 0;
  }
  function open(it, view) {
    current = it;
    $('.mm-head h3').innerHTML = (it.kicker ? '<small>' + esc(it.kicker) + '</small>' : '') + esc(it.title || '');
    var tabs = $('.mm-tabs'), opts = [];
    if (it.cat) opts.push(['cat', '카탈로그']);
    if (it.yt || it.mp4) opts.push(['video', '제품영상']);
    tabs.innerHTML = opts.map(function (o) { return '<button type="button" data-v="' + o[0] + '">' + o[1] + '</button>'; }).join('');
    tabs.hidden = opts.length < 2 || !!it.html || !!it.frame;
    var cta = $('.mm-cta');
    cta.textContent = it.ctaText || '이 프로그램 상담하기';
    cta.href = '/contact?area=' + encodeURIComponent(it.area || '') + (it.program ? '&program=' + encodeURIComponent(it.program) : '') + '#quick-contact';
    box.classList.add('mm-on'); box.classList.add('on'); box.classList.toggle('mm-pe', !!it.html);
    document.body.classList.add('mm-lock');
    show(view || (it.html ? 'html' : it.frame ? 'frame' : opts.length ? opts[0][0] : 'cat'));
  }
  function close() { box.classList.remove('on'); document.body.classList.remove('mm-lock'); $('.mm-body').innerHTML = ''; current = null; }
  box.addEventListener('click', function (e) {
    var t = e.target.closest('.mm-tabs button'); if (t) return show(t.dataset.v);
    if (e.target.closest('.mm-x') || e.target === box) return close();
    if (e.target.closest('.mm-share')) {
      var url = location.href.split('#')[0], title = (current && current.title) || document.title;
      if (navigator.share) navigator.share({ title: title, url: url }).catch(function () {});
      else if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { e.target.textContent = '링크를 복사했어요'; setTimeout(function () { e.target.textContent = '링크 공유'; }, 1800); });
    }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('on')) close(); });
  var ytId = function (u) { var m = String(u).match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/); return m && m[1]; };
  window.JBMedia = { open: open, lib: LIB };
  var unTarget = function () { document.querySelectorAll('a[href*="youtube.com/watch"],a[href*="youtu.be/"]').forEach(function (a) { if (!a.closest('footer')) { a.removeAttribute('target'); a.setAttribute('aria-label', (a.getAttribute('aria-label') || '').replace(' (새 창)', '')); } }); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', unTarget); else unTarget();
  document.addEventListener('click', function (e) {
    if (box.contains(e.target)) return;
    // 1) 프로그램 카드/영역 팝업 버튼
    var b = e.target.closest('[data-mm-prog]');
    if (b) { var p = b.dataset.mmProg, it = LIB[p]; if (!it) return; e.preventDefault();
      var o = Object.assign({ title: p, program: p, area: b.dataset.mmArea || '교육 프로그램', kicker: '교육 프로그램' }, it);
      if (b.dataset.mmArea) document.querySelectorAll('dialog[open]').forEach(function (d) { d.close(); });
      return open(o, b.dataset.mmKind === 'video' ? 'video' : 'cat'); }
    // 2) 기타 자료 (가방 카탈로그, 웹 카탈로그)
    var x = e.target.closest('[data-mm-extra],[data-mm-frame]');
    if (x) { e.preventDefault();
      if (x.dataset.mmFrame) return open({ title: x.dataset.mmTitle || '자료 보기', kicker: '원운영상품', frame: x.dataset.mmFrame, area: '원 운영 지원', program: x.dataset.mmTitle, ctaText: '이 상품 상담하기' });
      var ex = EXTRA[x.dataset.mmExtra]; return open(Object.assign({ kicker: '원운영상품', area: ex.cta, program: ex.title, ctaText: '이 상품 상담하기' }, ex), 'cat'); }
    // 3) 유튜브 링크 (원내행사 등)
    var a = e.target.closest('a[href*="youtube.com/watch"],a[href*="youtu.be/"]');
    if (a && !a.closest('footer')) { var id = ytId(a.href); if (!id) return; e.preventDefault();
      var card = a.closest('article'), h = card && card.querySelector('h4,h3');
      var title = h ? h.textContent.trim() : (a.getAttribute('aria-label') || '영상').replace(/ ?영상 보기.*$/, '');
      return open({ title: title, kicker: '원내행사 영상', yt: id, videoLabel: '행사 영상', area: '원내행사', program: title, ctaText: '이 행사 상담하기' }, 'video'); }
    // 4) 부모교육 자세히 보기
    var s = e.target.closest('.pe-detail > summary');
    if (s) { e.preventDefault(); var art = s.closest('.pe-card'), top = art.querySelector('.pe-card-top'), body = art.querySelector('.pe-detail-body');
      var t2 = art.querySelector('h3') ? art.querySelector('h3').textContent.trim() : '부모교육';
      var tag = art.querySelector('.pe-tag');
      return open({ title: t2, kicker: tag ? tag.textContent.trim() : '부모교육행사', html: '<div class="mm-pe">' + (top ? top.outerHTML : '') + (body ? body.outerHTML : '') + '</div>', area: '부모교육행사', program: t2, ctaText: '이 행사 상담하기' }); }
  });
})();
