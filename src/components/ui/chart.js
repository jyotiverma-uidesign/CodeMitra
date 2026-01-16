import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "../../lib/utils";
// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" };
const ChartContext = React.createContext(null);
function useChart() {
    const context = React.useContext(ChartContext);
    if (!context) {
        throw new Error("useChart must be used within a <ChartContainer />");
    }
    return context;
}
const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
    const uniqueId = React.useId();
    const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;
    return (_jsx(ChartContext.Provider, { value: { config }, children: _jsxs("div", { "data-chart": chartId, ref: ref, className: cn("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none", className), ...props, children: [_jsx(ChartStyle, { id: chartId, config: config }), _jsx(RechartsPrimitive.ResponsiveContainer, { children: children })] }) }));
});
ChartContainer.displayName = "Chart";
// Rest of the code stays unchanged
// Add optional chaining and type assertions where needed
const ChartStyle = ({ id, config }) => {
    const colorConfig = Object.entries(config).filter(([_, cfg]) => cfg.theme || cfg.color);
    if (!colorConfig.length)
        return null;
    return (_jsx("style", { dangerouslySetInnerHTML: {
            __html: Object.entries(THEMES)
                .map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
                .map(([key, itemConfig]) => {
                const color = itemConfig.theme?.[theme] ?? itemConfig.color;
                return color ? `  --color-${key}: ${color};` : null;
            })
                .join("\n")}
}
`)
                .join("\n"),
        } }));
};
const ChartTooltip = RechartsPrimitive.Tooltip;
// ForwardRef TooltipContent
const ChartTooltipContent = React.forwardRef((props, ref) => {
    const { config } = useChart();
    return _jsx(RechartsPrimitive.Tooltip, { ...props });
});
ChartTooltipContent.displayName = "ChartTooltip";
const ChartLegend = RechartsPrimitive.Legend;
const ChartLegendContent = React.forwardRef((props, ref) => {
    const { config } = useChart();
    return _jsx(RechartsPrimitive.Legend, { ...props });
});
ChartLegendContent.displayName = "ChartLegend";
// Helper function
function getPayloadConfigFromPayload(config, payload, key) {
    if (!payload || typeof payload !== "object")
        return undefined;
    const payloadPayload = payload?.payload ?? undefined;
    let configLabelKey = key;
    if (key in payload && typeof payload[key] === "string")
        configLabelKey = payload[key];
    else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string")
        configLabelKey = payloadPayload[key];
    return configLabelKey in config ? config[configLabelKey] : config[key];
}
export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };
