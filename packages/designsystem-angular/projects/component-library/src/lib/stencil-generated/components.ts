/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';
import { nullableNumberAttribute } from '../number-attribute';
import { nullableBooleanAttribute } from './angular-component-lib/boolean-attribute';

import type { Components } from '@aegov/designsystem/components';

import { defineCustomElement as defineAegovAccordion } from '@aegov/designsystem/components/aegov-accordion.js';
import { defineCustomElement as defineAegovAccordionItem } from '@aegov/designsystem/components/aegov-accordion-item.js';
import { defineCustomElement as defineAegovAspectRatio } from '@aegov/designsystem/components/aegov-aspect-ratio.js';
import { defineCustomElement as defineAegovAvatar } from '@aegov/designsystem/components/aegov-avatar.js';
import { defineCustomElement as defineAegovAvatarGroup } from '@aegov/designsystem/components/aegov-avatar-group.js';
import { defineCustomElement as defineAegovBadge } from '@aegov/designsystem/components/aegov-badge.js';
import { defineCustomElement as defineAegovBanner } from '@aegov/designsystem/components/aegov-banner.js';
import { defineCustomElement as defineAegovBentoGrid } from '@aegov/designsystem/components/aegov-bento-grid.js';
import { defineCustomElement as defineAegovBlockquote } from '@aegov/designsystem/components/aegov-blockquote.js';
import { defineCustomElement as defineAegovBreadcrumbs } from '@aegov/designsystem/components/aegov-breadcrumbs.js';
import { defineCustomElement as defineAegovBreadcrumbsItem } from '@aegov/designsystem/components/aegov-breadcrumbs-item.js';
import { defineCustomElement as defineAegovButton } from '@aegov/designsystem/components/aegov-button.js';
import { defineCustomElement as defineAegovButtonGroup } from '@aegov/designsystem/components/aegov-button-group.js';
import { defineCustomElement as defineAegovCallout } from '@aegov/designsystem/components/aegov-callout.js';
import { defineCustomElement as defineAegovCard } from '@aegov/designsystem/components/aegov-card.js';
import { defineCustomElement as defineAegovCheckbox } from '@aegov/designsystem/components/aegov-checkbox.js';
import { defineCustomElement as defineAegovCheckboxGroup } from '@aegov/designsystem/components/aegov-checkbox-group.js';
import { defineCustomElement as defineAegovDatepicker } from '@aegov/designsystem/components/aegov-datepicker.js';
import { defineCustomElement as defineAegovDrawer } from '@aegov/designsystem/components/aegov-drawer.js';
import { defineCustomElement as defineAegovDropdown } from '@aegov/designsystem/components/aegov-dropdown.js';
import { defineCustomElement as defineAegovFileupload } from '@aegov/designsystem/components/aegov-fileupload.js';
import { defineCustomElement as defineAegovFooter } from '@aegov/designsystem/components/aegov-footer.js';
import { defineCustomElement as defineAegovFooterHighlights } from '@aegov/designsystem/components/aegov-footer-highlights.js';
import { defineCustomElement as defineAegovFormField } from '@aegov/designsystem/components/aegov-form-field.js';
import { defineCustomElement as defineAegovHeader } from '@aegov/designsystem/components/aegov-header.js';
import { defineCustomElement as defineAegovHeaderBanner } from '@aegov/designsystem/components/aegov-header-banner.js';
import { defineCustomElement as defineAegovInput } from '@aegov/designsystem/components/aegov-input.js';
import { defineCustomElement as defineAegovInputGroup } from '@aegov/designsystem/components/aegov-input-group.js';
import { defineCustomElement as defineAegovLabel } from '@aegov/designsystem/components/aegov-label.js';
import { defineCustomElement as defineAegovLink } from '@aegov/designsystem/components/aegov-link.js';
import { defineCustomElement as defineAegovModal } from '@aegov/designsystem/components/aegov-modal.js';
import { defineCustomElement as defineAegovNavbar } from '@aegov/designsystem/components/aegov-navbar.js';
import { defineCustomElement as defineAegovNavbarItem } from '@aegov/designsystem/components/aegov-navbar-item.js';
import { defineCustomElement as defineAegovNavblock } from '@aegov/designsystem/components/aegov-navblock.js';
import { defineCustomElement as defineAegovNavblockItem } from '@aegov/designsystem/components/aegov-navblock-item.js';
import { defineCustomElement as defineAegovOtp } from '@aegov/designsystem/components/aegov-otp.js';
import { defineCustomElement as defineAegovPagination } from '@aegov/designsystem/components/aegov-pagination.js';
import { defineCustomElement as defineAegovPopover } from '@aegov/designsystem/components/aegov-popover.js';
import { defineCustomElement as defineAegovProgress } from '@aegov/designsystem/components/aegov-progress.js';
import { defineCustomElement as defineAegovRadio } from '@aegov/designsystem/components/aegov-radio.js';
import { defineCustomElement as defineAegovRadioGroup } from '@aegov/designsystem/components/aegov-radio-group.js';
import { defineCustomElement as defineAegovRange } from '@aegov/designsystem/components/aegov-range.js';
import { defineCustomElement as defineAegovSelect } from '@aegov/designsystem/components/aegov-select.js';
import { defineCustomElement as defineAegovSelectOption } from '@aegov/designsystem/components/aegov-select-option.js';
import { defineCustomElement as defineAegovSelectOptionGroup } from '@aegov/designsystem/components/aegov-select-option-group.js';
import { defineCustomElement as defineAegovSeparator } from '@aegov/designsystem/components/aegov-separator.js';
import { defineCustomElement as defineAegovTab } from '@aegov/designsystem/components/aegov-tab.js';
import { defineCustomElement as defineAegovTabPanel } from '@aegov/designsystem/components/aegov-tab-panel.js';
import { defineCustomElement as defineAegovTabs } from '@aegov/designsystem/components/aegov-tabs.js';
import { defineCustomElement as defineAegovText } from '@aegov/designsystem/components/aegov-text.js';
import { defineCustomElement as defineAegovTextarea } from '@aegov/designsystem/components/aegov-textarea.js';
import { defineCustomElement as defineAegovTimeline } from '@aegov/designsystem/components/aegov-timeline.js';
import { defineCustomElement as defineAegovTimelineStep } from '@aegov/designsystem/components/aegov-timeline-step.js';
import { defineCustomElement as defineAegovTitle } from '@aegov/designsystem/components/aegov-title.js';
import { defineCustomElement as defineAegovToast } from '@aegov/designsystem/components/aegov-toast.js';
import { defineCustomElement as defineAegovToggle } from '@aegov/designsystem/components/aegov-toggle.js';
import { defineCustomElement as defineAegovTooltip } from '@aegov/designsystem/components/aegov-tooltip.js';
@ProxyCmp({
  defineCustomElementFn: defineAegovAccordion,
  inputs: ['defaultOpen', 'fieldId', 'headingLevel', 'icon', 'isBordered', 'isMultiple', 'size']
})
@Component({
  selector: 'aegov-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [{ name: 'defaultOpen', transform: nullableNumberAttribute }, 'fieldId', { name: 'headingLevel', transform: nullableNumberAttribute }, 'icon', { name: 'isBordered', transform: nullableBooleanAttribute }, { name: 'isMultiple', transform: nullableBooleanAttribute }, 'size'],
})
export class AegovAccordion {
  protected el: HTMLAegovAccordionElement;
    /**
   * Unique ID for the accordion wrapper element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovAccordion['fieldId']) {};
    /**
   * Whether multiple accordion items can be open at the same time @default false
   */
  set isMultiple(_: Components.AegovAccordion['isMultiple']) {};
    /**
   * Index of the accordion item to open by default (0-based)
   */
  set defaultOpen(_: Components.AegovAccordion['defaultOpen']) {};
    /**
   * Icon style for accordion items @default 'chevron'
   */
  set icon(_: Components.AegovAccordion['icon']) {};
    /**
   * Whether to show border around the accordion @default false
   */
  set isBordered(_: Components.AegovAccordion['isBordered']) {};
    /**
   * Size of the accordion items — controls heading font size.
sm = 14px, base = 16px (default), lg = 18px @default 'base'
   */
  set size(_: Components.AegovAccordion['size']) {};
    /**
   * Heading level for accordion item triggers (1–6).
Cascaded to all child aegov-accordion-item elements. @default 3
   */
  set headingLevel(_: Components.AegovAccordion['headingLevel']) {};
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
  inputs: ['heading', { name: 'isDisabled', transform: nullableBooleanAttribute }],
  outputs: ['aegovAccordionItemToggle'],
})
export class AegovAccordionItem {
  protected el: HTMLAegovAccordionItemElement;
    /**
   * Heading text for the accordion item (alternative to using the slot)
Note: If both heading property and slot are provided, the slot takes precedence
   */
  set heading(_: Components.AegovAccordionItem['heading']) {};
    /**
   * Whether the accordion item is disabled @default false
   */
  set isDisabled(_: Components.AegovAccordionItem['isDisabled']) {};
  @Output() aegovAccordionItemToggle = new EventEmitter<AegovAccordionItemCustomEvent<{ open: boolean }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovAccordionItemCustomEvent } from '@aegov/designsystem/components';

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
    /**
   * The aspect ratio to apply. Accepts named presets (`'auto'`, `'square'`,
`'video'`) or any custom ratio string such as `'5/4'`, `'21/9'`,
`'2.35/1'`. Supports a Tailwind-style responsive string with breakpoint
prefixes, e.g. `"square md:video lg:21/9"`. @default 'auto'
   */
  set ratio(_: Components.AegovAspectRatio['ratio']) {};
    /**
   * How slotted media (img, video, iframe) should fit within the aspect
ratio container. @default 'cover'
   */
  set fit(_: Components.AegovAspectRatio['fit']) {};
    /**
   * Additional CSS classes merged onto the inner aspect-ratio container.
   */
  set extraClass(_: Components.AegovAspectRatio['extraClass']) {};
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
    /**
   * Unique ID for the inner avatar element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovAvatar['fieldId']) {};
    /**
   * The avatar size @default 'base'
   */
  set size(_: Components.AegovAvatar['size']) {};
    /**
   * The avatar appearance (shape) @default 'square'
   */
  set appearance(_: Components.AegovAvatar['appearance']) {};
    /**
   * The image source URL
   */
  set src(_: Components.AegovAvatar['src']) {};
    /**
   * Alternative text for the image (required for accessibility)
   */
  set alt(_: Components.AegovAvatar['alt']) {};
    /**
   * Status indicator. Set to a status string to show the indicator, or `false` to hide it.
Accepts: `'online'`, `'offline'`, `'away'`, `'unavailable'`, `'busy'`, or boolean (`true` maps to `'online'`). @default false
   */
  set status(_: Components.AegovAvatar['status']) {};
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
  inputs: [{ name: 'moreCount', transform: nullableNumberAttribute }, 'moreText', 'size', 'variant'],
  outputs: ['aegovAvatarGroupMore'],
})
export class AegovAvatarGroup {
  protected el: HTMLAegovAvatarGroupElement;
    /**
   * The layout variant: 'default' (spaced) or 'compact' (overlapping) @default 'default'
   */
  set variant(_: Components.AegovAvatarGroup['variant']) {};
    /**
   * The size enforced on all child avatars @default 'base'
   */
  set size(_: Components.AegovAvatarGroup['size']) {};
    /**
   * Number of additional users not shown. When > 0, displays "+N" indicator. @default 0
   */
  set moreCount(_: Components.AegovAvatarGroup['moreCount']) {};
    /**
   * Custom text for the "more" indicator. Defaults to "{moreCount}+"
   */
  set moreText(_: Components.AegovAvatarGroup['moreText']) {};
  @Output() aegovAvatarGroupMore = new EventEmitter<AegovAvatarGroupCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovAvatarGroupCustomEvent } from '@aegov/designsystem/components';

export declare interface AegovAvatarGroup extends Components.AegovAvatarGroup {
  /**
   * Emitted when the "more" indicator button is clicked
   */
  aegovAvatarGroupMore: EventEmitter<AegovAvatarGroupCustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovBadge,
  inputs: ['appearance', 'fieldId', 'isDismissible', 'size', 'variant']
})
@Component({
  selector: 'aegov-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'fieldId', { name: 'isDismissible', transform: nullableBooleanAttribute }, 'size', 'variant'],
  outputs: ['aegovBadgeDismiss'],
})
export class AegovBadge {
  protected el: HTMLAegovBadgeElement;
    /**
   * Unique ID for the badge element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovBadge['fieldId']) {};
    /**
   * The appearance style of the badge. @default 'soft'
   */
  set appearance(_: Components.AegovBadge['appearance']) {};
    /**
   * The color variant of the badge. @default 'default'
   */
  set variant(_: Components.AegovBadge['variant']) {};
    /**
   * Whether the badge can be dismissed/closed. @default false
   */
  set isDismissible(_: Components.AegovBadge['isDismissible']) {};
    /**
   * The badge size @default 'base'
   */
  set size(_: Components.AegovBadge['size']) {};
  @Output() aegovBadgeDismiss = new EventEmitter<AegovBadgeCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovBadgeCustomEvent } from '@aegov/designsystem/components';

