# Actions guideline

Use one solid primary action per context and reserve lower-priority button styles for secondary or repeated actions.

## Rules

- **Solid button = primary action;** use when there is a single call-to-action with no alternative choices.
- **Outline button = medium priority,** for optional actions needing less visibility than the primary.
- **Soft button = medium priority,** an equal-priority alternative to the outline button for secondary/optional actions.
- **Link button = lowest priority,** suitable for navigation within card elements.
- When repeating parent elements exceed 2 in a single row, use medium- or low-priority buttons — **never solid buttons with multiple repeating elements.**
- Medium and low-priority buttons can be combined even without a solid button present.
- Solid buttons must use **monochromatic** colours and meet **WCAG 2.0 AA**.
- Use **full-width buttons** to increase emphasis (effective for login, registration, important action panels).
- **Labels:** actionable verbs, informative, **fewer than four words.**
- Avoid creative language in labels; use familiar terminology.
- Icons may sit at the **start or end** of the label; use only when needed to clarify the action.
- **FABs:** maximum of **2** per website; recommended bottom-right; must not obscure content or block keyboard navigation and must be distinguishable from each other.
- Don't style links as primary solid buttons using the same colours as action buttons.

## Common violations to flag

- More than one solid/primary button competing in the same context.
- Solid buttons repeated across multiple items in a row (e.g. a card grid).
- Button labels of four+ words, non-actionable, or "creative"/unfamiliar wording.
- Solid buttons failing WCAG 2.0 AA contrast or not monochromatic.
- More than 2 FABs, FABs overlapping content, or blocking keyboard navigation.
- Links styled to look identical to primary action buttons.

**Source:** https://designsystem.gov.ae/guidelines/actions
