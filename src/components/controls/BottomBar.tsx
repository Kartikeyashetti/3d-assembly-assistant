import type { AssemblyStep } from '@/types/assembly';

interface BottomBarProps {
  timeline: number;
  totalSteps: number;
  maxTimeline: number;
  currentStep: AssemblyStep | undefined;
  isFirstStep: boolean;
  isLastStep: boolean;
  isExploded: boolean;
  onTimelineChange: (value: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onReplay: () => void;
  onToggleExploded: () => void;
}

export function BottomBar({
  timeline,
  totalSteps,
  maxTimeline,
  currentStep,
  isFirstStep,
  isLastStep,
  isExploded,
  onTimelineChange,
  onPrevious,
  onNext,
  onReplay,
  onToggleExploded,
}: BottomBarProps) {
  const displayStep = Math.max(1, Math.min(Math.ceil(timeline), totalSteps));

  return (
    <footer className="bottom-bar">
      <div className="bottom-bar__left">
        <button type="button" onClick={onReplay} aria-label="Repeat" className="text-btn">
          Repeat
        </button>
      </div>

      <div className="bottom-bar__center-row">
        <button type="button" onClick={onPrevious} disabled={isFirstStep} aria-label="Previous" className="icon-btn big">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
          </svg>
        </button>

        <div className="bottom-bar__center-col">
          <div className="bottom-bar__step">Step {displayStep} / {totalSteps}</div>
          <div className="bottom-bar__title">{currentStep?.title ?? ''}</div>
        </div>

        <div className="bottom-bar__slider-row wide">
          <input
            type="range"
            className="time-slider large"
            min={0}
            max={maxTimeline}
            step={0.01}
            value={timeline}
            onChange={(e) => onTimelineChange(parseFloat(e.target.value))}
            aria-label="Assembly timeline"
          />
        </div>

        <button type="button" onClick={onNext} disabled={isLastStep} aria-label="Next" className="icon-btn big">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 7.17 8.83 10.34 12 7.17 15.17z" fill="currentColor" />
          </svg>
        </button>
      </div>

      <div className="bottom-bar__right">
        <button
          type="button"
          className={isExploded ? 'active text-btn' : 'text-btn'}
          onClick={onToggleExploded}
        >
          {isExploded ? 'Assembled' : 'Exploded'}
        </button>
      </div>
      <p className="bottom-bar__instruction">{currentStep?.instruction ?? ''}</p>
    </footer>
  );
}
