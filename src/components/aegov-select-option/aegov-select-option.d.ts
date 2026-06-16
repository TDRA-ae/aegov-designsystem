export declare class AegovSelectOption {
    el: HTMLElement;
    /** The value of this option. */
    value: string;
    /** Whether this option is disabled. */
    isDisabled: boolean;
    /** Internal: label text captured from slot content. */
    slotContent: string;
    componentWillLoad(): void;
    render(): any;
}
