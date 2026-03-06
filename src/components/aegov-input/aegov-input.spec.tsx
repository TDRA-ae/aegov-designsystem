import { newSpecPage } from '@stencil/core/testing';
import { AegovInput } from './aegov-input';

describe('aegov-input', () => {
  describe('rendering', () => {
    it('renders an input element', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input).not.toBeNull();
    });

    it('renders with aegov-input class', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.className).toContain('aegov-input');
    });
  });

  describe('default props', () => {
    it('defaults type to text', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.getAttribute('type')).toBe('text');
    });

    it('defaults size to base', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      expect(page.rootInstance.size).toBe('base');
    });

    it('applies input--base class by default', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.className).toContain('input--base');
    });

    it('defaults disabled to false', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.disabled).toBe(false);
    });

    it('defaults readonly to false', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.readOnly).toBe(false);
    });

    it('defaults value to empty string', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      expect(page.rootInstance.value).toBe('');
    });
  });

  describe('ID generation', () => {
    it('auto-generates a unique ID', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.id).toMatch(/^aegov-input-\d+$/);
    });

    it('reflects the generated ID on the host element', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      expect(page.root.getAttribute('field-id')).toMatch(/^aegov-input-\d+$/);
    });

    it('uses provided field-id instead of generating one', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input field-id="my-custom-id"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.id).toBe('my-custom-id');
    });

    it('generates unique IDs for multiple instances', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<div><aegov-input></aegov-input><aegov-input></aegov-input></div>`,
      });
      const inputs = page.doc.querySelectorAll('input');
      expect(inputs[0].id).not.toBe(inputs[1].id);
    });
  });

  describe('type prop', () => {
    const types = ['text', 'email', 'password', 'tel', 'url', 'number', 'search', 'date', 'time', 'datetime-local', 'month', 'week'];

    types.forEach(type => {
      it(`renders type="${type}"`, async () => {
        const page = await newSpecPage({
          components: [AegovInput],
          html: `<aegov-input type="${type}"></aegov-input>`,
        });
        const input = page.root.querySelector('input');
        expect(input.getAttribute('type')).toBe(type);
      });
    });
  });

  describe('size prop', () => {
    it('applies input--sm class for size sm', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input size="sm"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.className).toContain('input--sm');
    });

    it('applies input--base class for size base', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input size="base"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.className).toContain('input--base');
    });

    it('applies input--lg class for size lg', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input size="lg"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.className).toContain('input--lg');
    });
  });

  describe('disabled prop', () => {
    it('sets disabled attribute on native input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input disabled></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.disabled).toBe(true);
    });
  });

  describe('readonly prop', () => {
    it('sets readOnly attribute on native input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input readonly></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.readOnly).toBe(true);
    });
  });

  describe('placeholder prop', () => {
    it('sets placeholder on native input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input placeholder="Enter text"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.getAttribute('placeholder')).toBe('Enter text');
    });
  });

  describe('value prop', () => {
    it('sets value on native input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input value="hello"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.value).toBe('hello');
    });
  });

  describe('name prop', () => {
    it('sets name attribute on native input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input name="email"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.getAttribute('name')).toBe('email');
    });
  });

  describe('required prop', () => {
    it('sets required attribute on native input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input required></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.required).toBe(true);
    });
  });

  describe('custom class', () => {
    it('merges custom class with defaults', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input class="my-custom-class"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.className).toContain('aegov-input');
      expect(input.className).toContain('my-custom-class');
    });
  });

  describe('pass-through attributes', () => {
    it('passes data-* attributes to native input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input data-testid="email-input"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.getAttribute('data-testid')).toBe('email-input');
    });

    it('passes aria-* attributes to native input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input aria-describedby="help-text"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.getAttribute('aria-describedby')).toBe('help-text');
    });

    it('passes pattern attribute to native input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input pattern="[A-Za-z]{3}"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.getAttribute('pattern')).toBe('[A-Za-z]{3}');
    });

    it('passes min and max attributes to native input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input type="number" min="0" max="100"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.getAttribute('min')).toBe('0');
      expect(input.getAttribute('max')).toBe('100');
    });

    it('passes minlength and maxlength attributes to native input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input minlength="3" maxlength="50"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.getAttribute('minlength')).toBe('3');
      expect(input.getAttribute('maxlength')).toBe('50');
    });

    it('passes step attribute to native input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input type="number" step="0.01"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.getAttribute('step')).toBe('0.01');
    });

    it('passes autocomplete attribute to native input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input autocomplete="email"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.getAttribute('autocomplete')).toBe('email');
    });

    it('passes inputmode attribute to native input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input inputmode="numeric"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.getAttribute('inputmode')).toBe('numeric');
    });

    it('passes title attribute to native input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input title="Enter your email"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.getAttribute('title')).toBe('Enter your email');
    });
  });

  describe('events', () => {
    it('emits aegovInputInput on input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      const spy = jest.fn();
      page.root.addEventListener('aegovInputInput', spy);
      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      expect(spy).toHaveBeenCalled();
    });

    it('emits aegovInputChange on change', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      const spy = jest.fn();
      page.root.addEventListener('aegovInputChange', spy);
      input.value = 'test';
      input.dispatchEvent(new Event('change'));
      expect(spy).toHaveBeenCalled();
    });

    it('emits aegovInputFocus on focus', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      const spy = jest.fn();
      page.root.addEventListener('aegovInputFocus', spy);
      input.dispatchEvent(new FocusEvent('focus'));
      expect(spy).toHaveBeenCalled();
    });

    it('emits aegovInputBlur on blur', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      const spy = jest.fn();
      page.root.addEventListener('aegovInputBlur', spy);
      input.dispatchEvent(new FocusEvent('blur'));
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('icon slots', () => {
    it('renders icon-start container when slotted content is provided', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input><svg slot="icon-start"></svg></aegov-input>`,
      });
      const iconContainer = page.root.querySelector('.input__icon--start');
      expect(iconContainer).not.toBeNull();
    });

    it('renders icon-end container when slotted content is provided', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input><svg slot="icon-end"></svg></aegov-input>`,
      });
      const iconContainer = page.root.querySelector('.input__icon--end');
      expect(iconContainer).not.toBeNull();
    });

    it('does not render icon containers when no slotted content', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      expect(page.root.querySelector('.input__icon--start')).toBeNull();
      expect(page.root.querySelector('.input__icon--end')).toBeNull();
    });

    it('renders wrapper when icon-start is present', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input><svg slot="icon-start"></svg></aegov-input>`,
      });
      expect(page.root.querySelector('.input__wrapper')).not.toBeNull();
    });

    it('renders wrapper when icon-end is present', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input><svg slot="icon-end"></svg></aegov-input>`,
      });
      expect(page.root.querySelector('.input__wrapper')).not.toBeNull();
    });

    it('adds input--has-icon-start class when icon-start is provided', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input><svg slot="icon-start"></svg></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.className).toContain('input--has-icon-start');
    });

    it('adds input--has-icon-end class when icon-end is provided', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input><svg slot="icon-end"></svg></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.className).toContain('input--has-icon-end');
    });

    it('renders both icon slots simultaneously', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input><svg slot="icon-start"></svg><svg slot="icon-end"></svg></aegov-input>`,
      });
      expect(page.root.querySelector('.input__icon--start')).not.toBeNull();
      expect(page.root.querySelector('.input__icon--end')).not.toBeNull();
    });

    it('hides icon-end when revealable is active', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input type="password" revealable><svg slot="icon-end"></svg></aegov-input>`,
      });
      const iconEnd = page.root.querySelector('.input__icon--end');
      expect(iconEnd).not.toBeNull();
      expect(iconEnd.classList.contains('input__icon--hidden')).toBe(true);
      expect(page.root.querySelector('.input__revealable')).not.toBeNull();
    });

    it('hides icon-end when copyable is active', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input readonly copyable value="test"><svg slot="icon-end"></svg></aegov-input>`,
      });
      const iconEnd = page.root.querySelector('.input__icon--end');
      expect(iconEnd).not.toBeNull();
      expect(iconEnd.classList.contains('input__icon--hidden')).toBe(true);
      expect(page.root.querySelector('.input__copy-btn')).not.toBeNull();
    });

    it('still renders icon-start when revealable is active', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input type="password" revealable><svg slot="icon-start"></svg></aegov-input>`,
      });
      expect(page.root.querySelector('.input__icon--start')).not.toBeNull();
      expect(page.root.querySelector('.input__revealable')).not.toBeNull();
    });

    it('still renders icon-start when copyable is active', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input readonly copyable value="test"><svg slot="icon-start"></svg></aegov-input>`,
      });
      expect(page.root.querySelector('.input__icon--start')).not.toBeNull();
      expect(page.root.querySelector('.input__copy-btn')).not.toBeNull();
    });

    it('applies wrapper size class for sm', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input size="sm"><svg slot="icon-start"></svg></aegov-input>`,
      });
      const wrapper = page.root.querySelector('.input__wrapper');
      expect(wrapper.className).toContain('input__wrapper--sm');
    });

    it('applies wrapper size class for base', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input size="base"><svg slot="icon-start"></svg></aegov-input>`,
      });
      const wrapper = page.root.querySelector('.input__wrapper');
      expect(wrapper.className).toContain('input__wrapper--base');
    });

    it('applies wrapper size class for lg', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input size="lg"><svg slot="icon-start"></svg></aegov-input>`,
      });
      const wrapper = page.root.querySelector('.input__wrapper');
      expect(wrapper.className).toContain('input__wrapper--lg');
    });

    it('does not add icon-start class without slot content', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.className).not.toContain('input--has-icon-start');
    });

    it('does not add icon-end class without slot content', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.className).not.toContain('input--has-icon-end');
    });
  });

  describe('password toggle', () => {
    it('does not show toggle button by default for password type', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input type="password"></aegov-input>`,
      });
      const toggle = page.root.querySelector('.input__revealable');
      expect(toggle).toBeNull();
    });

    it('does not show toggle button for non-password types', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input type="text" revealable></aegov-input>`,
      });
      const toggle = page.root.querySelector('.input__revealable');
      expect(toggle).toBeNull();
    });

    it('shows toggle button when revealable is set on password input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input type="password" revealable></aegov-input>`,
      });
      const toggle = page.root.querySelector('.input__revealable');
      expect(toggle).not.toBeNull();
    });

    it('renders wrapper div when toggle is enabled', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input type="password" revealable></aegov-input>`,
      });
      const wrapper = page.root.querySelector('.input__wrapper');
      expect(wrapper).not.toBeNull();
    });

    it('renders input with type="password" initially', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input type="password" revealable></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.getAttribute('type')).toBe('password');
    });

    it('toggles input type to text when toggle is clicked', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input type="password" revealable></aegov-input>`,
      });
      const toggle = page.root.querySelector('.input__revealable') as HTMLButtonElement;
      toggle.click();
      await page.waitForChanges();
      const input = page.root.querySelector('input');
      expect(input.getAttribute('type')).toBe('text');
    });

    it('toggles back to password on second click', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input type="password" revealable></aegov-input>`,
      });
      const toggle = page.root.querySelector('.input__revealable') as HTMLButtonElement;
      toggle.click();
      await page.waitForChanges();
      toggle.click();
      await page.waitForChanges();
      const input = page.root.querySelector('input');
      expect(input.getAttribute('type')).toBe('password');
    });

    it('has aria-label "Show password" initially', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input type="password" revealable></aegov-input>`,
      });
      const toggle = page.root.querySelector('.input__revealable');
      expect(toggle.getAttribute('aria-label')).toBe('Show password');
    });

    it('changes aria-label to "Hide password" when visible', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input type="password" revealable></aegov-input>`,
      });
      const toggle = page.root.querySelector('.input__revealable') as HTMLButtonElement;
      toggle.click();
      await page.waitForChanges();
      expect(toggle.getAttribute('aria-label')).toBe('Hide password');
    });

    it('adds input--has-action class to the input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input type="password" revealable></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.className).toContain('input--has-action');
    });

    it('toggle button is disabled when input is disabled', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input type="password" revealable disabled></aegov-input>`,
      });
      const toggle = page.root.querySelector('.input__revealable');
      expect(toggle.getAttribute('disabled')).toBe('');
    });

    it('applies correct size class to toggle button', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input type="password" revealable size="lg"></aegov-input>`,
      });
      const toggle = page.root.querySelector('.input__revealable');
      expect(toggle.className).toContain('revealable--lg');
    });
  });

  describe('copy button', () => {
    it('does not show copy button by default on readonly input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input readonly value="token-123"></aegov-input>`,
      });
      const btn = page.root.querySelector('.input__copy-btn');
      expect(btn).toBeNull();
    });

    it('does not show copy button on non-readonly input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input copyable value="token-123"></aegov-input>`,
      });
      const btn = page.root.querySelector('.input__copy-btn');
      expect(btn).toBeNull();
    });

    it('shows copy button when copyable and readonly', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input readonly copyable value="token-123"></aegov-input>`,
      });
      const btn = page.root.querySelector('.input__copy-btn');
      expect(btn).not.toBeNull();
    });

    it('renders wrapper div when copy button is enabled', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input readonly copyable value="token-123"></aegov-input>`,
      });
      const wrapper = page.root.querySelector('.input__wrapper');
      expect(wrapper).not.toBeNull();
    });

    it('adds input--has-action class to the input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input readonly copyable value="token-123"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.className).toContain('input--has-action');
    });

    it('has aria-label "Copy to clipboard" initially', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input readonly copyable value="token-123"></aegov-input>`,
      });
      const btn = page.root.querySelector('.input__copy-btn');
      expect(btn.getAttribute('aria-label')).toBe('Copy to clipboard');
    });

    it('applies correct size class to copy button', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input readonly copyable size="lg" value="token-123"></aegov-input>`,
      });
      const btn = page.root.querySelector('.input__copy-btn');
      expect(btn.className).toContain('copy-btn--lg');
    });

    it('shows copied feedback after click', async () => {
      // Mock clipboard API
      const writeText = jest.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: { writeText },
      });
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input readonly copyable value="token-123"></aegov-input>`,
      });
      const btn = page.root.querySelector('.input__copy-btn') as HTMLButtonElement;
      btn.click();
      // Wait for the async clipboard call to resolve
      await new Promise(r => setTimeout(r, 0));
      await page.waitForChanges();
      expect(writeText).toHaveBeenCalledWith('token-123');
      expect(btn.getAttribute('aria-label')).toBe('Copied');
      expect(btn.className).toContain('input__copy-btn--copied');
    });
  });
});
