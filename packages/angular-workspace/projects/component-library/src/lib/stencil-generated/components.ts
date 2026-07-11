/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from '@aegov/designsystem-testing/components';

import { defineCustomElement as defineAegovAccordion } from '@aegov/designsystem-testing/components/aegov-accordion.js';
import { defineCustomElement as defineAegovAccordionItem } from '@aegov/designsystem-testing/components/aegov-accordion-item.js';
import { defineCustomElement as defineAegovAspectRatio } from '@aegov/designsystem-testing/components/aegov-aspect-ratio.js';
import { defineCustomElement as defineAegovAvatar } from '@aegov/designsystem-testing/components/aegov-avatar.js';
import { defineCustomElement as defineAegovAvatarGroup } from '@aegov/designsystem-testing/components/aegov-avatar-group.js';
import { defineCustomElement as defineAegovBadge } from '@aegov/designsystem-testing/components/aegov-badge.js';
import { defineCustomElement as defineAegovBanner } from '@aegov/designsystem-testing/components/aegov-banner.js';
import { defineCustomElement as defineAegovBentoGrid } from '@aegov/designsystem-testing/components/aegov-bento-grid.js';
import { defineCustomElement as defineAegovBlockquote } from '@aegov/designsystem-testing/components/aegov-blockquote.js';
import { defineCustomElement as defineAegovBreadcrumbs } from '@aegov/designsystem-testing/components/aegov-breadcrumbs.js';
import { defineCustomElement as defineAegovBreadcrumbsItem } from '@aegov/designsystem-testing/components/aegov-breadcrumbs-item.js';
import { defineCustomElement as defineAegovButton } from '@aegov/designsystem-testing/components/aegov-button.js';
import { defineCustomElement as defineAegovButtonGroup } from '@aegov/designsystem-testing/components/aegov-button-group.js';
import { defineCustomElement as defineAegovCallout } from '@aegov/designsystem-testing/components/aegov-callout.js';
import { defineCustomElement as defineAegovCard } from '@aegov/designsystem-testing/components/aegov-card.js';
import { defineCustomElement as defineAegovCheckbox } from '@aegov/designsystem-testing/components/aegov-checkbox.js';
import { defineCustomElement as defineAegovCheckboxGroup } from '@aegov/designsystem-testing/components/aegov-checkbox-group.js';
import { defineCustomElement as defineAegovDatepicker } from '@aegov/designsystem-testing/components/aegov-datepicker.js';
import { defineCustomElement as defineAegovDrawer } from '@aegov/designsystem-testing/components/aegov-drawer.js';
import { defineCustomElement as defineAegovDropdown } from '@aegov/designsystem-testing/components/aegov-dropdown.js';
import { defineCustomElement as defineAegovFileupload } from '@aegov/designsystem-testing/components/aegov-fileupload.js';
import { defineCustomElement as defineAegovFormField } from '@aegov/designsystem-testing/components/aegov-form-field.js';
import { defineCustomElement as defineAegovHeader } from '@aegov/designsystem-testing/components/aegov-header.js';
import { defineCustomElement as defineAegovHeaderBanner } from '@aegov/designsystem-testing/components/aegov-header-banner.js';
import { defineCustomElement as defineAegovInput } from '@aegov/designsystem-testing/components/aegov-input.js';
import { defineCustomElement as defineAegovInputGroup } from '@aegov/designsystem-testing/components/aegov-input-group.js';
import { defineCustomElement as defineAegovLabel } from '@aegov/designsystem-testing/components/aegov-label.js';
import { defineCustomElement as defineAegovLink } from '@aegov/designsystem-testing/components/aegov-link.js';
import { defineCustomElement as defineAegovModal } from '@aegov/designsystem-testing/components/aegov-modal.js';
import { defineCustomElement as defineAegovNavbar } from '@aegov/designsystem-testing/components/aegov-navbar.js';
import { defineCustomElement as defineAegovNavbarItem } from '@aegov/designsystem-testing/components/aegov-navbar-item.js';
import { defineCustomElement as defineAegovNavblock } from '@aegov/designsystem-testing/components/aegov-navblock.js';
import { defineCustomElement as defineAegovNavblockItem } from '@aegov/designsystem-testing/components/aegov-navblock-item.js';
import { defineCustomElement as defineAegovOtp } from '@aegov/designsystem-testing/components/aegov-otp.js';
import { defineCustomElement as defineAegovPagination } from '@aegov/designsystem-testing/components/aegov-pagination.js';
import { defineCustomElement as defineAegovPopover } from '@aegov/designsystem-testing/components/aegov-popover.js';
import { defineCustomElement as defineAegovProgress } from '@aegov/designsystem-testing/components/aegov-progress.js';
import { defineCustomElement as defineAegovRadio } from '@aegov/designsystem-testing/components/aegov-radio.js';
import { defineCustomElement as defineAegovRadioGroup } from '@aegov/designsystem-testing/components/aegov-radio-group.js';
import { defineCustomElement as defineAegovRange } from '@aegov/designsystem-testing/components/aegov-range.js';
import { defineCustomElement as defineAegovSelect } from '@aegov/designsystem-testing/components/aegov-select.js';
import { defineCustomElement as defineAegovSelectOption } from '@aegov/designsystem-testing/components/aegov-select-option.js';
import { defineCustomElement as defineAegovSelectOptionGroup } from '@aegov/designsystem-testing/components/aegov-select-option-group.js';
import { defineCustomElement as defineAegovSeparator } from '@aegov/designsystem-testing/components/aegov-separator.js';
import { defineCustomElement as defineAegovTab } from '@aegov/designsystem-testing/components/aegov-tab.js';
import { defineCustomElement as defineAegovTabPanel } from '@aegov/designsystem-testing/components/aegov-tab-panel.js';
import { defineCustomElement as defineAegovTabs } from '@aegov/designsystem-testing/components/aegov-tabs.js';
import { defineCustomElement as defineAegovText } from '@aegov/designsystem-testing/components/aegov-text.js';
import { defineCustomElement as defineAegovTextarea } from '@aegov/designsystem-testing/components/aegov-textarea.js';
import { defineCustomElement as defineAegovTimeline } from '@aegov/designsystem-testing/components/aegov-timeline.js';
import { defineCustomElement as defineAegovTimelineStep } from '@aegov/designsystem-testing/components/aegov-timeline-step.js';
import { defineCustomElement as defineAegovTitle } from '@aegov/designsystem-testing/components/aegov-title.js';
import { defineCustomElement as defineAegovToast } from '@aegov/designsystem-testing/components/aegov-toast.js';
import { defineCustomElement as defineAegovToggle } from '@aegov/designsystem-testing/components/aegov-toggle.js';
import { defineCustomElement as defineAegovTooltip } from '@aegov/designsystem-testing/components/aegov-tooltip.js';
@ProxyCmp({
  defineCustomElementFn: defineAegovAccordion,
  inputs: ['defaultOpen', 'fieldId', 'headingLevel', 'icon', 'isBordered', 'isMultiple', 'size']
})
@Component({
  selector: 'aegov-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['defaultOpen', 'fieldId', 'headingLevel', 'icon', 'isBordered', 'isMultiple', 'size'],
})
export class AegovAccordion {
  protected el: HTMLAegovAccordionElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovAccordion extends Components.AegovAccordion {}


@ProxyCmp({
  defineCustomElementFn: defineAegovAccordionItem,
  inputs: ['heading', 'isDisabled']
})
@Component({
  selector: 'aegov-accordion-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['heading', 'isDisabled'],
  outputs: ['aegovAccordionItemToggle'],
})
export class AegovAccordionItem {
  protected el: HTMLAegovAccordionItemElement;
  @Output() aegovAccordionItemToggle = new EventEmitter<AegovAccordionItemCustomEvent<{ open: boolean }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovAccordionItemCustomEvent } from '@aegov/designsystem-testing/components';

export declare interface AegovAccordionItem extends Components.AegovAccordionItem {
  /**
   * Emitted when the accordion item is toggled
   */
  aegovAccordionItemToggle: EventEmitter<AegovAccordionItemCustomEvent<{ open: boolean }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovAspectRatio,
  inputs: ['extraClass', 'fit', 'ratio']
})
@Component({
  selector: 'aegov-aspect-ratio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['extraClass', 'fit', 'ratio'],
})
export class AegovAspectRatio {
  protected el: HTMLAegovAspectRatioElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovAspectRatio extends Components.AegovAspectRatio {}


@ProxyCmp({
  defineCustomElementFn: defineAegovAvatar,
  inputs: ['alt', 'appearance', 'fieldId', 'size', 'src', 'status']
})
@Component({
  selector: 'aegov-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alt', 'appearance', 'fieldId', 'size', 'src', 'status'],
})
export class AegovAvatar {
  protected el: HTMLAegovAvatarElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovAvatar extends Components.AegovAvatar {}


@ProxyCmp({
  defineCustomElementFn: defineAegovAvatarGroup,
  inputs: ['moreCount', 'moreText', 'size', 'variant']
})
@Component({
  selector: 'aegov-avatar-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['moreCount', 'moreText', 'size', 'variant'],
  outputs: ['aegovAvatarGroupMore'],
})
export class AegovAvatarGroup {
  protected el: HTMLAegovAvatarGroupElement;
  @Output() aegovAvatarGroupMore = new EventEmitter<AegovAvatarGroupCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovAvatarGroupCustomEvent } from '@aegov/designsystem-testing/components';

export declare interface AegovAvatarGroup extends Components.AegovAvatarGroup {
  /**
   * Emitted when the "more" indicator button is clicked
   */
  aegovAvatarGroupMore: EventEmitter<AegovAvatarGroupCustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovBadge,
  inputs: ['appearance', 'color', 'fieldId', 'isDismissible', 'size', 'variant']
})
@Component({
  selector: 'aegov-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'color', 'fieldId', 'isDismissible', 'size', 'variant'],
  outputs: ['aegovBadgeDismiss'],
})
export class AegovBadge {
  protected el: HTMLAegovBadgeElement;
  @Output() aegovBadgeDismiss = new EventEmitter<AegovBadgeCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovBadgeCustomEvent } from '@aegov/designsystem-testing/components';

