import { Package, Boxes, DollarSign, TrendingUp, RotateCcw, AlertTriangle } from 'lucide-react';

interface KPICardsProps {
  totalSKUs: number;
  totalStock: number;
  totalValue: number;
  totalSold: number;
  avgTurnover: number;
  criticalCount: number;
}

export function KPICards({ totalSKUs, totalStock, totalValue, totalSold, avgTurnover, criticalCount }: KPICardsProps) {
  const cards = [
    { label: 'Total de SKUs', value: totalSKUs.toString(), icon: Package, color: 'text-info' },
    { label: 'Peças em Estoque', value: totalStock.toLocaleString('pt-BR'), icon: Boxes, color: 'text-primary' },
    { label: 'Valor em Estoque', value: `R$ ${totalValue.toLocaleString('pt-BR')}`, icon: DollarSign, color: 'text-success' },
    { label: 'Vendidas no Período', value: totalSold.toLocaleString('pt-BR'), icon: TrendingUp, color: 'text-primary' },
    { label: 'Giro Médio/Dia', value: avgTurnover.toFixed(1), icon: RotateCcw, color: 'text-info' },
    { label: 'Estoque Crítico', value: criticalCount.toString(), icon: AlertTriangle, color: criticalCount > 0 ? 'text-destructive' : 'text-success' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, i) => (
        <div
          key={card.label}
          className="glass-card rounded-lg p-4 animate-slide-up"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <card.icon className={`h-4 w-4 ${card.color}`} />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{card.label}</span>
          </div>
          <p className={`text-2xl font-bold ${card.color} animate-count-up`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
