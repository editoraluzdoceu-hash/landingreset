import { lazy, Suspense, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion, type Variants } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Check, Clock3, Leaf, LockKeyhole, Menu, ShieldCheck, Sparkles, Star, X } from 'lucide-react';
import AccordionItem from './components/AccordionItem';
import { Brand, ResetMark } from './components/Brand';
import CheckoutLink from './components/CheckoutLink';
import HeroVideo from './components/HeroVideo';
import NextStep from './components/NextStep';
import Reveal from './components/Reveal';
import { delivery, faqs, formattedPrice, founder, heroContent, howItWorks, offerList, official, pricing, productTabs, toolShowcase, type ProductTab } from './data/content';

// Lazy — abaixo da dobra: reduz JS crítico / TTI e melhora LCP
const DevicePreview = lazy(() => import('./components/DevicePreview'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const SiteDialogs = lazy(() => import('./components/SiteDialogs'));

const navLinks = [
  { href: 'como-funciona', label: 'O método' },
  { href: 'produto', label: 'Por dentro' },
  { href: 'autor', label: 'Quem criou' },
  { href: 'depoimentos', label: 'Depoimentos' },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [menuOpen, setMenuOpen] = useState(false);
  const [methodStep, setMethodStep] = useState<number | null>(0);
  const [productTab, setProductTab] = useState<ProductTab>('home');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [dialog, setDialog] = useState<import('./components/SiteDialogs').SiteDialogKind>(null);
  const [detailTab, setDetailTab] = useState<ProductTab>('home');
  const menuToggle = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const heroItem: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : .85, ease: [.22, 1, .36, 1] } },
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-15% 0px -65% 0px' });
    ['inicio', ...navLinks.map((link) => link.href), 'livro', 'oferta', 'duvidas'].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = window.requestAnimationFrame(() => mobileNav.current?.querySelector<HTMLAnchorElement>('a')?.focus());
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuToggle.current?.focus();
      }
      if (event.key === 'Tab') {
        const links = mobileNav.current?.querySelectorAll<HTMLElement>('a, button');
        const last = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === menuToggle.current) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); menuToggle.current?.focus(); }
      }
    };
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const showDetails = (tab: ProductTab) => { setDetailTab(tab); setDialog('product'); };

  const handleProductKey = (event: KeyboardEvent, index: number) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const count = productTabs.length;
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + count) % count;
    setProductTab(productTabs[next].id);
    document.getElementById(`product-tab-${productTabs[next].id}`)?.focus();
  };

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav-container">
          <Brand onClick={() => setMenuOpen(false)} />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navLinks.map((link) => <a key={link.href} href={`#${link.href}`} aria-current={activeSection === link.href ? 'location' : undefined}>{link.label}</a>)}
          </nav>
          <a className="button button-primary nav-cta" href="#oferta" onClick={() => setMenuOpen(false)}>Começar meu reset <ArrowUpRight size={16} /></a>
          <button ref={menuToggle} className="menu-toggle icon-button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls={menuOpen ? 'mobile-navigation' : undefined} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        <AnimatePresence>
          {menuOpen && <motion.nav ref={mobileNav} id="mobile-navigation" className="mobile-nav" aria-label="Navegação móvel" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: reduceMotion ? 0 : .25 }}>
            <div className="container">
              {navLinks.map((link, index) => <a key={link.href} className="mobile-nav-link" href={`#${link.href}`} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{link.label}<ArrowUpRight size={20} /></a>)}
              <a className="mobile-nav-link" href="#duvidas" onClick={() => setMenuOpen(false)}><span>05</span>Dúvidas frequentes<ArrowUpRight size={20} /></a>
              <a className="button button-primary" href="#oferta" onClick={() => setMenuOpen(false)}>Conhecer o Kit RESET <ArrowRight size={17} /></a>
              <p><s style={{ opacity: .6 }}>{pricing.anchor}</s> por {pricing.price} • {pricing.installments.label} • Acesso vitalício</p>
            </div>
          </motion.nav>}
        </AnimatePresence>
      </header>
      {menuOpen && <button className="mobile-scrim" tabIndex={-1} aria-label="Fechar navegação" onClick={() => setMenuOpen(false)} />}

      <main id="main-content" tabIndex={-1} inert={menuOpen ? true as unknown as boolean : undefined}>
        <section id="inicio" className="hero hero-with-video" aria-labelledby="hero-title">
          <picture className="hero-picture" aria-hidden="true">
            <source media="(max-width: 767px)" srcSet="/images/reset-hero-mobile.webp" type="image/webp" />
            <source media="(max-width: 767px)" srcSet="/images/reset-hero-mobile.jpg" />
            <source srcSet="/images/reset-hero.webp" type="image/webp" />
            <img src="/images/reset-hero.jpg" alt="" width={1376} height={768} fetchPriority="high" decoding="async" loading="eager" />
          </picture>
          <div className="hero-shade" aria-hidden="true" />
          <div className="container hero-inner">
            <motion.div className="hero-copy" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : .11, delayChildren: .1 } } }}>
              <motion.div className="hero-badge" variants={heroItem}>
                <span className="hero-badge-dot" aria-hidden="true" />
                <span>{heroContent.badge}</span>
                <span className="hero-badge-rating" aria-label="Avaliação 4,9 de 5"><Star size={11} fill="#e9c384" stroke="#e9c384" /> 4,9/5 <small>(312 avaliações)</small></span>
              </motion.div>
              <motion.h1 id="hero-title" variants={heroItem}>Método RESET<span>.</span></motion.h1>
              <motion.p className="hero-promise" variants={heroItem}>
                {heroContent.promiseLine1}<br />
                <em>{heroContent.promiseLine2}</em>
              </motion.p>
              <motion.p className="hero-promise-sub" variants={heroItem}>
                {heroContent.promiseEmphasis} <span>{heroContent.subpromise}</span>
              </motion.p>
              <motion.p className="hero-description" variants={heroItem}>{heroContent.description}</motion.p>

              {/* CTA principal — próximo passo explícito */}
              <motion.div className="hero-cta-group" variants={heroItem}>
                <div>
                  <CheckoutLink id="hero-cta" ariaDescribedby="hero-next-step-hint">Quero começar por {pricing.price} — checkout em 30s</CheckoutLink>
                  <p id="hero-next-step-hint" className="hero-cta-clarity">
                    Você vai para o <strong>checkout seguro da Cakto</strong> (PIX ou cartão). <strong>Próximo passo:</strong> pagamento → confirmação imediata → link para baixar liberado na Cakto. Sem login, sem mensalidade.
                  </p>
                  <span className="cta-hint"><LockKeyhole size={11} aria-hidden="true" /> Checkout criptografado • <ShieldCheck size={11} aria-hidden="true" /> Garantia 7 dias</span>
                </div>
                <a className="hero-secondary" href="#produto">Ver por dentro — tour de 58s <ArrowDown size={15} /></a>
              </motion.div>

              <motion.div variants={heroItem}>
                <NextStep />
              </motion.div>

              <motion.div className="hero-trust" variants={heroItem}>
                <span><Clock3 size={13} /> 15 min/dia</span>
                <span><ShieldCheck size={13} /> 7 dias de garantia</span>
                <span><Sparkles size={13} /> Acesso vitalício</span>
              </motion.div>
              <motion.p className="hero-price-line" variants={heroItem}>
                <s>{pricing.anchor}</s> por <strong>{pricing.price}</strong> à vista <span>•</span> {pricing.installments.label} <span>•</span> {pricing.installments.long}
              </motion.p>
              <motion.p className="hero-parcel-note" variants={heroItem}>{pricing.parcelNote}</motion.p>
              <motion.p className="hero-microproof" variants={heroItem}>{heroContent.microProof}</motion.p>
            </motion.div>

            <motion.div className="hero-media" initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 18 }, visible: { opacity: 1, y: 0, transition: { duration: .9, ease: [.22, 1, .36, 1], delay: .35 } } }}>
              <HeroVideo onExplore={() => document.getElementById('produto')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })} onWatchFull={() => showDetails('home')} />
            </motion.div>
          </div>
        </section>

        <section className="proof-section" aria-label="Uma experiência compartilhada com o Método RESET">
          <Reveal className="container proof-inner">
            <img className="proof-avatar" src="/images/testimonials/thiago.webp" srcSet="/images/testimonials/thiago.webp 1x, /images/testimonials/thiago.jpg 1x" alt="Foto de Thiago Martins" width={44} height={44} loading="lazy" decoding="async" />
            <div><blockquote>&ldquo;Pela primeira vez eu não desisti de mim.&rdquo;</blockquote><p>Thiago Martins, 34 anos — Belo Horizonte <span>sobre o Protocolo de Recaída</span></p></div>
            <a href="#depoimentos">Conheça as histórias <ArrowRight size={16} /></a>
          </Reveal>
        </section>

        <section className="section method-section" id="como-funciona" aria-labelledby="method-title">
          <span className="anchor-alias" id="metodo" aria-hidden="true" />
          <div className="container method-layout">
            <Reveal className="method-copy">
              <p className="eyebrow">TALVEZ NÃO FALTE FORÇA. FALTE DIREÇÃO.</p>
              <h2 id="method-title">Menos cobrança.<br /><em>Mais um caminho.</em></h2>
              <p className="section-description">Uma separação, uma perda, uma mudança inesperada. Quando a vida sai do eixo, você não precisa de mais um &ldquo;pensa positivo&rdquo;. Em 15 minutos por dia, o RESET te mostra por onde começar.</p>
              <div className="method-stats">
                <div><strong>15<span>min</span></strong><small>por dia, em média</small></div>
                <div><strong>30<span>dias</span></strong><small>cronograma flexível</small></div>
                <div><strong>1<span>passo</span></strong><small>de cada vez</small></div>
              </div>
              <a className="text-link" href="#produto">Encontre seu ponto de partida <ArrowRight size={16} /></a>
            </Reveal>
            <Reveal className="method-steps" delay={.1}>
              {howItWorks.map((step, index) => <AccordionItem key={step.number} className="method-step" title={step.title} number={step.number} open={methodStep === index} onToggle={() => setMethodStep(methodStep === index ? null : index)}><p>{step.text}</p></AccordionItem>)}
            </Reveal>
          </div>
        </section>

        <section className="section product-section" id="produto" aria-labelledby="product-title">
          <span className="anchor-alias" id="por-dentro" aria-hidden="true" />
          <div className="container product-layout">
            <Reveal className="product-copy">
              <p className="eyebrow">ABRA. ORGANIZE. DÊ O PRIMEIRO PASSO — EM 15 MINUTOS.</p>
              <h2 id="product-title">Um espaço seu.<br /><em>Um pouco de clareza.</em></h2>
              <p className="section-description">O app para os dias em que tudo parece demais. Explore as telas e conheça as ferramentas que acompanham o seu momento. Sem enrolação, direto ao ponto.</p>
              <div className="product-tabs" role="tablist" aria-label="Conheça as áreas do aplicativo" aria-orientation="vertical">
                {productTabs.map((tab, index) => <div key={tab.id} className={`product-tab ${productTab === tab.id ? 'is-active' : ''}`} role="presentation">
                  <button id={`product-tab-${tab.id}`} role="tab" aria-selected={productTab === tab.id} aria-controls="product-preview" tabIndex={productTab === tab.id ? 0 : -1} onKeyDown={(event) => handleProductKey(event, index)} onClick={() => setProductTab(tab.id)}><span className="product-tab-number">0{index + 1}</span><span>{tab.title}</span><ArrowUpRight size={17} /></button>
                  <AnimatePresence initial={false}>{productTab === tab.id && <motion.div className="product-tab-description" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .25 }}><p>{tab.description}</p></motion.div>}</AnimatePresence>
                </div>)}
              </div>
              <button className="text-link" onClick={() => showDetails(productTab)}>Conhecer os detalhes <ArrowRight size={16} /></button>
            </Reveal>
            <Reveal className="product-device" delay={.12}>
              <div id="product-preview" role="tabpanel" aria-labelledby={`product-tab-${productTab}`}>
                <Suspense fallback={<div style={{ minHeight: 520, display: 'grid', placeItems: 'center', color: '#a19684', fontSize: 12 }}>Carregando prévia…</div>}>
                  <DevicePreview tab={productTab} onTabChange={setProductTab} onShowDetails={showDetails} onSupport={() => setDialog('support')} />
                </Suspense>
              </div>
            </Reveal>
          </div>
          <div className="container tools-overview">
            <Reveal className="tools-overview-label"><p className="eyebrow">QUANDO VOCÊ PRECISAR, ESTÁ AQUI.</p><p>Menos conteúdo para acumular. Mais ferramentas para usar — todas em até 15 minutos.</p></Reveal>
            <ul className="tools-grid">
              {toolShowcase.map((tool, index) => <li key={tool.name}><Reveal delay={(index % 3) * .06} className="tool-feature"><button onClick={() => showDetails(tool.tab)} aria-label={`Conhecer ${tool.name}`}><h3>{tool.name}</h3><ArrowUpRight size={17} /></button><p>{tool.text}</p></Reveal></li>)}
            </ul>
          </div>
        </section>

        <section className="section book-section" id="livro" aria-labelledby="book-title">
          <div className="container book-layout">
            <Reveal className="book-visual">
              <div className="book-light" aria-hidden="true" />
              <div className="book-object" aria-hidden="true"><div className="book-spine">MÉTODO RESET</div><div className="book-cover"><span className="book-mark">R</span><p className="book-wordmark">MÉTODO<br /><strong>RESET</strong></p><p className="book-subtitle">Como reconstruir sua vida<br />depois que o chão desaparece.</p><div className="book-rule" /><span className="book-author">LUCAS DE FREITAS SOUSA OLIVEIRA</span></div><div className="book-pages" /></div>
              <p className="visual-caption">LIVRO DIGITAL INCLUÍDO NO KIT RESET</p>
            </Reveal>
            <Reveal className="book-copy" delay={.1}>
              <p className="eyebrow">O MESMO MÉTODO. DOIS JEITOS DE SEGUIR.</p>
              <h2 id="book-title">O livro explica.<br /><em>A prática dá direção.</em></h2>
              <p className="section-description">Uma leitura guiada em {official.bookChapters} capítulos e {official.bookParts} partes, com estudo de caso. No app, você encontra as ferramentas para transformar o que leu em um próximo passo — 15 minutos por dia bastam.</p>
              <ul className="book-benefits"><li><Check size={16} />Leia no aplicativo ou consulte o PDF.</li><li><Check size={16} />Retome a leitura de onde parou.</li><li><Check size={16} />Preencha só o que fizer sentido agora.</li></ul>
              <button className="text-link" onClick={() => showDetails('book')}>Conhecer o livro completo <ArrowRight size={16} /></button>
            </Reveal>
          </div>
        </section>

        <section className="concept-section" aria-labelledby="concept-title">
          <Reveal className="container concept-content"><ResetMark /><p className="eyebrow">ESTRUTURA, NÃO UMA PROMESSA DE MILAGRE.</p><h2 id="concept-title">Você não precisa de<br />uma vida nova hoje.<br /><em>Só de um próximo passo.</em></h2><p>Organizar. Entender. Agir. Recomeçar no seu tempo — 15 minutos por dia.</p></Reveal>
        </section>

        <section className="section author-section" id="autor" aria-labelledby="author-title">
          <span className="anchor-alias" id="historia" aria-hidden="true" />
          <div className="container author-layout">
            <Reveal className="author-heading"><p className="eyebrow">ANTES DE SER UM MÉTODO, FOI MEU RECOMEÇO.</p><h2 id="author-title">Eu também precisei<br /><em>encontrar um caminho.</em></h2><blockquote>&ldquo;{founder.quote}&rdquo;</blockquote><div className="author-signature"><span>Lucas</span><div><strong>{founder.name}</strong><small>Autor e criador do Método RESET</small></div></div></Reveal>
            <Reveal className="author-story" delay={.1}>{founder.summary.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}<button className="text-link" onClick={() => setDialog('author')}>Ler minha história completa <ArrowRight size={16} /></button></Reveal>
          </div>
        </section>

        <Suspense fallback={null}>
          <Testimonials />
        </Suspense>

        <section className="section offer-section" id="oferta" aria-labelledby="offer-title">
          <span className="anchor-alias" id="comece" aria-hidden="true" />
          <div className="container offer-layout">
            <Reveal className="offer-copy"><p className="eyebrow">OFERTA DE LANÇAMENTO • VAGAS LIMITADAS</p><h2 id="offer-title">Um investimento<br /><em>no seu recomeço.</em></h2><p className="section-description">O app, o livro e todas as ferramentas do RESET. Acesso vitalício, sem assinatura e sem mensalidade. Organize sua vida em 15 minutos por dia.</p>
            <NextStep variant="card" />
            <div className="offer-guarantee" id="garantia"><ShieldCheck size={32} strokeWidth={1.2} /><div><h3>7 dias para conhecer.<br />Sem pressão para decidir.</h3><p>Experimente o método. Se não fizer sentido para você, solicite o reembolso em até 7 dias, conforme as condições da oferta. Risco zero.</p></div></div><p className="offer-delivery">{delivery.summary}<br />O aplicativo não exige login nem senha.</p></Reveal>
            <Reveal className="offer-card" delay={.12}>
              <div className="offer-card-header">
                <p className="eyebrow">KIT RESET COMPLETO</p>
                <span className="offer-discount-badge">-{pricing.discountPercent}% OFF</span>
              </div>
              <div className="offer-anchor-breakdown" aria-label={`Ancoragem: de ${pricing.anchor} por ${pricing.price}`}>
                <p className="offer-breakdown-title">Se fosse vendido separado:</p>
                <ul className="offer-breakdown-list">
                  {pricing.breakdown.map((item) => (
                    <li key={item.name}>
                      <span><strong>{item.name}</strong><small>{item.detail}</small></span>
                      <s>{item.formatted}</s>
                    </li>
                  ))}
                  <li className="offer-breakdown-total">
                    <span><strong>Valor total</strong><small>Ancoragem</small></span>
                    <s>{pricing.anchor}</s>
                  </li>
                </ul>
                <p className="offer-breakdown-call">Tudo isso hoje por <strong>apenas {pricing.price}</strong> <span>• economize {pricing.economy}</span></p>
              </div>
              <div className="offer-price" role="group" aria-label={`Preço: de ${pricing.anchor} por ${pricing.price}`}>
                <span aria-hidden="true">R$</span><strong aria-hidden="true">{official.price}</strong><span className="sr-only">{formattedPrice}</span>
              </div>
              <p className="offer-payment">À vista no PIX por <strong>{pricing.price}</strong><br /><small>{pricing.installments.long} • total {pricing.installments.totalParcelado} — {pricing.parcelNote} • Acesso vitalício • Sem mensalidade</small></p>
              <p className="offer-perday"><Sparkles size={12} /> {pricing.perDayLine}</p>
              <ul>{offerList.map((item) => <li key={item}><Check size={15} /><span>{item}</span></li>)}</ul>
              <CheckoutLink id="offer-cta" ariaDescribedby="offer-hint">Quero começar meu RESET por {pricing.price} — ir para checkout</CheckoutLink>
              <p id="offer-hint" className="cta-hint" style={{ justifyContent: 'center', marginTop: 8 }}><LockKeyhole size={11} /> Próximo passo: checkout seguro da Cakto • liberação imediata</p>
              <p className="offer-checkout"><LockKeyhole size={12} />Compra segura e entrega pela Cakto.</p>
              <p className="offer-urgency"><Clock3 size={12} /> Oferta de lançamento por tempo limitado. Depois volta a {pricing.anchor}.</p>
            </Reveal>
          </div>
        </section>

        <section className="section faq-section" id="duvidas" aria-labelledby="faq-title">
          <span className="anchor-alias" id="faq" aria-hidden="true" />
          <div className="container faq-layout">
            <Reveal className="faq-heading"><p className="eyebrow">PODE PERGUNTAR</p><h2 id="faq-title">Um pouco mais<br /><em>de clareza.</em></h2><p className="section-description">Recomeçar já traz perguntas suficientes. Vamos simplificar as outras.</p><button className="text-link" onClick={() => setDialog('access')}>Sobre a compra e a entrega <ArrowUpRight size={16} /></button></Reveal>
            <Reveal className="faq-list" delay={.08}>{faqs.map((faq, index) => <AccordionItem key={faq.question} className="faq-item" title={faq.question} open={openFaq === index} onToggle={() => setOpenFaq(openFaq === index ? null : index)}><p>{faq.answer}</p></AccordionItem>)}</Reveal>
          </div>
        </section>

        <section className="closing-section" aria-labelledby="closing-title">
          <Reveal className="container closing-content"><ResetMark /><p className="eyebrow">MÉTODO RESET • 15 MINUTOS POR DIA</p><h2 id="closing-title">Hoje, um passo.<br /><em>O seu próximo começo.</em></h2><p>Você não precisa ver o caminho inteiro para começar a caminhar. Em 15 minutos, você já sai do lugar.</p>
          <div style={{ maxWidth: 420, margin: '18px auto 0', textAlign: 'left' }}><NextStep variant="inline" /></div>
          <CheckoutLink id="closing-cta" ariaDescribedby="closing-hint">Quero descobrir meu próximo passo — {pricing.price} • próximo: checkout</CheckoutLink><p id="closing-hint" className="cta-hint" style={{ justifyContent: 'center' }}><LockKeyhole size={11} /> Checkout seguro Cakto • PIX libera na hora</p><p className="closing-meta">De <s>{pricing.anchor}</s> por {pricing.price} <span aria-hidden="true">·</span> {pricing.installments.label} <span aria-hidden="true">·</span> Pagamento único <span aria-hidden="true">·</span> Garantia de 7 dias</p><p className="closing-parcel-note">{pricing.parcelNote}</p></Reveal>
        </section>
      </main>

      <footer className="site-footer" inert={menuOpen ? true as unknown as boolean : undefined}>
        <div className="container">
          <div className="footer-top"><div className="footer-brand"><Brand /><p>Organize. Entenda. Recomece.<br />15 minutos por dia. Um passo de cada vez.</p></div><div className="footer-links"><h3>Conheça</h3><a href="#como-funciona">O método</a><a href="#produto">Por dentro do app</a><a href="#livro">O livro RESET</a><a href="#autor">Quem criou</a><a href="#depoimentos">Depoimentos</a></div><div className="footer-links"><h3>Comece por aqui</h3><a href="#oferta">O kit completo — de {pricing.anchor} por {pricing.price}</a><a href="#garantia">Garantia de 7 dias</a><a href="#duvidas">Dúvidas frequentes</a><button onClick={() => setDialog('access')}>Compra e entrega</button></div><div className="footer-links"><h3>Com cuidado</h3><button onClick={() => setDialog('privacy')}>Privacidade</button><button onClick={() => setDialog('terms')}>Condições da oferta</button><button onClick={() => setDialog('support')}>Precisa de ajuda agora? <ArrowUpRight size={13} /></button></div></div>
          <div className="footer-disclaimer"><Leaf size={15} strokeWidth={1.3} /><p>{official.disclaimer}</p></div>
          <div className="footer-bottom"><p>&copy; {new Date().getFullYear()} Método RESET. Um recomeço possível. De {pricing.anchor} por {pricing.price} • {pricing.installments.long} — {pricing.parcelNote}</p><a href="#inicio">Voltar ao início <ArrowUp size={13} /></a></div>
        </div>
      </footer>
      <Suspense fallback={null}>
        <SiteDialogs active={dialog} detailTab={detailTab} onClose={() => setDialog(null)} onShowDetails={showDetails} />
      </Suspense>
    </MotionConfig>
  );
}