export declare interface AegovBadge extends Components.AegovBadge {
  /**
   * Emitted when the dismiss button is clicked.
   */
  aegovBadgeDismiss: EventEmitter<AegovBadgeCustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovBanner,
  inputs: ['appearance', 'display', 'fieldId', 'heading', 'isDismissible', 'isFocusable', 'mode', 'position', 'size', 'variant']
})
@Component({
  selector: 'aegov-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'display', 'fieldId', 'heading', 'isDismissible', 'isFocusable', 'mode', 'position', 'size', 'variant'],
  outputs: ['aegovBannerDismiss', 'aegovBannerHeightChange'],
})
export class AegovBanner {
  protected el: HTMLAegovBannerElement;
  @Output() aegovBannerDismiss = new EventEmitter<AegovBannerCustomEvent<void>>();
  @Output() aegovBannerHeightChange = new EventEmitter<AegovBannerCustomEvent<{ height: number }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovBannerCustomEvent } from '@aegov/designsystem-testing/components';

export declare interface AegovBanner extends Components.AegovBanner {
  /**
   * Event emitted when the banner is dismissed.
   */
  aegovBannerDismiss: EventEmitter<AegovBannerCustomEvent<void>>;
  /**
   * Event emitted when banner height changes (useful for overlay mode to adjust body padding).
   */
  aegovBannerHeightChange: EventEmitter<AegovBannerCustomEvent<{ height: number }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovBentoGrid,
  inputs: ['cols', 'fieldId', 'flow', 'gap']
})
@Component({
  selector: 'aegov-bento-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['cols', 'fieldId', 'flow', 'gap'],
})
export class AegovBentoGrid {
  protected el: HTMLAegovBentoGridElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovBentoGrid extends Components.AegovBentoGrid {}


@ProxyCmp({
  defineCustomElementFn: defineAegovBlockquote,
  inputs: ['appearance', 'author', 'authorTitle', 'cite', 'extraClass']
})
@Component({
  selector: 'aegov-blockquote',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'author', 'authorTitle', 'cite', 'extraClass'],
})
export class AegovBlockquote {
  protected el: HTMLAegovBlockquoteElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovBlockquote extends Components.AegovBlockquote {}


@ProxyCmp({
  defineCustomElementFn: defineAegovBreadcrumbs,
  inputs: ['fieldId', 'isMicrodata', 'maxLength', 'separator']
})
@Component({
  selector: 'aegov-breadcrumbs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['fieldId', 'isMicrodata', 'maxLength', 'separator'],
})
export class AegovBreadcrumbs {
  protected el: HTMLAegovBreadcrumbsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovBreadcrumbs extends Components.AegovBreadcrumbs {}


@ProxyCmp({
  defineCustomElementFn: defineAegovBreadcrumbsItem,
  inputs: ['href', 'target']
})
@Component({
  selector: 'aegov-breadcrumbs-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['href', 'target'],
  outputs: ['aegovBreadcrumbItemClick'],
})
export class AegovBreadcrumbsItem {
  protected el: HTMLAegovBreadcrumbsItemElement;
  @Output() aegovBreadcrumbItemClick = new EventEmitter<AegovBreadcrumbsItemCustomEvent<{ href?: string; event: MouseEvent }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovBreadcrumbsItemCustomEvent } from '@aegov/designsystem-testing/components';

export declare interface AegovBreadcrumbsItem extends Components.AegovBreadcrumbsItem {
  /**
   * Emitted when the breadcrumb item is clicked
   */
  aegovBreadcrumbItemClick: EventEmitter<AegovBreadcrumbsItemCustomEvent<{ href?: string; event: MouseEvent }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovButton,
  inputs: ['appearance', 'fieldId', 'isBold', 'isDisabled', 'isFull', 'isIcon', 'isLoading', 'size', 'type', 'variant']
})
@Component({
  selector: 'aegov-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'fieldId', 'isBold', 'isDisabled', 'isFull', 'isIcon', 'isLoading', 'size', 'type', 'variant'],
  outputs: ['aegovButtonClick', 'aegovButtonFocus', 'aegovButtonBlur'],
})
export class AegovButton {
  protected el: HTMLAegovButtonElement;
  @Output() aegovButtonClick = new EventEmitter<AegovButtonCustomEvent<MouseEvent>>();
  @Output() aegovButtonFocus = new EventEmitter<AegovButtonCustomEvent<FocusEvent>>();
  @Output() aegovButtonBlur = new EventEmitter<AegovButtonCustomEvent<FocusEvent>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovButtonCustomEvent } from '@aegov/designsystem-testing/components';

export declare interface AegovButton extends Components.AegovButton {
  /**
   * Emitted when the button is clicked
   */
  aegovButtonClick: EventEmitter<AegovButtonCustomEvent<MouseEvent>>;
  /**
   * Emitted when the button receives focus
   */
  aegovButtonFocus: EventEmitter<AegovButtonCustomEvent<FocusEvent>>;
  /**
   * Emitted when the button loses focus
   */
  aegovButtonBlur: EventEmitter<AegovButtonCustomEvent<FocusEvent>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovButtonGroup,
  inputs: ['orientation']
})
@Component({
  selector: 'aegov-button-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['orientation'],
})
export class AegovButtonGroup {
  protected el: HTMLAegovButtonGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovButtonGroup extends Components.AegovButtonGroup {}


@ProxyCmp({
  defineCustomElementFn: defineAegovCallout,
  inputs: ['appearance', 'fieldId', 'isDismissible', 'size', 'variant']
})
@Component({
  selector: 'aegov-callout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'fieldId', 'isDismissible', 'size', 'variant'],
  outputs: ['aegovCalloutDismiss'],
})
export class AegovCallout {
  protected el: HTMLAegovCalloutElement;
  @Output() aegovCalloutDismiss = new EventEmitter<AegovCalloutCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovCalloutCustomEvent } from '@aegov/designsystem-testing/components';

export declare interface AegovCallout extends Components.AegovCallout {
  /**
   * Event emitted when the callout is dismissed.
   */
  aegovCalloutDismiss: EventEmitter<AegovCalloutCustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovCard,
  inputs: ['appearance', 'borderWidth', 'dataColSpan', 'dataRowSpan', 'fieldId', 'hover', 'isPadding', 'size', 'variant']
})
@Component({
  selector: 'aegov-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'borderWidth', 'dataColSpan', 'dataRowSpan', 'fieldId', 'hover', 'isPadding', 'size', 'variant'],
})
export class AegovCard {
  protected el: HTMLAegovCardElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovCard extends Components.AegovCard {}


@ProxyCmp({
  defineCustomElementFn: defineAegovCheckbox,
  inputs: ['errorMessage', 'extraClass', 'fieldId', 'hint', 'isCheckAll', 'isChecked', 'isDisabled', 'isIndeterminate', 'isInvalid', 'isRequired', 'label', 'name', 'size', 'value', 'variant'],
  methods: ['validate', 'setCustomValidity']
})
@Component({
  selector: 'aegov-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['errorMessage', 'extraClass', 'fieldId', 'hint', 'isCheckAll', 'isChecked', 'isDisabled', 'isIndeterminate', 'isInvalid', 'isRequired', 'label', 'name', 'size', 'value', 'variant'],
  outputs: ['aegovCheckboxChange', 'aegovValidate'],
})
export class AegovCheckbox {
  protected el: HTMLAegovCheckboxElement;
  @Output() aegovCheckboxChange = new EventEmitter<AegovCheckboxCustomEvent<{ checked: boolean; value?: string }>>();
  @Output() aegovValidate = new EventEmitter<AegovCheckboxCustomEvent<IAegovCheckboxAegovValidationDetail<boolean>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovCheckboxCustomEvent } from '@aegov/designsystem-testing/components';
import type { AegovValidationDetail as IAegovCheckboxAegovValidationDetail } from '@aegov/designsystem-testing/components';

export declare interface AegovCheckbox extends Components.AegovCheckbox {
  /**
   * Emitted when the checkbox checked state changes.
   */
  aegovCheckboxChange: EventEmitter<AegovCheckboxCustomEvent<{ checked: boolean; value?: string }>>;
  /**
   * Unified validation event. See §2.3.
   */
  aegovValidate: EventEmitter<AegovCheckboxCustomEvent<IAegovCheckboxAegovValidationDetail<boolean>>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovCheckboxGroup,
  inputs: ['appearance', 'errorMessage', 'extraClass', 'hint', 'isDisabled', 'isInvalid', 'isRequired', 'label', 'orientation', 'size', 'variant'],
  methods: ['validate', 'setCustomValidity']
})
@Component({
  selector: 'aegov-checkbox-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'errorMessage', 'extraClass', 'hint', 'isDisabled', 'isInvalid', 'isRequired', 'label', 'orientation', 'size', 'variant'],
  outputs: ['aegovCheckboxGroupChange', 'aegovValidate'],
})
export class AegovCheckboxGroup {
  protected el: HTMLAegovCheckboxGroupElement;
  @Output() aegovCheckboxGroupChange = new EventEmitter<AegovCheckboxGroupCustomEvent<{ values: string[] }>>();
  @Output() aegovValidate = new EventEmitter<AegovCheckboxGroupCustomEvent<IAegovCheckboxGroupAegovValidationDetail<string[]>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovCheckboxGroupCustomEvent } from '@aegov/designsystem-testing/components';
