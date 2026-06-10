/* ── State ── */
let products = JSON.parse(JSON.stringify(PRODUCTS));
let deleteTargetId = null;
let editingId = null;

const catMap = {};
CATEGORIES.forEach(c => catMap[c.id] = c.label);

/* ── Escape helper ── */
function esc(str = '') {
  return String(str).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/* ── Code generator ── */
function generateCode() {
  const specStr = specs => specs && specs.length
    ? `[\n${specs.map(s => `      { label: "${esc(s.label)}", value: "${esc(s.value)}" }`).join(',\n')}\n    ]`
    : '[]';

  const items = products.map(p => `  {
    id: ${p.id},
    name: "${esc(p.name)}",
    code: "${esc(p.code)}",
    size: "${esc(p.size)}",
    origin: "${esc(p.origin)}",
    category: "${esc(p.category)}",
    image: "${esc(p.image || '')}",
    description: "${esc(p.description || '')}",
    specs: ${specStr(p.specs)},
    extraImages: [],
    attachments: []
  }`).join(',\n');

  const cats = CATEGORIES.map(c =>
    `  { id: "${esc(c.id)}", label: "${esc(c.label)}" }`
  ).join(',\n');

  return `var PRODUCTS = [\n${items}\n];\n\nvar CATEGORIES = [\n${cats}\n];\n`;
}

/* ── Copy popup ── */
function showCopyPopup(code) {
  // Байгаа popup байвал хасна
  const existing = document.getElementById('copyPopup');
  if (existing) existing.remove();

  const popup = document.createElement('div');
  popup.id = 'copyPopup';
  popup.innerHTML = `
    <div id="copyPopupInner">
      <div id="copyPopupHead">
        <span>products.js — хуулаад файлд тавина</span>
        <div style="display:flex;gap:8px;">
          <button id="copyPopupBtn">Хуулах</button>
          <button id="copyPopupClose">✕</button>
        </div>
      </div>
      <textarea id="copyPopupText" readonly>${code}</textarea>
    </div>
  `;

  // Styles
  Object.assign(popup.style, {
    position: 'fixed', inset: '0',
    background: 'rgba(15,13,10,0.6)',
    backdropFilter: 'blur(6px)',
    zIndex: '9999',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  });

  const inner = popup.querySelector('#copyPopupInner');
  Object.assign(inner.style, {
    background: '#1A1916',
    borderRadius: '16px',
    width: 'min(700px, 100%)',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
  });

  const head = popup.querySelector('#copyPopupHead');
  Object.assign(head.style, {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 18px',
    borderBottom: '1px solid #333',
    color: '#a8a59f',
    fontSize: '13px',
    flexShrink: '0',
  });

  const textarea = popup.querySelector('#copyPopupText');
  Object.assign(textarea.style, {
    flex: '1',
    background: 'transparent',
    color: '#e8e6e0',
    border: 'none',
    outline: 'none',
    padding: '16px 18px',
    fontSize: '12px',
    fontFamily: "'Courier New', monospace",
    lineHeight: '1.6',
    resize: 'none',
    overflowY: 'auto',
  });

  // Товч styles
  [popup.querySelector('#copyPopupBtn'), popup.querySelector('#copyPopupClose')].forEach(btn => {
    Object.assign(btn.style, {
      padding: '5px 12px',
      borderRadius: '6px',
      border: '1px solid #444',
      background: 'transparent',
      color: '#aaa',
      fontSize: '12px',
      cursor: 'pointer',
      fontFamily: 'inherit',
    });
  });

  document.body.appendChild(popup);

  // Хуулах
  popup.querySelector('#copyPopupBtn').addEventListener('click', () => {
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    try {
      document.execCommand('copy');
      popup.querySelector('#copyPopupBtn').textContent = '✓ Хууллаа';
      setTimeout(() => {
        popup.querySelector('#copyPopupBtn').textContent = 'Хуулах';
      }, 2000);
    } catch {
      // fallback: clipboard API
      navigator.clipboard?.writeText(code);
    }
  });

  // Хаах
  popup.querySelector('#copyPopupClose').addEventListener('click', () => popup.remove());
  popup.addEventListener('click', e => { if (e.target === popup) popup.remove(); });
}

/* ── Toast ── */
function setStatus(msg, type = 'success') {
  let el = document.getElementById('saveStatus');
  if (!el) {
    el = document.createElement('div');
    el.id = 'saveStatus';
    el.style.cssText =
      'position:fixed;bottom:24px;right:24px;padding:12px 20px;border-radius:10px;' +
      'font-size:13px;font-weight:500;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,0.12);' +
      'max-width:320px;line-height:1.5;transition:opacity 0.3s;';
    document.body.appendChild(el);
  }
  const bg = { info: '#1D5FA5', success: '#2A5C45', error: '#991B1B' };
  el.style.background = bg[type] || bg.success;
  el.style.color = '#fff';
  el.style.opacity = '1';
  el.style.display = 'block';
  el.textContent = msg;
  setTimeout(() => { el.style.opacity = '0'; }, 3500);
  setTimeout(() => { el.style.display = 'none'; }, 3900);
}

/* ── Stats ── */
function renderStats() {
  const row = document.getElementById('statsRow');
  const byCat = {};
  CATEGORIES.slice(1).forEach(c => (byCat[c.id] = 0));
  products.forEach(p => { if (byCat[p.category] !== undefined) byCat[p.category]++; });

  let html = `<div class="stat-card"><div class="stat-num">${products.length}</div><div class="stat-label">Нийт бүтээгдэхүүн</div></div>`;
  CATEGORIES.slice(1).forEach(c => {
    html += `<div class="stat-card"><div class="stat-num">${byCat[c.id]}</div><div class="stat-label">${c.label}</div></div>`;
  });
  row.innerHTML = html;
}

/* ── Table ── */
function renderTable() {
  const tbody = document.getElementById('productTbody');
  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--fg-muted)">Бүтээгдэхүүн байхгүй байна</td></tr>`;
    return;
  }
  tbody.innerHTML = products.map(p => `
    <tr>
      <td class="td-name">${p.name}</td>
      <td class="td-code">${p.code}</td>
      <td><span class="td-cat">${catMap[p.category] || p.category}</span></td>
      <td>${p.origin}</td>
      <td>
        <div class="td-actions">
          <button class="btn-edit" data-id="${p.id}">Засах</button>
          <button class="btn-delete" data-id="${p.id}">Устгах</button>
        </div>
      </td>
    </tr>`).join('');

  tbody.querySelectorAll('.btn-edit').forEach(b =>
    b.addEventListener('click', () => openEditModal(+b.dataset.id))
  );
  tbody.querySelectorAll('.btn-delete').forEach(b =>
    b.addEventListener('click', () => openDeleteConfirm(+b.dataset.id))
  );
}

