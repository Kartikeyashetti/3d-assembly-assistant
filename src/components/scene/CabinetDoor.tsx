import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { PartDefinition, ViewMode } from '@/types/assembly';
import { easeOutCubic } from '@/utils/animation';

const DOOR_STEP = 6;
const OPEN_STEP = 7;
const OPEN_ANGLE = Math.PI / 2.2;

interface CabinetDoorProps {
  part: PartDefinition;
  timeline: number;
  viewMode: ViewMode;
}

export function CabinetDoor({ part, timeline, viewMode }: CabinetDoorProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const [width, height, depth] = part.size;
  const hingeX = width / 2;

  const hingeAssembled = useMemo(
    () => new THREE.Vector3(part.position[0] + hingeX, part.position[1], part.position[2]),
    [part.position, hingeX],
  );
  const hingeExploded = useMemo(
    () => hingeAssembled.clone().add(new THREE.Vector3(...part.explodedOffset)),
    [hingeAssembled, part.explodedOffset],
  );
  const hingeEntry = useMemo(
    () => hingeAssembled.clone().add(new THREE.Vector3(...part.entryOffset)),
    [hingeAssembled, part.entryOffset],
  );

  const isVisible = timeline >= DOOR_STEP;
  const isMounting = timeline >= DOOR_STEP && timeline < OPEN_STEP;
  const isOpening = timeline >= OPEN_STEP;

  const mountT = easeOutCubic(Math.min(Math.max(timeline - DOOR_STEP, 0), 1));
  const openT = easeOutCubic(Math.min(Math.max(timeline - OPEN_STEP, 0), 1));
  const doorScale = isVisible ? mountT : 0;

  useFrame(({ clock }) => {
    if (!groupRef.current || !meshRef.current || !materialRef.current || !isVisible) return;

    const hingeTarget = viewMode === 'exploded' ? hingeExploded : hingeAssembled;
    groupRef.current.position.lerpVectors(hingeEntry, hingeTarget, mountT);

    const swing = viewMode === 'assembled' && isOpening ? openT * OPEN_ANGLE : 0;
    groupRef.current.rotation.set(0, swing, 0);
    meshRef.current.scale.setScalar(doorScale);

    const isActive = isMounting || (isOpening && openT < 1);
    const pulse = isActive ? 0.5 + 0.5 * Math.sin(clock.getElapsedTime() * 3) : 0;
    materialRef.current.emissive.set(isActive ? '#4488ff' : '#000000');
    materialRef.current.emissiveIntensity = isActive ? 0.2 + pulse * 0.3 : 0;
  });

  if (!isVisible) return null;

  return (
    <group ref={groupRef} position={hingeEntry}>
      <mesh ref={meshRef} position={[-hingeX, 0, 0]} castShadow receiveShadow scale={[doorScale, doorScale, doorScale]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          ref={materialRef}
          color={part.color}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
}
