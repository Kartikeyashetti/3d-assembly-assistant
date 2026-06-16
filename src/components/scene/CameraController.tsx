import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { AssemblyStep } from '@/types/assembly';

interface CameraControllerProps {
  step: AssemblyStep | undefined;
}

export function CameraController({ step }: CameraControllerProps) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(2.5, 2, 2.5));
  const lookAt = useRef(new THREE.Vector3(0, 0.7, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.7, 0));

  useEffect(() => {
    if (!step) return;
    const focus = new THREE.Vector3(...step.focusPoint);
    lookAt.current.copy(focus);
    targetPos.current.copy(focus.clone().add(new THREE.Vector3(...step.cameraOffset)));
  }, [step]);

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.06);
    currentLookAt.current.lerp(lookAt.current, 0.06);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
