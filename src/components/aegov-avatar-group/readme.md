# aegov-avatar-group



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                              | Type                     | Default     |
| ----------- | ------------ | ------------------------------------------------------------------------ | ------------------------ | ----------- |
| `moreCount` | `more-count` | Number of additional users not shown. When > 0, displays "+N" indicator. | `number`                 | `0`         |
| `moreText`  | `more-text`  | Custom text for the "more" indicator. Defaults to "{moreCount}+"         | `string`                 | `undefined` |
| `size`      | `size`       | The size enforced on all child avatars                                   | `string`                 | `'base'`    |
| `variant`   | `variant`    | The layout variant: 'default' (spaced) or 'compact' (overlapping)        | `"compact" \| "default"` | `'default'` |


## Events

| Event                  | Description                                         | Type                |
| ---------------------- | --------------------------------------------------- | ------------------- |
| `aegovAvatarGroupMore` | Emitted when the "more" indicator button is clicked | `CustomEvent<void>` |


## Slots

| Slot | Description                            |
| ---- | -------------------------------------- |
|      | Avatar elements to be grouped together |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
