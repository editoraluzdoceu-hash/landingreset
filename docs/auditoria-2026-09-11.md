# Auditoria da LP — 11/09/2026

Auditoria completa da landing page do Método RESET, executada em browser headless (Chromium 152) sobre o dev server, em **mobile (390×844)**, **tablet (768×1024)** e **desktop (1366×900)**, com verificação programática de geometria (sobreposição real de elementos), console, fluxos interativos e links.

## Bugs encontrados e corrigidos

| # | Bug | Severidade | Correção |
|---|-----|-----------|----------|
| 1 | **Seção "Seu próximo passo" (3 passos) triplicada** — aparecia no hero, na oferta e no fechamento | Alta | Removida do hero e da oferta; mantida **uma única ocorrência na seção final** (closing). Componente `NextStep` simplificado (variant morto removido). |
| 2 | **"Lucas" duplicado na assinatura do autor** — a assinatura exibia "Lucas" manuscrito + "Lucas de Freitas Sousa Oliveira" | Alta | Removido o `<span>Lucas</span>`; fica apenas o nome completo + cargo. |
| 3 | **Foto do autor desalinhada no mobile** — aparecia acima do texto, colada à esquerda | Média | No mobile o texto vem primeiro (heading → história) e a foto fica **centrada abaixo**; em ≥768px o layout lado a lado é preservado. |
| 4 | **Preload do `reset-hero.jpg` disparava warning e download inútil** — o JPG (80 KB) era baixado mesmo com WebP suportado | Média (performance) | Preload do JPG removido do `index.html`; WebPs continuam com preload. |
| 5 | **Foto do autor com 861 KB** (`lucas.jpg` 1024×1536, exibida a no máx. 300 px, sem WebP) | Média (performance) | Redimensionada para 640×800 e convertida: **WebP 38 KB** (com fallback JPG 55 KB) via `<picture>`. Economia de ~94% no peso. |
| 6 | **Sombra do mockup do hero invadia as 3 linhas finais do texto** (preço, parcelamento, micro-prova social) — corrigido no commit anterior (`94e5bbc`) | Alta | `.hero-copy` com `z-index: 2`; sombra `0 18px 50px → 0 14px 30px`; gap do grid `34 → 44px` no mobile. Verificado: z-index ativo, 0 px de sobreposição, gap de 44 px. |

## Verificado e aprovado (sem bugs)

- **Links e CTAs**: 0 âncoras quebradas, 0 IDs duplicados. Todos os CTAs de compra apontam para `https://pay.cakto.com.br/8anjw6z_1076473` com `target="_blank"` + `rel="noopener noreferrer"` (hero, oferta, fechamento + os que abrem em dialogs/modal). **Checkout da Cakto confirmado no ar** (página de pagamento carrega com R$ 37, PIX/cartão/PicPay etc.).
- **Quiz/Diagnóstico** (simulação no preview do app): fluxo completo testado — menu → "Refazer o quiz" → pergunta 1 ("Como podemos te chamar?") → Continuar → pergunta 2 ("O que te trouxe até aqui, Marina?") → Voltar → avançar → "Ver sugestão" → **aterrissa na aba Ferramentas** com a sugestão correta. Demo guiada (modal de 58s): 7 capítulos navegáveis, play/pause, modo livre, retomar e fechar funcionam.
- **Abas do preview do app**: as 5 abas (Início, Livro, Diário, Ferramentas, Plano de 30 dias) trocam conteúdo corretamente, `aria-selected` atualiza, navegação por teclado (setas/Home/End) ativa, sem travamento ou sobreposição.
- **FAQ**: 12 itens abrem/fecham corretamente (accordion animado monta e desmonta, `aria-expanded` alterna). Idem para o accordion do método (4 passos).
- **Responsividade**: medido geometricamente em 3 viewports — **nenhuma sobreposição real** entre header/conteúdo, mockup/texto, oferta/texto ou seções adjacentes; header sticky sempre pintado acima; **sem overflow horizontal** no mobile.
- **Console**: 0 erros JavaScript e 0 pageerrors em produção local (o aviso do preload sumiu com a correção #4; a mensagem do React DevTools só existe em dev).
- **Imagens**: todas carregam (7/7, incluindo lazy abaixo da dobra); webp + fallback jpg com `width`/`height` definidos (sem CLS).
- **Formulários**: a LP não captura e-mail por design (checkout e entrega 100% na Cakto). O único input é a busca do livro no preview — testado e funcionando (filtra títulos, mostra estado vazio).
- **Depoimentos**: expandir/recolher relato funciona; fotos webp carregam.

## Não reproduzido no código atual

- **Botão "Ver Práticas" / oferta sobreposta a texto de fundo**: não existem neste build (busca no DOM = negativa; geometria = 0 px de sobreposição). Eram da **versão antiga publicada no Netlify** (`mreset.netlify.app`), que ainda está no ar com uma LP anterior a todos os PRs recentes. **Ação necessária: publicar novamente o deploy do Netlify a partir do `main` após o merge**, para o site publicado refletir esta versão corrigida.

## Recomendações (fora do escopo do código)

1. **Taxa da Cakto**: o checkout exibe "Taxa de serviço R$ 0,99 — Total R$ 37,99", enquanto a LP promete "R$ 37,00 à vista no PIX". Avaliar ajustar a taxa na Cakto ou o copy da LP para evitar fricção/queixa no checkout.
2. A versão publicada no Netlify está defasada — reimplantar após o merge desta branch.
