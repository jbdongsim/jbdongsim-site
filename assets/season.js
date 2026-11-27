/* 중부산동심 계절 배경 (2026-11-28 대표님 요청)
   - ~2026-12-31: 크리스마스(빨강 배경·눈·트리 조명·반짝이는 별) - 첫 화면, 각 메뉴 페이지 머리, 맨 아래 연락처(푸터)
   - 2027-01-01 ~ 2027-02-28: 홋카이도 설원(하얀 겨울 하늘·눈·설산·눈 덮인 마을)
   - 2027-03-01부터: 원래 파란 배경
   - 미리보기: 주소 뒤에 ?season=xmas / ?season=winter / ?season=off */
(function () {
  var day = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
  var theme = day < '2027-01-01' ? 'xmas' : (day <= '2027-02-28' ? 'winter' : null);
  try { var q = new URLSearchParams(location.search).get('season'); if (q) theme = (q === 'off' ? null : q); } catch (e) {}
  if (theme !== 'xmas' && theme !== 'winter') return;

  var X = theme === 'xmas';
  var css =
    '.sn-host{position:relative;overflow:hidden}' +
    '.sn-host>.wrap,.sn-host>.container,.sn-host>.inner,.sn-host>.fwrap{position:relative;z-index:2}' +
    '.sn-host>.sn-layer{position:absolute!important;inset:0;z-index:1!important;pointer-events:none;overflow:hidden}' +
    '.sn-host>.sn-ground{position:absolute!important;left:0;right:0;bottom:0;z-index:1!important;pointer-events:none}' +
    '.sn-snow i{position:absolute;top:-14px;display:block;will-change:transform;animation:snFall linear infinite}' +
    '.sn-snow i b{display:block;width:100%;height:100%;border-radius:50%;background:#fff;animation:snSway ease-in-out infinite alternate;' +
    (X ? 'box-shadow:0 0 6px rgba(255,255,255,.8)}' : 'box-shadow:0 0 0 1px rgba(150,175,205,.35),0 1px 4px rgba(90,120,160,.45)}') +
    '.sn-dark .sn-snow i b{box-shadow:0 0 6px rgba(255,255,255,.8)}' +
    '@keyframes snFall{from{transform:translate3d(0,-20px,0)}to{transform:translate3d(0,var(--sn-h,1300px),0)}}' +
    '@keyframes snSway{from{transform:translateX(-14px)}to{transform:translateX(14px)}}' +
    '.sn-star{position:absolute;width:14px;height:14px;animation:snTw ease-in-out infinite}' +
    '.sn-star svg{width:100%;height:100%;display:block;filter:drop-shadow(0 0 4px rgba(255,230,150,.9))}' +
    '@keyframes snTw{0%,100%{opacity:.25;transform:scale(.55) rotate(0deg)}50%{opacity:1;transform:scale(1.1) rotate(20deg)}}' +
    '.sn-band{position:relative;height:150px;margin:4px 0 -40px;pointer-events:none;z-index:1!important}' +
    '.sn-band-in{position:absolute;top:0;bottom:0;left:50%;width:100vw;transform:translateX(-50%)}' +
    '.sn-band .sn-hill{position:absolute;left:-5%;right:-5%;bottom:0;height:70px;background:linear-gradient(#fff,#F3F6FB);border-radius:50% 50% 0 0/100% 100% 0 0;opacity:.96}' +
    '.sn-band svg.tr,.sn-ground svg.tr{position:absolute;bottom:28px;overflow:visible}' +
    '.xl{animation:snBlink 1.4s ease-in-out infinite;filter:drop-shadow(0 0 3px currentColor)}' +
    '@keyframes snBlink{0%,100%{opacity:.35}50%{opacity:1}}' +
    '.xtop{animation:snTop 2.2s ease-in-out infinite;transform-origin:50px 6px;filter:drop-shadow(0 0 6px #FFD866)}' +
    '@keyframes snTop{0%,100%{transform:scale(.9)}50%{transform:scale(1.15)}}' +
    '.sn-ground{height:60px}.sn-ground .sn-hill{position:absolute;left:-5%;right:-5%;bottom:-8px;height:26px;background:linear-gradient(#fff,#F3F6FB);border-radius:50% 50% 0 0/100% 100% 0 0;opacity:.95}' +
    '.sn-ground svg.tr{bottom:6px}' +
    
    '.wt-band svg.vil{position:absolute;left:-4%;bottom:0;width:108%;height:100%}' +
    '.wt .win{animation:snWin 3s ease-in-out infinite}@keyframes snWin{0%,100%{opacity:.85}50%{opacity:1}}' +
    '.wt .smoke{animation:snSmoke 4s ease-out infinite;opacity:0}@keyframes snSmoke{0%{opacity:0;transform:translate(0,0) scale(.6)}30%{opacity:.55}100%{opacity:0;transform:translate(10px,-34px) scale(1.4)}}' +
    '.sn-sun{position:absolute;right:8%;top:2%;width:70px;height:70px;border-radius:50%;background:radial-gradient(circle,#FFFFFF,#FFF8E6 70%);box-shadow:0 0 60px 26px rgba(255,255,255,.8)}' +
    '@media(max-width:680px){.sn-band{height:120px}}';

  if (X) {
    css +=
      '.home-hero,.phero{background:radial-gradient(700px 420px at 85% 10%,rgba(255,214,120,.26),rgba(0,0,0,0) 60%),radial-gradient(600px 400px at 5% 95%,rgba(255,255,255,.10),rgba(0,0,0,0) 60%),linear-gradient(160deg,#6E0B18 0%,#A8142A 48%,#7C0E1E 100%)!important}' +
      'footer{background:radial-gradient(600px 300px at 90% 0%,rgba(255,214,120,.18),rgba(0,0,0,0) 60%),linear-gradient(170deg,#5E0914 0%,#8E1023 55%,#650B18 100%)!important}' +
      '.home-hero .btn-ghost,.phero .btn-ghost{background:rgba(255,255,255,.1)!important}';
  } else {
    css +=
      '.home-hero,.phero{background:radial-gradient(520px 300px at 84% 8%,rgba(255,255,255,.95),rgba(255,255,255,0) 65%),linear-gradient(180deg,#B9CFE4 0%,#D6E3F0 30%,#EEF4FA 62%,#FFFFFF 100%)!important}' +
      '.home-hero h1,.phero h1,.phero h2{color:#12294A!important}.home-hero h1 em,.phero h1 em{color:#1F6FB8!important}' +
      '.home-hero .eyebrow,.phero .eyebrow,.phero .kicker{color:#2D6CA6!important}.home-hero .eyebrow::before,.phero .eyebrow::before{background:#2D6CA6!important}' +
      '.home-hero .sub,.phero p,.phero .sub,.phero .lead{color:#4A5D78!important}' +
      '.home-hero .btn-ghost,.phero .btn-ghost{color:#12294A!important;border-color:rgba(18,41,74,.4)!important;background:rgba(255,255,255,.7)!important}' +
      '.home-hero .who,.home-hero .who *{color:#12294A}.home-hero .who a{background:rgba(255,255,255,.75)!important;border-color:rgba(18,41,74,.18)!important}' +
      'footer{background:linear-gradient(180deg,#1C3F68 0%,#14304F 100%)!important}';
  }

  function run() {
    var st = document.createElement('style');
    st.id = 'season-style';
    st.textContent = css;
    document.head.appendChild(st);
    var small = window.innerWidth < 700;
    var COLORS = ['#FFD54A', '#FF5A5F', '#5AD1FF', '#9CFF7A', '#FF9AE0', '#FFFFFF'];

    var tree = function (x, s, c, k) {
      var lights = [[40, 34], [58, 48], [33, 74], [52, 82], [68, 70], [27, 100], [45, 110], [64, 106], [80, 98], [22, 126], [40, 132], [58, 128], [76, 124]];
      var g = '';
      lights.forEach(function (p, i) {
        var col = COLORS[(i + k) % COLORS.length];
        g += '<circle class="xl" cx="' + p[0] + '" cy="' + p[1] + '" r="3.6" fill="' + col + '" style="color:' + col + ';animation-delay:-' + ((i * 0.37 + k * 0.5) % 1.4).toFixed(2) + 's"/>';
      });
      return '<svg class="tr" viewBox="0 0 100 160" style="left:' + x + ';width:' + s + 'px;height:' + (s * 1.6) + 'px">' +
        '<rect x="44" y="136" width="12" height="20" fill="#5B3A1E"/>' +
        '<polygon points="50,8 86,62 66,62 92,104 70,104 98,140 2,140 30,104 8,104 34,62 14,62" fill="' + c + '"/>' +
        '<polygon points="50,8 62,26 38,26" fill="#fff" opacity=".9"/>' +
        '<polygon points="34,62 46,70 54,62 66,70 72,62" fill="#fff" opacity=".85"/>' +
        '<polygon points="30,104 44,112 56,104 70,112 76,104" fill="#fff" opacity=".85"/>' +
        '<path d="M30 56 Q50 66 70 54 M22 96 Q50 108 78 94 M14 134 Q50 146 88 132" fill="none" stroke="#F5C542" stroke-width="1.6" opacity=".7"/>' +
        g + '<polygon class="xtop" points="50,-4 53,4 61,4 55,9 57,17 50,12 43,17 45,9 39,4 47,4" fill="#FFD54A"/></svg>';
    };
    var house = function (x, w, roof, wall, d) {
      var hh = w * 0.62, y = 150 - hh, rx = x - 6, rw = w + 12;
      return '<g>' +
        '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hh + '" fill="' + wall + '"/>' +
        '<polygon points="' + rx + ',' + y + ' ' + (x + w / 2) + ',' + (y - w * 0.45) + ' ' + (rx + rw) + ',' + y + '" fill="' + roof + '"/>' +
        '<path d="M' + rx + ' ' + y + ' L' + (x + w / 2) + ' ' + (y - w * 0.45) + ' L' + (rx + rw) + ' ' + y + ' L' + (rx + rw - 6) + ' ' + (y + 4) + ' L' + (x + w / 2) + ' ' + (y - w * 0.45 + 7) + ' L' + (rx + 6) + ' ' + (y + 4) + 'Z" fill="#fff"/>' +
        '<rect x="' + (x + w * 0.62) + '" y="' + (y - w * 0.36) + '" width="' + (w * 0.11) + '" height="' + (w * 0.2) + '" fill="' + wall + '"/>' +
        '<circle class="smoke" cx="' + (x + w * 0.675) + '" cy="' + (y - w * 0.4) + '" r="5" fill="#fff" style="animation-delay:-' + d + 's"/>' +
        '<rect class="win" x="' + (x + w * 0.15) + '" y="' + (y + hh * 0.22) + '" width="' + (w * 0.22) + '" height="' + (w * 0.2) + '" rx="2" fill="#FFD66B" style="filter:drop-shadow(0 0 6px #FFC94A)"/>' +
        '<rect x="' + (x + w * 0.55) + '" y="' + (y + hh * 0.42) + '" width="' + (w * 0.24) + '" height="' + (hh * 0.58) + '" rx="2" fill="#7A4A2A"/></g>';
    };
    var pine = function (x, s) {
      return '<g transform="translate(' + x + ',' + (150 - s * 1.5) + ') scale(' + (s / 40) + ')"><polygon points="20,0 36,26 28,26 40,46 26,46 26,60 14,60 14,46 0,46 12,26 4,26" fill="#3F7A68"/><polygon points="20,0 27,12 13,12" fill="#fff"/><polygon points="12,26 20,30 28,26" fill="#fff" opacity=".9"/></g>';
    };
    var village = function (mob) {
      return mob ? ('<svg class="vil" viewBox="0 0 420 190" preserveAspectRatio="xMidYMax slice">' +
        '<path d="M0 92 L60 58 L110 80 L170 40 L240 84 L300 52 L360 78 L420 60 L420 190 L0 190Z" fill="#C9D9EA"/><path d="M60 58 L76 67 L90 64 L110 80 L95 74 L80 78Z M170 40 L190 54 L205 50 L240 84 L215 70 L195 74Z M300 52 L318 62 L332 60 L360 78 L338 70 L320 72Z" fill="#fff"/>' +
        '<path d="M0 118 Q110 96 210 112 T420 104 L420 190 L0 190Z" fill="#F4F8FC"/>' +
        pine(8, 30) + house(46, 62, '#B5473A', '#F3E6D3', 0) + pine(120, 24) + house(160, 50, '#2E5E8C', '#EFE3CF', 1.3) +
        house(250, 56, '#3D7A5C', '#F3E6D3', 2.1) + pine(318, 26) + house(350, 52, '#B5473A', '#EFE3CF', .7) +
        '<path d="M0 150 Q100 130 210 146 T420 140 L420 190 L0 190Z" fill="#fff"/></svg>') :
        ('<svg class="vil" viewBox="0 0 1000 190" preserveAspectRatio="xMidYMax slice">' +
        '<path d="M0 90 L90 50 L160 76 L260 30 L360 80 L450 46 L540 82 L640 36 L740 78 L830 48 L920 74 L1000 56 L1000 190 L0 190Z" fill="#C9D9EA"/><path d="M90 50 L112 62 L128 58 L160 76 L136 70 L116 72Z M260 30 L286 46 L304 42 L360 80 L318 64 L294 68Z M450 46 L470 58 L486 55 L540 82 L500 68 L478 70Z M640 36 L664 50 L682 46 L740 78 L700 64 L676 68Z M830 48 L850 60 L866 57 L920 74 L880 66 L860 68Z" fill="#fff"/>' +
        '<path d="M0 120 Q250 96 500 112 T1000 106 L1000 190 L0 190Z" fill="#F4F8FC"/>' +
        pine(20, 34) + house(70, 70, '#B5473A', '#F3E6D3', 0) + pine(160, 26) + house(200, 56, '#2E5E8C', '#EFE3CF', 1.3) + pine(270, 30) +
        house(690, 60, '#3D7A5C', '#F3E6D3', 2.1) + pine(765, 28) + house(805, 78, '#B5473A', '#EFE3CF', .7) + pine(905, 36) + pine(950, 26) +
        '<path d="M0 150 Q200 128 420 146 T1000 140 L1000 190 L0 190Z" fill="#fff"/></svg>');
    };
    var star = '<svg viewBox="0 0 20 20"><path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="#FFE9A8"/></svg>';

    function decorate(host, opt) {
      if (!host || host.querySelector(':scope > .sn-layer')) return;
      host.classList.add('sn-host');
      if (opt.dark) host.classList.add('sn-dark');
      var L = document.createElement('div');
      L.className = 'sn-layer';
      L.setAttribute('aria-hidden', 'true');
      var s = (!X && opt.sun) ? '<div class="sn-sun"></div>' : '';
      s += '<div class="sn-snow">';
      for (var i = 0; i < opt.flakes; i++) {
        var z = 2 + Math.random() * 5, d = 8 + Math.random() * 9;
        s += '<i style="left:' + (Math.random() * 100).toFixed(2) + '%;width:' + z.toFixed(1) + 'px;height:' + z.toFixed(1) + 'px;opacity:' + (0.5 + Math.random() * 0.5).toFixed(2) +
          ';animation-duration:' + d.toFixed(1) + 's;animation-delay:-' + (Math.random() * d).toFixed(1) + 's"><b style="animation-duration:' + (2 + Math.random() * 2.5).toFixed(1) + 's"></b></i>';
      }
      s += '</div>';
      if (X || opt.dark) {
        for (var j = 0; j < opt.stars; j++) {
          var sz = 8 + Math.random() * 10;
          s += '<span class="sn-star" style="left:' + (Math.random() * 98).toFixed(1) + '%;top:' + (2 + Math.random() * opt.starTop).toFixed(1) + '%;width:' + sz.toFixed(0) + 'px;height:' + sz.toFixed(0) +
            'px;animation-duration:' + (1.8 + Math.random() * 2.4).toFixed(1) + 's;animation-delay:-' + (Math.random() * 3).toFixed(1) + 's">' + star + '</span>';
        }
      }
      L.innerHTML = s;
      host.insertBefore(L, host.firstChild);
      var setH = function () { L.style.setProperty('--sn-h', (host.offsetHeight + 40) + 'px'); };
      setH();
      window.addEventListener('resize', setH);
      window.addEventListener('load', setH);
    }

    var home = document.querySelector('.home-hero');
    if (home) {
      decorate(home, { flakes: small ? 55 : 90, stars: small ? 14 : 26, starTop: 30, sun: true });
      var ns = home.querySelector('.notice-stack');
      if (ns && ns.parentNode && !home.querySelector('.sn-band')) {
        var B = document.createElement('div');
        B.className = 'sn-band' + (X ? '' : ' wt-band wt');
        B.setAttribute('aria-hidden', 'true');
        if (!X) B.style.height = small ? '190px' : '240px';
        B.innerHTML = '<div class="sn-band-in">' + (X ? ('<div class="sn-hill"></div>' + tree('3%', 62, '#0F5A3A', 0) + tree('10%', 44, '#137149', 2) + tree('22%', 36, '#137149', 4) +
          tree('70%', 38, '#137149', 1) + tree('80%', 50, '#137149', 3) + tree('89%', 66, '#0F5A3A', 5)) : village(small)) + '</div>';
        ns.parentNode.insertBefore(B, ns);
      }
    }
    var ph = document.querySelector('.phero');
    if (ph) {
      decorate(ph, { flakes: small ? 40 : 70, stars: small ? 10 : 20, starTop: 40, sun: true });
      if (!ph.querySelector(':scope > .sn-ground')) {
        var G = document.createElement('div');
        G.className = 'sn-ground' + (X ? '' : ' wt');
        G.setAttribute('aria-hidden', 'true');
        G.innerHTML = '<div class="sn-hill"></div>' + (X ? (tree('1%', 28, '#0F5A3A', 0) + tree('6%', 22, '#137149', 2) + tree('89%', 22, '#137149', 3) + tree('94%', 28, '#0F5A3A', 5)) : '');
        ph.appendChild(G);
      }
    }
    var ft = document.querySelector('footer');
    if (ft) decorate(ft, { flakes: small ? 35 : 60, stars: small ? 10 : 18, starTop: 60, dark: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
