import { PeriodFilter } from '@/types/inventory';
import { getCategories, getSuppliers } from '@/data/mockData';
import { Filter } from 'lucide-react';

interface DashboardFiltersProps {
  period: PeriodFilter;
  category: string;
  supplier: string;
  onPeriodChange: (p: PeriodFilter) => void;
  onCategoryChange: (c: string) => void;
  onSupplierChange: (s: string) => void;
}

export function DashboardFilters({
  period, category, supplier,
  onPeriodChange, onCategoryChange, onSupplierChange,
}: DashboardFiltersProps) {
  const categories = getCategories();
  const suppliers = getSuppliers();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Filter className="h-4 w-4 text-muted-foreground" />

      <div className="flex gap-1 bg-secondary rounded-lg p-0.5">
        {(['7d', '30d', '60d', '90d'] as PeriodFilter[]).map(p => (
          <button
            key={p}
            onClick={() => onPeriodChange(p)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              period === p
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-secondary-foreground hover:text-foreground'
            }`}
          >
            {p === '7d' ? '7 dias' : p === '30d' ? '30 dias' : p === '60d' ? '60 dias' : '90 dias'}
          </button>
        ))}
      </div>

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="bg-secondary text-secondary-foreground text-xs rounded-lg px-3 py-2 border-none outline-none cursor-pointer"
      >
        <option value="all">Todas Categorias</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <select
        value={supplier}
        onChange={(e) => onSupplierChange(e.target.value)}
        className="bg-secondary text-secondary-foreground text-xs rounded-lg px-3 py-2 border-none outline-none cursor-pointer"
      >
        <option value="all">Todos Fornecedores</option>
        {suppliers.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
    </div>
  );
}
