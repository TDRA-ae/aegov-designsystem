import { newE2EPage } from '@stencil/core/testing';

describe('aegov-avatar-group (e2e)', () => {
  it('renders with default classes', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-avatar-group></aegov-avatar-group>');
    const wrap = await page.find('aegov-avatar-group div');
    expect(wrap).toHaveClass('aegov-avatar-group');
    expect(wrap).toHaveClass('avatar-group--default');
    expect(wrap.getAttribute('role')).toBe('group');
  });

  it('applies compact variant', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-avatar-group variant="compact"></aegov-avatar-group>');
    const wrap = await page.find('aegov-avatar-group div');
    expect(wrap).toHaveClass('avatar-group--compact');
  });

  it('does not show more button by default', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-avatar-group></aegov-avatar-group>');
    const btn = await page.find('aegov-avatar-group button.avatar-group__more');
    expect(btn).toBeNull();
  });

  it('shows more button and label when moreCount set', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-avatar-group more-count="5"></aegov-avatar-group>');
    const btn = await page.find('aegov-avatar-group button.avatar-group__more');
    expect(btn).not.toBeNull();
    expect(btn.textContent).toBe('5+');
    expect(btn.getAttribute('aria-label')).toBe('Show 5 more users');
  });

  it('emits aegovAvatarGroupMore when more clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-avatar-group more-count="3"></aegov-avatar-group>');
    const el = await page.find('aegov-avatar-group');
    const spy = await el.spyOnEvent('aegovAvatarGroupMore');
    const btn = await page.find('aegov-avatar-group button.avatar-group__more');
    await btn.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
  });

  it('forces nested avatars to rounded appearance', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-avatar-group>
        <aegov-avatar appearance="square"></aegov-avatar>
        <aegov-avatar></aegov-avatar>
      </aegov-avatar-group>
    `);
    await page.waitForChanges();
    const appearance = await page.$eval('aegov-avatar-group aegov-avatar', (el: any) => el.appearance);
    expect(appearance).toBe('rounded');
  });
});
