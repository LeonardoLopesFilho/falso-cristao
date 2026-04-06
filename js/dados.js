/* ===========================================
   DADOS.JS — Banco de dados interno (localStorage)
   Todas as notícias ficam aqui, sem API externa.
   =========================================== */

// ---- NOTÍCIAS PADRÃO (hardcoded) ----
// Se o localStorage estiver vazio, usa esses dados iniciais.
const NOTICIAS_PADRAO = [
    {
        id: "n1",
        titulo: 'O "Padrinho" Preso com o PT',
        categoria: "Histórico do Partido",
        resumo: 'Valdemar Costa Neto, dono do PL, foi <strong>condenado e preso no Mensalão</strong> por vender apoio ao governo Lula. É este o partido que diz combater a corrupção?',
        link: "https://g1.globo.com/politica/mensalao/noticia/2013/11/valdemar-costa-neto-se-entrega-a-policia-federal.html",
        fonte: "G1",
        severidade: "critico",
        filtro: "corrupcao",
        icone: "fas fa-landmark",
        tags: "Mensalão, PL",
        ano: "2012",
        timeline_titulo: "Mensalão — Valdemar Condenado",
        timeline_desc: "O dono do PL é condenado e preso por compra de votos no escândalo do Mensalão do PT.",
        ordem: 1
    },
    {
        id: "n2",
        titulo: 'A "Abin Paralela" da Família',
        categoria: "Uso da Máquina",
        resumo: 'A PF confirmou que a inteligência do Estado foi <strong>usada ilegalmente</strong> para produzir relatórios de defesa para Flávio Bolsonaro. Espionagem estatal a serviço da família.',
        link: "https://g1.globo.com/politica/noticia/2024/07/11/abin-paralela-entenda-o-caso.ghtml",
        fonte: "G1",
        severidade: "critico",
        filtro: "poder",
        icone: "fas fa-user-secret",
        tags: "Espionagem, Abin",
        ano: "2024",
        timeline_titulo: "Abin Paralela Revelada",
        timeline_desc: "PF confirma uso ilegal da inteligência do Estado para proteger a família Bolsonaro.",
        ordem: 5
    },
    {
        id: "n3",
        titulo: "O Fim da Lava Jato por Decreto",
        categoria: "Combate à Corrupção",
        resumo: 'Para proteger o "pescoço" da família, os Bolsonaro articularam o <strong>desmonte da Lava Jato</strong> com a nomeação de Augusto Aras como PGR.',
        link: "https://www.cnnbrasil.com.br/politica/entenda-como-a-lava-jato-chegou-ao-fim/",
        fonte: "CNN Brasil",
        severidade: "grave",
        filtro: "justica",
        icone: "fas fa-gavel",
        tags: "Lava Jato, PGR",
        ano: "2019",
        timeline_titulo: "Lava Jato Desmontada",
        timeline_desc: "Nomeação de Augusto Aras como PGR marca o início do desmonte sistemático da operação.",
        ordem: 3
    },
    {
        id: "n4",
        titulo: "Blindagem no Caso Rachadinhas",
        categoria: "Justiça Pessoal",
        resumo: 'Flávio Bolsonaro <strong>anulou provas e quebras de sigilo no STJ</strong> através de manobras técnicas, evitando o julgamento do crime de peculato.',
        link: "https://g1.globo.com/politica/noticia/2021/06/22/stj-forma-maioria-para-anular-decisoes-do-caso-flavio-bolsonaro.ghtml",
        fonte: "G1",
        severidade: "critico",
        filtro: "justica",
        icone: "fas fa-shield-alt",
        tags: "Rachadinha, STJ",
        ano: "2021",
        timeline_titulo: "STJ Anula Provas",
        timeline_desc: "Flávio consegue anular quebras de sigilo e provas no caso das rachadinhas no STJ.",
        ordem: 4
    },
    {
        id: "n5",
        titulo: 'Negociações com o "Inimigo"',
        categoria: "Bastidores do STF",
        resumo: 'Em março/2026, Flávio <strong>buscou o STF para negociar</strong> a domiciliar do pai, enquanto mantinha discurso público de ataque ao tribunal. Hipocrisia dupla.',
        link: "https://veja.abril.com.br/coluna/radar/flavio-bolsonaro-procura-moraes-para-negociar-prisao-domiciliar-do-pai",
        fonte: "VEJA",
        severidade: "grave",
        filtro: "hipocrisia",
        icone: "fas fa-theater-masks",
        tags: "Hipocrisia, STF",
        ano: "Mar/2026",
        timeline_titulo: "Negociação Secreta com STF",
        timeline_desc: "Flávio procura Moraes nos bastidores enquanto ataca o tribunal publicamente.",
        ordem: 7
    },
    {
        id: "n6",
        titulo: 'Propina no Partido do "Capitão"',
        categoria: "Corrupção no PL",
        resumo: 'Em março/2026, deputados do PL foram <strong>condenados por cobrar propina</strong> em emendas parlamentares. O partido da "nova política" repete os velhos vícios.',
        link: "https://agenciabrasil.ebc.com.br/justica/noticia/2025-08/stf-condena-ex-deputado-josimar-maranhaoziho-por-corrupcao",
        fonte: "Agência Brasil",
        severidade: "critico",
        filtro: "corrupcao",
        icone: "fas fa-hand-holding-usd",
        tags: "Propina, Emendas",
        ano: "Mar/2026",
        timeline_titulo: "PL Condenado por Propina",
        timeline_desc: "Deputados do PL são condenados pelo STF por cobrar propina em emendas parlamentares.",
        ordem: 8
    },
    {
        id: "n7",
        titulo: "Aliança com o PT contra Mulheres",
        categoria: "Direitos Sociais",
        resumo: 'Flávio votou <strong>junto com o PT para "desidratar"</strong> a lei da misoginia, tornando-a vaga para proteger aliados de processos por discurso de ódio contra mulheres.',
        link: "https://g1.globo.com/politica/noticia/2025/03/26/senado-conclui-votacao-do-projeto-que-criminaliza-a-misoginia.ghtml",
        fonte: "G1",
        severidade: "grave",
        filtro: "hipocrisia",
        icone: "fas fa-venus",
        tags: "PT + PL, Misoginia",
        ano: "Mar/2026",
        timeline_titulo: "Aliança contra Mulheres",
        timeline_desc: "Flávio vota com PT para enfraquecer lei contra misoginia.",
        ordem: 9
    },
    {
        id: "n8",
        titulo: "Ouro Ilegal e Armas",
        categoria: "Crimes Comuns",
        resumo: 'Valdemar Costa Neto foi <strong>preso em 2024 com pepita de ouro de garimpo ilegal</strong> e arma sem registro durante buscas da PF. O "padrinho" do PL é reincidente.',
        link: "https://agenciabrasil.ebc.com.br/geral/noticia/2024-05/pf-prende-valdemar-costa-neto-presidente-do-pl",
        fonte: "Agência Brasil",
        severidade: "critico",
        filtro: "corrupcao",
        icone: "fas fa-exclamation-circle",
        tags: "Garimpo, Arma ilegal",
        ano: "2024",
        timeline_titulo: "Valdemar Preso — De Novo",
        timeline_desc: "O presidente do PL é flagrado com ouro ilegal e arma sem registro.",
        ordem: 6
    }
];

