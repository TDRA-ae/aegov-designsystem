export declare class AegovLabel {
    el: HTMLElement;
    /** Unique ID for the label element. Auto-generated if not provided. */
    fieldId?: string;
    /** The ID of the form element this label is for. Automatically set by parent aegov-form-field. */
    htmlFor?: string;
    /** Additional CSS classes to apply. */
    extraClass?: string;
    componentWillLoad(): void;
    private getLabelClasses;
    render(): any;
}