function renderAll() { renderStats(); renderTable(); }

/* ── Category select ── */
function buildCategorySelect() {
  const sel = document.getElementById('fCategory');
  sel.innerHTML = CATEGORIES.slice(1)
    .map(c => `<option value="${c.id}">${c.label}</option>`)
    .join('');
}

/* ── Specs ── */
function addSpecRow(label = '', value = '') {
  const container = document.getElementById('specsContainer');
  const row = document.createElement('div');
  row.className = 'spec-row';
  row.innerHTML = `
    <input type="text" placeholder="Шинж чанар (жш. Чадал)" value="${label}" />
    <input type="text" placeholder="Утга (жш. 40W)" value="${value}" />
    <button type="button" title="Устгах">×</button>
  `;
  row.querySelector('button').addEventListener('click', () => row.remove());
  container.appendChild(row);
}

document.getElementById('addSpecBtn').addEventListener('click', () => addSpecRow());

function getSpecs() {
  const specs = [];
  document.querySelectorAll('.spec-row').forEach(r => {
    const inputs = r.querySelectorAll('input');
    const label = inputs[0].value.trim();
    const value = inputs[1].value.trim();
    if (label && value) specs.push({ label, value });
  });
  return specs;
}

function clearSpecs() { document.getElementById('specsContainer').innerHTML = ''; }

