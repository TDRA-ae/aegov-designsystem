import { newE2EPage } from '@stencil/core/testing';

describe('aegov-form-field (e2e)', () => {
  it('renders with the form-field class', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-form-field></aegov-form-field>');
    const wrapper = await page.find('aegov-form-field div.aegov-form-field');
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveClass('aegov-form-field');
  });

  it('renders slot content', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-form-field><span class="kid">hi</span></aegov-form-field>');
    const child = await page.find('aegov-form-field .kid');
    expect(child).not.toBeNull();
    expect(child.textContent).toBe('hi');
  });

  it('links aegov-label htmlFor to child aegov-input fieldId', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-form-field>
        <aegov-label>Name</aegov-label>
        <aegov-input field-id="name-input"></aegov-input>
      </aegov-form-field>
    `);
    await page.waitForChanges();
    const label = await page.find('aegov-form-field aegov-label');
    expect(await label.getProperty('htmlFor')).toBe('name-input');
  });

  it('links aegov-label htmlFor to child aegov-textarea fieldId', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-form-field>
        <aegov-label>Notes</aegov-label>
        <aegov-textarea field-id="notes-ta"></aegov-textarea>
      </aegov-form-field>
    `);
    await page.waitForChanges();
    const label = await page.find('aegov-form-field aegov-label');
    expect(await label.getProperty('htmlFor')).toBe('notes-ta');
  });

  it('reflects fieldId to wrapper id', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-form-field field-id="ff42"></aegov-form-field>');
    const wrapper = await page.find('aegov-form-field div.aegov-form-field');
    expect(wrapper.id).toBe('ff42');
  });

  it('forwards aria and data attributes to wrapper', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-form-field aria-label="form" data-foo="bar"></aegov-form-field>');
    const wrapper = await page.find('aegov-form-field div.aegov-form-field');
    expect(wrapper.getAttribute('aria-label')).toBe('form');
    expect(wrapper.getAttribute('data-foo')).toBe('bar');
  });

  /**
   * The dimmed-label rules in aegov-form-field.css are `:has(input:disabled)` selectors.
   * They previously targeted `aegov-input[disabled]` on the host, which never matched —
   * the prop is `isDisabled`, so no `disabled` attribute is ever set on the host.
   *
   * These run in a real browser, so they exercise the actual `:disabled` pseudo-class and
   * the computed colour rather than just the attribute the spec tests can see.
   */
  describe('dimmed label when the control is disabled', () => {
    const MARKUP = (attr: string) => `
      <aegov-form-field>
        <aegov-label>Email address</aegov-label>
        <aegov-input ${attr}></aegov-input>
      </aegov-form-field>`;

    it('the :has(input:disabled) selector matches a disabled control', async () => {
      const page = await newE2EPage();
      await page.setContent(MARKUP('is-disabled="true"'));
      await page.waitForChanges();

      const matches = await page.evaluate(() =>
        !!document.querySelector('.aegov-form-field:has(input:disabled) .aegov-label'),
      );
      expect(matches).toBe(true);
    });

    it('does not match an enabled control', async () => {
      const page = await newE2EPage();
      await page.setContent(MARKUP(''));
      await page.waitForChanges();

      const matches = await page.evaluate(() =>
        !!document.querySelector('.aegov-form-field:has(input:disabled) .aegov-label'),
      );
      expect(matches).toBe(false);
    });

    it('renders the label in a different colour when disabled', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        ${MARKUP('')}
        ${MARKUP('is-disabled="true"')}`);
      await page.waitForChanges();

      const [enabled, disabled] = await page.evaluate(() =>
        Array.from(document.querySelectorAll('aegov-form-field label.aegov-label'))
          .map((el) => getComputedStyle(el).color),
      );

      expect(enabled).toBeTruthy();
      expect(disabled).toBeTruthy();
      expect(disabled).not.toBe(enabled);
    });

    it('un-dims the label when the control is re-enabled at runtime', async () => {
      const page = await newE2EPage();
      await page.setContent(MARKUP('is-disabled="true"'));
      await page.waitForChanges();

      const dimmed = await page.evaluate(
        () => getComputedStyle(document.querySelector('label.aegov-label')!).color,
      );

      const input = await page.find('aegov-input');
      input.setProperty('isDisabled', false);
      await page.waitForChanges();

      const restored = await page.evaluate(
        () => getComputedStyle(document.querySelector('label.aegov-label')!).color,
      );

      expect(restored).not.toBe(dimmed);
    });
  });
});
