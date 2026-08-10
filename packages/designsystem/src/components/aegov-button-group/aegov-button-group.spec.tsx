import { newSpecPage } from '@stencil/core/testing';
import { AegovButtonGroup } from './aegov-button-group';
import { AegovButton } from '../aegov-button/aegov-button';

describe('aegov-button-group', () => {
  it('renders with default horizontal orientation', async () => {
    const page = await newSpecPage({
      components: [AegovButtonGroup, AegovButton],
      html: `<aegov-button-group><aegov-button>A</aegov-button></aegov-button-group>`,
    });
    const div = page.root.querySelector('div');
    expect(div).not.toBeNull();
    expect(div.getAttribute('role')).toBe('group');
    expect(div.className).toContain('aegov-button-group');
    expect(div.className).toContain('button-group--horizontal');
  });

  it('applies vertical orientation class', async () => {
    const page = await newSpecPage({
      components: [AegovButtonGroup, AegovButton],
      html: `<aegov-button-group orientation="vertical"><aegov-button>A</aegov-button></aegov-button-group>`,
    });
    expect(page.root.querySelector('div').className).toContain('button-group--vertical');
  });

  it('sets groupPosition to "single" for one button', async () => {
    const page = await newSpecPage({
      components: [AegovButtonGroup, AegovButton],
      html: `<aegov-button-group><aegov-button>A</aegov-button></aegov-button-group>`,
    });
    const btn = page.root.querySelector('aegov-button') as any;
    expect(btn.groupPosition).toBe('single');
    expect(btn.groupOrientation).toBe('horizontal');
  });

  it('sets first/middle/last positions across multiple buttons', async () => {
    const page = await newSpecPage({
      components: [AegovButtonGroup, AegovButton],
      html: `<aegov-button-group>
        <aegov-button>1</aegov-button>
        <aegov-button>2</aegov-button>
        <aegov-button>3</aegov-button>
      </aegov-button-group>`,
    });
    const btns = page.root.querySelectorAll('aegov-button');
    expect((btns[0] as any).groupPosition).toBe('first');
    expect((btns[1] as any).groupPosition).toBe('middle');
    expect((btns[2] as any).groupPosition).toBe('last');
  });

  it('passes orientation to children', async () => {
    const page = await newSpecPage({
      components: [AegovButtonGroup, AegovButton],
      html: `<aegov-button-group orientation="vertical">
        <aegov-button>1</aegov-button>
        <aegov-button>2</aegov-button>
      </aegov-button-group>`,
    });
    const btns = page.root.querySelectorAll('aegov-button');
    expect((btns[0] as any).groupOrientation).toBe('vertical');
    expect((btns[1] as any).groupOrientation).toBe('vertical');
  });

  it('warns about non-button children', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    await newSpecPage({
      components: [AegovButtonGroup, AegovButton],
      html: `<aegov-button-group><span>Bad</span><aegov-button>Ok</aegov-button></aegov-button-group>`,
    });
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it('tolerates a wrapping <div> without warning', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    await newSpecPage({
      components: [AegovButtonGroup, AegovButton],
      html: `<aegov-button-group><div><aegov-button>Ok</aegov-button></div></aegov-button-group>`,
    });
    // `div` is explicitly allowed by validateChildren so consumers can group buttons
    // inside a layout wrapper.
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders default slot for buttons', async () => {
    const page = await newSpecPage({
      components: [AegovButtonGroup, AegovButton],
      html: `<aegov-button-group>
        <aegov-button>1</aegov-button>
        <aegov-button>2</aegov-button>
      </aegov-button-group>`,
    });
    const btns = page.root.querySelectorAll('aegov-button');
    expect(btns.length).toBe(2);
  });
});