import type { AegovValidationDetail as IAegovCheckboxGroupAegovValidationDetail } from '@aegov/designsystem-testing/components';

export declare interface AegovCheckboxGroup extends Components.AegovCheckboxGroup {
  /**
   * Emitted when any checkbox in the group changes. Contains all currently checked values.
   */
  aegovCheckboxGroupChange: EventEmitter<AegovCheckboxGroupCustomEvent<{ values: string[] }>>;
  /**
   * Unified validation event (group-level aggregate). See §2.3.
   */
  aegovValidate: EventEmitter<AegovCheckboxGroupCustomEvent<IAegovCheckboxGroupAegovValidationDetail<string[]>>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovDatepicker,
  inputs: ['appearance', 'blackout', 'errorMessage', 'fieldId', 'format', 'hint', 'isClearable', 'isDisableFuture', 'isDisabled', 'isHeaderSelectable', 'isInvalid', 'isRequired', 'isWithConfirmation', 'labelRangeEnd', 'labelRangeStart', 'locale', 'max', 'maxRange', 'min', 'minRange', 'name', 'placeholder', 'presets', 'size', 'startDay', 'value', 'variant', 'yearRangeEnd', 'yearRangeStart'],
  methods: ['validate', 'setCustomValidity', 'open', 'close', 'clear', 'getValue', 'getStartDate', 'getEndDate', 'getPreset']
})
@Component({
  selector: 'aegov-datepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'blackout', 'errorMessage', 'fieldId', 'format', 'hint', 'isClearable', 'isDisableFuture', 'isDisabled', 'isHeaderSelectable', 'isInvalid', 'isRequired', 'isWithConfirmation', 'labelRangeEnd', 'labelRangeStart', 'locale', 'max', 'maxRange', 'min', 'minRange', 'name', 'placeholder', 'presets', 'size', 'startDay', 'value', 'variant', 'yearRangeEnd', 'yearRangeStart'],
  outputs: ['aegovDatepickerChange', 'aegovDatepickerOpen', 'aegovDatepickerClose', 'aegovDatepickerClear', 'aegovDatepickerMonthChange', 'aegovValidate'],
})
export class AegovDatepicker {
  protected el: HTMLAegovDatepickerElement;
  @Output() aegovDatepickerChange = new EventEmitter<AegovDatepickerCustomEvent<IAegovDatepickerDatepickerChangeDetail>>();
  @Output() aegovDatepickerOpen = new EventEmitter<AegovDatepickerCustomEvent<void>>();
  @Output() aegovDatepickerClose = new EventEmitter<AegovDatepickerCustomEvent<void>>();
  @Output() aegovDatepickerClear = new EventEmitter<AegovDatepickerCustomEvent<void>>();
  @Output() aegovDatepickerMonthChange = new EventEmitter<AegovDatepickerCustomEvent<IAegovDatepickerDatepickerMonthChangeDetail>>();
  @Output() aegovValidate = new EventEmitter<AegovDatepickerCustomEvent<IAegovDatepickerAegovValidationDetail<IAegovDatepickerAegovDatepickerValue>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovDatepickerCustomEvent } from '@aegov/designsystem-testing/components';
import type { DatepickerChangeDetail as IAegovDatepickerDatepickerChangeDetail } from '@aegov/designsystem-testing/components';
import type { DatepickerMonthChangeDetail as IAegovDatepickerDatepickerMonthChangeDetail } from '@aegov/designsystem-testing/components';
import type { AegovValidationDetail as IAegovDatepickerAegovValidationDetail } from '@aegov/designsystem-testing/components';
import type { AegovDatepickerValue as IAegovDatepickerAegovDatepickerValue } from '@aegov/designsystem-testing/components';

export declare interface AegovDatepicker extends Components.AegovDatepicker {

  aegovDatepickerChange: EventEmitter<AegovDatepickerCustomEvent<IAegovDatepickerDatepickerChangeDetail>>;

  aegovDatepickerOpen: EventEmitter<AegovDatepickerCustomEvent<void>>;

  aegovDatepickerClose: EventEmitter<AegovDatepickerCustomEvent<void>>;

  aegovDatepickerClear: EventEmitter<AegovDatepickerCustomEvent<void>>;

