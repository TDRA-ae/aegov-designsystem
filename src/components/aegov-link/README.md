# aegov-link



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute     | Description                                                                  | Type                                         | Default     |
| ------------------- | ------------- | ---------------------------------------------------------------------------- | -------------------------------------------- | ----------- |
| `extraClass`        | `extra-class` | Additional CSS classes to apply to the link.                                 | `string`                                     | `undefined` |
| `fieldId`           | `field-id`    | Unique ID for the inner anchor element. Auto-generated if not provided.      | `string`                                     | `undefined` |
| `href` _(required)_ | `href`        | The URL that the link points to.                                             | `string`                                     | `undefined` |
| `rel`               | `rel`         | Rel attribute for the link (e.g., "noopener noreferrer" for external links). | `string`                                     | `undefined` |
| `target`            | `target`      | Target attribute for the link (_blank, _self, _parent, _top).                | `"_blank" \| "_parent" \| "_self" \| "_top"` | `undefined` |


## Events

| Event            | Description                                                                                                          | Type                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `aegovLinkClick` | Emitted when the link is clicked. The event detail contains the href and can be used to implement custom navigation. | `CustomEvent<{ href: string; event: MouseEvent; }>` |


## Slots

| Slot        | Description           |
| ----------- | --------------------- |
| `"default"` | The link text content |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
