# aegov-accordion-item



<!-- Auto Generated Below -->


## Overview

Accordion item component

**⚠️ IMPORTANT:** This component must be used inside `<aegov-accordion>` component.
Do not use this component standalone.

## Properties

| Property     | Attribute     | Description                                                                                                                                         | Type      | Default     |
| ------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `heading`    | `heading`     | Heading text for the accordion item (alternative to using the slot) Note: If both heading property and slot are provided, the slot takes precedence | `string`  | `undefined` |
| `isDisabled` | `is-disabled` | Whether the accordion item is disabled                                                                                                              | `boolean` | `false`     |


## Events

| Event                      | Description                                | Type                              |
| -------------------------- | ------------------------------------------ | --------------------------------- |
| `aegovAccordionItemToggle` | Emitted when the accordion item is toggled | `CustomEvent<{ open: boolean; }>` |


## Slots

| Slot                       | Description                            |
| -------------------------- | -------------------------------------- |
| `"accordion-item-content"` | Content that expands/collapses         |
| `"accordion-item-heading"` | Heading content for the accordion item |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
