import { newE2EPage } from '@stencil/core/testing';

describe('aegov-accordion (e2e)', () => {
  it('makes the host element display:block (regression test for issue #21 — :host is dead CSS on a shadow:false/scoped:false component)', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-accordion><aegov-accordion-item heading="One">A</aegov-accordion-item></aegov-accordion>`);
    const display = await page.evaluate(() => getComputedStyle(document.querySelector('aegov-accordion')).display);
    expect(display).toBe('block');
  });

  it('renders the accordion wrapper with items', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-accordion>
        <aegov-accordion-item heading="One">A</aegov-accordion-item>
        <aegov-accordion-item heading="Two">B</aegov-accordion-item>
      </aegov-accordion>
    `);
    const wrapper = await page.find('aegov-accordion .aegov-accordion');
    expect(wrapper).not.toBeNull();
    const items = await page.findAll('aegov-accordion aegov-accordion-item');
    expect(items.length).toBe(2);
  });

  it('clicking an item header toggles open state', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-accordion>
        <aegov-accordion-item heading="One">Body</aegov-accordion-item>
      </aegov-accordion>
    `);
    const btn = await page.find('aegov-accordion-item button.accordion-item__header');
    expect(btn.getAttribute('aria-expanded')).toBe('false');
    await btn.click();
    await page.waitForChanges();
    expect(btn.getAttribute('aria-expanded')).toBe('true');
    await btn.click();
    await page.waitForChanges();
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });

  it('only one item is open at a time by default', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-accordion>
        <aegov-accordion-item heading="A">A</aegov-accordion-item>
        <aegov-accordion-item heading="B">B</aegov-accordion-item>
      </aegov-accordion>
    `);
    const btns = await page.findAll('aegov-accordion-item button.accordion-item__header');
    await btns[0].click();
    await page.waitForChanges();
    expect(btns[0].getAttribute('aria-expanded')).toBe('true');
    await btns[1].click();
    await page.waitForChanges();
    expect(btns[0].getAttribute('aria-expanded')).toBe('false');
    expect(btns[1].getAttribute('aria-expanded')).toBe('true');
  });

  it('allows multiple items open when is-multiple', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-accordion is-multiple="true">
        <aegov-accordion-item heading="A">A</aegov-accordion-item>
        <aegov-accordion-item heading="B">B</aegov-accordion-item>
      </aegov-accordion>
    `);
    const btns = await page.findAll('aegov-accordion-item button.accordion-item__header');
    await btns[0].click();
    await btns[1].click();
    await page.waitForChanges();
    expect(btns[0].getAttribute('aria-expanded')).toBe('true');
    expect(btns[1].getAttribute('aria-expanded')).toBe('true');
  });

  it('opens the default-open index initially', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-accordion default-open="1">
        <aegov-accordion-item heading="A">A</aegov-accordion-item>
        <aegov-accordion-item heading="B">B</aegov-accordion-item>
      </aegov-accordion>
    `);
    const btns = await page.findAll('aegov-accordion-item button.accordion-item__header');
    expect(btns[0].getAttribute('aria-expanded')).toBe('false');
    expect(btns[1].getAttribute('aria-expanded')).toBe('true');
  });

  it('keyboard Enter and Space toggle the item', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-accordion>
        <aegov-accordion-item heading="A">A</aegov-accordion-item>
      </aegov-accordion>
    `);
    const btn = await page.find('aegov-accordion-item button.accordion-item__header');
    await btn.focus();
    await page.keyboard.press('Enter');
    await page.waitForChanges();
    expect(btn.getAttribute('aria-expanded')).toBe('true');
    await page.keyboard.press(' ');
    await page.waitForChanges();
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });

  it('does not toggle when item is disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-accordion>
        <aegov-accordion-item heading="A" is-disabled="true">A</aegov-accordion-item>
      </aegov-accordion>
    `);
    const btn = await page.find('aegov-accordion-item button.accordion-item__header');
    await btn.click();
    await page.waitForChanges();
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });

  it('reflects bordered modifier class', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-accordion is-bordered="true"></aegov-accordion>');
    const wrapper = await page.find('aegov-accordion .aegov-accordion');
    expect(wrapper).toHaveClass('aegov-accordion__bordered');
  });
});
