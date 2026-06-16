import { newSpecPage } from '@stencil/core/testing';
import { AegovTabPanel } from './aegov-tab-panel';
import { AegovTabs } from '../aegov-tabs/aegov-tabs';

// aegov-tabs propagates `active-tab-id` to its child <aegov-tab-panel>
// elements via componentDidLoad, controlling the panel's `active` state.
// Tests configure the parent's `active-tab-id` to drive the child panel.
const wrap = (inner: string, parentAttrs = '') =>
  `<aegov-tabs ${parentAttrs}>${inner}</aegov-tabs>`;

describe('aegov-tab-panel', () => {
  it('renders a tabpanel element with id and aria-labelledby', async () => {
    const page = await newSpecPage({
      components: [AegovTabs, AegovTabPanel],
      html: wrap(`<aegov-tab-panel tab-id="one">Content</aegov-tab-panel>`),
    });
    const panel = page.root.querySelector('aegov-tab-panel [role="tabpanel"]');
    expect(panel).not.toBeNull();
    expect(panel.id).toBe('panel-one');
    expect(panel.getAttribute('aria-labelledby')).toBe('tab-one');
    expect(panel.className).toContain('aegov-tab-panel');
  });

  it('hidden when not active', async () => {
    const page = await newSpecPage({
      components: [AegovTabs, AegovTabPanel],
      html: wrap(`<aegov-tab-panel tab-id="one">Content</aegov-tab-panel>`),
    });
    const panel = page.root.querySelector('aegov-tab-panel [role="tabpanel"]');
    expect(panel.hasAttribute('hidden')).toBe(true);
    expect(panel.hasAttribute('tabindex')).toBe(false);
  });

  it('visible and focusable when active', async () => {
    const page = await newSpecPage({
      components: [AegovTabs, AegovTabPanel],
      html: wrap(`<aegov-tab-panel tab-id="one">Content</aegov-tab-panel>`, 'default-open="one"'),
    });
    const panel = page.root.querySelector('aegov-tab-panel [role="tabpanel"]');
    expect(panel.hasAttribute('hidden')).toBe(false);
    expect(panel.getAttribute('tabindex')).toBe('0');
  });

  it('renders slotted content', async () => {
    const page = await newSpecPage({
      components: [AegovTabs, AegovTabPanel],
      html: wrap(`<aegov-tab-panel tab-id="one">Hello world</aegov-tab-panel>`),
    });
    expect(page.root.textContent).toContain('Hello world');
  });

  it('merges extra-class onto the panel', async () => {
    const page = await newSpecPage({
      components: [AegovTabs, AegovTabPanel],
      html: wrap(`<aegov-tab-panel tab-id="one" extra-class="extra-thing">X</aegov-tab-panel>`),
    });
    const panel = page.root.querySelector('aegov-tab-panel [role="tabpanel"]');
    expect(panel.className).toContain('aegov-tab-panel');
    expect(panel.className).toContain('extra-thing');
  });

  it('throws when used outside aegov-tabs', async () => {
    await expect(
      newSpecPage({
        components: [AegovTabPanel],
        html: `<aegov-tab-panel tab-id="x"></aegov-tab-panel>`,
      }),
    ).rejects.toThrow('must be used inside <aegov-tabs>');
  });
});