export declare interface AegovBadge extends Components.AegovBadge {
  /**
   * Emitted when the dismiss button is clicked.
   */
  aegovBadgeDismiss: EventEmitter<AegovBadgeCustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovBanner,
  inputs: ['appearance', 'display', 'fieldId', 'isDismissible', 'isFocusable', 'mode', 'position', 'size', 'variant']
})
@Component({
  selector: 'aegov-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'display', 'fieldId', { name: 'isDismissible', transform: nullableBooleanAttribute }, { name: 'isFocusable', transform: nullableBooleanAttribute }, 'mode', 'position', 'size', 'variant'],
  outputs: ['aegovBannerDismiss', 'aegovBannerHeightChange'],
})
export class AegovBanner {
  protected el: HTMLAegovBannerElement;
    /**
   * Unique ID for the banner element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovBanner['fieldId']) {};
    /**
   * The variant of the banner. Determines the color scheme. @default 'default'
   */
  set variant(_: Components.AegovBanner['variant']) {};
    /**
   * The appearance style of the banner. @default 'soft'
   */
  set appearance(_: Components.AegovBanner['appearance']) {};
    /**
   * Vertical position of the banner (top or bottom of viewport/page). @default 'top'
   */
  set position(_: Components.AegovBanner['position']) {};
    /**
   * CSS positioning strategy: fixed (stays in viewport), sticky (scrolls then sticks). @default 'fixed'
   */
  set display(_: Components.AegovBanner['display']) {};
    /**
   * Layout mode: push (takes up space in page flow), overlay (floats over content). @default 'push'
   */
  set mode(_: Components.AegovBanner['mode']) {};
    /**
   * Whether the banner can be dismissed/closed. @default true
   */
  set isDismissible(_: Components.AegovBanner['isDismissible']) {};
    /**
   * Size of the banner. Controls font size and vertical padding.
Accepts a plain value (`"sm"`, `"base"`, `"lg"`) or a responsive string
using Tailwind-style breakpoint prefixes (`"sm xl:lg"`). @default 'base'
   */
  set size(_: Components.AegovBanner['size']) {};
    /**
   * Auto-focus the banner when mounted (for critical alerts only). @default false
   */
  set isFocusable(_: Components.AegovBanner['isFocusable']) {};
  @Output() aegovBannerDismiss = new EventEmitter<AegovBannerCustomEvent<void>>();
  @Output() aegovBannerHeightChange = new EventEmitter<AegovBannerCustomEvent<{ height: number }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovBannerCustomEvent } from '@aegov/designsystem/components';

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
    /**
   * Optional id reflected on the inner wrapper. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovBentoGrid['fieldId']) {};
    /**
   * Number of columns. Tailwind-style breakpoint syntax supported,
e.g. `cols="1 md:2 lg:4"`. Use `cols="1 md:..."` to stack on mobile. @default '1 md:2 lg:3'
   */
  set cols(_: Components.AegovBentoGrid['cols']) {};
    /**
   * Gap between cards. Named sizes: 'none', 'xs', 'sm', 'md', 'lg', 'xl'.
Responsive syntax supported: `gap="sm md:md lg:lg"`. @default 'md'
   */
  set gap(_: Components.AegovBentoGrid['gap']) {};
    /**
   * Auto-flow mode. 'dense' fills holes left by larger spans (bento packing),
'row' keeps strict DOM order. @default 'dense'
   */
  set flow(_: Components.AegovBentoGrid['flow']) {};
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
    /**
   * The blockquote appearance style @default 'primary'
   */
  set appearance(_: Components.AegovBlockquote['appearance']) {};
    /**
   * The citation source
   */
  set cite(_: Components.AegovBlockquote['cite']) {};
    /**
   * The author source
   */
  set author(_: Components.AegovBlockquote['author']) {};
    /**
   * The author's title/position
   */
  set authorTitle(_: Components.AegovBlockquote['authorTitle']) {};
    /**
   * Additional CSS classes merged onto the inner blockquote element.

This component renders in a real shadow root, which normally blocks the page's CSS
from reaching inside it. Margin/padding utilities (e.g. `mt-4`, `md:px-6`) are copied
in from the page's own stylesheets at runtime and work as expected; other utilities
(colour, border, typography, etc.) still have no effect — see #35.
   */
  set extraClass(_: Components.AegovBlockquote['extraClass']) {};
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
  inputs: ['fieldId', { name: 'isMicrodata', transform: nullableBooleanAttribute }, { name: 'maxLength', transform: nullableNumberAttribute }, 'separator'],
})
export class AegovBreadcrumbs {
  protected el: HTMLAegovBreadcrumbsElement;
    /**
   * Unique ID for the breadcrumbs nav element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovBreadcrumbs['fieldId']) {};
    /**
   * The separator style to use between breadcrumb items @default 'slash'
   */
  set separator(_: Components.AegovBreadcrumbs['separator']) {};
    /**
   * Maximum number of characters before truncating breadcrumb item text.
If not set, text will not be truncated.
   */
  set maxLength(_: Components.AegovBreadcrumbs['maxLength']) {};
    /**
   * Whether to add schema.org microdata for structured data @default false
   */
  set isMicrodata(_: Components.AegovBreadcrumbs['isMicrodata']) {};
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
    /**
   * The URL that the breadcrumb item links to.
If not provided, the item will be rendered as plain text (current page).
   */
  set href(_: Components.AegovBreadcrumbsItem['href']) {};
    /**
   * Where to open the linked document @default '_self'
   */
  set target(_: Components.AegovBreadcrumbsItem['target']) {};
  @Output() aegovBreadcrumbItemClick = new EventEmitter<AegovBreadcrumbsItemCustomEvent<{ href?: string; event: MouseEvent }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovBreadcrumbsItemCustomEvent } from '@aegov/designsystem/components';

export declare interface AegovBreadcrumbsItem extends Components.AegovBreadcrumbsItem {
  /**
   * Emitted when the breadcrumb item is clicked
   */
  aegovBreadcrumbItemClick: EventEmitter<AegovBreadcrumbsItemCustomEvent<{ href?: string; event: MouseEvent }>>;
}


@ProxyCmp({
  defineCustomElementFn: defineAegovButton,
  inputs: ['appearance', 'fieldId', 'isBold', 'isDisabled', 'isFull', 'isIcon', 'isLoading', 'name', 'size', 'type', 'value', 'variant'],
  methods: ['setFocus']
})
@Component({
  selector: 'aegov-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'fieldId', { name: 'isBold', transform: nullableBooleanAttribute }, { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'isFull', transform: nullableBooleanAttribute }, { name: 'isIcon', transform: nullableBooleanAttribute }, { name: 'isLoading', transform: nullableBooleanAttribute }, 'name', 'size', 'type', 'value', 'variant'],
  outputs: ['aegovButtonClick', 'aegovButtonFocus', 'aegovButtonBlur'],
})
export class AegovButton {
  protected el: HTMLAegovButtonElement;
    /**
   * Unique ID for the button element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovButton['fieldId']) {};
    /**
   * The button variant (color scheme) @default 'primary'
   */
  set variant(_: Components.AegovButton['variant']) {};
    /**
   * The button size @default 'base'
   */
  set size(_: Components.AegovButton['size']) {};
    /**
   * The button type attribute @default 'button'
   */
  set type(_: Components.AegovButton['type']) {};
    /**
   * Name submitted with the form, paired with `value`, when this button submits
it — as on a native `<button>`.
   */
  set name(_: Components.AegovButton['name']) {};
    /**
   * Value submitted with `name` when this button submits the form.
   */
  set value(_: Components.AegovButton['value']) {};
    /**
   * The button appearance (visual style) @default 'solid'
   */
  set appearance(_: Components.AegovButton['appearance']) {};
    /**
   * Whether the button is disabled @default false
   */
  set isDisabled(_: Components.AegovButton['isDisabled']) {};
    /**
   * Whether the button is only an icon @default false
   */
  set isIcon(_: Components.AegovButton['isIcon']) {};
    /**
   * Whether the button should take full width @default false

Reflected to the `is-full` attribute: the host-level `:host([is-full])` CSS rule
(in aegov-button.css) that switches the host to `display: block` only matches a
real attribute, so a framework that sets this as a JS property binding instead of
a literal string attribute (e.g. Angular's `[isFull]="true"`, React's JSX `isFull`
shorthand) would otherwise never trigger it — only `reflect: true` makes every
binding style reach the attribute the CSS depends on.
   */
  set isFull(_: Components.AegovButton['isFull']) {};
    /**
   * Whether the button should have bold text or not @default true
   */
  set isBold(_: Components.AegovButton['isBold']) {};
    /**
   * Whether the button is in a loading state @default false
   */
  set isLoading(_: Components.AegovButton['isLoading']) {};
  @Output() aegovButtonClick = new EventEmitter<AegovButtonCustomEvent<MouseEvent>>();
  @Output() aegovButtonFocus = new EventEmitter<AegovButtonCustomEvent<FocusEvent>>();
  @Output() aegovButtonBlur = new EventEmitter<AegovButtonCustomEvent<FocusEvent>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovButtonCustomEvent } from '@aegov/designsystem/components';

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
    /**
   * The orientation of the button group @default 'horizontal'
   */
  set orientation(_: Components.AegovButtonGroup['orientation']) {};
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
  inputs: ['appearance', 'fieldId', { name: 'isDismissible', transform: nullableBooleanAttribute }, 'size', 'variant'],
  outputs: ['aegovCalloutDismiss'],
})
export class AegovCallout {
  protected el: HTMLAegovCalloutElement;
    /**
   * Unique ID for the callout element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovCallout['fieldId']) {};
    /**
   * The variant of the callout. Determines the color scheme. @default 'default'
   */
  set variant(_: Components.AegovCallout['variant']) {};
    /**
   * The appearance style of the callout. @default 'soft'
   */
  set appearance(_: Components.AegovCallout['appearance']) {};
    /**
   * The size of the callout. Controls font size, icon size, and padding.
Accepts a plain value (`"sm"`, `"base"`, `"lg"`) or a responsive string
using Tailwind-style breakpoint prefixes (`"sm xl:lg"`). @default 'base'
   */
  set size(_: Components.AegovCallout['size']) {};
    /**
   * Whether the callout can be dismissed/closed. @default false
   */
  set isDismissible(_: Components.AegovCallout['isDismissible']) {};
  @Output() aegovCalloutDismiss = new EventEmitter<AegovCalloutCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovCalloutCustomEvent } from '@aegov/designsystem/components';

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
  inputs: ['appearance', { name: 'borderWidth', transform: nullableNumberAttribute }, 'dataColSpan', 'dataRowSpan', 'fieldId', 'hover', { name: 'isPadding', transform: nullableBooleanAttribute }, 'size', 'variant'],
})
export class AegovCard {
  protected el: HTMLAegovCardElement;
    /**
   * Unique ID for the card element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovCard['fieldId']) {};
    /**
   * Whether to apply inner padding. On by default. The amount varies by `size`: 1rem/16px
(sm), 1.25rem/20px (base), 1.5rem/24px (lg). @default true
   */
  set isPadding(_: Components.AegovCard['isPadding']) {};
    /**
   * Border thickness: 1, 2, or 3. @default 2
   */
  set borderWidth(_: Components.AegovCard['borderWidth']) {};
    /**
   * Appearance: 'solid' (full-strength border), 'light' (subtle low-contrast border), or 'creative' (gradient border via CSS mask). Border colour resolves from `variant`. @default 'solid'
   */
  set appearance(_: Components.AegovCard['appearance']) {};
    /**
   * Variant: colour family applied to border + glow. 'primary' (default), 'secondary', 'neutral-max' (aeblack-800 family), or 'neutral-min' (aeblack-100 family). @default 'primary'
   */
  set variant(_: Components.AegovCard['variant']) {};
    /**
   * Hover effect: 'off' (none), 'standard' (border color change), or 'glow' (shadow glow). @default 'off'
   */
  set hover(_: Components.AegovCard['hover']) {};
    /**
   * Size: 'sm' (compact padding/radius), 'base' (default), or 'lg' (generous padding/radius). A fixed
token — unlike Badge, Banner, and Callout's `size`, this does not accept a responsive breakpoint
string, and padding/radius do not change by viewport width. @default 'base'
   */
  set size(_: Components.AegovCard['size']) {};
    /**
   * Number of grid columns this card should span inside an `aegov-bento-grid`.
Supports responsive syntax, e.g. `"1 md:2 lg:3"`. Reflected as the
`data-col-span` attribute so the parent grid can read it correctly even
when set via JSX camelCase (`dataColSpan`).
   */
  set dataColSpan(_: Components.AegovCard['dataColSpan']) {};
    /**
   * Number of grid rows this card should span inside an `aegov-bento-grid`.
Supports responsive syntax, e.g. `"1 md:2"`. Reflected as the
`data-row-span` attribute so the parent grid can read it correctly even
when set via JSX camelCase (`dataRowSpan`).
   */
  set dataRowSpan(_: Components.AegovCard['dataRowSpan']) {};
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovCard extends Components.AegovCard {}


@ProxyCmp({
  defineCustomElementFn: defineAegovCheckbox,
  inputs: ['appearance', 'errorMessage', 'extraClass', 'fieldId', 'hint', 'isCheckAll', 'isChecked', 'isDisabled', 'isIndeterminate', 'isInvalid', 'isRequired', 'label', 'name', 'size', 'value', 'variant'],
  methods: ['validate', 'setCustomValidity']
})
@Component({
  selector: 'aegov-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'errorMessage', 'extraClass', 'fieldId', 'hint', { name: 'isCheckAll', transform: nullableBooleanAttribute }, { name: 'isChecked', transform: nullableBooleanAttribute }, { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'isIndeterminate', transform: nullableBooleanAttribute }, { name: 'isInvalid', transform: nullableBooleanAttribute }, { name: 'isRequired', transform: nullableBooleanAttribute }, 'label', 'name', 'size', 'value', 'variant'],
  outputs: ['aegovCheckboxChange', 'aegovValidate'],
})
export class AegovCheckbox {
  protected el: HTMLAegovCheckboxElement;
    /**
   * Unique ID for the native checkbox element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovCheckbox['fieldId']) {};
    /**
   * The name attribute for the checkbox. Reflected so ElementInternals can read it for form submission.
   */
  set name(_: Components.AegovCheckbox['name']) {};
    /**
   * The value attribute for the checkbox.
   */
  set value(_: Components.AegovCheckbox['value']) {};
    /**
   * Whether the checkbox is checked. @default false
   */
  set isChecked(_: Components.AegovCheckbox['isChecked']) {};
    /**
   * The size of the checkbox. @default 'base'
   */
  set size(_: Components.AegovCheckbox['size']) {};
    /**
   * Colour family. Drives rest border, checked bg/border. Focus ring stays camel; error stays aered.
   */
  set variant(_: Components.AegovCheckbox['variant']) {};
    /**
   * Visual appearance set by a parent aegov-checkbox-group. Not meant to be set directly. @default 'default'
   */
  set appearance(_: Components.AegovCheckbox['appearance']) {};
    /**
   * Whether the checkbox is disabled. @default false
   */
  set isDisabled(_: Components.AegovCheckbox['isDisabled']) {};
    /**
   * Whether the checkbox is required. @default false
   */
  set isRequired(_: Components.AegovCheckbox['isRequired']) {};
    /**
   * Label text for the checkbox. When provided, generates an associated <label> element.
   */
  set label(_: Components.AegovCheckbox['label']) {};
    /**
   * Helper hint text displayed below the label. Only rendered when label is provided
and no error is shown. Renamed from `description` (decision §6.6).
   */
  set hint(_: Components.AegovCheckbox['hint']) {};
    /**
   * Marks this checkbox as a "check all" controller within a checkbox group. @default false
   */
  set isCheckAll(_: Components.AegovCheckbox['isCheckAll']) {};
    /**
   * Whether the checkbox is in an indeterminate state. Set by parent group for check-all. @default false
   */
  set isIndeterminate(_: Components.AegovCheckbox['isIndeterminate']) {};
    /**
   * Visual + a11y invalid state. Toggles `aria-invalid` + `is-invalid` host class. See §2.3. @default false
   */
  set isInvalid(_: Components.AegovCheckbox['isInvalid']) {};
    /**
   * Inline error message. Use `error` slot for rich markup. @default ''
   */
  set errorMessage(_: Components.AegovCheckbox['errorMessage']) {};
    /**
   * Additional CSS classes to apply.

This component renders in a real shadow root, which normally blocks the page's CSS
from reaching inside it. Margin/padding utilities (e.g. `mt-4`, `md:px-6`) are copied
in from the page's own stylesheets at runtime and work as expected; other utilities
(colour, border, typography, etc.) still have no effect — see #35.
   */
  set extraClass(_: Components.AegovCheckbox['extraClass']) {};
  @Output() aegovCheckboxChange = new EventEmitter<AegovCheckboxCustomEvent<{ checked: boolean; value?: string }>>();
  @Output() aegovValidate = new EventEmitter<AegovCheckboxCustomEvent<IAegovCheckboxAegovValidationDetail<boolean>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovCheckboxCustomEvent } from '@aegov/designsystem/components';
import type { AegovValidationDetail as IAegovCheckboxAegovValidationDetail } from '@aegov/designsystem/components';

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
  inputs: ['appearance', 'errorMessage', 'extraClass', 'hint', { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'isInvalid', transform: nullableBooleanAttribute }, { name: 'isRequired', transform: nullableBooleanAttribute }, 'label', 'orientation', 'size', 'variant'],
  outputs: ['aegovCheckboxGroupChange', 'aegovValidate'],
})
export class AegovCheckboxGroup {
  protected el: HTMLAegovCheckboxGroupElement;
    /**
   * Visual appearance for the group layout. @default 'default'
   */
  set appearance(_: Components.AegovCheckboxGroup['appearance']) {};
    /**
   * Stack direction for checkbox items. @default 'vertical'
   */
  set orientation(_: Components.AegovCheckboxGroup['orientation']) {};
    /**
   * Optional label rendered as a <legend> for accessibility.
   */
  set label(_: Components.AegovCheckboxGroup['label']) {};
    /**
   * Size of all checkboxes in the group. Propagated to children. @default 'base'
   */
  set size(_: Components.AegovCheckboxGroup['size']) {};
    /**
   * Colour family. Cascades to child checkboxes (only if child has no own variant). Focus ring stays camel; error stays aered regardless.
   */
  set variant(_: Components.AegovCheckboxGroup['variant']) {};
    /**
   * Disables all checkboxes within the group via native fieldset disabled. @default false
   */
  set isDisabled(_: Components.AegovCheckboxGroup['isDisabled']) {};
    /**
   * Group is required — at least one child checkbox must be checked. Aggregate-level only. @default false
   */
  set isRequired(_: Components.AegovCheckboxGroup['isRequired']) {};
    /**
   * Visual + a11y invalid state. See §2.3. @default false
   */
  set isInvalid(_: Components.AegovCheckboxGroup['isInvalid']) {};
    /**
   * Inline error message rendered below the legend when `isInvalid`. @default ''
   */
  set errorMessage(_: Components.AegovCheckboxGroup['errorMessage']) {};
    /**
   * Helper hint shown below the legend when not invalid. @default ''
   */
  set hint(_: Components.AegovCheckboxGroup['hint']) {};
    /**
   * Additional CSS classes to apply.
   */
  set extraClass(_: Components.AegovCheckboxGroup['extraClass']) {};
  @Output() aegovCheckboxGroupChange = new EventEmitter<AegovCheckboxGroupCustomEvent<{ values: string[] }>>();
  @Output() aegovValidate = new EventEmitter<AegovCheckboxGroupCustomEvent<IAegovCheckboxGroupAegovValidationDetail<string[]>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovCheckboxGroupCustomEvent } from '@aegov/designsystem/components';
