import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUp, Quote } from 'lucide-react';
import { testimonials } from '../data/content';
import Reveal from './Reveal';

export default function Testimonials() {
  const [expanded, setExpanded] = useState<string[]>([]);
  const reduceMotion = useReducedMotion();

  return (
    <section className="section testimonials-section" id="depoimentos" aria-labelledby="testimonials-title">
      <div className="container">
        <Reveal className="section-heading split-heading">
          <div><p className="eyebrow">RECOMEÇOS REAIS</p><h2 id="testimonials-title">Pequenos passos.<br /><em>Novos significados.</em></h2></div>
          <p className="section-description">O que Thiago, Juliana e Danilo compartilharam sobre o próprio caminho com o RESET.</p>
        </Reveal>
        <div className="testimonials-grid">
          {testimonials.map((item, index) => {
            const isExpanded = expanded.includes(item.name);
            return (
              <Reveal key={item.name} delay={index * .08}>
                <article className={`testimonial ${isExpanded ? 'is-expanded' : ''}`}>
                  <Quote size={25} strokeWidth={1.2} aria-hidden="true" />
                  <p className="testimonial-context">{item.context}</p>
                  <blockquote id={`testimonial-${index}`}>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p key={isExpanded ? 'full' : 'excerpt'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .15 }}>{isExpanded ? item.quote : item.excerpt}</motion.p>
                    </AnimatePresence>
                  </blockquote>
                  <div className="testimonial-person"><span aria-hidden="true">{item.name.charAt(0)}</span><div><strong>{item.name}</strong><small>Relato compartilhado por mensagem</small></div></div>
                  <button className="text-button testimonial-toggle" aria-expanded={isExpanded} aria-controls={`testimonial-${index}`} onClick={() => setExpanded((current) => isExpanded ? current.filter((name) => name !== item.name) : [...current, item.name])}>{isExpanded ? 'Recolher relato' : 'Ler relato completo'}{isExpanded ? <ArrowUp size={13} /> : <ArrowDown size={13} />}</button>
                </article>
              </Reveal>
            );
          })}
        </div>
        <p className="testimonial-disclaimer">Relatos individuais fornecidos à marca. Cada experiência é única e não representa uma garantia de resultados.</p>
      </div>
    </section>
  );
}