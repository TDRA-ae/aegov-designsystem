import { newSpecPage } from '@stencil/core/testing';
import { AegovTextarea } from './aegov-textarea';

describe('aegov-textarea', () => {
  describe('rendering', () => {
    it('renders a textarea element', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea).not.toBeNull();
    });

    it('renders with aegov-textarea class', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.className).toContain('aegov-textarea');
    });
  });

  describe('default props', () => {
    it('defaults size to base', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea></aegov-textarea>`,
      });
      expect(page.rootInstance.size).toBe('base');
    });

    it('applies textarea--base class by default', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.className).toContain('textarea--base');
    });

    it('defaults resize to vertical', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea></aegov-textarea>`,
      });
      expect(page.rootInstance.resize).toBe('vertical');
      const textarea = page.root.querySelector('textarea');
      expect(textarea.className).toContain('textarea--resize-vertical');
    });

    it('defaults disabled to false', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea></aegov-textarea>`,
      });
      expect(page.rootInstance.disabled).toBe(false);
    });

    it('defaults readonly to false', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea></aegov-textarea>`,
      });
      expect(page.rootInstance.readonly).toBe(false);
    });

    it('defaults value to empty string', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea></aegov-textarea>`,
      });
      expect(page.rootInstance.value).toBe('');
    });
  });

  describe('ID generation', () => {
    it('auto-generates a unique ID', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.id).toMatch(/^aegov-textarea-\d+$/);
    });

    it('reflects the generated ID on the host element', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea></aegov-textarea>`,
      });
      expect(page.root.getAttribute('field-id')).toMatch(/^aegov-textarea-\d+$/);
    });

    it('uses provided field-id instead of generating one', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea field-id="my-custom-id"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.id).toBe('my-custom-id');
    });

    it('generates unique IDs for multiple instances', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<div><aegov-textarea></aegov-textarea><aegov-textarea></aegov-textarea></div>`,
      });
      const textareas = page.doc.querySelectorAll('textarea');
      expect(textareas[0].id).not.toBe(textareas[1].id);
    });
  });

  describe('size prop', () => {
    it('applies textarea--sm class for size sm', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea size="sm"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.className).toContain('textarea--sm');
    });

    it('applies textarea--base class for size base', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea size="base"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.className).toContain('textarea--base');
    });

    it('applies textarea--lg class for size lg', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea size="lg"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.className).toContain('textarea--lg');
    });
  });

  describe('resize prop', () => {
    it('applies textarea--resize-none for resize none', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea resize="none"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.className).toContain('textarea--resize-none');
    });

    it('applies textarea--resize-vertical for resize vertical', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea resize="vertical"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.className).toContain('textarea--resize-vertical');
    });

    it('applies textarea--resize-horizontal for resize horizontal', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea resize="horizontal"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.className).toContain('textarea--resize-horizontal');
    });

    it('applies textarea--resize-both for resize both', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea resize="both"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.className).toContain('textarea--resize-both');
    });

    it('applies textarea--resize-none for resize auto', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea resize="auto"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.className).toContain('textarea--resize-none');
    });
  });

  describe('disabled prop', () => {
    it('sets disabled attribute on native textarea', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea disabled></aegov-textarea>`,
      });
      expect(page.rootInstance.disabled).toBe(true);
      const textarea = page.root.querySelector('textarea');
      expect(textarea.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('readonly prop', () => {
    it('sets readOnly attribute on native textarea', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea readonly></aegov-textarea>`,
      });
      expect(page.rootInstance.readonly).toBe(true);
    });
  });

  describe('placeholder prop', () => {
    it('sets placeholder on native textarea', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea placeholder="Enter text"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.getAttribute('placeholder')).toBe('Enter text');
    });
  });

  describe('value prop', () => {
    it('sets value on native textarea', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea value="hello"></aegov-textarea>`,
      });
      expect(page.rootInstance.value).toBe('hello');
    });
  });

  describe('name prop', () => {
    it('sets name attribute on native textarea', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea name="message"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.getAttribute('name')).toBe('message');
    });
  });

  describe('required prop', () => {
    it('sets required attribute on native textarea', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea required></aegov-textarea>`,
      });
      expect(page.rootInstance.required).toBe(true);
      const textarea = page.root.querySelector('textarea');
      expect(textarea.hasAttribute('required')).toBe(true);
    });
  });

  describe('custom class', () => {
    it('merges custom class with defaults', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea class="my-custom-class"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.className).toContain('aegov-textarea');
      expect(textarea.className).toContain('my-custom-class');
    });
  });

  describe('pass-through attributes', () => {
    it('passes data-* attributes to native textarea', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea data-testid="message-field"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.getAttribute('data-testid')).toBe('message-field');
    });

    it('passes aria-* attributes to native textarea', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea aria-describedby="help-text"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.getAttribute('aria-describedby')).toBe('help-text');
    });

    it('passes rows attribute to native textarea', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea rows="8"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.getAttribute('rows')).toBe('8');
    });

    it('passes cols attribute to native textarea', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea cols="40"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.getAttribute('cols')).toBe('40');
    });

    it('passes maxlength attribute to native textarea', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea maxlength="200"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.getAttribute('maxlength')).toBe('200');
    });

    it('passes minlength attribute to native textarea', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea minlength="10"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.getAttribute('minlength')).toBe('10');
    });

    it('passes wrap attribute to native textarea', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea wrap="hard"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.getAttribute('wrap')).toBe('hard');
    });

    it('passes spellcheck attribute to native textarea', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea spellcheck="true"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.getAttribute('spellcheck')).toBe('true');
    });

    it('passes title attribute to native textarea', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea title="Enter your message"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.getAttribute('title')).toBe('Enter your message');
    });
  });

  describe('events', () => {
    it('emits aegovTextareaInput on input', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      const spy = jest.fn();
      page.root.addEventListener('aegovTextareaInput', spy);
      textarea.value = 'test';
      textarea.dispatchEvent(new Event('input'));
      expect(spy).toHaveBeenCalled();
    });

    it('emits aegovTextareaChange on change', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      const spy = jest.fn();
      page.root.addEventListener('aegovTextareaChange', spy);
      textarea.value = 'test';
      textarea.dispatchEvent(new Event('change'));
      expect(spy).toHaveBeenCalled();
    });

    it('emits aegovTextareaFocus on focus', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      const spy = jest.fn();
      page.root.addEventListener('aegovTextareaFocus', spy);
      textarea.dispatchEvent(new FocusEvent('focus'));
      expect(spy).toHaveBeenCalled();
    });

    it('emits aegovTextareaBlur on blur', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      const spy = jest.fn();
      page.root.addEventListener('aegovTextareaBlur', spy);
      textarea.dispatchEvent(new FocusEvent('blur'));
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('character counter', () => {
    it('does not render counter when maxlength is not set', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea></aegov-textarea>`,
      });
      const counter = page.root.querySelector('.textarea__counter');
      expect(counter).toBeNull();
    });

    it('renders counter when maxlength is set', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea maxlength="200"></aegov-textarea>`,
      });
      const counter = page.root.querySelector('.textarea__counter');
      expect(counter).not.toBeNull();
      expect(counter.textContent).toContain('0 / 200');
    });

    it('updates counter with initial value', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea maxlength="200" value="hello"></aegov-textarea>`,
      });
      const counter = page.root.querySelector('.textarea__counter');
      expect(counter.textContent).toContain('5 / 200');
    });

    it('updates counter on input', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea maxlength="200"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      textarea.value = 'testing';
      textarea.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      const counter = page.root.querySelector('.textarea__counter');
      expect(counter.textContent).toContain('7 / 200');
    });

    it('adds over class when exceeding maxlength', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea maxlength="5" value="toolong"></aegov-textarea>`,
      });
      const counter = page.root.querySelector('.textarea__counter');
      expect(counter.classList.contains('textarea__counter--over')).toBe(true);
    });

    it('does not add over class when within maxlength', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea maxlength="200" value="ok"></aegov-textarea>`,
      });
      const counter = page.root.querySelector('.textarea__counter');
      expect(counter.classList.contains('textarea__counter--over')).toBe(false);
    });

    it('renders wrapper when maxlength is set', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea maxlength="200"></aegov-textarea>`,
      });
      const wrapper = page.root.querySelector('.textarea__wrapper');
      expect(wrapper).not.toBeNull();
    });
  });

  describe('copy button', () => {
    it('does not show copy button by default on readonly textarea', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea readonly value="some text"></aegov-textarea>`,
      });
      const btn = page.root.querySelector('.textarea__copy-btn');
      expect(btn).toBeNull();
    });

    it('does not show copy button on non-readonly textarea', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea copyable value="some text"></aegov-textarea>`,
      });
      const btn = page.root.querySelector('.textarea__copy-btn');
      expect(btn).toBeNull();
    });

    it('shows copy button when copyable and readonly', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea readonly copyable value="some text"></aegov-textarea>`,
      });
      const btn = page.root.querySelector('.textarea__copy-btn');
      expect(btn).not.toBeNull();
    });

    it('renders wrapper when copy button is enabled', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea readonly copyable value="some text"></aegov-textarea>`,
      });
      const wrapper = page.root.querySelector('.textarea__wrapper');
      expect(wrapper).not.toBeNull();
    });

    it('adds textarea--has-copy class when copyable and readonly', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea readonly copyable value="some text"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.className).toContain('textarea--has-copy');
    });

    it('has aria-label "Copy to clipboard" initially', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea readonly copyable value="some text"></aegov-textarea>`,
      });
      const btn = page.root.querySelector('.textarea__copy-btn');
      expect(btn.getAttribute('aria-label')).toBe('Copy to clipboard');
    });

    it('shows copied feedback after click', async () => {
      const writeText = jest.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: { writeText },
      });
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea readonly copyable value="some text"></aegov-textarea>`,
      });
      const btn = page.root.querySelector('.textarea__copy-btn') as HTMLButtonElement;
      btn.click();
      await new Promise(r => setTimeout(r, 0));
      await page.waitForChanges();
      expect(writeText).toHaveBeenCalledWith('some text');
      expect(btn.getAttribute('aria-label')).toBe('Copied');
      expect(btn.className).toContain('textarea__copy-btn--copied');
    });
  });

  describe('auto resize', () => {
    it('sets resize to none when resize is auto', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea resize="auto"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.className).toContain('textarea--resize-none');
    });
  });
});
