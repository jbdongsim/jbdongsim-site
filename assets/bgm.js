/* 원장님이 읽는 아침책방 · 아침 클래식 음악 미니창
   위키미디어 공용(Wikimedia Commons)의 공개 음원 10곡. 방문자가 ▶를 눌러야 재생됩니다.
   오늘의 곡 = 오늘까지 공개된 아침책방 권수 기준으로 하루에 한 곡씩 바뀝니다(책 No.N의 1분 영상 배경음악과 같은 곡). */
(function(){
  if (window.__mbgm) return; window.__mbgm = true;
  var T = [{"c":"그리그","t":"「아침의 기분」 (페르 귄트 모음곡)","p":"Musopen Symphony Orchestra","l":"퍼블릭 도메인","f":"/assets/audio/morning-01.m4a"},{"c":"비발디","t":"「사계」 중 봄 1악장","p":"John Harrison (바이올린)","l":"CC BY-SA 4.0","f":"/assets/audio/morning-02.m4a"},{"c":"모차르트","t":"「아이네 클라이네 나흐트무지크」 1악장","p":"위키미디어 공용 녹음 (Qoo)","l":"CC BY-SA 2.5","f":"/assets/audio/morning-03.m4a"},{"c":"바흐","t":"「브란덴부르크 협주곡 3번」 1악장","p":"Al Goldstein collection (Pandora Music)","l":"CC BY-SA 2.0","f":"/assets/audio/morning-04.m4a"},{"c":"베토벤","t":"「전원 교향곡」 1악장","p":"Musopen","l":"퍼블릭 도메인","f":"/assets/audio/morning-05.m4a"},{"c":"헨델","t":"「시바 여왕의 도착」","p":"Al Goldstein collection (Pandora Music)","l":"CC BY-SA 2.0","u":"https://commons.wikimedia.org/wiki/File%3AHandel_-_Arrival_of_the_Queen_of_Sheba.ogg","f":"/assets/audio/morning-06.m4a"},{"c":"바흐","t":"「평균율 클라비어곡집」 프렐류드 C장조","p":"Kimiko Ishizaka (피아노)","l":"CC0","u":"https://commons.wikimedia.org/wiki/File%3AKimiko_Ishizaka_-_Bach_-_Well-Tempered_Clavier%2C_Book_1_-_01_Prelude_No._1_in_C_major%2C_BWV_846.ogg","f":"/assets/audio/morning-07.m4a"},{"c":"모차르트","t":"「피아노 소나타 16번」 1악장","p":"Musopen","l":"퍼블릭 도메인","u":"https://commons.wikimedia.org/wiki/File%3AWolfgang_Amadeus_Mozart_-_sonata_no._16_in_c_major%2C_k.545_'sonata_facile'_-_i._allegro.ogg","f":"/assets/audio/morning-08.m4a"},{"c":"헨델","t":"「수상음악」 혼파이프","p":"United States Marine Band","l":"퍼블릭 도메인","u":"https://commons.wikimedia.org/wiki/File%3AHandel's_Water_Music_-_12._Alla_hornpipe_-_Chamber_Orchestra_-_United_States_Marine_Band.opus","f":"/assets/audio/morning-09.m4a"},{"c":"하이든","t":"「트럼펫 협주곡」 3악장","p":"Real Filharmonía de Galicia","l":"CC BY 3.0","u":"https://commons.wikimedia.org/wiki/File%3AReal_Filharmon%C3%ADa_de_Galicia_-_Haydn's_Trumpet_Concerto_in_E-flat_major%2C_Hob.VIIe-1_-_III._Finale_allegro.ogg","f":"/assets/audio/morning-10.m4a"}];
  function todayIdx(){
    try {
      var B = window.MORNING_BOOKS || [], now = new Date(), n = 0;
      B.forEach(function(b){ var d = new Date((b.date||'') + 'T' + (b.time||'07:00') + ':00+09:00'); if (d <= now) n++; });
      if (n > 0) return (n - 1) % T.length;
    } catch(e) {}
    var k = new Date(Date.now() + 9*3600e3); return Math.floor(k.getTime()/864e5) % T.length;
  }
  var i = todayIdx(), today = i, audio = new Audio(); audio.preload = 'none'; audio.volume = 0.35;
  var css = document.createElement('style');
  css.textContent = '.mbgm{position:fixed;right:16px;bottom:120px;z-index:70;display:flex;align-items:center;gap:10px;max-width:min(330px,calc(100vw - 32px));padding:8px 10px 8px 8px;border-radius:999px;background:rgba(255,255,255,.96);border:1px solid #F1E3C8;box-shadow:0 10px 28px rgba(18,41,74,.18);font-family:inherit;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}'
   + '.mbgm button{border:0;cursor:pointer;font:inherit}'
   + '.mbgm-play{flex:none;width:46px;height:46px;border-radius:50%;background:#F5B841;color:#12294A;display:grid;place-items:center;box-shadow:0 4px 12px rgba(245,184,65,.45)}'
   + '.mbgm-play svg{width:22px;height:22px}.mbgm .ic-pause{display:none}.mbgm.on .ic-play{display:none}.mbgm.on .ic-pause{display:block}'
   + '.mbgm-info{min-width:0;display:flex;flex-direction:column;line-height:1.25}'
   + '.mbgm-label{font-size:11.5px;font-weight:700;color:#8A6A1F;white-space:nowrap}.mbgm-title{font-size:13.5px;font-weight:800;color:#12294A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
   + '.mbgm-next,.mbgm-info-btn{flex:none;width:34px;height:34px;border-radius:50%;background:#F4F6FA;color:#12294A;display:grid;place-items:center}.mbgm-next svg{width:16px;height:16px}.mbgm-info-btn{font-weight:800;font-size:14px}'
   + '.mbgm.on .mbgm-play{animation:mbgmPulse 2.4s ease-in-out infinite}@keyframes mbgmPulse{50%{box-shadow:0 4px 18px rgba(245,184,65,.85)}}'
   + '.mbgm-credits{position:fixed;right:16px;z-index:71;width:min(360px,calc(100vw - 32px));max-height:60vh;overflow:auto;padding:16px 16px 12px;border-radius:18px;background:#fff;border:1px solid #E3E8F0;box-shadow:0 18px 40px rgba(18,41,74,.22);font-size:12.5px;color:#36475F;line-height:1.5}'
   + '.mbgm-credits[hidden]{display:none}.mbgm-credits h4{margin:0 0 8px;font-size:14px;color:#12294A}.mbgm-credits ol{margin:0;padding-left:18px}.mbgm-credits li{margin:0 0 6px}.mbgm-credits li.now{font-weight:800;color:#12294A}.mbgm-credits a{color:#2a6fb8}.mbgm-credits p{margin:8px 0 0;color:#6B7A90;font-size:11.5px}'
   + '@media (max-width:600px){.mbgm{right:12px;gap:8px;padding:6px 8px 6px 6px;max-width:calc(100vw - 24px)}.mbgm-play{width:40px;height:40px}.mbgm-play svg{width:19px;height:19px}.mbgm-next,.mbgm-info-btn{width:30px;height:30px}.mbgm-title{font-size:12.5px}.mbgm-label{font-size:10.5px}.mbgm-credits{right:12px;width:calc(100vw - 24px)}}' + '@media (prefers-reduced-motion:reduce){.mbgm.on .mbgm-play{animation:none}}';
  document.head.appendChild(css);
  var box = document.createElement('div'); box.className = 'mbgm'; box.setAttribute('role','region'); box.setAttribute('aria-label','아침책방 음악');
  box.innerHTML = '<button type="button" class="mbgm-play" aria-label="아침 음악 켜기"><svg class="ic-play" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg><svg class="ic-pause" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg></button>'
    + '<div class="mbgm-info"><span class="mbgm-label"></span><b class="mbgm-title"></b></div>'
    + '<button type="button" class="mbgm-next" aria-label="다음 곡"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 6l9 6-9 6zM16 6h2v12h-2z"/></svg></button>'
    + '<button type="button" class="mbgm-info-btn" aria-label="곡 정보" aria-expanded="false">i</button>';
  var cr = document.createElement('div'); cr.className = 'mbgm-credits'; cr.hidden = true;
  cr.innerHTML = '<h4>아침책방 음악 · 곡 정보</h4><ol>' + T.map(function(x,k){ return '<li data-k="'+k+'">'+x.c+' '+x.t+'<br><small>연주: '+x.p+' · '+x.l+' · <a href="'+x.u+'" target="_blank" rel="noopener">출처</a></small></li>'; }).join('') + '</ol><p>모두 위키미디어 공용(Wikimedia Commons)의 공개 음원입니다. 사이트용으로 음량을 맞추고 일부 곡은 앞부분 6분만 사용했습니다(편집본은 원 라이선스를 따릅니다).</p>';
  var btn = box.querySelector('.mbgm-play'), nxt = box.querySelector('.mbgm-next'), inf = box.querySelector('.mbgm-info-btn'), lbl = box.querySelector('.mbgm-label'), ttl = box.querySelector('.mbgm-title');
  function load(){ audio.src = T[i].f; lbl.textContent = (i === today ? '오늘의 아침 음악' : '아침책방 음악'); ttl.textContent = (i+1) + '/' + T.length + ' · ' + T[i].c + ' ' + T[i].t; ttl.title = ttl.textContent; [].forEach.call(cr.querySelectorAll('li'), function(li){ li.classList.toggle('now', +li.dataset.k === i); }); }
  function setOn(on){ box.classList.toggle('on', on); btn.setAttribute('aria-label', on ? '아침 음악 끄기' : '아침 음악 켜기'); }
  function play(){ var p = audio.play(); if (p && p.catch) p.catch(function(){ setOn(false); }); setOn(true); }
  btn.addEventListener('click', function(){ if (audio.paused) play(); else { audio.pause(); setOn(false); } });
  nxt.addEventListener('click', function(){ i = (i + 1) % T.length; load(); play(); });
  inf.addEventListener('click', function(){ cr.hidden = !cr.hidden; inf.setAttribute('aria-expanded', String(!cr.hidden)); place(); });
  audio.addEventListener('ended', function(){ i = (i + 1) % T.length; load(); play(); });
  audio.addEventListener('error', function(){ if (box.classList.contains('on')) { i = (i + 1) % T.length; load(); play(); } });
  // 영상(1분 영상 등)이 재생되면 음악은 잠시 멈춤
  document.addEventListener('play', function(e){ if (e.target && e.target.tagName === 'VIDEO' && !audio.paused) { audio.pause(); setOn(false); } }, true);
  function place(){ var d = document.querySelector('nav.dock'), b = 16; if (d && getComputedStyle(d).display !== 'none') { var r = d.getBoundingClientRect(); b = Math.max(16, window.innerHeight - r.top + 12); } box.style.bottom = b + 'px'; cr.style.bottom = (b + box.offsetHeight + 10) + 'px'; }
  load(); document.body.appendChild(box); document.body.appendChild(cr); place();
  window.addEventListener('resize', place); setTimeout(place, 600);
})();
