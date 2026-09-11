import { ArrowUpRight } from 'lucide-react';
import { official } from '../data/content';

interface CheckoutLinkProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  ariaDescribedby?: string;
}

export default function CheckoutLink({ children = 'Quero descobrir meu próximo passo', className = '', id, ariaDescribedby }: CheckoutLinkProps) {
  return (
    <a
      id={id}
      className={`button button-primary ${className}`}
      href={official.checkoutUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-describedby={ariaDescribedby}
      data-cta="checkout"
    >
      <span>{children}</span>
      <ArrowUpRight size={18} aria-hidden="true" />
      <span className="sr-only">Abre o checkout seguro da Cakto em uma nova aba. Próximo passo: pagamento e liberação do acesso.</span>
    </a>
  );
}
