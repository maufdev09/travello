import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardChart } from "@/services/dashboard/dashboardStats";

interface DashboardChartsSectionProps {
  charts: DashboardChart[];
}

const DashboardChartsSection = ({ charts }: DashboardChartsSectionProps) => {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {charts.map((chart) => {
        const maxValue = Math.max(...chart.points.map((point) => point.value), 1);

        if (chart.type === "line") {
          const width = 320;
          const height = 160;
          const padding = 16;
          const innerWidth = width - padding * 2;
          const innerHeight = height - padding * 2;

          const polylinePoints = chart.points
            .map((point, index) => {
              const x =
                padding +
                (index * innerWidth) / Math.max(chart.points.length - 1, 1);
              const y =
                padding + innerHeight - (point.value / maxValue) * innerHeight;
              return `${x},${y}`;
            })
            .join(" ");

          return (
            <Card key={chart.title} className="border-muted/60">
              <CardHeader>
                <CardTitle className="text-base">{chart.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{chart.description}</p>
              </CardHeader>
              <CardContent>
                <svg
                  viewBox={`0 0 ${width} ${height}`}
                  className="h-40 w-full overflow-visible"
                >
                  <polyline
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    points={polylinePoints}
                  />
                  {chart.points.map((point, index) => {
                    const x =
                      padding +
                      (index * innerWidth) / Math.max(chart.points.length - 1, 1);
                    const y =
                      padding +
                      innerHeight -
                      (point.value / maxValue) * innerHeight;
                    return (
                      <circle
                        key={`${point.label}-${index}`}
                        cx={x}
                        cy={y}
                        r="3.5"
                        fill="hsl(var(--primary))"
                      />
                    );
                  })}
                </svg>
                <div className="mt-2 grid grid-cols-6 gap-2 text-[10px] text-muted-foreground">
                  {chart.points.slice(-6).map((point) => (
                    <div key={point.label} className="truncate text-center">
                      {point.label}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        }

        return (
          <Card key={chart.title} className="border-muted/60">
            <CardHeader>
              <CardTitle className="text-base">{chart.title}</CardTitle>
              <p className="text-xs text-muted-foreground">{chart.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {chart.points.map((point) => (
                  <div key={point.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="truncate text-muted-foreground">{point.label}</span>
                      <span className="font-semibold">{point.value}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(point.value / maxValue) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardChartsSection;
