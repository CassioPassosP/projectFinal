import * as React from "react";
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

// Temas base (light/dark)
const THEMES = {
  light: "",
  dark: ".dark",
};

// Contexto global do gráfico
const ChartContext = React.createContext(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

// Container do gráfico
const ChartContainer = React.forwardRef(({ id, className, children, config = {}, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
          "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";

// Injeta cores dinâmicas via CSS
const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(([_, v]) => v.theme || v.color);
  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : "";
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};

// Tooltip padrão do Recharts
const ChartTooltip = Tooltip;

// Conteúdo customizado do Tooltip
const ChartTooltipContent = React.forwardRef(
  (
    {
      active,
      payload,
      label,
      hideLabel = false,
      indicator = "dot",
      className,
      labelFormatter,
    },
    ref
  ) => {
    const { config } = useChart();

    if (!active || !payload?.length) return null;

    const tooltipLabel = !hideLabel && (
      <div className="font-medium">
        {labelFormatter ? labelFormatter(label) : label}
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {tooltipLabel}
        <div className="grid gap-1.5">
          {payload.map((item) => {
            const key = item.name || item.dataKey;
            const color = item.color || "var(--color-primary)";
            const itemConfig = config[key] || {};

            return (
              <div key={key} className="flex items-center gap-2">
                {!itemConfig.icon && indicator === "dot" && (
                  <div
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: color }}
                  />
                )}
                <span className="text-muted-foreground">
                  {itemConfig.label || key}
                </span>
                <span className="ml-auto font-mono font-medium tabular-nums text-foreground">
                  {item.value?.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltipContent";

// Legend padrão
const ChartLegend = Legend;

// Legend customizada
const ChartLegendContent = React.forwardRef(
  ({ className, payload, hideIcon = false }, ref) => {
    const { config } = useChart();
    if (!payload?.length) return null;

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center gap-4 pt-3", className)}
      >
        {payload.map((item) => {
          const key = item.dataKey || item.value;
          const color = item.color || "var(--color-primary)";
          const itemConfig = config[key] || {};

          return (
            <div key={key} className="flex items-center gap-1.5">
              {!hideIcon && (
                <div
                  className="h-2 w-2 rounded-[2px]"
                  style={{ backgroundColor: color }}
                />
              )}
              <span>{itemConfig.label || key}</span>
            </div>
          );
        })}
      </div>
    );
  }
);
ChartLegendContent.displayName = "ChartLegendContent";

export {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};
