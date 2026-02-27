# aegov-tabs



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                                                                                                                                                               | Type                                | Default    |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------- |
| `defaultActiveTab` | `default-active-tab` | The tab-id of the tab that should be active on initial render. If not provided, the first non-disabled tab is activated.                                                  | `string`                            | `''`       |
| `scrollable`       | `scrollable`         | Enables horizontal scrolling when tabs overflow the container. A faded gradient edge is shown to indicate scrollable content.                                             | `boolean`                           | `false`    |
| `size`             | `size`               | Size of the tabs.                                                                                                                                                         | `"base" \| "lg" \| "sm"`            | `'base'`   |
| `variant`          | `variant`            | Visual style variant of the tabs. - `simple`: Underline style (default) - `segmented`: Button-group style, ideal for toggling views - `pill`: Pill-shaped individual tabs | `"pill" \| "segmented" \| "simple"` | `'simple'` |


## Events

| Event            | Description                                                                              | Type                  |
| ---------------- | ---------------------------------------------------------------------------------------- | --------------------- |
| `aegovTabChange` | Emitted when the active tab changes. Event detail contains the new active tab-id string. | `CustomEvent<string>` |


## Slots

| Slot        | Description                                                    |
| ----------- | -------------------------------------------------------------- |
| `"default"` | Place aegov-tab-panel elements here (no slot attribute needed) |
| `"tabs"`    | Place aegov-tab elements here (use slot="tabs" on each)        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
