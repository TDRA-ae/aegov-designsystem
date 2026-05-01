import { newSpecPage } from '@stencil/core/testing';
import { AegovAvatarGroup } from './aegov-avatar-group';
import { AegovAvatar } from '../aegov-avatar/aegov-avatar';

describe('aegov-avatar-group', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group></aegov-avatar-group>`,
    });
    const wrap = page.root.querySelector('div');
    expect(wrap).not.toBeNull();
    expect(wrap.className).toContain('aegov-avatar-group');
    expect(wrap.className).toContain('avatar-group--default');
    expect(wrap.className).toContain('avatar-group--base');
    expect(wrap.getAttribute('role')).toBe('group');
    expect(wrap.getAttribute('aria-label')).toBe('Avatar group');
  });

  it('applies compact variant class', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group variant="compact"></aegov-avatar-group>`,
    });
    expect(page.root.querySelector('div').className).toContain('avatar-group--compact');
  });

  it('does not render more button when moreCount is 0', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group></aegov-avatar-group>`,
    });
    expect(page.root.querySelector('button.avatar-group__more')).toBeNull();
  });

  it('renders more button when moreCount > 0', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group more-count="5"></aegov-avatar-group>`,
    });
    const btn = page.root.querySelector('button.avatar-group__more');
    expect(btn).not.toBeNull();
    expect(btn.textContent).toBe('5+');
    expect(btn.getAttribute('aria-label')).toBe('Show 5 more users');
    expect(btn.className).toContain('avatar-rounded');
  });

  it('respects custom moreText', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group more-count="3" more-text="and more"></aegov-avatar-group>`,
    });
    expect(page.root.querySelector('button.avatar-group__more').textContent).toBe('and more');
  });

  it('emits aegovAvatarGroupMore on more button click', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group more-count="2"></aegov-avatar-group>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovAvatarGroupMore', spy);
    (page.root.querySelector('button.avatar-group__more') as HTMLButtonElement).click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('forces child avatars to rounded appearance and size', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup, AegovAvatar],
      html: `
        <aegov-avatar-group size="lg">
          <aegov-avatar appearance="square"></aegov-avatar>
          <aegov-avatar></aegov-avatar>
        </aegov-avatar-group>
      `,
    });
    const avatars = page.root.querySelectorAll('aegov-avatar');
    avatars.forEach(a => {
      expect((a as HTMLAegovAvatarElement).appearance).toBe('rounded');
      expect((a as HTMLAegovAvatarElement).size).toBe('lg');
    });
  });
});
