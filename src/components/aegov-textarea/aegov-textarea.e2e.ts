import { newE2EPage } from '@stencil/core/testing';

describe('aegov-textarea E2E', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea></aegov-textarea>`);
      const element = await page.find('aegov-textarea');
      expect(element).toBeTruthy();
    });

    it('should render a native textarea element', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea></aegov-textarea>`);
      const textarea = await page.find('aegov-textarea textarea');
      expect(textarea).toBeTruthy();
    });

    it('should have aegov-textarea class on native textarea', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea></aegov-textarea>`);
      const textarea = await page.find('aegov-textarea textarea');
      expect(await textarea.getAttribute('class')).toContain('aegov-textarea');
    });
  });

  describe('size prop', () => {
    it('should apply textarea--sm class for size sm', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea size="sm"></aegov-textarea>`);
      const textarea = await page.find('aegov-textarea textarea');
      expect(await textarea.getAttribute('class')).toContain('textarea--sm');
    });

    it('should apply textarea--base class for size base', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea size="base"></aegov-textarea>`);
      const textarea = await page.find('aegov-textarea textarea');
      expect(await textarea.getAttribute('class')).toContain('textarea--base');
    });

    it('should apply textarea--lg class for size lg', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea size="lg"></aegov-textarea>`);
      const textarea = await page.find('aegov-textarea textarea');
      expect(await textarea.getAttribute('class')).toContain('textarea--lg');
    });
  });

  describe('resize prop', () => {
    it('should apply resize-none class', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea resize="none"></aegov-textarea>`);
      const textarea = await page.find('aegov-textarea textarea');
      expect(await textarea.getAttribute('class')).toContain('textarea--resize-none');
    });

    it('should apply resize-both class', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea resize="both"></aegov-textarea>`);
      const textarea = await page.find('aegov-textarea textarea');
      expect(await textarea.getAttribute('class')).toContain('textarea--resize-both');
    });

    it('should apply resize-horizontal class', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea resize="horizontal"></aegov-textarea>`);
      const textarea = await page.find('aegov-textarea textarea');
      expect(await textarea.getAttribute('class')).toContain('textarea--resize-horizontal');
    });

    it('should apply resize-none for auto resize', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea resize="auto"></aegov-textarea>`);
      const textarea = await page.find('aegov-textarea textarea');
      expect(await textarea.getAttribute('class')).toContain('textarea--resize-none');
    });
  });

  describe('ID generation', () => {
    it('should auto-generate an ID on the native textarea', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea></aegov-textarea>`);
      const textarea = await page.find('aegov-textarea textarea');
      const id = await textarea.getAttribute('id');
      expect(id).toMatch(/^aegov-textarea-\d+$/);
    });

    it('should use provided field-id', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea field-id="my-message"></aegov-textarea>`);
      const textarea = await page.find('aegov-textarea textarea');
      expect(await textarea.getAttribute('id')).toBe('my-message');
    });
  });

  describe('disabled state', () => {
    it('should set disabled attribute on native textarea', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea disabled></aegov-textarea>`);
      const textarea = await page.find('aegov-textarea textarea');
      expect(await textarea.getProperty('disabled')).toBe(true);
    });
  });

  describe('readonly state', () => {
    it('should set readOnly on native textarea', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea readonly></aegov-textarea>`);
      const textarea = await page.find('aegov-textarea textarea');
      expect(await textarea.getProperty('readOnly')).toBe(true);
    });
  });

  describe('placeholder', () => {
    it('should render placeholder text', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea placeholder="Enter message"></aegov-textarea>`);
      const textarea = await page.find('aegov-textarea textarea');
      expect(await textarea.getAttribute('placeholder')).toBe('Enter message');
    });
  });

  describe('rows pass-through', () => {
    it('should pass rows attribute to native textarea', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea rows="8"></aegov-textarea>`);
      const textarea = await page.find('aegov-textarea textarea');
      expect(await textarea.getAttribute('rows')).toBe('8');
    });
  });

  describe('events', () => {
    it('should emit aegovTextareaInput on typing', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea></aegov-textarea>`);
      const inputEvent = await page.spyOnEvent('aegovTextareaInput');
      const textarea = await page.find('aegov-textarea textarea');
      await textarea.type('hello');
      expect(inputEvent).toHaveReceivedEvent();
    });

    it('should emit aegovTextareaFocus on focus', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea></aegov-textarea>`);
      const focusEvent = await page.spyOnEvent('aegovTextareaFocus');
      const textarea = await page.find('aegov-textarea textarea');
      await textarea.focus();
      expect(focusEvent).toHaveReceivedEvent();
    });
  });

  describe('character counter', () => {
    it('should render counter when maxlength is set', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea maxlength="200"></aegov-textarea>`);
      const counter = await page.find('aegov-textarea .textarea__counter');
      expect(counter).toBeTruthy();
      expect(await counter.innerText).toContain('0 / 200');
    });

    it('should update counter as user types', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea maxlength="200"></aegov-textarea>`);
      const textarea = await page.find('aegov-textarea textarea');
      await textarea.type('hello');
      await page.waitForChanges();
      const counter = await page.find('aegov-textarea .textarea__counter');
      expect(await counter.innerText).toContain('5 / 200');
    });

    it('should not render counter when maxlength is not set', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea></aegov-textarea>`);
      const counter = await page.find('aegov-textarea .textarea__counter');
      expect(counter).toBeNull();
    });
  });

  describe('copy button', () => {
    it('should not show copy button on readonly without copyable', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea readonly value="some text"></aegov-textarea>`);
      const btn = await page.find('aegov-textarea .textarea__copy-btn');
      expect(btn).toBeNull();
    });

    it('should not show copy button when not readonly', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea copyable value="some text"></aegov-textarea>`);
      const btn = await page.find('aegov-textarea .textarea__copy-btn');
      expect(btn).toBeNull();
    });

    it('should show copy button when readonly and copyable', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea readonly copyable value="some text"></aegov-textarea>`);
      const btn = await page.find('aegov-textarea .textarea__copy-btn');
      expect(btn).toBeTruthy();
    });

    it('should show copied feedback after clicking copy', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea readonly copyable value="some text"></aegov-textarea>`);

      await page.evaluate(() => {
        (navigator as any).clipboard = { writeText: () => Promise.resolve() };
      });

      const btn = await page.find('aegov-textarea .textarea__copy-btn');
      await btn.click();
      await page.waitForChanges();
      expect(await btn.getAttribute('aria-label')).toBe('Copied');
    });
  });

  describe('auto resize', () => {
    it('should grow height when typing with resize=auto', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-textarea resize="auto" rows="2"></aegov-textarea>`);
      const textarea = await page.find('aegov-textarea textarea');

      const initialHeight = await page.evaluate(() => {
        const ta = document.querySelector('aegov-textarea textarea') as HTMLTextAreaElement;
        return ta.offsetHeight;
      });

      // Type multiple lines to trigger growth
      await textarea.type('Line 1\nLine 2\nLine 3\nLine 4\nLine 5');
      await page.waitForChanges();

      const newHeight = await page.evaluate(() => {
        const ta = document.querySelector('aegov-textarea textarea') as HTMLTextAreaElement;
        return ta.offsetHeight;
      });

      expect(newHeight).toBeGreaterThan(initialHeight);
    });
  });

  describe('form-field integration', () => {
    it('should link label to textarea in aegov-form-field', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-form-field>
          <aegov-label>Message</aegov-label>
          <aegov-textarea field-id="msg-field"></aegov-textarea>
        </aegov-form-field>
      `);

      await page.waitForChanges();

      const label = await page.find('aegov-form-field aegov-label label');
      expect(await label.getAttribute('for')).toBe('msg-field');
    });
  });
});