  aegovDatepickerMonthChange: EventEmitter<AegovDatepickerCustomEvent<IAegovDatepickerDatepickerMonthChangeDetail>>;
  /**
   * Unified validation event. See §2.3.
   */
  aegovValidate: EventEmitter<AegovDatepickerCustomEvent<IAegovDatepickerAegovValidationDetail<IAegovDatepickerAegovDatepickerValue>>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovDrawer,
  inputs: ['animation', 'fieldId', 'isCloseWithOverlay', 'isOpen', 'isOverlay', 'isPadding', 'isPinned', 'isPreventScroll', 'label', 'overlayOpacity', 'position', 'size'],
  methods: ['show', 'close', 'toggle']
})
@Component({
  selector: 'aegov-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['animation', 'fieldId', 'isCloseWithOverlay', 'isOpen', 'isOverlay', 'isPadding', 'isPinned', 'isPreventScroll', 'label', 'overlayOpacity', 'position', 'size'],
  outputs: ['aegovDrawerOpen', 'aegovDrawerClose', 'aegovDrawerBeforeClose', 'aegovDrawerBackdropClick', 'aegovDrawerEscapePress'],
})
export class AegovDrawer {
  protected el: HTMLAegovDrawerElement;
  @Output() aegovDrawerOpen = new EventEmitter<AegovDrawerCustomEvent<void>>();
  @Output() aegovDrawerClose = new EventEmitter<AegovDrawerCustomEvent<void>>();
  @Output() aegovDrawerBeforeClose = new EventEmitter<AegovDrawerCustomEvent<{ preventDefault: () => void }>>();
  @Output() aegovDrawerBackdropClick = new EventEmitter<AegovDrawerCustomEvent<MouseEvent>>();
  @Output() aegovDrawerEscapePress = new EventEmitter<AegovDrawerCustomEvent<KeyboardEvent>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovDrawerCustomEvent } from '@aegov/designsystem-testing/components';

export declare interface AegovDrawer extends Components.AegovDrawer {
  /**
   * Emitted when drawer is opened
   */
  aegovDrawerOpen: EventEmitter<AegovDrawerCustomEvent<void>>;
  /**
   * Emitted when drawer is closed
   */
  aegovDrawerClose: EventEmitter<AegovDrawerCustomEvent<void>>;
  /**
   * Emitted before drawer closes (cancellable)
   */
  aegovDrawerBeforeClose: EventEmitter<AegovDrawerCustomEvent<{ preventDefault: () => void }>>;
  /**
   * Emitted when backdrop is clicked
   */
  aegovDrawerBackdropClick: EventEmitter<AegovDrawerCustomEvent<MouseEvent>>;
  /**
   * Emitted when ESC key is pressed
   */
  aegovDrawerEscapePress: EventEmitter<AegovDrawerCustomEvent<KeyboardEvent>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovDropdown,
  inputs: ['align', 'delayEnd', 'delayStart', 'fieldId', 'gap', 'isDisabled', 'offset', 'position', 'tabBehavior', 'trigger'],
  methods: ['closeDropdown', 'toggle']
})
@Component({
  selector: 'aegov-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'delayEnd', 'delayStart', 'fieldId', 'gap', 'isDisabled', 'offset', 'position', 'tabBehavior', 'trigger'],
  outputs: ['aegovDropdownOpen', 'aegovDropdownClose'],
})
export class AegovDropdown {
  protected el: HTMLAegovDropdownElement;
  @Output() aegovDropdownOpen = new EventEmitter<AegovDropdownCustomEvent<void>>();
  @Output() aegovDropdownClose = new EventEmitter<AegovDropdownCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovDropdownCustomEvent } from '@aegov/designsystem-testing/components';

export declare interface AegovDropdown extends Components.AegovDropdown {
  /**
   * Emitted when dropdown opens
   */
  aegovDropdownOpen: EventEmitter<AegovDropdownCustomEvent<void>>;
  /**
   * Emitted when dropdown closes
   */
  aegovDropdownClose: EventEmitter<AegovDropdownCustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovFileupload,
  inputs: ['accept', 'appearance', 'errorMessage', 'fieldId', 'hint', 'isDisabled', 'isInvalid', 'isMultiple', 'isRequired', 'label', 'labelButton', 'labelHelp', 'maxFileSize', 'maxFiles', 'name', 'size', 'variant'],
  methods: ['getFiles', 'clear', 'validate', 'setCustomValidity']
})
@Component({
  selector: 'aegov-fileupload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['accept', 'appearance', 'errorMessage', 'fieldId', 'hint', 'isDisabled', 'isInvalid', 'isMultiple', 'isRequired', 'label', 'labelButton', 'labelHelp', 'maxFileSize', 'maxFiles', 'name', 'size', 'variant'],
  outputs: ['aegovFileuploadChange', 'aegovFileuploadRemove', 'aegovValidate'],
})
export class AegovFileupload {
  protected el: HTMLAegovFileuploadElement;
  @Output() aegovFileuploadChange = new EventEmitter<AegovFileuploadCustomEvent<{ files: File[] }>>();
  @Output() aegovFileuploadRemove = new EventEmitter<AegovFileuploadCustomEvent<{ file: File; remaining: File[] }>>();
  @Output() aegovValidate = new EventEmitter<AegovFileuploadCustomEvent<IAegovFileuploadAegovValidationDetail<File[]>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovFileuploadCustomEvent } from '@aegov/designsystem-testing/components';
import type { AegovValidationDetail as IAegovFileuploadAegovValidationDetail } from '@aegov/designsystem-testing/components';

