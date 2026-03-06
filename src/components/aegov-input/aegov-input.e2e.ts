import { newE2EPage } from '@stencil/core/testing';

describe('aegov-input E2E', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input></aegov-input>`);
      const element = await page.find('aegov-input');
      expect(element).toBeTruthy();
    });

    it('should render a native input element', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input></aegov-input>`);
      const input = await page.find('aegov-input input');
      expect(input).toBeTruthy();
    });

    it('should have aegov-input class on native input', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input></aegov-input>`);
      const input = await page.find('aegov-input input');
      expect(await input.getAttribute('class')).toContain('aegov-input');
    });
  });

  describe('type prop', () => {
    it('should render type=email', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input type="email"></aegov-input>`);
      const input = await page.find('aegov-input input');
      expect(await input.getAttribute('type')).toBe('email');
    });

    it('should render type=password', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input type="password"></aegov-input>`);
      const input = await page.find('aegov-input input');
      expect(await input.getAttribute('type')).toBe('password');
    });

    it('should render type=number', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input type="number"></aegov-input>`);
      const input = await page.find('aegov-input input');
      expect(await input.getAttribute('type')).toBe('number');
    });

    it('should render type=tel', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input type="tel"></aegov-input>`);
      const input = await page.find('aegov-input input');
      expect(await input.getAttribute('type')).toBe('tel');
    });

    it('should render type=date', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input type="date"></aegov-input>`);
      const input = await page.find('aegov-input input');
      expect(await input.getAttribute('type')).toBe('date');
    });
  });

  describe('size prop', () => {
    it('should apply input--sm class for size sm', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input size="sm"></aegov-input>`);
      const input = await page.find('aegov-input input');
      expect(await input.getAttribute('class')).toContain('input--sm');
    });

    it('should apply input--base class for size base', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input size="base"></aegov-input>`);
      const input = await page.find('aegov-input input');
      expect(await input.getAttribute('class')).toContain('input--base');
    });

    it('should apply input--lg class for size lg', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input size="lg"></aegov-input>`);
      const input = await page.find('aegov-input input');
      expect(await input.getAttribute('class')).toContain('input--lg');
    });
  });

  describe('ID generation', () => {
    it('should auto-generate an ID on the native input', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input></aegov-input>`);
      const input = await page.find('aegov-input input');
      const id = await input.getAttribute('id');
      expect(id).toMatch(/^aegov-input-\d+$/);
    });

    it('should use provided input-id', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input input-id="my-email"></aegov-input>`);
      const input = await page.find('aegov-input input');
      expect(await input.getAttribute('id')).toBe('my-email');
    });
  });

  describe('disabled state', () => {
    it('should set disabled attribute on native input', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input disabled></aegov-input>`);
      const input = await page.find('aegov-input input');
      expect(await input.getProperty('disabled')).toBe(true);
    });
  });

  describe('readonly state', () => {
    it('should set readOnly on native input', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input readonly></aegov-input>`);
      const input = await page.find('aegov-input input');
      expect(await input.getProperty('readOnly')).toBe(true);
    });
  });

  describe('placeholder', () => {
    it('should render placeholder text', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input placeholder="Enter email"></aegov-input>`);
      const input = await page.find('aegov-input input');
      expect(await input.getAttribute('placeholder')).toBe('Enter email');
    });
  });

  describe('events', () => {
    it('should emit aegovInputInput on typing', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input></aegov-input>`);
      const inputEvent = await page.spyOnEvent('aegovInputInput');
      const input = await page.find('aegov-input input');
      await input.type('hello');
      expect(inputEvent).toHaveReceivedEvent();
    });

    it('should emit aegovInputFocus on focus', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input></aegov-input>`);
      const focusEvent = await page.spyOnEvent('aegovInputFocus');
      const input = await page.find('aegov-input input');
      await input.focus();
      expect(focusEvent).toHaveReceivedEvent();
    });
  });

  describe('icon slots', () => {
    it('should render icon-start slot', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input>
          <svg slot="icon-start" class="w-5 h-5"></svg>
        </aegov-input>
      `);
      const icon = await page.find('aegov-input .input__icon--start');
      expect(icon).toBeTruthy();
    });

    it('should render icon-end slot', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input>
          <svg slot="icon-end" class="w-5 h-5"></svg>
        </aegov-input>
      `);
      const icon = await page.find('aegov-input .input__icon--end');
      expect(icon).toBeTruthy();
    });

    it('should render both icons simultaneously', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input>
          <svg slot="icon-start" class="w-5 h-5"></svg>
          <svg slot="icon-end" class="w-5 h-5"></svg>
        </aegov-input>
      `);
      const iconStart = await page.find('aegov-input .input__icon--start');
      const iconEnd = await page.find('aegov-input .input__icon--end');
      expect(iconStart).toBeTruthy();
      expect(iconEnd).toBeTruthy();
    });

    it('should not render icon-end when password-toggle is active', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input type="password" password-toggle>
          <svg slot="icon-end" class="w-5 h-5"></svg>
        </aegov-input>
      `);
      const iconEnd = await page.find('aegov-input .input__icon--end');
      expect(iconEnd).toBeNull();
      const toggle = await page.find('aegov-input .input__password-toggle');
      expect(toggle).toBeTruthy();
    });

    it('should not render icon-end when copyable is active', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input readonly copyable value="test">
          <svg slot="icon-end" class="w-5 h-5"></svg>
        </aegov-input>
      `);
      const iconEnd = await page.find('aegov-input .input__icon--end');
      expect(iconEnd).toBeNull();
      const copyBtn = await page.find('aegov-input .input__copy-btn');
      expect(copyBtn).toBeTruthy();
    });

    it('should still show icon-start with password-toggle', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input type="password" password-toggle>
          <svg slot="icon-start" class="w-5 h-5"></svg>
        </aegov-input>
      `);
      const iconStart = await page.find('aegov-input .input__icon--start');
      expect(iconStart).toBeTruthy();
      const toggle = await page.find('aegov-input .input__password-toggle');
      expect(toggle).toBeTruthy();
    });

    it('should add input--has-icon-start class', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input>
          <svg slot="icon-start" class="w-5 h-5"></svg>
        </aegov-input>
      `);
      const input = await page.find('aegov-input input');
      expect(await input.getAttribute('class')).toContain('input--has-icon-start');
    });

    it('should add input--has-icon-end class', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input>
          <svg slot="icon-end" class="w-5 h-5"></svg>
        </aegov-input>
      `);
      const input = await page.find('aegov-input input');
      expect(await input.getAttribute('class')).toContain('input--has-icon-end');
    });

    it('should handle icon click events', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input>
          <button slot="icon-start" id="test-icon-btn" type="button">
            <svg class="w-5 h-5"></svg>
          </button>
        </aegov-input>
      `);
      const clicked = await page.evaluate(() => {
        return new Promise<boolean>(resolve => {
          const btn = document.querySelector('#test-icon-btn');
          btn.addEventListener('click', () => resolve(true));
          (btn as HTMLElement).click();
        });
      });
      expect(clicked).toBe(true);
    });

    it('should render wrapper with size class', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-input size="lg">
          <svg slot="icon-start" class="w-5 h-5"></svg>
        </aegov-input>
      `);
      const wrapper = await page.find('aegov-input .input__wrapper');
      expect(wrapper).toBeTruthy();
      expect(await wrapper.getAttribute('class')).toContain('input__wrapper--lg');
    });
  });

  describe('password toggle', () => {
    it('should not show toggle by default for password', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input type="password"></aegov-input>`);
      const toggle = await page.find('aegov-input .input__password-toggle');
      expect(toggle).toBeNull();
    });

    it('should show toggle when password-toggle is set', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input type="password" password-toggle></aegov-input>`);
      const toggle = await page.find('aegov-input .input__password-toggle');
      expect(toggle).toBeTruthy();
    });

    it('should toggle input type from password to text on click', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input type="password" password-toggle></aegov-input>`);
      const input = await page.find('aegov-input input');
      expect(await input.getAttribute('type')).toBe('password');

      const toggle = await page.find('aegov-input .input__password-toggle');
      await toggle.click();
      await page.waitForChanges();
      expect(await input.getAttribute('type')).toBe('text');
    });

    it('should toggle back to password on second click', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input type="password" password-toggle></aegov-input>`);
      const toggle = await page.find('aegov-input .input__password-toggle');
      await toggle.click();
      await page.waitForChanges();
      await toggle.click();
      await page.waitForChanges();
      const input = await page.find('aegov-input input');
      expect(await input.getAttribute('type')).toBe('password');
    });

    it('should update aria-label when toggled', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input type="password" password-toggle></aegov-input>`);
      const toggle = await page.find('aegov-input .input__password-toggle');
      expect(await toggle.getAttribute('aria-label')).toBe('Show password');

      await toggle.click();
      await page.waitForChanges();
      expect(await toggle.getAttribute('aria-label')).toBe('Hide password');
    });
  });

  describe('copy button', () => {
    it('should not show copy button on readonly without copyable', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input readonly value="token-123"></aegov-input>`);
      const btn = await page.find('aegov-input .input__copy-btn');
      expect(btn).toBeNull();
    });

    it('should not show copy button when not readonly', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input copyable value="token-123"></aegov-input>`);
      const btn = await page.find('aegov-input .input__copy-btn');
      expect(btn).toBeNull();
    });

    it('should show copy button when readonly and copyable', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input readonly copyable value="token-123"></aegov-input>`);
      const btn = await page.find('aegov-input .input__copy-btn');
      expect(btn).toBeTruthy();
    });

    it('should show copied feedback after clicking copy', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-input readonly copyable value="token-123"></aegov-input>`);

      // Grant clipboard permission in the browser context
      await page.evaluate(() => {
        (navigator as any).clipboard = { writeText: () => Promise.resolve() };
      });

      const btn = await page.find('aegov-input .input__copy-btn');
      await btn.click();
      await page.waitForChanges();
      expect(await btn.getAttribute('aria-label')).toBe('Copied');
    });
  });
});
