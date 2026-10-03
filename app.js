const $ = s => document.querySelector(s);
const PAGE = 24;
const state = {shown:PAGE, type:"all", reg:"all", q:"", onlySaved:false, saved:new Set()};
try { state.saved = new Set(JSON.parse(localStorage.getItem("slango.saved")||"[]")); } catch(e){}
const persist = () => { try { localStorage.setItem("slango.saved", JSON.stringify([...state.saved])); } catch(e){} };

/* ===== اللغة / Language ===== */
const T = {
  ar: {
    title:"Slango | تعلّم السلانج والإيديمز الحقيقية",
    navLib:"المكتبة", navQuiz:"اختبر نفسك", navSaved:"المحفوظات",
    langAria:"Switch to English",
    heroTitle:"تكلّم كما يتكلّم أهل اللغة",
    heroText:"عبارات حقيقية يستخدمها الأمريكيون والبريطانيون كل يوم، مع المعنى بالعربية ومثال جاهز للاستخدام.",
    start:"ابدأ التعلّم", hint:"اضغط على الفقاعة لعبارة جديدة",
    libTitle:"المكتبة", searchPh:"ابحث بالإنجليزية أو العربية…", searchAria:"بحث",
    typeAria:"النوع", regAria:"اللهجة", all:"الكل", allReg:"كل اللهجات",
    US:"أمريكي", UK:"بريطاني", ALL:"عام",
    empty:"لا نتائج. جرّب كلمة أخرى أو امسح الفلاتر.",
    quizTitle:"اختبر نفسك", next:"السؤال التالي",
    footer:"صُنع لمتعلمي الإنجليزية — Slango",
    listen:"استمع", listenAria:"استمع إلى", save:"احفظ", savedLbl:"محفوظة",
    count:n=>`${n} عبارة`, more:n=>`عرض المزيد (${n})`,
    score:(s,t)=>`النتيجة: ${s} / ${t}`, langBtn:"EN"
  },
  en: {
    title:"Slango | Learn real slang and idioms",
    navLib:"Library", navQuiz:"Quiz", navSaved:"Saved",
    langAria:"التبديل إلى العربية",
    heroTitle:"Speak the way native speakers do",
    heroText:"Real expressions Americans and Brits use every day, with the Arabic meaning and a ready-to-use example.",
    start:"Start learning", hint:"Tap the bubble for a new expression",
    libTitle:"Library", searchPh:"Search in English or Arabic…", searchAria:"Search",
    typeAria:"Type", regAria:"Dialect", all:"All", allReg:"All dialects",
    US:"American", UK:"British", ALL:"General",
    empty:"No results. Try another word or clear the filters.",
    quizTitle:"Test yourself", next:"Next question",
    footer:"Made for English learners — Slango",
    listen:"Listen", listenAria:"Listen to", save:"Save", savedLbl:"Saved",
    count:n=>`${n} expressions`, more:n=>`Show more (${n})`,
    score:(s,t)=>`Score: ${s} / ${t}`, langBtn:"عربي"
  }
};
let lang = "ar";
try { const l = localStorage.getItem("slango.lang"); if(l==="ar"||l==="en") lang = l; } catch(e){}
const tr = () => T[lang];

function applyLang(){
  const t = tr();
  document.documentElement.lang = lang;
  document.documentElement.dir = lang==="ar" ? "rtl" : "ltr";
  document.title = t.title;
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t[el.dataset.i18n]);
  document.querySelectorAll("[data-i18n-ph]").forEach(el => el.placeholder = t[el.dataset.i18nPh]);
  document.querySelectorAll("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", t[el.dataset.i18nAria]));
  $("#langBtn").textContent = t.langBtn;
  render(); heroShow(); updateScore();
}
$("#langBtn").addEventListener("click", () => {
  lang = lang==="ar" ? "en" : "ar";
  try { localStorage.setItem("slango.lang", lang); } catch(e){}
  applyLang();
});

function speak(text){
  if(!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text); u.lang = "en-US"; u.rate = .9;
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}

