export declare class AegovFormField {
    el: HTMLElement;
    /** Unique ID for the form-field wrapper. Auto-generated if not provided. */
    fieldId?: string;
    /** Additional CSS classes to apply. */
    extraClass?: string;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    private linkChildren;
    private getFieldClasses;
    render(): any;
}
