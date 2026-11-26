(function () {
  var SETS = {
    banner: [
      ['images/event-support-banner-3.jpg', '역할놀이 현수막 · 2호 소방서(119)'],
      ['images/event-support-banner-5.jpg', '역할놀이 현수막 · 3호 미용실'],
      ['images/event-support-banner-4.jpg', '역할놀이 현수막 · 4호 마켓'],
      ['images/event-support-banner-6.jpg', '역할놀이 현수막 · 6호 교통경찰'],
      ['images/event-support-banner-8.jpg', '역할놀이 현수막 · 8호 레스토랑'],
      ['images/event-support-banner-7.jpg', '역할놀이 현수막 · 10호 병원'],
      ['images/event-support-banner-1.jpg', '크리스마스 포토존 현수막 1'],
      ['images/event-support-banner-2.jpg', '크리스마스 포토존 현수막 2']
    ],
    air: [
      ['images/event-support-air-all-v2.jpg', '에어아치 · 설치 모습 모아보기']
    ],
    pororo: [
      ['images/event-support-pororo-crong-v2.jpg', '뽀로로·크롱 대형 탈 행사 지원']
    ]
  };
  var css = document.createElement('style');
  css.textContent = '.gx{position:fixed;inset:0;z-index:200;background:rgba(8,18,36,.93);display:none;flex-direction:column;align-items:center;justify-content:center;padding:58px 12px 18px;box-sizing:border-box}' +
    '.gx.on{display:flex}.gx-stage{position:relative;flex:1;min-height:0;width:100%;display:flex;align-items:center;justify-content:center}' +
    '.gx-stage img{max-width:min(100%,1000px);max-height:100%;width:auto;height:auto;border-radius:10px;background:#fff;box-shadow:0 20px 60px rgba(0,0,0,.5)}' +
    '.gx-cap{color:#fff;font-weight:800;font-size:15px;margin-top:12px;text-align:center}.gx-cap small{display:block;font-weight:600;font-size:12.5px;opacity:.7;margin-top:3px}' +
    '.gx-x{position:fixed;top:12px;right:14px;width:44px;height:44px;border-radius:50%;border:0;background:#fff;color:#12294A;font-size:28px;line-height:44px;cursor:pointer}' +
    '.gx-nav{position:absolute;top:50%;transform:translateY(-50%);width:46px;height:46px;border-radius:50%;border:0;background:rgba(255,255,255,.9);color:#12294A;font-size:26px;font-weight:800;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.3)}' +
    '.gx-prev{left:6px}.gx-next{right:6px}.gx.single .gx-nav{display:none}' +
    '.gx-thumbs{display:flex;gap:6px;margin-top:10px;max-width:100%;overflow-x:auto;padding:2px}.gx.single .gx-thumbs{display:none}' +
    '.gx-thumbs button{flex:none;width:48px;height:62px;padding:0;border:2px solid transparent;border-radius:6px;overflow:hidden;background:#fff;cursor:pointer;opacity:.6}' +
    '.gx-thumbs button.on{border-color:#F5B83D;opacity:1}.gx-thumbs img{width:100%;height:100%;object-fit:cover;display:block}' +
    'body.gx-lock{overflow:hidden}' +
    '.gx-stage img{cursor:zoom-in}.gx.zoom .gx-stage{display:block;overflow:auto;-webkit-overflow-scrolling:touch;text-align:center}.gx.zoom .gx-stage img{max-width:none;max-height:none;width:min(1600px,220vw);cursor:zoom-out}.gx.zoom .gx-nav{display:none}';
  document.head.appendChild(css);
  var box = document.createElement('div');
  box.className = 'gx'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', '행사 지원 이미지 보기');
  box.innerHTML = '<button type="button" class="gx-x" aria-label="닫기">×</button><div class="gx-stage"><button type="button" class="gx-nav gx-prev" aria-label="이전">‹</button><img alt=""><button type="button" class="gx-nav gx-next" aria-label="다음">›</button></div><div class="gx-cap"></div><div class="gx-thumbs"></div>';
  document.body.appendChild(box);
  var img = box.querySelector('.gx-stage img'), cap = box.querySelector('.gx-cap'), th = box.querySelector('.gx-thumbs');
  var list = [], idx = 0;
  function show(i) {
    idx = (i + list.length) % list.length;
    img.src = list[idx][0]; img.alt = list[idx][1];
    box.classList.remove('zoom');
    cap.innerHTML = list[idx][1] + (list.length > 1 ? '<small>' + (idx + 1) + ' / ' + list.length + ' · 좌우로 넘겨 보세요</small>' : '<small>사진을 누르면 크게 볼 수 있어요</small>');
    [].forEach.call(th.children, function (b, j) { b.classList.toggle('on', j === idx); });
  }
  function open(key, start) {
    list = SETS[key] || []; if (!list.length) return;
    th.innerHTML = list.map(function (it, j) { return '<button type="button" data-i="' + j + '" aria-label="' + (j + 1) + '번째 이미지"><img src="' + it[0] + '" alt="" loading="lazy"></button>'; }).join('');
    box.classList.toggle('single', list.length < 2);
    box.classList.add('on'); document.body.classList.add('gx-lock'); show(start || 0);
  }
  function close() { box.classList.remove('on', 'zoom'); document.body.classList.remove('gx-lock'); img.removeAttribute('src'); }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-gal]');
    if (t && !box.contains(t)) { e.preventDefault(); open(t.getAttribute('data-gal'), 0); }
  });
  box.addEventListener('click', function (e) {
    if (e.target.closest('.gx-prev')) return show(idx - 1);
    if (e.target.closest('.gx-next')) return show(idx + 1);
    if (e.target === img) { box.classList.toggle('zoom'); return; }
    var tb = e.target.closest('.gx-thumbs button'); if (tb) return show(+tb.getAttribute('data-i'));
    if (e.target.closest('.gx-x') || e.target === box || e.target.classList.contains('gx-stage')) close();
  });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('on')) return;
    if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') show(idx - 1); else if (e.key === 'ArrowRight') show(idx + 1);
  });
  var sx = null;
  box.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 45 && list.length > 1 && !box.classList.contains('zoom')) show(idx + (dx < 0 ? 1 : -1)); sx = null; });
})();
