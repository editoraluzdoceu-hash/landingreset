import { AnimatePresence } from 'motion/react';
import { ArrowUpRight, BookOpen, LifeBuoy, LockKeyhole } from 'lucide-react';
import { appSupport, delivery, formattedPrice, founder, official, pricing, type ProductTab } from '../data/content';
import Dialog from './Dialog';
import ProductDetails from './ProductDetails';
import CheckoutLink from './CheckoutLink';
import { ResetMark } from './Brand';

export type SiteDialogKind = 'product' | 'author' | 'privacy' | 'terms' | 'access' | 'support' | null;

const titles = {
  product: 'Conheça o Kit RESET',
  author: 'A história de Lucas, no prefácio do Método RESET',
  privacy: 'Privacidade nesta página',
  terms: 'Condições de compra e entrega',
  access: 'Compra e entrega pela Cakto',
  support: 'Contatos de apoio e emergência',
};

interface SiteDialogsProps {
  active: SiteDialogKind;
  detailTab: ProductTab;
  onClose: () => void;
  onShowDetails: (tab: ProductTab) => void;
}

export default function SiteDialogs({ active, detailTab, onClose, onShowDetails }: SiteDialogsProps) {
  return (
    <AnimatePresence>
      {active && <Dialog key="reset-site-dialog" title={titles[active]} wide={active === 'author'} onClose={onClose}>
        {active === 'product' && <ProductDetails tab={detailTab} />}
        {active === 'author' && <div className="legal-content author-reading">
          <ResetMark /><p className="eyebrow">PREFÁCIO DO LIVRO MÉTODO RESET</p>
          <h3>O caminho que desenhei<br /><em>enquanto o atravessava.</em></h3>
          <p className="author-reading-intro">{founder.quote}</p>
          {founder.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 50)}>{paragraph}</p>)}
          <p className="author-reading-signature">{founder.name}</p>
          <p className="legal-note">Relato do autor, conforme o prefácio fornecido. As referências de tempo pertencem à época da escrita. O RESET é um recurso educativo, não um tratamento de saúde.</p>
        </div>}
        {active === 'privacy' && <div className="legal-content">
          <ResetMark /><p className="eyebrow">COM TRANSPARÊNCIA</p><h3>Seu espaço.<br /><em>Seus dados.</em></h3>
          <p>Esta página apresenta o Método RESET e não solicita nome, e-mail, anotações ou dados de pagamento. A prévia utiliza dados de exemplo; sua navegação e a busca ficam apenas nesta sessão.</p>
          <h4>Compra em ambiente externo</h4><p>Os botões de compra abrem o checkout da Cakto. Os dados informados durante a compra são tratados pela plataforma, conforme os avisos e as condições apresentados lá.</p>
          <h4>Entrega exclusivamente pela Cakto</h4><p>{delivery.instructions} O aplicativo não possui login ou senha.</p>
          <h4>Progresso no aplicativo</h4><p>Perfil, ferramentas preenchidas, capítulos lidos e diário ficam no armazenamento local do navegador em que o app é utilizado. Não há sincronização automática. Em dispositivos compartilhados, quem usa o mesmo navegador pode visualizar esses registros.</p>
          <h4>Guarde seu backup com cuidado</h4><p>O app permite exportar e importar um arquivo JSON com seus registros. Ele contém dados pessoais e deve ser guardado em local seguro. A importação substitui os dados existentes e pede confirmação. A prévia desta página não faz essas operações.</p>
          <h4>Recursos desta página</h4><p>Não utilizamos analytics nem publicidade nesta versão. As fontes são carregadas pelo Google Fonts, que recebe os dados técnicos de conexão necessários para entregar os arquivos. As imagens de ambientação são representações visuais; as telas interativas são adaptações da interface do produto.</p>
        </div>}
        {active === 'terms' && <div className="legal-content">
          <ResetMark /><p className="eyebrow">AS CONDIÇÕES DO RESET • OFERTA DE LANÇAMENTO</p><h3>De {pricing.anchor} por {formattedPrice}<br /><em>— {pricing.discountPercent}% OFF hoje.</em></h3>
          <p>O Kit RESET inclui tudo abaixo. Valor ancorado somado: {pricing.anchor}.</p>
          <ul className="details-list">
            {pricing.breakdown.map((item) => (
              <li key={item.name}><strong>{item.name}</strong> — {item.detail} <span style={{ marginLeft: 'auto', opacity: .7 }}><s>{item.formatted}</s></span></li>
            ))}
          </ul>
          <p><strong>{pricing.finalCall}</strong> — à vista no PIX ({formattedPrice}) ou {pricing.installments.label} no cartão (total {pricing.installments.totalParcelado}). {pricing.parcelNote}</p>
          <h4>Entrega e acesso vitalício</h4><p>{delivery.instructions}</p><p>{delivery.appUsage}</p>
          <h4>Parcelamento cobrado pela Cakto</h4><p>A Cakto processa o pagamento. O parcelamento tem acréscimo da operadora. Valor à vista no PIX: {formattedPrice}. Valor parcelado: {pricing.installments.label} (total {pricing.installments.totalParcelado}). Sem mensalidade, sem assinatura.</p>
          <h4>Garantia de {official.guaranteeDays} dias</h4><p>Conheça o app, use as ferramentas e comece o plano. Se perceber que não é para você, solicite reembolso em até 7 dias, sem precisar justificar, conforme as condições da oferta.</p>
          <h4>Um produto educacional</h4><p>{official.disclaimer} O plano respeita a sua prontidão e não promete uma reconstrução completa em 30 dias. 15 minutos por dia é a média sugerida para organizar sua vida; avance no seu ritmo. Lembretes dependem das permissões do navegador e de o app permanecer aberto ou minimizado.</p>
          <div className="details-purchase"><CheckoutLink>Ir para o checkout — {formattedPrice}</CheckoutLink><p>De {pricing.anchor} por {formattedPrice} • Economize {pricing.economy} • {pricing.installments.label}</p></div>
        </div>}
        {active === 'access' && <div className="legal-content">
          <ResetMark /><p className="eyebrow">COMPRA E ENTREGA PELA CAKTO</p><h3>Um próximo passo.<br /><em>Sem complicar.</em></h3>
          <p>O Kit RESET custa <s style={{ opacity: .6 }}>{pricing.anchor}</s> <strong>{formattedPrice}</strong> à vista no PIX — tudo isso por {formattedPrice}: Aplicativo ({pricing.breakdown[0].formatted}), Kit Ferramentas ({pricing.breakdown[1].formatted}) e Livro ({pricing.breakdown[2].formatted}). No cartão: {pricing.installments.label} (total {pricing.installments.totalParcelado}). {pricing.parcelNote} Acesso vitalício e garantia de {official.guaranteeDays} dias. Economize {pricing.economy}.</p>
          <h4>Onde recebo o aplicativo?</h4><p>{delivery.instructions}</p>
          <h4>Sem login ou senha no app</h4><p>{delivery.appUsage}</p>
          <a className="help-option" href={official.checkoutUrl} target="_blank" rel="noopener noreferrer"><LockKeyhole size={20} /><span><strong>Comprar por {formattedPrice} — de {pricing.anchor} por {formattedPrice}</strong><small>Abre em uma nova aba. Ou {pricing.installments.label} no cartão.</small></span><ArrowUpRight size={17} /></a>
          <button className="help-option" onClick={() => onShowDetails('tools')}><BookOpen size={20} /><span><strong>Conferir o que está incluído</strong><small>Conheça as ferramentas antes de comprar.</small></span><ArrowUpRight size={17} /></button>
          <h4>Já comprou?</h4><p>{delivery.returningBuyer}</p>
          <p className="legal-note">{official.disclaimer}</p>
        </div>}
        {active === 'support' && <div className="legal-content support-content">
          <LifeBuoy /><p className="eyebrow">OS CONTATOS DO SOS DO APP</p><h3>Você não precisa<br /><em>passar por isso só.</em></h3>
          <p>Se estiver difícil demais, ou houver risco à sua segurança, o aplicativo não é suficiente. Buscar ajuda profissional é importante. Os contatos abaixo atendem no Brasil.</p>
          <h4>Apoio emocional: CVV</h4><p>Apoio gratuito e sigiloso pelo telefone 188, disponível 24 horas. O chat tem horários próprios, informados no site do CVV.</p>
          <div className="support-actions"><a className="button button-primary" href={appSupport.cvvPhone}>Ligar para 188</a><a className="button button-outline" href={appSupport.cvvChat} target="_blank" rel="noopener noreferrer">Chat do CVV <ArrowUpRight size={15} /><span className="sr-only">Abre em uma nova aba.</span></a></div>
          <h4>Risco imediato à vida</h4><p>Em emergência médica, procure o SAMU. Em emergência de segurança, contate a Polícia. Fora do Brasil, procure o serviço de emergência da sua região.</p>
          <div className="support-actions"><a className="button button-outline" href={appSupport.samu}>SAMU: 192</a><a className="button button-outline" href={appSupport.police}>Polícia: 190</a></div>
          <p className="legal-note">{official.disclaimer}</p>
        </div>}
      </Dialog>}
    </AnimatePresence>
  );
}
