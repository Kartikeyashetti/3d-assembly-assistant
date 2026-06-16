import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AssemblyScene } from '@/components/scene/AssemblyScene';
import { BottomBar } from '@/components/controls/BottomBar';
import { BomSheet } from '@/components/bom/BomSheet';
import { useAssemblyState } from '@/hooks/useAssemblyState';
import { cabinetProduct } from '@/data/cabinetAssembly';

export default function App() {
  const assembly = useAssemblyState(cabinetProduct);
  const [showBom, setShowBom] = useState(true);

  const displayIndex = Math.max(0, Math.min(Math.ceil(assembly.timeline), assembly.totalSteps) - 1);

  return (
    <AppLayout
      title={cabinetProduct.name}
      scene={<>
        <AssemblyScene product={cabinetProduct} assembly={assembly} />
        {showBom && (
          <BomSheet product={cabinetProduct} onClose={() => setShowBom(false)} />
        )}
      </>}
      bottomBar={
        <BottomBar
          timeline={assembly.timeline}
          totalSteps={assembly.totalSteps}
          maxTimeline={assembly.maxTimeline}
          currentStep={cabinetProduct.steps[displayIndex]}
          isFirstStep={assembly.isFirstStep}
          isLastStep={assembly.isLastStep}
          isExploded={assembly.state.viewMode === 'exploded'}
          onTimelineChange={assembly.setTimeline}
          onPrevious={assembly.previous}
          onNext={assembly.next}
          onReplay={assembly.replay}
          onToggleExploded={assembly.toggleExploded}
        />
      }
    />
  );
}
