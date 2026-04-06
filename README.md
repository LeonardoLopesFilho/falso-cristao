# 🇧🇷 O Falso Presidente Cristão

Landing page política para 2026 com **painel admin integrado**. Zero dependência externa — tudo roda no navegador com **localStorage**.

---

## ✅ Funcionalidades

### 🏠 Site (`index.html`)
- Notícias carregadas dinamicamente do localStorage
- Filtros por categoria (Corrupção, Justiça, Poder, Hipocrisia)
- Linha do tempo gerada automaticamente
- Contadores animados que se atualizam sozinhos
- Seção Renan Santos com tema onça 🐆
- Compartilhamento (WhatsApp, Telegram, X, Facebook)
- 100% responsivo

### 🔐 Admin (`admin.html`)
- **Senha**: `brasil2026`
- ➕ Adicionar notícias novas
- ✏️ Editar notícias existentes
- 🗑️ Excluir notícias
- 🔄 Restaurar dados originais (botão reset)
- 🔍 Busca e filtros na tabela
- 👁️ Preview do site integrado
- ⌨️ Atalhos: `Ctrl+N` (nova), `ESC` (fechar)
- Dados salvos no **localStorage** (sem API, sem banco)

---

## 📁 Arquivos

```
index.html          → Site público
admin.html          → Painel admin (protegido por senha)
css/style.css       → Estilos do site (Brasil + Onça)
css/admin.css       → Estilos do admin
js/dados.js         → "Banco de dados" interno (localStorage + notícias padrão)
js/main.js          → JS do site (renderização dinâmica)
js/admin.js         → JS do admin (CRUD completo)
```

---

## 🔗 Navegação

| URL | Descrição |
|-----|-----------|
| `index.html` | Site principal |
| `index.html#fatos` | Dossiê com filtros |
| `index.html#timeline` | Linha do tempo |
| `index.html#alternativa` | Seção Renan Santos 🐆 |
| `admin.html` | Painel admin (senha: `brasil2026`) |

> Link discreto ⚙ no footer leva ao admin.

---

## 💾 Como funciona o armazenamento

Tudo fica no `js/dados.js`:
- **8 notícias padrão** estão hardcoded no código
- Na primeira visita, são salvas no `localStorage` do navegador
- O admin edita/adiciona/exclui direto no `localStorage`
- O site lê do `localStorage` ao carregar
- Botão 🔄 no admin restaura tudo ao original

**Sem API. Sem banco. Sem servidor. Tudo no navegador.**

---

## 🛠 Tecnologias

HTML5 · CSS3 · JavaScript Vanilla · localStorage · AOS · Font Awesome 6 · Google Fonts · YouTube Embed
