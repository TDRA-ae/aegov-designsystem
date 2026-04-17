import { Component, Prop, Watch, Event, EventEmitter, Element, h, Host } from '@stencil/core';
import { LINK_TARGETS } from '../../utils/types';
import type { LinkTarget } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';

const TAG = 'aegov-link';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * @slot default - The link text content
 */
@Component({
  tag: 'aegov-link',
  styleUrl: 'aegov-link.css',
  scoped: false,
})
export class AegovLink {
  @Element() el: HTMLElement;

  /**
   * The URL that the link points to.
   * @required
   */
  @Prop() href!: string;

  /**
   * Target attribute for the link (_blank, _self, _parent, _top).
   */
  @Prop() target?: LinkTarget;

  componentWillLoad() {
    if (this.target !== undefined) {
      warnIfInvalidEnumProp(this.target, LINK_TARGETS, '_self', ctx('target'));
    }
  }

  @Watch('target')
  onTargetChange(v: unknown) {
    if (v === undefined) return;
    warnIfInvalidEnumProp(v, LINK_TARGETS, '_self', ctx('target'));
  }

  /**
   * Rel attribute for the link (e.g., "noopener noreferrer" for external links).
   */
  @Prop() rel?: string;

  /**
   * Additional CSS classes to apply to the link.
   */
  @Prop() class?: string;

  /**
   * Emitted when the link is clicked.
   * The event detail contains the href and can be used to implement custom navigation.
   */
  @Event() aegovLinkClick: EventEmitter<{ href: string; event: MouseEvent }>;

  /**
   * Handle link click
   */
  private handleClick = (event: MouseEvent) => {
    // Emit custom event
    const customEvent = this.aegovLinkClick.emit({
      href: this.href,
      event
    });

    // If preventDefault was called on the custom event, stop default navigation
    if (customEvent.defaultPrevented) {
      event.preventDefault();
    }

    // If there are listeners on the custom event, they can call event.preventDefault()
    // to stop navigation and handle it themselves
  };

  private static readonly PASS_THROUGH_ATTRS = new Set(['title', 'id']);

  /**
   * Get the CSS classes based on component props
   */
  private getLinkClasses(): string {
    const classes: string[] = [
      'no-underline',
      'ease-in-out',
      'transition-colors',
      'duration-200',
      'text-primary-600'
    ];

    // Merge with custom classes if provided
    if (this.class) {
      classes.push(this.class);
    }

    return classes.join(' ');
  }

  render() {
    const passThroughAttrs = getPassThroughAttributes(this.el, AegovLink.PASS_THROUGH_ATTRS);

    return (
      <Host>
        <a
          href={this.href}
          target={this.target}
          rel={this.rel || (this.target === '_blank' ? 'noopener noreferrer' : undefined)}
          class={this.getLinkClasses()}
          onClick={this.handleClick}
          {...passThroughAttrs}
        >
          <slot />
        </a>
      </Host>
    );
  }
}
