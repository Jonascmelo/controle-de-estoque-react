import { useState } from 'react';
import { Truck, BarChart3, Snowflake, RotateCcw, AlertTriangle, Brain } from 'lucide-react';
import { PeriodFilter } from '@/types/inventory';
import { useInventoryData } from '@/hooks/useInventoryData';
import { KPICards } from '@/components/dashboard/KPICards';
import { TopSellers } from '@/components/dashboard/TopSellers';
import { StagnantParts } from '@/components/dashboard/StagnantParts';
import { CriticalStock } from '@/components/dashboard/CriticalStock';
import { StockTurnover } from '@/components/dashboard/StockTurnover';
import { InsightsPanel } from '@/components/dashboard/InsightsPanel';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';

type Tab = 'overview' | 'sales' | 'stagnant' | 'turnover' | 'critical' | 'insights';

const tabs: { id: Tab; label: string; icon: typeof Truck }[] = [
  { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
  { id: 'sales', label: 'Mais Vendidas', icon: BarChart3 },
  { id: 'stagnant', label: 'Paradas', icon: Snowflake },
  { id: 'turnover', label: 'Giro', icon: RotateCcw },
  { id: 'critical', label: 'Crítico', icon: AlertTriangle },
  { id: 'insights', label: 'Insights', icon: Brain },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [period, setPeriod] = useState<PeriodFilter>('30d');
  const [category, setCategory] = useState('all');
  const [supplier, setSupplier] = useState('all');

  const data = useInventoryData(period, category, supplier);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Controle de Estoque</h1>
                <p className="text-xs text-muted-foreground">Peças de Caminhão — Dashboard Gerencial</p>
              </div>
            </div>
            <DashboardFilters
              period={period}
              category={category}
              supplier={supplier}
              onPeriodChange={setPeriod}
              onCategoryChange={setCategory}
              onSupplierChange={setSupplier}
            />
          </div>

          {/* Tabs */}
          <nav className="flex gap-1 -mb-px">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-background text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
                {tab.id === 'critical' && data.criticalCount > 0 && (
                  <span className="bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    {data.criticalCount}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {activeTab === 'overview' && (
          <>
            <KPICards
              totalSKUs={data.totalSKUs}
              totalStock={data.totalStock}
              totalValue={data.totalValue}
              totalSold={data.totalSoldPeriod}
              avgTurnover={data.avgTurnover}
              criticalCount={data.criticalCount}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StockTurnover
                salesOverTime={data.salesOverTime}
                avgTurnover={data.avgTurnover}
                totalStock={data.totalStock}
              />
              <CriticalStock data={data.critical} />
            </div>
            <InsightsPanel insights={data.insights} />
          </>
        )}

        {activeTab === 'sales' && (
          <TopSellers data={data.topSellers} />
        )}

        {activeTab === 'stagnant' && (
          <StagnantParts data={data.stagnant} />
        )}

        {activeTab === 'turnover' && (
          <StockTurnover
            salesOverTime={data.salesOverTime}
            avgTurnover={data.avgTurnover}
            totalStock={data.totalStock}
          />
        )}

        {activeTab === 'critical' && (
          <CriticalStock data={data.critical} />
        )}

        {activeTab === 'insights' && (
          <InsightsPanel insights={data.insights} />
        )}
      </main>
    </div>
  );
};

export default Index;
