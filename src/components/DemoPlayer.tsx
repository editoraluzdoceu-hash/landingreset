import { useEffect, useMemo, useRef, useState } from 'react';
import { MousePointerClick, Pause, Play, RotateCcw } from 'lucide-react';
import DevicePreview from './DevicePreview';
import { demoScript, demoTotal, type ProductTab } from '../data/content';

interface DemoPlayerProps {
  autoplay?: boolean;
  /** Hands control to the visitor: closes the player context and opens the interactive preview. */
  onExplore: () => void;
}

function formatTime(seconds: number) {
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
}

export default function DemoPlayer({ autoplay = true, onExplore }: DemoPlayerProps) {
  const starts = useMemo(() => demoScript.map((_, index) => demoScript.slice(0, index).reduce((sum, step) => sum + step.seconds, 0)), []);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(autoplay);
  const [manual, setManual] = useState(false);
  const [tab, setTab] = useState<ProductTab>(demoScript[0].tab);
  const rootRef = useRef<HTMLDivElement>(null);

  const finished = elapsed >= demoTotal;
  const stepIndex = manual ? -1 : Math.min(demoScript.findIndex((step, index) => elapsed < starts[index] + step.seconds), demoScript.length - 1);
  const step = stepIndex >= 0 ? demoScript[stepIndex] : null;

  useEffect(() => {
    if (!playing || manual) return;
    const id = window.setInterval(() => setElapsed((current) => Math.min(current + 0.1, demoTotal)), 100);
    return () => window.clearInterval(id);
  }, [playing, manual]);

  useEffect(() => {
    if (elapsed >= demoTotal) setPlaying(false);
  }, [elapsed]);

  useEffect(() => {
    if (step && step.tab !== tab) setTab(step.tab);
  }, [step, tab]);

  const goToStep = (index: number) => {
    rootRef.current?.focus({ preventScroll: true });
    setManual(false);
    setElapsed(starts[index]);
    setPlaying(true);
  };

  const wasPlaying = playing && !manual;

  const togglePlay = () => {
    if (!wasPlaying && elapsed >= demoTotal) return goToStep(0);
    setManual(false);
    setPlaying(!wasPlaying);
  };

  // Any direct touch of the screen hands control to the visitor.
  const takeOver = () => {
    if (manual) return;
    setManual(true);
    setPlaying(false);
  };

  const resume = () => {
    setManual(false);
    setPlaying(true);
  };

  const progress = Math.min((elapsed / demoTotal) * 100, 100);

  return (
    <div className="demo-player" ref={rootRef} tabIndex={-1}>
      <div className="demo-stage" onClickCapture={takeOver}>
        <DevicePreview
          tab={tab}
          onTabChange={setTab}
          onShowDetails={() => {}}
          onSupport={() => {}}
          demoPanel={step ? step.panel : undefined}
          demoQuizStep={step ? step.quizStep : undefined}
        />
        {finished && !manual && (
          <div className="demo-finished">
            <p><strong>Fim da demonstração.</strong> Quer percorrer as telas no seu tempo?</p>
            <div className="demo-finished-actions">
              <button className="button button-outline" onClick={() => goToStep(0)}><RotateCcw size={14} /> Rever do início</button>
              <button className="button button-outline" onClick={onExplore}>Explorar sozinho</button>
            </div>
          </div>
        )}
      </div>

      <div className="demo-side">
        <p className="demo-caption" aria-live="polite">
          {manual ? (
            <><span className="demo-caption-chip"><MousePointerClick size={12} /> Modo livre</span> Você está no comando da prévia. Toque nas abas, abra o menu, teste a busca — tudo aqui responde.</>
          ) : finished ? (
            <><span className="demo-caption-chip"><Play size={12} /> Concluída</span> A demonstração terminou. Rever um capítulo ou explorar a prévia completa é só clicar.</>
          ) : (
            <><span className="demo-caption-chip">Etapa {stepIndex + 1} de {demoScript.length}</span> <strong>{step?.chapter}.</strong> {step?.caption}</>
          )}
        </p>

        <div className="demo-controls" role="group" aria-label="Controles da demonstração">
          <button className="demo-play" onClick={togglePlay} aria-label={wasPlaying ? 'Pausar demonstração' : elapsed >= demoTotal ? 'Rever demonstração' : 'Retomar demonstração'}>
            {wasPlaying ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
          </button>
          <span className="demo-time" aria-hidden="true">{formatTime(elapsed)} <em>/</em> {formatTime(demoTotal)}</span>
          <div className="demo-track" aria-hidden="true">
            <i style={{ width: `${progress}%` }} />
            {starts.slice(1).map((start) => <span key={start} style={{ left: `${(start / demoTotal) * 100}%` }} />)}
          </div>
          <button className="demo-restart" onClick={() => goToStep(0)} aria-label="Reiniciar demonstração"><RotateCcw size={13} /></button>
        </div>

        <div className="demo-chapters" role="group" aria-label="Capítulos da demonstração">
          {demoScript.map((item, index) => (
            <button key={item.chapter} className={index === stepIndex ? 'is-active' : ''} onClick={() => goToStep(index)}>
              <span className="demo-chapter-index" aria-hidden="true">{playing === false && !manual && elapsed >= starts[index] + item.seconds ? '✓' : index + 1}</span>
              {item.chapter}
            </button>
          ))}
        </div>

        {manual && (
          <button className="demo-resume" onClick={resume}><Play size={13} fill="currentColor" /> Retomar do ponto onde parou ({formatTime(elapsed)})</button>
        )}

        <p className="demo-note">Demonstração navegável da interface, com dados de exemplo — não é um vídeo gravado. No aplicativo, as telas são exatamente estas, com os seus dados. O link para baixar é entregue somente na Cakto, após a compra.</p>
      </div>
    </div>
  );
}
