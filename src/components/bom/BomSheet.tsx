import type { ProductDefinition } from '@/types/assembly';

interface BomSheetProps {
  product: ProductDefinition;
  onClose: () => void;
}

export function BomSheet({ product, onClose }: BomSheetProps) {
  const items = product.parts.map((p) => ({ sku: p.sku, name: p.name }));
  // include a dummy hinge entry
  items.push({ sku: 'DUMMY-HINGE-01', name: 'Hinge (dummy)' });

  return (
    <div className="bom-overlay">
      <div className="bom-sheet" role="dialog" aria-label="Bill of Materials">
        <div className="bom-sheet__header">
          <h3>Bill of Materials</h3>
          <button aria-label="Close BOM" className="bom-close" onClick={onClose}>
            Close
          </button>
        </div>

        <ul className="bom-list">
          {items.map((it) => (
            <li key={it.sku} className="bom-item">
              <span className="bom-item__sku">{it.sku}</span>
              <span className="bom-item__name">{it.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BomSheet;
