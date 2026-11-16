import { Component, Element, Prop, Watch, h, Host, forceUpdate } from '@stencil/core';
import { BLOCKQUOTE_APPEARANCES } from '../../utils/types';
import type { BlockquoteAppearance } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { getPassThroughAttributes } from '../../utils/attributes';
import { HostAria } from '../../utils/host-aria';
import { adoptExtraClassStylesIntoShadowRoot } from '../../utils/shadow-styles';

const TAG = 'aegov-blockquote';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * @slot - Blockquote content
 * @part blockquote - The native blockquote element
 */
@Component({
  tag: 'aegov-blockquote',
  styleUrl: 'aegov-blockquote.css',
  shadow: true,
})

export class AegovBlockquote {
    @Element() el: HTMLElement;

    /**
     * The blockquote appearance style
     * @default 'primary'
     */
    @Prop() appearance: BlockquoteAppearance = 'primary';

    /**
     * The citation source
     */
    @Prop() cite?: string;

    /**
     * The author source
     */
    @Prop() author?: string;

    /**
     * The author's title/position
     */
    @Prop() authorTitle?: string;

    /**
     * Additional CSS classes merged onto the inner blockquote element.
     *
     * This component renders in a real shadow root, which normally blocks the page's CSS
     * from reaching inside it. Margin/padding utilities (e.g. `mt-4`, `md:px-6`) are copied
     * in from the page's own stylesheets at runtime and work as expected; other utilities
     * (colour, border, typography, etc.) still have no effect — see #35.
     */
    @Prop() extraClass?: string;

    componentWillLoad() {
        warnIfInvalidEnumProp(this.appearance, BLOCKQUOTE_APPEARANCES, 'primary', ctx('appearance'));
    }

    componentDidLoad() {
        adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
    }

    @Watch('appearance')
    onAppearanceChange(v: unknown) { warnIfInvalidEnumProp(v, BLOCKQUOTE_APPEARANCES, 'primary', ctx('appearance')); }

    @Watch('extraClass')
    onExtraClassChange() {
        adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
    }

    /**
     * Get the CSS classes based on component props
     */
    private getBlockquoteClasses(): string {
        const classes: string[] = [
            'aegov-blockquote',
            'relative', 
            'text-base', 
            'font-medium'
        ];

        if (this.appearance === 'colored' || this.appearance === 'coloured') {
            classes.push(
                'blockquote--colored',
                'border-s-[10px]',
                'bg-primary-50',
                'border-primary-400',
                'text-primary-700',
                'py-4',
                'px-6'
            );
        } else {
            classes.push(
                'py-4',
                'ps-12',
                'md:ps-14',
                'pe-6',
                'text-aeblack-800'
            );
        }

        if (this.extraClass) {
            classes.push(this.extraClass);
        }

        return classes.join(' ');
    }

    /**
     * Get the CSS classes based on component props for the Author and title
     */
    private getBlockquoteFooterClasses(): string {
        const classes: string[] = [
            'text-sm'
        ];
        if (this.appearance === 'colored' || this.appearance === 'coloured') {
            classes.push(
                'text-primary-950'
            );
        } else {
            classes.push(
                'text-aeblack-600'
            );
        }
        return classes.join(' ');
    }

    /**
     * Host aria-labelledby / aria-describedby can't resolve inside the shadow
     * root; they reach the blockquote as name and description text (GitHub #57).
     */
    private hostAria?: HostAria;

    connectedCallback() {
        this.hostAria ??= new HostAria(this.el, { fieldId: () => undefined, onChange: () => forceUpdate(this) });
        this.hostAria.connect();
    }

    disconnectedCallback() {
        this.hostAria?.disconnect();
    }

    render() {
        const rawAttributes = getPassThroughAttributes(this.el);
        const passThroughAttributes = this.hostAria ? this.hostAria.bridge(rawAttributes) : rawAttributes;
        return (
            <Host>
                <blockquote part="blockquote" {...passThroughAttributes} aria-describedby={this.hostAria?.descriptionId()} class={this.getBlockquoteClasses()} cite={this.cite}>
                    {this.appearance !== 'colored' && this.appearance !== 'coloured' && (
                    <svg aria-hidden="true" class="absolute start-0 top-0 size-10 md:size-12 rtl:-scale-x-100" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.25 10.5H40.5C41.2956 10.5 42.0587 10.8161 42.6213 11.3787C43.1839 11.9413 43.5 12.7044 43.5 13.5V25.5C43.5 26.2956 43.1839 27.0587 42.6213 27.6213C42.0587 28.1839 41.2956 28.5 40.5 28.5H29.25V30C29.25 31.5913 29.8821 33.1174 31.0074 34.2426C32.1326 35.3679 33.6587 36 35.25 36C35.6478 36 36.0294 36.158 36.3107 36.4393C36.592 36.7206 36.75 37.1022 36.75 37.5C36.75 37.8978 36.592 38.2794 36.3107 38.5607C36.0294 38.842 35.6478 39 35.25 39C32.8638 38.9975 30.5761 38.0485 28.8888 36.3612C27.2015 34.6739 26.2525 32.3862 26.25 30V13.5C26.25 12.7044 26.5661 11.9413 27.1287 11.3787C27.6913 10.8161 28.4544 10.5 29.25 10.5ZM29.25 25.5H40.5V13.5H29.25V25.5ZM7.5 10.5H18.75C19.5456 10.5 20.3087 10.8161 20.8713 11.3787C21.4339 11.9413 21.75 12.7044 21.75 13.5V25.5C21.75 26.2956 21.4339 27.0587 20.8713 27.6213C20.3087 28.1839 19.5456 28.5 18.75 28.5H7.5V30C7.5 31.5913 8.13214 33.1174 9.25736 34.2426C10.3826 35.3679 11.9087 36 13.5 36C13.8978 36 14.2794 36.158 14.5607 36.4393C14.842 36.7206 15 37.1022 15 37.5C15 37.8978 14.842 38.2794 14.5607 38.5607C14.2794 38.842 13.8978 39 13.5 39C11.1138 38.9975 8.82607 38.0485 7.13878 36.3612C5.45149 34.6739 4.50248 32.3862 4.5 30V13.5C4.5 12.7044 4.81607 11.9413 5.37868 11.3787C5.94129 10.8161 6.70435 10.5 7.5 10.5ZM7.5 25.5H18.75V13.5H7.5V25.5Z" fill="currentColor"></path>
                    </svg>
                    )}
                    <slot />
                    {(this.author || this.authorTitle) && (
                    <footer class="blockquote__footer mt-10">
                        {this.author && <cite class={`blockquote--author block mb-1 font-medium not-italic ${this.getBlockquoteFooterClasses()}`}>{this.author}</cite>}
                        {this.authorTitle && <div class={`blockquote--title font-normal ${this.getBlockquoteFooterClasses()}`}>{this.authorTitle}</div>}
                    </footer>
                    )}
                </blockquote>
                {this.hostAria?.renderDescription()}
            </Host>
        );
    }
}