import { newE2EPage } from '@stencil/core/testing';

describe('aegov-avatar-group e2e', () => {
  it('renders in the DOM', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-avatar-group></aegov-avatar-group>`);
    const el = await page.find('aegov-avatar-group');
    expect(el).not.toBeNull();
  });

  it('renders child avatars in default mode with gap', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-avatar-group>
        <aegov-avatar></aegov-avatar>
        <aegov-avatar></aegov-avatar>
      </aegov-avatar-group>
    `);
    const wrapper = await page.find('aegov-avatar-group .aegov-avatar-group');
    expect(wrapper).toHaveClass('avatar-group--default');
  });

  it('renders child avatars in compact mode', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-avatar-group variant="compact">
        <aegov-avatar></aegov-avatar>
        <aegov-avatar></aegov-avatar>
      </aegov-avatar-group>
    `);
    const wrapper = await page.find('aegov-avatar-group .aegov-avatar-group');
    expect(wrapper).toHaveClass('avatar-group--compact');
  });

  it('enforces size on child avatars', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-avatar-group size="xl">
        <aegov-avatar></aegov-avatar>
        <aegov-avatar></aegov-avatar>
      </aegov-avatar-group>
    `);
    const avatars = await page.findAll('aegov-avatar-group aegov-avatar .aegov-avatar');
    for (const avatar of avatars) {
      expect(avatar).toHaveClass('avatar-xl');
    }
  });

  it('renders more indicator with correct text', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-avatar-group more-count="7">
        <aegov-avatar></aegov-avatar>
      </aegov-avatar-group>
    `);
    const moreBtn = await page.find('aegov-avatar-group .avatar-group__more');
    expect(moreBtn).not.toBeNull();
    expect(moreBtn.textContent).toBe('7+');
  });

  it('renders custom more text', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-avatar-group more-count="42" more-text="42 others">
        <aegov-avatar></aegov-avatar>
      </aegov-avatar-group>
    `);
    const moreBtn = await page.find('aegov-avatar-group .avatar-group__more');
    expect(moreBtn.textContent).toBe('42 others');
  });

  it('fires aegovAvatarGroupMore event on more click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-avatar-group more-count="5">
        <aegov-avatar></aegov-avatar>
      </aegov-avatar-group>
    `);
    const spy = await page.spyOnEvent('aegovAvatarGroupMore');
    const moreBtn = await page.find('aegov-avatar-group .avatar-group__more');
    await moreBtn.click();
    expect(spy).toHaveReceivedEventTimes(1);
  });

  it('does not show more button when moreCount is 0', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-avatar-group>
        <aegov-avatar></aegov-avatar>
      </aegov-avatar-group>
    `);
    const moreBtn = await page.find('aegov-avatar-group .avatar-group__more');
    expect(moreBtn).toBeNull();
  });

  it('more button has correct aria-label', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-avatar-group more-count="12">
        <aegov-avatar></aegov-avatar>
      </aegov-avatar-group>
    `);
    const moreBtn = await page.find('aegov-avatar-group .avatar-group__more');
    const ariaLabel = await moreBtn.getAttribute('aria-label');
    expect(ariaLabel).toBe('Show 12 more users');
  });

  it('more button gets rounded class for rounded variant', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-avatar-group more-count="3" variant="rounded">
        <aegov-avatar></aegov-avatar>
      </aegov-avatar-group>
    `);
    const moreBtn = await page.find('aegov-avatar-group .avatar-group__more');
    expect(moreBtn).toHaveClass('avatar-rounded');
  });

  it('more button does not get rounded class for square variant', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-avatar-group more-count="3" variant="square">
        <aegov-avatar></aegov-avatar>
      </aegov-avatar-group>
    `);
    const moreBtn = await page.find('aegov-avatar-group .avatar-group__more');
    expect(moreBtn).not.toHaveClass('avatar-rounded');
  });

  it('more button matches the size prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-avatar-group more-count="2" size="2xl">
        <aegov-avatar></aegov-avatar>
      </aegov-avatar-group>
    `);
    const moreBtn = await page.find('aegov-avatar-group .avatar-group__more');
    expect(moreBtn).toHaveClass('avatar-2xl');
  });

  it('more button is focusable', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-avatar-group more-count="5">
        <aegov-avatar></aegov-avatar>
      </aegov-avatar-group>
    `);
    const moreBtn = await page.find('aegov-avatar-group .avatar-group__more');
    await moreBtn.focus();
    const focused = await page.evaluate(() => document.activeElement?.classList.contains('avatar-group__more'));
    expect(focused).toBe(true);
  });

  it('wrapper has role="group"', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-avatar-group></aegov-avatar-group>`);
    const wrapper = await page.find('aegov-avatar-group .aegov-avatar-group');
    expect(await wrapper.getAttribute('role')).toBe('group');
  });

  it('renders multiple avatars with images in compact mode', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-avatar-group variant="compact" size="lg" more-count="3">
        <aegov-avatar src="https://example.com/1.jpg"></aegov-avatar>
        <aegov-avatar src="https://example.com/2.jpg"></aegov-avatar>
        <aegov-avatar src="https://example.com/3.jpg"></aegov-avatar>
      </aegov-avatar-group>
    `);
    const avatars = await page.findAll('aegov-avatar-group aegov-avatar');
    expect(avatars.length).toBe(3);
    const moreBtn = await page.find('aegov-avatar-group .avatar-group__more');
    expect(moreBtn.textContent).toBe('3+');
  });
});
