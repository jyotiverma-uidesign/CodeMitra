import { GripVertical } from "lucide-react";
import { Panel } from "react-resizable-panels"; // latest v4
import { cn } from "../../lib/utils";

/**
 * ResizablePanelGroup
 * Wrapper div to simulate PanelGroup functionality
 */
const ResizablePanelGroup = ({
  children,
  className,
  vertical = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { vertical?: boolean }) => (
  <div
    className={cn(
      "flex h-full w-full",
      vertical ? "flex-col" : "flex-row",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

/**
 * ResizablePanel
 * Just wraps Panel from latest v4
 */
const ResizablePanel = Panel;

/**
 * ResizableHandle
 * Custom div to act as resize handle
 */
const ResizableHandle = ({
  withHandle,
  vertical = false,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { withHandle?: boolean; vertical?: boolean }) => (
  <div
    {...props}
    className={cn(
      "relative flex items-center justify-center bg-border",
      vertical ? "h-px w-full" : "w-px h-full",
      className
    )}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </div>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
