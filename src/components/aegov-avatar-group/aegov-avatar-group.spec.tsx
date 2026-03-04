import { newSpecPage } from '@stencil/core/testing';
import { AegovAvatarGroup } from './aegov-avatar-group';
import { AegovAvatar } from '../aegov-avatar/aegov-avatar';

describe('aegov-avatar-group', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group></aegov-avatar-group>`,
    });
    const wrapper = page.root.querySelector('.aegov-avatar-group');
    expect(wrapper).toBeTruthy();
    expect(wrapper.getAttribute('role')).toBe('group');
    expect(wrapper.getAttribute('aria-label')).toBe('Avatar group');
  });

  it('applies default mode class', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group></aegov-avatar-group>`,
    });
    const wrapper = page.root.querySelector('.aegov-avatar-group');
    expect(wrapper.classList.contains('avatar-group--default')).toBe(true);
    expect(wrapper.classList.contains('avatar-group--compact')).toBe(false);
  });

  it('applies compact mode class', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group mode="compact"></aegov-avatar-group>`,
    });
    const wrapper = page.root.querySelector('.aegov-avatar-group');
    expect(wrapper.classList.contains('avatar-group--compact')).toBe(true);
    expect(wrapper.classList.contains('avatar-group--default')).toBe(false);
  });

  it('applies size class to wrapper', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group size="lg"></aegov-avatar-group>`,
    });
    const wrapper = page.root.querySelector('.aegov-avatar-group');
    expect(wrapper.classList.contains('avatar-group--lg')).toBe(true);
  });

  it('does not render more indicator when moreCount is 0', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group></aegov-avatar-group>`,
    });
    const moreBtn = page.root.querySelector('.avatar-group__more');
    expect(moreBtn).toBeNull();
  });

  it('renders more indicator when moreCount > 0', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group more-count="5"></aegov-avatar-group>`,
    });
    const moreBtn = page.root.querySelector('.avatar-group__more');
    expect(moreBtn).toBeTruthy();
    expect(moreBtn.textContent).toBe('5+');
  });

  it('renders custom moreText', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group more-count="99" more-text="99 others"></aegov-avatar-group>`,
    });
    const moreBtn = page.root.querySelector('.avatar-group__more');
    expect(moreBtn.textContent).toBe('99 others');
  });

  it('more button has correct aria-label', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group more-count="3"></aegov-avatar-group>`,
    });
    const moreBtn = page.root.querySelector('.avatar-group__more');
    expect(moreBtn.getAttribute('aria-label')).toBe('Show 3 more users');
  });

  it('more button has type="button"', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group more-count="1"></aegov-avatar-group>`,
    });
    const moreBtn = page.root.querySelector('.avatar-group__more');
    expect(moreBtn.getAttribute('type')).toBe('button');
  });

  it('more button gets size class', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group more-count="2" size="xl"></aegov-avatar-group>`,
    });
    const moreBtn = page.root.querySelector('.avatar-group__more');
    expect(moreBtn.classList.contains('avatar-xl')).toBe(true);
  });

  it('more button gets rounded class when variant is rounded', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group more-count="2" variant="rounded"></aegov-avatar-group>`,
    });
    const moreBtn = page.root.querySelector('.avatar-group__more');
    expect(moreBtn.classList.contains('avatar-rounded')).toBe(true);
  });

  it('more button does not get rounded class when variant is square', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group more-count="2" variant="square"></aegov-avatar-group>`,
    });
    const moreBtn = page.root.querySelector('.avatar-group__more');
    expect(moreBtn.classList.contains('avatar-rounded')).toBe(false);
  });

  it('emits aegovAvatarGroupMore event on more button click', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group more-count="5"></aegov-avatar-group>`,
    });

    const spy = jest.fn();
    page.root.addEventListener('aegovAvatarGroupMore', spy);

    const moreBtn = page.root.querySelector('.avatar-group__more') as HTMLButtonElement;
    moreBtn.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('enforces size on child avatars', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup, AegovAvatar],
      html: `
        <aegov-avatar-group size="lg">
          <aegov-avatar></aegov-avatar>
          <aegov-avatar></aegov-avatar>
        </aegov-avatar-group>
      `,
    });

    const avatars = page.root.querySelectorAll('aegov-avatar');
    avatars.forEach(avatar => {
      expect((avatar as any).size).toBe('lg');
    });
  });

  it('updates child avatar sizes when size prop changes', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup, AegovAvatar],
      html: `
        <aegov-avatar-group size="sm">
          <aegov-avatar></aegov-avatar>
        </aegov-avatar-group>
      `,
    });

    const avatar = page.root.querySelector('aegov-avatar') as any;
    expect(avatar.size).toBe('sm');

    page.root.size = 'xl';
    await page.waitForChanges();

    expect(avatar.size).toBe('xl');
  });

  it('renders slot content', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup, AegovAvatar],
      html: `
        <aegov-avatar-group>
          <aegov-avatar></aegov-avatar>
          <aegov-avatar></aegov-avatar>
          <aegov-avatar></aegov-avatar>
        </aegov-avatar-group>
      `,
    });

    const avatars = page.root.querySelectorAll('aegov-avatar');
    expect(avatars.length).toBe(3);
  });

  it('applies all size classes correctly', async () => {
    const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'];

    for (const size of sizes) {
      const page = await newSpecPage({
        components: [AegovAvatarGroup],
        html: `<aegov-avatar-group size="${size}" more-count="1"></aegov-avatar-group>`,
      });
      const wrapper = page.root.querySelector('.aegov-avatar-group');
      expect(wrapper.classList.contains(`avatar-group--${size}`)).toBe(true);

      const moreBtn = page.root.querySelector('.avatar-group__more');
      expect(moreBtn.classList.contains(`avatar-${size}`)).toBe(true);
    }
  });

  it('renders with both mode and moreCount', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup, AegovAvatar],
      html: `
        <aegov-avatar-group mode="compact" more-count="10" size="lg">
          <aegov-avatar></aegov-avatar>
          <aegov-avatar></aegov-avatar>
        </aegov-avatar-group>
      `,
    });

    const wrapper = page.root.querySelector('.aegov-avatar-group');
    expect(wrapper.classList.contains('avatar-group--compact')).toBe(true);
    expect(wrapper.classList.contains('avatar-group--lg')).toBe(true);

    const moreBtn = page.root.querySelector('.avatar-group__more');
    expect(moreBtn).toBeTruthy();
    expect(moreBtn.textContent).toBe('10+');
  });

  it('does not render more button when moreCount is negative', async () => {
    const page = await newSpecPage({
      components: [AegovAvatarGroup],
      html: `<aegov-avatar-group more-count="-1"></aegov-avatar-group>`,
    });
    const moreBtn = page.root.querySelector('.avatar-group__more');
    expect(moreBtn).toBeNull();
  });
});
