/* ===========================================
   ADMIN.JS — Painel administrativo
   100% localStorage — sem API, sem banco
   =========================================== */

const SENHA_ADMIN = 'brasil2026';
let editandoId = null;
let excluindoId = null;

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// ============================================
// LOGIN
// ============================================
function checarLogin() {
    if (sessionStorage.getItem('admin_logado') === 'sim') {
        mostrarAdmin();
    }
}

$('#loginForm').addEventListener('submit', e => {
    e.preventDefault();
    if ($('#loginPassword').value === SENHA_ADMIN) {
        sessionStorage.setItem('admin_logado', 'sim');
        mostrarAdmin();
    } else {
        $('#loginError').style.display = 'flex';
        $('#loginPassword').value = '';
        $('#loginPassword').focus();
        setTimeout(() => $('#loginError').style.display = 'none', 3000);
    }
});

$('#logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('admin_logado');
    location.reload();
});

function mostrarAdmin() {
    $('#loginScreen').style.display = 'none';
    $('#adminPanel').style.display = 'flex';
    carregarTabela();
}

// ============================================
// SIDEBAR / NAV
// ============================================
$$('.sidebar-link[data-section]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        $$('.sidebar-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const sec = link.dataset.section;

        $('#secNoticias').style.display = sec === 'noticias' ? 'block' : 'none';
        $('#secPreview').style.display = sec === 'preview' ? 'block' : 'none';
        $('#pageTitle').textContent = sec === 'preview' ? 'Preview do Site' : 'Gerenciar Notícias';

        if (sec === 'preview') {
            $('#previewIframe').src = 'index.html?' + Date.now();
        }
        $('.sidebar').classList.remove('open');
    });
});

$('#sidebarToggle')?.addEventListener('click', () => {
    $('.sidebar').classList.toggle('open');
});

$('#refreshPreview')?.addEventListener('click', () => {
    $('#previewIframe').src = 'index.html?' + Date.now();
});

// ============================================
// TABELA
// ============================================
function carregarTabela() {
    const noticias = getNoticias().sort((a, b) => (a.ordem || 99) - (b.ordem || 99));
    $('#newsCount').textContent = noticias.length + ' notícia' + (noticias.length !== 1 ? 's' : '');
    renderTabela(noticias);
}

