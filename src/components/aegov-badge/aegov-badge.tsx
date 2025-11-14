import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import type { BadgeSize, BadgeAppearance, BadgeColor } from '../../utils/types';

/**
 * @slot default - The main content of the badge
 */
@Component({
  tag: 'aegov-badge',
  styleUrl: 'aegov-badge.css',
  scoped: true,
})
export class AegovBadge {
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
    @Prop() dismissible: boolean = false;

    /**
     * The badge size
     * @default 'base'
     */
    @Prop() size: BadgeSize = 'base';

    /**
     * Emitted when the dismiss button is clicked.
     */
    @Event() aegovBadgeDismiss: EventEmitter<void>;

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
            'inline-flex',
            'items-center',
            'font-medium',
            'whitespace-nowrap',
            'rounded-full',
            '[print-color-adjust:exact]',
            'rounded-md',
            'px-2'
        ];

        // Size classes (includes vertical padding)
        const sizeClasses: Record<BadgeSize, string[]> = {
            sm: ['text-xs', 'py-1'],
            base: ['text-sm', 'py-1'],
            lg: ['text-sm', 'py-1.5']
        };

        classes.push(...sizeClasses[this.size]);

        // Appearance + Color combination classes
        const appearanceColorClasses: Record<BadgeAppearance, Record<BadgeColor, string[]>> = {
            soft: {
                default: ['bg-slate-100', 'text-slate-800'],
                primary: ['bg-primary-100', 'text-primary-800'],
                secondary: ['bg-secondary-100', 'text-secondary-800'],
                aegold: ['bg-aegold-100', 'text-aegold-800'],
                aered: ['bg-aered-100', 'text-aered-800'],
                aegreen: ['bg-aegreen-100', 'text-aegreen-800'],
                aeblack: ['bg-aeblack-100', 'text-aeblack-800'],
                techblue: ['bg-techblue-100', 'text-techblue-800'],
                seablue: ['bg-seablue-100', 'text-seablue-800'],
                camel: ['bg-camel-100', 'text-camel-800'],
                desert: ['bg-desert-100', 'text-desert-800'],
                fuchsia: ['bg-fuchsia-100', 'text-fuchsia-800'],
                slate: ['bg-slate-100', 'text-slate-800'],
                purple: ['bg-purple-100', 'text-purple-800'],
                pink: ['bg-pink-100', 'text-pink-800'],
                indigo: ['bg-indigo-100', 'text-indigo-800'],
                lime: ['bg-lime-100', 'text-lime-800'],
            },
            solid: {
                default: ['bg-slate-700', 'text-slate-50'],
                primary: ['bg-primary-600', 'text-whitely-50'],
                secondary: ['bg-secondary-600', 'text-whitely-50'],
                aegold: ['bg-aegold-600', 'text-whitely-50'],
                aered: ['bg-aered-600', 'text-whitely-50'],
                aegreen: ['bg-aegreen-600', 'text-whitely-50'],
                aeblack: ['bg-aeblack-800', 'text-aeblack-50'],
                techblue: ['bg-techblue-700', 'text-techblue-50'],
                seablue: ['bg-seablue-600', 'text-whitely-50'],
                camel: ['bg-camel-600', 'text-whitely-50'],
                desert: ['bg-desert-600', 'text-whitely-50'],
                fuchsia: ['bg-fuchsia-600', 'text-whitely-50'],
                slate: ['bg-slate-700', 'text-slate-50'],
                purple: ['bg-purple-600', 'text-whitely-50'],
                pink: ['bg-pink-600', 'text-whitely-50'],
                indigo: ['bg-indigo-600', 'text-whitely-50'],
                lime: ['bg-lime-600', 'text-whitely-50'],
            },
        };

        classes.push(...appearanceColorClasses[this.appearance][this.color]);

        return classes.join(' ');
    }

    render() {
        return (
            <Host>
                <span class={this.getBadgeClasses()}>
                    <slot />
                    {this.dismissible && (
                        <button
                            type="button"
                            class="dismiss-button inline-flex items-center justify-between p-0 bg-transparent border-0 h-auto w-auto shrink-0"
                            onClick={this.handleBadgeDismissClick}
                            aria-label="Dismiss badge"
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