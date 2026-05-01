import { newSpecPage } from '@stencil/core/testing';
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
    const wrapper = page.root.querySelector('div.aegov-form-field');
    expect(wrapper).not.toBeNull();
  });

  it('auto-generates fieldId when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovFormField],
      html: `<aegov-form-field></aegov-form-field>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-form-field-\d+$/);
    expect(page.root.querySelector('div.aegov-form-field').id).toBe(page.rootInstance.fieldId);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovFormField],
      html: `<aegov-form-field field-id="ff1"></aegov-form-field>`,
    });
    expect(page.root.querySelector('div.aegov-form-field').id).toBe('ff1');
  });

  it('applies extra-class', async () => {
    const page = await newSpecPage({
      components: [AegovFormField],
      html: `<aegov-form-field extra-class="custom"></aegov-form-field>`,
    });
    expect(page.root.querySelector('div.aegov-form-field').className).toContain('custom');
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
    const label = page.root.querySelector('aegov-label') as any;
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
    const label = page.root.querySelector('aegov-label') as any;
    expect(label.htmlFor).toBe('bio-ta');
  });

  it('forwards aria-* and data-* attributes to wrapper', async () => {
    const page = await newSpecPage({
      components: [AegovFormField],
      html: `<aegov-form-field aria-label="field" data-test="x"></aegov-form-field>`,
    });
    const wrapper = page.root.querySelector('div.aegov-form-field');
    expect(wrapper.getAttribute('aria-label')).toBe('field');
    expect(wrapper.getAttribute('data-test')).toBe('x');
  });
});
