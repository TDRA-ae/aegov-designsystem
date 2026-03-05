import { newSpecPage } from '@stencil/core/testing';
import { AegovFormField } from './aegov-form-field';
import { AegovLabel } from '../aegov-label/aegov-label';
import { AegovInput } from '../aegov-input/aegov-input';

describe('aegov-form-field', () => {
  describe('rendering', () => {
    it('renders a div with aegov-form-field class', async () => {
      const page = await newSpecPage({
        components: [AegovFormField],
        html: `<aegov-form-field></aegov-form-field>`,
      });
      const div = page.root.querySelector('div');
      expect(div).not.toBeNull();
      expect(div.className).toContain('aegov-form-field');
    });

    it('renders slot content', async () => {
      const page = await newSpecPage({
        components: [AegovFormField],
        html: `<aegov-form-field><p>Content</p></aegov-form-field>`,
      });
      const p = page.root.querySelector('p');
      expect(p.textContent).toBe('Content');
    });
  });

  describe('auto-linking label to input', () => {
    it('sets label for attribute to match input id', async () => {
      const page = await newSpecPage({
        components: [AegovFormField, AegovLabel, AegovInput],
        html: `
          <aegov-form-field>
            <aegov-label>Email</aegov-label>
            <aegov-input type="email"></aegov-input>
          </aegov-form-field>
        `,
      });
      const input = page.root.querySelector('input');
      const label = page.root.querySelector('label');
      expect(label.getAttribute('for')).toBe(input.id);
    });

    it('links label to input with custom input-id', async () => {
      const page = await newSpecPage({
        components: [AegovFormField, AegovLabel, AegovInput],
        html: `
          <aegov-form-field>
            <aegov-label>Email</aegov-label>
            <aegov-input input-id="custom-email" type="email"></aegov-input>
          </aegov-form-field>
        `,
      });
      const label = page.root.querySelector('label');
      expect(label.getAttribute('for')).toBe('custom-email');
    });

    it('works without a label (input only)', async () => {
      const page = await newSpecPage({
        components: [AegovFormField, AegovInput],
        html: `
          <aegov-form-field>
            <aegov-input></aegov-input>
          </aegov-form-field>
        `,
      });
      const input = page.root.querySelector('input');
      expect(input.id).toMatch(/^aegov-input-\d+$/);
    });

    it('works without an input (label only)', async () => {
      const page = await newSpecPage({
        components: [AegovFormField, AegovLabel],
        html: `
          <aegov-form-field>
            <aegov-label>Email</aegov-label>
          </aegov-form-field>
        `,
      });
      const label = page.root.querySelector('label');
      expect(label).not.toBeNull();
    });
  });

  describe('custom class', () => {
    it('merges custom class with defaults', async () => {
      const page = await newSpecPage({
        components: [AegovFormField],
        html: `<aegov-form-field class="mb-4"></aegov-form-field>`,
      });
      const div = page.root.querySelector('div');
      expect(div.className).toContain('aegov-form-field');
      expect(div.className).toContain('mb-4');
    });
  });

  describe('pass-through attributes', () => {
    it('passes data-* attributes to div', async () => {
      const page = await newSpecPage({
        components: [AegovFormField],
        html: `<aegov-form-field data-testid="field-1"></aegov-form-field>`,
      });
      const div = page.root.querySelector('div');
      expect(div.getAttribute('data-testid')).toBe('field-1');
    });

    it('passes id attribute to div', async () => {
      const page = await newSpecPage({
        components: [AegovFormField],
        html: `<aegov-form-field id="email-field"></aegov-form-field>`,
      });
      const div = page.root.querySelector('div');
      expect(div.getAttribute('id')).toBe('email-field');
    });
  });

  describe('multiple form fields', () => {
    it('links each label to its own input', async () => {
      const page = await newSpecPage({
        components: [AegovFormField, AegovLabel, AegovInput],
        html: `
          <div>
            <aegov-form-field>
              <aegov-label>First Name</aegov-label>
              <aegov-input type="text"></aegov-input>
            </aegov-form-field>
            <aegov-form-field>
              <aegov-label>Last Name</aegov-label>
              <aegov-input type="text"></aegov-input>
            </aegov-form-field>
          </div>
        `,
      });
      const fields = page.doc.querySelectorAll('aegov-form-field');
      fields.forEach(field => {
        const label = field.querySelector('label');
        const input = field.querySelector('input');
        expect(label.getAttribute('for')).toBe(input.id);
      });
    });
  });
});
