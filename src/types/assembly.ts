import type { Vector3Tuple } from 'three';

export type ViewMode = 'assembled' | 'exploded';

export interface PartDefinition {
  id: string;
  name: string;
  sku: string;
  color: string;
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  size: Vector3Tuple;
  explodedOffset: Vector3Tuple;
  entryOffset: Vector3Tuple;
}

export interface AssemblyStep {
  id: number;
  partId?: string;
  title: string;
  instruction: string;
  focusPoint: Vector3Tuple;
  cameraOffset: Vector3Tuple;
}

export interface ProductDefinition {
  id: string;
  name: string;
  parts: PartDefinition[];
  steps: AssemblyStep[];
}

export interface AssemblyState {
  /** 0 → first step, up to totalSteps - 1 (fractional = mid-animation) */
  timeline: number;
  viewMode: ViewMode;
}

export type AssemblyAction =
  | { type: 'SET_TIMELINE'; timeline: number; maxTimeline: number }
  | { type: 'NEXT'; maxTimeline: number }
  | { type: 'PREVIOUS' }
  | { type: 'REPLAY' }
  | { type: 'TOGGLE_EXPLODED' };