/* ── Modal open / close ── */
const overlay   = document.getElementById('modalOverlay');
const closeBtn  = document.getElementById('modalClose');
const cancelBtn = document.getElementById('cancelBtn');

function openAddModal() {
  editingId = null;
  document.getElementById('modalTitle').textContent = 'Шинэ бүтээгдэхүүн нэмэх';
  document.getElementById('productForm').reset();
  document.getElementById('editId').value = '';
  clearSpecs();
  buildCategorySelect();
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openEditModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  editingId = id;
  document.getElementById('modalTitle').textContent = 'Бүтээгдэхүүн засах';
  document.getElementById('editId').value = id;
  document.getElementById('fName').value        = p.name;
  document.getElementById('fCode').value        = p.code;
  document.getElementById('fSize').value        = p.size;
  document.getElementById('fOrigin').value      = p.origin;
  document.getElementById('fImage').value       = p.image || '';
  document.getElementById('fDescription').value = p.description || '';
  buildCategorySelect();
  document.getElementById('fCategory').value    = p.category;
  clearSpecs();
  (p.specs || []).forEach(s => addSpecRow(s.label, s.value));
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('openAddModal').addEventListener('click', openAddModal);
closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

/* ── Form submit ── */
document.getElementById('productForm').addEventListener('submit', e => {
  e.preventDefault();

  const data = {
    name:        document.getElementById('fName').value.trim(),
    code:        document.getElementById('fCode').value.trim(),
    size:        document.getElementById('fSize').value.trim(),
    origin:      document.getElementById('fOrigin').value.trim(),
    category:    document.getElementById('fCategory').value,
    image:       document.getElementById('fImage').value.trim(),
    description: document.getElementById('fDescription').value.trim(),
    specs:       getSpecs(),
  };

  if (editingId !== null) {
    const idx = products.findIndex(x => x.id === editingId);
    products[idx] = { ...products[idx], ...data };
  } else {
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push({ id: newId, ...data, extraImages: [], attachments: [] });
  }

  closeModal();
  renderAll();
  showCopyPopup(generateCode());
  setStatus('✓ Кодыг хуулаад products.js-д тавина уу', 'success');
});

/* ── Delete ── */
const deleteOverlay    = document.getElementById('deleteOverlay');
const deleteCancelBtn  = document.getElementById('deleteCancelBtn');
const deleteConfirmBtn = document.getElementById('deleteConfirmBtn');

function openDeleteConfirm(id) {
  deleteTargetId = id;
  const p = products.find(x => x.id === id);
  document.getElementById('deleteMsg').textContent =
    `"${p?.name}" бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?`;
  deleteOverlay.classList.add('open');
}

deleteCancelBtn.addEventListener('click', () => deleteOverlay.classList.remove('open'));
deleteOverlay.addEventListener('click', e => {
  if (e.target === deleteOverlay) deleteOverlay.classList.remove('open');
});

deleteConfirmBtn.addEventListener('click', () => {
  products = products.filter(p => p.id !== deleteTargetId);
  deleteOverlay.classList.remove('open');
  renderAll();
  showCopyPopup(generateCode());
  setStatus('✓ Устгагдлаа — кодыг хуулаад products.js-д тавина уу', 'success');
});

/* ── Keyboard ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    overlay.classList.remove('open');
    deleteOverlay.classList.remove('open');
    document.getElementById('copyPopup')?.remove();
    document.body.style.overflow = '';
  }
});

/* ── Init ── */
buildCategorySelect();
renderAll();