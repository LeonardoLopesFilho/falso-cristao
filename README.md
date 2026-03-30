# 🇧🇷 O Falso Presidente Cristão

Landing page informativa de cunho político para as eleições de 2026, com cores do Brasil (verde, amarelo e azul), expondo inconsistências e escândalos envolvendo Flávio Bolsonaro e o PL. Apresenta Renan Santos (Partido Missão) como alternativa, em uma seção especial com tema **onça-pintada** (amarelo e preto).

## ✅ Funcionalidades Implementadas

### 🏠 Página Principal (`index.html`)
- **Hero Section**: Título impactante com partículas nas cores do Brasil (verde, amarelo, azul), faixa tricolor no topo, contador animado e CTAs
- **Citação de Impacto**: Frase reflexiva com design verde-escuro
- **Seção de Fatos (Dossiê)**: 8 cards de notícias com:
  - Sistema de filtros por categoria (Corrupção, Justiça, Abuso de Poder, Hipocrisia)
  - Indicadores de severidade (Crítico / Grave)
  - Links verificáveis para as fontes originais
  - Faixa tricolor Brasil nos cards (hover)
  - Efeito 3D parallax no hover
- **Linha do Tempo**: Cronologia visual de 2012 a 2026 com gradiente verde→amarelo→azul
- **Seção de Contraste**: Comparação "O que dizem" vs "O que fazem"
- **🐆 Seção Onça — Renan Santos**: Design completamente diferenciado em amarelo/preto com:
  - Grande pergunta "Quem é Renan Santos?" com animação pulsante
  - Background com padrão de manchas de onça
  - Bordas douradas top/bottom
  - 3 destaques do candidato
  - 6 propostas/bandeiras em grid
  - Botões com estilo dourado (YouTube, Instagram, Saiba Mais)
  - Vídeo do YouTube embarcado (entrevista IstoÉ)
- **Compartilhamento**: Botões de share para WhatsApp, Telegram, X (Twitter), Facebook e copiar link
- **Footer**: Aviso legal com cores do Brasil e emoji da bandeira

### 🎨 Design & UX
- **Cores do Brasil** 🇧🇷: Verde (#009739), Amarelo (#FFDF00), Azul (#002776) nas seções principais
- **Tema Onça** 🐆: Amarelo (#FFB800) e Preto (#0D0D0D) exclusivo da seção Renan Santos
- Faixa tricolor (verde-amarelo-azul) no topo do hero
- Design responsivo (mobile, tablet e desktop)
- Animações suaves com AOS (Animate On Scroll)
- Navbar fixa com blur backdrop e indicador de seção ativa
- Menu hamburger para mobile
- Botão "voltar ao topo" verde
- Scrollbar customizada
- Partículas flutuantes tricolores no hero

### 📊 Dados
- Tabela `noticias` com 8 registros de escândalos documentados

## 📁 Estrutura de Arquivos

```
index.html          → Página principal
css/style.css       → Estilos completos (Brasil + Onça + responsivo)
js/main.js          → JavaScript (interatividade, filtros, animações, share)
README.md           → Documentação do projeto
```

## 🔗 URIs e Navegação

| Caminho | Descrição |
|---------|-----------|
| `index.html` | Página principal |
| `index.html#hero` | Seção inicial |
| `index.html#fatos` | Dossiê de notícias com filtros |
| `index.html#timeline` | Linha do tempo dos escândalos |
| `index.html#contraste` | Comparação discurso vs realidade |
| `index.html#alternativa` | 🐆 Seção Onça — Renan Santos |
| `index.html#compartilhe` | Botões de compartilhamento |

## 📰 Notícias / Fontes Incluídas

1. **O "Padrinho" Preso com o PT** — Valdemar Costa Neto no Mensalão (G1)
2. **A "Abin Paralela" da Família** — Espionagem estatal para Flávio (G1)
3. **O Fim da Lava Jato por Decreto** — Desmonte com Augusto Aras (CNN)
4. **Blindagem no Caso Rachadinhas** — Anulação de provas no STJ (G1)
5. **Negociações com o "Inimigo"** — Flávio busca STF nos bastidores (VEJA)
6. **Propina no Partido do "Capitão"** — Deputados do PL condenados (Agência Brasil)
7. **Aliança com o PT contra Mulheres** — Lei da misoginia desidratada (G1)
8. **Ouro Ilegal e Armas** — Valdemar preso novamente (Agência Brasil)

## 🛠 Tecnologias Utilizadas

- **HTML5** — Estrutura semântica
- **CSS3** — Custom properties, Grid, Flexbox, animações, tema duplo (Brasil + Onça)
- **JavaScript** (Vanilla) — Filtros, scroll, partículas, share API
- **AOS** — Animações de scroll (CDN)
- **Font Awesome 6** — Ícones (CDN)
- **Google Fonts** — Inter + Playfair Display (CDN)
- **YouTube Embed** — Vídeo integrado na seção do candidato

## 📋 Próximos Passos

- [ ] Sistema de newsletter para atualizações
- [ ] Seção de vídeos/depoimentos adicionais
- [ ] Painel admin para adicionar novas notícias dinamicamente
- [ ] SEO avançado (Open Graph, Twitter Cards, Schema.org)
- [ ] Contador de visualizações/compartilhamentos
- [ ] Novas notícias conforme forem sendo publicadas
- [ ] Seção de propostas mais detalhadas do Renan Santos
- [ ] Página dedicada à comparação de planos de governo
