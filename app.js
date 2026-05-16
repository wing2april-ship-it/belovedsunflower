// ============ CONFIG ============
var PASSWORD = 'LOVEYAN';
var THEME_KEY = 'life-map-theme';

// ============ NAV DATA ============
var NAV_ITEMS = [
  { href: 'core.html', label: '核心主題' },
  { href: 'gifts.html', label: '天賦陰影' },
  { href: 'domains.html', label: '十大領域' },
  { href: 'timeline.html', label: '時間線' },
  { href: 'map.html', label: '人生地圖' },
  { href: 'data.html', label: '原始數據' }
];

var MOBILE_NAV_ITEMS = [
  { href: 'index.html', label: '首頁' },
  { href: 'core.html', label: '核心主題' },
  { href: 'gifts.html', label: '天賦與陰影' },
  { href: 'domains.html', label: '十大領域' },
  { href: 'timeline.html', label: '時間線' },
  { href: 'map.html', label: '人生地圖' },
  { href: 'data.html', label: '原始數據' }
];

// ============ INJECT NAV ============
function injectNav() {
  var navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    var current = location.pathname.split('/').pop() || 'index.html';
    var html = '';
    for (var i = 0; i < NAV_ITEMS.length; i++) {
      var item = NAV_ITEMS[i];
      var active = item.href === current ? ' class="active"' : '';
      html += '<li><a href="' + item.href + '"' + active + '>' + item.label + '</a></li>';
    }
    navLinks.innerHTML = html;
  }
  var mobileLinks = document.querySelector('.mobile-nav-links');
  if (mobileLinks) {
    var current2 = location.pathname.split('/').pop() || 'index.html';
    var html2 = '';
    for (var j = 0; j < MOBILE_NAV_ITEMS.length; j++) {
      var item2 = MOBILE_NAV_ITEMS[j];
      var active2 = item2.href === current2 ? ' class="active"' : '';
      html2 += '<li><a href="' + item2.href + '"' + active2 + '>' + item2.label + '</a></li>';
    }
    mobileLinks.innerHTML = html2;
  }
}

// ============ STARFIELD ============
function createStarfield() {
  var container = document.querySelector('.starfield');
  if (!container) return;
  container.innerHTML = '';
  for (var i = 0; i < 80; i++) {
    var star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.width = (Math.random() * 2 + 1) + 'px';
    star.style.height = star.style.width;
    star.style.animationDelay = Math.random() * 5 + 's';
    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
    container.appendChild(star);
  }
}

// ============ PASSWORD GATE ============
function initGate() {
  var gate = document.getElementById('gate');
  var gateInput = document.getElementById('gateInput');
  var gateBtn = document.getElementById('gateBtn');
  var gateError = document.getElementById('gateError');
  var wrapper = document.querySelector('.page-wrapper');
  if (!gate || !gateInput || !gateBtn) return;

  if (sessionStorage.getItem('life-map-unlocked') === 'true') {
    gate.style.display = 'none';
    if (wrapper) wrapper.classList.add('unlocked');
    return;
  }

  function tryUnlock() {
    if (gateInput.value === PASSWORD) {
      gate.classList.add('unlocking');
      setTimeout(function() {
        gate.style.display = 'none';
        if (wrapper) wrapper.classList.add('unlocked');
        sessionStorage.setItem('life-map-unlocked', 'true');
      }, 600);
    } else {
      gateError.textContent = '密碼唔啱';
      gateInput.value = '';
      gateInput.focus();
    }
  }

  gateBtn.addEventListener('click', tryUnlock);
  gateInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') tryUnlock();
  });
}

// ============ THEME TOGGLE ============
function initTheme() {
  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  var saved = localStorage.getItem(THEME_KEY);
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  btn.addEventListener('click', function() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
  });
}

// ============ MOBILE MENU ============
function initMobileMenu() {
  var btn = document.getElementById('menuToggle');
  var nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function() {
    btn.classList.toggle('open');
    nav.classList.toggle('open');
  });
  var links = nav.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function() {
      btn.classList.remove('open');
      nav.classList.remove('open');
    });
  }
}

