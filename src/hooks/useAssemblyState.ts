import { useReducer, useCallback, useMemo } from 'react';
import type { AssemblyAction, AssemblyState, ProductDefinition } from '@/types/assembly';

const initialState: AssemblyState = {
  timeline: 0,
  viewMode: 'assembled',
};

function clampTimeline(timeline: number, max: number) {
  return Math.min(Math.max(timeline, 0), max);
}

function assemblyReducer(state: AssemblyState, action: AssemblyAction): AssemblyState {
  switch (action.type) {
    case 'SET_TIMELINE':
      return { ...state, timeline: clampTimeline(action.timeline, action.maxTimeline) };
    case 'NEXT':
      return {
        ...state,
        timeline: Math.min(Math.floor(state.timeline) + 1, action.maxTimeline),
      };
    case 'PREVIOUS':
      return { ...state, timeline: Math.max(Math.floor(state.timeline) - 1, 0) };
    case 'REPLAY':
      return { ...state, timeline: 0 };
    case 'TOGGLE_EXPLODED':
      return {
        ...state,
        viewMode: state.viewMode === 'exploded' ? 'assembled' : 'exploded',
      };
    default:
      return state;
  }
}

export function useAssemblyState(product: ProductDefinition) {
  const [state, dispatch] = useReducer(assemblyReducer, initialState);

  const totalSteps = product.steps.length;
  /** Timeline runs 0 → totalSteps (last segment animates door opening) */
  const maxTimeline = totalSteps;
  const stepIndex = Math.min(Math.floor(state.timeline), totalSteps - 1);
  const currentStep = product.steps[stepIndex];
  const isFirstStep = state.timeline <= 0;
  const isLastStep = state.timeline >= maxTimeline;

  const partStepMap = useMemo(() => {
    const map = new Map<string, number>();
    product.steps.forEach((step, index) => {
      if (step.partId) map.set(step.partId, index);
    });
    return map;
  }, [product.steps]);

  const setTimeline = useCallback(
    (timeline: number) => {
      dispatch({ type: 'SET_TIMELINE', timeline, maxTimeline });
    },
    [maxTimeline],
  );

  const next = useCallback(() => {
    dispatch({ type: 'NEXT', maxTimeline });
  }, [maxTimeline]);

  const previous = useCallback(() => {
    dispatch({ type: 'PREVIOUS' });
  }, []);

  const replay = useCallback(() => {
    dispatch({ type: 'REPLAY' });
  }, []);

  const toggleExploded = useCallback(() => {
    dispatch({ type: 'TOGGLE_EXPLODED' });
  }, []);

  return {
    state,
    timeline: state.timeline,
    stepIndex,
    currentStep,
    totalSteps,
    maxTimeline,
    isFirstStep,
    isLastStep,
    partStepMap,
    setTimeline,
    next,
    previous,
    replay,
    toggleExploded,
  };
}

export type UseAssemblyStateReturn = ReturnType<typeof useAssemblyState>;
