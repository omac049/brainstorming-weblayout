(function () {
  var TASKS = [
    { id: 'hub', label: 'Hub', href: 'index.html', dot: 'c1' },
    { id: '1-1', label: '1.1 Screenshots', href: '1-1-screenshots.html', dot: 'c1' },
    { id: '1-2', label: '1.2 RFI Audit', href: '1-2-rfi-audit.html', dot: 'c2' },
    { id: '1-3', label: '1.3 Chat Widget', href: '1-3-chat-widget.html', dot: 'c3' },
    { id: '1-4', label: '1.4 Comparison', href: '1-4-comparison.html', dot: 'c4' },
    { id: '1-5', label: '1.5 Contentsquare', href: '1-5-contentsquare.html', dot: 'c5' },
    { id: '1-6', label: '1.6–1.10 Ext. Validation', href: '1-6-external-validation.html', dot: 'c6' },
    { id: 'builder', label: 'Layout Builder', href: 'layout-builder.html', dot: 'c7' }
  ];

  var page = location.pathname.split('/').pop() || 'index.html';

  var css = document.createElement('style');
  css.textContent = [
    '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");',
    '.pn{position:sticky;top:0;z-index:9999;background:#fff;border-bottom:1px solid #E2E5EA;font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}',
    '.pn-inner{display:flex;align-items:stretch;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none;max-width:100%}',
    '.pn-inner::-webkit-scrollbar{display:none}',
    '.pn-item{display:flex;align-items:center;gap:7px;padding:12px 18px;font-size:12px;font-weight:600;color:#6B7280;text-decoration:none;white-space:nowrap;border-bottom:2px solid transparent;transition:all .15s;flex-shrink:0}',
    '.pn-item:hover{color:#0C234B;background:#F7F8FA}',
    '.pn-item[aria-current=page]{color:#0C234B;border-bottom-color:#AB0520}',
    '.pn-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}',
    '.pn-dot.c1{background:#3B82F6}.pn-dot.c2{background:#F59E0B}.pn-dot.c3{background:#EC4899}.pn-dot.c4{background:#10B981}.pn-dot.c5{background:#8B5CF6}.pn-dot.c6{background:#F97316}.pn-dot.c7{background:#059669}',
    '.pn-item[aria-current=page] .pn-dot{box-shadow:0 0 0 3px rgba(171,5,32,.2)}',
    '.pn-prev-next{display:flex;align-items:center;gap:4px;margin-left:auto;padding:0 12px;flex-shrink:0}',
    '.pn-arrow{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;border:1px solid #E2E5EA;background:#fff;color:#6B7280;text-decoration:none;font-size:14px;font-weight:700;transition:all .15s}',
    '.pn-arrow:hover{border-color:#0C234B;color:#0C234B;background:#F7F8FA}',
    '.pn-arrow.disabled{opacity:.3;pointer-events:none}',
    '@keyframes pn-fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}',
    '.pn-reveal{opacity:0;animation:pn-fadeUp .5s ease-out forwards}',
    '.pn-reveal-d1{animation-delay:.05s}.pn-reveal-d2{animation-delay:.1s}.pn-reveal-d3{animation-delay:.15s}.pn-reveal-d4{animation-delay:.2s}',
    '@media(max-width:700px){.pn-item{padding:10px 14px;font-size:11px}}'
  ].join('\n');
  document.head.appendChild(css);

  var nav = document.createElement('nav');
  nav.className = 'pn';
  var inner = document.createElement('div');
  inner.className = 'pn-inner';

  var currentIdx = -1;
  TASKS.forEach(function (t, i) {
    var a = document.createElement('a');
    a.className = 'pn-item';
    a.href = t.href;
    if (page === t.href || (page === '' && t.id === 'hub')) {
      a.setAttribute('aria-current', 'page');
      currentIdx = i;
    }
    a.innerHTML = '<span class="pn-dot ' + t.dot + '"></span>' + t.label;
    inner.appendChild(a);
  });

  var pnBox = document.createElement('div');
  pnBox.className = 'pn-prev-next';

  var prevHref = currentIdx > 0 ? TASKS[currentIdx - 1].href : null;
  var nextHref = currentIdx < TASKS.length - 1 ? TASKS[currentIdx + 1].href : null;

  var prev = document.createElement('a');
  prev.className = 'pn-arrow' + (prevHref ? '' : ' disabled');
  prev.href = prevHref || '#';
  prev.innerHTML = '←';
  prev.title = prevHref ? TASKS[currentIdx - 1].label : '';

  var next = document.createElement('a');
  next.className = 'pn-arrow' + (nextHref ? '' : ' disabled');
  next.href = nextHref || '#';
  next.innerHTML = '→';
  next.title = nextHref ? TASKS[currentIdx + 1].label : '';

  pnBox.appendChild(prev);
  pnBox.appendChild(next);
  inner.appendChild(pnBox);
  nav.appendChild(inner);

  document.body.insertBefore(nav, document.body.firstChild);

  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.altKey && e.key === 'ArrowLeft' && prevHref) location.href = prevHref;
    if (e.altKey && e.key === 'ArrowRight' && nextHref) location.href = nextHref;
  });
})();
