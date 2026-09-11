import { Check, Compass } from 'lucide-react';
import { delivery, official, pricing, productTabs, quizMoments, toolNames, type ProductTab } from '../data/content';
import { ResetMark } from './Brand';
import CheckoutLink from './CheckoutLink';

export default function ProductDetails({ tab }: { tab: ProductTab }) {
  const product = productTabs.find((item) => item.id === tab)!;

  return (
    <div className="legal-content product-details">
      <ResetMark />
      <p className="eyebrow">POR DENTRO DO KIT RESET • DE {pricing.anchor} POR {pricing.price}</p>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      {tab === 'home' && <>
        <h4>O que te trouxe até aqui?</h4>
        <ul className="details-list">{quizMoments.map((moment) => <li key={moment}><Check size={16} /><span>{moment}</span></li>)}</ul>
        <div className="details-example"><Compass size={24} strokeWidth={1.4} /><div><p className="eyebrow">EXEMPLO PUBLICADO NO SITE</p><h4>Marina: fim de um relacionamento</h4><p>Comece pela Matriz da Queda. Separe fato, interpretação e o próximo passo possível.</p></div></div>
        <p>Refaça o quiz sempre que um novo momento difícil aparecer. Aqui você conhece o fluxo; as respostas e ferramentas ficam no app adquirido.</p>
        <h4>Um lembrete no seu horário</h4>
        <p>A tela inicial permite ativar um lembrete diário e testar o aviso. O recurso depende das permissões do navegador e de o app estar aberto ou minimizado. No iPhone, o app recomenda adicioná-lo à tela de início.</p>
        <h4>Seu progresso vai com você</h4>
        <p>Perfil, leitura, ferramentas e diário ficam salvos no navegador. Use &quot;Exportar meus dados&quot; para guardar um backup JSON e &quot;Importar dados&quot; para levá-lo a outro dispositivo. A importação substitui os registros atuais e pede confirmação.</p>
      </>}
      {tab === 'journal' && <>
        <h4>Escrita livre, sem formulário obrigatório</h4>
        <p>O Diário é um espaço separado dos capítulos e das ferramentas. Escreva o que quiser e escolha, se fizer sentido, um registro de como você está naquele momento.</p>
        <h4>Volte às suas notas</h4>
        <p>Os registros têm data e podem ser editados ou excluídos. A exclusão pede confirmação. As notas ficam no navegador, e o backup do app permite guardá-las ou transferi-las manualmente.</p>
        <p>As reflexões estruturadas pertencem às ferramentas e à leitura. A prévia não coleta nem salva anotações pessoais.</p>
      </>}
      {tab === 'tools' && <>
        <h4>O que está incluído</h4>
        <ul className="details-list">{toolNames.map((tool) => <li key={tool}><Check size={16} /><span>{tool}</span></li>)}</ul>
        <p>Preencha apenas o essencial. As ferramentas com mais campos deixam parte deles recolhida, para você abrir quando fizer sentido. O app também indica quais ferramentas já têm informações preenchidas.</p>
        <p>O salvamento é automático e local, no navegador em que você usa o aplicativo. O Diário é um espaço livre separado dessas práticas.</p>
      </>}
      {tab === 'plan' && <>
        <h4>Um cronograma por semanas — 15 minutos por dia</h4>
        <p>Na primeira semana, reconheça a queda e comece a estabilizar. Nas semanas 2 e 3, trabalhe suas bases. Ao final da terceira semana, repita a Escala de Prontidão e escolha um hábito, se estiver pronto. Na quarta, sustente esse hábito, revise e retome quando necessário. Tudo cabe em 15 minutos por dia.</p>
        <h4>Uma falha não apaga o caminho</h4>
        <p>O cronograma tem marcações por etapa, não uma cobrança de completar cada data. Se a escala indicar que você precisa de mais tempo, repita a fase. Os {official.planDays} dias estabelecem bases, não prometem uma reconstrução completa.</p>
      </>}
      {tab === 'book' && <>
        <h4>O mesmo método em dois formatos</h4>
        <p>O livro completo tem {official.bookChapters} capítulos em {official.bookParts} partes, além de prefácio e introdução. O PDF traz o mesmo conteúdo do app, em outro formato para consulta offline ou impressão.</p>
        <h4>Encontre e retome a leitura</h4>
        <p>Busque por capítulo ou palavra-chave, navegue entre os capítulos e marque o que já leu. As ferramentas relacionadas à leitura podem ser acessadas diretamente no aplicativo.</p>
        <p>A narrativa de Marcelo, usada como estudo de caso, é uma composição de situações e conversas, conforme explicado na introdução. Não é um depoimento de cliente.</p>
        <h4>Comece pelo app, se preferir</h4>
        <p>Você não precisa terminar o livro antes de agir. O quiz já sugere por onde começar, e a leitura fica como complemento para aprofundar o seu processo.</p>
      </>}
      <div className="details-purchase">
        <div className="offer-anchor-breakdown" style={{ marginBottom: 16 }}>
          <p className="offer-breakdown-title">Ancoragem — tudo isso por {pricing.price}:</p>
          <ul className="offer-breakdown-list">
            {pricing.breakdown.map((item) => (
              <li key={item.name}>
                <span><strong>{item.name}</strong><small>{item.detail}</small></span>
                <s>{item.formatted}</s>
              </li>
            ))}
            <li className="offer-breakdown-total">
              <span><strong>Total ancorado</strong></span>
              <s>{pricing.anchor}</s>
            </li>
          </ul>
          <p className="offer-breakdown-call">Tudo por <strong>{pricing.price} à vista</strong> • {pricing.installments.label} no cartão</p>
        </div>
        <CheckoutLink>Quero o Kit RESET por {pricing.price}</CheckoutLink>
        <p>De {pricing.anchor} por {pricing.price} • {pricing.installments.label} (total {pricing.installments.totalParcelado}) <br />{pricing.parcelNote} • Acesso vitalício • Garantia de {official.guaranteeDays} dias • Economize {pricing.economy}.</p>
        <p>{delivery.summary} O aplicativo não exige login nem senha.</p>
      </div>
      <p className="details-disclaimer">{official.disclaimer}</p>
    </div>
  );
}
