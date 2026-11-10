import { Plugin } from 'vue';
import { defineCustomElements } from '@aegov/designsystem/loader';

let defined: Promise<void> | undefined;

/**
 * Registers every `aegov-*` element through the lazy loader and runs the design
 * system's global script (toast live region, `window.aegovToast`). Resolves once
 * the elements are defined. Calling it again returns the same promise.
 *
 * The loader cannot define the elements synchronously, so `app.use(ComponentLibrary)`
 * alone defines them only after `app.mount()` has rendered. Until an element is
 * defined, Vue sets a bound prop as an attribute, and a camelCase name such as
 * `tabId` becomes the attribute `tabid`, which the component ignores. Wait for this
 * promise before mounting so the first render sets props on defined elements:
 *
 * ```ts
 * defineDesignSystem().then(() => {
 *   createApp(App).use(ComponentLibrary).mount('#app');
 * });
 * ```
 */
export function defineDesignSystem(): Promise<void> {
  defined ??= Promise.resolve(defineCustomElements());
  return defined;
}

export const ComponentLibrary: Plugin = {
  install() {
    return defineDesignSystem();
  },
};
