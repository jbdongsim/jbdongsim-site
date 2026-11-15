(() => {
const AREAS = [
  ['사회정서','images/area-01.png'],['영어','images/area-02.png'],['독서','images/area-03.png'],['과학','images/area-04.png'],['미술','images/area-05.png'],['영아반','images/area-06.png'],
  ['코딩','images/area-07.png'],['누리과정','images/area-08.png'],['생태','images/area-09.png'],['디지털·AI','images/area-10.png'],['PBL','images/area-11.png'],['한글·수','images/area-12.png']
];
const PROGRAMS = [
  {area:'사회정서', name:'셀업키즈 (SEL UP)', vendor:'신한에듀', target:'만 3~5세', ages:['유아'], points:['K-SEL 5대 역량 중심 사회정서학습','SEL 그림책, 게임, 마음 일기장','매일 아침 클래스 타임 카드']},
  {area:'사회정서', name:'아이마이미', vendor:'신한에듀', target:'1~4세', ages:['영아','유아'], points:['감정과 관계를 다루는 그림책','명화, 뮤지컬 명작','이음 놀이 교구와 안전교육']},
  {area:'영어', name:'윙스 (WINGS)', vendor:'비상교육', target:'유아 · Level 1~3', ages:['유아'], points:['참여형 하이브리드 영어','스토리 중심 커리큘럼','가정 연계']},
  {area:'독서', name:'책보플러스', target:'유아', ages:['유아'], points:['매월 그림책 2권과 문해 놀이책','말잼 키트','교실용 빅북 패키지']},
  {area:'독서', name:'이야기모자', vendor:'키즈엠', target:'만 2~5세', ages:['영아','유아'], points:['수상작 그림책 큐레이션','감각, 상상, 생각, 표현으로 이어지는 독서 놀이','안전, 전래, 역사, 직업 주제']},
  {area:'독서', name:'세힘', vendor:'비상교육', target:'영아 ~ 유아', ages:['영아','유아'], points:['책놀이로 기르는 몰입, 상상, 표현']},
  {area:'과학', name:'도대체과학연구소', vendor:'키즈엠', target:'유아 · STEP 1~3', ages:['유아'], points:['재료를 바꿔 보는 변인 실험','디지털 실험실 병행','매월 사이언스 데이 행사']},
  {area:'미술', name:'꼬모아르떼', vendor:'비상교육', target:'유아', ages:['유아'], points:['유아 미술 프로그램']},
  {area:'영아반', name:'오플레이', vendor:'신한에듀', target:'만 1~2세', ages:['영아'], points:['오감 놀이 교구','말놀이 그림책과 자연친구책','안전화보']},
  {area:'영아반', name:'플레이콩', vendor:'키즈엠', target:'만 1~2세', ages:['영아'], points:['매월 놀이 그림책 3종과 실사책','플라스틱 없는 놀잇감','기본생활, 안전 카드']},
  {area:'영아반', name:'하임슐레', vendor:'비상교육', target:'영아', ages:['영아'], points:['월령별 발달과업 교구']},
  {area:'코딩', name:'챗키드로', target:'유아 · STEP 1~3', ages:['유아'], points:['코딩 로봇, 드론, 블록','1인 1교구, 수료 후 가정 지급','가정용 앱']},
  {area:'누리과정', name:'누리과정 플러스', vendor:'비상교육', target:'3~5세', ages:['유아'], points:['누리과정 36개 주제','실물 재료와 EBS 누리샘 교수자료','가정 연계']},
  {area:'생태', name:'초록별 도보미', vendor:'나은교육', target:'0~4 STEP', ages:['영아','유아'], points:['탄소중립 자연놀이','워크북, 체험 키트, 디지털 콘텐츠','가정 연계 QR']},
  {area:'디지털·AI', name:'테비박스', vendor:'에듀앤플레이', target:'유아 기관', ages:['유아'], points:['놀이 중심 통합 디지털 플랫폼','매월 콘텐츠 업데이트']},
  {area:'디지털·AI', name:'젤리아이', vendor:'키즈엠', target:'유아', ages:['유아'], points:['AI 교구 플랫폼','한글, 수학 어드벤처와 연동']},
  {area:'PBL', name:'나은PBL', target:'유아', ages:['유아'], points:['6주 단위 프로젝트 수업','전시와 부모참관 수업으로 마무리']},
  {area:'한글·수', name:'한글어드벤처', vendor:'키즈엠', target:'만 3~5세', ages:['유아'], points:['자모 캐릭터 스토리','매일 10분 콘텐츠','소리 중심 커리큘럼']},
  {area:'한글·수', name:'수학어드벤쳐', vendor:'키즈엠', target:'유아', ages:['유아'], points:['AI 교구','실생활, 코딩, 경제를 얹은 토핑 수학','초등 교육과정 연계']}
];
const TEL = '01037522699', KAKAO = 'https://pf.kakao.com/_wYFNX';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const page = document.body.dataset.page || 'home';
const icon = a => AREAS.find(x => x[0] === a)[1];
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const q = new URLSearchParams(location.search);

// 메뉴 표시
$$('[data-p]').forEach(a => a.classList.toggle('on', a.dataset.p === page || a.dataset.p2 === page));
$$('[data-n="areas"]').forEach(e => e.textContent = AREAS.length);
$$('[data-n="programs"]').forEach(e => e.textContent = PROGRAMS.length);

// 메인: 영역 타일, 프로그램 이름 띠
const tiles = $('#areaTiles');
if (tiles) tiles.innerHTML = AREAS.map(([n, img]) => `<a class="atile" href="programs.html?area=${encodeURIComponent(n)}"><img src="${img}" alt="" loading="lazy"><b>${n}</b><span>${PROGRAMS.filter(p => p.area === n).length}개 프로그램</span></a>`).join('');
const tk = $('#ticker');
if (tk) { const h = PROGRAMS.map(p => `<span><img src="${icon(p.area)}" alt="">${esc(p.name)}</span>`).join(''); tk.innerHTML = h + h; }

// 프로그램 페이지
const cards = $('#cards');
if (cards) {
  let age = 'all', area = AREAS.some(a => a[0] === q.get('area')) ? q.get('area') : 'all';
  const areaBtns = $('#areaBtns');
  areaBtns.innerHTML = AREAS.map(([n, img]) => `<button type="button" data-area="${n}"><img src="${img}" alt="">${n}</button>`).join('');
  const render = () => {
    const list = PROGRAMS.filter(p => (age === 'all' || p.ages.includes(age)) && (area === 'all' || p.area === area));
    $('#count').innerHTML = `<b>${list.length}</b>개 프로그램` + (area !== 'all' ? ` · ${area} <a href="#" id="clr" style="text-decoration:underline; margin-left:6px">영역 전체 보기</a>` : '');
    cards.innerHTML = list.map(p => `
      <article class="pcard">
        <div class="hd"><img src="${icon(p.area)}" alt=""><div><span class="chip">${p.area}</span><h3>${esc(p.name)}</h3></div></div>
        <div class="meta"><span class="chip age">${esc(p.target)}</span>${p.vendor ? `<span class="chip ven">${esc(p.vendor)}</span>` : ''}</div>
        <ul>${p.points.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
        <div class="ft"><a href="contact.html?area=${encodeURIComponent(p.area)}&program=${encodeURIComponent(p.name)}">자료 요청</a></div>
      </article>`).join('') || '<p style="color:var(--muted)">해당하는 프로그램이 없습니다.</p>';
    $$('#ageSeg button').forEach(b => b.classList.toggle('on', b.dataset.age === age));
    $$('button', areaBtns).forEach(b => b.classList.toggle('on', b.dataset.area === area));
  };
  $('#ageSeg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { age = b.dataset.age; render(); } });
  areaBtns.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { area = area === b.dataset.area ? 'all' : b.dataset.area; render(); } });
  document.addEventListener('click', e => { if (e.target.id === 'clr') { e.preventDefault(); area = 'all'; render(); } });
  render();
}

// 상담 신청서
const form = $('#form');
if (form) {
  const extra = ['교육행사', '원 운영 지원', '부모교육'];
  $('#checks').innerHTML = AREAS.map(a => a[0]).concat(extra).map(n => `<label><input type="checkbox" name="area" value="${n}">${n}</label>`).join('');
  const pre = q.get('area'); if (pre) { const c = $$('#checks input').find(i => i.value === pre); if (c) c.checked = true; }
  if (q.get('program')) form.msg.value = q.get('program') + ' 자료를 받아 보고 싶습니다.';
  let text = '';
  form.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(form), err = $('#err');
    if (!String(f.get('name')).trim() || !String(f.get('tel')).trim()) { err.style.display = 'block'; err.textContent = '성함과 연락처를 적어 주세요.'; return; }
    err.style.display = 'none';
    text = ['[중부산동심 상담 신청]', '구분: ' + f.get('who'), '원 유형: ' + f.get('type'), '원 이름: ' + (f.get('org') || '-'), '성함: ' + f.get('name'), '연락처: ' + f.get('tel'), '관심 영역: ' + (f.getAll('area').join(', ') || '-'), '문의: ' + (f.get('msg') || '-')].join('\n');
    $('#outText').textContent = text;
    $('#smsBtn').href = 'sms:' + TEL + '?&body=' + encodeURIComponent(text);
    const r = $('#result'); r.hidden = false; r.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  const copy = async () => { try { await navigator.clipboard.writeText(text); $('#copied').textContent = '내용을 복사했습니다. 붙여넣기 하시면 됩니다.'; } catch (e) { $('#copied').textContent = '복사가 막혀 있습니다. 위 내용을 길게 눌러 복사해 주세요.'; } };
  $('#copyBtn').addEventListener('click', copy);
  $('#kakaoBtn').addEventListener('click', copy);
}

// 등장 효과
const rvSel = '.stat,.menu a,.atile,.bcard,.pcard,.box,.card,.split > *,.proc div,.learn > div,.faq details,.steps3 > div,.quote,.info,.contact,.help,.flow,.panel > h2,.notice .box';
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
  const mark = () => $$(rvSel).forEach((el, i) => { if (el.classList.contains('rv')) return; el.classList.add('rv'); el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });
  mark();
  if (cards) new MutationObserver(mark).observe(cards, { childList: true });
}

// 스크롤 진행 표시
const prog = $('#progress');
if (prog) addEventListener('scroll', () => { const h = document.documentElement; prog.style.width = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) * 100) + '%'; }, { passive: true });
})();
