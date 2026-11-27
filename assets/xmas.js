/* 중부산동심 첫 화면 크리스마스 배경 (2026-11-28 대표님 요청)
   - 2027-01-01 00:00 (KST)부터는 자동으로 꺼지고 원래 파란 배경으로 돌아간다. */
(function () {
  var nowKst = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
  if (nowKst >= '2027-01-01') return;
  function run() {
    var h = document.querySelector('.home-hero');
    if (!h || h.querySelector('.xm-layer')) return;
    var css = document.createElement('style');
    css.id = 'xmas-style';
    css.textContent =
      '.home-hero{background:radial-gradient(700px 420px at 85% 10%,rgba(255,214,120,.26),rgba(0,0,0,0) 60%),radial-gradient(600px 400px at 5% 95%,rgba(255,255,255,.10),rgba(0,0,0,0) 60%),linear-gradient(160deg,#6E0B18 0%,#A8142A 48%,#7C0E1E 100%)!important;position:relative;overflow:hidden}' +
      '.home-hero>*{position:relative;z-index:2}' +
      '.home-hero .xm-layer{position:absolute!important;inset:0;z-index:1!important;pointer-events:none;overflow:hidden}' +
      '.xm-snow i{position:absolute;top:-14px;display:block;will-change:transform;animation:xmFall linear infinite}' +
      '.xm-snow i b{display:block;width:100%;height:100%;border-radius:50%;background:#fff;box-shadow:0 0 6px rgba(255,255,255,.8);animation:xmSway ease-in-out infinite alternate}' +
      '@keyframes xmFall{from{transform:translate3d(0,-20px,0)}to{transform:translate3d(0,var(--xm-h,1300px),0)}}' +
      '@keyframes xmSway{from{transform:translateX(-14px)}to{transform:translateX(14px)}}' +
      '.xm-star{position:absolute;width:14px;height:14px;animation:xmTw ease-in-out infinite}' +
      '.xm-star svg{width:100%;height:100%;display:block;filter:drop-shadow(0 0 4px rgba(255,230,150,.9))}' +
      '@keyframes xmTw{0%,100%{opacity:.25;transform:scale(.55) rotate(0deg)}50%{opacity:1;transform:scale(1.1) rotate(20deg)}}' +
      '.xm-band{position:relative;height:150px;width:100vw;left:50%;transform:translateX(-50%);margin:4px 0 -40px;pointer-events:none;z-index:1}' +
      '.xm-band .xm-ground{position:absolute;left:-5%;right:-5%;bottom:0;height:70px;background:linear-gradient(#fff,#F3F6FB);border-radius:50% 50% 0 0/100% 100% 0 0;opacity:.96;box-shadow:0 -6px 24px rgba(255,255,255,.25)}' +
      '.xm-band svg{position:absolute;bottom:28px;overflow:visible}' +
      '.xm-band .xl{animation:xmBlink 1.4s ease-in-out infinite;filter:drop-shadow(0 0 3px currentColor)}' +
      '@keyframes xmBlink{0%,100%{opacity:.35}50%{opacity:1}}' +
      '.xm-band .xtop{animation:xmTop 2.2s ease-in-out infinite;transform-origin:50px 6px;filter:drop-shadow(0 0 6px #FFD866)}' +
      '@keyframes xmTop{0%,100%{transform:scale(.9)}50%{transform:scale(1.15)}}' +
      '.home-hero .notice-stack{position:relative;z-index:2}' +
      '@media(max-width:680px){.xm-band{height:120px}}';
    document.head.appendChild(css);

    var COLORS = ['#FFD54A', '#FF5A5F', '#5AD1FF', '#9CFF7A', '#FF9AE0', '#FFFFFF'];
    var tree = function (x, s, c, k) {
      var lights = [[40, 34], [58, 48], [33, 74], [52, 82], [68, 70], [27, 100], [45, 110], [64, 106], [80, 98], [22, 126], [40, 132], [58, 128], [76, 124]];
      var g = '';
      lights.forEach(function (p, i) {
        var col = COLORS[(i + k) % COLORS.length];
        g += '<circle class="xl" cx="' + p[0] + '" cy="' + p[1] + '" r="3.6" fill="' + col + '" style="color:' + col + ';animation-delay:-' + ((i * 0.37 + k * 0.5) % 1.4).toFixed(2) + 's"/>';
      });
      return '<svg viewBox="0 0 100 160" style="left:' + x + ';width:' + s + 'px;height:' + (s * 1.6) + 'px">' +
        '<rect x="44" y="136" width="12" height="20" fill="#5B3A1E"/>' +
        '<polygon points="50,8 86,62 66,62 92,104 70,104 98,140 2,140 30,104 8,104 34,62 14,62" fill="' + c + '"/>' +
        '<polygon points="50,8 62,26 38,26" fill="#fff" opacity=".9"/>' +
        '<polygon points="34,62 46,70 54,62 66,70 72,62" fill="#fff" opacity=".85"/>' +
        '<polygon points="30,104 44,112 56,104 70,112 76,104" fill="#fff" opacity=".85"/>' +
        '<path d="M30 56 Q50 66 70 54 M22 96 Q50 108 78 94 M14 134 Q50 146 88 132" fill="none" stroke="#F5C542" stroke-width="1.6" opacity=".7"/>' +
        g +
        '<polygon class="xtop" points="50,-4 53,4 61,4 55,9 57,17 50,12 43,17 45,9 39,4 47,4" fill="#FFD54A"/>' +
        '</svg>';
    };
    var B = document.createElement('div');
    B.className = 'xm-band';
    B.setAttribute('aria-hidden', 'true');
    B.innerHTML = '<div class="xm-ground"></div>' + tree('3%', 62, '#0F5A3A', 0) + tree('10%', 44, '#137149', 2) + tree('22%', 36, '#137149', 4) +
      tree('70%', 38, '#137149', 1) + tree('80%', 50, '#137149', 3) + tree('89%', 66, '#0F5A3A', 5);
    var ns = h.querySelector('.notice-stack');
    if (ns && ns.parentNode) ns.parentNode.insertBefore(B, ns);

    var L = document.createElement('div');
    L.className = 'xm-layer';
    L.setAttribute('aria-hidden', 'true');
    var small = window.innerWidth < 700;
    var s = '<div class="xm-snow">';
    var n = small ? 55 : 90;
    for (var i = 0; i < n; i++) {
      var z = 2 + Math.random() * 5, d = 8 + Math.random() * 9;
      s += '<i style="left:' + (Math.random() * 100).toFixed(2) + '%;width:' + z.toFixed(1) + 'px;height:' + z.toFixed(1) + 'px;opacity:' + (0.5 + Math.random() * 0.5).toFixed(2) +
        ';animation-duration:' + d.toFixed(1) + 's;animation-delay:-' + (Math.random() * d).toFixed(1) + 's"><b style="animation-duration:' + (2 + Math.random() * 2.5).toFixed(1) + 's"></b></i>';
    }
    s += '</div>';
    var star = '<svg viewBox="0 0 20 20"><path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="#FFE9A8"/></svg>';
    var st = small ? 14 : 26;
    for (var j = 0; j < st; j++) {
      var sz = 8 + Math.random() * 10;
      s += '<span class="xm-star" style="left:' + (Math.random() * 98).toFixed(1) + '%;top:' + (2 + Math.random() * 30).toFixed(1) + '%;width:' + sz.toFixed(0) + 'px;height:' + sz.toFixed(0) +
        'px;animation-duration:' + (1.8 + Math.random() * 2.4).toFixed(1) + 's;animation-delay:-' + (Math.random() * 3).toFixed(1) + 's">' + star + '</span>';
    }
    L.innerHTML = s;
    h.insertBefore(L, h.firstChild);
    var setH = function () { L.style.setProperty('--xm-h', (h.offsetHeight + 40) + 'px'); };
    setH();
    window.addEventListener('resize', setH);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
