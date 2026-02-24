import { useMemo } from 'react';
import { parts, movements } from '@/data/mockData';
import { PartWithAnalytics, PeriodFilter } from '@/types/inventory';

export function useInventoryData(period: PeriodFilter, category: string, supplier: string) {
  return useMemo(() => {
    const now = new Date();
    const periodDays = parseInt(period);

    const filteredParts = parts.filter(p => {
      if (category && category !== 'all' && p.category !== category) return false;
      if (supplier && supplier !== 'all' && p.supplier !== supplier) return false;
      return true;
    });

    const periodStart = new Date(now);
    periodStart.setDate(periodStart.getDate() - periodDays);

    const periodMovements = movements.filter(m => {
      const mDate = new Date(m.date);
      return mDate >= periodStart && mDate <= now;
    });

    const salesByPart = new Map<string, number>();
    const lastSaleDateByPart = new Map<string, string>();

    movements.forEach(m => {
      if (m.type === 'saida') {
        // All time last sale
        const current = lastSaleDateByPart.get(m.partCode);
        if (!current || m.date > current) {
          lastSaleDateByPart.set(m.partCode, m.date);
        }
      }
    });

    periodMovements.forEach(m => {
      if (m.type === 'saida') {
        salesByPart.set(m.partCode, (salesByPart.get(m.partCode) || 0) + m.quantity);
      }
    });

    const totalSoldPeriod = Array.from(salesByPart.values()).reduce((a, b) => a + b, 0);

    const partsWithAnalytics: PartWithAnalytics[] = filteredParts.map(part => {
      const totalSold = salesByPart.get(part.code) || 0;
      const lastSale = lastSaleDateByPart.get(part.code) || null;
      const daysSinceLastSale = lastSale
        ? Math.floor((now.getTime() - new Date(lastSale).getTime()) / (1000 * 60 * 60 * 24))
        : 999;
      const avgDailySales = totalSold / periodDays;
      const daysOfStockLeft = avgDailySales > 0 ? Math.round(part.currentStock / avgDailySales) : 999;

      return {
        ...part,
        totalSold,
        salesPercentage: totalSoldPeriod > 0 ? (totalSold / totalSoldPeriod) * 100 : 0,
        lastSaleDate: lastSale,
        daysSinceLastSale,
        avgDailySales,
        daysOfStockLeft,
        isCritical: part.currentStock < part.minStock,
      };
    });

    const totalSKUs = filteredParts.length;
    const totalStock = filteredParts.reduce((sum, p) => sum + p.currentStock, 0);
    const totalValue = filteredParts.reduce((sum, p) => sum + p.currentStock * p.unitCost, 0);
    const avgTurnover = partsWithAnalytics.filter(p => p.avgDailySales > 0).length > 0
      ? partsWithAnalytics.filter(p => p.avgDailySales > 0).reduce((sum, p) => sum + p.avgDailySales, 0) / partsWithAnalytics.filter(p => p.avgDailySales > 0).length
      : 0;
    const criticalCount = partsWithAnalytics.filter(p => p.isCritical).length;

    const topSellers = [...partsWithAnalytics].sort((a, b) => b.totalSold - a.totalSold).slice(0, 10);
    const stagnant = partsWithAnalytics.filter(p => p.daysSinceLastSale >= 30).sort((a, b) => b.daysSinceLastSale - a.daysSinceLastSale);
    const critical = partsWithAnalytics.filter(p => p.isCritical).sort((a, b) => (a.currentStock / a.minStock) - (b.currentStock / b.minStock));

    // Sales over time
    const salesOverTime: { date: string; vendas: number }[] = [];
    const dateMap = new Map<string, number>();
    periodMovements.filter(m => m.type === 'saida').forEach(m => {
      dateMap.set(m.date, (dateMap.get(m.date) || 0) + m.quantity);
    });
    const sortedDates = Array.from(dateMap.keys()).sort();
    sortedDates.forEach(date => {
      salesOverTime.push({ date, vendas: dateMap.get(date) || 0 });
    });

    // Insights
    const insights: { type: 'success' | 'warning' | 'danger' | 'info'; message: string }[] = [];

    topSellers.slice(0, 3).forEach(p => {
      if (p.totalSold > 10) {
        insights.push({ type: 'success', message: `"${p.name}" vendeu ${p.totalSold} unidades no período — líder de vendas!` });
      }
    });

    stagnant.filter(p => p.daysSinceLastSale >= 90).forEach(p => {
      insights.push({ type: 'warning', message: `"${p.name}" está sem venda há ${p.daysSinceLastSale} dias. Capital parado: R$ ${(p.currentStock * p.unitCost).toLocaleString('pt-BR')}.` });
    });

    critical.forEach(p => {
      if (p.currentStock === 0) {
        insights.push({ type: 'danger', message: `"${p.name}" está com estoque ZERO! Risco de perder vendas.` });
      } else {
        insights.push({ type: 'danger', message: `"${p.name}" está abaixo do mínimo (${p.currentStock}/${p.minStock}). Estoque dura ~${p.daysOfStockLeft} dias.` });
      }
    });

    partsWithAnalytics.filter(p => p.daysOfStockLeft <= 7 && p.daysOfStockLeft > 0 && !p.isCritical).forEach(p => {
      insights.push({ type: 'info', message: `Estoque de "${p.name}" dura apenas ${p.daysOfStockLeft} dias no ritmo atual.` });
    });

    return {
      partsWithAnalytics,
      totalSKUs,
      totalStock,
      totalValue,
      totalSoldPeriod,
      avgTurnover,
      criticalCount,
      topSellers,
      stagnant,
      critical,
      salesOverTime,
      insights,
    };
  }, [period, category, supplier]);
}
