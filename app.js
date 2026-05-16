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
  '\u6027\u683c': '\u4f60\u5609\u547d\u5c40\u5beb\u5497\u5幾\u6a23\u5609\uff1a\u5df1\u571f\u65e5\u4e3b\u5b64\u7acb\u2014\u2014\u4f60\u5609\u300c\u6211\u300d\u5197\u540c\u4f34\u5197\u4fdd\u8b77\uff0c\u4f46\u4f60\u5609\u98df\u50b7\u6975\u65fa\uff085\u6b21\uff09\u4ee3\u8868\u4f60\u7528\u5514\u505c\u7523\u51fa\u5617\u8b49\u660e\u81ea\u5df1\u5b58\u5728\u3002\u8a73\u60c5\u53bb\u300c\u6838\u5fc3\u4e3b\u984c\u300d\u540c\u300c\u5929\u8ce1\u8207\u9670\u5f71\u300d\u77b0\u3002',
  '\u4e8b\u696d': '\u4f60\u5609\u4e8b\u696d\u66f2\u7dda\u4fc2\u6162\u4e0a\u5761\u2014\u2014\u571f\u661fRx 10\u5bae\u52a0MC\u91d1\u725b\u3002\u8a73\u60c5\u53bb\u300c\u5341\u5927\u9818\u57df\u300d\u540c\u300c\u6642\u9593\u7dda\u300d\u77b0\u3002',
  '\u91d1\u9322': '\u98df\u50b7\u751f\u8ca1\u2014\u2014\u9760\u6280\u80fd\u5514\u9760\u6295\u8cc7\u3002\u8a73\u60c5\u7b56\u7565\u55ba\u300c\u4eba\u751f\u5730\u5716\u300d\u3002',
  '\u611b\u60c5': '\u91d1\u661f\u707c\u50b7\u4ee3\u8868\u63a5\u6536\u611b\u5609\u80fd\u529b\u88ab\u81ea\u6211\u610f\u8b58\u906e\u853d\u3002\u8a73\u60c5\u55ba\u300c\u6838\u5fc3\u4e3b\u984c\u300d\u540c\u300c\u5341\u5927\u9818\u57df\u300d\u3002',
  '\u5065\u5eb7': '\u9ad6\u8cea\u57fa\u8abf\u4fc2\u5bd2\u6fd5\u504f\u5f31\u3002\u6ce8\u610f\u813e\u80c3\u3001\u80dd\u81bd\u3001\u7cbe\u795e\u5065\u5eb7\u3002\u8a73\u60c5\u55ba\u300c\u5341\u5927\u9818\u57df\u300d\u3002',
  '\u5927\u904b': '\u800c\u5bb6\u884c\u7dca\u620a\u620c\u5927\u904b\uff0822\u81f331\u6b72\uff09\u3002\u8a73\u60c5\u55ba\u300c\u6642\u9593\u7dda\u300d\u3002',
  '\u8003\u8a66': '2026\u4e19\u5348\u5e74\u4fc2\u8003\u8a66\u9ec3\u91d1\u5e74\u3002\u8a73\u60c5\u55ba\u300c\u6642\u9593\u7dda\u300d\u3002',
  '\u5929\u8ce1': '\u4e09\u5927\u5929\u8ce1\uff1a\u601d\u7dad\u6df1\u5ea6\u540c\u901f\u5ea6\u3001\u58d3\u529b\u4e2d\u6210\u9577\u5609\u97cc\u6027\u3001\u7368\u7279\u5609\u7cbe\u795e\u4e16\u754c\u3002\u8a73\u60c5\u55ba\u300c\u5929\u8ce1\u8207\u9670\u5f71\u300d\u3002',
  '\u9670\u5f71': '\u4e09\u5927\u9670\u5f71\uff1a\u7528\u505a\u5609\u4ee3\u66ff\u5b58\u5728\u3001\u5547\u597d\u9ebb\u7167\u4eba\u3001\u55ba\u6700\u9700\u8981\u4eba\u5609\u9663\u63a8\u958b\u4eba\u3002\u8a73\u60c5\u55ba\u300c\u5929\u8ce1\u8207\u9670\u5f71\u300d\u3002'
};

