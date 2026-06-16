import { Grid, ContactShadows } from '@react-three/drei';
import { AssemblyPart } from './AssemblyPart';
import { CabinetDoor } from './CabinetDoor';
import { CameraController } from './CameraController';
import { SceneLighting } from './SceneLighting';
import type { ProductDefinition } from '@/types/assembly';
import type { UseAssemblyStateReturn } from '@/hooks/useAssemblyState';

interface CabinetAssemblyProps {
  product: ProductDefinition;
  assembly: UseAssemblyStateReturn;
}

export function CabinetAssembly({ product, assembly }: CabinetAssemblyProps) {
  const { state, timeline, currentStep, partStepMap } = assembly;
  const doorPart = product.parts.find((p) => p.id === 'door');

  return (
    <>
      <SceneLighting />
      <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      <Grid
        args={[10, 10]}
        cellSize={0.5}
        cellColor="#444"
        sectionSize={1}
        sectionColor="#666"
        fadeDistance={10}
        infiniteGrid
        position={[0, 0, 0]}
      />

      {product.parts
        .filter((part) => part.id !== 'door')
        .map((part) => (
          <AssemblyPart
            key={part.id}
            part={part}
            stepIndex={partStepMap.get(part.id) ?? 0}
            timeline={timeline}
            viewMode={state.viewMode}
          />
        ))}

      {doorPart && (
        <CabinetDoor part={doorPart} timeline={timeline} viewMode={state.viewMode} />
      )}

      <CameraController step={currentStep} />
    </>
  );
}
