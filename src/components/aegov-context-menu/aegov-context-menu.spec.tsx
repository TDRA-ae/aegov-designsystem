import { newSpecPage } from '@stencil/core/testing';
import { AegovContextMenu } from './aegov-context-menu';

describe('aegov-context-menu', () => {
  let testDiv: HTMLDivElement;

  beforeEach(() => {
    // Create test target element
    testDiv = document.createElement('div');
    testDiv.id = 'test-target';
    testDiv.textContent = 'Test Target';
    document.body.appendChild(testDiv);
  });

  afterEach(() => {
    // Clean up
    if (testDiv && testDiv.parentNode) {
      testDiv.parentNode.removeChild(testDiv);
    }
    // Clean up any portal elements
    const portals = document.querySelectorAll('.aegov-context-menu-portal');
    portals.forEach(portal => portal.remove());
  });

  it('should render hidden by default', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    expect(page.root).toEqualHtml(`
      <aegov-context-menu target="#test-target" style="display: none;">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <button>Menu Item</button>
      </aegov-context-menu>
    `);
  });

  it('should have required target prop', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    expect(page.rootInstance.target).toBe('#test-target');
  });

  it('should have default offset of 0', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    expect(page.rootInstance.offset).toBe(0);
  });

  it('should accept custom offset', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target" offset="10">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    expect(page.rootInstance.offset).toBe(10);
  });

  it('should have closeOnItemClick default to true', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    expect(page.rootInstance.closeOnItemClick).toBe(true);
  });

  it('should accept closeOnItemClick prop', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target" close-on-item-click="false">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    expect(page.rootInstance.closeOnItemClick).toBe(false);
  });

  it('should have disabled default to false', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    expect(page.rootInstance.disabled).toBe(false);
  });

  it('should accept disabled prop', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target" disabled>
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    expect(page.rootInstance.disabled).toBe(true);
  });

  it('should detect slot content', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    expect(page.rootInstance.hasContent).toBe(true);
  });

  it('should detect empty content', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `<aegov-context-menu target="#test-target"></aegov-context-menu>`,
    });

    expect(page.rootInstance.hasContent).toBe(false);
  });

  it('should bind to target element on load', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    await page.waitForChanges();

    // Check that targetElements array has the target
    expect(page.rootInstance.targetElements.length).toBe(1);
    expect(page.rootInstance.targetElements[0].id).toBe('test-target');
  });

  it('should bind to multiple target elements', async () => {
    // Create multiple test targets
    const testDiv2 = document.createElement('div');
    testDiv2.className = 'multi-target';
    testDiv2.textContent = 'Target 1';
    document.body.appendChild(testDiv2);

    const testDiv3 = document.createElement('div');
    testDiv3.className = 'multi-target';
    testDiv3.textContent = 'Target 2';
    document.body.appendChild(testDiv3);

    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target=".multi-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    await page.waitForChanges();

    expect(page.rootInstance.targetElements.length).toBe(2);

    // Clean up
    testDiv2.remove();
    testDiv3.remove();
  });

  it('should handle invalid selector gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="[invalid:::selector">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    await page.waitForChanges();

    expect(page.rootInstance.targetElements.length).toBe(0);
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should create portal element on load', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    await page.waitForChanges();

    const portal = document.querySelector('.aegov-context-menu-portal');
    expect(portal).not.toBeNull();
  });

  it('should remove portal element on disconnect', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    await page.waitForChanges();

    let portal = document.querySelector('.aegov-context-menu-portal');
    expect(portal).not.toBeNull();

    // Disconnect component
    page.rootInstance.disconnectedCallback();

    portal = document.querySelector('.aegov-context-menu-portal');
    expect(portal).toBeNull();
  });

  it('should open menu via show() method', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    await page.waitForChanges();

    expect(page.rootInstance.isOpen).toBe(false);

    await page.rootInstance.show(100, 100);
    await page.waitForChanges();

    expect(page.rootInstance.isOpen).toBe(true);
    expect(page.rootInstance.cursorX).toBe(100);
    expect(page.rootInstance.cursorY).toBe(100);
  });

  it('should close menu via close() method', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    await page.waitForChanges();

    await page.rootInstance.show(100, 100);
    await page.waitForChanges();

    expect(page.rootInstance.isOpen).toBe(true);

    await page.rootInstance.close();
    await page.waitForChanges();

    expect(page.rootInstance.isOpen).toBe(false);
  });

  it('should emit aegovContextMenuOpen event when opened', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    await page.waitForChanges();

    const openSpy = jest.fn();
    page.root.addEventListener('aegovContextMenuOpen', openSpy);

    await page.rootInstance.show(150, 200);
    await page.waitForChanges();

    expect(openSpy).toHaveBeenCalled();
    expect(openSpy.mock.calls[0][0].detail.x).toBe(150);
    expect(openSpy.mock.calls[0][0].detail.y).toBe(200);
  });

  it('should emit aegovContextMenuClose event when closed', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    await page.waitForChanges();

    await page.rootInstance.show(100, 100);
    await page.waitForChanges();

    const closeSpy = jest.fn();
    page.root.addEventListener('aegovContextMenuClose', closeSpy);

    await page.rootInstance.close();
    await page.waitForChanges();

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should not bind to targets when disabled', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target" disabled>
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    await page.waitForChanges();

    expect(page.rootInstance.targetElements.length).toBe(0);
  });

  it('should generate unique menu ID', async () => {
    const page1 = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    const page2 = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    expect(page1.rootInstance.menuId).toBeTruthy();
    expect(page2.rootInstance.menuId).toBeTruthy();
    expect(page1.rootInstance.menuId).not.toBe(page2.rootInstance.menuId);
  });

  it('should rebind to targets when target prop changes', async () => {
    const testDiv2 = document.createElement('div');
    testDiv2.id = 'new-target';
    testDiv2.textContent = 'New Target';
    document.body.appendChild(testDiv2);

    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    await page.waitForChanges();

    expect(page.rootInstance.targetElements.length).toBe(1);
    expect(page.rootInstance.targetElements[0].id).toBe('test-target');

    page.rootInstance.target = '#new-target';
    await page.waitForChanges();

    expect(page.rootInstance.targetElements.length).toBe(1);
    expect(page.rootInstance.targetElements[0].id).toBe('new-target');

    testDiv2.remove();
  });

  it('should store cursor coordinates from contextmenu event', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    await page.waitForChanges();

    const contextMenuEvent = new MouseEvent('contextmenu', {
      clientX: 250,
      clientY: 300,
      bubbles: true,
      cancelable: true,
    });

    testDiv.dispatchEvent(contextMenuEvent);
    await page.waitForChanges();

    expect(page.rootInstance.cursorX).toBe(250);
    expect(page.rootInstance.cursorY).toBe(300);
    expect(page.rootInstance.isOpen).toBe(true);
  });

  it('should not open when disabled', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target" disabled>
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    await page.waitForChanges();

    // Manually call handleContextMenu since disabled prevents binding
    const contextMenuEvent = new MouseEvent('contextmenu', {
      clientX: 100,
      clientY: 100,
      bubbles: true,
      cancelable: true,
    });

    page.rootInstance.handleContextMenu(contextMenuEvent);
    await page.waitForChanges();

    expect(page.rootInstance.isOpen).toBe(false);
  });
});
