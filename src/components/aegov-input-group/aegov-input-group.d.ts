export declare class AegovInputGroup {
    el: HTMLElement;
    /** The size of the input group. Propagated to child aegov-input and aegov-button. */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /** Text to display as a prefix addon before the input. */
    addonPrefix?: string;
    /** Text to display as a suffix addon after the input. */
    addonSuffix?: string;
    /** Additional CSS classes to apply. */
    extraClass?: string;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onSizeChange(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    private propagateSize;
    private getGroupClasses;
    render(): any;
}