export declare interface AegovFileupload extends Components.AegovFileupload {
  /**
   * Emitted when the file selection changes.
   */
  aegovFileuploadChange: EventEmitter<AegovFileuploadCustomEvent<{ files: File[] }>>;
  /**
   * Emitted when a file is removed from the list (button/dropzone appearances).
   */
  aegovFileuploadRemove: EventEmitter<AegovFileuploadCustomEvent<{ file: File; remaining: File[] }>>;
  /**
   * Unified validation event. See §2.3.
   */
  aegovValidate: EventEmitter<AegovFileuploadCustomEvent<IAegovFileuploadAegovValidationDetail<File[]>>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovFormField,
  inputs: ['errorMessage', 'extraClass', 'fieldId', 'hint', 'isInvalid', 'variant']
})
@Component({
  selector: 'aegov-form-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['errorMessage', 'extraClass', 'fieldId', 'hint', 'isInvalid', 'variant'],
})
export class AegovFormField {
  protected el: HTMLAegovFormFieldElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovFormField extends Components.AegovFormField {}


@ProxyCmp({
  defineCustomElementFn: defineAegovHeader,
  inputs: ['entityDomain', 'entityName', 'logoLabel', 'skipContentContainer', 'variant']
})
@Component({
  selector: 'aegov-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['entityDomain', 'entityName', 'logoLabel', 'skipContentContainer', 'variant'],
})
export class AegovHeader {
  protected el: HTMLAegovHeaderElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovHeader extends Components.AegovHeader {}


@ProxyCmp({
  defineCustomElementFn: defineAegovHeaderBanner,
  inputs: ['entityDomain', 'entityName', 'skipContentContainer']
})
@Component({
  selector: 'aegov-header-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['entityDomain', 'entityName', 'skipContentContainer'],
})
export class AegovHeaderBanner {
  protected el: HTMLAegovHeaderBannerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovHeaderBanner extends Components.AegovHeaderBanner {}


@ProxyCmp({
  defineCustomElementFn: defineAegovInput,
  inputs: ['errorMessage', 'extraClass', 'fieldId', 'hint', 'isCopyable', 'isDisabled', 'isInvalid', 'isReadonly', 'isRequired', 'isRevealable', 'name', 'placeholder', 'size', 'type', 'value', 'variant'],
  methods: ['validate', 'setCustomValidity']
})
@Component({
  selector: 'aegov-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['errorMessage', 'extraClass', 'fieldId', 'hint', 'isCopyable', 'isDisabled', 'isInvalid', 'isReadonly', 'isRequired', 'isRevealable', 'name', 'placeholder', 'size', 'type', 'value', 'variant'],
  outputs: ['aegovInputChange', 'aegovInputValue', 'aegovInputFocus', 'aegovInputBlur', 'aegovValidate'],
})
export class AegovInput {
  protected el: HTMLAegovInputElement;
  @Output() aegovInputChange = new EventEmitter<AegovInputCustomEvent<{ value: string; event: globalThis.Event }>>();
  @Output() aegovInputValue = new EventEmitter<AegovInputCustomEvent<{ value: string; event: globalThis.Event }>>();
  @Output() aegovInputFocus = new EventEmitter<AegovInputCustomEvent<FocusEvent>>();
  @Output() aegovInputBlur = new EventEmitter<AegovInputCustomEvent<FocusEvent>>();
  @Output() aegovValidate = new EventEmitter<AegovInputCustomEvent<IAegovInputAegovValidationDetail<string>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovInputCustomEvent } from '@aegov/designsystem-testing/components';
import type { AegovValidationDetail as IAegovInputAegovValidationDetail } from '@aegov/designsystem-testing/components';

export declare interface AegovInput extends Components.AegovInput {
  /**
   * Emitted when the input value changes (on blur/enter).
   */
  aegovInputChange: EventEmitter<AegovInputCustomEvent<{ value: string; event: globalThis.Event }>>;
  /**
   * Emitted on every keystroke.
   */
  aegovInputValue: EventEmitter<AegovInputCustomEvent<{ value: string; event: globalThis.Event }>>;
  /**
   * Emitted when the input gains focus.
   */
  aegovInputFocus: EventEmitter<AegovInputCustomEvent<FocusEvent>>;
  /**
   * Emitted when the input loses focus.
   */
  aegovInputBlur: EventEmitter<AegovInputCustomEvent<FocusEvent>>;
  /**
   * Unified validation event emitted on input/change/blur/manual triggers.
Carries full validity snapshot for orchestrators (Layer 2) and BYO consumers.
See validation-engine-addon.md §2.3.
   */
  aegovValidate: EventEmitter<AegovInputCustomEvent<IAegovInputAegovValidationDetail<string>>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovInputGroup,
  inputs: ['addonPrefix', 'addonSuffix', 'extraClass', 'groupLabel', 'size', 'variant']
})
@Component({
  selector: 'aegov-input-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['addonPrefix', 'addonSuffix', 'extraClass', 'groupLabel', 'size', 'variant'],
})
export class AegovInputGroup {
  protected el: HTMLAegovInputGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovInputGroup extends Components.AegovInputGroup {}


@ProxyCmp({
  defineCustomElementFn: defineAegovLabel,
  inputs: ['extraClass', 'fieldId', 'htmlFor', 'variant']
})
@Component({
  selector: 'aegov-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['extraClass', 'fieldId', 'htmlFor', 'variant'],
})
export class AegovLabel {
  protected el: HTMLAegovLabelElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovLabel extends Components.AegovLabel {}


@ProxyCmp({
  defineCustomElementFn: defineAegovLink,
  inputs: ['appearance', 'extraClass', 'fieldId', 'href', 'isBold', 'isDisabled', 'isFull', 'isIcon', 'rel', 'size', 'target', 'variant']
})
@Component({
  selector: 'aegov-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'extraClass', 'fieldId', { name: 'href', required: true }, 'isBold', 'isDisabled', 'isFull', 'isIcon', 'rel', 'size', 'target', 'variant'],
  outputs: ['aegovLinkClick'],
})
export class AegovLink {
  protected el: HTMLAegovLinkElement;
  @Output() aegovLinkClick = new EventEmitter<AegovLinkCustomEvent<{ href: string; event: MouseEvent }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovLinkCustomEvent } from '@aegov/designsystem-testing/components';

export declare interface AegovLink extends Components.AegovLink {
  /**
   * Emitted when the link is clicked.
The event detail contains the href and can be used to implement custom navigation.
   */
  aegovLinkClick: EventEmitter<AegovLinkCustomEvent<{ href: string; event: MouseEvent }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovModal,
  inputs: ['fieldId', 'isCloseWithOverlay', 'isOpen', 'isPadding', 'isPreventScroll', 'label', 'overlayOpacity', 'position', 'size'],
  methods: ['show', 'close', 'toggle']
})
@Component({
  selector: 'aegov-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['fieldId', 'isCloseWithOverlay', 'isOpen', 'isPadding', 'isPreventScroll', 'label', 'overlayOpacity', 'position', 'size'],
  outputs: ['aegovModalOpen', 'aegovModalClose', 'aegovModalBeforeClose', 'aegovModalBackdropClick', 'aegovModalEscapePress'],
})
export class AegovModal {
  protected el: HTMLAegovModalElement;
  @Output() aegovModalOpen = new EventEmitter<AegovModalCustomEvent<void>>();
  @Output() aegovModalClose = new EventEmitter<AegovModalCustomEvent<void>>();
  @Output() aegovModalBeforeClose = new EventEmitter<AegovModalCustomEvent<void>>();
  @Output() aegovModalBackdropClick = new EventEmitter<AegovModalCustomEvent<MouseEvent>>();
  @Output() aegovModalEscapePress = new EventEmitter<AegovModalCustomEvent<KeyboardEvent>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovModalCustomEvent } from '@aegov/designsystem-testing/components';

export declare interface AegovModal extends Components.AegovModal {
  /**
   * Emitted when modal is opened
   */
  aegovModalOpen: EventEmitter<AegovModalCustomEvent<void>>;
  /**
   * Emitted when modal is closed
   */
  aegovModalClose: EventEmitter<AegovModalCustomEvent<void>>;
  /**
   * Emitted before modal closes (cancellable)
   */
  aegovModalBeforeClose: EventEmitter<AegovModalCustomEvent<void>>;
  /**
   * Emitted when backdrop is clicked
   */
  aegovModalBackdropClick: EventEmitter<AegovModalCustomEvent<MouseEvent>>;
  /**
   * Emitted when ESC key is pressed
   */
  aegovModalEscapePress: EventEmitter<AegovModalCustomEvent<KeyboardEvent>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovNavbar,
  inputs: ['gap', 'labelNav', 'size']
})
@Component({
  selector: 'aegov-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['gap', 'labelNav', 'size'],
})
export class AegovNavbar {
  protected el: HTMLAegovNavbarElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovNavbar extends Components.AegovNavbar {}


@ProxyCmp({
  defineCustomElementFn: defineAegovNavbarItem,
  inputs: ['href', 'isActive', 'isDisabled', 'rel', 'size', 'target']
})
@Component({
  selector: 'aegov-navbar-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['href', 'isActive', 'isDisabled', 'rel', 'size', 'target'],
})
export class AegovNavbarItem {
  protected el: HTMLAegovNavbarItemElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovNavbarItem extends Components.AegovNavbarItem {}


@ProxyCmp({
  defineCustomElementFn: defineAegovNavblock,
  inputs: ['activeBorder', 'blockTitle', 'fieldId', 'icon', 'isBordered', 'isMultiple', 'labelNav', 'size', 'variant']
})
@Component({
  selector: 'aegov-navblock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['activeBorder', 'blockTitle', 'fieldId', 'icon', 'isBordered', 'isMultiple', 'labelNav', 'size', 'variant'],
})
export class AegovNavblock {
  protected el: HTMLAegovNavblockElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovNavblock extends Components.AegovNavblock {}


@ProxyCmp({
  defineCustomElementFn: defineAegovNavblockItem,
  inputs: ['href', 'isActive', 'isDisabled', 'isOpen', 'rel', 'target']
})
@Component({
  selector: 'aegov-navblock-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['href', 'isActive', 'isDisabled', 'isOpen', 'rel', 'target'],
  outputs: ['aegovNavblockItemToggle'],
})
export class AegovNavblockItem {
  protected el: HTMLAegovNavblockItemElement;
  @Output() aegovNavblockItemToggle = new EventEmitter<AegovNavblockItemCustomEvent<{ open: boolean }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovNavblockItemCustomEvent } from '@aegov/designsystem-testing/components';

export declare interface AegovNavblockItem extends Components.AegovNavblockItem {
  /**
   * Emitted when the row toggles its sub-region.
   */
  aegovNavblockItemToggle: EventEmitter<AegovNavblockItemCustomEvent<{ open: boolean }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovOtp,
  inputs: ['appearance', 'errorMessage', 'extraClass', 'fieldId', 'hint', 'isAlphanumeric', 'isDisabled', 'isInvalid', 'isRequired', 'length', 'name', 'pattern', 'size', 'value', 'variant'],
  methods: ['clear', 'validate', 'setCustomValidity']
})
@Component({
  selector: 'aegov-otp',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'errorMessage', 'extraClass', 'fieldId', 'hint', 'isAlphanumeric', 'isDisabled', 'isInvalid', 'isRequired', 'length', 'name', 'pattern', 'size', 'value', 'variant'],
  outputs: ['aegovOtpChange', 'aegovOtpComplete', 'aegovValidate'],
})
export class AegovOtp {
  protected el: HTMLAegovOtpElement;
  @Output() aegovOtpChange = new EventEmitter<AegovOtpCustomEvent<{ value: string }>>();
  @Output() aegovOtpComplete = new EventEmitter<AegovOtpCustomEvent<{ value: string }>>();
  @Output() aegovValidate = new EventEmitter<AegovOtpCustomEvent<IAegovOtpAegovValidationDetail<string>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovOtpCustomEvent } from '@aegov/designsystem-testing/components';
import type { AegovValidationDetail as IAegovOtpAegovValidationDetail } from '@aegov/designsystem-testing/components';

export declare interface AegovOtp extends Components.AegovOtp {
  /**
   * Fires on every character change with the current value.
   */
  aegovOtpChange: EventEmitter<AegovOtpCustomEvent<{ value: string }>>;
  /**
   * Fires when all cells are filled (and pattern is valid if set).
   */
  aegovOtpComplete: EventEmitter<AegovOtpCustomEvent<{ value: string }>>;
  /**
   * Unified validation event. See §2.3.
   */
  aegovValidate: EventEmitter<AegovOtpCustomEvent<IAegovOtpAegovValidationDetail<string>>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovPagination,
  inputs: ['countBoundary', 'countSibling', 'fieldId', 'isDisabled', 'isEnabledFirstLast', 'labelFirst', 'labelLast', 'labelNext', 'labelPrev', 'pageCurrent', 'pages', 'size', 'variant']
})
@Component({
  selector: 'aegov-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['countBoundary', 'countSibling', 'fieldId', 'isDisabled', 'isEnabledFirstLast', 'labelFirst', 'labelLast', 'labelNext', 'labelPrev', 'pageCurrent', 'pages', 'size', 'variant'],
  outputs: ['aegovPaginationPageChange'],
})
export class AegovPagination {
  protected el: HTMLAegovPaginationElement;
  @Output() aegovPaginationPageChange = new EventEmitter<AegovPaginationCustomEvent<number>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovPaginationCustomEvent } from '@aegov/designsystem-testing/components';

export declare interface AegovPagination extends Components.AegovPagination {
  /**
   * Emitted when a page is selected. The event detail is the new page number (1-indexed).
Update pageCurrent in response to this event.
   */
  aegovPaginationPageChange: EventEmitter<AegovPaginationCustomEvent<number>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovPopover,
  inputs: ['align', 'delayEnd', 'delayStart', 'fieldId', 'gap', 'isDisabled', 'offset', 'position', 'trigger'],
  methods: ['closePopover']
})
@Component({
  selector: 'aegov-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'delayEnd', 'delayStart', 'fieldId', 'gap', 'isDisabled', 'offset', 'position', 'trigger'],
  outputs: ['aegovPopoverOpen', 'aegovPopoverClose'],
})
export class AegovPopover {
  protected el: HTMLAegovPopoverElement;
  @Output() aegovPopoverOpen = new EventEmitter<AegovPopoverCustomEvent<void>>();
  @Output() aegovPopoverClose = new EventEmitter<AegovPopoverCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovPopoverCustomEvent } from '@aegov/designsystem-testing/components';

export declare interface AegovPopover extends Components.AegovPopover {
  /**
   * Emitted when popover opens
   */
  aegovPopoverOpen: EventEmitter<AegovPopoverCustomEvent<void>>;
  /**
   * Emitted when popover closes
   */
  aegovPopoverClose: EventEmitter<AegovPopoverCustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovProgress,
  inputs: ['counter', 'counterSuffix', 'description', 'extraClass', 'fieldId', 'height', 'label', 'max', 'value']
})
@Component({
  selector: 'aegov-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['counter', 'counterSuffix', 'description', 'extraClass', 'fieldId', 'height', 'label', 'max', 'value'],
})
export class AegovProgress {
  protected el: HTMLAegovProgressElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovProgress extends Components.AegovProgress {}


@ProxyCmp({
  defineCustomElementFn: defineAegovRadio,
  inputs: ['errorMessage', 'extraClass', 'fieldId', 'hint', 'isChecked', 'isDisabled', 'isInvalid', 'isRequired', 'label', 'name', 'size', 'value', 'variant'],
  methods: ['validate', 'setCustomValidity']
})
@Component({
  selector: 'aegov-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['errorMessage', 'extraClass', 'fieldId', 'hint', 'isChecked', 'isDisabled', 'isInvalid', 'isRequired', 'label', 'name', 'size', 'value', 'variant'],
  outputs: ['aegovRadioChange', 'aegovValidate'],
})
export class AegovRadio {
  protected el: HTMLAegovRadioElement;
  @Output() aegovRadioChange = new EventEmitter<AegovRadioCustomEvent<{ checked: boolean; value?: string }>>();
  @Output() aegovValidate = new EventEmitter<AegovRadioCustomEvent<IAegovRadioAegovValidationDetail<boolean>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovRadioCustomEvent } from '@aegov/designsystem-testing/components';
import type { AegovValidationDetail as IAegovRadioAegovValidationDetail } from '@aegov/designsystem-testing/components';

export declare interface AegovRadio extends Components.AegovRadio {
  /**
   * Emitted when the radio checked state changes.
   */
  aegovRadioChange: EventEmitter<AegovRadioCustomEvent<{ checked: boolean; value?: string }>>;
  /**
   * Unified validation event. See §2.3.
   */
  aegovValidate: EventEmitter<AegovRadioCustomEvent<IAegovRadioAegovValidationDetail<boolean>>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovRadioGroup,
  inputs: ['appearance', 'errorMessage', 'extraClass', 'hint', 'isDisabled', 'isInvalid', 'isRequired', 'label', 'name', 'orientation', 'size', 'variant'],
  methods: ['validate', 'setCustomValidity']
})
@Component({
  selector: 'aegov-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'errorMessage', 'extraClass', 'hint', 'isDisabled', 'isInvalid', 'isRequired', 'label', { name: 'name', required: true }, 'orientation', 'size', 'variant'],
  outputs: ['aegovRadioGroupChange', 'aegovValidate'],
})
export class AegovRadioGroup {
  protected el: HTMLAegovRadioGroupElement;
  @Output() aegovRadioGroupChange = new EventEmitter<AegovRadioGroupCustomEvent<{ value: string | undefined }>>();
  @Output() aegovValidate = new EventEmitter<AegovRadioGroupCustomEvent<IAegovRadioGroupAegovValidationDetail<string | undefined>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovRadioGroupCustomEvent } from '@aegov/designsystem-testing/components';
