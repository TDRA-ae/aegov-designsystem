import { newSpecPage } from '@stencil/core/testing';
import { AegovDropdown } from './aegov-dropdown';

describe('aegov-dropdown', () => {
  it('renders trigger wrapper with default classes and ARIA', async () => {
    const page = await newSpecPage({
      components: [AegovDropdown],
      html: `<aegov-dropdown><button>Open</button></aegov-dropdown>`,
    });
    const trigger = page.root.querySelector('.aegov-dropdown-trigger');
    expect(trigger).not.toBeNull();
    expect(trigger.getAttribute('aria-haspopup')).toBe('true');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('auto-generates fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovDropdown],
      html: `<aegov-dropdown><button>x</button></aegov-dropdown>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-dropdown-\d+$/);
  });

  it('respects user-provided fieldId and derives trigger id', async () => {
    const page = await newSpecPage({
      components: [AegovDropdown],
      html: `<aegov-dropdown field-id="dd1"><button>x</button></aegov-dropdown>`,
    });
    expect(page.rootInstance.fieldId).toBe('dd1');
    const trigger = page.root.querySelector('.aegov-dropdown-trigger');
    expect(trigger.id).toBe('dd1-trigger');
  });

  it('detects dropdown-content slot', async () => {
    const page = await newSpecPage({
      components: [AegovDropdown],
      html: `<aegov-dropdown><button>t</button><div slot="dropdown-content">menu</div></aegov-dropdown>`,
    });
    expect(page.rootInstance.hasContentSlot).toBe(true);
  });

  it('does not detect content when no slot provided', async () => {
    const page = await newSpecPage({
      components: [AegovDropdown],
      html: `<aegov-dropdown><button>t</button></aegov-dropdown>`,
    });
    expect(page.rootInstance.hasContentSlot).toBe(false);
  });

  it('toggle() opens and closes the dropdown', async () => {
    const page = await newSpecPage({
      components: [AegovDropdown],
      html: `<aegov-dropdown><button>t</button><div slot="dropdown-content">m</div></aegov-dropdown>`,
    });
    await page.rootInstance.toggle();
    await page.waitForChanges();
    expect(page.rootInstance.isOpen).toBe(true);
    await page.rootInstance.toggle();
    await page.waitForChanges();
    expect(page.rootInstance.isOpen).toBe(false);
  });

  it('toggle() does nothing when disabled', async () => {
    const page = await newSpecPage({
      components: [AegovDropdown],
      html: `<aegov-dropdown is-disabled="true"><button>t</button><div slot="dropdown-content">m</div></aegov-dropdown>`,
    });
    await page.rootInstance.toggle();
    await page.waitForChanges();
    expect(page.rootInstance.isOpen).toBe(false);
  });

  it('emits aegovDropdownOpen and aegovDropdownClose', async () => {
    const page = await newSpecPage({
      components: [AegovDropdown],
      html: `<aegov-dropdown><button>t</button><div slot="dropdown-content">m</div></aegov-dropdown>`,
    });
    const openSpy = jest.fn();
    const closeSpy = jest.fn();
    page.root.addEventListener('aegovDropdownOpen', openSpy);
    page.root.addEventListener('aegovDropdownClose', closeSpy);
    await page.rootInstance.toggle();
    await page.waitForChanges();
    expect(openSpy).toHaveBeenCalled();
    await page.rootInstance.toggle();
    await page.waitForChanges();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('aria-expanded updates with state', async () => {
    const page = await newSpecPage({
      components: [AegovDropdown],
      html: `<aegov-dropdown><button>t</button><div slot="dropdown-content">m</div></aegov-dropdown>`,
    });
    await page.rootInstance.toggle();
    await page.waitForChanges();
    const trigger = page.root.querySelector('.aegov-dropdown-trigger');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('passes through data-* attributes onto the trigger', async () => {
    const page = await newSpecPage({
      components: [AegovDropdown],
      html: `<aegov-dropdown data-test="x"><button>t</button></aegov-dropdown>`,
    });
    const trigger = page.root.querySelector('.aegov-dropdown-trigger');
    expect(trigger.getAttribute('data-test')).toBe('x');
  });

  it('accepts custom position, align, gap and trigger props', async () => {
    const page = await newSpecPage({
      components: [AegovDropdown],
      html: `<aegov-dropdown position="top" align="end" gap="12" trigger="hover"><button>t</button></aegov-dropdown>`,
    });
    expect(page.rootInstance.position).toBe('top');
    expect(page.rootInstance.align).toBe('end');
    expect(page.rootInstance.gap).toBe(12);
    expect(page.rootInstance.trigger).toBe('hover');
  });
});
