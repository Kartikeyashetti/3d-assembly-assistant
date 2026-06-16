import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { PartDefinition, ViewMode } from '@/types/assembly';
import { easeOutCubic } from '@/utils/animation';

interface AssemblyPartProps {
  part: PartDefinition;
  stepIndex: number;
  timeline: number;
  viewMode: ViewMode;
}

export function AssemblyPart({ part, stepIndex, timeline, viewMode }: AssemblyPartProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const [width, height, depth] = part.size;

  const assembledPos = useMemo(() => new THREE.Vector3(...part.position), [part.position]);
  const explodedPos = useMemo(
    () => assembledPos.clone().add(new THREE.Vector3(...part.explodedOffset)),
    [assembledPos, part.explodedOffset],
  );
  const entryPos = useMemo(
    () => assembledPos.clone().add(new THREE.Vector3(...part.entryOffset)),
    [assembledPos, part.entryOffset],
  );

  const isVisible = timeline >= stepIndex;
  const isActive = timeline >= stepIndex && timeline < stepIndex + 1;
  const animT = easeOutCubic(Math.min(Math.max(timeline - stepIndex, 0), 1));
  const scale = isVisible ? animT : 0;

  useFrame(({ clock }) => {
    if (!meshRef.current || !materialRef.current || !isVisible) return;

    const endPos = viewMode === 'exploded' ? explodedPos : assembledPos;
    meshRef.current.position.lerpVectors(entryPos, endPos, animT);
    meshRef.current.rotation.set(...part.rotation);
    meshRef.current.scale.setScalar(scale);

    const pulse = isActive ? 0.5 + 0.5 * Math.sin(clock.getElapsedTime() * 3) : 0;
    materialRef.current.emissive.set(isActive ? '#4488ff' : '#000000');
    materialRef.current.emissiveIntensity = isActive ? 0.2 + pulse * 0.3 : 0;
  });

  if (!isVisible) return null;

  return (
    <mesh ref={meshRef} position={entryPos} castShadow receiveShadow scale={[scale, scale, scale]}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial
        ref={materialRef}
        color={part.color}
        roughness={0.7}
        metalness={0.05}
      />
    </mesh>
  );
}
