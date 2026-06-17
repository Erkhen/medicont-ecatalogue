/* ── SVG Icons ── */
const ICONS = {
  arrow: `<svg viewBox="0 0 14 14" fill="none"><line x1="2" y1="7" x2="12" y2="7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><polyline points="8,3.5 12,7 8,10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  image: `<svg viewBox="0 0 40 40" fill="none"><rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" stroke-width="1.5"/><circle cx="14" cy="16" r="3" stroke="currentColor" stroke-width="1.3"/><polyline points="4,28 13,19 20,26 26,21 36,32" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  globe: `<svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.2"/><ellipse cx="7" cy="7" rx="2.5" ry="5.5" stroke="currentColor" stroke-width="1.2"/><line x1="1.5" y1="7" x2="12.5" y2="7" stroke="currentColor" stroke-width="1.2"/></svg>`,
  ruler: `<svg viewBox="0 0 14 14" fill="none"><rect x="1" y="4" width="12" height="6" rx="1" stroke="currentColor" stroke-width="1.2"/><line x1="4" y1="4" x2="4" y2="6.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><line x1="7" y1="4" x2="7" y2="7" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><line x1="10" y1="4" x2="10" y2="6.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>`,
  grid:  `<svg viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/></svg>`,
  eye:   `<svg viewBox="0 0 16 16" fill="none"><path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="2.2" stroke="currentColor" stroke-width="1.3"/></svg>`,
  scan:  `<svg viewBox="0 0 16 16" fill="none"><path d="M2 5V3a1 1 0 0 1 1-1h2M14 5V3a1 1 0 0 0-1-1h-2M2 11v2a1 1 0 0 0 1 1h2M14 11v2a1 1 0 0 1-1 1h-2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  dot:   `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="2" fill="currentColor"/></svg>`,
  drop:  `<svg viewBox="0 0 16 16" fill="none"><path d="M8 2C8 2 3 8 3 11a5 5 0 0 0 10 0C13 8 8 2 8 2Z" stroke="currentColor" stroke-width="1.3"/></svg>`,
  pdf:   `<svg viewBox="0 0 16 16" fill="none"><path d="M4 1.5h6L13 4.5v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M9.5 1.5V5h3.5" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><line x1="5" y1="8.5" x2="11" y2="8.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><line x1="5" y1="10.5" x2="9" y2="10.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>`,
};

const CAT_ICONS = {
  all: ICONS.grid,
  'eye-surgery': ICONS.eye,
  diagnostic: ICONS.scan,
  iol: ICONS.dot,
  consumable: ICONS.drop,
};

const catMap = {};
CATEGORIES.forEach(c => catMap[c.id] = c.label);

/* ── State ── */
let activeCategory = 'all';
let searchQuery = '';

/* ── Category label ── */
function getCatLabel(id) {
  const c = CATEGORIES.find(x => x.id === id);
  return c ? c.label : id;
}

/* ── Build product card ── */
function buildCard(p) {
  const el = document.createElement('div');
  el.className = 'card';

  const imgHtml = p.image
    ? `<img class="card-img" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
       <div class="card-img-placeholder" style="display:none">${ICONS.image}<span>Зураг байхгүй</span></div>`
    : `<div class="card-img-placeholder">${ICONS.image}<span>Зураг байхгүй</span></div>`;

  el.innerHTML = `
    <div class="card-img-wrap">
      ${imgHtml}
      <div class="card-cat-badge">${getCatLabel(p.category)}</div>
    </div>
    <div class="card-body">
      <div class="card-name">${p.name}</div>
      <div class="card-meta">
        <div class="card-meta-row"><span class="meta-label">Код</span><span class="meta-value code">${p.code}</span></div>
        <div class="card-meta-row"><span class="meta-label">Хэмжээ</span><span class="meta-value">${p.size}</span></div>
        <div class="card-meta-row"><span class="meta-label">Гарал үүсэл</span><span class="meta-value">${p.origin}</span></div>
      </div>
    </div>
    <div class="card-footer">
      <button class="card-btn" data-id="${p.id}">Дэлгэрэнгүй ${ICONS.arrow}</button>
    </div>
  `;

  el.querySelector('.card-btn').addEventListener('click', () => openModal(p.id));
  return el;
}

