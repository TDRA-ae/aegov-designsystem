import { newSpecPage } from '@stencil/core/testing';
import { AegovContextMenuItem } from './aegov-context-menu-item';

describe('aegov-context-menu-item', () => {
  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `<aegov-context-menu-item>Edit</aegov-context-menu-item>`,
    });

    expect(page.root).toEqualHtml(`
      <aegov-context-menu-item>
        <mock:shadow-root>
          <button aria-disabled="false" class="context-menu-item" role="menuitem" type="button">
            <slot></slot>
          </button>
        </mock:shadow-root>
        Edit
      </aegov-context-menu-item>
    `);
  });

  it('should have disabled default to false', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `<aegov-context-menu-item>Edit</aegov-context-menu-item>`,
    });

    expect(page.rootInstance.disabled).toBe(false);
  });

  it('should accept disabled prop', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `<aegov-context-menu-item disabled>Delete</aegov-context-menu-item>`,
    });

    expect(page.rootInstance.disabled).toBe(true);
  });

  it('should render disabled state correctly', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `<aegov-context-menu-item disabled>Delete</aegov-context-menu-item>`,
    });

    const button = page.root.shadowRoot.querySelector('button');
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-disabled')).toBe('true');
  });

  it('should render slot content', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `<aegov-context-menu-item>Custom Content</aegov-context-menu-item>`,
    });

    expect(page.root.textContent).toBe('Custom Content');
  });

  it('should have role="menuitem"', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `<aegov-context-menu-item>Edit</aegov-context-menu-item>`,
    });

    const button = page.root.shadowRoot.querySelector('button');
    expect(button.getAttribute('role')).toBe('menuitem');
  });

  it('should emit aegovContextMenuItemClick event on click', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `<aegov-context-menu-item>Edit</aegov-context-menu-item>`,
    });

    const clickSpy = jest.fn();
    page.root.addEventListener('aegovContextMenuItemClick', clickSpy);

    const button = page.root.shadowRoot.querySelector('button');
    button.click();
    await page.waitForChanges();

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should not emit event when disabled', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `<aegov-context-menu-item disabled>Delete</aegov-context-menu-item>`,
    });

    const clickSpy = jest.fn();
    page.root.addEventListener('aegovContextMenuItemClick', clickSpy);

    // Try to click (button is disabled so shouldn't fire)
    const button = page.root.shadowRoot.querySelector('button');
    button.click();
    await page.waitForChanges();

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should pass MouseEvent in click event', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `<aegov-context-menu-item>Edit</aegov-context-menu-item>`,
    });

    const clickSpy = jest.fn();
    page.root.addEventListener('aegovContextMenuItemClick', clickSpy);

    const button = page.root.shadowRoot.querySelector('button');
    button.click();
    await page.waitForChanges();

    expect(clickSpy).toHaveBeenCalled();
    expect(clickSpy.mock.calls[0][0].detail).toBeInstanceOf(MouseEvent);
  });

  it('should render with icon slot content', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `
        <aegov-context-menu-item>
          <svg>Icon</svg>
          Edit
        </aegov-context-menu-item>
      `,
    });

    expect(page.root.querySelector('svg')).not.toBeNull();
    expect(page.root.textContent).toContain('Edit');
  });

  it('should apply correct button type', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `<aegov-context-menu-item>Edit</aegov-context-menu-item>`,
    });

    expect(page.root).toEqualHtml(`
      <aegov-context-menu-item>
        <mock:shadow-root>
          <button aria-disabled="false" class="context-menu-item" role="menuitem" type="button">
            <slot></slot>
          </button>
        </mock:shadow-root>
        Edit
      </aegov-context-menu-item>
    `);
  });
});