// ============ TABS ============
function initTabs() {
  var allBtns = document.querySelectorAll('.tab-btn');
  for (var i = 0; i < allBtns.length; i++) {
    allBtns[i].addEventListener('click', function() {
      var tabId = this.getAttribute('data-tab');
      var card = this.closest('.card') || this.closest('.main-content');
      if (!card) return;
      var siblings = this.parentElement.querySelectorAll('.tab-btn');
      for (var j = 0; j < siblings.length; j++) siblings[j].classList.remove('active');
      var panelsContainer = this.parentElement.nextElementSibling;
      if (panelsContainer) {
        var panels = panelsContainer.querySelectorAll('.tab-panel');
        for (var k = 0; k < panels.length; k++) panels[k].classList.remove('active');
      }
      this.classList.add('active');
      var panel = card.querySelector('[data-panel="' + tabId + '"]');
      if (panel) panel.classList.add('active');
    });
  }
}

// ============ EXPANDABLES ============
function initExpandables() {
  var triggers = document.querySelectorAll('.expandable-trigger');
  for (var i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener('click', function() {
      this.parentElement.classList.toggle('open');
    });
  }
}

// ============ SCROLL REVEAL ============
function initScrollReveal() {
  var observer = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) entries[i].target.classList.add('visible');
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  var reveals = document.querySelectorAll('.reveal');
  for (var i = 0; i < reveals.length; i++) observer.observe(reveals[i]);
}

// ============ PROGRESS BAR ============
function initProgressBar() {
  var bar = document.getElementById('progressBar');
  if (!bar) return;
  window.addEventListener('scroll', function() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = docHeight > 0 ? (scrollTop / docHeight) * 100 + '%' : '0%';
  });
}

// ============ AI Q&A ============
var AI_ANSWERS = {
  '性格': '你嘅命局寫咗幾樣嘢：己土日主孤立——你嘅「我」冇同伴冇保護，但你嘅食傷極旺（5次）代表你用不停產出嚟證明自己存在。你嘅大腦好快好深但好難停——風象40%加變動模式40%。你嘅表面同內在有落差——ASC獅子有氣勢但太陽尊貴只有1分。如果你想了解更深入，可以去「核心主題」同「天賦與陰影」嗰度睇。',
  '事業': '你嘅事業曲線係慢上坡——土星Rx 10宮加MC金牛等於慢但穩。6宮主飛10宮代表每日工作建構事業。最適合你嘅方向係專業深耕型——靠考牌同累積資歷。2026丙午年係考試黃金年。而家行緊戊戌大運全面幫身。詳細可以去「十大領域」同「時間線」睇。',
  '金錢': '你嘅賺錢模式係食傷生財——靠技能而唔靠投資。偏財透干時柱代表收入偏活水。正財缺席代表冇穩定積累模式——要靠人為建立定期儲蓄。詳細策略喺「人生地圖」嗰頁。',
  '愛情': '你嘅金星灼傷代表接收愛嘅能力被自我意識遮蔽。你愛人嘅方式係做嘢而唔係講嘢。你接收愛嘅方式同一般人唔同——行動式關心你會收，語言式關心你會彈開。詳細喺「核心主題」同「十大領域」。',
  '健康': '你嘅體質基調係寒濕偏弱——己土生冬月加身弱加食傷洩身。最需要注意脾胃、肝膽、精神健康。生活建議：偏暖食、戒凍飲、行山。詳細喺「十大領域」。',
  '大運': '而家行緊戊戌大運（22至31歲）等於天干地支都幫身。下一大運丁酉（32至41歲）等於有保護有消耗。丙申（42至51歲）等於正印到位。乙未（52至61歲）等於殺印相生。甲午（62至71歲）等於金神成器。詳細喺「時間線」。',
  '考試': '2026丙午年係考試黃金年——丙火正印加火土大旺。最佳溫書月份：5月。最辛苦考試月：8月。考完抖氣月：9月。詳細喺「時間線」。',
  '天賦': '三大天賦：思維深度同速度、壓力中成長嘅韌性、獨特嘅精神世界。詳細喺「天賦與陰影」。',
  '陰影': '三大陰影：用做嘢代替存在、唔好麻煩人、喺最需要人嗰陣推開人。天賦同陰影係同一枚銀幣嘅兩面。詳細喺「天賦與陰影」。'
};

