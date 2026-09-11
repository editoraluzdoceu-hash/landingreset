import { useState } from 'react';
import { Play, X, Clock3, ShieldCheck, Sparkles } from 'lucide-react';
import { official, pricing } from '../data/content';

interface HeroVideoProps {
  onWatchFull?: () => void;
}

export default function HeroVideo({ onWatchFull }: HeroVideoProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hero-video-wrap">
        <div className="hero-video-card" role="group" aria-label="Vídeo demonstrativo do aplicativo RESET">
          <div className="hero-video-badge">
            <span className="hero-video-dot" aria-hidden="true" />
            <span>VÍDEO DEMONSTRATIVO • 58 SEGUNDOS</span>
            <span className="hero-video-live">▶ AO VIVO NO APP</span>
          </div>

          <button
            className="hero-video-frame"
            onClick={() => setOpen(true)}
            aria-label="Assistir vídeo demonstrativo do Método RESET — abre em janela"
          >
            <img
              src="/images/hero-video-poster.jpg"
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
            />
            <div className="hero-video-overlay" aria-hidden="true" />
            {/* fake app UI overlay */}
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
                <strong>Ver o app por dentro</strong>
                <small>Sem cadastro • Prévia real</small>
              </span>
            </span>

            <span className="hero-video-duration"><Clock3 size={12} /> 0:58</span>
          </button>

          <div className="hero-video-footer">
            <div className="hero-video-trust">
              <span><ShieldCheck size={14} /> Garantia de 7 dias</span>
              <span><Sparkles size={14} /> Acesso imediato</span>
            </div>
            <p className="hero-video-caption">Prévia adaptada do app. O link para baixar é entregue somente na Cakto após a compra.</p>
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
          <button className="hero-video-scrim" aria-label="Fechar vídeo" onClick={() => setOpen(false)} />
          <div className="hero-video-dialog">
            <div className="hero-video-dialog-head">
              <div>
                <p className="eyebrow" style={{ marginBottom: 6 }}>VÍDEO DEMONSTRATIVO</p>
                <h3 id="hero-video-title">Método RESET em 58 segundos</h3>
                <p>Veja como o quiz sugere por onde começar, como a Matriz organiza o caos em 1 folha e como o plano de 30 dias cabe em 15 minutos por dia.</p>
              </div>
              <button className="icon-button" aria-label="Fechar" onClick={() => setOpen(false)}><X size={18} /></button>
            </div>

            <div className="hero-video-player">
              <div className="hero-video-player-placeholder">
                <img src="/images/hero-video-poster.jpg" alt="" aria-hidden="true" />
                <div className="hv-modal-overlay">
                  <p><strong>Prévia interativa disponível na seção “Por dentro”</strong></p>
                  <p>Este vídeo é uma demonstração gravada do app. A prévia navegável logo abaixo permite testar as 5 áreas (Início, Livro, Diário, Ferramentas e Plano) sem instalar nada.</p>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
                    <a href="#produto" className="button button-primary" onClick={() => setOpen(false)}>Explorar a prévia agora</a>
                    <button className="button button-outline" onClick={() => { setOpen(false); onWatchFull?.(); }}>Ver detalhes completos</button>
                  </div>
                  <p style={{ marginTop: 16, fontSize: 11, color: '#a19684' }}>Vídeo ilustrativo. A interface real pode ter pequenas variações. De {pricing.anchor} por {pricing.price} • {pricing.installments.label} — {pricing.parcelNote}</p>
                </div>
              </div>
            </div>

            <div className="hero-video-dialog-footer">
              <span>Oferta: de {pricing.anchor} por {pricing.price} • {pricing.installments.label} • {pricing.parcelNote}</span>
              <a href={official.checkoutUrl} target="_blank" rel="noopener noreferrer" className="button button-primary">Quero meu acesso por {pricing.price}</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
