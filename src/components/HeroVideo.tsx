import { useEffect, useRef, useState } from 'react';
import { Clock3, Play, ShieldCheck, Sparkles, X } from 'lucide-react';
import DemoPlayer from './DemoPlayer';
import { official, pricing } from '../data/content';

interface HeroVideoProps {
  /** Closes the player and opens the interactive preview section. */
  onExplore?: () => void;
  /** Closes the player and opens the full product details. */
  onWatchFull?: () => void;
}

export default function HeroVideo({ onExplore, onWatchFull }: HeroVideoProps) {
  const [open, setOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const explore = () => {
    setOpen(false);
    onExplore?.();
  };

  return (
    <>
      <div className="hero-video-wrap">
        <div className="hero-video-card" role="group" aria-label="Demonstração guiada do aplicativo RESET">
          <div className="hero-video-badge">
            <span className="hero-video-dot" aria-hidden="true" />
            <span>DEMONSTRAÇÃO GUIADA • 58 SEGUNDOS</span>
            <span className="hero-video-live">▶ 7 ETAPAS</span>
          </div>

          <button
            className="hero-video-frame"
            onClick={() => setOpen(true)}
            aria-label="Assistir a demonstração guiada do Método RESET — abre em janela"
          >
            <img
              src="/images/hero-video-poster.jpg"
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
            />
            <div className="hero-video-overlay" aria-hidden="true" />
            {/* live app UI overlay */}
            <div className="hero-video-ui" aria-hidden="true">
              <div className="hv-ui-top"><span>R</span><span>MÉTODO RESET</span><span>SOS</span></div>
              <div className="hv-ui-card">
                <small>PARA VOCÊ, MARINA</small>
                <strong>Matriz da Queda</strong>
                <p>Separe fato, interpretação e próximo passo</p>
                <span className="hv-ui-progress"><i style={{ width: '68%' }} /></span>
              </div>
              <div className="hv-ui-card hv-small">
                <small>PLANO DE 30 DIAS • SEMANA 1</small>
                <strong>15 min/dia • 1 passo de cada vez</strong>
              </div>
            </div>

            <span className="hero-video-play">
              <span className="hero-video-play-icon"><Play size={22} fill="currentColor" /></span>
              <span className="hero-video-play-label">
                <strong>Ver o app em funcionamento</strong>
                <small>Guia por 7 telas • 58 segundos</small>
              </span>
            </span>

            <span className="hero-video-duration"><Clock3 size={12} /> 0:58</span>
          </button>

          <div className="hero-video-footer">
            <div className="hero-video-trust">
              <span><ShieldCheck size={14} /> Garantia de 7 dias</span>
              <span><Sparkles size={14} /> Acesso imediato</span>
            </div>
            <p className="hero-video-caption">Demonstração navegável da interface real, com dados de exemplo. O link para baixar é entregue somente na Cakto após a compra.</p>
          </div>
        </div>

        <div className="hero-video-price-anchor" aria-label={`Ancoragem detalhada: de ${pricing.anchor} por ${pricing.price}`}>
          <p className="anchor-breakdown-title">Se fosse separado:</p>
          <ul className="anchor-breakdown-list">
            {pricing.breakdown.map((item) => (
              <li key={item.name}>
                <span><strong>{item.name}</strong><small>{item.detail}</small></span>
                <s>{item.formatted}</s>
              </li>
            ))}
            <li className="anchor-total">
              <span>Total</span>
              <s>{pricing.anchor}</s>
            </li>
          </ul>
          <div className="anchor-final">
            <span className="anchor-old">Tudo isso por</span>
            <span className="anchor-current">{pricing.price} <small>à vista no PIX</small></span>
            <span className="anchor-installments">{pricing.installments.long} • total {pricing.installments.totalParcelado}</span>
            <span className="anchor-badge">-{pricing.discountPercent}% HOJE • ECONOMIZE {pricing.economy}</span>
            <small className="anchor-parcel-note">{pricing.parcelNote}</small>
          </div>
        </div>
      </div>

      {open && (
        <div className="hero-video-modal" role="dialog" aria-modal="true" aria-labelledby="hero-video-title">
          <button className="hero-video-scrim" aria-label="Fechar demonstração" tabIndex={-1} onClick={() => setOpen(false)} />
          <div className="hero-video-dialog has-demo">
            <div className="hero-video-dialog-head">
              <div>
                <p className="eyebrow" style={{ marginBottom: 6 }}>DEMONSTRAÇÃO GUIADA DO APLICATIVO</p>
                <h3 id="hero-video-title">O Método RESET em 58 segundos</h3>
                <p>Uma volta completa pela interface: quiz, tela inicial, Matriz da Queda, diário, livro e plano de 30 dias. Toque na tela a qualquer momento para explorar sozinho.</p>
              </div>
              <button ref={closeButton} className="icon-button" aria-label="Fechar demonstração" onClick={() => setOpen(false)}><X size={18} /></button>
            </div>

            <DemoPlayer autoplay onExplore={explore} />

            <div className="hero-video-dialog-footer">
              <span>De {pricing.anchor} por {pricing.price} • {pricing.installments.label} • {pricing.parcelNote}</span>
              <div className="hero-video-dialog-actions">
                <button className="hero-video-quiet" onClick={() => { setOpen(false); onWatchFull?.(); }}>Detalhes completos do kit</button>
                <a href={official.checkoutUrl} target="_blank" rel="noopener noreferrer" className="button button-primary">Quero meu acesso por {pricing.price}</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