function initAI() {
  var input = document.getElementById('aiInput');
  var btn = document.getElementById('aiBtn');
  var output = document.getElementById('aiOutput');
  if (!input || !btn || !output) return;

  function ask() {
    var q = input.value.trim();
    if (!q) return;
    var answer = '你可以試下問：性格、事業、金錢、愛情、健康、大運、考試、天賦、陰影。每個關鍵詞我都會幫你搵到對應嘅分析。';
    var keys = Object.keys(AI_ANSWERS);
    for (var i = 0; i < keys.length; i++) {
      if (q.indexOf(keys[i]) !== -1) { answer = AI_ANSWERS[keys[i]]; break; }
    }
    output.innerHTML = '<div class="ai-question">' + q + '</div><div class="ai-answer">' + answer + '</div>';
    input.value = '';
  }

  btn.addEventListener('click', ask);
  input.addEventListener('keydown', function(e) { if (e.key === 'Enter') ask(); });
}

// ============ DAILY FORTUNE ============
function initFortune() {
  var container = document.getElementById('dailyFortune');
  if (!container) return;
  var today = new Date();
  var seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  var fortunes = [
    { energy: '火土旺', advice: '今日適合處理重要嘅工作項目。你嘅思維清晰度比平時高。', lucky: '橙色、啡色' },
    { energy: '金水旺', advice: '今日消耗會比平時大——唔好勉強自己做太多嘢。', lucky: '紅色、紫色' },
    { energy: '木火齊到', advice: '今日係一個好好嘅日子。你嘅保護力比平時強。', lucky: '綠色、紅色' },
    { energy: '土金平衡', advice: '今日能量中等。適合做例行工作同整理。', lucky: '白色、銀色' },
    { energy: '水木旺', advice: '今日思維特別活躍但身體可能比較攰。', lucky: '藍色、綠色' }
  ];
  var f = fortunes[seed % 5];
  container.innerHTML = '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;"><div style="font-size:1.1rem;font-weight:600;">' + today.toLocaleDateString('zh-Hant', { year: 'numeric', month: 'long', day: 'numeric' }) + '</div></div><div class="tag-row" style="margin-bottom:16px;"><span class="tag">' + f.energy + '</span></div><p style="margin-bottom:16px;">' + f.advice + '</p><p style="font-size:0.85rem;color:var(--text-muted);">今日幸運顏色：' + f.lucky + '</p>';
}

// ============ PDF ============
function initPDF() {
  var btn = document.getElementById('pdfBtn');
  if (!btn) return;
  btn.addEventListener('click', function() { window.print(); });
}

// ============ FORTUNE SCORES ============
function initFortuneScores() {
  var els = document.querySelectorAll('.fortune-score');
  for (var i = 0; i < els.length; i++) {
    var score = els[i].getAttribute('data-score');
    if (!score) return;
    var filled = parseInt(score);
    els[i].innerHTML = '★'.repeat(filled) + '<span style="opacity:0.3;">' + '★'.repeat(5 - filled) + '</span>';
  }
}

// ============ SMOOTH SCROLL ============
function initSmoothScroll() {
  var anchors = document.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      var target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  }
}

// ============ PROMPT GENERATOR ============
var CHART_CONTEXT = '你係一個精通西洋占星同中國八字命理嘅資深分析師。以下係一個人嘅完整命盤數據，請根據呢啲數據進行分析。\n\n【出生資料】2002年1月11日 19:30 香港 男\n\n【星盤】ASC獅子12度16分 MC金牛9度53分\n太陽摩羯21度4分(6宮) 月亮射手26度54分(5宮) 水星水瓶10度3分(6宮)\n金星摩羯20度21分(6宮灼傷) 火星雙魚24度33分(8宮)\n木星巨蟹9度16分Rx(11宮曜升) 土星雙子8度44分Rx(10宮)\n互溶月亮木星 最tight相位土星三分海王星0度55分\n\n【八字】四柱辛巳辛丑己卯癸酉 納音白蠟金\n日主己土身弱喜火土 食傷5次33% 正印1次巳藏丙極弱\n偏印正官正財完全缺席 三合金局巳酉丑 卯酉沖\n神煞華蓋太極貴人童子將星金神文昌亢宿值日\n\n【而家嘅位置】\n大運戊戌22至31歲全面幫身 法達盤木太木星時主加太陽細限\n太陽弧SA月亮合本命太陽0度28分 次限太陽水瓶約16度\n2026日返盤7和12宮主飛入8宮等於深層轉化年份';

