import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface StockTurnoverProps {
  salesOverTime: { date: string; vendas: number }[];
  avgTurnover: number;
  totalStock: number;
}

export function StockTurnover({ salesOverTime, avgTurnover, totalStock }: StockTurnoverProps) {
  const daysOfStock = avgTurnover > 0 ? Math.round(totalStock / avgTurnover) : 999;

  return (
    <div className="glass-card rounded-lg p-5 animate-slide-up">
      <h3 className="text-sm font-semibold text-foreground mb-4">🔄 Giro de Estoque</h3>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Média/dia</p>
          <p className="text-xl font-bold text-primary">{avgTurnover.toFixed(1)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Média/semana</p>
          <p className="text-xl font-bold text-info">{(avgTurnover * 7).toFixed(0)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Estoque dura</p>
          <p className={`text-xl font-bold ${daysOfStock <= 14 ? 'text-destructive' : 'text-success'}`}>
            {daysOfStock === 999 ? '∞' : `${daysOfStock}d`}
          </p>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesOverTime}>
            <defs>
              <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 10 }}
              tickFormatter={(d) => new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
            />
            <YAxis tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 10 }} />
            <Tooltip
              contentStyle={{ background: 'hsl(220, 18%, 13%)', border: '1px solid hsl(220, 14%, 20%)', borderRadius: 8, color: 'hsl(40, 10%, 92%)' }}
              labelFormatter={(d) => new Date(d).toLocaleDateString('pt-BR')}
            />
            <Area type="monotone" dataKey="vendas" stroke="hsl(38, 92%, 50%)" fill="url(#colorVendas)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