import type { AegovValidationDetail as IAegovRadioGroupAegovValidationDetail } from '@aegov/designsystem-testing/components';

export declare interface AegovRadioGroup extends Components.AegovRadioGroup {
  /**
   * Emitted when the selected radio changes. Contains the selected value.
   */
  aegovRadioGroupChange: EventEmitter<AegovRadioGroupCustomEvent<{ value: string | undefined }>>;
  /**
   * Unified validation event (group-level aggregate). See §2.3.
   */
  aegovValidate: EventEmitter<AegovRadioGroupCustomEvent<IAegovRadioGroupAegovValidationDetail<string | undefined>>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovRange,
  inputs: ['display', 'errorMessage', 'extraClass', 'fieldId', 'hint', 'isDisabled', 'isInvalid', 'isRequired', 'label', 'max', 'min', 'mode', 'name', 'orientation', 'size', 'step', 'value', 'valueHigh', 'valueLow', 'variant'],
  methods: ['validate', 'setCustomValidity']
})
@Component({
  selector: 'aegov-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['display', 'errorMessage', 'extraClass', 'fieldId', 'hint', 'isDisabled', 'isInvalid', 'isRequired', 'label', 'max', 'min', 'mode', 'name', 'orientation', 'size', 'step', 'value', 'valueHigh', 'valueLow', 'variant'],
  outputs: ['aegovRangeInput', 'aegovRangeChange', 'aegovValidate'],
})
export class AegovRange {
  protected el: HTMLAegovRangeElement;
  @Output() aegovRangeInput = new EventEmitter<AegovRangeCustomEvent<{ value?: number; valueLow?: number; valueHigh?: number }>>();
  @Output() aegovRangeChange = new EventEmitter<AegovRangeCustomEvent<{ value?: number; valueLow?: number; valueHigh?: number }>>();
  @Output() aegovValidate = new EventEmitter<AegovRangeCustomEvent<IAegovRangeAegovValidationDetail<IAegovRangeAegovRangeValue>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovRangeCustomEvent } from '@aegov/designsystem-testing/components';
