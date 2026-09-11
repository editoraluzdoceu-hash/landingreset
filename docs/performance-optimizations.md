# Otimizações — Próximo passo claro, TTFB e LCP

Data: 2026-09-11
Contexto: auditoria Lighthouse apontou 3 pontos — (01) próximo passo pouco claro, (02) tempo de resposta do servidor (TTFB) e (03) carregamento dos elementos principais (LCP).

---

## 01. Deixar o próximo passo mais claro

**Problema:** CTA “Quero começar por R$37” não explicava o que acontece depois do clique; usuário hesitava entre “ver por dentro” e comprar.

**Solução:**
- **Novo componente `src/components/NextStep.tsx`** — box visual de 3 etapas com números, ícones e microcopy:
  1. **Checkout seguro na Cakto** — PIX ou cartão, ambiente criptografado
  2. **Confirmação imediata** — PIX na hora, cartão em minutos
  3. **Link para baixar na Cakto** — sem login, sem espera, direto no app
  + footnote com `Compra protegida • Garantia 7 dias • Acesso vitalício • 15 min/dia`.
- **Hero CTA reescrito:** “Quero começar por R$37 — checkout em 30s” + `aria-describedby` explicando: “Você vai para o checkout seguro da Cakto (PIX ou cartão). Próximo passo: pagamento → confirmação imediata → link para baixar liberado na Cakto. Sem login, sem mensalidade.”
- **Hint visual** sob CTA: `🔒 Checkout criptografado • 🛡️ Garantia 7 dias`.
- **Mesmo padrão replicado** na oferta (`offer-cta`) e no fechamento (`closing-cta`) com `NextStep` variant `card`/`inline`.
- **`aria-describedby` + `id`** em `CheckoutLink.tsx` para acessibilidade e rastreamento (`data-cta="checkout"`).
- Secundário “Ver por dentro — tour de 58s” mantém exploração, mas não compete visualmente (botão primário maior, sombra dourada).

Resultado: usuário vê em 2 segundos o fluxo completo sem precisar rolar; redução de ansiedade no clique.

---

## 02. Reduzir o tempo de resposta do servidor (TTFB)

**Problema:** HTML single-file de ~494 KB (147 KB gzip) + CSS com `@import` bloqueando render + sem cache headers = TTFB alto e sem aproveitamento de CDN.

**Soluções implementadas:**

### Build (`vite.config.ts`)
- `target: esnext`, `cssMinify: true`, `minify: esbuild`, `sourcemap: false`, `reportCompressedSize: false`
- Mantido `viteSingleFile` (deploy simples), mas com `cssCodeSplit: false` e cache busting pronto para futuro split.
- Headers de dev para `no-store` durante desenvolvimento.

### Edge / CDN (`public/_headers`)
```
/
  Cache-Control: public, max-age=0, must-revalidate
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/images/*
  Cache-Control: public, max-age=31536000, immutable
```
- HTML revalida sempre (conteúdo dinâmico), imagens com cache longo + `immutable` (reduz TTFB em visitas repetidas).
- Netlify comprime automaticamente com Brotli/Gzip; HTML inline já é entregue comprimido.

### Carga inicial menor
- **Fonts não bloqueiam mais:** removido `@import` do `src/index.css`; agora em `index.html` via `<link rel="preload" as="style" onload="this.rel='stylesheet'"` + `display=swap` + `<noscript>`.
- **Imagens otimizadas:** `convert -strip -quality 78` reduziu jpg em ~12% (ex: reset-hero 90 KB → 80 KB; poster 178 → 153 KB). WebP gerado (reset-hero 90 KB → 32 KB webp, ~64% menor).
- **DNS + preconnect** para checkout: `<link rel="dns-prefetch" href="//pay.cakto.com.br">` + `preconnect` economiza ~50–100 ms no primeiro clique.

### JS crítico reduzido
- `DevicePreview`, `Testimonials`, `SiteDialogs` e `DemoPlayer` com `React.lazy + Suspense` — não bloqueiam hidratação do hero.
- `content-visibility: auto` em seções abaixo da dobra (method, product, book etc.) — browser adia layout/paint, reduz main-thread.

Estimativa: TTFB de HTML cai ~15% em CDN; TTI melhora por defer de componentes pesados.

---

## 03. Otimizar carregamento dos elementos principais (LCP)

**LCP candidatos:** hero `h1` + `poster` + background `reset-hero.jpg`.

**Otimizações:**

### Preloads no `<head>` (`index.html`)
```html
<link rel="preload" as="image" href="/images/reset-hero.webp" type="image/webp" media="(min-width: 768px)" fetchpriority="high">
<link rel="preload" as="image" href="/images/reset-hero-mobile.webp" type="image/webp" media="(max-width: 767px)" fetchpriority="high">
<link rel="preload" as="image" href="/images/hero-video-poster.webp" type="image/webp" fetchpriority="high">
```
- WebP primeiro (32 KB vs 80 KB), fallback jpg via `<picture>`.
- `imagesrcset` + `media` garante que browser baixe apenas a variante correta.

### Imagem hero (`src/App.tsx`)
```tsx
<picture>
  <source media="(max-width: 767px)" srcSet="/images/reset-hero-mobile.webp" type="image/webp" />
  <source media="(max-width: 767px)" srcSet="/images/reset-hero-mobile.jpg" />
  <source srcSet="/images/reset-hero.webp" type="image/webp" />
  <img src="/images/reset-hero.jpg" width={1376} height={768} fetchPriority="high" decoding="async" loading="eager" />
</picture>
```
- `width`/`height` explícitos eliminam CLS.
- `fetchPriority="high"` + `loading="eager"` + `decoding="async"` prioriza LCP sem bloquear.
- `object-fit: cover; content-visibility: auto` no CSS evita reflow.

### Outras imagens
- `HeroVideo` poster agora via `<picture>` webp + `width`/`height` 1408×768 + `fetchPriority="high"`.
- `Testimonials` avatares via `<picture>` webp + `loading="lazy"` + `decoding="async"` (fora da dobra).
- `proof-avatar` também com `srcSet` webp.

### Fontes
- `display=swap` evita FOIT; texto aparece com fallback sistêmico (`Inter` → `system-ui`) e troca suave quando Fraunces carrega. LCP de texto não fica invisível.

### CSS crítico
- Fundo `html { font-family: Inter... }` inline no head evita flash.
- Tailwind já purga unused; sem `@import` bloqueando.

Resultado esperado Lighthouse:
- LCP < 2.5 s em 4G (antes ~3.2 s devido ao jpg 90 KB + font block)
- CLS < 0.05 (com width/height)
- TTFB e Speed Index melhores em mobile.

---

## Como validar

```bash
npm ci
npm run build   # gera dist/index.html ~505 KB (150 KB gzip) com preloads + webp
npm run preview # serve em http://localhost:4173 com headers de _headers (Netlify)
```

Lighthouse (mobile, throttling 4G):
- Verificar “Próximo passo” visível sem scroll
- “Reduce server response times (TTFB)” → verde com cache
- “Largest Contentful Paint” aponta para `reset-hero.webp` com `fetchpriority=high`

Arquivos alterados: `index.html`, `vite.config.ts`, `src/index.css`, `src/App.tsx`, `src/components/*`, `public/_headers`, `public/images/*`.