/* ── Product Modal ── */
function buildModalContent(p) {
  const imgHtml = p.image
    ? `<img class="modal-img" src="${p.image}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
       <div class="modal-img-placeholder" style="display:none">${ICONS.image}<span>Зураг байхгүй</span></div>`
    : `<div class="modal-img-placeholder">${ICONS.image}<span>Зураг байхгүй</span></div>`;

  const specsHtml = p.specs && p.specs.length
    ? `<div class="modal-section">
        <div class="modal-section-title">Техникийн үзүүлэлт</div>
        <table class="specs-table">${p.specs.map(s => `<tr><td>${s.label}</td><td>${s.value}</td></tr>`).join('')}</table>
       </div>`
    : '';

  return `
    <div class="modal-img-wrap">${imgHtml}</div>
    <div class="modal-eyebrow">${getCatLabel(p.category)}</div>
    <div class="modal-name">${p.name}</div>
    <div class="modal-chips">
      <span class="modal-chip chip-code">${p.code}</span>
      <span class="modal-chip chip-origin">${ICONS.globe} ${p.origin}</span>
      <span class="modal-chip chip-size">${ICONS.ruler} ${p.size}</span>
    </div>
    <div class="modal-section">
      <div class="modal-section-title">Тайлбар</div>
      <div class="modal-description">${p.description}</div>
    </div>
    ${specsHtml}
    <button class="pdf-download-btn" id="pdfDownloadBtn" data-id="${p.id}">
      ${ICONS.pdf} PDF татах
    </button>
  `;
}

const overlay      = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const closeBtn     = document.getElementById('modalClose');

function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  modalContent.innerHTML = buildModalContent(p);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  const pdfBtn = document.getElementById('pdfDownloadBtn');
  if (pdfBtn) pdfBtn.addEventListener('click', () => generateProductPDF(p));
}

