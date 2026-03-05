# CACA — Centro Académico Clínico dos Açores

> **Landing page interativa e dinâmica** do Centro Académico Clínico dos Açores, desenvolvida com HTML5, CSS3 e JavaScript.

**Projeto TE2** | Tecnologias Web 2025/2026 | Universidade dos Açores — Licenciatura em Informática

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
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

A landing page apresenta as áreas de investigação, parceiros institucionais, oportunidades e meios de contacto do CACA, com um design moderno, responsivo e acessível.

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
├── index.html              # Página principal (HTML5 semântico)
├── css/
│   └── style.css           # Estilos completos (sistema de design, responsividade)
├── js/
│   ├── carousel.js         # Módulo do carrossel hero (autoplay, navegação, indicadores)
│   ├── forms.js            # Módulo de validação de formulários (newsletter + contacto)
│   ├── events.js           # Módulo de gestão de eventos (scroll, menu, tilt, toast)
│   ├── animations.js       # Módulo de animações GSAP + ScrollTrigger
│   ├── chart.js            # Módulo do gráfico D3.js (barras horizontais)
│   └── enhancements.js     # Módulo de melhorias (dark mode, contadores, typing, loading)
├── img/                    # Imagens e logótipos
│   ├── CACA_full.png       # Logótipo principal do CACA
│   ├── CACA_full.svg       # Logótipo em SVG
│   ├── caption.png         # Imagem hero 1
│   ├── caption2.jpg        # Imagem hero 2
│   ├── caption3.jpg        # Imagem hero 3
│   ├── logo_UAc.png        # Logótipo da Universidade dos Açores
│   ├── açor.PNG            # Logótipo do Governo dos Açores
│   └── HDES.png            # Logótipo do HDES
└── README.md               # Documentação do projeto
```

### Arquitetura modular

O código JavaScript está organizado em **6 módulos independentes**, cada um encapsulado numa IIFE (_Immediately Invoked Function Expression_) para evitar poluição do escopo global:

| Módulo | Responsabilidade |
|---|---|
| `carousel.js` | Carrossel de imagens no hero com autoplay, setas, indicadores e teclado |
| `forms.js` | Validação de formulários, feedback visual e simulação de submissão |
| `events.js` | Header fixo, menu mobile, scroll-to-top, "Saber Mais", hover 3D, toast |
| `animations.js` | Animações com GSAP/ScrollTrigger e fallback com IntersectionObserver |
| `chart.js` | Gráfico D3.js de barras horizontais com animação e interatividade |
| `enhancements.js` | Modo escuro, contadores animados, efeito typewriter, loading overlay |

---

## Funcionalidades

### Formulários e Validação

A página contém **dois formulários** com validação completa do lado do cliente:

#### 1. Formulário de Newsletter
- **Campos**: Nome Completo, E-mail, Área de Interesse (select)
- **Validação**: Nome com mín. 2 caracteres, formato de e-mail, seleção obrigatória
- **Feedback**: Bordas verdes (sucesso) / vermelhas (erro), mensagens de erro contextuais
- **Submissão simulada**: Estado de carregamento + mensagem de confirmação

#### 2. Formulário de Contacto
- **Campos**: Nome Completo, E-mail, Assunto (select), Mensagem (textarea)
- **Validação**: Mesmas regras + mensagem com mín. 10 caracteres
- **Feedback**: Idêntico ao formulário de newsletter

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
- **Dados**: Projetos por área de investigação (e-Saúde, IA, Telemedicina, etc.)
- **Acionamento**: Animação ao scroll (IntersectionObserver) — as barras crescem progressivamente com delay escalonado
- **Interatividade**: Tooltip com informações ao hover, efeito de expansão nas barras
- **Relevância**: Contextualiza visualmente a atividade de investigação do CACA

#### Animação 2 — GSAP ScrollTrigger (Animações de secção)
- **Tipo**: Animações de entrada/revelação acionadas por scroll
- **Elementos animados**: Cards de missão (fade-up escalonado), cards de investigação (fade-up), parceiros (fade-in), oportunidades (slide-in lateral), contactos (slide-in esquerda/direita), títulos (fade-up)
- **Parallax**: Efeito parallax subtil no hero ao fazer scroll
- **Relevância**: Melhora a perceção de profundidade e guia o olhar do utilizador pelas secções

#### Animações adicionais (CSS + JavaScript)
- Hero: Entrada escalonada do título + efeito **typewriter** no subtítulo com cursor animado
- Carrossel: Ken Burns effect (zoom subtil) nas imagens
- Cards: Efeito de tilt 3D ao hover nos cards de investigação
- Barra de progresso do carrossel com gradiente animado
- Botão scroll-to-top com animação de entrada/saída
- Ripple effect nos cards de oportunidades
- **Contadores animados** (count-up) na secção de estatísticas
- **Loading overlay** com spinner ao carregar a página

### Gestão de Eventos

A página implementa **mais de 6 tipos de eventos** JavaScript distintos:

| # | Evento | Descrição |
|---|---|---|
| 1 | **Scroll — Header** | O header muda de aparência ao ultrapassar 50px de scroll |
| 2 | **Scroll — Scroll-to-top** | Botão aparece após 400px e faz scroll suave até ao topo |
| 3 | **Click — "Saber Mais"** | Botão que revela conteúdo adicional na secção de Missão |
| 4 | **Mousemove — Tilt 3D** | Efeito de inclinação 3D nos cards de investigação (segue o cursor) |
| 5 | **Click — Ripple** | Efeito visual de onda nos cards de oportunidades |
| 6 | **Click — Menu hamburger** | Abre/fecha o menu de navegação em dispositivos móveis |
| 7 | **Keyboard — Escape** | Fecha o menu mobile ao pressionar Escape |
| 8 | **Keyboard — Setas** | Navegação no carrossel com setas do teclado |
| 9 | **Click/Hover — Carrossel** | Navegação manual e pausa do autoplay ao hover |
| 10 | **Scroll — Navegação ativa** | IntersectionObserver destaca o link da secção visível |
| 11 | **Submit — Formulários** | Validação e feedback ao submeter formulários |
| 12 | **Click — Modo Escuro** | Toggle entre tema claro e escuro com persistência em localStorage |
| 13 | **Scroll — Contadores** | Animação count-up ao entrar no viewport (IntersectionObserver) |

---

## Acessibilidade

A landing page segue as boas práticas de acessibilidade:

- **HTML semântico**: Utilização de `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>` com atributos `role`
- **ARIA**: Atributos `aria-label`, `aria-expanded`, `aria-hidden`, `aria-selected`, `aria-required`, `aria-invalid`, `aria-live`, `aria-controls`
- **Navegação por teclado**: Formulários, carrossel (setas), menu (Escape), botão "Saber Mais" (Enter/Space)
- **Skip to content**: Link de salto para o conteúdo principal, visível ao focar com Tab
- **Focus visible**: Indicador visual personalizado para foco por teclado (`:focus-visible`)
- **Texto alternativo**: Todas as imagens possuem atributos `alt` descritivos
- **Contraste**: Cores verificadas para garantir contraste adequado
- **`prefers-reduced-motion`**: Respeita as preferências do utilizador para desativar animações
- **Responsividade**: Design adaptado a dispositivos móveis, tablets e desktop
- **Meta tags Open Graph**: Tags para partilha otimizada em redes sociais
- **Favicon**: Ícone personalizado no separador do browser

---

## Design e Identidade Visual

### Paleta de cores

| Cor | Código | Utilização |
|---|---|---|
| Azul CACA | `#061d60` | Cor principal, header, títulos |
| Azul Claro | `#1e56d0` | Acentos, links |
| Verde Saúde | `#2ecc71` | Botões, destaques, gradientes |
| Cinza | `#f8f9fc` | Fundos alternados |
| Branco | `#ffffff` | Fundos, texto sobre escuro |

### Tipografia

- **Família**: Inter (Google Fonts)
- **Pesos**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

### Estilo

- Design limpo e moderno com glassmorphism no header
- Cards com bordas subtis e box-shadow progressivo
- Transições suaves com cubic-bezier personalizadas
- Gradientes lineares contextuais
- Sistema de design com variáveis CSS (`:root`)

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
