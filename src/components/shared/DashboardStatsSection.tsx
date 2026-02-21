import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type DashboardStat = {
  title: string;
  value: string;
  hint: string;
  icon: LucideIcon;
};

interface DashboardStatsSectionProps {
  heading: string;
  description: string;
  stats: DashboardStat[];
}

const DashboardStatsSection = ({
  heading,
  description,
  stats,
}: DashboardStatsSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{heading}</h1>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title} className="border-muted/60">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-primary" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="mt-1 text-xs text-muted-foreground">{item.hint}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardStatsSection;