import type { AegovValidationDetail as IAegovRangeAegovValidationDetail } from '@aegov/designsystem-testing/components';
import type { AegovRangeValue as IAegovRangeAegovRangeValue } from '@aegov/designsystem-testing/components';

export declare interface AegovRange extends Components.AegovRange {
  /**
   * Emitted during drag on every value update.
   */
  aegovRangeInput: EventEmitter<AegovRangeCustomEvent<{ value?: number; valueLow?: number; valueHigh?: number }>>;
  /**
   * Emitted on release (value committed).
   */
  aegovRangeChange: EventEmitter<AegovRangeCustomEvent<{ value?: number; valueLow?: number; valueHigh?: number }>>;
  /**
   * Unified validation event. See §2.3.
   */
  aegovValidate: EventEmitter<AegovRangeCustomEvent<IAegovRangeAegovValidationDetail<IAegovRangeAegovRangeValue>>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovSelect,
  inputs: ['appearance', 'emptyMessage', 'errorMessage', 'extraClass', 'fieldId', 'hint', 'isClearable', 'isDisabled', 'isInvalid', 'isMultiple', 'isRequired', 'isSearchable', 'name', 'placeholder', 'size', 'value', 'variant', 'visibleItems'],
  methods: ['validate', 'setCustomValidity']
})
@Component({
  selector: 'aegov-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'emptyMessage', 'errorMessage', 'extraClass', 'fieldId', 'hint', 'isClearable', 'isDisabled', 'isInvalid', 'isMultiple', 'isRequired', 'isSearchable', 'name', 'placeholder', 'size', 'value', 'variant', 'visibleItems'],
  outputs: ['aegovSelectChange', 'aegovSelectOpen', 'aegovSelectClose', 'aegovValidate'],
})
export class AegovSelect {
  protected el: HTMLAegovSelectElement;
  @Output() aegovSelectChange = new EventEmitter<AegovSelectCustomEvent<IAegovSelectSelectChangeDetail>>();
  @Output() aegovSelectOpen = new EventEmitter<AegovSelectCustomEvent<void>>();
  @Output() aegovSelectClose = new EventEmitter<AegovSelectCustomEvent<void>>();
  @Output() aegovValidate = new EventEmitter<AegovSelectCustomEvent<IAegovSelectAegovValidationDetail<IAegovSelectAegovSelectValue>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovSelectCustomEvent } from '@aegov/designsystem-testing/components';
import type { SelectChangeDetail as IAegovSelectSelectChangeDetail } from '@aegov/designsystem-testing/components';
import type { AegovValidationDetail as IAegovSelectAegovValidationDetail } from '@aegov/designsystem-testing/components';
import type { AegovSelectValue as IAegovSelectAegovSelectValue } from '@aegov/designsystem-testing/components';