/* ── PDF Specsheet (HTML → canvas → PDF, кирилл бичгийг зөв дэмжинэ) ── */
function generateProductPDF(p) {
  const btn = document.getElementById('pdfDownloadBtn');
  const originalLabel = btn ? btn.innerHTML : '';
  if (btn) { btn.innerHTML = 'PDF бэлдэж байна...'; btn.disabled = true; }

  // Хэвлэх загвар HTML-ийг далд контейнерт үүсгэнэ
  const sheet = document.createElement('div');
  sheet.id = 'pdfSheetTemplate';
  sheet.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;background:#fff;font-family:"DM Sans",Arial,sans-serif;color:#1A1916;';

  const specsHtml = (p.specs && p.specs.length)
    ? `<div style="margin-top:28px;">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:#A5A39E;margin-bottom:12px;">ТЕХНИКИЙН ҮЗҮҮЛЭЛТ</div>
        ${p.specs.map(s => `
          <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #F0EEE9;font-size:13px;">
            <span style="color:#A5A39E;">${s.label}</span>
            <span style="color:#1A1916;font-weight:600;">${s.value}</span>
          </div>
        `).join('')}
      </div>`
    : '';

  const imgBlockHtml = p.image
    ? `<div style="width:100%;height:280px;background:#F5F3EE;border-radius:8px;overflow:hidden;margin-bottom:24px;display:flex;align-items:center;justify-content:center;">
        <img id="pdfSheetImg" src="${p.image}" style="max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;display:block;" />
      </div>`
    : '';

  sheet.innerHTML = `
    <div style="padding:0;">
      <div style="background:#1A1916;padding:14px 40px;display:flex;justify-content:space-between;align-items:center;">
        <img id="pdfSheetLogo" src="medicont/images/medicontlogo.png" style="height:26px;width:auto;display:block;" />
        <span style="color:#999;font-size:11px;">e-catalogue</span>
      </div>
      <div style="padding:36px 40px 40px;">
        ${imgBlockHtml}
        <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:#999;margin-bottom:10px;">${(getCatLabel(p.category) || '').toUpperCase()}</div>
        <div style="font-size:26px;font-weight:700;color:#1A1916;line-height:1.2;margin-bottom:20px;">${p.name}</div>
        <div style="height:1px;background:#E4E1DA;margin-bottom:22px;"></div>

        <div style="display:flex;gap:32px;margin-bottom:24px;">
          <div style="flex:1;">
            <div style="font-size:10px;color:#A5A39E;font-weight:700;letter-spacing:0.06em;margin-bottom:5px;">КОД</div>
            <div style="font-size:14px;font-weight:700;color:#1A1916;">${p.code}</div>
          </div>
          <div style="flex:1;">
            <div style="font-size:10px;color:#A5A39E;font-weight:700;letter-spacing:0.06em;margin-bottom:5px;">ГАРАЛ ҮҮСЭЛ</div>
            <div style="font-size:14px;font-weight:700;color:#1A1916;">${p.origin}</div>
          </div>
          <div style="flex:1;">
            <div style="font-size:10px;color:#A5A39E;font-weight:700;letter-spacing:0.06em;margin-bottom:5px;">ХЭМЖЭЭ</div>
            <div style="font-size:14px;font-weight:700;color:#1A1916;">${p.size}</div>
          </div>
        </div>

        <div style="height:1px;background:#E4E1DA;margin-bottom:24px;"></div>

        <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:#999;margin-bottom:10px;">ТАЙЛБАР</div>
        <div style="font-size:13.5px;color:#3C3A36;line-height:1.7;">${p.description || ''}</div>

        ${specsHtml}

        <div style="height:1px;background:#E4E1DA;margin-top:32px;margin-bottom:14px;"></div>
        <div style="display:flex;justify-content:space-between;font-size:10.5px;color:#A5A39E;">
          <span>Medicont — Эмнэлгийн хэрэгслийн каталог</span>
          <span>${new Date().toLocaleDateString('mn-MN')}</span>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(sheet);

  function waitForImage(img) {
    return new Promise(resolve => {
      if (!img) { resolve(); return; }
      if (img.complete && img.naturalWidth > 0) { resolve(); return; }
      img.addEventListener('load', resolve);
      img.addEventListener('error', () => {
        const wrap = img.closest('div');
        if (wrap && img.id === 'pdfSheetImg') wrap.remove();
        resolve();
      });
      setTimeout(resolve, 4000);
    });
  }

  function renderCanvasAndSave() {
    html2canvas(sheet, { scale: 2, backgroundColor: '#ffffff' }).then(canvas => {
      const { jsPDF } = window.jspdf;
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
      const pageW = 210;
      const pageH = 297;
      const imgW = pageW;
      const imgH = (canvas.height * imgW) / canvas.width;

      if (imgH <= pageH) {
        pdf.addImage(imgData, 'PNG', 0, 0, imgW, imgH);
      } else {
        let heightLeft = imgH;
        let position = 0;
        pdf.addImage(imgData, 'PNG', 0, position, imgW, imgH);
        heightLeft -= pageH;
        while (heightLeft > 0) {
          position = heightLeft - imgH;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgW, imgH);
          heightLeft -= pageH;
        }
      }

      const safeFileName = p.code ? p.code.replace(/[^a-zA-Z0-9-_]/g, '') : 'specsheet';
      pdf.save(`${safeFileName}-specsheet.pdf`);

      sheet.remove();
      if (btn) { btn.innerHTML = originalLabel; btn.disabled = false; }
    }).catch(() => {
      sheet.remove();
      if (btn) { btn.innerHTML = originalLabel; btn.disabled = false; }
    });
  }

  const logoImg    = document.getElementById('pdfSheetLogo');
  const productImg = document.getElementById('pdfSheetImg');
  Promise.all([waitForImage(logoImg), waitForImage(productImg)]).then(renderCanvasAndSave);
}
function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

/* ── Mobile drawer ── */
const drawer        = document.getElementById('drawer');
const drawerOverlay  = document.getElementById('drawerOverlay');
const openDrawerBtn  = document.getElementById('openDrawer');
const drawerSearch   = document.getElementById('drawerSearchInput');
const drawerCatsEl   = document.getElementById('drawerCats');

function openDrawer() {
  drawer.classList.add('open');
  drawerOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  drawer.classList.remove('open');
  drawerOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
if (openDrawerBtn) openDrawerBtn.addEventListener('click', openDrawer);
drawerOverlay.addEventListener('click', closeDrawer);
const drawerCloseBtn = document.getElementById('drawerCloseBtn');
if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);

/* ── Build filter tabs (desktop) + drawer cats (mobile) ── */
const tabsEl = document.getElementById('filterTabs');

function setActiveCategory(id) {
  activeCategory = id;
  // Desktop tabs
  tabsEl.querySelectorAll('.filter-tab').forEach(b => b.classList.toggle('active', b.dataset.cat === id));
  // Drawer items
  drawerCatsEl.querySelectorAll('.drawer-cat-item').forEach(b => b.classList.toggle('active', b.dataset.cat === id));
  render();
}

CATEGORIES.forEach(cat => {
  // Desktop tab
  const btn = document.createElement('button');
  btn.className = 'filter-tab' + (cat.id === 'all' ? ' active' : '');
  btn.textContent = cat.label;
  btn.dataset.cat = cat.id;
  btn.addEventListener('click', () => setActiveCategory(cat.id));
  tabsEl.appendChild(btn);

  // Drawer item with count
  const count = cat.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat.id).length;
  const item = document.createElement('div');
  item.className = 'drawer-cat-item' + (cat.id === 'all' ? ' active' : '');
  item.dataset.cat = cat.id;
  item.innerHTML = `
    <div class="drawer-cat-icon">${CAT_ICONS[cat.id] || ICONS.dot}</div>
    <span class="drawer-cat-label">${cat.label}</span>
    <span class="drawer-cat-count">${count}</span>
  `;
  item.addEventListener('click', () => {
    setActiveCategory(cat.id);
    setTimeout(closeDrawer, 280);
  });
  drawerCatsEl.appendChild(item);
});

/* ── Search (desktop + drawer, synced) ── */
const desktopSearch = document.getElementById('searchInput');

function handleSearchInput(value) {
  searchQuery = value.toLowerCase().trim();
  if (desktopSearch && desktopSearch.value !== value) desktopSearch.value = value;
  if (drawerSearch && drawerSearch.value !== value) drawerSearch.value = value;
  render();
}

if (desktopSearch) desktopSearch.addEventListener('input', e => handleSearchInput(e.target.value));
if (drawerSearch)  drawerSearch.addEventListener('input', e => handleSearchInput(e.target.value));

/* ── Render ── */
function render() {
  const grid  = document.getElementById('cardsGrid');
  const empty = document.getElementById('emptyState');
  grid.innerHTML = '';

  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const q = searchQuery;
    const matchSearch = !q ||
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.origin.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    empty.classList.add('visible');
  } else {
    empty.classList.remove('visible');
    filtered.forEach((p, i) => {
      const card = buildCard(p);
      card.style.animationDelay = `${i * 0.04}s`;
      grid.appendChild(card);
    });
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeDrawer();
  }
});

/* ── Theme toggle ── */
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('medicont_theme', isDark ? 'dark' : 'light');
  });
}

render();