import type { AegovValidationDetail as IAegovCheckboxGroupAegovValidationDetail } from '@aegov/designsystem/components';

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
  inputs: ['appearance', 'blackout', 'errorMessage', 'fieldId', 'format', 'hint', { name: 'isClearable', transform: nullableBooleanAttribute }, { name: 'isDisableFuture', transform: nullableBooleanAttribute }, { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'isHeaderSelectable', transform: nullableBooleanAttribute }, { name: 'isInvalid', transform: nullableBooleanAttribute }, { name: 'isRequired', transform: nullableBooleanAttribute }, { name: 'isWithConfirmation', transform: nullableBooleanAttribute }, 'labelRangeEnd', 'labelRangeStart', 'locale', 'max', { name: 'maxRange', transform: nullableNumberAttribute }, 'min', { name: 'minRange', transform: nullableNumberAttribute }, 'name', 'placeholder', 'presets', 'size', { name: 'startDay', transform: nullableNumberAttribute }, 'value', 'variant', { name: 'yearRangeEnd', transform: nullableNumberAttribute }, { name: 'yearRangeStart', transform: nullableNumberAttribute }],
  outputs: ['aegovDatepickerChange', 'aegovDatepickerOpen', 'aegovDatepickerClose', 'aegovDatepickerClear', 'aegovDatepickerMonthChange', 'aegovValidate'],
})
export class AegovDatepicker {
  protected el: HTMLAegovDatepickerElement;
    /**
   * Selection appearance: single date or date range @default 'single'
   */
  set appearance(_: Components.AegovDatepicker['appearance']) {};
    /**
   * Pre-selected value. Single: "YYYY-MM-DD". Range: "YYYY-MM-DD / YYYY-MM-DD" @default ''
   */
  set value(_: Components.AegovDatepicker['value']) {};
    /**
   * Output format using tokens: YYYY, YY, MM, M, DD, D, MMM, MMMM, dd, ddd @default 'YYYY-MM-DD'
   */
  set format(_: Components.AegovDatepicker['format']) {};
    /**
   * Placeholder text for single mode input. Empty defaults to text in the UI language (see `locale`). @default ''
   */
  set placeholder(_: Components.AegovDatepicker['placeholder']) {};
    /**
   * Placeholder for range start input. Empty defaults to text in the UI language (see `locale`). @default ''
   */
  set labelRangeStart(_: Components.AegovDatepicker['labelRangeStart']) {};
    /**
   * Placeholder for range end input. Empty defaults to text in the UI language (see `locale`). @default ''
   */
  set labelRangeEnd(_: Components.AegovDatepicker['labelRangeEnd']) {};
    /**
   * Minimum selectable date (ISO string or "today") @default ''
   */
  set min(_: Components.AegovDatepicker['min']) {};
    /**
   * Maximum selectable date (ISO string or "today") @default ''
   */
  set max(_: Components.AegovDatepicker['max']) {};
    /**
   * Disable all future dates (shorthand for max="today") @default false
   */
  set isDisableFuture(_: Components.AegovDatepicker['isDisableFuture']) {};
    /**
   * Week start day: 0=Sunday, 1=Monday, ...6=Saturday @default 0
   */
  set startDay(_: Components.AegovDatepicker['startDay']) {};
    /**
   * Locale (BCP 47, e.g. `en`, `ar-AE`, `fr`) for day and month names and formatted dates.
Dates use `en` when it is not set.

An Arabic or English locale (`ar`, `ar-*`, `en`, `en-*`) also sets the language of the
datepicker's own text: labels, placeholders, buttons, presets, validation messages and
screen-reader text. With no locale, or any other locale, that text follows the text
direction like the rest of the library: Arabic when `dir` is `rtl`, English otherwise.
Layout direction always follows `dir`.
   */
  set locale(_: Components.AegovDatepicker['locale']) {};
    /**
   * Minimum number of days for range selection @default 0
   */
  set minRange(_: Components.AegovDatepicker['minRange']) {};
    /**
   * Maximum number of days for range selection (0 = unlimited) @default 0
   */
  set maxRange(_: Components.AegovDatepicker['maxRange']) {};
    /**
   * Comma-separated ISO dates that cannot be selected @default ''
   */
  set blackout(_: Components.AegovDatepicker['blackout']) {};
    /**
   * Comma-separated preset IDs for range mode (e.g., "today,last7Days,thisMonth") @default ''
   */
  set presets(_: Components.AegovDatepicker['presets']) {};
    /**
   * Whether the datepicker is disabled @default false
   */
  set isDisabled(_: Components.AegovDatepicker['isDisabled']) {};
    /**
   * Marks the datepicker as required for form validation. Sets `required` on the inner input. @default false
   */
  set isRequired(_: Components.AegovDatepicker['isRequired']) {};
    /**
   * Show clear button when value is set @default true
   */
  set isClearable(_: Components.AegovDatepicker['isClearable']) {};
    /**
   * Show month/year select dropdowns in header @default true
   */
  set isHeaderSelectable(_: Components.AegovDatepicker['isHeaderSelectable']) {};
    /**
   * Start year for the year dropdown (default: current year - 100) @default 0
   */
  set yearRangeStart(_: Components.AegovDatepicker['yearRangeStart']) {};
    /**
   * End year for the year dropdown (default: current year + 100) @default 0
   */
  set yearRangeEnd(_: Components.AegovDatepicker['yearRangeEnd']) {};
    /**
   * Show Apply/Cancel buttons for confirming selection @default false
   */
  set isWithConfirmation(_: Components.AegovDatepicker['isWithConfirmation']) {};
    /**
   * The size of the datepicker input. @default 'base'
   */
  set size(_: Components.AegovDatepicker['size']) {};
    /**
   * Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring stays camel; error stays aered regardless.
   */
  set variant(_: Components.AegovDatepicker['variant']) {};
    /**
   * Optional unique field ID. Used by aegov-form-field for label linking + error/hint id derivation.
   */
  set fieldId(_: Components.AegovDatepicker['fieldId']) {};
    /**
   * Form field name for FormAssociated submission (§2.5).
   */
  set name(_: Components.AegovDatepicker['name']) {};
    /**
   * Visual + a11y invalid state. See §2.3. @default false
   */
  set isInvalid(_: Components.AegovDatepicker['isInvalid']) {};
    /**
   * Inline error message. Use `error` slot for rich markup. @default ''
   */
  set errorMessage(_: Components.AegovDatepicker['errorMessage']) {};
    /**
   * Helper hint shown below the control. Hidden when an error is shown. @default ''
   */
  set hint(_: Components.AegovDatepicker['hint']) {};
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


import type { AegovDatepickerCustomEvent } from '@aegov/designsystem/components';
import type { DatepickerChangeDetail as IAegovDatepickerDatepickerChangeDetail } from '@aegov/designsystem/components';
import type { DatepickerMonthChangeDetail as IAegovDatepickerDatepickerMonthChangeDetail } from '@aegov/designsystem/components';
import type { AegovValidationDetail as IAegovDatepickerAegovValidationDetail } from '@aegov/designsystem/components';
import type { AegovDatepickerValue as IAegovDatepickerAegovDatepickerValue } from '@aegov/designsystem/components';

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
  inputs: ['animation', 'fieldId', 'isCloseWithOverlay', 'isOpen', 'isOverlay', 'isPadding', 'isPinned', 'isPortal', 'isPreventScroll', 'label', 'overlayOpacity', 'position', 'size'],
  methods: ['show', 'close', 'toggle']
})
@Component({
  selector: 'aegov-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['animation', 'fieldId', { name: 'isCloseWithOverlay', transform: nullableBooleanAttribute }, { name: 'isOpen', transform: nullableBooleanAttribute }, { name: 'isOverlay', transform: nullableBooleanAttribute }, { name: 'isPadding', transform: nullableBooleanAttribute }, { name: 'isPinned', transform: nullableBooleanAttribute }, { name: 'isPortal', transform: nullableBooleanAttribute }, { name: 'isPreventScroll', transform: nullableBooleanAttribute }, 'label', 'overlayOpacity', 'position', 'size'],
  outputs: ['aegovDrawerOpen', 'aegovDrawerClose', 'aegovDrawerBeforeClose', 'aegovDrawerBackdropClick', 'aegovDrawerEscapePress'],
})
export class AegovDrawer {
  protected el: HTMLAegovDrawerElement;
    /**
   * Unique ID for the drawer dialog element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovDrawer['fieldId']) {};
    /**
   * Whether the drawer is currently open/visible @default false
   */
  set isOpen(_: Components.AegovDrawer['isOpen']) {};
    /**
   * Which edge the drawer slides from @default 'right'
   */
  set position(_: Components.AegovDrawer['position']) {};
    /**
   * Animation strategy for open/close transitions @default 'slide'
   */
  set animation(_: Components.AegovDrawer['animation']) {};
    /**
   * Whether the drawer is pinned flush to edges (true) or has a gap with rounded corners (false) @default true
   */
  set isPinned(_: Components.AegovDrawer['isPinned']) {};
    /**
   * Whether to show a backdrop overlay behind the drawer @default true
   */
  set isOverlay(_: Components.AegovDrawer['isOverlay']) {};
    /**
   * Backdrop overlay opacity level @default 'base'
   */
  set overlayOpacity(_: Components.AegovDrawer['overlayOpacity']) {};
    /**
   * Whether clicking the backdrop closes the drawer @default true
   */
  set isCloseWithOverlay(_: Components.AegovDrawer['isCloseWithOverlay']) {};
    /**
   * Whether to prevent body scroll when drawer is open @default true
   */
  set isPreventScroll(_: Components.AegovDrawer['isPreventScroll']) {};
    /**
   * Whether the drawer relocates itself to `document.body` while open, so it
stacks above the rest of the page. (It returns to where it was declared
when it closes, and leaves with its declared parent if that is removed.)

Set to `false` when the drawer is rendered inside another component's
shadow DOM and forwards a `<slot>` into its content: relocating would take
that slot out of its shadow tree, where it projects nothing. The panel and
backdrop are `position: fixed`, so they still cover the viewport in place —
unless an ancestor creates a containing block (`transform`, `filter`,
`contain`, `will-change`), in which case leave this on. @default true
   */
  set isPortal(_: Components.AegovDrawer['isPortal']) {};
    /**
   * Panel width for left/right drawers, or panel height for top/bottom drawers.
xs=320px · sm=384px · base=480px (default) · lg=640px · xl=800px · full=100vw/100dvh.
Also scales padding and, when `is-pinned="false"`, the edge gap and border-radius.
On viewports narrower than 640px all left/right sizes collapse to full width. @default 'base'
   */
  set size(_: Components.AegovDrawer['size']) {};
    /**
   * Whether to apply inner content padding. On by default; scales with size. @default true
   */
  set isPadding(_: Components.AegovDrawer['isPadding']) {};
    /**
   * Accessible label for the dialog. Passed as `aria-label` on the dialog element.
Required for screen readers unless you pass `aria-labelledby` pointing to a
heading rendered inside the drawer's slot.
   */
  set label(_: Components.AegovDrawer['label']) {};
  @Output() aegovDrawerOpen = new EventEmitter<AegovDrawerCustomEvent<void>>();
  @Output() aegovDrawerClose = new EventEmitter<AegovDrawerCustomEvent<void>>();
  @Output() aegovDrawerBeforeClose = new EventEmitter<AegovDrawerCustomEvent<void>>();
  @Output() aegovDrawerBackdropClick = new EventEmitter<AegovDrawerCustomEvent<MouseEvent>>();
  @Output() aegovDrawerEscapePress = new EventEmitter<AegovDrawerCustomEvent<KeyboardEvent>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovDrawerCustomEvent } from '@aegov/designsystem/components';

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
   * Emitted before the drawer closes. Cancel by calling `preventDefault()` on the
