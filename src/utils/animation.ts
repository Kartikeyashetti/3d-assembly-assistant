export const ANIMATION = {
  /** Duration of part movement tween in seconds */
  partDuration: 0.85,
  /** Camera lerp speed (0–1 per frame at 60fps) */
  cameraLerp: 0.06,
  /** Exploded view transition duration */
  explodeDuration: 0.6,
  /** Highlight pulse speed */
  pulseSpeed: 2.5,
} as const;

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
