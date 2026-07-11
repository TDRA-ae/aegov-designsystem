import type { TimelineVariant, TimelineSize, TimelineOrientation, TimelineStepStatus } from '../../utils/types';
export declare class AegovTimelineStep {
    el: HTMLAegovTimelineStepElement;
    /**
     * Step status.
     */
    status: TimelineStepStatus;
    /**
     * Optional description shown below the label.
     */
    description?: string;
    /**
     * @internal Set by parent.
     */
    variant: TimelineVariant;
    /**
     * @internal Set by parent.
     */
    size: TimelineSize;
    /**
     * @internal Set by parent.
     */
    orientation: TimelineOrientation;
    /**
     * @internal 0-based index, set by parent.
     */
    stepIndex: number;
    /**
     * @internal Total step count, set by parent.
     */
    stepCount: number;
    /**
     * @internal Set by parent.
     */
    isFirst: boolean;
    /**
     * @internal Set by parent.
     */
    isLast: boolean;
    /**
     * @internal Whether connector before this step is solid (prev completed). Set by parent.
     */
    isConnectorSolid: boolean;
    hasIconSlot: boolean;
    slotContent: string;
    onStatusChange(v: unknown): void;
    private get safeStatus();
    componentWillLoad(): void;
    private getCheckmarkIcon;
    private renderIndicator;
    /**
     * Horizontal before-connector (left side of indicator).
     * First step gets an invisible spacer for centering alignment.
     */
    private renderConnectorBefore;
    /**
     * Horizontal after-connector (right side of indicator).
     * Last step gets an invisible spacer for centering alignment.
     */
    private renderConnectorAfter;
    private renderLabel;
    private renderVerticalConnector;
    render(): any;
}
