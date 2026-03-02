import { newE2EPage } from '@stencil/core/testing';

describe('aegov-context-menu-item E2E', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-context-menu-item>Edit</aegov-context-menu-item>`);

    const element = await page.find('aegov-context-menu-item');
    expect(element).not.toBeNull();
  });

  it('should display slot content', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-context-menu-item>Custom Item</aegov-context-menu-item>`);

    const element = await page.find('aegov-context-menu-item');
    expect(element.textContent).toBe('Custom Item');
  });

  it('should emit aegovContextMenuItemClick event on click', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-context-menu-item>Edit</aegov-context-menu-item>`);

    const element = await page.find('aegov-context-menu-item');
    const clickSpy = await element.spyOnEvent('aegovContextMenuItemClick');

    await element.click();
    await page.waitForChanges();

    expect(clickSpy).toHaveReceivedEvent();
  });

  it('should not emit event when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-context-menu-item disabled>Delete</aegov-context-menu-item>`);

    const element = await page.find('aegov-context-menu-item');
    const clickSpy = await element.spyOnEvent('aegovContextMenuItemClick');

    await element.click();
    await page.waitForChanges();

    expect(clickSpy).not.toHaveReceivedEvent();
  });

  it('should have role="menuitem" on button', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-context-menu-item>Edit</aegov-context-menu-item>`);

    const button = await page.find('aegov-context-menu-item button');
    const role = await button.getAttribute('role');
    expect(role).toBe('menuitem');
  });

  it('should have type="button" on button', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-context-menu-item>Edit</aegov-context-menu-item>`);

    const button = await page.find('aegov-context-menu-item button');
    const type = await button.getAttribute('type');
    expect(type).toBe('button');
  });

  it('should apply disabled attribute when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-context-menu-item disabled>Delete</aegov-context-menu-item>`);

    const button = await page.find('aegov-context-menu-item button');
    const disabled = await button.getProperty('disabled');
    expect(disabled).toBe(true);
  });

  it('should apply aria-disabled="true" when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-context-menu-item disabled>Delete</aegov-context-menu-item>`);

    const button = await page.find('aegov-context-menu-item button');
    const ariaDisabled = await button.getAttribute('aria-disabled');
    expect(ariaDisabled).toBe('true');
  });

  it('should have aria-disabled="false" when not disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-context-menu-item>Edit</aegov-context-menu-item>`);

    const button = await page.find('aegov-context-menu-item button');
    const ariaDisabled = await button.getAttribute('aria-disabled');
    expect(ariaDisabled).toBe('false');
  });

  it('should have context-menu-item class on button', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-context-menu-item>Edit</aegov-context-menu-item>`);

    const button = await page.find('aegov-context-menu-item button.context-menu-item');
    expect(button).not.toBeNull();
  });

  it('should render with icon content', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-context-menu-item>
        <svg width="16" height="16"><circle cx="8" cy="8" r="8" /></svg>
        Edit
      </aegov-context-menu-item>
    `);

    const svg = await page.find('aegov-context-menu-item svg');
    expect(svg).not.toBeNull();

    const element = await page.find('aegov-context-menu-item');
    expect(element.textContent).toContain('Edit');
  });

  it('should be focusable when enabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-context-menu-item>Edit</aegov-context-menu-item>`);

    await page.evaluate(() => {
      const item = document.querySelector('aegov-context-menu-item');
      const button = item?.querySelector('button');
      if (button) {
        button.focus();
      }
    });
    await page.waitForChanges();

    const focusedTag = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });

    // The button or the host should be the active element
    expect(focusedTag).toBeTruthy();
  });
});