function initAI() {
  var input = document.getElementById('aiInput');
  var btn = document.getElementById('aiBtn');
  var output = document.getElementById('aiOutput');
  if (!input || !btn || !output) return;
  function ask() {
    var q = input.value.trim();
    if (!q) return;
    var answer = '\u4f60\u53ef\u4ee5\u8a66\u4e0b\u554f\uff1a\u6027\u683c\u3001\u4e8b\u696d\u3001\u91d1\u9322\u3001\u611b\u60c5\u3001\u5065\u5eb7\u3001\u5927\u904b\u3001\u8003\u8a66\u3001\u5929\u8ce1\u3001\u9670\u5f71\u3002';
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
    { energy: '\u706b\u571f\u65fa', advice: '\u4eca\u65e5\u9069\u5408\u8655\u7406\u91cd\u8981\u5609\u5de5\u4f5c\u9805\u76ee\u3002', lucky: '\u6a59\u8272\u3001\u5564\u8272' },
    { energy: '\u91d1\u6c34\u65fa', advice: '\u4eca\u65e5\u6d88\u8017\u6703\u6bd4\u5e73\u6642\u5927\u3002', lucky: '\u7d05\u8272\u3001\u7d2b\u8272' },
    { energy: '\u6728\u706b\u9f4a\u5230', advice: '\u4eca\u65e5\u4fc2\u4e00\u500b\u597d\u597d\u5609\u65e5\u5b50\u3002', lucky: '\u7da0\u8272\u3001\u7d05\u8272' },
    { energy: '\u571f\u91d1\u5e73\u8861', advice: '\u4eca\u65e5\u80fd\u91cf\u4e2d\u7b49\u3002', lucky: '\u767d\u8272\u3001\u9280\u8272' },
    { energy: '\u6c34\u6728\u65fa', advice: '\u4eca\u65e5\u601d\u7dad\u7279\u5225\u6d3b\u8e8d\u4f46\u8eab\u9ad4\u53ef\u80fd\u6bd4\u8f03\u6514\u3002', lucky: '\u85cd\u8272\u3001\u7da0\u8272' }
  ];
  var f = fortunes[seed % 5];
  container.innerHTML = '<div style="margin-bottom:16px;font-size:1.1rem;font-weight:600;">' + today.toLocaleDateString('zh-Hant', { year: 'numeric', month: 'long', day: 'numeric' }) + '</div><div class="tag-row" style="margin-bottom:16px;"><span class="tag">' + f.energy + '</span></div><p style="margin-bottom:16px;">' + f.advice + '</p><p style="font-size:0.85rem;color:var(--text-muted);">\u4eca\u65e5\u5e78\u904b\u984f\u8272\uff1a' + f.lucky + '</p>';
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
    if (!score) continue;
    var filled = parseInt(score);
    els[i].innerHTML = '\u2605'.repeat(filled) + '<span style="opacity:0.3;">' + '\u2605'.repeat(5 - filled) + '</span>';
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

// ============ INJECT FLOATING STYLES ============
function injectFloatingStyles() {
  var s = document.createElement('style');
  s.textContent =
    '.floating-buttons{position:fixed;bottom:24px;right:24px;display:flex;flex-direction:column;gap:12px;z-index:900}' +
    '.fab{width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,.15);background:#1a1a1a;color:#f0ece4;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .3s ease;box-shadow:0 4px 20px rgba(0,0,0,.5);opacity:0;transform:translateY(20px)}' +
    '.fab.visible{opacity:1;transform:translateY(0)}' +
    '.fab:hover{border-color:#e8c547;color:#e8c547;box-shadow:0 0 20px rgba(232,197,71,.3)}' +
    '.fab-prompt{background:#e8c547;color:#000;border-color:#e8c547;font-size:1.3rem}' +
    '.fab-prompt:hover{box-shadow:0 0 30px rgba(232,197,71,.4)}' +
    '.prompt-overlay{position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:9999;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .3s ease}' +
    '.prompt-overlay.open{opacity:1;pointer-events:all}' +
    '.prompt-card{background:#1a1a1a;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:32px;max-width:680px;width:92%;max-height:90vh;overflow-y:auto;transform:translateY(20px);transition:transform .3s ease}' +
    '.prompt-overlay.open .prompt-card{transform:translateY(0)}' +
    '.prompt-card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}' +
    '.prompt-card-title{font-size:1.2rem;font-weight:600;color:#f0ece4}' +
    '.prompt-close{background:none;border:none;color:#7a7570;font-size:1.5rem;cursor:pointer;padding:4px 8px}' +
    '.prompt-textarea{width:100%;min-height:200px;background:#0d0d0d;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:16px;color:#f0ece4;font-family:monospace;font-size:.82rem;line-height:1.6;resize:vertical;outline:none}' +
    '.prompt-textarea:focus{border-color:#e8c547}' +
    '.prompt-copy-row{display:flex;align-items:center;gap:12px;margin:16px 0}' +
    '.prompt-copy-btn{padding:10px 24px;background:#e8c547;color:#000;border:none;border-radius:8px;font-size:.85rem;font-weight:600;cursor:pointer}' +
    '.prompt-copied{font-size:.8rem;color:#e8c547;opacity:0;transition:opacity .3s ease}' +
    '.prompt-copied.show{opacity:1}' +
    '.prompt-divider{border:none;border-top:1px solid rgba(255,255,255,.1);margin:20px 0}' +
    '.prompt-ai-label{font-size:.75rem;letter-spacing:.15em;text-transform:uppercase;color:#7a7570;margin-bottom:12px}' +
    '.prompt-ai-buttons{display:flex;flex-wrap:wrap;gap:10px}' +
    '.prompt-ai-btn{padding:10px 20px;background:#0d0d0d;border:1px solid rgba(255,255,255,.1);border-radius:8px;color:#f0ece4;font-size:.85rem;text-decoration:none;transition:all .3s ease;cursor:pointer}' +
    '.prompt-ai-btn:hover{border-color:#e8c547;color:#e8c547}';
  document.head.appendChild(s);
}

// ============ PROMPT GENERATOR ============
var CHART_CONTEXT = '\u4f60\u4fc2\u4e00\u500b\u7cbe\u901a\u897f\u6d0b\u5360\u661f\u540c\u4e2d\u570b\u516b\u5b57\u547d\u7406\u5609\u8cc7\u6df1\u5206\u6790\u5e2b\u3002\u4ee5\u4e0b\u4fc2\u4e00\u500b\u4eba\u5609\u5b8c\u6574\u547d\u76e4\u6578\u64da\u3002\n\n\u3010\u51fa\u751f\u8cc7\u6599\u30112002\u5e741\u670811\u65e5 19:30 \u9999\u6e2f \u7537\n\n\u3010\u661f\u76e4\u3011ASC\u7345\u5b5012\u5ea6 MC\u91d1\u725b9\u5ea6\n\u592a\u967d\u6469\u7f9a21\u5ea6(6\u5bae) \u6708\u4eae\u5c04\u624b26\u5ea6(5\u5bae) \u6c34\u661f\u6c34\u74f610\u5ea6(6\u5bae)\n\u91d1\u661f\u6469\u7f9a20\u5ea6(6\u5bae\u707c\u50b7) \u706b\u661f\u96b9\u9b5a24\u5ea6(8\u5bae)\n\u6728\u661f\u5de8\u87f99\u5ea6Rx(11\u5bae\u66dc\u5347) \u571f\u661f\u96d9\u5b508\u5ea6Rx(10\u5bae)\n\u4e92\u6eb6\u6708\u4eae\u6728\u661f \u6700tight\u571f\u661f\u4e09\u5206\u6d77\u738b\u661f\n\n\u3010\u516b\u5b57\u3011\u8f9b\u5df3\u8f9b\u4e11\u5df1\u5367\u7678\u9149 \u767d\u881d\u91d1\n\u5df1\u571f\u8eab\u5f31\u559c\u706b\u571f \u98df\u50b75\u6b2133% \u6b63\u53701\u6b21(\u5df3\u85cf\u4e19\u6975\u5f31)\n\u504f\u5370\u6b63\u5b98\u6b63\u8ca1\u5b8c\u5168\u7f3a\u5e2d \u4e09\u5408\u91d1\u5c40\u5df3\u9149\u4e11 \u5367\u9149\u6c96\n\u3010\u5927\u904b\u3011\u620a\u620c22\u81f331\u6b72\u5168\u9762\u5e6b\u8eab\n\u3010\u6cd5\u9054\u3011\u6728\u6641\u6642\u4e3b\u52a0\u592a\u967d\u7d30\u9650(2025.6\u81f32027.3)\n\u3010\u592a\u967d\u5f27\u3011SA\u6708\u4eae\u5408\u672c\u547d\u592a\u967d0\u5ea628\u5206\n\u3010\u65e5\u8fd42026\u30117\u548c12\u5bae\u4e3b\u98db\u51658\u5bae';

var PAGE_PROMPTS = {
  'index.html': '\u8acb\u505a\u6574\u9ad4\u547d\u76e4\u5206\u6790\u6982\u89bd\u3002',
  'core.html': '\u8acb\u6df1\u5165\u5206\u6790\u4e94\u5927\u6838\u5fc3\u4e3b\u984c\u3002',
  'gifts.html': '\u8acb\u5206\u6790\u4e09\u5927\u5929\u8ce1\u540c\u4e09\u5927\u9670\u5f71\u3002',
  'domains.html': '\u8acb\u5206\u6790\u5341\u5927\u4eba\u751f\u9818\u57df\u3002',
  'timeline.html': '\u8acb\u5206\u6790\u6642\u9593\u7dda\uff1a22\u81f331\u6b72\u9010\u5e74\u300118\u500b\u6708\u9810\u6e2c\u3001\u5927\u904b\u7e7f\u89bd\u3002',
  'map.html': '\u8acb\u505a\u5b8c\u6574\u4eba\u751f\u5730\u5716\u7b56\u7565\u3002',
  'data.html': '\u8acb\u89e3\u8b80\u539f\u59cb\u6578\u64da\u4e2d\u5609\u6838\u5fc3\u6a21\u5f0f\u3002'
};

function initPromptGenerator() {
  var currentPage = location.pathname.split('/').pop() || 'index.html';
  var pageInstruction = PAGE_PROMPTS[currentPage] || PAGE_PROMPTS['index.html'];
  var fullPrompt = CHART_CONTEXT + '\n\n\u3010\u5206\u6790\u8981\u6c42\u3011' + pageInstruction;

  var overlay = document.createElement('div');
  overlay.className = 'prompt-overlay';
  overlay.innerHTML =
    '<div class="prompt-card">' +
      '<div class="prompt-card-header">' +
        '<div class="prompt-card-title">\u63d0\u793a\u8a5e\u5df2\u751f\u6210</div>' +
        '<button class="prompt-close">&times;</button>' +
      '</div>' +
      '<p style="font-size:0.85rem;color:#7a7570;margin-bottom:16px;">\u6492\u300c\u8907\u88fd\u300d\u7136\u5f8c\u63c0\u4e00\u500b AI \u5e73\u53f0\u8cbc\u4e0a\u53bb\u5f97\u3002</p>' +
      '<textarea class="prompt-textarea" readonly></textarea>' +
      '<div class="prompt-copy-row">' +
        '<button class="prompt-copy-btn">\u8907\u88fd\u63d0\u793a\u8a5e</button>' +
        '<span class="prompt-copied">&#x2713; \u5df2\u8907\u88fd</span>' +
      '</div>' +
      '<hr class="prompt-divider">' +
      '<div class="prompt-ai-label">\u8cbc\u53bb\u908a\u500b AI\uff1f</div>' +
      '<div class="prompt-ai-buttons">' +
        '<a class="prompt-ai-btn" href="https://gemini.google.com" target="_blank">Gemini</a>' +
        '<a class="prompt-ai-btn" href="https://chat.deepseek.com" target="_blank">DeepSeek</a>' +
        '<a class="prompt-ai-btn" href="https://www.doubao.com" target="_blank">\u8c46\u5305</a>' +
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

// ============ BACK TO TOP ============
function initBackToTop() {
  var btn = document.createElement('button');
  btn.className = 'fab';
  btn.innerHTML = '&#x2191;';
  btn.title = '\u56de\u5230\u9802\u90e8';
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  return btn;
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
  promptFab.title = '\u751f\u6210\u63d0\u793a\u8a5e';
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