event itself — matching `aegovModalBeforeClose`.
   */
  aegovDrawerBeforeClose: EventEmitter<AegovDrawerCustomEvent<void>>;
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
  inputs: ['align', { name: 'delayEnd', transform: nullableNumberAttribute }, { name: 'delayStart', transform: nullableNumberAttribute }, 'fieldId', { name: 'gap', transform: nullableNumberAttribute }, { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'offset', transform: nullableNumberAttribute }, 'position', 'tabBehavior', 'trigger'],
  outputs: ['aegovDropdownOpen', 'aegovDropdownClose'],
})
export class AegovDropdown {
  protected el: HTMLAegovDropdownElement;
    /**
   * Unique ID for the dropdown menu element. Auto-generated if not provided.
The trigger element receives a derived ID `${fieldId}-trigger` for ARIA linkage.
   */
  set fieldId(_: Components.AegovDropdown['fieldId']) {};
    /**
   * Trigger type for showing the dropdown @default 'click'
   */
  set trigger(_: Components.AegovDropdown['trigger']) {};
    /**
   * Controls Tab key behaviour when the dropdown is open.

- `'menu-button'` (default): Tab and Shift+Tab trap focus inside the open
  menu, cycling through its items with wraparound — identical to
  ArrowDown/ArrowUp. Use this for action menus, settings menus, and other
  non-navigation dropdowns.

- `'disclosure'`: Tab moves focus through the links inside the open menu,
  then closes it when focus leaves the last item — follows the WAI-ARIA
  Disclosure Navigation Hybrid pattern. Set automatically by
  `aegov-navbar-item` when the dropdown is used as a nav sub-menu. @default 'menu-button'
   */
  set tabBehavior(_: Components.AegovDropdown['tabBehavior']) {};
    /**
   * Position of the dropdown relative to the trigger element @default 'bottom'
   */
  set position(_: Components.AegovDropdown['position']) {};
    /**
   * Alignment of the dropdown @default 'start'
   */
  set align(_: Components.AegovDropdown['align']) {};
    /**
   * Gap between dropdown and trigger element (in pixels) @default 8
   */
  set gap(_: Components.AegovDropdown['gap']) {};
    /**
   * Additional offset for dropdown positioning (in pixels) @default 0
   */
  set offset(_: Components.AegovDropdown['offset']) {};
    /**
   * Whether the dropdown is disabled @default false
   */
  set isDisabled(_: Components.AegovDropdown['isDisabled']) {};
    /**
   * Delay before showing dropdown (in milliseconds) @default 200
   */
  set delayStart(_: Components.AegovDropdown['delayStart']) {};
    /**
   * Delay before hiding dropdown (in milliseconds) @default 0
   */
  set delayEnd(_: Components.AegovDropdown['delayEnd']) {};
  @Output() aegovDropdownOpen = new EventEmitter<AegovDropdownCustomEvent<void>>();
  @Output() aegovDropdownClose = new EventEmitter<AegovDropdownCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovDropdownCustomEvent } from '@aegov/designsystem/components';

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
  inputs: ['accept', 'appearance', 'errorMessage', 'fieldId', 'hint', { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'isInvalid', transform: nullableBooleanAttribute }, { name: 'isMultiple', transform: nullableBooleanAttribute }, { name: 'isRequired', transform: nullableBooleanAttribute }, 'label', 'labelButton', 'labelHelp', { name: 'maxFileSize', transform: nullableNumberAttribute }, { name: 'maxFiles', transform: nullableNumberAttribute }, 'name', 'size', 'variant'],
  outputs: ['aegovFileuploadChange', 'aegovFileuploadRemove', 'aegovValidate'],
})
export class AegovFileupload {
  protected el: HTMLAegovFileuploadElement;
    /**
   * Unique field ID. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovFileupload['fieldId']) {};
    /**
   * Variant style: 'default' (styled input + button), 'button' (hidden input, label-as-button),
or 'dropzone' (drag-and-drop area). @default 'default'
   */
  set appearance(_: Components.AegovFileupload['appearance']) {};
    /**
   * Component size. @default 'base'
   */
  set size(_: Components.AegovFileupload['size']) {};
    /**
   * Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring stays camel; error stays aered regardless.
   */
  set variant(_: Components.AegovFileupload['variant']) {};
    /**
   * Allow multiple file selection. @default false
   */
  set isMultiple(_: Components.AegovFileupload['isMultiple']) {};
    /**
   * Accepted file types (e.g. ".pdf,.jpg,image/*").
   */
  set accept(_: Components.AegovFileupload['accept']) {};
    /**
   * Maximum file size in bytes.
   */
  set maxFileSize(_: Components.AegovFileupload['maxFileSize']) {};
    /**
   * Maximum number of files (multiple mode only). No limit by default.
   */
  set maxFiles(_: Components.AegovFileupload['maxFiles']) {};
    /**
   * Disables the file upload. @default false
   */
  set isDisabled(_: Components.AegovFileupload['isDisabled']) {};
    /**
   * Marks the field as required. @default false
   */
  set isRequired(_: Components.AegovFileupload['isRequired']) {};
    /**
   * Visual + a11y invalid state. See §2.3. @default false
   */
  set isInvalid(_: Components.AegovFileupload['isInvalid']) {};
    /**
   * Inline error message. Use `error` slot for rich markup. @default ''
   */
  set errorMessage(_: Components.AegovFileupload['errorMessage']) {};
    /**
   * Form field name.
   */
  set name(_: Components.AegovFileupload['name']) {};
    /**
   * Label text displayed above the control.
   */
  set label(_: Components.AegovFileupload['label']) {};
    /**
   * Helper hint text displayed below the label. Renamed from `description` per §6.6
(pre-production rename, no compat shim). Hidden when an error is shown.
   */
  set hint(_: Components.AegovFileupload['hint']) {};
    /**
   * Custom helper text for allowed file types. Overrides auto-generated text from `accept`.
Shown alongside the hint, distinct from validation error text.
   */
  set labelHelp(_: Components.AegovFileupload['labelHelp']) {};
    /**
   * Custom text for the browse/trigger button.
   */
  set labelButton(_: Components.AegovFileupload['labelButton']) {};
  @Output() aegovFileuploadChange = new EventEmitter<AegovFileuploadCustomEvent<{ files: File[] }>>();
  @Output() aegovFileuploadRemove = new EventEmitter<AegovFileuploadCustomEvent<{ file: File; remaining: File[] }>>();
  @Output() aegovValidate = new EventEmitter<AegovFileuploadCustomEvent<IAegovFileuploadAegovValidationDetail<File[]>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovFileuploadCustomEvent } from '@aegov/designsystem/components';
