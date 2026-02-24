import { useState } from 'react';
import { PartWithAnalytics, StagnantFilter } from '@/types/inventory';
import { Snowflake } from 'lucide-react';

interface StagnantPartsProps {
  data: PartWithAnalytics[];
}

export function StagnantParts({ data }: StagnantPartsProps) {
  const [filter, setFilter] = useState<StagnantFilter>(30);

  const filtered = data.filter(p => p.daysSinceLastSale >= filter);

  return (
    <div className="glass-card rounded-lg p-5 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Snowflake className="h-4 w-4 text-info" />
          Peças Paradas
        </h3>
        <div className="flex gap-1">
          {([30, 60, 90] as StagnantFilter[]).map(d => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                filter === d
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {d}+ dias
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">Nenhuma peça parada neste período 🎉</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Código</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Peça</th>
                <th className="text-right py-2 px-3 text-muted-foreground font-medium">Estoque</th>
                <th className="text-right py-2 px-3 text-muted-foreground font-medium">Valor Parado</th>
                <th className="text-right py-2 px-3 text-muted-foreground font-medium">Última Saída</th>
                <th className="text-right py-2 px-3 text-muted-foreground font-medium">Dias Parado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.code} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="py-2 px-3 font-mono text-xs text-primary">{p.code}</td>
                  <td className="py-2 px-3">{p.name}</td>
                  <td className="py-2 px-3 text-right">{p.currentStock}</td>
                  <td className="py-2 px-3 text-right text-warning">R$ {(p.currentStock * p.unitCost).toLocaleString('pt-BR')}</td>
                  <td className="py-2 px-3 text-right text-muted-foreground text-xs">
                    {p.lastSaleDate ? new Date(p.lastSaleDate).toLocaleDateString('pt-BR') : 'Nunca'}
                  </td>
                  <td className="py-2 px-3 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.daysSinceLastSale >= 90 ? 'bg-destructive/20 text-destructive' :
                      p.daysSinceLastSale >= 60 ? 'bg-warning/20 text-warning' :
                      'bg-info/20 text-info'
                    }`}>
                      {p.daysSinceLastSale}d
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
