import { newSpecPage } from '@stencil/core/testing';
import { AegovTooltip } from './aegov-tooltip';

describe('aegov-tooltip', () => {
  it('renders trigger wrapper', async () => {
    const page = await newSpecPage({
      components: [AegovTooltip],
      html: `<aegov-tooltip content="Hello"><button>x</button></aegov-tooltip>`,
    });
    const trigger = page.root.querySelector('.aegov-tooltip-trigger');
    expect(trigger).not.toBeNull();
  });

  it('does not render tooltip body when content/slot empty', async () => {
    const page = await newSpecPage({
      components: [AegovTooltip],
      html: `<aegov-tooltip><button>x</button></aegov-tooltip>`,
    });
    expect(page.root.querySelector('.aegov-tooltip')).toBeNull();
  });

  it('renders tooltip body when content prop set (hidden until visible)', async () => {
    const page = await newSpecPage({
      components: [AegovTooltip],
      html: `<aegov-tooltip content="Tip text"><button>x</button></aegov-tooltip>`,
    });
    const tip = page.root.querySelector('.aegov-tooltip') as HTMLElement;
    expect(tip).not.toBeNull();
    expect(tip.getAttribute('role')).toBe('tooltip');
    // Hidden with visibility rather than display, so the bubble keeps its measured size
    // for positioning while out of view.
    expect(tip.style.visibility).toBe('hidden');
  });

  it('detects tooltip-content slot', async () => {
    const page = await newSpecPage({
      components: [AegovTooltip],
      html: `<aegov-tooltip><button>x</button><span slot="tooltip-content">rich</span></aegov-tooltip>`,
    });
    expect(page.rootInstance.hasContentSlot).toBe(true);
  });

  it('applies position class', async () => {
    const page = await newSpecPage({
      components: [AegovTooltip],
      html: `<aegov-tooltip content="x" position="bottom"><button>t</button></aegov-tooltip>`,
    });
    const tip = page.root.querySelector('.aegov-tooltip');
    expect(tip.className).toContain('tooltip--bottom');
  });

  it('applies align class', async () => {
    const page = await newSpecPage({
      components: [AegovTooltip],
      html: `<aegov-tooltip content="x" align="start"><button>t</button></aegov-tooltip>`,
    });
    const tip = page.root.querySelector('.aegov-tooltip');
    expect(tip.className).toContain('tooltip--align-start');
  });

  it('shows on visibility state change', async () => {
    const page = await newSpecPage({
      components: [AegovTooltip],
      html: `<aegov-tooltip content="x"><button>t</button></aegov-tooltip>`,
    });
    page.rootInstance.isVisible = true;
    await page.waitForChanges();
    const tip = page.root.querySelector('.aegov-tooltip') as HTMLElement;
    expect(tip.style.visibility).not.toBe('hidden');
  });

  it('aria-describedby populates when visible', async () => {
    const page = await newSpecPage({
      components: [AegovTooltip],
      html: `<aegov-tooltip content="x"><button>t</button></aegov-tooltip>`,
    });
    page.rootInstance.isVisible = true;
    await page.waitForChanges();
    // aria-describedby is applied to the slotted trigger element — the thing that actually
    // receives focus — not to the wrapper div.
    const slottedTrigger = page.root.querySelector('.aegov-tooltip-trigger button');
    const tip = page.root.querySelector('.aegov-tooltip');
    expect(slottedTrigger.getAttribute('aria-describedby')).toBe(tip.id);
  });

  it('does not use aria-expanded for either trigger mode', async () => {
    // A tooltip is a description, not a disclosure: the content is linked with
    // aria-describedby and is therefore always available to assistive technology,
    // so no expanded/collapsed state is exposed.
    for (const trigger of ['click', 'hover']) {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip trigger="${trigger}" content="x"><button>t</button></aegov-tooltip>`,
      });
      expect(page.root.querySelector('.aegov-tooltip-trigger').getAttribute('aria-expanded')).toBeNull();
      expect(page.root.querySelector('.aegov-tooltip-trigger button').getAttribute('aria-expanded')).toBeNull();
    }
  });

  it('disabled tooltip does not show via showTooltip', async () => {
    const page = await newSpecPage({
      components: [AegovTooltip],
      html: `<aegov-tooltip content="x" is-disabled="true"><button>t</button></aegov-tooltip>`,
    });
    // Simulate trigger mouse enter
    const trigger = page.root.querySelector('.aegov-tooltip-trigger') as HTMLElement;
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    await page.waitForChanges();
    expect(page.rootInstance.isVisible).toBe(false);
  });

  it('escape key hides tooltip when visible', async () => {
    const page = await newSpecPage({
      components: [AegovTooltip],
      html: `<aegov-tooltip content="x"><button>t</button></aegov-tooltip>`,
    });
    page.rootInstance.isVisible = true;
    await page.waitForChanges();
    page.rootInstance.handleKeyDown(new KeyboardEvent('keydown', { key: 'Escape' }));
    await page.waitForChanges();
    expect(page.rootInstance.isVisible).toBe(false);
  });

  it('passes through data-* attributes onto the trigger', async () => {
    const page = await newSpecPage({
      components: [AegovTooltip],
      html: `<aegov-tooltip content="x" data-test="abc"><button>t</button></aegov-tooltip>`,
    });
    const trigger = page.root.querySelector('.aegov-tooltip-trigger');
    expect(trigger.getAttribute('data-test')).toBe('abc');
  });
});
