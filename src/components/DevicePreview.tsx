import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, BatteryFull, Bell, BookOpen, CalendarDays, Check, ChevronRight, Compass, Download, Frown, Home, LockKeyhole, Meh, Menu, PenLine, Search, Signal, Smile, Sparkles, Upload, Wifi, X, type LucideIcon } from 'lucide-react';
import { ResetMark } from './Brand';
import { appNavigation, bookPreviewEntries, journey, official, quizMoments, type ProductTab } from '../data/content';
import './DevicePreview.css';

export type PreviewPanel = 'menu' | 'quiz' | null;

interface DevicePreviewProps {
  tab: ProductTab;
  onTabChange: (tab: ProductTab) => void;
  onShowDetails: (tab: ProductTab) => void;
  onSupport: () => void;
  /** When defined, the guided demo overrides the internal panel/quiz state. */
  demoPanel?: PreviewPanel;
  demoQuizStep?: number;
}

const viewIcons: Record<ProductTab, LucideIcon> = {
  home: Home,
  book: BookOpen,
  journal: PenLine,
  tools: Sparkles,
  plan: CalendarDays,
};

const previewTools = [
  { name: 'Matriz da Queda', description: 'Separe fato, interpretação e o próximo passo possível.' },
  { name: 'Escala de Prontidão', description: 'Encontre o ritmo certo para avançar no método.' },
  { name: 'Construtor de Hábito RESET', description: 'Escolha um hábito de cada vez e uma versão mínima viável.' },
  { name: 'Protocolo de Recaída RESET', description: 'Nomeie sem julgar, encontre o gatilho e retome pequeno.' },
];

function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

