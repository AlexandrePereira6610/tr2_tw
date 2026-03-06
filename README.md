# CACA — Centro Académico Clínico dos Açores

> **Landing page interativa e dinâmica** do Centro Académico Clínico dos Açores, desenvolvida com HTML5, CSS3 e JavaScript.

**Projeto TE2** | Tecnologias Web 2025/2026 | Universidade dos Açores — Licenciatura em Informática

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Secções da Página](#secções-da-página)
- [Funcionalidades](#funcionalidades)
  - [Formulários e Validação](#formulários-e-validação)
  - [Animações](#animações)
  - [Gestão de Eventos](#gestão-de-eventos)
- [Acessibilidade](#acessibilidade)
- [Design e Identidade Visual](#design-e-identidade-visual)
- [Como Executar](#como-executar)
- [Equipa](#equipa)

---

## Sobre o Projeto

Este projeto acrescenta funcionalidades **interativas e dinâmicas** à landing page do Centro Académico Clínico dos Açores (CACA), enriquecendo a experiência do utilizador com JavaScript modular, animações contextuais e formulários com validação completa.

A landing page apresenta a missão, áreas de investigação, equipa, parceiros institucionais, testemunhos, oportunidades, notícias, FAQ e meios de contacto do CACA, com um design moderno, responsivo e acessível.

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| **HTML5** | — | Estrutura semântica da página |
| **CSS3** | — | Estilos, animações CSS, design responsivo e sistema de design com variáveis CSS |
| **JavaScript** (ES5+) | — | Interatividade, validação de formulários, gestão de eventos |
| **D3.js** | v7 | Visualização de dados — gráfico de barras das áreas de investigação |
| **GSAP** | v3.12 | Animações avançadas acionadas por scroll (ScrollTrigger) |
| **Google Fonts** | — | Tipografia — família Inter |

### Justificação das bibliotecas

- **D3.js**: Escolhida para a visualização de dados por ser a biblioteca de referência para gráficos interativos na web. Permite criar um gráfico de barras horizontais animado que mostra o número de projetos por área de investigação, com tooltips e efeitos de hover, tornando os dados do CACA mais compreensíveis e envolventes.

- **GSAP (GreenSock Animation Platform)**: Escolhida pelas suas animações de alto desempenho e controlo fino sobre timing e easing. O plugin ScrollTrigger permite acionar animações quando as secções entram no viewport, criando uma experiência de navegação fluida e profissional sem comprometer o desempenho.

---

## Estrutura do Projeto

```
tr2_tw/
├── index.html                        # Página principal (HTML5 semântico)
├── css/
│   ├── style.css                     # Ficheiro principal (importa todos os parciais)
│   ├── base/
│   │   ├── reset.css                 # Reset, variáveis CSS, estilos base
│   │   ├── typography.css            # Tipografia e classes de secção
│   │   └── utilities.css             # Animações, loading, scroll-top, responsivo, acessibilidade
│   ├── components/
│   │   ├── buttons.css               # Estilos de botões
│   │   ├── cards.css                 # Cards reutilizáveis (Bento Box)
│   │   └── forms.css                 # Formulários e validação visual
│   ├── layout/
│   │   ├── header.css                # Header e navegação
│   │   └── footer.css                # Footer
│   └── sections/
│       ├── hero.css                  # Secção Hero
│       ├── stats.css                 # Estatísticas
│       ├── mission.css               # Missão (Bento Box)
│       ├── research.css              # Investigação + Gráfico D3
│       ├── team.css                  # Equipa
│       ├── partners.css              # Parceiros
│       ├── testimonials.css          # Testemunhos
│       ├── opportunities.css         # Oportunidades
│       ├── news.css                  # Notícias e Eventos
│       ├── faq.css                   # FAQ
│       ├── newsletter.css            # Newsletter
│       └── contact.css               # Contactos
├── js/
│   ├── forms.js                      # Validação de formulários (newsletter + contacto)
│   ├── events.js                     # Gestão de eventos (scroll, menu, tilt, toast, FAQ, testemunhos)
│   ├── animations.js                 # Animações GSAP + ScrollTrigger com fallback
│   ├── chart.js                      # Gráfico D3.js (barras horizontais)
│   └── enhancements.js              # Contadores animados, efeito typewriter, loading overlay
├── img/
│   ├── hero/                         # Imagens da galeria hero e backgrounds
│   ├── logos/                        # Logótipos institucionais (CACA, UAc, HDES, Açores)
│   ├── news/                         # Imagens de notícias e newsletter
│   └── team/                         # Fotos da equipa
└── README.md                         # Documentação do projeto
```

### Arquitetura modular

O código está organizado seguindo uma arquitetura modular:

**CSS** — Dividido em **20 ficheiros parciais** organizados em 4 categorias (`base`, `components`, `layout`, `sections`), importados por um ficheiro central `style.css`.

**JavaScript** — **5 módulos independentes**, cada um encapsulado numa IIFE (_Immediately Invoked Function Expression_) para evitar poluição do escopo global:

| Módulo | Responsabilidade |
|---|---|
| `forms.js` | Validação de formulários, feedback visual e simulação de submissão |
| `events.js` | Header fixo, menu mobile, scroll-to-top, hover 3D, ripple, FAQ, testemunhos, toast |
| `animations.js` | Animações com GSAP/ScrollTrigger e fallback com IntersectionObserver |
| `chart.js` | Gráfico D3.js de barras horizontais com animação e interatividade |
| `enhancements.js` | Contadores animados, efeito typewriter, loading overlay |

---

## Secções da Página

A landing page contém **12 secções** completas:

| # | Secção | Descrição |
|---|---|---|
| 1 | **Hero** | Badge, título, subtítulo com efeito typewriter, CTA, logótipos parceiros, galeria de imagens |
| 2 | **Estatísticas** | 4 contadores animados (investigadores, projetos, áreas, parceiros) |
| 3 | **Missão** | Layout Bento Box com cards de excelência clínica, investigação, formação e indicadores |
| 4 | **Investigação** | 3 cards de áreas de investigação com efeito tilt 3D + gráfico D3.js interativo |
| 5 | **Equipa** | 6 cards de membros com foto, cargo, bio e área de especialização |
| 6 | **Parceiros** | Logótipos institucionais (UAc, Governo dos Açores, HDES) com hover effects |
| 7 | **Testemunhos** | Carrossel auto-rotativo com 3 testemunhos e navegação por dots |
| 8 | **Oportunidades** | 3 cards interativos (estágios, projetos, bolsas) com ripple effect |
| 9 | **Notícias** | 3 artigos com imagens, tags (Evento/Notícia/Publicação) e datas |
| 10 | **FAQ** | Accordion com 5 perguntas e respostas (abertura/fecho exclusivo) |
| 11 | **Newsletter** | Formulário de subscrição por e-mail com validação e mensagem de sucesso |
| 12 | **Contactos** | Formulário completo com checkboxes + sidebar com informações de contacto |

---

## Funcionalidades

### Formulários e Validação

A página contém **dois formulários** com validação completa do lado do cliente:

#### 1. Formulário de Newsletter
- **Campos**: E-mail
- **Validação**: Formato de e-mail obrigatório
- **Feedback**: Mensagens de erro contextuais
- **Submissão simulada**: Estado de carregamento + mensagem de confirmação

#### 2. Formulário de Contacto
- **Campos**: Primeiro nome, último nome, e-mail, telefone (com prefixo), mensagem (textarea), checkboxes de assunto/interesse
- **Validação**: Campos obrigatórios com feedback visual
- **Feedback**: Estados de erro e sucesso

**Características comuns:**
- Validação em tempo real ao sair de cada campo (`blur`)
- Limpeza automática de erros ao escrever (`input`)
- Animação de shake no botão ao tentar submeter com erros
- Foco automático no primeiro campo inválido
- Atributos `aria-invalid`, `aria-required`, `role="alert"` para acessibilidade
- Reset automático após 5 segundos da submissão bem-sucedida

### Animações

#### Animação 1 — Gráfico D3.js (Áreas de Investigação)
- **Tipo**: Gráfico de barras horizontais animado
- **Dados**: Projetos por área de investigação (e-Saúde, IA, Telemedicina, Biotech, Epidemiologia, Genómica)
- **Acionamento**: Animação ao scroll (IntersectionObserver) — as barras crescem progressivamente com delay escalonado
- **Interatividade**: Tooltip com informações ao hover, efeito de expansão nas barras
- **Responsividade**: Recria-se automaticamente ao redimensionar a janela (com debounce)

#### Animação 2 — GSAP ScrollTrigger (Animações de secção)
- **Tipo**: Animações de entrada/revelação acionadas por scroll
- **Elementos animados**: Cards de missão (fade-up escalonado), cards de investigação (fade-up), parceiros (fade-in), oportunidades (slide-in lateral), contactos (slide-in esquerda/direita), títulos (fade-up)
- **Fallback**: IntersectionObserver para browsers sem suporte GSAP

#### Animações adicionais (CSS + JavaScript)
- Hero: Entrada escalonada do título + efeito **typewriter** no subtítulo com cursor animado
- Cards: Efeito de **tilt 3D** ao hover nos cards de investigação (segue o cursor)
- Botão scroll-to-top com animação de entrada/saída
- **Ripple effect** nos cards de oportunidades
- **Contadores animados** (count-up) na secção de estatísticas
- **Loading overlay** com spinner ao carregar a página
- **Testemunhos**: Carrossel auto-rotativo com transições suaves

### Gestão de Eventos

A página implementa **mais de 10 tipos de eventos** JavaScript distintos:

| # | Evento | Descrição |
|---|---|---|
| 1 | **Scroll — Header** | O header muda de aparência ao ultrapassar 50px de scroll |
| 2 | **Scroll — Scroll-to-top** | Botão aparece após 400px e faz scroll suave até ao topo |
| 3 | **Click — "Saber Mais"** | Botão que revela conteúdo adicional na secção de Missão |
| 4 | **Mousemove — Tilt 3D** | Efeito de inclinação 3D nos cards de investigação (segue o cursor) |
| 5 | **Click — Ripple** | Efeito visual de onda nos cards de oportunidades |
| 6 | **Click — Menu hamburger** | Abre/fecha o menu de navegação em dispositivos móveis |
| 7 | **Keyboard — Escape** | Fecha o menu mobile ao pressionar Escape |
| 8 | **Click — FAQ Accordion** | Abre/fecha perguntas do FAQ (exclusivo) |
| 9 | **Click — Testemunhos** | Navegação manual do carrossel de testemunhos por dots |
| 10 | **Scroll — Navegação ativa** | IntersectionObserver destaca o link da secção visível |
| 11 | **Submit — Formulários** | Validação e feedback ao submeter formulários |
| 12 | **Scroll — Contadores** | Animação count-up ao entrar no viewport (IntersectionObserver) |
| 13 | **Keyboard — Cards Equipa** | Flip de cards da equipa com Enter/Space |

---

## Acessibilidade

A landing page segue as boas práticas de acessibilidade:

- **HTML semântico**: Utilização de `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>` com atributos `role`
- **ARIA**: Atributos `aria-label`, `aria-expanded`, `aria-hidden`, `aria-selected`, `aria-required`, `aria-invalid`, `aria-live`, `aria-controls`
- **Navegação por teclado**: Formulários, menu (Escape), FAQ (click), equipa (Enter/Space), botão "Saber Mais" (Enter/Space)
- **Skip to content**: Link de salto para o conteúdo principal, visível ao focar com Tab
- **Focus visible**: Indicador visual personalizado para foco por teclado (`:focus-visible`)
- **Texto alternativo**: Todas as imagens possuem atributos `alt` descritivos
- **Contraste**: Cores verificadas para garantir contraste adequado
- **`prefers-reduced-motion`**: Respeita as preferências do utilizador para desativar animações (CSS + JS)
- **Responsividade**: Design adaptado a dispositivos móveis, tablets e desktop
- **Meta tags Open Graph**: Tags para partilha otimizada em redes sociais
- **Favicon**: Ícone personalizado no separador do browser

---

## Design e Identidade Visual

### Paleta de cores

| Cor | Código | Utilização |
|---|---|---|
| Azul CACA | `#061d60` | Cor principal, header, títulos |
| Azul Claro | `#1e56d0` | Acentos, links, botões |
| Verde Saúde | `#2ecc71` | Destaques, indicadores |
| Cinza | `#f8f9fc` | Fundos alternados |
| Branco | `#ffffff` | Fundos, texto sobre escuro |

### Tipografia

- **Família**: Inter (Google Fonts)
- **Pesos**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

### Estilo

- Design limpo e moderno com glassmorphism no header
- Layout Bento Box na secção de Missão
- Cards com bordas subtis e box-shadow progressivo
- Transições suaves com cubic-bezier personalizadas
- Sistema de design com variáveis CSS (`:root`)
- CSS modular dividido em 20 ficheiros organizados

---

## Como Executar

1. Clone ou descarregue o repositório
2. Abra o ficheiro `index.html` num navegador web moderno
3. Não é necessário instalar dependências — as bibliotecas D3.js e GSAP são carregadas via CDN

---

## Equipa

**Grupo 11** — Universidade dos Açores, Licenciatura em Informática

| Membro | Nome |
|---|---|
| 1 | Nelson Pacheco Ponte |
| 2 | Alexandre Raposo Pereira |
| 3 | Samuel Nunes Jorge |

Projeto desenvolvido no âmbito da unidade curricular de **Tecnologias Web**, 2025/2026.
