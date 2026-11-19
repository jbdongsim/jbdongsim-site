(() => {
const AREAS = [
  ['사회정서','images/area-01.png'],['영어','images/area-02.png'],['독서','images/area-03.png'],['과학','images/area-04.png'],['미술','images/area-05.png'],['영아반','images/area-06.png'],
  ['코딩','images/area-07.png'],['누리과정','images/area-08.png'],['생태','images/area-09.png'],['디지털·AI','images/area-10.png'],['PBL','images/area-11.png'],['한글·수','images/area-12.png']
];
const PROGRAMS = [
  {area:'사회정서', name:'셀업키즈 (SEL UP)', vendor:'신한에듀', target:'만 3~5세', ages:['유아'], points:['K-SEL 5대 역량 중심 사회정서학습','SEL 그림책, 게임, 마음 일기장','매일 아침 클래스 타임 카드']},
  {area:'사회정서', name:'아이마이미', vendor:'신한에듀', target:'1~4세', ages:['영아','유아'], points:['감정과 관계를 다루는 그림책','명화, 뮤지컬 명작','이음 놀이 교구와 안전교육']},
  {area:'영어', name:'윙스 (WINGS)', vendor:'비상교육', target:'유아 · Level 1~3', ages:['유아'], points:['참여형 하이브리드 영어','스토리 중심 커리큘럼','가정 연계']},
  {area:'독서', name:'책보플러스', vendor:'키즈엠', target:'만 2~5세', ages:['영아','유아'], intro:'그림책 한 권을 읽고, 말하고, 만들며 문해 놀이로 깊이 만납니다.', points:['매월 그림책 2권·문해 놀이책·말잼 키트 구성','표지·그림·어휘를 살피는 단계별 읽기','말잼 챈트·카드로 어휘를 말하고 연결','흥미 → 이해 → 표현 → 확장으로 이어지는 수업','연령별 연간 구성과 교실용 놀이 자료'], detail:['수업 예시: 빅북의 표지와 장면을 관찰하고 이야기 나누기 → 주요 어휘를 챈트·카드로 표현 → 키트로 이야기를 다시 만들어 보기.','브로슈어에는 독서 기록장·포스터와 교실용 지원 자료가 소개됩니다. 빅북 등 선택 구성과 2027 제공 범위는 상담 시 확인합니다.']},
  {area:'독서', name:'이야기모자', vendor:'키즈엠', target:'만 2~5세', ages:['영아','유아'], intro:'아이가 책 속 주인공이 되어 이야기를 몸과 말로 경험하는 독서 프로그램입니다.', points:['만 2세 감각 → 3세 상상 → 4세 생각 → 5세 표현 독서','주 1회 표지 예측·마음 읽기·문해·몸·퀴즈 놀이','월 수업 그림책 3권, 만 2세는 2권 안내','매일 독서 E-Book 17권과 가정 연계','안전·전래·사회정서·역사·직업 등 연령별 주제'], detail:['만 2세는 보고 듣고 따라 하기, 만 3세는 역할 흉내, 만 4세는 다음 장면과 마음 예상, 만 5세는 이유와 다른 관점을 말하는 방식으로 확장합니다.','2027 소개자료에는 월별 스토리 퍼포밍 클래스와 독서 행사도 안내됩니다. 실제 제공 범위는 계약·일정에 따라 확인합니다.']},
  {area:'독서', name:'세힘', vendor:'비상교육', target:'영아 ~ 유아', ages:['영아','유아'], intro:'그림책을 읽은 뒤 손과 몸으로 이야기의 장면을 다시 만나는 책놀이입니다.', points:['그림책 장면을 관찰하고 이야기 나누기','스티커 붙이기·그리기 등 참여형 책놀이','인물과 상황을 상상하고 자기 말로 표현','책 읽기를 놀이·체험 활동으로 연결'], detail:['보유 중인 세힘 소개자료는 2025년판입니다. 위 활동 예시는 해당 자료를 바탕으로 요약했으며, 2027 연령별 구성·교구·제공 방식은 최신 자료 확인 후 안내합니다.']},
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
const MEDIA = {"셀업키즈 (SEL UP)":[["2027 카탈로그","1hXRvcCWgInTzqo6lfmiLSWs2e5r8w2u2"],["노래 영상","1W70y34-LYfWkhrrmWknHCSMPvwdKLkAk"]],"아이마이미":[["2027 연간자료 (3세)","1xeRFpemiG29XikuvgO0UuaZSUuHDwe8E"],["2027 연간자료 (4세)","1wWd57UqiOJ92HWl4qovXPG9RAxVVUROT"],["2027 OT 영상","1yKrbuB5ahIYyR70cfhwKnwcOkFiEjGkW"]],"윙스 (WINGS)":[["프로그램 소개 PPT","1iIsbwEZQkTBdsjzhFj37SAABiQzvcfZM"]],"책보플러스":[["홍보 영상","14CKdMKeZrxcObhxNR1yXD6NchxzwEWtP"],["브로슈어","142iXQBRMzmh-7owcrnBnmCcujZHl4giI"]],"이야기모자":[["소개 영상","1nFhKPhQ_0LZJoRHkcmu8uzU2meaFyNS5"],["2027 브로슈어","1y4uzbKqeWPaGcmExLTJfnorpTe9IMq1K"]],"세힘":[["소개 영상 (2024)","1kvmkDCcIF0t2RpRHG6UT27o6_thSwRGl"]],"도대체과학연구소":[["홍보 영상","1D4G4n0JJqwGjjQfSEJFJ9DNBNH4mHSS_"],["2027 브로슈어","1vkwMwXlSdoD9yaG4nj61YX3eQ1RColBq"]],"꼬모아르떼":[["소개 영상 (2024)","1_u92yQ04GiS7KqNec_lQcIVUb4tYzldW"],["소개 PPT (2026)","1m6p223rKuYlKX92wlwmarqPnTRWTA9dW"]],"오플레이":[["OT 영상","1JDRnYPeQwQ4WDl_2CVYr-2bZksgkUpAn"],["2027 연간자료","1uxqsb6_97F9AR59uiyBJSvpAQwDM90wu"]],"플레이콩":[["홍보 영상","1tIAM_QNOOy0RDfaj9Rm8XCTENwMBrI1E"],["2027 브로슈어","19VSdanfZvHMm6_WX3nBqx73jiNAK_9sr"]],"하임슐레":[["소개 영상 (2024)","1VTLdNsm4U2ADLxZ9I9KrP1utC0BA4UzM"]],"챗키드로":[["코딩 소개 이미지 (2026)","1XypZujwrFrRw-tObb1Pf1b0kYi1n1khB"]],"누리과정 플러스":[["프로그램 소개 PPT","1zq3Vy-IJxe_rX3XBLLRz93rLRoFO9rYw"]],"초록별 도보미":[["소개 영상","1mv3PEy4WVbygCo4X65fKna-wup6x43so"],["2027 브로슈어","1Y4DSsnFDRJL0GS5srMmy4eVecJ2DHEtF"]],"테비박스":[["OT 자료 PDF (2026)","1dEEv7F7CmZj4fhAXonlsLtEbpt3Ixg4J"]],"젤리아이":[["홍보 영상","1b63sidHp5GnuR0Tq-HiPSqMLg-3WNNCz"]],"나은PBL":[["연간교육계획안 (2026)","1uRL6BWOq9VlD7RiGYfe0rqLlKEylKxxq"]],"한글어드벤처":[["홍보 영상","1N4j6H6-DCcsXg42_Cy3xqw4EBDCpq4Cq"],["2027 브로슈어","1_0PZsO7MlDk9ztIQiJJpASM5NhaYDF8_"]],"수학어드벤쳐":[["2027 브로슈어","1u06P5pqwK0QqE9sjlhvPhAgyaBwUTvMB"]]};
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
if (tiles) {
  tiles.innerHTML = AREAS.map(([n, img]) => `<a class="atile" href="programs.html?area=${encodeURIComponent(n)}" data-area="${n}" aria-haspopup="dialog" aria-label="${n} 프로그램 자료 미리보기"><img src="${img}" alt="" loading="lazy"><b>${n}</b><span>${PROGRAMS.filter(p => p.area === n).length}개 프로그램 · 자료 보기</span></a>`).join('');
  const areaGuide = document.createElement('dialog');
  areaGuide.className = 'area-guide';
  areaGuide.setAttribute('aria-labelledby', 'area-guide-title');
  areaGuide.innerHTML = '<div class="area-guide-head"><span>2027 교육 프로그램 자료 미리보기</span><button type="button" class="area-guide-close" aria-label="팝업 닫기">×</button></div><div class="area-guide-body"></div>';
  document.body.append(areaGuide);
  const openAreaGuide = n => {
    const list = PROGRAMS.filter(p => p.area === n);
    areaGuide.querySelector('.area-guide-body').innerHTML = `
      <div class="area-guide-title"><img src="${icon(n)}" alt=""><div><small>중부산동심 자체 요약 자료</small><h2 id="area-guide-title">${esc(n)} 프로그램</h2><p>${list.length}개 프로그램을 한눈에 비교해 보세요.</p></div></div>
      <div class="area-guide-list">${list.map(p => `<article><div class="area-guide-meta"><span>${esc(p.target)}</span>${p.vendor ? `<span>${esc(p.vendor)}</span>` : ''}</div><h3>${esc(p.name)}</h3>${p.intro ? `<p>${esc(p.intro)}</p>` : ''}<ul>${p.points.map(t => `<li>${esc(t)}</li>`).join('')}</ul><div class="area-guide-media">${(MEDIA[p.name] || []).map(([label, id]) => `<button type="button" class="area-media-open" data-file-id="${id}" data-label="${esc(label)}">${esc(label)} 보기</button>`).join('')}</div><a href="contact.html?area=${encodeURIComponent(n)}&program=${encodeURIComponent(p.name)}">자료 접근 문의 →</a></article>`).join('')}</div>
      <section class="area-media-viewer" hidden aria-label="원본 자료 미리보기"></section>
      <p class="area-guide-note">프로그램 요약은 중부산동심이 작성했습니다. 원본 영상·자료는 Google Drive의 기존 접근 권한이 있는 계정에서만 보입니다. 보이지 않으면 접근 권한을 요청해 주세요. 연도가 표시된 구자료는 최신 구성과 다를 수 있습니다.</p>
      <a class="area-guide-all" href="programs.html?area=${encodeURIComponent(n)}">${esc(n)} 프로그램 페이지 전체 보기 →</a>`;
    areaGuide.showModal();
  };
  tiles.addEventListener('click', e => { const tile = e.target.closest('.atile'); if (!tile) return; e.preventDefault(); openAreaGuide(tile.dataset.area); });
  areaGuide.addEventListener('click', e => {
    const button = e.target.closest('.area-media-open'); if (!button) return;
    const id = button.dataset.fileId, label = button.dataset.label;
    const viewer = areaGuide.querySelector('.area-media-viewer');
    viewer.hidden = false;
    viewer.innerHTML = `<div class="area-media-head"><h3>${esc(label)}</h3><button type="button" class="area-media-hide" aria-label="자료 미리보기 닫기">×</button></div><iframe title="${esc(label)} 미리보기" src="https://drive.google.com/file/d/${id}/preview" loading="lazy" allow="autoplay; fullscreen"></iframe><p>접근 권한이 있는 Google 계정에서 보입니다. <a href="https://drive.google.com/file/d/${id}/view" target="_blank" rel="noopener noreferrer">새 창에서 열기</a></p>`;
    viewer.scrollIntoView({behavior:'smooth',block:'start'});
  });
  areaGuide.addEventListener('click', e => { if (e.target.closest('.area-media-hide')) { const viewer = areaGuide.querySelector('.area-media-viewer'); viewer.hidden = true; viewer.innerHTML = ''; } });
  areaGuide.querySelector('.area-guide-close').addEventListener('click', () => areaGuide.close());
  areaGuide.addEventListener('click', e => { if (e.target === areaGuide) areaGuide.close(); });
  // 첫 화면 인포그래픽의 그림 7곳과 영역 배지도 동일한 자료 팝업을 연다.
  const heroArt = $('.hero-art');
  if (heroArt) {
    const hotspots = [
      ['독서', '11%', '7%', '24%', '26%'], ['영어', '38%', '2%', '24%', '25%'],
      ['과학', '65%', '9%', '24%', '25%'], ['미술', '76%', '35%', '23%', '27%'],
      ['생태', '62%', '66%', '25%', '26%'], ['코딩', '14%', '65%', '25%', '26%'],
      ['사회정서', '1%', '34%', '24%', '27%']
    ];
    heroArt.insertAdjacentHTML('beforeend', hotspots.map(([n, left, top, width, height]) => `<a class="hero-hotspot" href="programs.html?area=${encodeURIComponent(n)}" data-area="${n}" aria-label="${n} 프로그램 자료 팝업 열기" aria-haspopup="dialog" style="left:${left};top:${top};width:${width};height:${height}"></a>`).join(''));
    $$('.pin-link', heroArt).forEach(a => { a.dataset.area = a.textContent.trim() === '코딩·AI' ? '코딩' : a.textContent.trim(); a.setAttribute('aria-haspopup', 'dialog'); a.setAttribute('aria-label', a.dataset.area + ' 프로그램 자료 팝업 열기'); });
    heroArt.addEventListener('click', e => { const hit = e.target.closest('.hero-hotspot,.pin-link'); if (!hit) return; e.preventDefault(); openAreaGuide(hit.dataset.area); });
  }
}
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
        <div class="meta"><span class="chip age">${esc(p.target)}</span>${p.vendor ? `<span class="chip ven">${esc(p.vendor)}</span>` : ''}${p.name === '셀업키즈 (SEL UP)' ? '<a class="guide-link" href="#selup-guide" aria-haspopup="dialog">자세히보기</a>' : ''}</div>
        ${p.intro ? `<p class="pintro">${esc(p.intro)}</p>` : ''}
        <ul>${p.points.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
        ${p.detail ? `<details class="pdetail"><summary>수업·구성 자세히</summary>${p.detail.map(t => `<p>${esc(t)}</p>`).join('')}</details>` : ''}
        <div class="ft"><a href="contact.html?area=${encodeURIComponent(p.area)}&program=${encodeURIComponent(p.name)}">자료 요청</a></div>
      </article>`).join('') || '<p style="color:var(--muted)">해당하는 프로그램이 없습니다.</p>';
    $$('#ageSeg button').forEach(b => b.classList.toggle('on', b.dataset.age === age));
    $$('button', areaBtns).forEach(b => b.classList.toggle('on', b.dataset.area === area));
  };
  $('#ageSeg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { age = b.dataset.age; render(); } });
  areaBtns.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { area = area === b.dataset.area ? 'all' : b.dataset.area; render(); } });
  document.addEventListener('click', e => { if (e.target.id === 'clr') { e.preventDefault(); area = 'all'; render(); } });
  const guide = document.createElement('dialog');
  guide.className = 'program-guide';
  guide.id = 'selup-guide';
  guide.setAttribute('aria-labelledby', 'selup-guide-title');
  guide.innerHTML = `<div class="guide-head"><span>2027 프로그램 안내</span><button type="button" class="guide-close" aria-label="닫기">×</button></div>
    <div class="guide-body"><span class="chip">사회정서 · 만 3~5세</span><h2 id="selup-guide-title">셀업키즈 (SEL UP)</h2><p class="guide-sub">2027 신한에듀 카탈로그와 프로그램 요약을 확인해 보세요.</p>
    <section class="guide-file" aria-label="2027 셀업 카탈로그"><h3>2027 셀업 카탈로그</h3><iframe title="2027 셀업 카탈로그 PDF" src="https://drive.google.com/file/d/1hXRvcCWgInTzqo6lfmiLSWs2e5r8w2u2/preview" loading="lazy" allow="fullscreen"></iframe><p>미리보기가 보이지 않으면 <a href="https://drive.google.com/file/d/1hXRvcCWgInTzqo6lfmiLSWs2e5r8w2u2/view" target="_blank" rel="noopener noreferrer">새 창에서 카탈로그 열기</a></p></section>
    <h3>아이의 마음에서 관계로</h3><p>감정을 알아차리고 표현하는 일에서 시작해 친구의 생각을 살피고, 함께 해결하며 스스로 선택하는 연습으로 이어집니다.</p>
    <div class="guide-steps"><div><b>1 · 나</b><span>내 감정과 행동 이해하기</span></div><div><b>2 · 우리</b><span>공감·소통·협력하기</span></div><div><b>3 · 성장</b><span>긍정적으로 생각하고 조절하기</span></div></div>
    <h3>교실에서의 활용</h3><ul><li>SEL 그림책과 놀이·게임으로 마음과 관계를 이야기합니다.</li><li>마음 일기장과 아침 클래스 타임 카드로 일상에 연결합니다.</li><li>활동 범위와 교구 구성은 2027학년도 최신 공급사 자료로 확인합니다.</li></ul>
    <p class="guide-note">위 프로그램 요약은 중부산동심이 작성했습니다. 카탈로그의 내용과 실제 공급 범위는 최신 안내를 확인해 주세요.</p>
    <a class="guide-contact" href="contact.html?area=%EC%82%AC%ED%9A%8C%EC%A0%95%EC%84%9C&program=%EC%85%80%EC%97%85%ED%82%A4%EC%A6%88%20(SEL%20UP)">상담·샘플 요청하기</a></div>`;
  document.body.append(guide);
  cards.addEventListener('click', e => { if (e.target.closest('.guide-link')) { e.preventDefault(); guide.showModal(); } });
  guide.querySelector('.guide-close').addEventListener('click', () => guide.close());
  guide.addEventListener('click', e => { if (e.target === guide) guide.close(); });
  render();
}

// 상담 신청서
const form = $('#form');
if (form) {
  const extra = ['원내행사', '부모교육행사', '원 운영 지원'];
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