export default function DevicePreview({ tab, onTabChange, onShowDetails, onSupport, demoPanel, demoQuizStep }: DevicePreviewProps) {
  const [panelState, setPanelState] = useState<PreviewPanel>(null);
  const [quizStepState, setQuizStepState] = useState(0);
  const panel = demoPanel !== undefined ? demoPanel : panelState;
  const quizStep = demoQuizStep !== undefined ? demoQuizStep : quizStepState;
  const [query, setQuery] = useState('');
  const [expandedWeek, setExpandedWeek] = useState<number | null>(0);
  const viewport = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const filteredEntries = bookPreviewEntries.filter((entry) => normalizeSearch(`${entry.group} ${entry.title}`).includes(normalizeSearch(query)));

  useEffect(() => {
    setPanelState(null);
    viewport.current?.scrollTo({ top: 0 });
  }, [tab]);

  const chooseView = (view: ProductTab) => {
    viewport.current?.focus({ preventScroll: true });
    setPanelState(null);
    onTabChange(view);
    viewport.current?.scrollTo({ top: 0 });
  };

  const openQuiz = () => {
    viewport.current?.focus({ preventScroll: true });
    setQuizStepState(0);
    setPanelState('quiz');
    viewport.current?.scrollTo({ top: 0 });
  };

  const changeQuizStep = (step: number) => {
    viewport.current?.focus({ preventScroll: true });
    setQuizStepState(step);
    viewport.current?.scrollTo({ top: 0 });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && panelState) {
      event.stopPropagation();
      setPanelState(null);
      menuButton.current?.focus();
    }
  };

  const viewKey = panel === 'quiz' ? `quiz-${quizStep}` : panel || tab;

  return (
    <div className="device-stage official-device-stage">
      <div className="device-glow" aria-hidden="true" />
      <div className="device-frame official-device-frame">
        <div className="reset-app-preview" onKeyDown={handleKeyDown}>
          <div className="ap-systembar" aria-hidden="true"><span>9:41</span><span className="ap-island" /><span><Signal size={11} /><Wifi size={11} /><BatteryFull size={17} /></span></div>
          <div className="ap-topbar">
            <span><ResetMark />MÉTODO RESET</span>
            <div>
              <button className="ap-sos" onClick={onSupport} aria-label="SOS: contatos de apoio e emergência">SOS</button>
              <button ref={menuButton} className="ap-menu-toggle" onClick={() => { setPanelState(panelState === 'menu' ? null : 'menu'); viewport.current?.scrollTo({ top: 0 }); }} aria-label={panelState === 'menu' ? 'Fechar menu da prévia' : 'Abrir menu da prévia'} aria-expanded={panelState === 'menu'} aria-controls={panelState === 'menu' ? 'app-preview-menu' : undefined}>{panelState === 'menu' ? <X size={18} /> : <Menu size={18} />}</button>
            </div>
          </div>
          <div ref={viewport} className="ap-viewport" role="region" aria-label="Prévia navegável da interface, com dados de exemplo" aria-describedby="app-preview-notice" tabIndex={0}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={viewKey} className="ap-view" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .18 }}>
                {panel === 'menu' && <div className="ap-menu" id="app-preview-menu">
                  <div className="ap-menu-brand"><span className="ap-mark">R</span><div><strong>RESET</strong><small>reconstrução possível</small></div></div>
                  <button className="ap-help-action" onClick={onSupport}>SOS &nbsp; Precisa de ajuda agora?</button>
                  <div className="ap-menu-links" role="group" aria-label="Seções do aplicativo">
                    {appNavigation.map((item) => {
                      const Icon = viewIcons[item.id];
                      return <button key={item.id} className={tab === item.id ? 'active' : ''} onClick={() => chooseView(item.id)} aria-pressed={tab === item.id}><Icon size={17} />{item.label}</button>;
                    })}
                  </div>
                  <div className="ap-menu-footer">
                    <button className="ap-secondary" onClick={openQuiz}><PenLine size={13} />Editar meu perfil</button>
                    <p>Seu progresso fica salvo neste dispositivo.</p>
                    <button className="ap-secondary" onClick={() => onShowDetails('home')} aria-label="Conhecer a exportação de dados do aplicativo"><Download size={13} />Exportar meus dados</button>
                    <button className="ap-secondary" onClick={() => onShowDetails('home')} aria-label="Conhecer a importação de dados do aplicativo"><Upload size={13} />Importar dados</button>
                    <p className="ap-footnote">Na prévia, estas ações mostram como os recursos funcionam.</p>
                  </div>
                </div>}

                {panel === 'quiz' && <div className="ap-quiz-card">
                  <span className="ap-mark">R</span>
                  <div className="ap-quiz-dots" aria-label={`Etapa ${quizStep + 1} de 2`}><span className={quizStep === 0 ? 'active' : ''} /><span className={quizStep === 1 ? 'active' : ''} /></div>
                  {quizStep === 0 ? <>
                    <h3>Bem-vindo(a)<br />ao Método RESET</h3>
                    <p>Duas perguntas rápidas para deixar sua experiência mais direta ao ponto. Leva menos de 30 segundos.</p>
                    <span className="ap-field-label">Como podemos te chamar?</span>
                    <div className="ap-sample-input">Marina<span>EXEMPLO</span></div>
                    <div className="ap-actions"><button className="ap-text-button" onClick={() => chooseView('home')}>Pular</button><button className="ap-primary" onClick={() => changeQuizStep(1)}>Continuar <ArrowRight size={12} /></button></div>
                  </> : <>
                    <h3>O que te trouxe<br />até aqui, Marina?</h3>
                    <p>Isso ajuda a sugerir por onde começar. Você pode mudar isso depois.</p>
                    <div className="ap-motive-list" role="group" aria-label="Exemplo: fim de um relacionamento">
                      {quizMoments.map((moment, index) => <div key={moment} className={index === 1 ? 'selected' : ''}><span>{moment}</span>{index === 1 && <Check size={13} />}</div>)}
                    </div>
                    <div className="ap-actions"><button className="ap-text-button" onClick={() => changeQuizStep(0)}><ArrowLeft size={12} />Voltar</button><button className="ap-primary" onClick={() => chooseView('tools')}>Ver sugestão <ArrowRight size={12} /></button></div>
                  </>}
                  <p className="ap-footnote">Fluxo com dados de exemplo. A prévia não coleta respostas pessoais.</p>
                </div>}

                {!panel && tab === 'home' && <>
                  <div className="ap-welcome">
                    <span className="ap-eyebrow">PARA VOCÊ, MARINA</span>
                    <h3>Fim de um relacionamento</h3>
                    <p>Separe fato, interpretação e o próximo passo possível.</p>
                    <div className="ap-actions"><button className="ap-primary" onClick={() => chooseView('tools')}>Abrir ferramenta sugerida <ArrowRight size={11} /></button><button className="ap-secondary" onClick={openQuiz}>Refazer o quiz</button></div>
                  </div>
                  <div className="ap-home-intro">
                    <span className="ap-eyebrow">BEM-VINDO(A) DE VOLTA, MARINA</span>
                    <h3>Método RESET</h3>
                    <p>Como reconstruir sua vida depois que o chão desaparece: leitura guiada, ferramentas para preencher e um plano de 30 dias.</p>
                    <div className="ap-actions"><button className="ap-primary" onClick={() => chooseView('book')}>Começar a leitura</button><button className="ap-secondary" onClick={() => chooseView('tools')}>Abrir ferramentas</button></div>
                  </div>
                  <div className="ap-format-note"><BookOpen size={13} /><p>O PDF do Método RESET é <strong>o mesmo conteúdo</strong> deste app, em outro formato para consultar offline ou imprimir.</p></div>
                  <div className="ap-metrics" role="group" aria-label="Exemplo de uma jornada ainda não iniciada">
                    <div className="ap-card"><span>Progresso de leitura</span><strong>0%</strong><div className="ap-progress-track" /><small>Sem pressa. Volte quando fizer sentido.</small></div>
                    <div className="ap-card"><span>Capítulos</span><strong>{official.bookChapters}</strong><small>em {official.bookParts} partes</small></div>
                    <div className="ap-card ap-principle"><span>Princípio central</span><p>Reconhecer <ChevronRight size={10} />Estabilizar <ChevronRight size={10} />Sistematizar <ChevronRight size={10} />Executar <ChevronRight size={10} />Transformar</p></div>
                  </div>
                  <div className="ap-card ap-reminder">
                    <h4><Bell size={14} />Lembrete diário</h4>
                    <p>Receba um aviso no horário que escolher para voltar ao método.</p>
                    <div className="ap-reminder-example" role="group" aria-label="Exemplo de configuração: lembrete às 20 horas"><span className="ap-switch" aria-hidden="true" />Ativar lembrete diário<span>20:00</span></div>
                    <button className="ap-quiet" onClick={() => onShowDetails('home')}>Como o lembrete funciona <ChevronRight size={10} /></button>
                  </div>
                </>}

                {!panel && tab === 'book' && <>
                  <div className="ap-section-heading"><span className="ap-eyebrow">BIBLIOTECA</span><h3>Leia no seu ritmo</h3><p>Você pode voltar, marcar capítulos e usar as ferramentas quando fizer sentido.</p></div>
                  <label className="ap-search"><Search size={14} /><span className="sr-only">Buscar nos títulos desta prévia</span><input type="search" placeholder="Buscar capítulo ou palavra-chave..." value={query} onChange={(event) => setQuery(event.target.value)} /></label>
                  <div className="ap-format-note"><BookOpen size={13} /><p>O PDF tem <strong>o mesmo conteúdo</strong> desta leitura, para consultar offline ou imprimir.</p></div>
                  <div className="ap-library" aria-live="polite">
                    {filteredEntries.length ? filteredEntries.map((entry) => <div className="ap-card" key={entry.title}><span className="ap-eyebrow">{entry.group}</span><button onClick={() => onShowDetails('book')} aria-label={`Conhecer a leitura: ${entry.title}`}><span className="ap-chapter-indicator" aria-hidden="true" /><strong>{entry.title}</strong><ChevronRight size={13} /></button></div>) : <p className="ap-empty">Nenhum título encontrado nesta amostra.</p>}
                  </div>
                  <p className="ap-footnote">Amostra de títulos. O kit inclui {official.bookChapters} capítulos em {official.bookParts} partes, além de prefácio e introdução.</p>
                  <button className="ap-primary ap-detail-button" onClick={() => onShowDetails('book')}>Conhecer a leitura completa <ArrowRight size={12} /></button>
                </>}

                {!panel && tab === 'journal' && <>
                  <div className="ap-section-heading"><span className="ap-eyebrow">ESPAÇO LIVRE</span><h3>Diário</h3><p>Escreva o que quiser, sem estrutura. Só para você, separado dos capítulos e ferramentas.</p></div>
                  <div className="ap-card ap-journal">
                    <h4>Nova nota</h4>
                    <p>Como você está agora? <span>(opcional)</span></p>
                    <div className="ap-mood-examples" aria-hidden="true"><span><Frown size={19} /></span><span><Meh size={19} /></span><span><Smile size={19} /></span></div>
                    <div className="ap-display-textarea">O que está passando pela sua cabeça hoje?</div>
                    <div className="ap-journal-example-label"><LockKeyhole size={11} /><span>Prévia sem edição de dados pessoais.</span></div>
                    <button className="ap-primary" onClick={() => onShowDetails('journal')}>Conhecer o diário <ArrowRight size={12} /></button>
                  </div>
                  <div className="ap-journal-note"><PenLine size={16} /><p>No app, suas notas têm data e podem ser editadas ou excluídas. O registro de humor é opcional.</p></div>
                  <p className="ap-footnote">Seus registros ficam no navegador. Você pode guardá-los usando o backup do aplicativo.</p>
                </>}

                {!panel && tab === 'tools' && <>
                  <div className="ap-section-heading"><span className="ap-eyebrow">CADERNO DE PRÁTICA</span><h3>Ferramentas RESET</h3><p>Preencha só o que for útil agora. Tudo fica salvo localmente no navegador.</p></div>
                  <div className="ap-recommendation"><Sparkles size={13} /><p>Sugerida para Marina:<br /><strong>Matriz da Queda</strong></p></div>
                  <div className="ap-tools-list">
                    {previewTools.map((tool) => <div className="ap-card" key={tool.name}><h4>{tool.name}</h4><p>{tool.description}</p><button className="ap-secondary" onClick={() => onShowDetails('tools')} aria-label={`Conhecer as ferramentas, incluindo ${tool.name}`}>Conhecer ferramenta <ArrowRight size={11} /></button></div>)}
                  </div>
                  <button className="ap-primary ap-detail-button" onClick={() => onShowDetails('tools')}>Ver todas as ferramentas do kit <ArrowRight size={12} /></button>
                  <p className="ap-footnote">As ferramentas são educativas e de organização pessoal. Não substituem acompanhamento profissional.</p>
                </>}

                {!panel && tab === 'plan' && <>
                  <div className="ap-section-heading"><span className="ap-eyebrow">PRÓXIMOS PASSOS</span><h3>Plano de 30 dias</h3><p>Uma sequência, não uma corrida. Avance apenas quando sua prontidão indicar.</p></div>
                  <div className="ap-plan-checklist">
                    <h4><Compass size={15} />Cronograma RESET</h4>
                    <p>Use como sequência flexível. Se a escala pedir mais tempo, repita a fase.</p>
                    {journey.map((week, index) => <div className="ap-plan-week" key={week.label}>
                      <button onClick={() => setExpandedWeek(expandedWeek === index ? null : index)} aria-expanded={expandedWeek === index} aria-controls={`preview-week-${index}`}><span><small>{week.label}</small><strong>{week.title}</strong></span><ChevronRight size={13} className={expandedWeek === index ? 'rotated' : ''} /></button>
                      <div id={`preview-week-${index}`} hidden={expandedWeek !== index}><p>{week.text}</p></div>
                    </div>)}
                  </div>
                  <div className="ap-card ap-plan-safety"><h4>Regra de segurança</h4><p>Trinta dias estabelecem bases; não prometem uma reconstrução completa. O ritmo certo é o seu.</p></div>
                  <button className="ap-primary ap-detail-button" onClick={() => onShowDetails('plan')}>Conhecer o plano completo <ArrowRight size={12} /></button>
                </>}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="ap-home-indicator" aria-hidden="true" />
        </div>
      </div>
      <p className="device-caption">INTERFACE DO APP. DADOS DE EXEMPLO.</p>
      <p className="device-access-note" id="app-preview-notice">Prévia adaptada. Link para baixar somente na Cakto, após a compra.</p>
      <div className="app-preview-controls" role="group" aria-label="Escolher tela do aplicativo">
        {appNavigation.map((item) => <button key={item.id} className={tab === item.id ? 'active' : ''} onClick={() => chooseView(item.id)} aria-pressed={tab === item.id} aria-label={`Ver prévia: ${item.label}`}><span aria-hidden="true" /></button>)}
      </div>
    </div>
  );
}