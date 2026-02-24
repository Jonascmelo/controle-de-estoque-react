import { Part, StockMovement } from '@/types/inventory';

const categories = ['Motor', 'Freio', 'Suspensão', 'Elétrica', 'Transmissão', 'Filtros', 'Arrefecimento', 'Direção'];
const suppliers = ['AutoPeças Brasil', 'TruckParts SA', 'Diesel Components', 'Freios Master', 'Suspensão Total', 'Elétrica Pesada'];

export const parts: Part[] = [
  { code: 'MOT-001', name: 'Jogo de Anéis Motor Cummins', category: 'Motor', supplier: 'Diesel Components', currentStock: 12, minStock: 5, unitCost: 450 },
  { code: 'MOT-002', name: 'Bomba D\'Água Scania', category: 'Motor', supplier: 'TruckParts SA', currentStock: 3, minStock: 4, unitCost: 890 },
  { code: 'MOT-003', name: 'Turbina Garrett T4', category: 'Motor', supplier: 'Diesel Components', currentStock: 2, minStock: 3, unitCost: 3200 },
  { code: 'FRE-001', name: 'Pastilha de Freio Dianteira', category: 'Freio', supplier: 'Freios Master', currentStock: 45, minStock: 20, unitCost: 180 },
  { code: 'FRE-002', name: 'Disco de Freio Traseiro', category: 'Freio', supplier: 'Freios Master', currentStock: 8, minStock: 10, unitCost: 520 },
  { code: 'FRE-003', name: 'Cilindro Mestre', category: 'Freio', supplier: 'Freios Master', currentStock: 6, minStock: 3, unitCost: 750 },
  { code: 'SUS-001', name: 'Amortecedor Dianteiro', category: 'Suspensão', supplier: 'Suspensão Total', currentStock: 15, minStock: 8, unitCost: 620 },
  { code: 'SUS-002', name: 'Mola Pneumática', category: 'Suspensão', supplier: 'Suspensão Total', currentStock: 1, minStock: 4, unitCost: 1100 },
  { code: 'SUS-003', name: 'Barra Estabilizadora', category: 'Suspensão', supplier: 'Suspensão Total', currentStock: 7, minStock: 3, unitCost: 480 },
  { code: 'ELE-001', name: 'Alternador 24V', category: 'Elétrica', supplier: 'Elétrica Pesada', currentStock: 4, minStock: 3, unitCost: 1350 },
  { code: 'ELE-002', name: 'Motor de Partida', category: 'Elétrica', supplier: 'Elétrica Pesada', currentStock: 5, minStock: 3, unitCost: 1800 },
  { code: 'ELE-003', name: 'Chicote Elétrico Painel', category: 'Elétrica', supplier: 'Elétrica Pesada', currentStock: 2, minStock: 2, unitCost: 950 },
  { code: 'TRA-001', name: 'Kit Embreagem Completo', category: 'Transmissão', supplier: 'TruckParts SA', currentStock: 6, minStock: 4, unitCost: 2800 },
  { code: 'TRA-002', name: 'Cruzeta Cardan', category: 'Transmissão', supplier: 'TruckParts SA', currentStock: 20, minStock: 10, unitCost: 95 },
  { code: 'TRA-003', name: 'Rolamento Caixa Câmbio', category: 'Transmissão', supplier: 'AutoPeças Brasil', currentStock: 0, minStock: 5, unitCost: 320 },
  { code: 'FIL-001', name: 'Filtro de Óleo Diesel', category: 'Filtros', supplier: 'AutoPeças Brasil', currentStock: 50, minStock: 25, unitCost: 45 },
  { code: 'FIL-002', name: 'Filtro de Ar Motor', category: 'Filtros', supplier: 'AutoPeças Brasil', currentStock: 35, minStock: 15, unitCost: 120 },
  { code: 'FIL-003', name: 'Filtro Separador de Água', category: 'Filtros', supplier: 'AutoPeças Brasil', currentStock: 28, minStock: 10, unitCost: 85 },
  { code: 'ARR-001', name: 'Radiador Completo', category: 'Arrefecimento', supplier: 'TruckParts SA', currentStock: 3, minStock: 2, unitCost: 2200 },
  { code: 'ARR-002', name: 'Válvula Termostática', category: 'Arrefecimento', supplier: 'Diesel Components', currentStock: 10, minStock: 5, unitCost: 180 },
  { code: 'DIR-001', name: 'Bomba Direção Hidráulica', category: 'Direção', supplier: 'TruckParts SA', currentStock: 4, minStock: 3, unitCost: 1500 },
  { code: 'DIR-002', name: 'Caixa de Direção', category: 'Direção', supplier: 'TruckParts SA', currentStock: 1, minStock: 2, unitCost: 4500 },
];

function generateMovements(): StockMovement[] {
  const movements: StockMovement[] = [];
  const now = new Date();

  // High sellers
  const highSellers = ['FRE-001', 'FIL-001', 'FIL-002', 'TRA-002', 'FIL-003', 'FRE-002', 'SUS-001', 'MOT-001', 'ARR-002', 'FRE-003'];
  // Medium sellers
  const medSellers = ['ELE-001', 'ELE-002', 'TRA-001', 'SUS-003', 'DIR-001', 'MOT-002'];
  // Low / stagnant
  const lowSellers = ['MOT-003', 'SUS-002', 'ELE-003', 'TRA-003', 'ARR-001', 'DIR-002'];

  highSellers.forEach((code, idx) => {
    const salesCount = 25 - idx * 2;
    for (let i = 0; i < salesCount; i++) {
      const daysAgo = Math.floor(Math.random() * 90);
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);
      movements.push({
        partCode: code,
        date: date.toISOString().split('T')[0],
        type: 'saida',
        quantity: Math.floor(Math.random() * 3) + 1,
      });
    }
  });

  medSellers.forEach((code) => {
    const salesCount = Math.floor(Math.random() * 6) + 3;
    for (let i = 0; i < salesCount; i++) {
      const daysAgo = Math.floor(Math.random() * 90);
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);
      movements.push({
        partCode: code,
        date: date.toISOString().split('T')[0],
        type: 'saida',
        quantity: 1,
      });
    }
  });

  // Low sellers - sales only > 30 days ago
  lowSellers.forEach((code, idx) => {
    const minDaysAgo = 35 + idx * 15;
    const salesCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < salesCount; i++) {
      const daysAgo = minDaysAgo + Math.floor(Math.random() * 30);
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);
      movements.push({
        partCode: code,
        date: date.toISOString().split('T')[0],
        type: 'saida',
        quantity: 1,
      });
    }
  });

  // Add some entries
  parts.forEach((part) => {
    const entryCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < entryCount; i++) {
      const daysAgo = Math.floor(Math.random() * 90);
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);
      movements.push({
        partCode: part.code,
        date: date.toISOString().split('T')[0],
        type: 'entrada',
        quantity: Math.floor(Math.random() * 10) + 5,
      });
    }
  });

  return movements.sort((a, b) => b.date.localeCompare(a.date));
}

export const movements = generateMovements();

export const getCategories = () => [...new Set(parts.map(p => p.category))];
export const getSuppliers = () => [...new Set(parts.map(p => p.supplier))];
