import {
  ImpactMetricsDashboard,
  type ImpactMetricsDashboardMetric,
} from '@/components/shared/ImpactMetricsDashboard'
import { ENTERPRISE_SOC_DASHBOARD } from '@/lib/constants/enterprise-soc'

function toImpactMetrics(
  metrics: typeof ENTERPRISE_SOC_DASHBOARD.metrics,
): ImpactMetricsDashboardMetric[] {
  return metrics.map((metric) => {
    const pillVariant =
      metric.id === 'mttd' ? 'decrease' : metric.id === 'economics' ? 'decrease-right' : undefined
    const valueVariant =
      metric.id === 'mttd'
        ? 'decrease'
        : metric.id === 'economics'
          ? 'decrease-right'
          : 'color'

    return {
      id: metric.id,
      badge: metric.badge,
      value: metric.value,
      subtitle: metric.label,
      color: metric.color,
      icon: metric.icon,
      pillVariant,
      valueVariant,
    }
  })
}

export function EnterpriseSocDashboard() {
  const { heading, subtext, metrics } = ENTERPRISE_SOC_DASHBOARD

  return (
    <ImpactMetricsDashboard
      heading={heading}
      subtext={subtext}
      metrics={toImpactMetrics(metrics)}
      pillStyle="border"
    />
  )
}