function render(){
  const t = tr();
  const q = state.q.trim().toLowerCase();
  const list = EXPRESSIONS.filter(e =>
    (state.type==="all"||e.t===state.type) &&
    (state.reg==="all"||e.reg===state.reg||e.reg==="ALL") &&
    (!state.onlySaved||state.saved.has(e.en)) &&
    (!q||e.en.toLowerCase().includes(q)||e.ar.includes(q)));
  const part = list.slice(0, state.shown);
  $("#more").hidden = list.length <= state.shown;
  $("#more").textContent = t.more(list.length - state.shown);
  $("#count").textContent = t.count(list.length);
  $("#grid").innerHTML = part.map(e => `
    <article class="card ${e.t}">
      <div class="meta"><span class="tag">${e.t==="slang"?"Slang":"Idiom"}</span><span class="tag">${t[e.reg]}</span></div>
      <h3 dir="ltr">${e.en}</h3>
      <div class="ar-text" dir="rtl">${e.ar}</div>
      <div class="ex" dir="ltr">“${e.ex}”</div>
      <div class="actions">
        <button data-say="${e.en}" aria-label="${t.listenAria} ${e.en}">${t.listen}</button>
        <button data-save="${e.en}" class="${state.saved.has(e.en)?"saved":""}">${state.saved.has(e.en)?t.savedLbl:t.save}</button>
      </div>
    </article>`).join("");
  $("#empty").hidden = list.length>0;
  $("#savedCount").textContent = state.saved.size;
}

$("#grid").addEventListener("click", ev => {
  const b = ev.target.closest("button"); if(!b) return;
  if(b.dataset.say) speak(b.dataset.say);
  if(b.dataset.save){
    state.saved.has(b.dataset.save) ? state.saved.delete(b.dataset.save) : state.saved.add(b.dataset.save);
    persist(); render();
  }
});
$("#search").addEventListener("input", e => { state.q = e.target.value; state.shown = PAGE; render(); });
$("#more").addEventListener("click", () => { state.shown += PAGE; render(); });
function chips(id, key){
  $(id).addEventListener("click", ev => {
    const b = ev.target.closest(".chip"); if(!b) return;
    $(id).querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c===b));
    state[key] = b.dataset.v; state.shown = PAGE; render();
  });
}
chips("#typeChips","type"); chips("#regChips","reg");
$("#savedBtn").addEventListener("click", e => {
  state.onlySaved = !state.onlySaved;
  e.currentTarget.setAttribute("aria-pressed", state.onlySaved);
  location.hash = "#library"; render();
});

// فقاعة الهيرو
let hi = Math.floor(Math.random()*EXPRESSIONS.length), heroCur = null;
function heroShow(){
  if(!heroCur) return;
  $("#hType").textContent = (heroCur.t==="slang"?"Slang":"Idiom")+" · "+tr()[heroCur.reg];
  $("#hEn").textContent = heroCur.en; $("#hAr").textContent = heroCur.ar;
}
function hero(){ heroCur = EXPRESSIONS[hi++ % EXPRESSIONS.length]; heroShow(); }
$("#heroBubble").addEventListener("click", hero); hero();

// الاختبار
const quiz = {score:0, total:0, cur:null};
const updateScore = () => { $("#qScore").textContent = tr().score(quiz.score, quiz.total); };
function nextQ(){
  const pool = EXPRESSIONS, cur = pool[Math.floor(Math.random()*pool.length)];
  const wrong = pool.filter(x => x!==cur).sort(()=>Math.random()-.5).slice(0,2);
  const opts = [cur,...wrong].sort(()=>Math.random()-.5);
  quiz.cur = cur;
  $("#qText").textContent = cur.en;
  updateScore();
  $("#qOpts").innerHTML = opts.map(o => `<button dir="rtl" data-en="${o.en}">${o.ar}</button>`).join("");
  $("#qNext").hidden = true;
}
$("#qOpts").addEventListener("click", ev => {
  const b = ev.target.closest("button"); if(!b || !$("#qNext").hidden) return;
  quiz.total++;
  const ok = b.dataset.en === quiz.cur.en; if(ok) quiz.score++;
  $("#qOpts").querySelectorAll("button").forEach(x => {
    if(x.dataset.en===quiz.cur.en) x.classList.add("right");
    else if(x===b) x.classList.add("wrong");
  });
  updateScore();
  $("#qNext").hidden = false;
});
$("#qNext").addEventListener("click", nextQ);
nextQ(); applyLang();
