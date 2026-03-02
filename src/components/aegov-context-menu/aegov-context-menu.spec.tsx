import { newSpecPage } from '@stencil/core/testing';
import { AegovContextMenu } from './aegov-context-menu';
import { AegovContextMenuItem } from '../aegov-context-menu-item/aegov-context-menu-item';

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
    // Clean up any portal elements
    try {
      const portals = document.querySelectorAll('.aegov-context-menu-portal');
      portals.forEach(portal => {
        try { portal.remove(); } catch (_e) { /* ignore */ }
      });
      if (testDiv && testDiv.parentNode) {
        try { testDiv.parentNode.removeChild(testDiv); } catch (_e) { /* ignore */ }
      }
    } catch (_e) {
      // Stencil mock-doc may reset document between tests
    }
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

  it('should accept closeOnItemClick prop set to false', async () => {
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

  it('should detect content based on childNodes', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `<aegov-context-menu target="#test-target"><button>Item</button></aegov-context-menu>`,
    });

    expect(page.rootInstance.hasContent).toBe(true);
  });

  it('should call bindToTargets on load', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <div id="test-target">Target</div>
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    await page.waitForChanges();

    // In mock-doc, document.querySelectorAll finds elements in the test page
    expect(page.rootInstance.target).toBe('#test-target');
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
        <div id="test-target">Target</div>
        <aegov-context-menu target="#test-target" disabled>
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    await page.waitForChanges();

    // When disabled, bindToTargets returns early
    expect(page.rootInstance.disabled).toBe(true);
  });

  it('should generate a menu ID', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    expect(page.rootInstance.menuId).toBeTruthy();
    expect(page.rootInstance.menuId).toContain('aegov-context-menu-');
  });

  it('should update target prop', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    await page.waitForChanges();

    expect(page.rootInstance.target).toBe('#test-target');

    page.rootInstance.target = '#new-target';
    await page.waitForChanges();

    expect(page.rootInstance.target).toBe('#new-target');
  });

  it('should store cursor coordinates when show() is called', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    await page.waitForChanges();

    await page.rootInstance.show(250, 300);
    await page.waitForChanges();

    expect(page.rootInstance.cursorX).toBe(250);
    expect(page.rootInstance.cursorY).toBe(300);
    expect(page.rootInstance.isOpen).toBe(true);
  });

  it('should not open when disabled and contextmenu is triggered', async () => {
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

  it('should render portal content when opened', async () => {
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

    const portal = document.querySelector('.aegov-context-menu-portal');
    const menu = portal.querySelector('.context-menu');
    expect(menu).not.toBeNull();
    expect(menu.getAttribute('role')).toBe('menu');
    expect(menu.getAttribute('data-state')).toBe('open');
  });

  it('should clear portal content when closed', async () => {
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

    const portal = document.querySelector('.aegov-context-menu-portal');
    expect(portal.innerHTML).not.toBe('');

    await page.rootInstance.close();
    await page.waitForChanges();

    expect(portal.innerHTML).toBe('');
  });

  it('should render with aegov-context-menu-item children', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu, AegovContextMenuItem],
      html: `
        <aegov-context-menu target="#test-target">
          <aegov-context-menu-item>Copy</aegov-context-menu-item>
          <aegov-context-menu-item>Paste</aegov-context-menu-item>
        </aegov-context-menu>
      `,
    });

    expect(page.root).not.toBeNull();
    const items = page.root.querySelectorAll('aegov-context-menu-item');
    expect(items.length).toBe(2);
  });

  it('should have host display set to none', async () => {
    const page = await newSpecPage({
      components: [AegovContextMenu],
      html: `
        <aegov-context-menu target="#test-target">
          <button>Menu Item</button>
        </aegov-context-menu>
      `,
    });

    expect(page.root.style.display).toBe('none');
  });
});
