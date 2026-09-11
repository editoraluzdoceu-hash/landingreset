import { Clock3, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react';

/** Box "Seu próximo passo em 3 etapas" — exibido uma única vez, na seção final da página. */
export default function NextStep({ className = '' }: { className?: string }) {
  return (
    <div className={`next-step-box ${className}`} role="group" aria-label="Seu próximo passo em 3 etapas">
      <p className="next-step-eyebrow">SEU PRÓXIMO PASSO — 30 SEGUNDOS</p>
      <ol className="next-step-list">
        <li>
          <span>1</span>
          <div>
            <strong>Checkout seguro na Cakto</strong>
            <small>PIX ou cartão • ambiente criptografado</small>
          </div>
        </li>
        <li>
          <span>2</span>
          <div>
            <strong>Confirmação imediata</strong>
            <small>PIX libera na hora • cartão em minutos</small>
          </div>
        </li>
        <li>
          <span>3</span>
          <div>
            <strong>Link para baixar na Cakto</strong>
            <small>Sem login • sem espera • já no app</small>
          </div>
        </li>
      </ol>
      <p className="next-step-footnote">
        <LockKeyhole size={10} aria-hidden="true" /> Compra protegida
        <span aria-hidden="true" style={{ opacity: 0.4, marginInline: 4 }}>•</span>
        <ShieldCheck size={10} aria-hidden="true" /> Garantia 7 dias
        <span aria-hidden="true" style={{ opacity: 0.4, marginInline: 4 }}>•</span>
        <Sparkles size={10} aria-hidden="true" /> Acesso vitalício
        <span aria-hidden="true" style={{ opacity: 0.4, marginInline: 4 }}>•</span>
        <Clock3 size={10} aria-hidden="true" /> 15 min/dia
      </p>
    </div>
  );
}
