import { newE2EPage } from '@stencil/core/testing';

describe('aegov-navbar-item e2e', () => {
  it('renders link when href provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-navbar><aegov-navbar-item href="/x">Item</aegov-navbar-item></aegov-navbar>`);
    const a = await page.find('aegov-navbar-item a');
    expect(a).not.toBeNull();
    expect(a.getAttribute('href')).toBe('/x');
  });

  it('renders span when no href', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-navbar><aegov-navbar-item>Plain</aegov-navbar-item></aegov-navbar>`);
    const span = await page.find('aegov-navbar-item span.aegov-navbar-item__link');
    expect(span).not.toBeNull();
  });

  it('marks active item with aria-current', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-navbar><aegov-navbar-item href="/" is-active="true">A</aegov-navbar-item></aegov-navbar>`);
    const a = await page.find('aegov-navbar-item a');
    expect(a.getAttribute('aria-current')).toBe('page');
  });

  it('renders disabled item with aria-disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-navbar><aegov-navbar-item is-disabled="true">D</aegov-navbar-item></aegov-navbar>`);
    const span = await page.find('aegov-navbar-item span.aegov-navbar-item__link');
    expect(span.getAttribute('aria-disabled')).toBe('true');
  });

  it('Tab skips a disabled item', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navbar>
        <aegov-navbar-item id="a" href="/a">A</aegov-navbar-item>
        <aegov-navbar-item id="d" href="/d" is-disabled="true">D</aegov-navbar-item>
        <aegov-navbar-item id="c" href="/c">C</aegov-navbar-item>
      </aegov-navbar>
    `);
    await page.waitForChanges();
    await page.focus('#a a');
    await page.keyboard.press('Tab');
    const focusedItem = await page.evaluate(() => document.activeElement?.closest('aegov-navbar-item')?.id);
    expect(focusedItem).toBe('c');
    const disabledTabIndex = await page.$eval('#d .aegov-navbar-item__link', (el: HTMLElement) => el.tabIndex);
    expect(disabledTabIndex).toBe(-1);
  });

  it('disabled item shows the not-allowed cursor', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-navbar><aegov-navbar-item id="d" is-disabled="true">D</aegov-navbar-item></aegov-navbar>`);
    await page.waitForChanges();
    const cursor = await page.$eval('#d div.aegov-navbar-item', (el: HTMLElement) => getComputedStyle(el).cursor);
    expect(cursor).toBe('not-allowed');
  });

  it('re-enabled item drops the not-allowed cursor and becomes focusable', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-navbar><aegov-navbar-item id="d" href="/d" is-disabled="true">D</aegov-navbar-item></aegov-navbar>`);
    await page.waitForChanges();
    await page.$eval('#d', (el: any) => { el.isDisabled = false; });
    await page.waitForChanges();
    const cursor = await page.$eval('#d div.aegov-navbar-item', (el: HTMLElement) => getComputedStyle(el).cursor);
    expect(cursor).not.toBe('not-allowed');
    expect(await page.$('#d a.aegov-navbar-item__link')).not.toBeNull();
  });

  // Regression coverage for #56. The chevron's own CSS previously never set
  // any transform/rotate on open or close, despite the reference docs
  // claiming the rotation was part of the component's behaviour.
  it('rotates the dropdown chevron 180° while the sub-menu is open', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navbar>
        <aegov-navbar-item href="/products">
          Products
          <aegov-dropdown slot="dropdown">
            <a slot="dropdown-content" href="/a">Item A</a>
          </aegov-dropdown>
        </aegov-navbar-item>
      </aegov-navbar>
    `);
    await page.waitForChanges();

    const chevron = await page.find('aegov-navbar-item button.aegov-navbar-item__chevron');
    expect(await chevron.getProperty('ariaExpanded')).toBe('false');

    const beforeRotate = await page.evaluate(() => {
      const svg = document.querySelector('button.aegov-navbar-item__chevron svg');
      return getComputedStyle(svg).rotate;
    });
    expect(beforeRotate).toBe('none');

    await chevron.click();
    await page.waitForChanges();

    expect(await chevron.getProperty('ariaExpanded')).toBe('true');
    const afterRotate = await page.evaluate(() => {
      const svg = document.querySelector('button.aegov-navbar-item__chevron svg');
      return getComputedStyle(svg).rotate;
    });
    expect(afterRotate).toBe('180deg');
  });

  // Regression coverage for #57. handleChevronClick only passed viaKeyboard
  // to dropdown.toggle(), never viaArrow — in disclosure mode (always set
  // for navbar dropdowns), the focus-into-menu decision depends solely on
  // viaArrow, so Enter/Space opened the menu but left focus stranded on the
  // chevron, unlike ArrowDown.
  it('moves focus into the menu on Enter, same as ArrowDown, but not on a mouse click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navbar>
        <aegov-navbar-item href="/products">
          Products
          <aegov-dropdown slot="dropdown">
            <a slot="dropdown-content" href="/a">Item A</a>
          </aegov-dropdown>
        </aegov-navbar-item>
      </aegov-navbar>
    `);
    await page.waitForChanges();

    const chevron = await page.find('aegov-navbar-item button.aegov-navbar-item__chevron');
    await chevron.focus();
    await page.keyboard.press('Enter');
    await page.waitForChanges();
    // setupFocusTrap() runs behind a real setTimeout(..., 0) — waitForChanges()
    // only flushes Stencil's render queue, not real timers.
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(await chevron.getProperty('ariaExpanded')).toBe('true');
    // The dropdown moves its content into a document.body-level portal on
    // open (stripping the slot="dropdown-content" attribute along the way),
    // so check the real menu item directly rather than that attribute.
    const activeAfterEnter = await page.evaluate(() => {
      const el = document.activeElement as HTMLAnchorElement | null;
      return { tag: el?.tagName, href: el?.getAttribute('href') };
    });
    expect(activeAfterEnter.tag).toBe('A');
    expect(activeAfterEnter.href).toBe('/a');

    // Close, then confirm a real mouse click opens it but leaves focus alone.
    await page.keyboard.press('Escape');
    await page.waitForChanges();
    await chevron.click();
    await page.waitForChanges();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(await chevron.getProperty('ariaExpanded')).toBe('true');
    const activeAfterClick = await page.evaluate(() => document.activeElement?.tagName);
    expect(activeAfterClick).toBe('BUTTON');
  });

  it('renders icon-start slot content', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-navbar><aegov-navbar-item href="/x"><svg slot="icon-start" data-icon></svg>Page</aegov-navbar-item></aegov-navbar>`);
    const iconWrap = await page.find('aegov-navbar-item .aegov-navbar-item__icon');
    expect(iconWrap).not.toBeNull();
  });

  it('reflects size class on the item wrapper', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-navbar size="lg"><aegov-navbar-item href="/">X</aegov-navbar-item></aegov-navbar>`);
    await page.waitForChanges();
    const item = await page.find('aegov-navbar-item .aegov-navbar-item');
    expect(item.className).toContain('aegov-navbar-item--lg');
  });
});
