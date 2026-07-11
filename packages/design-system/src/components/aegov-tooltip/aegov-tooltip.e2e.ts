import { newE2EPage } from '@stencil/core/testing';

describe('aegov-tooltip (e2e)', () => {
  it('renders trigger with default ARIA absent until visible', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-tooltip content="Hello"><button>t</button></aegov-tooltip>');
    const trigger = await page.find('aegov-tooltip .aegov-tooltip-trigger');
    expect(trigger).not.toBeNull();
    expect(trigger.getAttribute('aria-describedby')).toBeNull();
  });

  it('renders tooltip role="tooltip" body when content set', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-tooltip content="Hi"><button>t</button></aegov-tooltip>');
    const tip = await page.find('aegov-tooltip .aegov-tooltip');
    expect(tip).not.toBeNull();
    expect(tip.getAttribute('role')).toBe('tooltip');
  });

  it('shows tooltip on hover', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-tooltip content="Hi" delay-start="0"><button id="t">t</button></aegov-tooltip>');
    await page.hover('#t');
    await new Promise(resolve => setTimeout(resolve, 50));
    await page.waitForChanges();
    const trigger = await page.find('aegov-tooltip .aegov-tooltip-trigger');
    expect(trigger.getAttribute('aria-describedby')).not.toBeNull();
  });

  it('shows tooltip on click when trigger="click"', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-tooltip content="Hi" trigger="click"><button id="t">t</button></aegov-tooltip>');
    await page.click('#t');
    await page.waitForChanges();
    const trigger = await page.find('aegov-tooltip .aegov-tooltip-trigger');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('Escape hides the tooltip', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-tooltip content="Hi" trigger="click"><button id="t">t</button></aegov-tooltip>');
    await page.click('#t');
    await page.waitForChanges();
    await page.keyboard.press('Escape');
    await page.waitForChanges();
    const trigger = await page.find('aegov-tooltip .aegov-tooltip-trigger');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('outside click closes click-triggered tooltip', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div>
        <aegov-tooltip content="Hi" trigger="click"><button id="t">t</button></aegov-tooltip>
        <p id="outside">x</p>
      </div>
    `);
    await page.click('#t');
    await page.waitForChanges();
    await page.click('#outside');
    await page.waitForChanges();
    const trigger = await page.find('aegov-tooltip .aegov-tooltip-trigger');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('disabled tooltip does not show on hover', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-tooltip content="Hi" is-disabled="true" delay-start="0"><button id="t">t</button></aegov-tooltip>');
    await page.hover('#t');
    await new Promise(resolve => setTimeout(resolve, 50));
    await page.waitForChanges();
    const trigger = await page.find('aegov-tooltip .aegov-tooltip-trigger');
    expect(trigger.getAttribute('aria-describedby')).toBeNull();
  });

  it('renders content slot text', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-tooltip><button>t</button><span slot="tooltip-content">Rich content</span></aegov-tooltip>');
    const slotted = await page.find('aegov-tooltip [slot="tooltip-content"]');
    expect(slotted).not.toBeNull();
    expect(slotted.textContent).toContain('Rich content');
  });

  it('applies position class on body element', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-tooltip content="Hi" position="right"><button>t</button></aegov-tooltip>');
    const tip = await page.find('aegov-tooltip .aegov-tooltip');
    expect(tip).toHaveClass('tooltip--right');
  });
});
