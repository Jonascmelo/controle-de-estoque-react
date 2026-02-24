import { PartWithAnalytics } from '@/types/inventory';
import { AlertTriangle } from 'lucide-react';

interface CriticalStockProps {
  data: PartWithAnalytics[];
}

export function CriticalStock({ data }: CriticalStockProps) {
  if (data.length === 0) {
    return (
      <div className="glass-card rounded-lg p-5 animate-slide-up">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
          <AlertTriangle className="h-4 w-4 text-success" />
          Estoque Crítico
        </h3>
        <p className="text-sm text-muted-foreground text-center py-8">Todos os itens estão acima do mínimo 🎉</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-lg p-5 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          Estoque Crítico
        </h3>
        <span className="text-xs bg-destructive/20 text-destructive px-2.5 py-1 rounded-full font-semibold">
          {data.length} {data.length === 1 ? 'item' : 'itens'}
        </span>
      </div>

      <div className="space-y-3">
        {data.map(p => {
          const percentage = p.minStock > 0 ? (p.currentStock / p.minStock) * 100 : 0;
          return (
            <div key={p.code} className="bg-secondary/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-mono text-xs text-primary mr-2">{p.code}</span>
                  <span className="text-sm font-medium">{p.name}</span>
                </div>
                <span className={`text-xs font-bold ${p.currentStock === 0 ? 'text-destructive' : 'text-warning'}`}>
                  {p.currentStock === 0 ? 'SEM ESTOQUE' : `${p.currentStock}/${p.minStock}`}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(percentage, 100)}%`,
                    background: percentage === 0 ? 'hsl(0, 72%, 51%)' : percentage < 50 ? 'hsl(0, 72%, 51%)' : 'hsl(38, 92%, 50%)',
                  }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">Estoque dura ~{p.daysOfStockLeft === 999 ? '∞' : p.daysOfStockLeft + 'd'}</span>
                <span className="text-xs text-muted-foreground">Mín: {p.minStock}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