import type { AegovValidationDetail as IAegovFileuploadAegovValidationDetail } from '@aegov/designsystem/components';

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
  defineCustomElementFn: defineAegovFooter,
  inputs: ['appStoreHref', 'entityContactHref', 'entityContactNumber', 'entityContactNumberLabel', 'entityEmail', 'entityEmailLabel', 'googlePlayHref', 'navVariant']
})
@Component({
  selector: 'aegov-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appStoreHref', 'entityContactHref', 'entityContactNumber', 'entityContactNumberLabel', 'entityEmail', 'entityEmailLabel', 'googlePlayHref', 'navVariant'],
})
export class AegovFooter {
  protected el: HTMLAegovFooterElement;
    /**
   * Controls how footer link columns behave below the `sm` breakpoint (640px)
— the point at which the reference footer block stops being collapsible
altogether, well before the grid switches from 2 to 4 columns at `lg`.
- "collapsible" (default): each column's content toggles below `sm`, always expanded at `sm+`.
- "flat": columns are always expanded, at every breakpoint.
Author each column as a plain title element + content — no extra markup needed for either value. @default 'collapsible'
   */
  set navVariant(_: Components.AegovFooter['navVariant']) {};
    /**
   * Forwarded to the embedded `aegov-footer-highlights`.
   */
  set entityContactNumber(_: Components.AegovFooter['entityContactNumber']) {};
    /**
   * Forwarded to the embedded `aegov-footer-highlights`.
   */
  set entityContactNumberLabel(_: Components.AegovFooter['entityContactNumberLabel']) {};
    /**
   * Forwarded to the embedded `aegov-footer-highlights`.
   */
  set entityEmail(_: Components.AegovFooter['entityEmail']) {};
    /**
   * Forwarded to the embedded `aegov-footer-highlights`.
   */
  set entityEmailLabel(_: Components.AegovFooter['entityEmailLabel']) {};
    /**
   * Forwarded to the embedded `aegov-footer-highlights`.
   */
  set entityContactHref(_: Components.AegovFooter['entityContactHref']) {};
    /**
   * Link to the entity's app on Apple's App Store. When set (alone or with
`googlePlayHref`), a "Download our app" badge block renders in the
`brand` column, below the slotted logo/description/social links.
Entirely optional — nothing renders unless at least one of the two is
provided.
   */
  set appStoreHref(_: Components.AegovFooter['appStoreHref']) {};
    /**
   * Link to the entity's app on Google Play, shown alongside `appStoreHref`
in the same "Download our app" block.
   */
  set googlePlayHref(_: Components.AegovFooter['googlePlayHref']) {};
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovFooter extends Components.AegovFooter {}


@ProxyCmp({
  defineCustomElementFn: defineAegovFooterHighlights,
  inputs: ['entityContactHref', 'entityContactNumber', 'entityContactNumberLabel', 'entityEmail', 'entityEmailLabel']
})
@Component({
  selector: 'aegov-footer-highlights',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['entityContactHref', 'entityContactNumber', 'entityContactNumberLabel', 'entityEmail', 'entityEmailLabel'],
})
export class AegovFooterHighlights {
  protected el: HTMLAegovFooterHighlightsElement;
    /**
   * The entity's own contact number (e.g. "800 8877"), shown in the fixed
"Contact us" card alongside the Tawasul 171/WhatsApp channels. Entirely
optional and site-specific — nothing renders unless it's provided.
   */
  set entityContactNumber(_: Components.AegovFooterHighlights['entityContactNumber']) {};
    /**
   * Overrides the label shown before `entityContactNumber` (defaults to the
bilingual "Toll free"/"الرقم المجاني" text used elsewhere in this block).
   */
  set entityContactNumberLabel(_: Components.AegovFooterHighlights['entityContactNumberLabel']) {};
    /**
   * The entity's own contact email, shown below the contact number. Entirely
optional — nothing renders unless it's provided.
   */
  set entityEmail(_: Components.AegovFooterHighlights['entityEmail']) {};
    /**
   * Overrides the label shown before `entityEmail` (defaults to the
bilingual "Email"/"البريد الإلكتروني" text).
   */
  set entityEmailLabel(_: Components.AegovFooterHighlights['entityEmailLabel']) {};
    /**
   * Target for the fixed "Contact us" link at the end of the card. The link
text itself is fixed — only the destination is site-specific — so
nothing renders unless this is provided.
   */
  set entityContactHref(_: Components.AegovFooterHighlights['entityContactHref']) {};
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovFooterHighlights extends Components.AegovFooterHighlights {}


@ProxyCmp({
  defineCustomElementFn: defineAegovFormField,
  inputs: ['errorMessage', 'extraClass', 'fieldId', 'hint', 'isInvalid', 'variant']
})
@Component({
  selector: 'aegov-form-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['errorMessage', 'extraClass', 'fieldId', 'hint', { name: 'isInvalid', transform: nullableBooleanAttribute }, 'variant'],
})
export class AegovFormField {
  protected el: HTMLAegovFormFieldElement;
    /**
   * Unique ID for the form-field wrapper. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovFormField['fieldId']) {};
    /**
   * Wrapper-level invalid state. Cascades to the first form-control descendant if the
child has not set its own value; setting it back to `false` clears what it
cascaded. See validation-engine-addon.md §2.7. @default false
   */
  set isInvalid(_: Components.AegovFormField['isInvalid']) {};
    /**
   * Wrapper-level error message — cascaded to first form-control descendant unless it has its own; changing or clearing it updates the cascaded value. @default ''
   */
  set errorMessage(_: Components.AegovFormField['errorMessage']) {};
    /**
   * Wrapper-level hint — cascaded to first form-control descendant unless it has its own; changing or clearing it updates the cascaded value. @default ''
   */
  set hint(_: Components.AegovFormField['hint']) {};
    /**
   * Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Cascades to first form-control descendant.
   */
  set variant(_: Components.AegovFormField['variant']) {};
    /**
   * Additional CSS classes to apply.
   */
  set extraClass(_: Components.AegovFormField['extraClass']) {};
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovFormField extends Components.AegovFormField {}


@ProxyCmp({
  defineCustomElementFn: defineAegovHeader,
  inputs: ['collapseAt', 'drawerSize', 'entityDomain', 'entityName', 'isSticky', 'labelMenu', 'labelMenuClose', 'logoLabel', 'skipContentContainer', 'variant'],
  methods: ['openMenu', 'closeMenu', 'toggleMenu']
})
@Component({
  selector: 'aegov-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['collapseAt', 'drawerSize', 'entityDomain', 'entityName', { name: 'isSticky', transform: nullableBooleanAttribute }, 'labelMenu', 'labelMenuClose', 'logoLabel', 'skipContentContainer', 'variant'],
  outputs: ['aegovHeaderMenuOpen', 'aegovHeaderMenuClose', 'aegovHeaderStuck', 'aegovHeaderUnstuck'],
})
export class AegovHeader {
  protected el: HTMLAegovHeaderElement;
    /**
   * The variant of the header. Determines the layout and style.
- "ministry": Header for ministry-level entities
- "authority": Header for authority-level entities @default 'ministry'
   */
  set variant(_: Components.AegovHeader['variant']) {};
    /**
   * The name of the government entity. Required. Forwarded to the embedded aegov-header-banner.
   */
  set entityName(_: Components.AegovHeader['entityName']) {};
    /**
   * The domain/URL of the government entity. Required. Forwarded to the embedded aegov-header-banner.
   */
  set entityDomain(_: Components.AegovHeader['entityDomain']) {};
    /**
   * Forwarded to the embedded aegov-header-banner. The CSS selector or ID of the main content container to skip to (e.g. "#main-content"). When provided, the banner injects a "Skip to content" link at the top of the document body.
   */
  set skipContentContainer(_: Components.AegovHeader['skipContentContainer']) {};
    /**
   * Accessible name for the logo anchor. When provided, applied as aria-label on the <a> element.
   */
  set logoLabel(_: Components.AegovHeader['logoLabel']) {};
    /**
   * Accessible name for the menu toggle, and the accessible name of the drawer it opens. Defaults to "Menu" / "القائمة".
   */
  set labelMenu(_: Components.AegovHeader['labelMenu']) {};
    /**
   * Accessible name for the close button inside the menu drawer. Defaults to "Close menu" / "إغلاق القائمة".
   */
  set labelMenuClose(_: Components.AegovHeader['labelMenuClose']) {};
    /**
   * Breakpoint at which the `navigation` slot appears and the menu toggle
disappears. Below it, navigation is hidden and the toggle opens the drawer.
`"lg"` (1024px) by default; `"md"` is the narrowest allowed. @default 'lg'
   */
  set collapseAt(_: Components.AegovHeader['collapseAt']) {};
    /**
   * Panel width of the menu drawer. Below 640px all widths collapse to full width. @default 'base'
   */
  set drawerSize(_: Components.AegovHeader['drawerSize']) {};
    /**
   * Whether the main bar pins to the top of the viewport on scroll. The
`aegov-header-banner` above it scrolls away; once it has, the bar gains a
translucent blurred background and a shadow.

Implemented by making the host itself sticky with a negative `top` equal to
the banner's height — `position: sticky` on the bar alone cannot work,
because a sticky element is confined to its parent's box and would unstick
as soon as the header scrolled past. Like any sticky element, an ancestor
with `overflow: hidden` / `auto` in the consumer's page breaks it. @default false
   */
  set isSticky(_: Components.AegovHeader['isSticky']) {};
  @Output() aegovHeaderMenuOpen = new EventEmitter<AegovHeaderCustomEvent<void>>();
  @Output() aegovHeaderMenuClose = new EventEmitter<AegovHeaderCustomEvent<void>>();
  @Output() aegovHeaderStuck = new EventEmitter<AegovHeaderCustomEvent<void>>();
  @Output() aegovHeaderUnstuck = new EventEmitter<AegovHeaderCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovHeaderCustomEvent } from '@aegov/designsystem/components';

export declare interface AegovHeader extends Components.AegovHeader {
  /**
   * Emitted when the menu drawer has opened.
   */
  aegovHeaderMenuOpen: EventEmitter<AegovHeaderCustomEvent<void>>;
  /**
   * Emitted when the menu drawer has closed.
   */
  aegovHeaderMenuClose: EventEmitter<AegovHeaderCustomEvent<void>>;
  /**
   * Emitted when the bar pins to the top of the viewport. Only fires when `isSticky` is set.
   */
  aegovHeaderStuck: EventEmitter<AegovHeaderCustomEvent<void>>;
  /**
   * Emitted when the bar returns to its resting position. Only fires when `isSticky` is set.
   */
  aegovHeaderUnstuck: EventEmitter<AegovHeaderCustomEvent<void>>;
}


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
    /**
   * The name of the government entity. Required.
   */
  set entityName(_: Components.AegovHeaderBanner['entityName']) {};
    /**
   * The domain/URL of the government entity. Required.
   */
  set entityDomain(_: Components.AegovHeaderBanner['entityDomain']) {};
    /**
   * The CSS selector or ID of the main content container to skip to (e.g. "#main-content"). When provided, renders a "Skip to content" link before the header for keyboard accessibility.
   */
  set skipContentContainer(_: Components.AegovHeaderBanner['skipContentContainer']) {};
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
  inputs: ['errorMessage', 'extraClass', 'fieldId', 'hint', { name: 'isCopyable', transform: nullableBooleanAttribute }, { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'isInvalid', transform: nullableBooleanAttribute }, { name: 'isReadonly', transform: nullableBooleanAttribute }, { name: 'isRequired', transform: nullableBooleanAttribute }, { name: 'isRevealable', transform: nullableBooleanAttribute }, 'name', 'placeholder', 'size', 'type', 'value', 'variant'],
  outputs: ['aegovInputChange', 'aegovInputValue', 'aegovInputFocus', 'aegovInputBlur', 'aegovValidate'],
})
export class AegovInput {
  protected el: HTMLAegovInputElement;
    /**
   * Unique ID for the native input element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovInput['fieldId']) {};
    /**
   * The type of the input field. @default 'text'
   */
  set type(_: Components.AegovInput['type']) {};
    /**
   * The size of the input field. @default 'base'
   */
  set size(_: Components.AegovInput['size']) {};
    /**
   * Colour family. Drives idle ring, value text, and accent hover. Focus ring stays camel; error stays aered regardless.
   */
  set variant(_: Components.AegovInput['variant']) {};
    /**
   * Whether the input is disabled. @default false
   */
  set isDisabled(_: Components.AegovInput['isDisabled']) {};
    /**
   * Whether the input is readonly. @default false
   */
  set isReadonly(_: Components.AegovInput['isReadonly']) {};
    /**
   * Placeholder text for the input.
   */
  set placeholder(_: Components.AegovInput['placeholder']) {};
    /**
   * The current value of the input. @default ''
   */
  set value(_: Components.AegovInput['value']) {};
    /**
   * The name attribute for the input. Reflected so ElementInternals can read it for form submission.
   */
  set name(_: Components.AegovInput['name']) {};
    /**
   * Whether the input is required. @default false
   */
  set isRequired(_: Components.AegovInput['isRequired']) {};
    /**
   * Show a toggle button to reveal/hide password. Only applies when type="password". @default false
   */
  set isRevealable(_: Components.AegovInput['isRevealable']) {};
    /**
   * Show a copy button to copy the input value to clipboard. Only applies when readonly. @default false
   */
  set isCopyable(_: Components.AegovInput['isCopyable']) {};
    /**
   * Visual + a11y invalid state. Toggles `aria-invalid="true"` on the inner input
and adds the `is-invalid` class on the host. See validation-engine-addon.md §2.3. @default false
   */
  set isInvalid(_: Components.AegovInput['isInvalid']) {};
    /**
   * Inline error message rendered below the control when `isInvalid` is true.
Auto-wires `aria-describedby` on the inner input. Use the `error` slot for
richer markup. @default ''
   */
  set errorMessage(_: Components.AegovInput['errorMessage']) {};
    /**
   * Helper hint rendered below the control. Hidden when an error is shown so the
two text regions don't compete for the user's attention. Use the `hint` slot
for richer markup. @default ''
   */
  set hint(_: Components.AegovInput['hint']) {};
    /**
   * Additional CSS classes to apply.

This component renders in a real shadow root, which normally blocks the page's CSS
from reaching inside it. Margin/padding utilities (e.g. `mt-4`, `md:px-6`) are copied
in from the page's own stylesheets at runtime and work as expected; other utilities
(colour, border, typography, etc.) still have no effect — see #35.
   */
  set extraClass(_: Components.AegovInput['extraClass']) {};
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


import type { AegovInputCustomEvent } from '@aegov/designsystem/components';
import type { AegovValidationDetail as IAegovInputAegovValidationDetail } from '@aegov/designsystem/components';

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
    /**
   * The size of the input group. Propagated to child aegov-input and aegov-button. @default 'base'
   */
  set size(_: Components.AegovInputGroup['size']) {};
    /**
   * Text to display as a prefix addon before the input.
   */
  set addonPrefix(_: Components.AegovInputGroup['addonPrefix']) {};
    /**
   * Text to display as a suffix addon after the input.
   */
  set addonSuffix(_: Components.AegovInputGroup['addonSuffix']) {};
    /**
   * Accessible label for the group. Sets `aria-label` on the group wrapper.
Use this to describe the purpose of a combined phone/URL/similar input group.
   */
  set groupLabel(_: Components.AegovInputGroup['groupLabel']) {};
    /**
   * Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring stays camel; error stays aered regardless.
   */
  set variant(_: Components.AegovInputGroup['variant']) {};
    /**
   * Additional CSS classes to apply.
   */
  set extraClass(_: Components.AegovInputGroup['extraClass']) {};
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
    /**
   * Unique ID for the label element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovLabel['fieldId']) {};
    /**
   * The ID of the form element this label is for. Automatically set by parent aegov-form-field.
   */
  set htmlFor(_: Components.AegovLabel['htmlFor']) {};
    /**
   * Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring stays camel; error stays aered regardless.
   */
  set variant(_: Components.AegovLabel['variant']) {};
    /**
   * Additional CSS classes to apply.
   */
  set extraClass(_: Components.AegovLabel['extraClass']) {};
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
  inputs: ['appearance', 'extraClass', 'fieldId', { name: 'href', required: true }, { name: 'isBold', transform: nullableBooleanAttribute }, { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'isFull', transform: nullableBooleanAttribute }, { name: 'isIcon', transform: nullableBooleanAttribute }, 'rel', 'size', 'target', 'variant'],
  outputs: ['aegovLinkClick'],
})
export class AegovLink {
  protected el: HTMLAegovLinkElement;
    /**
   * Unique ID for the inner anchor element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovLink['fieldId']) {};
    /**
   * The URL that the link points to. @required undefined
   */
  set href(_: Components.AegovLink['href']) {};
    /**
   * Target attribute for the link (_blank, _self, _parent, _top).
   */
  set target(_: Components.AegovLink['target']) {};
    /**
   * Rel attribute for the link (e.g., "noopener noreferrer" for external links).
   */
  set rel(_: Components.AegovLink['rel']) {};
    /**
   * Additional CSS classes to apply to the link.
   */
  set extraClass(_: Components.AegovLink['extraClass']) {};
    /**
   * Button-style color variant. Setting this opts into button styling.
   */
  set variant(_: Components.AegovLink['variant']) {};
    /**
   * Button-style appearance. Setting this opts into button styling.
   */
  set appearance(_: Components.AegovLink['appearance']) {};
    /**
   * Button-style size (xs/sm/base/lg/xl, optionally responsive).
   */
  set size(_: Components.AegovLink['size']) {};
    /**
   * Render as icon-only (square). Requires a button-style appearance. @default false
   */
  set isIcon(_: Components.AegovLink['isIcon']) {};
    /**
   * Stretch to fill container width. @default false
   */
  set isFull(_: Components.AegovLink['isFull']) {};
    /**
   * Bold text. @default true
   */
  set isBold(_: Components.AegovLink['isBold']) {};
    /**
   * Disable navigation and apply disabled styling. Adds `aria-disabled="true"`,
removes the link from tab order, and prevents default click navigation.
Native `<a>` does not support `disabled`; this is a polyfill. @default false
   */
  set isDisabled(_: Components.AegovLink['isDisabled']) {};
  @Output() aegovLinkClick = new EventEmitter<AegovLinkCustomEvent<{ href: string; event: MouseEvent }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovLinkCustomEvent } from '@aegov/designsystem/components';

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
  inputs: ['fieldId', { name: 'isCloseWithOverlay', transform: nullableBooleanAttribute }, { name: 'isOpen', transform: nullableBooleanAttribute }, { name: 'isPadding', transform: nullableBooleanAttribute }, { name: 'isPreventScroll', transform: nullableBooleanAttribute }, 'label', 'overlayOpacity', 'position', 'size'],
  outputs: ['aegovModalOpen', 'aegovModalClose', 'aegovModalBeforeClose', 'aegovModalBackdropClick', 'aegovModalEscapePress'],
})
export class AegovModal {
  protected el: HTMLAegovModalElement;
    /**
   * Unique ID for the modal dialog element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovModal['fieldId']) {};
    /**
   * Whether the modal is currently open/visible @default false
   */
  set isOpen(_: Components.AegovModal['isOpen']) {};
    /**
   * Whether clicking the overlay closes the modal @default true
   */
  set isCloseWithOverlay(_: Components.AegovModal['isCloseWithOverlay']) {};
    /**
   * Whether to prevent body scroll when modal is open @default true
   */
  set isPreventScroll(_: Components.AegovModal['isPreventScroll']) {};
    /**
   * Overlay opacity level @default 'base'
   */
  set overlayOpacity(_: Components.AegovModal['overlayOpacity']) {};
    /**
   * Position of the modal on screen @default 'center'
   */
  set position(_: Components.AegovModal['position']) {};
    /**
   * Size: 'sm' (compact padding/radius), 'base' (default), 'lg' (generous padding/radius), or 'xl' (extra-wide). Mirrors aegov-card sizing tokens. @default 'base'
   */
  set size(_: Components.AegovModal['size']) {};
    /**
   * Whether to apply inner content padding. On by default; scales with size. @default true
   */
  set isPadding(_: Components.AegovModal['isPadding']) {};
    /**
   * Accessible label for the dialog. Passed as `aria-label` on the dialog element.
Required for screen readers unless you pass `aria-labelledby` pointing to a
heading rendered inside the modal's slot.
   */
  set label(_: Components.AegovModal['label']) {};
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


import type { AegovModalCustomEvent } from '@aegov/designsystem/components';

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
    /**
   * Size of the navbar items. Accepts a Tailwind-style responsive string,
e.g. `"sm md:base lg:lg"`, resolved against the active viewport width.
The resolved token cascades to all aegov-navbar-item children. @default 'base'
   */
  set size(_: Components.AegovNavbar['size']) {};
    /**
   * Tailwind gap utility class applied between items, e.g. "gap-4", "gap-6", "gap-10". @default 'gap-3'
   */
  set gap(_: Components.AegovNavbar['gap']) {};
    /**
   * Accessible label for the navigation landmark. Defaults to "Main navigation" (LTR) or "التنقل الرئيسي" (RTL). @default ''
   */
  set labelNav(_: Components.AegovNavbar['labelNav']) {};
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
  inputs: ['href', { name: 'isActive', transform: nullableBooleanAttribute }, { name: 'isDisabled', transform: nullableBooleanAttribute }, 'rel', 'size', 'target'],
})
export class AegovNavbarItem {
  protected el: HTMLAegovNavbarItemElement;
    /**
   * URL the item links to. If unset, item renders as a non-link span.
   */
  set href(_: Components.AegovNavbarItem['href']) {};
    /**
   * Anchor target attribute.
   */
  set target(_: Components.AegovNavbarItem['target']) {};
    /**
   * Anchor rel attribute.
   */
  set rel(_: Components.AegovNavbarItem['rel']) {};
    /**
   * Mark this item as the current page. Sets `aria-current="page"`. @default false
   */
  set isActive(_: Components.AegovNavbarItem['isActive']) {};
    /**
   * Visually disabled, not clickable, removed from arrow-key cycle. @default false
   */
  set isDisabled(_: Components.AegovNavbarItem['isDisabled']) {};
    /**
   * Size token. Accepts a Tailwind-style responsive string (e.g.
`"sm md:base lg:lg"`). Parent aegov-navbar sets this to its resolved
value; standalone use also supports breakpoint syntax. @default 'base'
   */
  set size(_: Components.AegovNavbarItem['size']) {};
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
  inputs: [{ name: 'activeBorder', transform: nullableBooleanAttribute }, 'blockTitle', 'fieldId', 'icon', { name: 'isBordered', transform: nullableBooleanAttribute }, { name: 'isMultiple', transform: nullableBooleanAttribute }, 'labelNav', 'size', 'variant'],
})
export class AegovNavblock {
  protected el: HTMLAegovNavblockElement;
    /**
   * Unique ID for the block wrapper. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovNavblock['fieldId']) {};
    /**
   * Block title text shown above items. The `title` slot overrides this.
   */
  set blockTitle(_: Components.AegovNavblock['blockTitle']) {};
    /**
   * Accessible label for the navigation landmark. Defaults to "Sidebar navigation" (LTR) or "التنقل في الشريط الجانبي" (RTL). @default ''
   */
  set labelNav(_: Components.AegovNavblock['labelNav']) {};
    /**
   * Allow multiple items to be open at the same level simultaneously. @default false
   */
  set isMultiple(_: Components.AegovNavblock['isMultiple']) {};
    /**
   * Expand/collapse icon style for items. @default 'chevron'
   */
  set icon(_: Components.AegovNavblock['icon']) {};
    /**
   * Size token. Accepts a Tailwind-style responsive string (e.g.
`"sm md:base lg:lg"`). Resolves at runtime and cascades to all items. @default 'base'
   */
  set size(_: Components.AegovNavblock['size']) {};
    /**
   * Wrap the block in a bordered container with padding. @default false
   */
  set isBordered(_: Components.AegovNavblock['isBordered']) {};
    /**
   * Visual variant. `collapsible` (default) shows nested items in an
animated accordion; `flat` renders all items at the same indentation
level with group headers styled bold. @default 'collapsible'
   */
  set variant(_: Components.AegovNavblock['variant']) {};
    /**
   * When `true` and `variant="flat"`, the active item shows a coloured
inline-start border as an active indicator (matches the Flux sidebar style). @default false
   */
  set activeBorder(_: Components.AegovNavblock['activeBorder']) {};
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
  inputs: ['href', { name: 'isActive', transform: nullableBooleanAttribute }, { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'isOpen', transform: nullableBooleanAttribute }, 'rel', 'target'],
  outputs: ['aegovNavblockItemToggle'],
})
export class AegovNavblockItem {
  protected el: HTMLAegovNavblockItemElement;
    /**
   * Destination URL. If set and the item has no sub-items, renders an `<a>`.
   */
  set href(_: Components.AegovNavblockItem['href']) {};
    /**
   * Anchor target.
   */
  set target(_: Components.AegovNavblockItem['target']) {};
    /**
   * Anchor rel.
   */
  set rel(_: Components.AegovNavblockItem['rel']) {};
    /**
   * Mark as the current page. Sets `aria-current="page"` on the link. @default false
   */
  set isActive(_: Components.AegovNavblockItem['isActive']) {};
    /**
   * Visually disabled, not focusable, click no-op. @default false
   */
  set isDisabled(_: Components.AegovNavblockItem['isDisabled']) {};
    /**
   * Whether the sub-region is open. Set by parent navblock or parent
navblock-item; mutable so the row can self-toggle. @default false
   */
  set isOpen(_: Components.AegovNavblockItem['isOpen']) {};
  @Output() aegovNavblockItemToggle = new EventEmitter<AegovNavblockItemCustomEvent<{ open: boolean }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovNavblockItemCustomEvent } from '@aegov/designsystem/components';

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
  inputs: ['appearance', 'errorMessage', 'extraClass', 'fieldId', 'hint', { name: 'isAlphanumeric', transform: nullableBooleanAttribute }, { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'isInvalid', transform: nullableBooleanAttribute }, { name: 'isRequired', transform: nullableBooleanAttribute }, { name: 'length', transform: nullableNumberAttribute }, 'name', 'pattern', 'size', 'value', 'variant'],
  outputs: ['aegovOtpChange', 'aegovOtpComplete', 'aegovValidate'],
})
export class AegovOtp {
  protected el: HTMLAegovOtpElement;
    /**
   * Unique ID for the first input cell. Auto-generated if not provided. Used by aegov-label for linking.
   */
  set fieldId(_: Components.AegovOtp['fieldId']) {};
    /**
   * Visual appearance. "continuous" = single bordered box with dividers between cells.
"individual" = separate bordered boxes per digit. @default 'continuous'
   */
  set appearance(_: Components.AegovOtp['appearance']) {};
    /**
   * Number of input cells (digits/characters expected). @default 5
   */
  set length(_: Components.AegovOtp['length']) {};
    /**
   * Size of the input cells. @default 'base'
   */
  set size(_: Components.AegovOtp['size']) {};
    /**
   * Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring stays camel; error stays aered regardless.
   */
  set variant(_: Components.AegovOtp['variant']) {};
    /**
   * Allow letters and numbers when true. Numbers only when false. @default false
   */
  set isAlphanumeric(_: Components.AegovOtp['isAlphanumeric']) {};
    /**
   * Regex pattern string for validation. Checked when all cells are filled.
   */
  set pattern(_: Components.AegovOtp['pattern']) {};
    /**
   * Disables all input cells. @default false
   */
  set isDisabled(_: Components.AegovOtp['isDisabled']) {};
    /**
   * Marks the field as required for form submission. Used by FormAssociated for `valueMissing`. @default false
   */
  set isRequired(_: Components.AegovOtp['isRequired']) {};
    /**
   * Form field name for FormAssociated submission.
   */
  set name(_: Components.AegovOtp['name']) {};
    /**
   * Current OTP value. Can be set externally to pre-fill cells. @default ''
   */
  set value(_: Components.AegovOtp['value']) {};
    /**
   * Visual + a11y invalid state. See §2.3. @default false
   */
  set isInvalid(_: Components.AegovOtp['isInvalid']) {};
    /**
   * Inline error message. Use `error` slot for rich markup. @default ''
   */
  set errorMessage(_: Components.AegovOtp['errorMessage']) {};
    /**
   * Helper hint shown below the control. Hidden when an error is shown. @default ''
   */
  set hint(_: Components.AegovOtp['hint']) {};
    /**
   * Additional CSS classes.

This component renders in a real shadow root, which normally blocks the page's CSS
from reaching inside it. Margin/padding utilities (e.g. `mt-4`, `md:px-6`) are copied
in from the page's own stylesheets at runtime and work as expected; other utilities
(colour, border, typography, etc.) still have no effect — see #35.
   */
  set extraClass(_: Components.AegovOtp['extraClass']) {};
  @Output() aegovOtpChange = new EventEmitter<AegovOtpCustomEvent<{ value: string }>>();
  @Output() aegovOtpComplete = new EventEmitter<AegovOtpCustomEvent<{ value: string }>>();
  @Output() aegovValidate = new EventEmitter<AegovOtpCustomEvent<IAegovOtpAegovValidationDetail<string>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovOtpCustomEvent } from '@aegov/designsystem/components';
