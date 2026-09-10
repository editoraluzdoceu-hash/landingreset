import { ArrowUpRight } from 'lucide-react';
import { official } from '../data/content';

interface CheckoutLinkProps {
  children?: string;
  className?: string;
}

export default function CheckoutLink({ children = 'Quero descobrir meu próximo passo', className = '' }: CheckoutLinkProps) {
  return (
    <a
      className={`button button-primary ${className}`}
      href={official.checkoutUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>{children}</span>
      <ArrowUpRight size={18} aria-hidden="true" />
      <span className="sr-only">Abre o checkout da Cakto em uma nova aba.</span>
    </a>
  );
}