function renderTabela(lista) {
    const tbody = $('#newsTableBody');
    const empty = $('#emptyState');

    if (lista.length === 0) {
        tbody.innerHTML = '';
        empty.style.display = 'block';
        return;
    }
    empty.style.display = 'none';

    const filtroNome = { corrupcao: 'Corrupção', justica: 'Justiça', poder: 'Poder', hipocrisia: 'Hipocrisia' };

    tbody.innerHTML = lista.map((n, i) => `
        <tr>
            <td style="color:#666">${i + 1}</td>
            <td><strong>${escHtml(n.titulo)}</strong></td>
            <td style="font-size:0.8rem;color:#999">${escHtml(n.categoria)}</td>
            <td><span class="badge badge-${n.filtro || ''}">${filtroNome[n.filtro] || n.filtro || ''}</span></td>
            <td><span class="badge badge-${n.severidade || ''}">${(n.severidade || '').toUpperCase()}</span></td>
            <td style="color:var(--accent);font-weight:600;font-size:0.85rem">${escHtml(n.ano)}</td>
            <td style="font-size:0.8rem">${escHtml(n.fonte)}</td>
            <td class="link-cell">
                ${n.link ? `<a href="${escHtml(n.link)}" target="_blank"><i class="fas fa-external-link-alt"></i> Fonte</a>` : '—'}
            </td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon edit" title="Editar" onclick="abrirEdicao('${n.id}')">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button class="btn-icon delete" title="Excluir" onclick="abrirExclusao('${n.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function escHtml(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
}

// ============================================
// FILTROS DA TABELA
// ============================================
$('#searchInput').addEventListener('input', filtrar);
$('#filterCategory').addEventListener('change', filtrar);

function filtrar() {
    const busca = $('#searchInput').value.toLowerCase().trim();
    const cat = $('#filterCategory').value;
    let lista = getNoticias().sort((a, b) => (a.ordem || 99) - (b.ordem || 99));

    if (busca) {
        lista = lista.filter(n =>
            (n.titulo || '').toLowerCase().includes(busca) ||
            (n.categoria || '').toLowerCase().includes(busca) ||
            (n.resumo || '').toLowerCase().includes(busca) ||
            (n.fonte || '').toLowerCase().includes(busca) ||
            (n.tags || '').toLowerCase().includes(busca)
        );
    }
    if (cat) {
        lista = lista.filter(n => n.filtro === cat);
    }
    renderTabela(lista);
}

// ============================================
// MODAL: ADICIONAR / EDITAR
// ============================================
$('#addNewsBtn').addEventListener('click', () => abrirModal());
$('#closeModal').addEventListener('click', fecharModal);
$('#cancelBtn').addEventListener('click', fecharModal);
$('#newsModal').addEventListener('click', e => {
    if (e.target === $('#newsModal')) fecharModal();
});

function abrirModal(noticia = null) {
    editandoId = noticia ? noticia.id : null;

    $('#modalTitle').innerHTML = noticia
        ? '<i class="fas fa-edit"></i> Editar Notícia'
        : '<i class="fas fa-plus-circle"></i> Nova Notícia';
    $('#saveLabel').textContent = noticia ? 'Atualizar' : 'Salvar';

    $('#formTitulo').value = noticia?.titulo || '';
    $('#formCategoria').value = noticia?.categoria || '';
    $('#formResumo').value = noticia?.resumo || '';
    $('#formLink').value = noticia?.link || '';
    $('#formFonte').value = noticia?.fonte || '';
    $('#formFiltro').value = noticia?.filtro || '';
    $('#formSeveridade').value = noticia?.severidade || '';
    $('#formAno').value = noticia?.ano || '';
    $('#formOrdem').value = noticia?.ordem || '';
    $('#formIcone').value = noticia?.icone || '';
    $('#formTags').value = noticia?.tags || '';
    $('#formTimelineTitulo').value = noticia?.timeline_titulo || '';
    $('#formTimelineDesc').value = noticia?.timeline_desc || '';

    $('#newsModal').style.display = 'flex';
    setTimeout(() => $('#formTitulo').focus(), 100);
}

function fecharModal() {
    $('#newsModal').style.display = 'none';
    $('#newsForm').reset();
    editandoId = null;
}

function abrirEdicao(id) {
    const n = getNoticias().find(x => x.id === id);
    if (n) abrirModal(n);
}

// ---- SALVAR ----
$('#newsForm').addEventListener('submit', e => {
    e.preventDefault();

    const dados = {
        titulo: $('#formTitulo').value.trim(),
        categoria: $('#formCategoria').value.trim(),
        resumo: $('#formResumo').value.trim(),
        link: $('#formLink').value.trim(),
        fonte: $('#formFonte').value.trim(),
        filtro: $('#formFiltro').value,
        severidade: $('#formSeveridade').value,
        ano: $('#formAno').value.trim(),
        ordem: parseInt($('#formOrdem').value) || 99,
        icone: $('#formIcone').value.trim() || 'fas fa-newspaper',
        tags: $('#formTags').value.trim(),
        timeline_titulo: $('#formTimelineTitulo').value.trim(),
        timeline_desc: $('#formTimelineDesc').value.trim()
    };

    if (editandoId) {
        atualizarNoticia(editandoId, dados);
        toast('Notícia atualizada! ✏️', 'success');
    } else {
        adicionarNoticia(dados);
        toast('Notícia adicionada! ✅', 'success');
    }

    fecharModal();
    carregarTabela();
});

// ============================================
// MODAL: EXCLUIR
// ============================================
function abrirExclusao(id) {
    const n = getNoticias().find(x => x.id === id);
    if (!n) return;
    excluindoId = id;
    $('#deleteTitle').textContent = '"' + n.titulo + '"';
    $('#deleteModal').style.display = 'flex';
}

function closeDeleteModal() {
    $('#deleteModal').style.display = 'none';
    excluindoId = null;
}

$('#deleteModal').addEventListener('click', e => {
    if (e.target === $('#deleteModal')) closeDeleteModal();
});

$('#confirmDeleteBtn').addEventListener('click', () => {
    if (!excluindoId) return;
    excluirNoticia(excluindoId);
    toast('Notícia excluída! 🗑️', 'success');
    closeDeleteModal();
    carregarTabela();
});

// ============================================
// RESET
// ============================================
$('#resetBtn')?.addEventListener('click', () => {
    if (confirm('Tem certeza? Isso vai restaurar as 8 notícias originais e apagar tudo que foi adicionado.')) {
        resetarNoticias();
        toast('Dados restaurados ao original! 🔄', 'success');
        carregarTabela();
    }
});

// ============================================
// TOAST
// ============================================
function toast(msg, tipo = 'success') {
    const el = $('#toast');
    el.className = 'toast ' + tipo;
    el.querySelector('.toast-icon').className = 'toast-icon fas ' + (tipo === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle');
    el.querySelector('.toast-message').textContent = msg;
    el.style.display = 'flex';
    setTimeout(() => el.style.display = 'none', 3000);
}

// ============================================
// ATALHOS
// ============================================
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if ($('#newsModal').style.display === 'flex') fecharModal();
        if ($('#deleteModal').style.display === 'flex') closeDeleteModal();
    }
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        abrirModal();
    }
});

// ============================================
// INIT
// ============================================
checarLogin();