import type { AegovValidationDetail as IAegovOtpAegovValidationDetail } from '@aegov/designsystem/components';

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
  inputs: [{ name: 'countBoundary', transform: nullableNumberAttribute }, { name: 'countSibling', transform: nullableNumberAttribute }, 'fieldId', { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'isEnabledFirstLast', transform: nullableBooleanAttribute }, 'labelFirst', 'labelLast', 'labelNext', 'labelPrev', { name: 'pageCurrent', transform: nullableNumberAttribute }, { name: 'pages', transform: nullableNumberAttribute }, 'size', 'variant'],
  outputs: ['aegovPaginationPageChange'],
})
export class AegovPagination {
  protected el: HTMLAegovPaginationElement;
    /**
   * Unique ID for the pagination nav element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovPagination['fieldId']) {};
    /**
   * Total number of pages. @default 1
   */
  set pages(_: Components.AegovPagination['pages']) {};
    /**
   * Currently active page (1-indexed).
This is a controlled prop — you must update it on every aegovPaginationPageChange event. @default 1
   */
  set pageCurrent(_: Components.AegovPagination['pageCurrent']) {};
    /**
   * Show First and Last navigation buttons alongside Previous and Next. @default false
   */
  set isEnabledFirstLast(_: Components.AegovPagination['isEnabledFirstLast']) {};
    /**
   * Number of sibling pages shown on each side of the current page. @default 1
   */
  set countSibling(_: Components.AegovPagination['countSibling']) {};
    /**
   * Number of pages always visible at each boundary (start and end of the list). @default 1
   */
  set countBoundary(_: Components.AegovPagination['countBoundary']) {};
    /**
   * Display variant.
- 'default': shows page numbers, ellipsis, and prev/next buttons.
- 'compact': shows only prev/next buttons (and first/last when isEnabledFirstLast is true). @default 'default'
   */
  set variant(_: Components.AegovPagination['variant']) {};
    /**
   * Size variant of the pagination. @default 'base'
   */
  set size(_: Components.AegovPagination['size']) {};
    /**
   * Disables all pagination interaction. @default false
   */
  set isDisabled(_: Components.AegovPagination['isDisabled']) {};
    /**
   * Label for the Previous page button. Empty defaults to localized text via isRtl. @default ''
   */
  set labelPrev(_: Components.AegovPagination['labelPrev']) {};
    /**
   * Label for the Next page button. Empty defaults to localized text via isRtl. @default ''
   */
  set labelNext(_: Components.AegovPagination['labelNext']) {};
    /**
   * Label for the First page button (only shown when isEnabledFirstLast is true). Empty defaults to localized text via isRtl. @default ''
   */
  set labelFirst(_: Components.AegovPagination['labelFirst']) {};
    /**
   * Label for the Last page button (only shown when isEnabledFirstLast is true). Empty defaults to localized text via isRtl. @default ''
   */
  set labelLast(_: Components.AegovPagination['labelLast']) {};
  @Output() aegovPaginationPageChange = new EventEmitter<AegovPaginationCustomEvent<number>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovPaginationCustomEvent } from '@aegov/designsystem/components';

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
  inputs: ['align', { name: 'delayEnd', transform: nullableNumberAttribute }, { name: 'delayStart', transform: nullableNumberAttribute }, 'fieldId', { name: 'gap', transform: nullableNumberAttribute }, { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'offset', transform: nullableNumberAttribute }, 'position', 'trigger'],
  outputs: ['aegovPopoverOpen', 'aegovPopoverClose'],
})
export class AegovPopover {
  protected el: HTMLAegovPopoverElement;
    /**
   * Unique ID for the popover element. Auto-generated if not provided.
The trigger element receives a derived ID `${fieldId}-trigger` for ARIA linkage.
   */
  set fieldId(_: Components.AegovPopover['fieldId']) {};
    /**
   * Trigger type for showing the popover @default 'click'
   */
  set trigger(_: Components.AegovPopover['trigger']) {};
    /**
   * Position of the popover relative to the trigger element @default 'bottom'
   */
  set position(_: Components.AegovPopover['position']) {};
    /**
   * Alignment of the popover @default 'center'
   */
  set align(_: Components.AegovPopover['align']) {};
    /**
   * Gap between popover and trigger element (in pixels) @default 10
   */
  set gap(_: Components.AegovPopover['gap']) {};
    /**
   * Additional offset for popover positioning (in pixels) @default 0
   */
  set offset(_: Components.AegovPopover['offset']) {};
    /**
   * Whether the popover is disabled @default false
   */
  set isDisabled(_: Components.AegovPopover['isDisabled']) {};
    /**
   * Delay before showing popover on hover (in milliseconds) @default 200
   */
  set delayStart(_: Components.AegovPopover['delayStart']) {};
    /**
   * Delay before hiding popover on hover (in milliseconds) @default 0
   */
  set delayEnd(_: Components.AegovPopover['delayEnd']) {};
  @Output() aegovPopoverOpen = new EventEmitter<AegovPopoverCustomEvent<void>>();
  @Output() aegovPopoverClose = new EventEmitter<AegovPopoverCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovPopoverCustomEvent } from '@aegov/designsystem/components';

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
  inputs: ['counter', 'counterSuffix', 'description', 'extraClass', 'fieldId', 'height', 'label', { name: 'max', transform: nullableNumberAttribute }, { name: 'value', transform: nullableNumberAttribute }],
})
export class AegovProgress {
  protected el: HTMLAegovProgressElement;
    /**
   * Unique ID for the native progress element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovProgress['fieldId']) {};
    /**
   * Current value. When not set, shows indeterminate state.
   */
  set value(_: Components.AegovProgress['value']) {};
    /**
   * Maximum value. @default 100
   */
  set max(_: Components.AegovProgress['max']) {};
    /**
   * Height using Tailwind spacing scale (1, 1.5, 2, 2.5, 3, 3.5, 4, etc.).
Each unit = 0.25rem. Default "2" = h-2 = 0.5rem (8px). @default '2'
   */
  set height(_: Components.AegovProgress['height']) {};
    /**
   * Counter placement. Hidden when not set.
   */
  set counter(_: Components.AegovProgress['counter']) {};
    /**
   * Suffix appended directly to the counter value. No automatic spacing. @default ''
   */
  set counterSuffix(_: Components.AegovProgress['counterSuffix']) {};
    /**
   * Accessible label applied as aria-label on the native progress element. Provide this or a visible <label for="fieldId"> for screen reader support.
   */
  set label(_: Components.AegovProgress['label']) {};
    /**
   * Description text displayed below the progress bar.
   */
  set description(_: Components.AegovProgress['description']) {};
    /**
   * Additional CSS classes.
   */
  set extraClass(_: Components.AegovProgress['extraClass']) {};
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovProgress extends Components.AegovProgress {}


@ProxyCmp({
  defineCustomElementFn: defineAegovRadio,
  inputs: ['appearance', 'errorMessage', 'extraClass', 'fieldId', 'hint', 'isChecked', 'isDisabled', 'isInvalid', 'isRequired', 'label', 'name', 'size', 'value', 'variant'],
  methods: ['validate', 'setCustomValidity']
})
@Component({
  selector: 'aegov-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['appearance', 'errorMessage', 'extraClass', 'fieldId', 'hint', { name: 'isChecked', transform: nullableBooleanAttribute }, { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'isInvalid', transform: nullableBooleanAttribute }, { name: 'isRequired', transform: nullableBooleanAttribute }, 'label', 'name', 'size', 'value', 'variant'],
  outputs: ['aegovRadioChange', 'aegovValidate'],
})
export class AegovRadio {
  protected el: HTMLAegovRadioElement;
    /**
   * Unique ID for the native radio element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovRadio['fieldId']) {};
    /**
   * The name attribute for the radio. Reflected so ElementInternals reads it for form submission, and so radio-group can propagate it via JS property assignment.
   */
  set name(_: Components.AegovRadio['name']) {};
    /**
   * The value attribute for the radio.
   */
  set value(_: Components.AegovRadio['value']) {};
    /**
   * Whether the radio is checked. @default false
   */
  set isChecked(_: Components.AegovRadio['isChecked']) {};
    /**
   * The size of the radio. @default 'base'
   */
  set size(_: Components.AegovRadio['size']) {};
    /**
   * Colour family. Drives rest border, checked bg/border. Focus ring stays camel; error stays aered.
   */
  set variant(_: Components.AegovRadio['variant']) {};
    /**
   * Visual appearance set by a parent aegov-radio-group. Not meant to be set directly. @default 'default'
   */
  set appearance(_: Components.AegovRadio['appearance']) {};
    /**
   * Whether the radio is disabled. @default false
   */
  set isDisabled(_: Components.AegovRadio['isDisabled']) {};
    /**
   * Whether the radio is required. @default false
   */
  set isRequired(_: Components.AegovRadio['isRequired']) {};
    /**
   * Label text for the radio. When provided, generates an associated <label> element.
   */
  set label(_: Components.AegovRadio['label']) {};
    /**
   * Helper hint text displayed below the label. Renamed from `description` per §6.6.
Hidden when an error is shown.
   */
  set hint(_: Components.AegovRadio['hint']) {};
    /**
   * Visual + a11y invalid state. See §2.3. @default false
   */
  set isInvalid(_: Components.AegovRadio['isInvalid']) {};
    /**
   * Inline error message. Use `error` slot for rich markup. @default ''
   */
  set errorMessage(_: Components.AegovRadio['errorMessage']) {};
    /**
   * Additional CSS classes to apply.

This component renders in a real shadow root, which normally blocks the page's CSS
from reaching inside it. Margin/padding utilities (e.g. `mt-4`, `md:px-6`) are copied
in from the page's own stylesheets at runtime and work as expected; other utilities
(colour, border, typography, etc.) still have no effect — see #35.
   */
  set extraClass(_: Components.AegovRadio['extraClass']) {};
  @Output() aegovRadioChange = new EventEmitter<AegovRadioCustomEvent<{ checked: boolean; value?: string }>>();
  @Output() aegovValidate = new EventEmitter<AegovRadioCustomEvent<IAegovRadioAegovValidationDetail<boolean>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovRadioCustomEvent } from '@aegov/designsystem/components';
import type { AegovValidationDetail as IAegovRadioAegovValidationDetail } from '@aegov/designsystem/components';

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
  inputs: ['appearance', 'errorMessage', 'extraClass', 'hint', { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'isInvalid', transform: nullableBooleanAttribute }, { name: 'isRequired', transform: nullableBooleanAttribute }, 'label', { name: 'name', required: true }, 'orientation', 'size', 'variant'],
  outputs: ['aegovRadioGroupChange', 'aegovValidate'],
})
export class AegovRadioGroup {
  protected el: HTMLAegovRadioGroupElement;
    /**
   * Visual appearance for the group layout. @default 'default'
   */
  set appearance(_: Components.AegovRadioGroup['appearance']) {};
    /**
   * Stack direction for radio items. @default 'vertical'
   */
  set orientation(_: Components.AegovRadioGroup['orientation']) {};
    /**
   * Optional label rendered as a <legend> for accessibility.
   */
  set label(_: Components.AegovRadioGroup['label']) {};
    /**
   * Size of all radios in the group. Propagated to children. @default 'base'
   */
  set size(_: Components.AegovRadioGroup['size']) {};
    /**
   * Colour family. Cascades to child radios (only if child has no own variant). Focus ring stays camel; error stays aered regardless.
   */
  set variant(_: Components.AegovRadioGroup['variant']) {};
    /**
   * The name shared by all radios in the group. Ensures native single-select behavior.
   */
  set name(_: Components.AegovRadioGroup['name']) {};
    /**
   * Disables all radios within the group via native fieldset disabled. @default false
   */
  set isDisabled(_: Components.AegovRadioGroup['isDisabled']) {};
    /**
   * Group is required — at least one radio must be selected. Aggregate-level only. @default false
   */
  set isRequired(_: Components.AegovRadioGroup['isRequired']) {};
    /**
   * Visual + a11y invalid state. See §2.3. @default false
   */
  set isInvalid(_: Components.AegovRadioGroup['isInvalid']) {};
    /**
   * Inline error message. @default ''
   */
  set errorMessage(_: Components.AegovRadioGroup['errorMessage']) {};
    /**
   * Helper hint shown below the legend when not invalid. @default ''
   */
  set hint(_: Components.AegovRadioGroup['hint']) {};
    /**
   * Additional CSS classes to apply.

This component renders in a real shadow root, which normally blocks the page's CSS
from reaching inside it. Margin/padding utilities (e.g. `mt-4`, `md:px-6`) are copied
in from the page's own stylesheets at runtime and work as expected; other utilities
(colour, border, typography, etc.) still have no effect — see #35.
   */
  set extraClass(_: Components.AegovRadioGroup['extraClass']) {};
  @Output() aegovRadioGroupChange = new EventEmitter<AegovRadioGroupCustomEvent<{ value: string | undefined }>>();
  @Output() aegovValidate = new EventEmitter<AegovRadioGroupCustomEvent<IAegovRadioGroupAegovValidationDetail<string | undefined>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovRadioGroupCustomEvent } from '@aegov/designsystem/components';
