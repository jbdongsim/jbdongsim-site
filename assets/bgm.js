/* 원장님이 읽는 아침책방 · 아침 피아노 음악 미니창 (찬송가·워십 피아노 10곡, Pixabay 무료 음원)
   - 홈: 아침책방 칸(#morning-books)이 화면에 들어오거나 '아침책방' 메뉴를 누르면 미니창이 나타나고 음악이 자동 재생됩니다.
     칸을 벗어나면 미니창이 사라지고 음악도 멈춥니다. 책 페이지(book-YYYY-MM-DD)에서는 항상 보입니다.
   - 미니창에서 ▶/⏸, 다음 곡, 곡 정보(i)를 직접 조절할 수 있습니다. 직접 멈추면 다시 ▶를 누를 때까지 자동 재생하지 않습니다.
   - 브라우저가 자동 재생을 막으면 화면을 한 번 누르는 순간 재생됩니다. 1분 영상을 틀면 음악은 잠시 멈춥니다.
   - 오늘의 곡 = 오늘까지 공개된 아침책방 권수 기준(책 No.N의 1분 영상 배경음악과 같은 곡). */
(function(){
  if (window.__mbgm) return; window.__mbgm = true;
  var T = [{"k":"찬송가","c":"내 맘의 주여 소망 되소서","e":"Be Thou My Vision","p":"smccleery","u":"https://pixabay.com/music/modern-classical-be-thou-my-vision-piano-solo-255035/","f":"/assets/audio/piano-01.m4a"},{"k":"워십","c":"Morning Worship","e":"아침 워십 피아노","p":"Adrian_Huminiak","u":"https://pixabay.com/music/modern-classical-morning-worship-180330/","f":"/assets/audio/piano-02.m4a"},{"k":"찬송가","c":"내 평생에 가는 길","e":"It Is Well with My Soul","p":"smccleery","u":"https://pixabay.com/music/solo-piano-it-is-well-with-my-soul-piano-solo-488378/","f":"/assets/audio/piano-03.m4a"},{"k":"워십","c":"Piano Worship","e":"피아노 워십","p":"Jonathan_DiazPro","u":"https://pixabay.com/music/solo-piano-piano-worship-184108/","f":"/assets/audio/piano-04.m4a"},{"k":"찬송가","c":"오 신실하신 주","e":"Great Is Thy Faithfulness","p":"Music_For_Videos","u":"https://pixabay.com/music/solo-piano-great-is-thy-faithfulness-146072/","f":"/assets/audio/piano-05.m4a"},{"k":"워십","c":"Beautiful Worship Piano","e":"평안의 워십 피아노","p":"Denis-Pavlov-Music","u":"https://pixabay.com/music/modern-classical-beautiful-worship-piano-peaceful-music-240319/","f":"/assets/audio/piano-06.m4a"},{"k":"찬송가","c":"나 같은 죄인 살리신","e":"Amazing Grace","p":"Music_For_Videos","u":"https://pixabay.com/music/solo-piano-amazing-grace-146071/","f":"/assets/audio/piano-07.m4a"},{"k":"워십","c":"Worship Piano · Peaceful Prayer","e":"기도의 워십 피아노","p":"Denis-Pavlov-Music","u":"https://pixabay.com/music/modern-classical-worship-piano-instrumental-peaceful-prayer-music-223373/","f":"/assets/audio/piano-08.m4a"},{"k":"찬송가","c":"내 영혼아 잠잠하라","e":"Be Still, My Soul","p":"smccleery","u":"https://pixabay.com/music/modern-classical-be-still-my-soul-piano-improvisation-247207/","f":"/assets/audio/piano-09.m4a"},{"k":"워십","c":"Relax Worship Piano","e":"쉼의 워십 피아노","p":"u_hx6vlzlzl7","u":"https://pixabay.com/music/modern-classical-relax-worship-piano-133310/","f":"/assets/audio/piano-10.m4a"}];
  function todayIdx(){
    try { var B = window.MORNING_BOOKS || [], now = new Date(), n = 0;
      B.forEach(function(b){ var d = new Date((b.date||'') + 'T' + (b.time||'07:00') + ':00+09:00'); if (d <= now) n++; });
      if (n > 0) return (n - 1) % T.length; } catch(e) {}
    return Math.floor((Date.now() + 9*3600e3) / 864e5) % T.length;
  }
  var sec = document.getElementById('morning-books');
  var isBook = /\/book-\d{4}-\d{2}-\d{2}/.test(location.pathname);
  if (!sec && !isBook) return;
  var i = todayIdx(), today = i, audio = new Audio(); audio.preload = 'none'; audio.volume = 0.4;
  var inView = isBook, userPaused = false, videoPaused = false, waiting = false;
  var css = document.createElement('style');
  css.textContent = '.mbgm{position:fixed;right:16px;bottom:120px;z-index:70;display:flex;align-items:center;gap:10px;max-width:min(330px,calc(100vw - 32px));padding:8px 10px 8px 8px;border-radius:999px;background:rgba(255,255,255,.97);border:1px solid #F1E3C8;box-shadow:0 10px 28px rgba(18,41,74,.18);font-family:inherit;opacity:0;visibility:hidden;transform:translateY(14px);transition:opacity .35s,transform .35s,visibility .35s}'
   + '.mbgm.show{opacity:1;visibility:visible;transform:none}'
   + '.mbgm button{border:0;cursor:pointer;font:inherit}'
   + '.mbgm-play{flex:none;width:46px;height:46px;border-radius:50%;background:#F5B841;color:#12294A;display:grid;place-items:center;box-shadow:0 4px 12px rgba(245,184,65,.45)}'
   + '.mbgm-play svg{width:22px;height:22px}.mbgm .ic-pause{display:none}.mbgm.on .ic-play{display:none}.mbgm.on .ic-pause{display:block}'
   + '.mbgm-info{min-width:0;display:flex;flex-direction:column;line-height:1.25}'
   + '.mbgm-label{font-size:11.5px;font-weight:700;color:#8A6A1F;white-space:nowrap}.mbgm-title{font-size:13.5px;font-weight:800;color:#12294A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
   + '.mbgm-next,.mbgm-info-btn{flex:none;width:34px;height:34px;border-radius:50%;background:#F4F6FA;color:#12294A;display:grid;place-items:center}.mbgm-next svg{width:16px;height:16px}.mbgm-info-btn{font-weight:800;font-size:14px}'
   + '.mbgm.on .mbgm-play{animation:mbgmPulse 2.4s ease-in-out infinite}@keyframes mbgmPulse{50%{box-shadow:0 4px 18px rgba(245,184,65,.85)}}'
   + '.mbgm.wait .mbgm-label::after{content:" · 화면을 누르면 재생돼요";color:#B07A12;font-weight:600}'
   + '.mbgm-credits{position:fixed;right:16px;z-index:71;width:min(360px,calc(100vw - 32px));max-height:60vh;overflow:auto;padding:16px 16px 12px;border-radius:18px;background:#fff;border:1px solid #E3E8F0;box-shadow:0 18px 40px rgba(18,41,74,.22);font-size:12.5px;color:#36475F;line-height:1.5}'
   + '.mbgm-credits[hidden]{display:none}.mbgm-credits h4{margin:0 0 8px;font-size:14px;color:#12294A}.mbgm-credits ol{margin:0;padding-left:18px}.mbgm-credits li{margin:0 0 6px}.mbgm-credits li.now{font-weight:800;color:#12294A}.mbgm-credits a{color:#2a6fb8}.mbgm-credits p{margin:8px 0 0;color:#6B7A90;font-size:11.5px}'
   + '@media (max-width:600px){.mbgm{right:12px;gap:8px;padding:6px 8px 6px 6px;max-width:calc(100vw - 24px)}.mbgm-play{width:40px;height:40px}.mbgm-play svg{width:19px;height:19px}.mbgm-next,.mbgm-info-btn{width:30px;height:30px}.mbgm-title{font-size:12.5px}.mbgm-label{font-size:10.5px}.mbgm-credits{right:12px;width:calc(100vw - 24px)}.mbgm.wait .mbgm-label::after{content:" · 화면을 눌러 주세요"}}'
   + '@media (prefers-reduced-motion:reduce){.mbgm{transition:none}.mbgm.on .mbgm-play{animation:none}}';
  document.head.appendChild(css);
  var box = document.createElement('div'); box.className = 'mbgm'; box.setAttribute('role','region'); box.setAttribute('aria-label','아침책방 음악');
  box.innerHTML = '<button type="button" class="mbgm-play" aria-label="아침 음악 켜기"><svg class="ic-play" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg><svg class="ic-pause" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg></button>'
    + '<div class="mbgm-info"><span class="mbgm-label"></span><b class="mbgm-title"></b></div>'
    + '<button type="button" class="mbgm-next" aria-label="다음 곡"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 6l9 6-9 6zM16 6h2v12h-2z"/></svg></button>'
    + '<button type="button" class="mbgm-info-btn" aria-label="곡 정보" aria-expanded="false">i</button>';
  var cr = document.createElement('div'); cr.className = 'mbgm-credits'; cr.hidden = true;
  cr.innerHTML = '<h4>아침책방 음악 · 곡 정보</h4><ol>' + T.map(function(x,k){ return '<li data-k="'+k+'">['+x.k+'] '+x.c+'<br><small>'+x.e+' · 피아노: '+x.p+' · <a href="'+x.u+'" target="_blank" rel="noopener">Pixabay</a></small></li>'; }).join('') + '</ol><p>모두 Pixabay 콘텐츠 라이선스의 무료 음원입니다(찬송가 곡조는 저작권 보호기간이 끝난 곡). 사이트용으로 음량을 맞추고 긴 곡은 앞부분 6분만 사용했습니다.</p>';
  var btn = box.querySelector('.mbgm-play'), nxt = box.querySelector('.mbgm-next'), inf = box.querySelector('.mbgm-info-btn'), lbl = box.querySelector('.mbgm-label'), ttl = box.querySelector('.mbgm-title');
  function load(){ audio.src = T[i].f; lbl.textContent = (i === today ? '오늘의 아침 음악' : '아침책방 음악'); ttl.textContent = (i+1) + '/' + T.length + ' · ' + T[i].c; ttl.title = T[i].c + ' (' + T[i].e + ')'; [].forEach.call(cr.querySelectorAll('li'), function(li){ li.classList.toggle('now', +li.dataset.k === i); }); }
  function setOn(on){ box.classList.toggle('on', on); btn.setAttribute('aria-label', on ? '아침 음악 끄기' : '아침 음악 켜기'); }
  function onGesture(e){ if (!waiting || (e && e.target && box.contains(e.target))) return; waiting = false; box.classList.remove('wait'); if (inView && !userPaused && audio.paused) play(); }
  function play(){ var p = audio.play(); setOn(true); if (p && p.catch) p.catch(function(){ setOn(false); if (!waiting) { waiting = true; box.classList.add('wait'); } }); }
  function stop(){ if (!audio.paused) audio.pause(); setOn(false); }
  ['pointerdown','keydown','touchend'].forEach(function(ev){ document.addEventListener(ev, onGesture, true); });
  btn.addEventListener('click', function(e){ e.stopPropagation(); waiting = false; box.classList.remove('wait'); if (audio.paused) { userPaused = false; play(); } else { userPaused = true; stop(); } });
  nxt.addEventListener('click', function(e){ e.stopPropagation(); userPaused = false; waiting = false; box.classList.remove('wait'); i = (i + 1) % T.length; load(); play(); });
  inf.addEventListener('click', function(e){ e.stopPropagation(); cr.hidden = !cr.hidden; inf.setAttribute('aria-expanded', String(!cr.hidden)); place(); });
  audio.addEventListener('ended', function(){ i = (i + 1) % T.length; load(); if (inView && !userPaused) play(); });
  audio.addEventListener('error', function(){ if (box.classList.contains('on')) { i = (i + 1) % T.length; load(); play(); } });
  function enter(){ if (inView) return; inView = true; box.classList.add('show'); place(); if (!userPaused && !videoPaused) play(); }
  function leave(){ if (!inView) return; inView = false; box.classList.remove('show'); cr.hidden = true; inf.setAttribute('aria-expanded','false'); stop(); waiting = false; box.classList.remove('wait'); }
  // '아침책방' 메뉴(상단·하단)를 누르면 그 클릭으로 바로 재생 시작
  document.addEventListener('click', function(e){ var a = e.target.closest && e.target.closest('a[href*="#morning-books"],a[href^="/book-"],a.nav-book,a.dock-book'); if (!a) return; userPaused = false; if (sec) { var p = audio.play(); if (p && p.then) p.then(function(){ setOn(true); }).catch(function(){}); } }, true);
  // 영상(1분 영상 등)이 재생되면 음악은 잠시 멈추고, 영상이 멈추면 다시 이어서
  document.addEventListener('play', function(e){ if (e.target && e.target.tagName === 'VIDEO' && !audio.paused) { videoPaused = true; stop(); } }, true);
  ['pause','ended'].forEach(function(ev){ document.addEventListener(ev, function(e){ if (e.target && e.target.tagName === 'VIDEO' && videoPaused) { videoPaused = false; if (inView && !userPaused) play(); } }, true); });
  function place(){ var d = document.querySelector('nav.dock'), b = 16; if (d && getComputedStyle(d).display !== 'none') { var r = d.getBoundingClientRect(); b = Math.max(16, window.innerHeight - r.top + 12); } box.style.bottom = b + 'px'; cr.style.bottom = (b + box.offsetHeight + 10) + 'px'; }
  load(); document.body.appendChild(box); document.body.appendChild(cr); place();
  window.addEventListener('resize', place); setTimeout(place, 600);
  if (isBook) { inView = false; enter(); }
  else if ('IntersectionObserver' in window) {
    new IntersectionObserver(function(es){ es.forEach(function(en){ if (en.isIntersecting && en.intersectionRatio > 0.12) enter(); else if (!en.isIntersecting || en.intersectionRatio < 0.02) leave(); }); }, { threshold: [0, 0.02, 0.12, 0.3] }).observe(sec);
  } else { box.classList.add('show'); inView = true; }
  // 아침책방 칸에 들어갈 때 쓰는 함수(다른 스크립트에서 호출 가능)
  window.JBMorningMusic = { play: function(){ userPaused = false; play(); }, stop: stop };
})();
