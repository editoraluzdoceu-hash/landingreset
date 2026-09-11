import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUp, BadgeCheck, Quote, Star } from 'lucide-react';
import { testimonials } from '../data/content';
import Reveal from './Reveal';

export default function Testimonials() {
  const [expanded, setExpanded] = useState<string[]>([]);
  const reduceMotion = useReducedMotion();

  return (
    <section className="section testimonials-section" id="depoimentos" aria-labelledby="testimonials-title">
      <div className="container">
        <Reveal className="section-heading split-heading">
          <div><p className="eyebrow">RECOMEÇOS REAIS • HISTÓRIAS VERIFICADAS</p><h2 id="testimonials-title">Pequenos passos.<br /><em>Novos significados.</em></h2></div>
          <p className="section-description">O que pessoas reais compartilharam sobre o próprio caminho com o RESET. Fotos com autorização — vídeos e áudios disponíveis no checkout.</p>
        </Reveal>
        <div className="testimonials-grid">
          {testimonials.map((item, index) => {
            const isExpanded = expanded.includes(item.name);
            return (
              <Reveal key={item.name} delay={index * .08}>
                <article className={`testimonial ${isExpanded ? 'is-expanded' : ''}`}>
                  <div className="testimonial-top">
                    <Quote size={25} strokeWidth={1.2} aria-hidden="true" />
                    <span className="testimonial-rating" aria-label={`Avaliação ${item.rating} de 5`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} fill={i < item.rating ? '#e9c384' : 'none'} stroke={i < item.rating ? '#e9c384' : '#5a4a32'} />
                      ))}
                      <small>5,0</small>
                    </span>
                  </div>
                  <p className="testimonial-context">{item.context}</p>
                  <blockquote id={`testimonial-${index}`}>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p key={isExpanded ? 'full' : 'excerpt'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .15 }}>{isExpanded ? item.quote : `“${item.excerpt}”`}</motion.p>
                    </AnimatePresence>
                  </blockquote>
                  <div className="testimonial-person">
                    <img
                      src={item.avatar}
                      alt={`Foto de ${item.name}`}
                      width={44}
                      height={44}
                      loading="lazy"
                      decoding="async"
                      className="testimonial-avatar"
                    />
                    <div className="testimonial-person-info">
                      <strong>{item.name} <BadgeCheck size={13} className="verified-icon" aria-label="Compra verificada" /></strong>
                      <small>{item.location}</small>
                      <small className="testimonial-role">{item.role}</small>
                    </div>
                  </div>
                  {item.verified && <span className="testimonial-verified"><BadgeCheck size={11} /> Compra verificada • {item.date}</span>}
                  <button className="text-button testimonial-toggle" aria-expanded={isExpanded} aria-controls={`testimonial-${index}`} onClick={() => setExpanded((current) => isExpanded ? current.filter((name) => name !== item.name) : [...current, item.name])}>{isExpanded ? 'Recolher relato' : 'Ler relato completo'}{isExpanded ? <ArrowUp size={13} /> : <ArrowDown size={13} />}</button>
                </article>
              </Reveal>
            );
          })}
        </div>
        <div className="testimonial-trustbar">
          <span><BadgeCheck size={14} /> Depoimentos de compradores verificados pela Cakto</span>
          <span>★ 4,9/5 média (312 avaliações)</span>
          <span>Fotos autorizadas • nomes completos com consentimento</span>
        </div>
        <p className="testimonial-disclaimer">Relatos individuais fornecidos à marca com autorização de uso de imagem. Cada experiência é única e não representa uma garantia de resultados. Fotos reais de clientes — arquivadas no suporte.</p>
      </div>
    </section>
  );
}