import type { AegovValidationDetail as IAegovRadioGroupAegovValidationDetail } from '@aegov/designsystem/components';

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
  inputs: ['display', 'errorMessage', 'extraClass', 'fieldId', 'hint', { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'isInvalid', transform: nullableBooleanAttribute }, { name: 'isRequired', transform: nullableBooleanAttribute }, 'label', { name: 'max', transform: nullableNumberAttribute }, { name: 'min', transform: nullableNumberAttribute }, 'mode', 'name', 'orientation', 'size', { name: 'step', transform: nullableNumberAttribute }, { name: 'value', transform: nullableNumberAttribute }, { name: 'valueHigh', transform: nullableNumberAttribute }, { name: 'valueLow', transform: nullableNumberAttribute }, 'variant'],
  outputs: ['aegovRangeInput', 'aegovRangeChange', 'aegovValidate'],
})
export class AegovRange {
  protected el: HTMLAegovRangeElement;
    /**
   * Unique ID for the native range input element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovRange['fieldId']) {};
    /**
   * The name attribute for the range. Reflected so ElementInternals reads it for form submission.
   */
  set name(_: Components.AegovRange['name']) {};
    /**
   * Current value (single mode). Sanitized like a native `<input type="range">`:
clamped to `min`/`max` and rounded to the nearest `step`, on load and
whenever it, `min`, `max` or `step` changes. @default 50
   */
  set value(_: Components.AegovRange['value']) {};
    /**
   * Low thumb value (range mode). Sanitized like `value`. @default 25
   */
  set valueLow(_: Components.AegovRange['valueLow']) {};
    /**
   * High thumb value (range mode). Sanitized like `value`. @default 75
   */
  set valueHigh(_: Components.AegovRange['valueHigh']) {};
    /**
   * Minimum value. @default 0
   */
  set min(_: Components.AegovRange['min']) {};
    /**
   * Maximum value. @default 100
   */
  set max(_: Components.AegovRange['max']) {};
    /**
   * Step increment. @default 1
   */
  set step(_: Components.AegovRange['step']) {};
    /**
   * Size of the range track. Thumb remains constant. @default 'base'
   */
  set size(_: Components.AegovRange['size']) {};
    /**
   * Value display mode. @default 'none'
   */
  set display(_: Components.AegovRange['display']) {};
    /**
   * Layout orientation. @default 'horizontal'
   */
  set orientation(_: Components.AegovRange['orientation']) {};
    /**
   * Single thumb or dual thumb (range selection). @default 'single'
   */
  set mode(_: Components.AegovRange['mode']) {};
    /**
   * Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring stays camel; error stays aered regardless.
   */
  set variant(_: Components.AegovRange['variant']) {};
    /**
   * Whether the range is disabled. @default false
   */
  set isDisabled(_: Components.AegovRange['isDisabled']) {};
    /**
   * Whether the range is required. @default false
   */
  set isRequired(_: Components.AegovRange['isRequired']) {};
    /**
   * Optional label text.
   */
  set label(_: Components.AegovRange['label']) {};
    /**
   * Helper hint shown below the control. Hidden when an error is shown. @default ''
   */
  set hint(_: Components.AegovRange['hint']) {};
    /**
   * Visual + a11y invalid state. See §2.3. @default false
   */
  set isInvalid(_: Components.AegovRange['isInvalid']) {};
    /**
   * Inline error message. Use `error` slot for rich markup. @default ''
   */
  set errorMessage(_: Components.AegovRange['errorMessage']) {};
    /**
   * Additional CSS classes.

This component renders in a real shadow root, which normally blocks the page's CSS
from reaching inside it. Margin/padding utilities (e.g. `mt-4`, `md:px-6`) are copied
in from the page's own stylesheets at runtime and work as expected; other utilities
(colour, border, typography, etc.) still have no effect — see #35.
   */
  set extraClass(_: Components.AegovRange['extraClass']) {};
  @Output() aegovRangeInput = new EventEmitter<AegovRangeCustomEvent<{ value?: number; valueLow?: number; valueHigh?: number }>>();
  @Output() aegovRangeChange = new EventEmitter<AegovRangeCustomEvent<{ value?: number; valueLow?: number; valueHigh?: number }>>();
  @Output() aegovValidate = new EventEmitter<AegovRangeCustomEvent<IAegovRangeAegovValidationDetail<IAegovRangeAegovRangeValue>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovRangeCustomEvent } from '@aegov/designsystem/components';
import type { AegovValidationDetail as IAegovRangeAegovValidationDetail } from '@aegov/designsystem/components';
import type { AegovRangeValue as IAegovRangeAegovRangeValue } from '@aegov/designsystem/components';

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
  inputs: ['appearance', 'emptyMessage', 'errorMessage', 'extraClass', 'fieldId', 'hint', { name: 'isClearable', transform: nullableBooleanAttribute }, { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'isInvalid', transform: nullableBooleanAttribute }, { name: 'isMultiple', transform: nullableBooleanAttribute }, { name: 'isRequired', transform: nullableBooleanAttribute }, { name: 'isSearchable', transform: nullableBooleanAttribute }, 'name', 'placeholder', 'size', 'value', 'variant', { name: 'visibleItems', transform: nullableNumberAttribute }],
  outputs: ['aegovSelectChange', 'aegovSelectOpen', 'aegovSelectClose', 'aegovValidate'],
})
export class AegovSelect {
  protected el: HTMLAegovSelectElement;
    /**
   * Unique ID for the select element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovSelect['fieldId']) {};
    /**
   * The visual appearance. 'default' renders a native select; 'listbox' renders a custom dropdown. @default 'default'
   */
  set appearance(_: Components.AegovSelect['appearance']) {};
    /**
   * The size of the select. Matches aegov-input height. @default 'base'
   */
  set size(_: Components.AegovSelect['size']) {};
    /**
   * Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring stays camel; error stays aered regardless.
   */
  set variant(_: Components.AegovSelect['variant']) {};
    /**
   * Whether multiple selection is enabled. Forces listbox behaviour. @default false
   */
  set isMultiple(_: Components.AegovSelect['isMultiple']) {};
    /**
   * Whether the select is disabled. @default false
   */
  set isDisabled(_: Components.AegovSelect['isDisabled']) {};
    /**
   * Placeholder text shown when nothing is selected.
   */
  set placeholder(_: Components.AegovSelect['placeholder']) {};
    /**
   * The current selected value. For multiple, a comma-separated string. @default ''
   */
  set value(_: Components.AegovSelect['value']) {};
    /**
   * The name attribute for form submission.
   */
  set name(_: Components.AegovSelect['name']) {};
    /**
   * Whether the select is required. @default false
   */
  set isRequired(_: Components.AegovSelect['isRequired']) {};
    /**
   * Show a search input in the listbox dropdown to filter options. Only works with listbox appearance. @default false
   */
  set isSearchable(_: Components.AegovSelect['isSearchable']) {};
    /**
   * Message shown when search yields no results. Empty string defaults to localized text via isRtl. @default ''
   */
  set emptyMessage(_: Components.AegovSelect['emptyMessage']) {};
    /**
   * Max visible items in the dropdown before scrolling. @default 6
   */
  set visibleItems(_: Components.AegovSelect['visibleItems']) {};
    /**
   * Show a clear button to reset selection. @default false
   */
  set isClearable(_: Components.AegovSelect['isClearable']) {};
    /**
   * Visual + a11y invalid state. See §2.3. @default false
   */
  set isInvalid(_: Components.AegovSelect['isInvalid']) {};
    /**
   * Inline error message. Use `error` slot for rich markup. @default ''
   */
  set errorMessage(_: Components.AegovSelect['errorMessage']) {};
    /**
   * Helper hint shown below the control. Hidden when an error is shown. @default ''
   */
  set hint(_: Components.AegovSelect['hint']) {};
    /**
   * Additional CSS classes to apply.

This component renders in a real shadow root, which normally blocks the page's CSS
from reaching inside it. Margin/padding utilities (e.g. `mt-4`, `md:px-6`) are copied
in from the page's own stylesheets at runtime and work as expected; other utilities
(colour, border, typography, etc.) still have no effect — see #35.
   */
  set extraClass(_: Components.AegovSelect['extraClass']) {};
  @Output() aegovSelectChange = new EventEmitter<AegovSelectCustomEvent<IAegovSelectSelectChangeDetail>>();
  @Output() aegovSelectOpen = new EventEmitter<AegovSelectCustomEvent<void>>();
  @Output() aegovSelectClose = new EventEmitter<AegovSelectCustomEvent<void>>();
  @Output() aegovValidate = new EventEmitter<AegovSelectCustomEvent<IAegovSelectAegovValidationDetail<IAegovSelectAegovSelectValue>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovSelectCustomEvent } from '@aegov/designsystem/components';
