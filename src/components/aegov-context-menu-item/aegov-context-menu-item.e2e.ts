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

    // Button is disabled, so click might not register
    // We'll try clicking on the host element
    await element.click();
    await page.waitForChanges();

    expect(clickSpy).not.toHaveReceivedEvent();
  });

  it('should have role="menuitem" on button', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-context-menu-item>Edit</aegov-context-menu-item>`);

    const button = await page.find('aegov-context-menu-item >>> button');
    const role = await button.getAttribute('role');
    expect(role).toBe('menuitem');
  });

  it('should apply disabled attribute when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-context-menu-item disabled>Delete</aegov-context-menu-item>`);

    const button = await page.find('aegov-context-menu-item >>> button');
    const disabled = await button.getProperty('disabled');
    expect(disabled).toBe(true);
  });

  it('should apply aria-disabled when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-context-menu-item disabled>Delete</aegov-context-menu-item>`);

    const button = await page.find('aegov-context-menu-item >>> button');
    const ariaDisabled = await button.getAttribute('aria-disabled');
    expect(ariaDisabled).toBe('true');
  });

  it('should be focusable when enabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-context-menu-item>Edit</aegov-context-menu-item>`);

    // Focus the button inside the component
    await page.evaluate(() => {
      const item = document.querySelector('aegov-context-menu-item');
      const button = item?.shadowRoot?.querySelector('button');
      if (button) {
        (button as HTMLElement).focus();
      }
    });
    await page.waitForChanges();

    const focusedElement = await page.evaluate(() => {
      const item = document.querySelector('aegov-context-menu-item');
      const activeEl = item?.shadowRoot?.activeElement;
      return activeEl?.tagName;
    });

    // The button inside should be focused
    expect(focusedElement).toBe('BUTTON');
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

  it('should have button type="button"', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-context-menu-item>Edit</aegov-context-menu-item>`);

    const button = await page.find('aegov-context-menu-item >>> button');
    const type = await button.getAttribute('type');
    expect(type).toBe('button');
  });
});
