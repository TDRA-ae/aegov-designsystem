import { Component, Element, Prop, Watch, State, Event, EventEmitter, h, Host } from '@stencil/core';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { BADGE_APPEARANCES, BADGE_COLORS, BADGE_SIZES } from '../../utils/types';
import type { BadgeSize, BadgeAppearance, BadgeColor } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { generateId } from '../../utils/id-generator';
import { getPassThroughAttributes } from '../../utils/attributes';
import { isRtl } from '../../utils/rtl';

const STRINGS = {
  en: { dismiss: 'Badge dismiss button' },
  ar: { dismiss: 'زر إغلاق الشارة' },
};

const TAG = 'aegov-badge';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * @slot default - The main content of the badge
 */
@Component({
  tag: 'aegov-badge',
  styleUrl: 'aegov-badge.css',
  scoped: false,
})
export class AegovBadge {
    @Element() el!: HTMLElement;

    /**
     * Unique ID for the badge element. Auto-generated if not provided.
     */
    @Prop({ mutable: true, reflect: true }) fieldId?: string;

    /**
     * The appearance style of the badge.
     * @default 'soft'
     */
    @Prop() appearance: BadgeAppearance = 'soft';

    /**
     * The color variant of the badge.
     * @default 'default'
     */
    @Prop() color: BadgeColor = 'default';

    /**
     * Whether the badge can be dismissed/closed.
     * @default false
     */
    @Prop() isDismissible: boolean = false;

    /**
     * The badge size
     * @default 'base'
     */
    @Prop() size: string = 'base';

    @State() private _resolvedSize: BadgeSize = 'base';
    private _sizeWatcher: ResponsivePropWatcher | null = null;

    /**
     * Emitted when the dismiss button is clicked.
     */
    @Event() aegovBadgeDismiss!: EventEmitter<void>;

    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-badge');
        }
        warnIfInvalidEnumProp(this.appearance, BADGE_APPEARANCES, 'soft', ctx('appearance'));
        warnIfInvalidEnumProp(this.color, BADGE_COLORS, 'default', ctx('color'));
        this._sizeWatcher = watchResponsiveProp(this.size, BADGE_SIZES, 'base', v => {
            this._resolvedSize = v as BadgeSize;
        });
        this._resolvedSize = this._sizeWatcher.current as BadgeSize;
    }

    disconnectedCallback() {
        this._sizeWatcher?.destroy();
    }

    @Watch('appearance')
    onAppearanceChange(v: unknown) { warnIfInvalidEnumProp(v, BADGE_APPEARANCES, 'soft', ctx('appearance')); }

    @Watch('color')
    onColorChange(v: unknown) { warnIfInvalidEnumProp(v, BADGE_COLORS, 'default', ctx('color')); }

    @Watch('size')
    onSizeChange() {
        this._sizeWatcher?.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, BADGE_SIZES, 'base', v => {
            this._resolvedSize = v as BadgeSize;
        });
        this._resolvedSize = this._sizeWatcher.current as BadgeSize;
    }

    /**
     * Handle dismiss button click
     */
    private handleBadgeDismissClick = (event: MouseEvent) => {
        event.stopPropagation();
        this.aegovBadgeDismiss.emit();
    };

    /**
     * Get the CSS classes based on component props
     */
    private getBadgeClasses(): string {
        const classes: string[] = [
            'aegov-badge'
        ];

        // Size classes (includes vertical padding)
        const sizeClasses: Record<BadgeSize, string[]> = {
            sm: ['badge-sm', 'text-xs', 'py-0.5', 'px-1.5','rounded-sm'],
            base: ['badge-base', 'text-sm', 'py-0.5', 'px-1.5','rounded-md'],
            lg: ['badge-lg', 'text-sm', 'py-1', 'px-2','rounded-md','font-medium']
        };

        const size: BadgeSize = this._resolvedSize;
        classes.push(...sizeClasses[size]);

        // Appearance classes
        const appearanceClasses: Record<BadgeAppearance, string[]> = {
            soft: ['badge-soft'],
            solid: ['badge-solid']
        };

        const appearance: BadgeAppearance = (BADGE_APPEARANCES as readonly string[]).includes(this.appearance) ? this.appearance : 'soft';
        classes.push(...appearanceClasses[appearance]);

        // Color classes
        const colorClasses: Record<BadgeColor, string[]> = {
            default: ['badge-default'],
            primary: ['badge-primary'],
            secondary: ['badge-secondary'],
            aegold: ['badge-aegold'],
            aered: ['badge-aered'],
            aegreen: ['badge-aegreen'],
            aeblack: ['badge-aeblack'],
            techblue: ['badge-techblue'],
            seablue: ['badge-seablue'],
            camel: ['badge-camel'],
            desert: ['badge-desert'],
            fuchsia: ['badge-fuchsia'],
            slate: ['badge-slate'],
            purple: ['badge-purple'],
            pink: ['badge-pink'],
            indigo: ['badge-indigo'],
            lime: ['badge-lime']
        };

        const color: BadgeColor = (BADGE_COLORS as readonly string[]).includes(this.color) ? this.color : 'default';
        classes.push(...colorClasses[color]);
        
        return classes.join(' ');
    }

    render() {
        const passThroughAttributes = getPassThroughAttributes(this.el);
        return (
            <Host>
                <span {...passThroughAttributes} class={this.getBadgeClasses()} id={this.fieldId}>
                    <slot />
                    {this.isDismissible && (
                        <button
                            type="button"
                            class="badge-dismiss"
                            onClick={this.handleBadgeDismissClick}
                            aria-label={isRtl(this.el) ? STRINGS.ar.dismiss : STRINGS.en.dismiss}
                        >
                            <svg
                                class="size-3"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                        </button>
                    )}
                </span>
            </Host>
        );
    }
}