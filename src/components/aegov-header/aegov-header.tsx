import { Component, Element, Prop, Watch, h } from '@stencil/core';
import { HEADER_VARIANTS } from '../../utils/types';
import type { HeaderVariant } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';

const TAG = 'aegov-header';
const ctx = (prop: string) => ({ component: TAG, prop });

@Component({
  tag: 'aegov-header',
  styleUrl: 'aegov-header.css',
  scoped: false,
  shadow: true
})
export class AegovHeader {
  /**
   * The variant of the header. Determines the layout and style.
   * - "ministry": Header for ministry-level entities
   * - "authority": Header for authority-level entities
   */
  @Element() el: HTMLElement;

  @Prop() variant: HeaderVariant = 'ministry';

  /** The name of the government entity. Required. Forwarded to the embedded aegov-header-banner. */
  @Prop() entityName: string;

  /** The domain/URL of the government entity. Required. Forwarded to the embedded aegov-header-banner. */
  @Prop() entityDomain: string;

  /** Forwarded to the embedded aegov-header-banner. The CSS selector or ID of the main content container to skip to (e.g. "#main-content"). When provided, the banner injects a "Skip to content" link at the top of the document body. */
  @Prop() skipContentContainer: string;

  componentWillLoad() {
    warnIfInvalidEnumProp(this.variant, HEADER_VARIANTS, 'ministry', ctx('variant'));
  }

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, HEADER_VARIANTS, 'ministry', ctx('variant')); }

  render() {
    const variant: HeaderVariant = (HEADER_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'ministry';

    return (
      <header class={`aegov-header header--${variant}`}>
        <aegov-header-banner
          entity-name={this.entityName}
          entity-domain={this.entityDomain}
          skip-content-container={this.skipContentContainer}
        />
        <div class="header__head">
          <div class="aegov-container flex items-center justify-between">
            <div class="header__logo">
              <a href={this.entityDomain}><slot name="logo" /></a>
            </div>
            <div class="header__search hidden md:inline">
              <slot name="search" />
            </div>
          </div>
        </div>
      </header>
    );
  }
}
