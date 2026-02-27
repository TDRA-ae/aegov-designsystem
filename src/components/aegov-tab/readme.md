# aegov-tab



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute       | Description                                                                   | Type                                | Default     |
| -------------------- | --------------- | ----------------------------------------------------------------------------- | ----------------------------------- | ----------- |
| `activeTabId`        | `active-tab-id` | The currently active tab id. Set automatically by the parent aegov-tabs.      | `string`                            | `''`        |
| `disabled`           | `disabled`      | Disables this tab and its associated panel.                                   | `boolean`                           | `false`     |
| `size`               | `size`          | Size of the tab. Set automatically by the parent aegov-tabs.                  | `"base" \| "lg" \| "sm"`            | `'base'`    |
| `tabId` _(required)_ | `tab-id`        | Unique identifier that must match the corresponding aegov-tab-panel's tab-id. | `string`                            | `undefined` |
| `variant`            | `variant`       | Visual variant of the tabs. Set automatically by the parent aegov-tabs.       | `"pill" \| "segmented" \| "simple"` | `'simple'`  |


## Events

| Event            | Description                                                            | Type                  |
| ---------------- | ---------------------------------------------------------------------- | --------------------- |
| `aegovTabSelect` | Emitted when this tab is clicked. Bubbles up to the parent aegov-tabs. | `CustomEvent<string>` |


## Slots

| Slot         | Description                          |
| ------------ | ------------------------------------ |
| `"default"`  | Tab label text                       |
| `"icon"`     | Optional icon shown before the label |
| `"icon-end"` | Optional icon shown after the label  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
