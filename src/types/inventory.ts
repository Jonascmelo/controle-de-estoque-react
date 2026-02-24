export interface Part {
  code: string;
  name: string;
  category: string;
  supplier: string;
  currentStock: number;
  minStock: number;
  unitCost: number;
}

export interface StockMovement {
  partCode: string;
  date: string;
  type: 'entrada' | 'saida';
  quantity: number;
}

export interface PartWithAnalytics extends Part {
  totalSold: number;
  salesPercentage: number;
  lastSaleDate: string | null;
  daysSinceLastSale: number;
  avgDailySales: number;
  daysOfStockLeft: number;
  isCritical: boolean;
}

export type PeriodFilter = '7d' | '30d' | '60d' | '90d';
export type StagnantFilter = 30 | 60 | 90;
