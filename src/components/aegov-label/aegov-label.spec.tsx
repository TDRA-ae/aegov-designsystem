import { newSpecPage } from '@stencil/core/testing';
import { AegovLabel } from './aegov-label';

describe('aegov-label', () => {
  it('renders a <label> element', async () => {
    const page = await newSpecPage({
      components: [AegovLabel],
      html: `<aegov-label>Email</aegov-label>`,
    });
    const label = page.root.querySelector('label');
    expect(label).toBeTruthy();
    expect(label.classList.contains('aegov-label')).toBe(true);
  });

  it('auto-generates a fieldId when none provided', async () => {
    const page = await newSpecPage({
      components: [AegovLabel],
      html: `<aegov-label>Email</aegov-label>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-label-\d+$/);
    expect(page.root.querySelector('label').id).toBe(page.rootInstance.fieldId);
  });

  it('respects an explicit fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovLabel],
      html: `<aegov-label field-id="my-label">Email</aegov-label>`,
    });
    expect(page.root.querySelector('label').id).toBe('my-label');
  });

  it('reflects the for attribute (htmlFor prop) onto the label', async () => {
    const page = await newSpecPage({
      components: [AegovLabel],
      html: `<aegov-label for="email-input">Email</aegov-label>`,
    });
    expect(page.root.querySelector('label').getAttribute('for')).toBe('email-input');
  });

  it('omits the for attribute when htmlFor is not set', async () => {
    const page = await newSpecPage({
      components: [AegovLabel],
      html: `<aegov-label>Email</aegov-label>`,
    });
    expect(page.root.querySelector('label').hasAttribute('for')).toBe(false);
  });

  it('appends extraClass to the label', async () => {
    const page = await newSpecPage({
      components: [AegovLabel],
      html: `<aegov-label extra-class="my-extra">x</aegov-label>`,
    });
    expect(page.root.querySelector('label').classList.contains('my-extra')).toBe(true);
  });

  it('renders default slot content', async () => {
    const page = await newSpecPage({
      components: [AegovLabel],
      html: `<aegov-label>Email address</aegov-label>`,
    });
    expect(page.root.textContent).toContain('Email address');
  });

  it('passes through aria-* and data-* attributes', async () => {
    const page = await newSpecPage({
      components: [AegovLabel],
      html: `<aegov-label aria-label="lbl" data-test="1">x</aegov-label>`,
    });
    const label = page.root.querySelector('label');
    expect(label.getAttribute('aria-label')).toBe('lbl');
    expect(label.getAttribute('data-test')).toBe('1');
  });

  it('updates label "for" when htmlFor changes at runtime', async () => {
    const page = await newSpecPage({
      components: [AegovLabel],
      html: `<aegov-label for="a">x</aegov-label>`,
    });
    page.rootInstance.htmlFor = 'b';
    await page.waitForChanges();
    expect(page.root.querySelector('label').getAttribute('for')).toBe('b');
  });
});
