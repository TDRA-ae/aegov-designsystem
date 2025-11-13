import { Component, Prop, h, Host } from '@stencil/core';
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
                default: ['bg-slate-50', 'text-slate-800'],
                primary: ['bg-primary-50', 'text-primary-800'],
                secondary: ['bg-secondary-50', 'text-secondary-800'],
                aegold: ['bg-aegold-50', 'text-aegold-800'],
                aered: ['bg-aered-50', 'text-aered-800'],
                aegreen: ['bg-aegreen-50', 'text-aegreen-800'],
                aeblack: ['bg-aeblack-50', 'text-aeblack-800'],
                techblue: ['bg-techblue-50', 'text-techblue-800'],
                seablue: ['bg-seablue-50', 'text-seablue-800'],
                camel: ['bg-camel-50', 'text-camel-800'],
                desert: ['bg-desert-50', 'text-desert-800'],
                fuchsia: ['bg-fuchsia-50', 'text-fuchsia-800'],
                slate: ['bg-slate-50', 'text-slate-800'],
                purple: ['bg-purple-50', 'text-purple-800'],
                pink: ['bg-pink-50', 'text-pink-800'],
                indigo: ['bg-indigo-50', 'text-indigo-800'],
                lime: ['bg-lime-50', 'text-lime-800'],
            },
            solid: {
                default: ['bg-slate-700', 'text-whitely-50'],
                primary: ['bg-primary-700', 'text-primary-50'],
                secondary: ['bg-secondary-700', 'text-secondary-50'],
                aegold: ['bg-aegold-700', 'text-aegold-50'],
                aered: ['bg-aered-700', 'text-aered-50'],
                aegreen: ['bg-aegreen-700', 'text-aegreen-50'],
                aeblack: ['bg-aeblack-700', 'text-aeblack-50'],
                techblue: ['bg-techblue-700', 'text-techblue-50'],
                seablue: ['bg-seablue-700', 'text-seablue-50'],
                camel: ['bg-camel-700', 'text-camel-50'],
                desert: ['bg-desert-700', 'text-desert-50'],
                fuchsia: ['bg-fuchsia-700', 'text-fuchsia-50'],
                slate: ['bg-slate-700', 'text-slate-50'],
                purple: ['bg-purple-700', 'text-purple-50'],
                pink: ['bg-pink-700', 'text-pink-50'],
                indigo: ['bg-indigo-700', 'text-indigo-50'],
                lime: ['bg-lime-700', 'text-lime-50'],
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
                </span>
            </Host>
        );
    }
}