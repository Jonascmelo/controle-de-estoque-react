import { TrendingUp, AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface Insight {
  type: 'success' | 'warning' | 'danger' | 'info';
  message: string;
}

interface InsightsPanelProps {
  insights: Insight[];
}

const iconMap = {
  success: CheckCircle,
  warning: AlertTriangle,
  danger: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: 'text-success bg-success/10 border-success/20',
  warning: 'text-warning bg-warning/10 border-warning/20',
  danger: 'text-destructive bg-destructive/10 border-destructive/20',
  info: 'text-info bg-info/10 border-info/20',
};

export function InsightsPanel({ insights }: InsightsPanelProps) {
  if (insights.length === 0) return null;

  return (
    <div className="glass-card rounded-lg p-5 animate-slide-up">
      <h3 className="text-sm font-semibold text-foreground mb-4">🧠 Insights Automáticos</h3>
      <div className="space-y-2">
        {insights.map((insight, i) => {
          const Icon = iconMap[insight.type];
          return (
            <div
              key={i}
              className={`flex items-start gap-3 p-3 rounded-lg border ${colorMap[insight.type]}`}
            >
              <Icon className="h-4 w-4 mt-0.5 shrink-0" />
              <p className="text-sm">{insight.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
