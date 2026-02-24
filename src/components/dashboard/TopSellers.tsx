import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { PartWithAnalytics } from '@/types/inventory';

const COLORS = [
  'hsl(38, 92%, 50%)',
  'hsl(200, 80%, 55%)',
  'hsl(152, 60%, 42%)',
  'hsl(280, 60%, 55%)',
  'hsl(0, 72%, 51%)',
  'hsl(38, 70%, 40%)',
  'hsl(200, 60%, 45%)',
  'hsl(152, 40%, 35%)',
  'hsl(280, 40%, 45%)',
  'hsl(20, 80%, 50%)',
];

interface TopSellersProps {
  data: PartWithAnalytics[];
}

export function TopSellers({ data }: TopSellersProps) {
  const barData = data.map(p => ({
    name: p.code,
    fullName: p.name,
    vendas: p.totalSold,
  }));

  const pieData = data.filter(p => p.totalSold > 0).map(p => ({
    name: p.code,
    fullName: p.name,
    value: p.totalSold,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="glass-card rounded-lg p-5 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <h3 className="text-sm font-semibold text-foreground mb-4">🔥 Top 10 — Mais Vendidas</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <XAxis type="number" tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fill: 'hsl(40, 10%, 85%)', fontSize: 11 }} width={65} />
              <Tooltip
                contentStyle={{ background: 'hsl(220, 18%, 13%)', border: '1px solid hsl(220, 14%, 20%)', borderRadius: 8, color: 'hsl(40, 10%, 92%)' }}
                formatter={(value: number, _: any, entry: any) => [`${value} un.`, entry.payload.fullName]}
              />
              <Bar dataKey="vendas" radius={[0, 4, 4, 0]}>
                {barData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="glass-card rounded-lg p-5 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <h3 className="text-sm font-semibold text-foreground mb-4">🧩 Participação nas Vendas</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: 'hsl(220, 18%, 13%)', border: '1px solid hsl(220, 14%, 20%)', borderRadius: 8, color: 'hsl(40, 10%, 92%)' }}
                formatter={(value: number, _: any, entry: any) => [`${value} un.`, entry.payload.fullName]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="flex flex-wrap gap-2 mt-3">
          {pieData.slice(0, 5).map((item, i) => (
            <div key={item.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="lg:col-span-2 glass-card rounded-lg p-5 animate-slide-up" style={{ animationDelay: '400ms' }}>
        <h3 className="text-sm font-semibold text-foreground mb-4">📋 Detalhamento de Vendas</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">#</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Código</th>
                <th className="text-left py-2 px-3 text-muted-foreground font-medium">Peça</th>
                <th className="text-right py-2 px-3 text-muted-foreground font-medium">Vendas</th>
                <th className="text-right py-2 px-3 text-muted-foreground font-medium">% Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p, i) => (
                <tr key={p.code} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="py-2 px-3 text-muted-foreground">{i + 1}</td>
                  <td className="py-2 px-3 font-mono text-xs text-primary">{p.code}</td>
                  <td className="py-2 px-3">{p.name}</td>
                  <td className="py-2 px-3 text-right font-semibold">{p.totalSold}</td>
                  <td className="py-2 px-3 text-right text-muted-foreground">{p.salesPercentage.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