var PAGE_PROMPTS = {
  'index.html': '請做一個整體命盤分析概覽，包括性格特質、天賦、陰影、事業方向、感情模式、同最重要嘅人生課題。',
  'core.html': '請深入分析五大核心主題：身份認同、消耗模式、保護機制、時間節奏、愛嘅模式。每個主題都要結合星盤同八字數據。',
  'gifts.html': '請分析三大天賦同三大陰影。分析佢哋嘅根源同關係。',
  'domains.html': '請分析十大人生領域。每個領域要有星盤同八字依據同實際建議。',
  'timeline.html': '請分析時間線：22至31歲戊戌大運逐年拆解、18個月預測、大運總覽。要結合八字大運、法達盤、日返盤、太陽弧、次限嚟交叉驗證。',
  'map.html': '請做一個完整嘅人生地圖策略：金錢策略、感情策略、事業策略、同行動時間線。',
  'data.html': '以下係完整嘅命理原始數據。請解讀最重要嘅模式同核心特質。'
};

function initPromptGenerator() {
  var currentPage = location.pathname.split('/').pop() || 'index.html';
  var pageInstruction = PAGE_PROMPTS[currentPage] || PAGE_PROMPTS['index.html'];
  var fullPrompt = CHART_CONTEXT + '\n\n【分析要求】' + pageInstruction;

  var overlay = document.createElement('div');
  overlay.className = 'prompt-overlay';
  overlay.innerHTML = '<div class="prompt-card">' +
    '<div class="prompt-card-header">' +
    '<div class="prompt-card-title">提示詞已生成</div>' +
    '<button class="prompt-close">&times;</button>' +
    '</div>' +
    '<p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:16px;">撳「複製」然後揀一個 AI 平台貼上去就得。</p>' +
    '<textarea class="prompt-textarea" readonly></textarea>' +
    '<div class="prompt-copy-row">' +
    '<button class="prompt-copy-btn">複製提示詞</button>' +
    '<span class="prompt-copied">&#x2713; 已複製！</span>' +
    '</div>' +
    '<hr class="prompt-divider">' +
    '<div class="prompt-ai-label">貼去邊個 AI？</div>' +
    '<div class="prompt-ai-buttons">' +
    '<a class="prompt-ai-btn" href="https://gemini.google.com" target="_blank" rel="noopener">Gemini</a>' +
    '<a class="prompt-ai-btn" href="https://chat.deepseek.com" target="_blank" rel="noopener">DeepSeek</a>' +
    '<a class="prompt-ai-btn" href="https://www.doubao.com" target="_blank" rel="noopener">豆包</a>' +
    '<a class="prompt-ai-btn" href="https://copilot.microsoft.com" target="_blank" rel="noopener">Copilot</a>' +
    '<a class="prompt-ai-btn" href="https://grok.com" target="_blank" rel="noopener">Grok</a>' +
    '</div></div>';
  document.body.appendChild(overlay);

  var textarea = overlay.querySelector('.prompt-textarea');
  textarea.value = fullPrompt;

  var copyBtn = overlay.querySelector('.prompt-copy-btn');
  var copiedEl = overlay.querySelector('.prompt-copied');

  function doCopy() {
    textarea.select();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textarea.value).then(showCopied).catch(function() {
        document.execCommand('copy');
        showCopied();
      });
    } else {
      document.execCommand('copy');
      showCopied();
    }
  }

  function showCopied() {
    copiedEl.classList.add('show');
    setTimeout(function() { copiedEl.classList.remove('show'); }, 2000);
  }

  function open() {
    overlay.classList.add('open');
    doCopy();
  }

  function close() {
    overlay.classList.remove('open');
  }

  overlay.querySelector('.prompt-close').addEventListener('click', close);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') close(); });
  copyBtn.addEventListener('click', doCopy);

  return open;
}

// ============ BACK TO TOP ============
function initBackToTop() {
  var btn = document.createElement('button');
  btn.className = 'fab';
  btn.innerHTML = '&#x2191;';
  btn.title = '回到頂部';
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  return btn;
}