// ---- STORAGE KEY ----
const STORAGE_KEY = 'noticias_falso_presidente';

// ---- FUNÇÕES DO "BANCO" ----

/** Retorna todas as notícias (localStorage ou padrão) */
function getNoticias() {
    const salvas = localStorage.getItem(STORAGE_KEY);
    if (salvas) {
        try {
            return JSON.parse(salvas);
        } catch (e) {
            return [...NOTICIAS_PADRAO];
        }
    }
    // Primeira vez: salva as padrão no storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(NOTICIAS_PADRAO));
    return [...NOTICIAS_PADRAO];
}

/** Salva a lista inteira no localStorage */
function salvarNoticias(lista) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

/** Adicionar uma notícia */
function adicionarNoticia(noticia) {
    const lista = getNoticias();
    noticia.id = 'n' + Date.now();
    lista.push(noticia);
    salvarNoticias(lista);
    return noticia;
}

/** Atualizar notícia por ID */
function atualizarNoticia(id, dados) {
    const lista = getNoticias();
    const idx = lista.findIndex(n => n.id === id);
    if (idx === -1) return null;
    lista[idx] = { ...lista[idx], ...dados, id: id };
    salvarNoticias(lista);
    return lista[idx];
}

/** Excluir notícia por ID */
function excluirNoticia(id) {
    let lista = getNoticias();
    lista = lista.filter(n => n.id !== id);
    salvarNoticias(lista);
}

/** Resetar para as notícias padrão */
function resetarNoticias() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(NOTICIAS_PADRAO));
}

/** Gerar ID simples */
function gerarId() {
    return 'n' + Date.now() + Math.random().toString(36).substr(2, 4);
}
