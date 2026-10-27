import { newSpecPage } from '@stencil/core/testing';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { q } from '../../utils/test-helpers';
import { AegovFormField } from './aegov-form-field';
import { AegovInput } from '../aegov-input/aegov-input';
import { AegovTextarea } from '../aegov-textarea/aegov-textarea';
import { AegovLabel } from '../aegov-label/aegov-label';

describe('aegov-form-field', () => {
  it('renders the wrapper with the form-field class', async () => {
    const page = await newSpecPage({
      components: [AegovFormField],
      html: `<aegov-form-field></aegov-form-field>`,
    });
    const wrapper = q(page.root, 'div.aegov-form-field');
    expect(wrapper).not.toBeNull();
  });

  it('auto-generates fieldId when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovFormField],
      html: `<aegov-form-field></aegov-form-field>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-form-field-\d+$/);
    // fieldId reflects to the host; the wrapper div carries no id (removed in ab1e390).
    expect(page.root.getAttribute('field-id')).toBe(page.rootInstance.fieldId);
    expect(q(page.root, 'div.aegov-form-field').hasAttribute('id')).toBe(false);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovFormField],
      html: `<aegov-form-field field-id="ff1"></aegov-form-field>`,
    });
    expect(page.root.getAttribute('field-id')).toBe('ff1');
  });

  it('applies extra-class', async () => {
    const page = await newSpecPage({
      components: [AegovFormField],
      html: `<aegov-form-field extra-class="custom"></aegov-form-field>`,
    });
    expect(q(page.root, 'div.aegov-form-field').className).toContain('custom');
  });

  it('renders slot content (children)', async () => {
    const page = await newSpecPage({
      components: [AegovFormField],
      html: `<aegov-form-field><span>child</span></aegov-form-field>`,
    });
    expect(page.root.textContent).toContain('child');
  });

  it('links aegov-label htmlFor to child aegov-input fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovFormField, AegovLabel, AegovInput],
      html: `
        <aegov-form-field>
          <aegov-label>Email</aegov-label>
          <aegov-input field-id="email-input"></aegov-input>
        </aegov-form-field>
      `,
    });
    await page.waitForChanges();
    const label = q(page.root, 'aegov-label') as any;
    expect(label.htmlFor).toBe('email-input');
  });

  it('links aegov-label htmlFor to child aegov-textarea fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovFormField, AegovLabel, AegovTextarea],
      html: `
        <aegov-form-field>
          <aegov-label>Bio</aegov-label>
          <aegov-textarea field-id="bio-ta"></aegov-textarea>
        </aegov-form-field>
      `,
    });
    await page.waitForChanges();
    const label = q(page.root, 'aegov-label') as any;
    expect(label.htmlFor).toBe('bio-ta');
  });

  it('forwards aria-* and data-* attributes to wrapper', async () => {
    const page = await newSpecPage({
      components: [AegovFormField],
      html: `<aegov-form-field aria-label="field" data-test="x"></aegov-form-field>`,
    });
    const wrapper = q(page.root, 'div.aegov-form-field');
    expect(wrapper.getAttribute('aria-label')).toBe('field');
    expect(wrapper.getAttribute('data-test')).toBe('x');
  });

  // Validation cascade (Layer 1) — see validation-engine-addon.md §2.7
  describe('validation cascade', () => {
    it('cascades errorMessage to first form-control descendant', async () => {
      const page = await newSpecPage({
        components: [AegovFormField, AegovInput],
        html: `<aegov-form-field error-message="From wrapper" is-invalid="true">
          <aegov-input></aegov-input>
        </aegov-form-field>`,
      });
      await page.waitForChanges();
      const input = q(page.root, 'aegov-input') as HTMLAegovInputElement;
      expect(input.errorMessage).toBe('From wrapper');
      expect(input.isInvalid).toBe(true);
    });

    it('does NOT overwrite child errorMessage if child has its own', async () => {
      const page = await newSpecPage({
        components: [AegovFormField, AegovInput],
        html: `<aegov-form-field error-message="From wrapper" is-invalid="true">
          <aegov-input error-message="Child wins"></aegov-input>
        </aegov-form-field>`,
      });
      await page.waitForChanges();
      const input = q(page.root, 'aegov-input') as HTMLAegovInputElement;
      expect(input.errorMessage).toBe('Child wins');
    });

    it('cascades hint to first form-control descendant', async () => {
      const page = await newSpecPage({
        components: [AegovFormField, AegovInput],
        html: `<aegov-form-field hint="From wrapper">
          <aegov-input></aegov-input>
        </aegov-form-field>`,
      });
      await page.waitForChanges();
      const input = q(page.root, 'aegov-input') as HTMLAegovInputElement;
      expect(input.hint).toBe('From wrapper');
    });

    it('does NOT overwrite child hint if child has its own', async () => {
      const page = await newSpecPage({
        components: [AegovFormField, AegovInput],
        html: `<aegov-form-field hint="From wrapper">
          <aegov-input hint="Child wins"></aegov-input>
        </aegov-form-field>`,
      });
      await page.waitForChanges();
      const input = q(page.root, 'aegov-input') as HTMLAegovInputElement;
      expect(input.hint).toBe('Child wins');
    });

    it('adds is-invalid class on wrapper when isInvalid', async () => {
      const page = await newSpecPage({
        components: [AegovFormField, AegovInput],
        html: `<aegov-form-field is-invalid="true">
          <aegov-input></aegov-input>
        </aegov-form-field>`,
      });
      const wrapper = q(page.root, '.aegov-form-field');
      expect(wrapper.className).toContain('is-invalid');
    });

    it('cascade only fills empty child slots — leaves filled child untouched', async () => {
      const page = await newSpecPage({
        components: [AegovFormField, AegovInput],
        html: `<aegov-form-field error-message="From wrapper">
          <aegov-input error-message=""></aegov-input>
        </aegov-form-field>`,
      });
      await page.waitForChanges();
      const input = q(page.root, 'aegov-input') as HTMLAegovInputElement;
      // Empty string is treated as "no value" → cascade fills it
      expect(input.errorMessage).toBe('From wrapper');
    });
  });

  /**
   * Regression guard for the dimmed-label rules in aegov-form-field.css.
   *
   * Those rules are `:has(input:disabled) .aegov-label` selectors keyed off the inner
   * native control. They previously targeted the host as `aegov-input[disabled]`, which
   * never matched: the prop is `isDisabled`, so no `disabled` attribute is ever set on
   * the host. CSS cannot be asserted in a spec, but the selector's precondition can.
   */
  describe('dimmed label when the control is disabled', () => {
    // The controls render their native input in shadow DOM, so a CSS `:has()`
    // on the wrapper can never see it. form-field instead mirrors the control's
    // isDisabled onto `.is-control-disabled`, which form-field.css keys off (#46).
    it('marks the wrapper when the inner input is disabled', async () => {
      const page = await newSpecPage({
        components: [AegovFormField, AegovLabel, AegovInput],
        html: `<aegov-form-field>
          <aegov-label>Email</aegov-label>
          <aegov-input is-disabled="true"></aegov-input>
        </aegov-form-field>`,
      });
      await page.waitForChanges();

      expect(q(q(page.root, 'aegov-input'), 'input[disabled]')).not.toBeNull();
      expect(q(page.root, '.aegov-form-field.is-control-disabled .aegov-label')).not.toBeNull();
    });

    it('marks the wrapper when the inner textarea is disabled', async () => {
      const page = await newSpecPage({
        components: [AegovFormField, AegovLabel, AegovTextarea],
        html: `<aegov-form-field>
          <aegov-label>Reason</aegov-label>
          <aegov-textarea is-disabled="true"></aegov-textarea>
        </aegov-form-field>`,
      });
      await page.waitForChanges();

      expect(q(q(page.root, 'aegov-textarea'), 'textarea[disabled]')).not.toBeNull();
      expect(q(page.root, '.aegov-form-field.is-control-disabled .aegov-label')).not.toBeNull();
    });

    it('re-enabling the control drops disabled from the native input', async () => {
      const page = await newSpecPage({
        components: [AegovFormField, AegovLabel, AegovInput],
        html: `<aegov-form-field>
          <aegov-label>Email</aegov-label>
          <aegov-input is-disabled="true"></aegov-input>
        </aegov-form-field>`,
      });
      await page.waitForChanges();

      const input = q(page.root, 'aegov-input') as HTMLAegovInputElement;
      input.isDisabled = false;
      await page.waitForChanges();

      // The wrapper class itself is updated by a MutationObserver, which mock-doc
      // lacks; that half is covered in aegov-form-field.e2e.ts.
      expect(q(q(page.root, 'aegov-input'), 'input[disabled]')).toBeNull();
    });

    it('does not mark the wrapper for an enabled control', async () => {
      const page = await newSpecPage({
        components: [AegovFormField, AegovLabel, AegovInput],
        html: `<aegov-form-field>
          <aegov-label>Email</aegov-label>
          <aegov-input></aegov-input>
        </aegov-form-field>`,
      });
      await page.waitForChanges();
      expect(q(page.root, '.aegov-form-field.is-control-disabled')).toBeNull();
    });

    it('never styles from a `disabled` attribute on the host — that was the original bug', async () => {
      // The control now mirrors isDisabled onto its host's `disabled` attribute
      // (so the browser bars it from FormData and validation), but the dimmed
      // label must still come from the JS-set class: guards against
      // re-introducing `:has(aegov-input[disabled])`-style rules.
      const css = readFileSync(resolve(__dirname, 'aegov-form-field.css'), 'utf8');
      expect(css).not.toMatch(/\[disabled\]/);
      const page = await newSpecPage({
        components: [AegovFormField, AegovLabel, AegovInput],
        html: `<aegov-form-field><aegov-label>Email</aegov-label><aegov-input is-disabled="true"></aegov-input></aegov-form-field>`,
      });
      await page.waitForChanges();
      expect(q(page.root, '.aegov-form-field.is-control-disabled')).not.toBeNull();
    });
  });
});
