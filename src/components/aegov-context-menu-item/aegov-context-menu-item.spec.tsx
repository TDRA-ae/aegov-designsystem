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
        <button aria-disabled="false" class="context-menu-item" role="menuitem" type="button">
          Edit
        </button>
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

    const button = page.root.querySelector('button');
    expect(button.hasAttribute('disabled')).toBe(true);
    expect(button.getAttribute('aria-disabled')).toBe('true');
  });

  it('should render aria-disabled="false" when not disabled', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `<aegov-context-menu-item>Edit</aegov-context-menu-item>`,
    });

    const button = page.root.querySelector('button');
    expect(button.getAttribute('aria-disabled')).toBe('false');
  });

  it('should render slot content', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `<aegov-context-menu-item>Custom Content</aegov-context-menu-item>`,
    });

    expect(page.root.textContent).toContain('Custom Content');
  });

  it('should have role="menuitem"', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `<aegov-context-menu-item>Edit</aegov-context-menu-item>`,
    });

    const button = page.root.querySelector('button');
    expect(button.getAttribute('role')).toBe('menuitem');
  });

  it('should have type="button"', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `<aegov-context-menu-item>Edit</aegov-context-menu-item>`,
    });

    const button = page.root.querySelector('button');
    expect(button.getAttribute('type')).toBe('button');
  });

  it('should have class="context-menu-item" on button', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `<aegov-context-menu-item>Edit</aegov-context-menu-item>`,
    });

    const button = page.root.querySelector('button');
    expect(button.classList.contains('context-menu-item')).toBe(true);
  });

  it('should emit aegovContextMenuItemClick event on click', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `<aegov-context-menu-item>Edit</aegov-context-menu-item>`,
    });

    const clickSpy = jest.fn();
    page.root.addEventListener('aegovContextMenuItemClick', clickSpy);

    const button = page.root.querySelector('button');
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

    const button = page.root.querySelector('button');
    button.click();
    await page.waitForChanges();

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should pass MouseEvent in click event detail', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `<aegov-context-menu-item>Edit</aegov-context-menu-item>`,
    });

    const clickSpy = jest.fn();
    page.root.addEventListener('aegovContextMenuItemClick', clickSpy);

    const button = page.root.querySelector('button');
    button.click();
    await page.waitForChanges();

    expect(clickSpy).toHaveBeenCalled();
    expect(clickSpy.mock.calls[0][0].detail).toBeTruthy();
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

  it('should render disabled state with full HTML check', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenuItem],
      html: `<aegov-context-menu-item disabled>Delete</aegov-context-menu-item>`,
    });

    expect(page.root).toEqualHtml(`
      <aegov-context-menu-item disabled="">
        <button aria-disabled="true" class="context-menu-item" disabled="" role="menuitem" type="button">
          Delete
        </button>
      </aegov-context-menu-item>
    `);
  });
});
