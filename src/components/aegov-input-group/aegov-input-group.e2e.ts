import { newE2EPage } from '@stencil/core/testing';

describe('aegov-input-group E2E', () => {
  describe('rendering', () => {
    it('should render the group container', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input-group></aegov-input-group>`);
      const group = await page.find('aegov-input-group .aegov-input-group');
      expect(group).toBeTruthy();
    });

    it('should render with default size base', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input-group></aegov-input-group>`);
      const group = await page.find('aegov-input-group .aegov-input-group');
      expect(await group.getAttribute('class')).toContain('input-group--base');
    });
  });

  describe('text prefix', () => {
    it('should display text prefix', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input-group addon-prefix="https://"><aegov-input></aegov-input></aegov-input-group>`);
      const addon = await page.find('aegov-input-group .input-group__addon--prefix');
      expect(addon).toBeTruthy();
      expect(await addon.getProperty('textContent')).toBe('https://');
    });

    it('should not render prefix when not set', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input-group><aegov-input></aegov-input></aegov-input-group>`);
      const addon = await page.find('aegov-input-group .input-group__addon--prefix');
      expect(addon).toBeNull();
    });
  });

  describe('text suffix', () => {
    it('should display text suffix', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input-group addon-suffix="@gmail.com"><aegov-input></aegov-input></aegov-input-group>`);
      const addon = await page.find('aegov-input-group .input-group__addon--suffix');
      expect(addon).toBeTruthy();
      expect(await addon.getProperty('textContent')).toBe('@gmail.com');
    });
  });

  describe('size prop', () => {
    it('should apply sm size class', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input-group size="sm"></aegov-input-group>`);
      const group = await page.find('aegov-input-group .aegov-input-group');
      expect(await group.getAttribute('class')).toContain('input-group--sm');
    });

    it('should apply lg size class', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input-group size="lg"></aegov-input-group>`);
      const group = await page.find('aegov-input-group .aegov-input-group');
      expect(await group.getAttribute('class')).toContain('input-group--lg');
    });
  });

  describe('size propagation', () => {
    it('should propagate size to child aegov-input', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input-group size="lg">
          <aegov-input></aegov-input>
        </aegov-input-group>
      `);
      await page.waitForChanges();
      const input = await page.find('aegov-input-group aegov-input');
      expect(await input.getProperty('size')).toBe('lg');
    });

    it('should propagate size to child aegov-button', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input-group size="sm">
          <aegov-input></aegov-input>
          <aegov-button variant="solid">Go</aegov-button>
        </aegov-input-group>
      `);
      await page.waitForChanges();
      const button = await page.find('aegov-input-group aegov-button');
      expect(await button.getProperty('size')).toBe('sm');
    });
  });

  describe('input interaction inside group', () => {
    it('should allow typing in the input', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input-group addon-prefix="https://">
          <aegov-input placeholder="example.com"></aegov-input>
        </aegov-input-group>
      `);
      const input = await page.find('aegov-input-group aegov-input input');
      await input.type('example.com');
      expect(await input.getProperty('value')).toBe('example.com');
    });

    it('should emit aegovInputInput event when typing', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input-group>
          <aegov-input></aegov-input>
        </aegov-input-group>
      `);
      const inputEvent = await page.spyOnEvent('aegovInputInput');
      const nativeInput = await page.find('aegov-input-group aegov-input input');
      await nativeInput.type('hi');
      expect(inputEvent).toHaveReceivedEvent();
    });
  });

  describe('button interaction inside group', () => {
    it('should emit click event on button inside group', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input-group>
          <aegov-input type="search" placeholder="Search"></aegov-input>
          <aegov-button variant="solid">Go</aegov-button>
        </aegov-input-group>
      `);
      const clickEvent = await page.spyOnEvent('aegovButtonClick');
      const button = await page.find('aegov-input-group aegov-button .aegov-btn');
      await button.click();
      expect(clickEvent).toHaveReceivedEvent();
    });
  });

  describe('native select inside group', () => {
    it('should render native select', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input-group>
          <select><option value="+971">+971</option><option value="+1">+1</option></select>
          <aegov-input type="tel" placeholder="Phone"></aegov-input>
        </aegov-input-group>
      `);
      const select = await page.find('aegov-input-group select');
      expect(select).toBeTruthy();
    });
  });

  describe('password toggle inside group', () => {
    it('should still show password toggle inside group', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input-group>
          <aegov-input type="password" password-toggle></aegov-input>
        </aegov-input-group>
      `);
      const toggle = await page.find('aegov-input-group aegov-input .input__password-toggle');
      expect(toggle).toBeTruthy();
    });

    it('should toggle password visibility inside group', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input-group>
          <aegov-input type="password" password-toggle></aegov-input>
        </aegov-input-group>
      `);
      const nativeInput = await page.find('aegov-input-group aegov-input input');
      expect(await nativeInput.getAttribute('type')).toBe('password');

      const toggle = await page.find('aegov-input-group aegov-input .input__password-toggle');
      await toggle.click();
      await page.waitForChanges();
      expect(await nativeInput.getAttribute('type')).toBe('text');
    });
  });

  describe('combined prefix and suffix', () => {
    it('should render text prefix with button suffix', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input-group addon-prefix="$">
          <aegov-input type="number" placeholder="0.00"></aegov-input>
          <aegov-button variant="solid">Pay</aegov-button>
        </aegov-input-group>
      `);
      const prefix = await page.find('aegov-input-group .input-group__addon--prefix');
      const button = await page.find('aegov-input-group aegov-button');
      expect(prefix).toBeTruthy();
      expect(await prefix.getProperty('textContent')).toBe('$');
      expect(button).toBeTruthy();
    });
  });
});