// ============ FLOATING STYLES (inline) ============
function injectFloatingStyles() {
  var s = document.createElement('style');
  s.textContent = '.floating-buttons{position:fixed;bottom:24px;right:24px;display:flex;flex-direction:column;gap:12px;z-index:900}' +
    '.fab{width:48px;height:48px;border-radius:50%;border:1px solid var(--border);background:var(--bg-card);color:var(--text-primary);font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .3s ease;box-shadow:0 4px 20px rgba(0,0,0,.3);opacity:0;transform:translateY(20px)}' +
    '.fab.visible{opacity:1;transform:translateY(0)}' +
    '.fab:hover{border-color:var(--accent);color:var(--accent);box-shadow:0 0 20px var(--accent-glow)}' +
    '.fab-prompt{background:var(--accent);color:#000;border-color:var(--accent)}' +
    '.fab-prompt:hover{box-shadow:0 0 30px var(--accent-glow)}' +
    '.prompt-overlay{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:9999;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .3s ease}' +
    '.prompt-overlay.open{opacity:1;pointer-events:all}' +
    '.prompt-card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:32px;max-width:680px;width:92%;max-height:90vh;overflow-y:auto;transform:translateY(20px);transition:transform .3s ease}' +
    '.prompt-overlay.open .prompt-card{transform:translateY(0)}' +
    '.prompt-card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}' +
    '.prompt-card-title{font-family:var(--font-display);font-size:1.2rem;font-weight:600}' +
    '.prompt-close{background:none;border:none;color:var(--text-muted);font-size:1.5rem;cursor:pointer;padding:4px 8px}' +
    '.prompt-textarea{width:100%;min-height:200px;background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:16px;color:var(--text-primary);font-family:var(--font-body);font-size:.82rem;line-height:1.6;resize:vertical;outline:none}' +
    '.prompt-textarea:focus{border-color:var(--accent)}' +
    '.prompt-copy-row{display:flex;align-items:center;gap:12px;margin:16px 0}' +
    '.prompt-copy-btn{padding:10px 24px;background:var(--accent);color:#000;border:none;border-radius:8px;font-size:.85rem;font-family:var(--font-display);cursor:pointer}' +
    '.prompt-copied{font-size:.8rem;color:var(--accent);opacity:0;transition:opacity .3s ease}' +
    '.prompt-copied.show{opacity:1}' +
    '.prompt-divider{border:none;border-top:1px solid var(--border);margin:20px 0}' +
    '.prompt-ai-label{font-size:.75rem;letter-spacing:.15em;text-transform:uppercase;color:var(--text-muted);margin-bottom:12px}' +
    '.prompt-ai-buttons{display:flex;flex-wrap:wrap;gap:10px}' +
    '.prompt-ai-btn{padding:10px 20px;background:var(--bg);border:1px solid var(--border);border-radius:8px;color:var(--text-primary);font-size:.85rem;text-decoration:none;transition:all .3s ease;cursor:pointer;display:inline-flex;align-items:center;gap:6px}' +
    '.prompt-ai-btn:hover{border-color:var(--accent);color:var(--accent)}';
  document.head.appendChild(s);
}

// ============ BACK TO TOP ============
function initBackToTop() {
  var btn = document.createElement('button');
  btn.className = 'fab';
  btn.innerHTML = '&#x2191;';
  btn.title = '回到頂部';
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  return btn;
}

// ============ PROMPT GENERATOR ============
var CHART_CONTEXT = '你係一個精通西洋占星同中國八字命理嘅資深分析師。以下係一個人嘅完整命盤數據。\n\n【出生資料】2002年1月11日 19:30 香港 男\n\n【星盤】ASC獅子12度 MC金牛9度\n太陽摩羯21度(6宮) 月亮射手26度(5宮) 水星水瓶10度(6宮)\n金星摩羯20度(6宮灼傷) 火星雙魚24度(8宮)\n木星巨蟹9度Rx(11宮曜升) 土星雙子8度Rx(10宮)\n互溶月亮木星 最tight土星三分海王星\n\n【八字】辛巳辛丑己卯癸酉 白蠟金\n己土身弱喜火土 食傷5次33% 正印1次(巳藏丙極弱)\n偏印正官正財完全缺席 三合金局巳酉丑 卯酉沖\n華蓋太極貴人童子將星金神文昌亢宿值日\n\n【大運】戊戌22至31歲全面幫身\n【法達】木大時主加太陽細限(2025.6至2027.3)\n【太陽弧】SA月亮合本命太陽0度28分\n【日返2026】7和12宮主飛入8宮';

