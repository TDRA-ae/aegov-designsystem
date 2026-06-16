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
    expect(tip.style.display).toBe('none');
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
    expect(tip.style.display).toBe('block');
  });

  it('aria-describedby populates when visible', async () => {
    const page = await newSpecPage({
      components: [AegovTooltip],
      html: `<aegov-tooltip content="x"><button>t</button></aegov-tooltip>`,
    });
    page.rootInstance.isVisible = true;
    await page.waitForChanges();
    const trigger = page.root.querySelector('.aegov-tooltip-trigger');
    const tip = page.root.querySelector('.aegov-tooltip');
    expect(trigger.getAttribute('aria-describedby')).toBe(tip.id);
  });

  it('aria-expanded is set only for click trigger', async () => {
    const click = await newSpecPage({
      components: [AegovTooltip],
      html: `<aegov-tooltip trigger="click" content="x"><button>t</button></aegov-tooltip>`,
    });
    expect(click.root.querySelector('.aegov-tooltip-trigger').getAttribute('aria-expanded')).toBe('false');

    const hover = await newSpecPage({
      components: [AegovTooltip],
      html: `<aegov-tooltip trigger="hover" content="x"><button>t</button></aegov-tooltip>`,
    });
    expect(hover.root.querySelector('.aegov-tooltip-trigger').getAttribute('aria-expanded')).toBeNull();
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
