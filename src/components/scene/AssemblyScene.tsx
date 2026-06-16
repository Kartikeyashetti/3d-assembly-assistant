import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CabinetAssembly } from './CabinetAssembly';
import type { ProductDefinition } from '@/types/assembly';
import type { UseAssemblyStateReturn } from '@/hooks/useAssemblyState';

interface AssemblySceneProps {
  product: ProductDefinition;
  assembly: UseAssemblyStateReturn;
}

export function AssemblyScene({ product, assembly }: AssemblySceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [2.5, 2, 2.5], fov: 45 }}
      style={{ background: '#1a1a2e' }}
    >
      <Suspense fallback={null}>
        <CabinetAssembly product={product} assembly={assembly} />
      </Suspense>
      <OrbitControls
        enablePan
        enableZoom
        minDistance={1.5}
        maxDistance={7}
        target={[0, 0.7, 0]}
      />
    </Canvas>
  );
}