export declare interface AegovSelect extends Components.AegovSelect {
  /**
   * Emitted when the selected value changes.
   */
  aegovSelectChange: EventEmitter<AegovSelectCustomEvent<IAegovSelectSelectChangeDetail>>;
  /**
   * Emitted when the dropdown opens (listbox appearance).
   */
  aegovSelectOpen: EventEmitter<AegovSelectCustomEvent<void>>;
  /**
   * Emitted when the dropdown closes (listbox appearance).
   */
  aegovSelectClose: EventEmitter<AegovSelectCustomEvent<void>>;
  /**
   * Unified validation event. See §2.3.
   */
  aegovValidate: EventEmitter<AegovSelectCustomEvent<IAegovSelectAegovValidationDetail<IAegovSelectAegovSelectValue>>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovSelectOption,
  inputs: ['isDisabled', 'value']
})
@Component({
  selector: 'aegov-select-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['isDisabled', 'value'],
})
export class AegovSelectOption {
  protected el: HTMLAegovSelectOptionElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovSelectOption extends Components.AegovSelectOption {}


@ProxyCmp({
  defineCustomElementFn: defineAegovSelectOptionGroup,
  inputs: ['label']
})
@Component({
  selector: 'aegov-select-option-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label'],
})
export class AegovSelectOptionGroup {
  protected el: HTMLAegovSelectOptionGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovSelectOptionGroup extends Components.AegovSelectOptionGroup {}


@ProxyCmp({
  defineCustomElementFn: defineAegovSeparator,
  inputs: ['appearance', 'extraClass', 'gap', 'isDecorative', 'orientation', 'text', 'variant']
})
@Component({
  selector: 'aegov-separator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'extraClass', 'gap', 'isDecorative', 'orientation', 'text', 'variant'],
})
export class AegovSeparator {
  protected el: HTMLAegovSeparatorElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovSeparator extends Components.AegovSeparator {}


@ProxyCmp({
  defineCustomElementFn: defineAegovTab,
  inputs: ['activeTabId', 'isDisabled', 'orientation', 'size', 'tabId', 'variant']
})
@Component({
  selector: 'aegov-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['activeTabId', 'isDisabled', 'orientation', 'size', { name: 'tabId', required: true }, 'variant'],
  outputs: ['aegovTabSelect'],
})
export class AegovTab {
  protected el: HTMLAegovTabElement;
  @Output() aegovTabSelect = new EventEmitter<AegovTabCustomEvent<string>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovTabCustomEvent } from '@aegov/designsystem-testing/components';

export declare interface AegovTab extends Components.AegovTab {
  /**
   * Emitted when this tab is clicked. Bubbles up to the parent aegov-tabs. @event aegovTabSelect
   */
  aegovTabSelect: EventEmitter<AegovTabCustomEvent<string>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovTabPanel,
  inputs: ['active', 'extraClass', 'tabId']
})
@Component({
  selector: 'aegov-tab-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'extraClass', { name: 'tabId', required: true }],
})
export class AegovTabPanel {
  protected el: HTMLAegovTabPanelElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovTabPanel extends Components.AegovTabPanel {}


@ProxyCmp({
  defineCustomElementFn: defineAegovTabs,
  inputs: ['defaultOpen', 'fieldId', 'isScrollable', 'isStretchable', 'labelTablist', 'orientation', 'size', 'variant']
})
@Component({
  selector: 'aegov-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['defaultOpen', 'fieldId', 'isScrollable', 'isStretchable', 'labelTablist', 'orientation', 'size', 'variant'],
  outputs: ['aegovTabChange'],
})
export class AegovTabs {
  protected el: HTMLAegovTabsElement;
  @Output() aegovTabChange = new EventEmitter<AegovTabsCustomEvent<string>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovTabsCustomEvent } from '@aegov/designsystem-testing/components';

export declare interface AegovTabs extends Components.AegovTabs {
  /**
   * Emitted when the active tab changes.
Event detail contains the new active tab-id string. @event aegovTabChange
   */
  aegovTabChange: EventEmitter<AegovTabsCustomEvent<string>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovText,
  inputs: ['extraClass', 'size']
})
@Component({
  selector: 'aegov-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['extraClass', 'size'],
})
export class AegovText {
  protected el: HTMLAegovTextElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovText extends Components.AegovText {}


@ProxyCmp({
  defineCustomElementFn: defineAegovTextarea,
  inputs: ['errorMessage', 'extraClass', 'fieldId', 'hint', 'isCopyable', 'isDisabled', 'isInvalid', 'isReadonly', 'isRequired', 'maxlength', 'name', 'placeholder', 'resize', 'size', 'value', 'variant'],
  methods: ['validate', 'setCustomValidity']
})
@Component({
  selector: 'aegov-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['errorMessage', 'extraClass', 'fieldId', 'hint', 'isCopyable', 'isDisabled', 'isInvalid', 'isReadonly', 'isRequired', 'maxlength', 'name', 'placeholder', 'resize', 'size', 'value', 'variant'],
  outputs: ['aegovTextareaChange', 'aegovTextareaInput', 'aegovTextareaFocus', 'aegovTextareaBlur', 'aegovValidate'],
})
export class AegovTextarea {
  protected el: HTMLAegovTextareaElement;
  @Output() aegovTextareaChange = new EventEmitter<AegovTextareaCustomEvent<{ value: string; event: globalThis.Event }>>();
  @Output() aegovTextareaInput = new EventEmitter<AegovTextareaCustomEvent<{ value: string; event: globalThis.Event }>>();
  @Output() aegovTextareaFocus = new EventEmitter<AegovTextareaCustomEvent<FocusEvent>>();
  @Output() aegovTextareaBlur = new EventEmitter<AegovTextareaCustomEvent<FocusEvent>>();
  @Output() aegovValidate = new EventEmitter<AegovTextareaCustomEvent<IAegovTextareaAegovValidationDetail<string>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovTextareaCustomEvent } from '@aegov/designsystem-testing/components';
import type { AegovValidationDetail as IAegovTextareaAegovValidationDetail } from '@aegov/designsystem-testing/components';

export declare interface AegovTextarea extends Components.AegovTextarea {
  /**
   * Emitted when the textarea value changes (on blur).
   */
  aegovTextareaChange: EventEmitter<AegovTextareaCustomEvent<{ value: string; event: globalThis.Event }>>;
  /**
   * Emitted on every keystroke.
   */
  aegovTextareaInput: EventEmitter<AegovTextareaCustomEvent<{ value: string; event: globalThis.Event }>>;
  /**
   * Emitted when the textarea gains focus.
   */
  aegovTextareaFocus: EventEmitter<AegovTextareaCustomEvent<FocusEvent>>;
  /**
   * Emitted when the textarea loses focus.
   */
  aegovTextareaBlur: EventEmitter<AegovTextareaCustomEvent<FocusEvent>>;
  /**
   * Unified validation event. See validation-engine-addon.md §2.3.
   */
  aegovValidate: EventEmitter<AegovTextareaCustomEvent<IAegovTextareaAegovValidationDetail<string>>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovTimeline,
  inputs: ['fieldId', 'orientation', 'size', 'variant']
})
@Component({
  selector: 'aegov-timeline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['fieldId', 'orientation', 'size', 'variant'],
})
export class AegovTimeline {
  protected el: HTMLAegovTimelineElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovTimeline extends Components.AegovTimeline {}


@ProxyCmp({
  defineCustomElementFn: defineAegovTimelineStep,
  inputs: ['description', 'status']
})
@Component({
  selector: 'aegov-timeline-step',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['description', 'status'],
})
export class AegovTimelineStep {
  protected el: HTMLAegovTimelineStepElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovTimelineStep extends Components.AegovTimelineStep {}


@ProxyCmp({
  defineCustomElementFn: defineAegovTitle,
  inputs: ['extraClass', 'fieldId', 'headingType', 'size']
})
@Component({
  selector: 'aegov-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['extraClass', 'fieldId', 'headingType', 'size'],
})
export class AegovTitle {
  protected el: HTMLAegovTitleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovTitle extends Components.AegovTitle {}


@ProxyCmp({
  defineCustomElementFn: defineAegovToast,
  inputs: ['appearance', 'duration', 'isDismissible', 'isProgressEnabled', 'mode', 'position', 'variant'],
  methods: ['show', 'close']
})
@Component({
  selector: 'aegov-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'duration', 'isDismissible', 'isProgressEnabled', 'mode', 'position', 'variant'],
  outputs: ['aegovToastOpen', 'aegovToastClose', 'aegovToastDismiss'],
})
export class AegovToast {
  protected el: HTMLAegovToastElement;
  @Output() aegovToastOpen = new EventEmitter<AegovToastCustomEvent<void>>();
  @Output() aegovToastClose = new EventEmitter<AegovToastCustomEvent<void>>();
  @Output() aegovToastDismiss = new EventEmitter<AegovToastCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovToastCustomEvent } from '@aegov/designsystem-testing/components';

export declare interface AegovToast extends Components.AegovToast {
  /**
   * Emitted after the toast becomes visible.
   */
  aegovToastOpen: EventEmitter<AegovToastCustomEvent<void>>;
  /**
   * Emitted after the toast close animation completes and element is removed.
   */
  aegovToastClose: EventEmitter<AegovToastCustomEvent<void>>;
  /**
   * Emitted when the user clicks the dismiss button.
   */
  aegovToastDismiss: EventEmitter<AegovToastCustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovToggle,
  inputs: ['errorMessage', 'fieldId', 'hint', 'isChecked', 'isDisabled', 'isInvalid', 'isRequired', 'label', 'name', 'size', 'value', 'variant'],
  methods: ['validate', 'setCustomValidity']
})
@Component({
  selector: 'aegov-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['errorMessage', 'fieldId', 'hint', 'isChecked', 'isDisabled', 'isInvalid', 'isRequired', 'label', 'name', 'size', 'value', 'variant'],
  outputs: ['aegovToggleChange', 'aegovValidate'],
})
export class AegovToggle {
  protected el: HTMLAegovToggleElement;
  @Output() aegovToggleChange = new EventEmitter<AegovToggleCustomEvent<{ checked: boolean; value?: string }>>();
  @Output() aegovValidate = new EventEmitter<AegovToggleCustomEvent<IAegovToggleAegovValidationDetail<boolean>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovToggleCustomEvent } from '@aegov/designsystem-testing/components';
import type { AegovValidationDetail as IAegovToggleAegovValidationDetail } from '@aegov/designsystem-testing/components';

export declare interface AegovToggle extends Components.AegovToggle {
  /**
   * Emitted when the toggle checked state changes.
   */
  aegovToggleChange: EventEmitter<AegovToggleCustomEvent<{ checked: boolean; value?: string }>>;
  /**
   * Unified validation event. See §2.3.
   */
  aegovValidate: EventEmitter<AegovToggleCustomEvent<IAegovToggleAegovValidationDetail<boolean>>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovTooltip,
  inputs: ['align', 'content', 'delayEnd', 'delayStart', 'gap', 'isDisabled', 'offset', 'position', 'trigger']
})
@Component({
  selector: 'aegov-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'content', 'delayEnd', 'delayStart', 'gap', 'isDisabled', 'offset', 'position', 'trigger'],
})
export class AegovTooltip {
  protected el: HTMLAegovTooltipElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovTooltip extends Components.AegovTooltip {}


