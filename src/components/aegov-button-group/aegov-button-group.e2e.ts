import { newE2EPage } from '@stencil/core/testing';

describe('aegov-button-group e2e', () => {
  it('renders with role="group"', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-button-group><aegov-button>A</aegov-button></aegov-button-group>`);
    const group = await page.find('aegov-button-group div');
    expect(group.getAttribute('role')).toBe('group');
    expect(group.className).toContain('aegov-button-group');
  });

  it('applies vertical orientation class', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-button-group orientation="vertical"><aegov-button>A</aegov-button></aegov-button-group>`);
    const group = await page.find('aegov-button-group div');
    expect(group.className).toContain('button-group--vertical');
  });

  it('cascades position props to child buttons', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-button-group>
      <aegov-button>1</aegov-button>
      <aegov-button>2</aegov-button>
      <aegov-button>3</aegov-button>
    </aegov-button-group>`);
    await page.waitForChanges();
    const buttons = await page.findAll('aegov-button-group aegov-button button');
    expect(buttons[0].className).toContain('btn-grouped-first-horizontal');
    expect(buttons[1].className).toContain('btn-grouped-middle-horizontal');
    expect(buttons[2].className).toContain('btn-grouped-last-horizontal');
  });

  it('updates position when orientation changes at runtime', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-button-group>
      <aegov-button>1</aegov-button>
      <aegov-button>2</aegov-button>
    </aegov-button-group>`);
    const host = await page.find('aegov-button-group');
    host.setProperty('orientation', 'vertical');
    await page.waitForChanges();
    const btns = await page.findAll('aegov-button-group aegov-button button');
    expect(btns[0].className).toContain('btn-grouped-vertical');
  });

  it('renders all child buttons via slot', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-button-group>
      <aegov-button>One</aegov-button>
      <aegov-button>Two</aegov-button>
    </aegov-button-group>`);
    const btns = await page.findAll('aegov-button-group aegov-button');
    expect(btns.length).toBe(2);
  });
});
