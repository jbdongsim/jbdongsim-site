(function () {
  var SEL = '.pe-images img, .pe-card-top img, .pe-profiles img';
  var css = document.createElement('style');
  css.textContent = '.pe-images img,.pe-card-top img,.pe-profiles img{cursor:zoom-in}' +
    '.zx{position:fixed;inset:0;z-index:200;background:rgba(8,18,36,.92);display:none;overflow:auto;-webkit-overflow-scrolling:touch}' +
    '.zx.on{display:block}.zx-in{min-height:100%;display:flex;align-items:center;justify-content:center;padding:56px 16px 40px;box-sizing:border-box}' +
    '.zx img{max-width:min(100%,1100px);max-height:calc(100vh - 110px);width:auto;height:auto;border-radius:10px;background:#fff;cursor:zoom-in;box-shadow:0 20px 60px rgba(0,0,0,.5)}' +
    '.zx.full .zx-in{align-items:flex-start;justify-content:flex-start}.zx.full img{max-width:none;max-height:none;cursor:zoom-out}' +
    '.zx-x{position:fixed;top:12px;right:14px;z-index:201;width:44px;height:44px;border-radius:50%;border:0;background:#fff;color:#12294A;font-size:28px;line-height:44px;cursor:pointer}' +
    '.zx-tip{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:201;background:rgba(255,255,255,.14);color:#fff;font-size:13px;font-weight:700;padding:7px 14px;border-radius:999px;white-space:nowrap}' +
    'body.zx-lock{overflow:hidden}';
  document.head.appendChild(css);
  var box = document.createElement('div');
  box.className = 'zx'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', '이미지 크게 보기');
  box.innerHTML = '<button type="button" class="zx-x" aria-label="닫기">×</button><div class="zx-in"><img alt=""></div><div class="zx-tip">이미지를 누르면 원래 크기로 커져요 · 휴대폰은 두 손가락으로 확대</div>';
  document.body.appendChild(box);
  var img = box.querySelector('img');
  var close = function () { box.classList.remove('on', 'full'); document.body.classList.remove('zx-lock'); img.removeAttribute('src'); };
  document.addEventListener('click', function (e) {
    var t = e.target.closest(SEL);
    if (t && !box.contains(t)) {
      e.preventDefault();
      img.src = t.currentSrc || t.src; img.alt = t.alt || '';
      box.classList.add('on'); box.classList.remove('full'); box.scrollTop = 0; box.scrollLeft = 0;
      document.body.classList.add('zx-lock');
    }
  });
  box.addEventListener('click', function (e) {
    if (e.target === img) { box.classList.toggle('full'); return; }
    if (e.target.closest('.zx-x') || e.target === box || e.target.classList.contains('zx-in')) close();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('on')) close(); });
})();