var PAGE_PROMPTS = {
  'index.html': '請做整體命盤分析概覽。',
  'core.html': '請深入分析五大核心主題：身份認同、消耗、保護、時間、愛。',
  'gifts.html': '請分析三大天賦同三大陰影嘅根源同關係。',
  'domains.html': '請分析十大人生領域。',
  'timeline.html': '請分析時間線：22至31歲逐年、18個月預測、大運總覽。結合八字大運、法達盤、日返盤、太陽弧。',
  'map.html': '請做完整人生地圖策略。',
  'data.html': '請解讀原始數據中嘅核心模式。'
};

function initPromptGenerator() {
  var currentPage = location.pathname.split('/').pop() || 'index.html';
  var pageInstruction = PAGE_PROMPTS[currentPage] || PAGE_PROMPTS['index.html'];
  var fullPrompt = CHART_CONTEXT + '\n\n【分析要求】' + pageInstruction;

  var overlay = document.createElement('div');
  overlay.className = 'prompt-overlay';
  overlay.innerHTML =
    '<div class="prompt-card">' +
      '<div class="prompt-card-header">' +
        '<div class="prompt-card-title">提示詞已生成</div>' +
        '<button class="prompt-close">&times;</button>' +
      '</div>' +
      '<p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:16px;">撳「複製」然後揀一個 AI 平台貼上去就得。</p>' +
      '<textarea class="prompt-textarea" readonly></textarea>' +
      '<div class="prompt-copy-row">' +
        '<button class="prompt-copy-btn">複製提示詞</button>' +
        '<span class="prompt-copied">&#x2713; 已複製</span>' +
      '</div>' +
      '<hr class="prompt-divider">' +
      '<div class="prompt-ai-label">貼去邊個 AI？</div>' +
      '<div class="prompt-ai-buttons">' +
        '<a class="prompt-ai-btn" href="https://gemini.google.com" target="_blank">Gemini</a>' +
        '<a class="prompt-ai-btn" href="https://chat.deepseek.com" target="_blank">DeepSeek</a>' +
        '<a class="prompt-ai-btn" href="https://www.doubao.com" target="_blank">豆包</a>' +
        '<a class="prompt-ai-btn" href="https://copilot.microsoft.com" target="_blank">Copilot</a>' +
        '<a class="prompt-ai-btn" href="https://grok.com" target="_blank">Grok</a>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  var textarea = overlay.querySelector('.prompt-textarea');
  textarea.value = fullPrompt;

  var copyBtn = overlay.querySelector('.prompt-copy-btn');
  var copiedEl = overlay.querySelector('.prompt-copied');

  function doCopy() {
    textarea.select();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textarea.value).then(showCopied).catch(function() {
        document.execCommand('copy');
        showCopied();
      });
    } else {
      document.execCommand('copy');
      showCopied();
    }
  }

  function showCopied() {
    copiedEl.classList.add('show');
    setTimeout(function() { copiedEl.classList.remove('show'); }, 2000);
  }

  function open() {
    overlay.classList.add('open');
    doCopy();
  }

  function close() {
    overlay.classList.remove('open');
  }

  overlay.querySelector('.prompt-close').addEventListener('click', close);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') close(); });
  copyBtn.addEventListener('click', doCopy);

  return open;
}

// ============ FLOATING BUTTONS ============
function initFloatingButtons() {
  injectFloatingStyles();
  var container = document.createElement('div');
  container.className = 'floating-buttons';
  var topBtn = initBackToTop();
  var openPrompt = initPromptGenerator();
  var promptFab = document.createElement('button');
  promptFab.className = 'fab fab-prompt visible';
  promptFab.innerHTML = '&#x2728;';
  promptFab.title = '生成提示詞';
  promptFab.addEventListener('click', openPrompt);
  container.appendChild(topBtn);
  container.appendChild(promptFab);
  document.body.appendChild(container);
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  });
}


// ============ INIT ALL ============
document.addEventListener('DOMContentLoaded', function() {
  injectNav();
  createStarfield();
  initGate();
  initTheme();
  initMobileMenu();
  initTabs();
  initExpandables();
  initScrollReveal();
  initProgressBar();
  initAI();
  initFortune();
  initPDF();
  initFortuneScores();
  initSmoothScroll();
  initFloatingButtons();
});
