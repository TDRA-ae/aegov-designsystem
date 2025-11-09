# aegov-avatar



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                 | Type                                                       | Default     |
| ------------ | ------------- | ----------------------------------------------------------- | ---------------------------------------------------------- | ----------- |
| `alt`        | `alt`         | Alternative text for the image (required for accessibility) | `string`                                                   | `undefined` |
| `size`       | `size`        | The avatar size                                             | `"2xl" \| "3xl" \| "base" \| "lg" \| "sm" \| "xl" \| "xs"` | `'base'`    |
| `src`        | `src`         | The image source URL                                        | `string`                                                   | `undefined` |
| `status`     | `status`      | Status indicator visibility                                 | `boolean`                                                  | `false`     |
| `statusType` | `status-type` | Status indicator type                                       | `"none" \| "offline" \| "online"`                          | `'online'`  |
| `variant`    | `variant`     | The avatar variant (shape)                                  | `"rounded" \| "square"`                                    | `'square'`  |


## Slots

| Slot | Description                                   |
| ---- | --------------------------------------------- |
|      | Avatar content (used when no src is provided) |


## Shadow Parts

| Part       | Description                  |
| ---------- | ---------------------------- |
| `"avatar"` | The avatar container element |
| `"image"`  | The avatar image element     |
| `"status"` | The status indicator element |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
