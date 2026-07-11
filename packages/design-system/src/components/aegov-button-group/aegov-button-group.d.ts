import { ButtonGroupOrientation } from '../../utils/types';
/**
 * @slot - Button elements to be grouped together
 */
export declare class AegovButtonGroup {
    el: HTMLElement;
    /**
     * The orientation of the button group
     */
    orientation: ButtonGroupOrientation;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    watchOrientation(v: unknown): void;
    /**
     * Gets direct child button elements only (no nested buttons)
     */
    private getDirectChildButtons;
    /**
     * Validates that all direct children are aegov-button elements
     */
    private validateChildren;
    /**
     * Updates button states based on their position in the group
     */
    private updateButtons;
    render(): any;
}
