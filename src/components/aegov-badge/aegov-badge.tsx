import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import type { BadgeSize, BadgeAppearance, BadgeColor } from '../../utils/types';

/**
 * @slot default - The main content of the badge
 */
@Component({
  tag: 'aegov-badge',
  styleUrl: 'aegov-badge.css',
  scoped: false,
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
            'aegov-badge'
        ];

        // Size classes (includes vertical padding)
        const sizeClasses: Record<BadgeSize, string[]> = {
            sm: ['text-xs', 'py-1'],
            base: ['text-sm', 'py-1'],
            lg: ['text-sm', 'py-1.5']
        };

        classes.push(...sizeClasses[this.size]);

        // Appearance classes
        const appearanceClasses: Record<BadgeAppearance, string[]> = {
            soft: ['badge-soft'],
            solid: ['badge-solid']
        };

        classes.push(...appearanceClasses[this.appearance]);

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

        classes.push(...colorClasses[this.color]);
        
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
                            class="badge-dismiss"
                            onClick={this.handleBadgeDismissClick}
                            aria-label="Badge dismiss button"
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