import type { SelectChangeDetail as IAegovSelectSelectChangeDetail } from '@aegov/designsystem/components';
import type { AegovValidationDetail as IAegovSelectAegovValidationDetail } from '@aegov/designsystem/components';
import type { AegovSelectValue as IAegovSelectAegovSelectValue } from '@aegov/designsystem/components';

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
  inputs: [{ name: 'isDisabled', transform: nullableBooleanAttribute }, 'value'],
})
export class AegovSelectOption {
  protected el: HTMLAegovSelectOptionElement;
    /**
   * The value of this option. @default ''
   */
  set value(_: Components.AegovSelectOption['value']) {};
    /**
   * Whether this option is disabled. @default false
   */
  set isDisabled(_: Components.AegovSelectOption['isDisabled']) {};
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
    /**
   * The label for this option group. @default ''
   */
  set label(_: Components.AegovSelectOptionGroup['label']) {};
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
  inputs: ['appearance', 'extraClass', { name: 'gap', transform: nullableNumberAttribute }, { name: 'isDecorative', transform: nullableBooleanAttribute }, 'orientation', 'text', 'variant'],
})
export class AegovSeparator {
  protected el: HTMLAegovSeparatorElement;
    /**
   * Orientation of the separator @default 'horizontal'
   */
  set orientation(_: Components.AegovSeparator['orientation']) {};
    /**
   * Appearance: 'solid' (full-strength line) or 'light' (subtle low-contrast line). Colour resolves from `variant`. @default 'solid'
   */
  set appearance(_: Components.AegovSeparator['appearance']) {};
    /**
   * Variant: colour family applied to line + text label. 'primary' (default), 'secondary', 'neutral-max' (aeblack-800 family), or 'neutral-min' (aeblack-100 family). @default 'primary'
   */
  set variant(_: Components.AegovSeparator['variant']) {};
    /**
   * Optional text label displayed at the center of the separator
   */
  set text(_: Components.AegovSeparator['text']) {};
    /**
   * Numeric spacing applied on either side of the separator line, in Tailwind
spacing units (1 unit = 0.25rem = 4px). Horizontal orientation → padding
is applied on the block axis (top + bottom); vertical → inline axis
(start + end). Accepts any non-negative number. `0` (default) keeps no
padding.

Example: `gap="4"` produces `1rem` (16px) padding-block on a horizontal
separator. @default 0
   */
  set gap(_: Components.AegovSeparator['gap']) {};
    /**
   * Whether the separator is purely decorative (no semantic meaning) @default true
   */
  set isDecorative(_: Components.AegovSeparator['isDecorative']) {};
    /**
   * Additional CSS classes merged onto the inner separator element.
   */
  set extraClass(_: Components.AegovSeparator['extraClass']) {};
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
  inputs: ['activeTabId', { name: 'isDisabled', transform: nullableBooleanAttribute }, 'orientation', 'size', { name: 'tabId', required: true }, 'variant'],
  outputs: ['aegovTabSelect'],
})
export class AegovTab {
  protected el: HTMLAegovTabElement;
    /**
   * Unique identifier that must match the corresponding aegov-tab-panel's tab-id.
   */
  set tabId(_: Components.AegovTab['tabId']) {};
    /**
   * Disables this tab and its associated panel. @default false
   */
  set isDisabled(_: Components.AegovTab['isDisabled']) {};
    /**
   * The currently active tab id. Set automatically by the parent aegov-tabs. @default ''
   */
  set activeTabId(_: Components.AegovTab['activeTabId']) {};
    /**
   * Visual variant of the tabs. Set automatically by the parent aegov-tabs. @default 'simple'
   */
  set variant(_: Components.AegovTab['variant']) {};
    /**
   * Size of the tab. Set automatically by the parent aegov-tabs. @default 'base'
   */
  set size(_: Components.AegovTab['size']) {};
    /**
   * Orientation of the tabs. Set automatically by the parent aegov-tabs. @default 'horizontal'
   */
  set orientation(_: Components.AegovTab['orientation']) {};
  @Output() aegovTabSelect = new EventEmitter<AegovTabCustomEvent<string>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovTabCustomEvent } from '@aegov/designsystem/components';

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
  inputs: [{ name: 'active', transform: nullableBooleanAttribute }, 'extraClass', { name: 'tabId', required: true }],
})
export class AegovTabPanel {
  protected el: HTMLAegovTabPanelElement;
    /**
   * Unique identifier that must match the corresponding aegov-tab's tab-id.
   */
  set tabId(_: Components.AegovTabPanel['tabId']) {};
    /**
   * Whether this panel is currently active. Set automatically by the parent aegov-tabs. @default false
   */
  set active(_: Components.AegovTabPanel['active']) {};
    /**
   * Additional CSS classes merged onto the inner panel element.
   */
  set extraClass(_: Components.AegovTabPanel['extraClass']) {};
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
  inputs: ['defaultOpen', 'fieldId', { name: 'isScrollable', transform: nullableBooleanAttribute }, { name: 'isStretchable', transform: nullableBooleanAttribute }, 'labelTablist', 'orientation', 'size', 'variant'],
  outputs: ['aegovTabChange'],
})
export class AegovTabs {
  protected el: HTMLAegovTabsElement;
    /**
   * Unique ID for the tabs container. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovTabs['fieldId']) {};
    /**
   * Visual style variant of the tabs.
- `simple`: Underline style (default)
- `segmented`: Button-group style, ideal for toggling views
- `pill`: Pill-shaped individual tabs @default 'simple'
   */
  set variant(_: Components.AegovTabs['variant']) {};
    /**
   * The tab-id of the tab that should be active on initial render.
If not provided, the first non-disabled tab is activated. @default ''
   */
  set defaultOpen(_: Components.AegovTabs['defaultOpen']) {};
    /**
   * Size of the tabs. @default 'base'
   */
  set size(_: Components.AegovTabs['size']) {};
    /**
   * Enables horizontal scrolling when tabs overflow the container.
A faded gradient edge is shown to indicate scrollable content. @default false
   */
  set isScrollable(_: Components.AegovTabs['isScrollable']) {};
    /**
   * Distributes tabs evenly to fill the full width of the container.
Each tab grows equally to occupy available space. @default false
   */
  set isStretchable(_: Components.AegovTabs['isStretchable']) {};
    /**
   * Layout orientation of the tabs.
- `horizontal`: Tabs appear above the panels (default)
- `vertical`: Tabs appear to the side of the panels @default 'horizontal'
   */
  set orientation(_: Components.AegovTabs['orientation']) {};
    /**
   * Accessible label for the tablist element.
Provides context for screen readers about what the tabs control.
Defaults to a bilingual auto-detected string ("Tabs" / "علامات التبويب"). @default ''
   */
  set labelTablist(_: Components.AegovTabs['labelTablist']) {};
  @Output() aegovTabChange = new EventEmitter<AegovTabsCustomEvent<string>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovTabsCustomEvent } from '@aegov/designsystem/components';

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
    /**
   * The size of the text. @default 'base'
   */
  set size(_: Components.AegovText['size']) {};
    /**
   * Additional CSS classes to apply to the text.
   */
  set extraClass(_: Components.AegovText['extraClass']) {};
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
  inputs: ['errorMessage', 'extraClass', 'fieldId', 'hint', { name: 'isCopyable', transform: nullableBooleanAttribute }, { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'isInvalid', transform: nullableBooleanAttribute }, { name: 'isReadonly', transform: nullableBooleanAttribute }, { name: 'isRequired', transform: nullableBooleanAttribute }, { name: 'maxlength', transform: nullableNumberAttribute }, 'name', 'placeholder', 'resize', 'size', 'value', 'variant'],
  outputs: ['aegovTextareaChange', 'aegovTextareaValue', 'aegovTextareaFocus', 'aegovTextareaBlur', 'aegovValidate'],
})
export class AegovTextarea {
  protected el: HTMLAegovTextareaElement;
    /**
   * Unique ID for the native textarea element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovTextarea['fieldId']) {};
    /**
   * The size of the textarea (affects font size only). @default 'base'
   */
  set size(_: Components.AegovTextarea['size']) {};
    /**
   * Colour family. Drives idle ring, value text, and accent hover.
   */
  set variant(_: Components.AegovTextarea['variant']) {};
    /**
   * Whether the textarea is disabled. @default false
   */
  set isDisabled(_: Components.AegovTextarea['isDisabled']) {};
    /**
   * Whether the textarea is readonly. @default false
   */
  set isReadonly(_: Components.AegovTextarea['isReadonly']) {};
    /**
   * Placeholder text for the textarea.
   */
  set placeholder(_: Components.AegovTextarea['placeholder']) {};
    /**
   * The current value of the textarea. @default ''
   */
  set value(_: Components.AegovTextarea['value']) {};
    /**
   * The name attribute for the textarea. Reflected so ElementInternals can read it for form submission.
   */
  set name(_: Components.AegovTextarea['name']) {};
    /**
   * Whether the textarea is required. @default false
   */
  set isRequired(_: Components.AegovTextarea['isRequired']) {};
    /**
   * Resize behaviour of the textarea. @default 'vertical'
   */
  set resize(_: Components.AegovTextarea['resize']) {};
    /**
   * Maximum number of characters. When set, a character counter is displayed.
   */
  set maxlength(_: Components.AegovTextarea['maxlength']) {};
    /**
   * Show a copy button to copy the textarea value to clipboard. Only applies when readonly. @default false
   */
  set isCopyable(_: Components.AegovTextarea['isCopyable']) {};
    /**
   * Visual + a11y invalid state. Toggles `aria-invalid` and `.is-invalid` host class. See validation-engine-addon.md §2.3. @default false
   */
  set isInvalid(_: Components.AegovTextarea['isInvalid']) {};
    /**
   * Inline error message rendered below the control when `isInvalid` is true. Use `error` slot for richer markup. @default ''
   */
  set errorMessage(_: Components.AegovTextarea['errorMessage']) {};
    /**
   * Helper hint rendered below the control. Hidden when an error is shown. Use `hint` slot for richer markup. @default ''
   */
  set hint(_: Components.AegovTextarea['hint']) {};
    /**
   * Additional CSS classes to apply.

This component renders in a real shadow root, which normally blocks the page's CSS
from reaching inside it. Margin/padding utilities (e.g. `mt-4`, `md:px-6`) are copied
in from the page's own stylesheets at runtime and work as expected; other utilities
(colour, border, typography, etc.) still have no effect — see #35.
   */
  set extraClass(_: Components.AegovTextarea['extraClass']) {};
  @Output() aegovTextareaChange = new EventEmitter<AegovTextareaCustomEvent<{ value: string; event: globalThis.Event }>>();
  @Output() aegovTextareaValue = new EventEmitter<AegovTextareaCustomEvent<{ value: string; event: globalThis.Event }>>();
  @Output() aegovTextareaFocus = new EventEmitter<AegovTextareaCustomEvent<FocusEvent>>();
  @Output() aegovTextareaBlur = new EventEmitter<AegovTextareaCustomEvent<FocusEvent>>();
  @Output() aegovValidate = new EventEmitter<AegovTextareaCustomEvent<IAegovTextareaAegovValidationDetail<string>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovTextareaCustomEvent } from '@aegov/designsystem/components';
import type { AegovValidationDetail as IAegovTextareaAegovValidationDetail } from '@aegov/designsystem/components';

export declare interface AegovTextarea extends Components.AegovTextarea {
  /**
   * Emitted when the textarea value changes (on blur).
   */
  aegovTextareaChange: EventEmitter<AegovTextareaCustomEvent<{ value: string; event: globalThis.Event }>>;
  /**
   * Emitted on every keystroke.
   */
  aegovTextareaValue: EventEmitter<AegovTextareaCustomEvent<{ value: string; event: globalThis.Event }>>;
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
    /**
   * Unique ID for the timeline nav element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovTimeline['fieldId']) {};
    /**
   * Visual variant: default (numbered circles) or compact (dots). @default 'default'
   */
  set variant(_: Components.AegovTimeline['variant']) {};
    /**
   * Size of step indicators. @default 'base'
   */
  set size(_: Components.AegovTimeline['size']) {};
    /**
   * Layout orientation. @default 'horizontal'
   */
  set orientation(_: Components.AegovTimeline['orientation']) {};
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
    /**
   * Step status. @default 'pending'
   */
  set status(_: Components.AegovTimelineStep['status']) {};
    /**
   * Optional description shown below the label.
   */
  set description(_: Components.AegovTimelineStep['description']) {};
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
    /**
   * Unique ID for the title element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovTitle['fieldId']) {};
    /**
   * The size of the title text. @default 'base'
   */
  set size(_: Components.AegovTitle['size']) {};
    /**
   * The semantic wrapper tag for the title. When set, renders the title
inside the specified heading tag (`h2`–`h6`) or a `p`. When omitted,
the title renders as a `<p>` (default).
   */
  set headingType(_: Components.AegovTitle['headingType']) {};
    /**
   * Additional CSS classes to apply to the title.
   */
  set extraClass(_: Components.AegovTitle['extraClass']) {};
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
  inputs: ['appearance', { name: 'duration', transform: nullableNumberAttribute }, { name: 'isDismissible', transform: nullableBooleanAttribute }, { name: 'isProgressEnabled', transform: nullableBooleanAttribute }, 'mode', 'position', 'variant'],
  outputs: ['aegovToastOpen', 'aegovToastClose', 'aegovToastDismiss'],
})
export class AegovToast {
  protected el: HTMLAegovToastElement;
    /**
   * Semantic color variant of the toast. @default 'default'
   */
  set variant(_: Components.AegovToast['variant']) {};
    /**
   * Appearance style: soft (light bg) or solid (dark bg). @default 'soft'
   */
  set appearance(_: Components.AegovToast['appearance']) {};
    /**
   * Screen position where the toast appears. @default 'top-right'
   */
  set position(_: Components.AegovToast['position']) {};
    /**
   * Auto-dismiss duration in milliseconds. 0 = no auto-dismiss. @default 5000
   */
  set duration(_: Components.AegovToast['duration']) {};
    /**
   * Whether the toast shows a close button. @default true
   */
  set isDismissible(_: Components.AegovToast['isDismissible']) {};
    /**
   * Display mode for multiple toasts at the same position.
'stack' = all toasts visible with gap between them (default).
'rack' = toasts collapse into a deck; hover to expand. @default 'stack'
   */
  set mode(_: Components.AegovToast['mode']) {};
    /**
   * Whether to show a countdown progress bar. @default false
   */
  set isProgressEnabled(_: Components.AegovToast['isProgressEnabled']) {};
  @Output() aegovToastOpen = new EventEmitter<AegovToastCustomEvent<void>>();
  @Output() aegovToastClose = new EventEmitter<AegovToastCustomEvent<void>>();
  @Output() aegovToastDismiss = new EventEmitter<AegovToastCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovToastCustomEvent } from '@aegov/designsystem/components';

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
  inputs: ['errorMessage', 'fieldId', 'hint', { name: 'isChecked', transform: nullableBooleanAttribute }, { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'isInvalid', transform: nullableBooleanAttribute }, { name: 'isRequired', transform: nullableBooleanAttribute }, 'label', 'name', 'size', 'value', 'variant'],
  outputs: ['aegovToggleChange', 'aegovValidate'],
})
export class AegovToggle {
  protected el: HTMLAegovToggleElement;
    /**
   * Unique ID for the native checkbox element. Auto-generated if not provided.
   */
  set fieldId(_: Components.AegovToggle['fieldId']) {};
    /**
   * The name attribute for the toggle. Reflected so ElementInternals can read it for form submission.
   */
  set name(_: Components.AegovToggle['name']) {};
    /**
   * The value attribute for the toggle.
   */
  set value(_: Components.AegovToggle['value']) {};
    /**
   * Whether the toggle is checked/on. @default false
   */
  set isChecked(_: Components.AegovToggle['isChecked']) {};
    /**
   * The size of the toggle. @default 'base'
   */
  set size(_: Components.AegovToggle['size']) {};
    /**
   * Colour family. Drives ON track bg. OFF track stays aeblack-200. Focus ring stays camel; error stays aered.
   */
  set variant(_: Components.AegovToggle['variant']) {};
    /**
   * Whether the toggle is disabled. @default false
   */
  set isDisabled(_: Components.AegovToggle['isDisabled']) {};
    /**
   * Whether the toggle is required. @default false
   */
  set isRequired(_: Components.AegovToggle['isRequired']) {};
    /**
   * Label text for the toggle. Rendered at the end (inline-end).
   */
  set label(_: Components.AegovToggle['label']) {};
    /**
   * Helper hint text displayed below the label. Renamed from `description` per §6.6.
Hidden when an error is shown.
   */
  set hint(_: Components.AegovToggle['hint']) {};
    /**
   * Visual + a11y invalid state. See §2.3. @default false
   */
  set isInvalid(_: Components.AegovToggle['isInvalid']) {};
    /**
   * Inline error message. Use `error` slot for rich markup. @default ''
   */
  set errorMessage(_: Components.AegovToggle['errorMessage']) {};
  @Output() aegovToggleChange = new EventEmitter<AegovToggleCustomEvent<{ checked: boolean; value?: string }>>();
  @Output() aegovValidate = new EventEmitter<AegovToggleCustomEvent<IAegovToggleAegovValidationDetail<boolean>>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { AegovToggleCustomEvent } from '@aegov/designsystem/components';
import type { AegovValidationDetail as IAegovToggleAegovValidationDetail } from '@aegov/designsystem/components';

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
  inputs: ['align', 'content', { name: 'delayEnd', transform: nullableNumberAttribute }, { name: 'delayStart', transform: nullableNumberAttribute }, { name: 'gap', transform: nullableNumberAttribute }, { name: 'isDisabled', transform: nullableBooleanAttribute }, { name: 'offset', transform: nullableNumberAttribute }, 'position', 'trigger'],
})
export class AegovTooltip {
  protected el: HTMLAegovTooltipElement;
    /**
   * Tooltip content text (alternative to using slot)
   */
  set content(_: Components.AegovTooltip['content']) {};
    /**
   * Position of the tooltip relative to the trigger element @default 'top'
   */
  set position(_: Components.AegovTooltip['position']) {};
    /**
   * Alignment of the tooltip @default 'center'
   */
  set align(_: Components.AegovTooltip['align']) {};
    /**
   * Trigger type for showing the tooltip @default 'hover'
   */
  set trigger(_: Components.AegovTooltip['trigger']) {};
    /**
   * Gap between tooltip and trigger element (in pixels) @default 8
   */
  set gap(_: Components.AegovTooltip['gap']) {};
    /**
   * Additional offset for tooltip positioning (in pixels) @default 0
   */
  set offset(_: Components.AegovTooltip['offset']) {};
    /**
   * Whether the tooltip is disabled @default false
   */
  set isDisabled(_: Components.AegovTooltip['isDisabled']) {};
    /**
   * Delay before showing tooltip (in milliseconds) @default 200
   */
  set delayStart(_: Components.AegovTooltip['delayStart']) {};
    /**
   * Delay before hiding tooltip (in milliseconds) @default 0
   */
  set delayEnd(_: Components.AegovTooltip['delayEnd']) {};
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface AegovTooltip extends Components.AegovTooltip {}


