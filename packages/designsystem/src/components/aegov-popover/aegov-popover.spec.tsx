import { newSpecPage } from '@stencil/core/testing';
import { AegovPopover } from './aegov-popover';

describe('aegov-popover', () => {
  it('renders trigger wrapper with default ARIA', async () => {
    const page = await newSpecPage({
      components: [AegovPopover],
      html: `<aegov-popover><button>Open</button></aegov-popover>`,
    });
    const trigger = page.root.querySelector('.aegov-popover-trigger');
    expect(trigger).not.toBeNull();
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('auto-generates fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovPopover],
      html: `<aegov-popover><button>x</button></aegov-popover>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-popover-\d+$/);
  });

  it('respects user-provided fieldId and derives trigger id', async () => {
    const page = await newSpecPage({
      components: [AegovPopover],
      html: `<aegov-popover field-id="pop1"><button>x</button></aegov-popover>`,
    });
    expect(page.rootInstance.fieldId).toBe('pop1');
    const trigger = page.root.querySelector('.aegov-popover-trigger');
    expect(trigger.id).toBe('pop1-trigger');
  });

  it('detects popover-content slot', async () => {
    const page = await newSpecPage({
      components: [AegovPopover],
      html: `<aegov-popover><button>t</button><div slot="popover-content">info</div></aegov-popover>`,
    });
    expect(page.rootInstance.hasContentSlot).toBe(true);
  });

  it('does not detect content when no slot provided', async () => {
    const page = await newSpecPage({
      components: [AegovPopover],
      html: `<aegov-popover><button>t</button></aegov-popover>`,
    });
    expect(page.rootInstance.hasContentSlot).toBe(false);
  });

  it('emits aegovPopoverOpen and Close', async () => {
    const page = await newSpecPage({
      components: [AegovPopover],
      html: `<aegov-popover><button>t</button><div slot="popover-content">x</div></aegov-popover>`,
    });
    const openSpy = jest.fn();
    const closeSpy = jest.fn();
    page.root.addEventListener('aegovPopoverOpen', openSpy);
    page.root.addEventListener('aegovPopoverClose', closeSpy);
    page.rootInstance.isOpen = true;
    await page.waitForChanges();
    expect(openSpy).toHaveBeenCalled();
    page.rootInstance.isOpen = false;
    await page.waitForChanges();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('aria-expanded reflects state', async () => {
    const page = await newSpecPage({
      components: [AegovPopover],
      html: `<aegov-popover><button>t</button><div slot="popover-content">x</div></aegov-popover>`,
    });
    page.rootInstance.isOpen = true;
    await page.waitForChanges();
    const trigger = page.root.querySelector('.aegov-popover-trigger');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('accepts position, align, gap and trigger props', async () => {
    const page = await newSpecPage({
      components: [AegovPopover],
      html: `<aegov-popover position="left" align="start" gap="20" trigger="hover"><button>t</button></aegov-popover>`,
    });
    expect(page.rootInstance.position).toBe('left');
    expect(page.rootInstance.align).toBe('start');
    expect(page.rootInstance.gap).toBe(20);
    expect(page.rootInstance.trigger).toBe('hover');
  });

  it('closePopover() sets isOpen to false', async () => {
    const page = await newSpecPage({
      components: [AegovPopover],
      html: `<aegov-popover><button>t</button><div slot="popover-content">x</div></aegov-popover>`,
    });
    page.rootInstance.isOpen = true;
    await page.waitForChanges();
    page.rootInstance.closePopover();
    await page.waitForChanges();
    expect(page.rootInstance.isOpen).toBe(false);
  });

  it('disabled popover does not open via click', async () => {
    const page = await newSpecPage({
      components: [AegovPopover],
      html: `<aegov-popover is-disabled="true"><button>t</button><div slot="popover-content">x</div></aegov-popover>`,
    });
    const trigger = page.root.querySelector('.aegov-popover-trigger') as HTMLElement;
    trigger.click();
    await page.waitForChanges();
    expect(page.rootInstance.isOpen).toBe(false);
  });
});
