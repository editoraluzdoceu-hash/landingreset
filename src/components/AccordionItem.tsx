import { useId, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
  number?: string;
  className?: string;
}

export default function AccordionItem({ title, open, onToggle, children, number, className = '' }: AccordionItemProps) {
  const id = useId();
  const reduceMotion = useReducedMotion();
  return (
    <div className={`accordion-item ${open ? 'is-open' : ''} ${className}`}>
      <h3>
        <button id={`${id}-trigger`} aria-expanded={open} aria-controls={`${id}-content`} onClick={onToggle}>
          {number && <span className="accordion-number" aria-hidden="true">{number}</span>}
          <span className="accordion-title">{title}</span>
          <span className="accordion-symbol" aria-hidden="true">{open ? <Minus size={17} /> : <Plus size={17} />}</span>
        </button>
      </h3>
      <div id={`${id}-content`} role="region" aria-labelledby={`${id}-trigger`} aria-hidden={!open} inert={!open}>
        <AnimatePresence initial={false}>
          {open && <motion.div className="accordion-motion" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .28, ease: [.22, 1, .36, 1] }}><div className="accordion-content">{children}</div></motion.div>}
        </AnimatePresence>
      </div>
    </div>
  );
}