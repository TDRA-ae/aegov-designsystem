import { newE2EPage } from '@stencil/core/testing';

describe('aegov-context-menu E2E', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div id="test-target" style="width: 200px; height: 200px; background: #f0f0f0;">
        Right-click me
      </div>
      <aegov-context-menu target="#test-target">
        <button>Edit</button>
        <button>Delete</button>
      </aegov-context-menu>
    `);

    const element = await page.find('aegov-context-menu');
    expect(element).not.toBeNull();
  });

  it('should show context menu on right-click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div id="test-target" style="width: 200px; height: 200px; background: #f0f0f0;">
        Right-click me
      </div>
      <aegov-context-menu target="#test-target">
        <button>Edit</button>
        <button>Delete</button>
      </aegov-context-menu>
    `);

    // Right-click the target
    const target = await page.find('#test-target');
    await target.click({ button: 'right' });
    await page.waitForChanges();

    // Check if portal menu is visible
    const portal = await page.find('.aegov-context-menu-portal');
    expect(portal).not.toBeNull();

    const menu = await page.find('.aegov-context-menu-portal .context-menu');
    expect(menu).not.toBeNull();
  });

  it('should emit aegovContextMenuOpen event on right-click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div id="test-target" style="width: 200px; height: 200px; background: #f0f0f0;">
        Right-click me
      </div>
      <aegov-context-menu target="#test-target">
        <button>Edit</button>
        <button>Delete</button>
      </aegov-context-menu>
    `);

    const contextMenu = await page.find('aegov-context-menu');
    const openSpy = await contextMenu.spyOnEvent('aegovContextMenuOpen');

    const target = await page.find('#test-target');
    await target.click({ button: 'right' });
    await page.waitForChanges();

    expect(openSpy).toHaveReceivedEvent();
    expect(openSpy.events[0].detail).toHaveProperty('x');
    expect(openSpy.events[0].detail).toHaveProperty('y');
    expect(openSpy.events[0].detail).toHaveProperty('targetElement');
  });

  it('should close context menu on click outside', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div id="test-target" style="width: 200px; height: 200px; background: #f0f0f0;">
        Right-click me
      </div>
      <div id="outside" style="width: 200px; height: 200px; background: #e0e0e0;">
        Click here
      </div>
      <aegov-context-menu target="#test-target">
        <button>Edit</button>
        <button>Delete</button>
      </aegov-context-menu>
    `);

    // Right-click to open
    const target = await page.find('#test-target');
    await target.click({ button: 'right' });
    await page.waitForChanges();

    // Verify menu is open
    let menu = await page.find('.aegov-context-menu-portal .context-menu');
    expect(menu).not.toBeNull();

    // Click outside
    const outside = await page.find('#outside');
    await outside.click();
    await page.waitForChanges();

    // Menu should be closed (portal cleared)
    const portal = await page.find('.aegov-context-menu-portal');
    const portalHTML = await portal.getProperty('innerHTML');
    expect(portalHTML).toBe('');
  });

  it('should close context menu on Escape key', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div id="test-target" style="width: 200px; height: 200px; background: #f0f0f0;">
        Right-click me
      </div>
      <aegov-context-menu target="#test-target">
        <button>Edit</button>
        <button>Delete</button>
      </aegov-context-menu>
    `);

    // Right-click to open
    const target = await page.find('#test-target');
    await target.click({ button: 'right' });
    await page.waitForChanges();

    // Verify menu is open
    let menu = await page.find('.aegov-context-menu-portal .context-menu');
    expect(menu).not.toBeNull();

    // Press Escape
    await page.keyboard.press('Escape');
    await page.waitForChanges();

    // Menu should be closed
    const portal = await page.find('.aegov-context-menu-portal');
    const portalHTML = await portal.getProperty('innerHTML');
    expect(portalHTML).toBe('');
  });

  it('should emit aegovContextMenuClose event on close', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div id="test-target" style="width: 200px; height: 200px; background: #f0f0f0;">
        Right-click me
      </div>
      <aegov-context-menu target="#test-target">
        <button>Edit</button>
        <button>Delete</button>
      </aegov-context-menu>
    `);

    const contextMenu = await page.find('aegov-context-menu');
    const closeSpy = await contextMenu.spyOnEvent('aegovContextMenuClose');

    // Open menu
    const target = await page.find('#test-target');
    await target.click({ button: 'right' });
    await page.waitForChanges();

    // Close with Escape
    await page.keyboard.press('Escape');
    await page.waitForChanges();

    expect(closeSpy).toHaveReceivedEvent();
  });

  it('should close menu when item is clicked (closeOnItemClick=true)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div id="test-target" style="width: 200px; height: 200px; background: #f0f0f0;">
        Right-click me
      </div>
      <aegov-context-menu target="#test-target" close-on-item-click="true">
        <button id="edit-btn">Edit</button>
        <button>Delete</button>
      </aegov-context-menu>
    `);

    // Open menu
    const target = await page.find('#test-target');
    await target.click({ button: 'right' });
    await page.waitForChanges();

    // Click menu item
    await page.evaluate(() => {
      const editBtn = document.querySelector('.aegov-context-menu-portal #edit-btn') as HTMLButtonElement;
      if (editBtn) editBtn.click();
    });
    await page.waitForChanges();

    // Menu should be closed
    const portal = await page.find('.aegov-context-menu-portal');
    const portalHTML = await portal.getProperty('innerHTML');
    expect(portalHTML).toBe('');
  });

  it('should NOT close menu when item is clicked (closeOnItemClick=false)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div id="test-target" style="width: 200px; height: 200px; background: #f0f0f0;">
        Right-click me
      </div>
      <aegov-context-menu target="#test-target" close-on-item-click="false">
        <button id="edit-btn">Edit</button>
        <button>Delete</button>
      </aegov-context-menu>
    `);

    // Open menu
    const target = await page.find('#test-target');
    await target.click({ button: 'right' });
    await page.waitForChanges();

    // Click menu item
    await page.evaluate(() => {
      const editBtn = document.querySelector('.aegov-context-menu-portal #edit-btn') as HTMLButtonElement;
      if (editBtn) editBtn.click();
    });
    await page.waitForChanges();

    // Menu should still be open
    const menu = await page.find('.aegov-context-menu-portal .context-menu');
    expect(menu).not.toBeNull();
  });

  it('should support multiple targets', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div class="target" style="width: 200px; height: 100px; background: #f0f0f0; margin-bottom: 10px;">
        Target 1
      </div>
      <div class="target" style="width: 200px; height: 100px; background: #f0f0f0;">
        Target 2
      </div>
      <aegov-context-menu target=".target">
        <button>Edit</button>
        <button>Delete</button>
      </aegov-context-menu>
    `);

    // Right-click first target
    const targets = await page.findAll('.target');
    await targets[0].click({ button: 'right' });
    await page.waitForChanges();

    let menu = await page.find('.aegov-context-menu-portal .context-menu');
    expect(menu).not.toBeNull();

    // Close menu
    await page.keyboard.press('Escape');
    await page.waitForChanges();

    // Right-click second target
    await targets[1].click({ button: 'right' });
    await page.waitForChanges();

    menu = await page.find('.aegov-context-menu-portal .context-menu');
    expect(menu).not.toBeNull();
  });

  it('should position menu at cursor coordinates', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div id="test-target" style="width: 400px; height: 400px; background: #f0f0f0;">
        Right-click me
      </div>
      <aegov-context-menu target="#test-target">
        <button>Edit</button>
        <button>Delete</button>
      </aegov-context-menu>
    `);

    // Right-click at specific position
    const target = await page.find('#test-target');
    await target.click({ button: 'right', clickCount: 1 });
    await page.waitForChanges();

    // Wait for positioning
    await page.waitForChanges();
    await new Promise(resolve => setTimeout(resolve, 100));

    // Check menu position
    const menu = await page.find('.aegov-context-menu-portal .context-menu');
    const menuStyle = await menu.getComputedStyle();

    // Menu should be positioned near the click coordinates
    // (exact position may vary due to collision detection)
    expect(menuStyle.position).toBe('fixed');
    expect(menuStyle.visibility).toBe('visible');
  });

  it('should not open when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div id="test-target" style="width: 200px; height: 200px; background: #f0f0f0;">
        Right-click me
      </div>
      <aegov-context-menu target="#test-target" disabled>
        <button>Edit</button>
        <button>Delete</button>
      </aegov-context-menu>
    `);

    // Right-click the target
    const target = await page.find('#test-target');
    await target.click({ button: 'right' });
    await page.waitForChanges();

    // Menu should not be visible
    const portal = await page.find('.aegov-context-menu-portal');
    const portalHTML = await portal.getProperty('innerHTML');
    expect(portalHTML).toBe('');
  });

  it('should support keyboard navigation with Arrow keys', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div id="test-target" style="width: 200px; height: 200px; background: #f0f0f0;">
        Right-click me
      </div>
      <aegov-context-menu target="#test-target">
        <button id="btn1">Item 1</button>
        <button id="btn2">Item 2</button>
        <button id="btn3">Item 3</button>
      </aegov-context-menu>
    `);

    // Open menu
    const target = await page.find('#test-target');
    await target.click({ button: 'right' });
    await page.waitForChanges();

    // Wait for focus setup
    await new Promise(resolve => setTimeout(resolve, 50));

    // First item should be focused
    let focusedElement = await page.evaluate(() => {
      return document.activeElement?.id;
    });
    expect(focusedElement).toBe('btn1');

    // Press ArrowDown to move to next item
    await page.keyboard.press('ArrowDown');
    await page.waitForChanges();

    focusedElement = await page.evaluate(() => {
      return document.activeElement?.id;
    });
    expect(focusedElement).toBe('btn2');

    // Press ArrowUp to move back
    await page.keyboard.press('ArrowUp');
    await page.waitForChanges();

    focusedElement = await page.evaluate(() => {
      return document.activeElement?.id;
    });
    expect(focusedElement).toBe('btn1');
  });

  it('should activate focused item on Enter key', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div id="test-target" style="width: 200px; height: 200px; background: #f0f0f0;">
        Right-click me
      </div>
      <aegov-context-menu target="#test-target">
        <button id="btn1" onclick="this.setAttribute('data-clicked', 'true')">Item 1</button>
        <button id="btn2">Item 2</button>
      </aegov-context-menu>
    `);

    // Open menu
    const target = await page.find('#test-target');
    await target.click({ button: 'right' });
    await page.waitForChanges();
    await new Promise(resolve => setTimeout(resolve, 50));

    // Press Enter to activate focused item
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    // Check if item was clicked
    const clicked = await page.evaluate(() => {
      const btn = document.querySelector('.aegov-context-menu-portal #btn1');
      return btn?.getAttribute('data-clicked');
    });
    expect(clicked).toBe('true');
  });

  it('should handle offset prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div id="test-target" style="width: 200px; height: 200px; background: #f0f0f0;">
        Right-click me
      </div>
      <aegov-context-menu target="#test-target" offset="20">
        <button>Edit</button>
        <button>Delete</button>
      </aegov-context-menu>
    `);

    // Right-click to open
    const target = await page.find('#test-target');
    await target.click({ button: 'right', clickCount: 1 });
    await page.waitForChanges();
    await new Promise(resolve => setTimeout(resolve, 100));

    // Menu should be positioned with offset
    const menu = await page.find('.aegov-context-menu-portal .context-menu');
    expect(menu).not.toBeNull();
    const menuStyle = await menu.getComputedStyle();
    expect(menuStyle.position).toBe('fixed');
  });

  it('should show menu via show() method', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div id="test-target" style="width: 200px; height: 200px; background: #f0f0f0;">
        Right-click me
      </div>
      <aegov-context-menu target="#test-target">
        <button>Edit</button>
        <button>Delete</button>
      </aegov-context-menu>
    `);

    const contextMenu = await page.find('aegov-context-menu');

    // Programmatically show menu
    await contextMenu.callMethod('show', 150, 200);
    await page.waitForChanges();
    await new Promise(resolve => setTimeout(resolve, 100));

    // Menu should be visible
    const menu = await page.find('.aegov-context-menu-portal .context-menu');
    expect(menu).not.toBeNull();
  });

  it('should close menu via close() method', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div id="test-target" style="width: 200px; height: 200px; background: #f0f0f0;">
        Right-click me
      </div>
      <aegov-context-menu target="#test-target">
        <button>Edit</button>
        <button>Delete</button>
      </aegov-context-menu>
    `);

    const contextMenu = await page.find('aegov-context-menu');

    // Open menu
    await contextMenu.callMethod('show', 150, 200);
    await page.waitForChanges();
    await new Promise(resolve => setTimeout(resolve, 100));

    // Verify menu is open
    let menu = await page.find('.aegov-context-menu-portal .context-menu');
    expect(menu).not.toBeNull();

    // Close menu
    await contextMenu.callMethod('close');
    await page.waitForChanges();

    // Menu should be closed
    const portal = await page.find('.aegov-context-menu-portal');
    const portalHTML = await portal.getProperty('innerHTML');
    expect(portalHTML).toBe('');
  });
});
