import { Component, Host, h, Prop, Event, EventEmitter, Element, Listen, Watch } from '@stencil/core';
import type { CheckboxGroupVariant, CheckboxGroupOrientation, CheckboxSize } from '../../utils/types';

@Component({
  tag: 'aegov-checkbox-group',
  styleUrl: 'aegov-checkbox-group.css',
  scoped: false,
  shadow: false,
})
export class AegovCheckboxGroup {
  @Element() el: HTMLElement;

  /** Visual variant for the group layout. */
  @Prop() variant: CheckboxGroupVariant = 'default';

  /** Stack direction for checkbox items. */
  @Prop() orientation: CheckboxGroupOrientation = 'vertical';

  /** Optional label rendered as a <legend> for accessibility. */
  @Prop() label?: string;

  /** Size of all checkboxes in the group. Propagated to children. */
  @Prop() size: CheckboxSize = 'base';

  /** Disables all checkboxes within the group via native fieldset disabled. */
  @Prop() disabled: boolean = false;

  /** Additional CSS classes to apply. */
  @Prop() class?: string;

  /** Emitted when any checkbox in the group changes. Contains all currently checked values. */
  @Event() aegovCheckboxGroupChange: EventEmitter<{ values: string[] }>;

  componentDidLoad() {
    this.syncChildren();
    this.updateCheckAllState();
  }

  componentDidUpdate() {
    this.syncChildren();
    this.updateCheckAllState();
  }

  @Watch('size')
  onSizeChange() {
    this.syncChildren();
  }

  private syncChildren() {
    const checkboxes = Array.from(this.el.querySelectorAll('aegov-checkbox')) as HTMLAegovCheckboxElement[];
    checkboxes.forEach(cb => {
      cb.size = this.size;
    });
  }

  private getRegularCheckboxes(): HTMLAegovCheckboxElement[] {
    return Array.from(this.el.querySelectorAll('aegov-checkbox')).filter(cb => !cb.checkAll);
  }

  private getCheckAllCheckbox(): HTMLAegovCheckboxElement | null {
    return this.el.querySelector('aegov-checkbox[check-all]') as HTMLAegovCheckboxElement | null;
  }

  @Listen('aegovCheckboxChange')
  handleCheckboxChange(event: CustomEvent<{ checked: boolean; value?: string }>) {
    const target = event.target as HTMLAegovCheckboxElement;

    if (target.checkAll) {
      this.handleCheckAllToggle(event.detail.checked);
    } else {
      this.updateCheckAllState();
    }

    this.emitGroupChange();
  }

  private handleCheckAllToggle(checked: boolean) {
    const checkboxes = this.getRegularCheckboxes();
    checkboxes.forEach(cb => {
      if (!cb.disabled) {
        cb.checked = checked;
      }
    });
  }

  private updateCheckAllState() {
    const checkAll = this.getCheckAllCheckbox();
    if (!checkAll) return;

    const checkboxes = this.getRegularCheckboxes();
    const enabledCheckboxes = checkboxes.filter(cb => !cb.disabled);
    const checkedCount = enabledCheckboxes.filter(cb => cb.checked).length;
    const total = enabledCheckboxes.length;

    if (total === 0) return;

    if (checkedCount === 0) {
      checkAll.checked = false;
      checkAll.indeterminate = false;
    } else if (checkedCount === total) {
      checkAll.checked = true;
      checkAll.indeterminate = false;
    } else {
      checkAll.checked = false;
      checkAll.indeterminate = true;
    }
  }

  private emitGroupChange() {
    const checkboxes = this.getRegularCheckboxes();
    const values = checkboxes
      .filter(cb => cb.checked)
      .map(cb => cb.value)
      .filter((v): v is string => v != null);
    this.aegovCheckboxGroupChange.emit({ values });
  }

  private getGroupClasses(): string {
    const classes = ['aegov-checkbox-group'];
    if (this.variant !== 'default') {
      classes.push(`checkbox-group--${this.variant}`);
    }
    if (this.orientation === 'horizontal') {
      classes.push('checkbox-group--horizontal');
    }
    if (this.class) {
      classes.push(this.class);
    }
    return classes.join(' ');
  }

  render() {
    return (
      <Host>
        <fieldset class={this.getGroupClasses()} disabled={this.disabled}>
          {this.label && <legend class="checkbox-group__legend">{this.label}</legend>}
          <div class="checkbox-group__items">
            <slot />
          </div>
        </fieldset>
      </Host>
    );
  }
}
