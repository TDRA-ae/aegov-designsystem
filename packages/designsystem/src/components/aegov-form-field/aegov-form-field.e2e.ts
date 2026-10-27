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

  it('reflects fieldId to the host, not the wrapper', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-form-field field-id="ff42"></aegov-form-field>');
    // The wrapper div lost its id in ab1e390; fieldId now reflects to the host.
    const host = await page.find('aegov-form-field');
    expect(host.getAttribute('field-id')).toBe('ff42');
    const wrapper = await page.find('aegov-form-field div.aegov-form-field');
    expect(wrapper.getAttribute('id')).toBeNull();
  });

  it('forwards aria and data attributes to wrapper', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-form-field aria-label="form" data-foo="bar"></aegov-form-field>');
    const wrapper = await page.find('aegov-form-field div.aegov-form-field');
    expect(wrapper.getAttribute('aria-label')).toBe('form');
    expect(wrapper.getAttribute('data-foo')).toBe('bar');
  });

  it('links aegov-label htmlFor to a standalone child aegov-checkbox fieldId', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-form-field>
        <aegov-label>Agree</aegov-label>
        <aegov-checkbox field-id="standalone-cb"></aegov-checkbox>
      </aegov-form-field>
    `);
    await page.waitForChanges();
    const label = await page.find('aegov-form-field aegov-label');
    expect(await label.getProperty('htmlFor')).toBe('standalone-cb');
  });

  // Regression coverage for #45. `this.el.querySelector('aegov-checkbox')`
  // has no concept of a checkbox-group boundary — it matched the group's
  // first nested checkbox, silently binding the label to one arbitrary
  // option instead of correctly linking to nothing (checkbox-group manages
  // its own <legend> and needs its own aria-labelledby instead).
  it('does not link aegov-label to a nested aegov-checkbox inside aegov-checkbox-group', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-form-field>
        <aegov-label>Services</aegov-label>
        <aegov-checkbox-group>
          <aegov-checkbox field-id="cb-a" value="a"></aegov-checkbox>
          <aegov-checkbox field-id="cb-b" value="b"></aegov-checkbox>
        </aegov-checkbox-group>
      </aegov-form-field>
    `);
    await page.waitForChanges();
    const label = await page.find('aegov-form-field aegov-label');
    expect(await label.getProperty('htmlFor')).toBeFalsy();
  });

  it('does not link aegov-label to a nested aegov-radio inside aegov-radio-group', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-form-field>
        <aegov-label>Choice</aegov-label>
        <aegov-radio-group>
          <aegov-radio field-id="r-a" value="a"></aegov-radio>
          <aegov-radio field-id="r-b" value="b"></aegov-radio>
        </aegov-radio-group>
      </aegov-form-field>
    `);
    await page.waitForChanges();
    const label = await page.find('aegov-form-field aegov-label');
    expect(await label.getProperty('htmlFor')).toBeFalsy();
  });

  /**
   * The dimmed-label rules in aegov-form-field.css are `:has(input:disabled)` selectors.
   * They previously targeted `aegov-input[disabled]` on the host, which never matched —
   * the prop is `isDisabled`, so no `disabled` attribute is ever set on the host.
   *
   * These run in a real browser, so they exercise the actual `:disabled` pseudo-class and
   * the computed colour rather than just the attribute the spec tests can see.
   */
  // Regression coverage for #46. Every aegov form control is `shadow: true` —
  // its real native <input>/<button> lives inside its own shadow root, which
  // NO CSS selector written from aegov-form-field.css can reach, regardless of
  // how it's written (the previous `:has(input:disabled)` etc. never matched
  // anything). The fix reads each control's own `isDisabled` property directly
  // in JS and toggles an `is-control-disabled` class instead.
  describe('dimmed label when the control is disabled (#46)', () => {
    const MARKUP = (tag: string, attr: string) => `
      <aegov-form-field>
        <aegov-label>Email address</aegov-label>
        <${tag} ${attr}></${tag}>
      </aegov-form-field>`;

    it('adds is-control-disabled and dims the label for a disabled aegov-input', async () => {
      const page = await newE2EPage();
      await page.setContent(MARKUP('aegov-input', 'is-disabled="true"'));
      await page.waitForChanges();

      const wrapper = await page.find('aegov-form-field div.aegov-form-field');
      expect(wrapper).toHaveClass('is-control-disabled');
    });

    it('does not add the class for an enabled aegov-input', async () => {
      const page = await newE2EPage();
      await page.setContent(MARKUP('aegov-input', ''));
      await page.waitForChanges();

      const wrapper = await page.find('aegov-form-field div.aegov-form-field');
      expect(wrapper).not.toHaveClass('is-control-disabled');
    });

    it('renders the label in a different colour when disabled', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        ${MARKUP('aegov-input', '')}
        ${MARKUP('aegov-input', 'is-disabled="true"')}`);
      await page.waitForChanges();

      const [enabled, disabled] = await page.evaluate(() =>
        Array.from(document.querySelectorAll('aegov-form-field label.aegov-label'))
          .map((el) => getComputedStyle(el).color),
      );

      expect(enabled).toBeTruthy();
      expect(disabled).toBeTruthy();
      expect(disabled).not.toBe(enabled);
    });

    // aegov-input never reflects isDisabled to a host attribute at all (unlike
    // checkbox/radio/toggle) — this specifically proves the fix works from the
    // live property alone, not by reading any attribute.
    it('dims the label when isDisabled is toggled true at runtime via property, with no declarative attribute', async () => {
      const page = await newE2EPage();
      await page.setContent(MARKUP('aegov-input', ''));
      await page.waitForChanges();

      const wrapper = await page.find('aegov-form-field div.aegov-form-field');
      expect(wrapper).not.toHaveClass('is-control-disabled');

      const input = await page.find('aegov-input');
      input.setProperty('isDisabled', true);
      await page.waitForChanges();

      const wrapperAfter = await page.find('aegov-form-field div.aegov-form-field');
      expect(wrapperAfter).toHaveClass('is-control-disabled');
    });

    it('dims the label while an ancestor fieldset disables the control, and un-dims it after', async () => {
      const page = await newE2EPage();
      await page.setContent(`<form><fieldset>${MARKUP('aegov-input', '')}</fieldset></form>`);
      await page.waitForChanges();

      await page.$eval('fieldset', (fs: HTMLFieldSetElement) => { fs.disabled = true; });
      await page.waitForChanges();
      expect(await page.find('aegov-form-field div.aegov-form-field')).toHaveClass('is-control-disabled');

      await page.$eval('fieldset', (fs: HTMLFieldSetElement) => { fs.disabled = false; });
      await page.waitForChanges();
      expect(await page.find('aegov-form-field div.aegov-form-field')).not.toHaveClass('is-control-disabled');
    });

    it('un-dims the label when the control is re-enabled at runtime', async () => {
      const page = await newE2EPage();
      await page.setContent(MARKUP('aegov-input', 'is-disabled="true"'));
      await page.waitForChanges();

      const input = await page.find('aegov-input');
      input.setProperty('isDisabled', false);
      await page.waitForChanges();

      const wrapper = await page.find('aegov-form-field div.aegov-form-field');
      expect(wrapper).not.toHaveClass('is-control-disabled');
    });

    // aegov-radio is a standalone control findControl() (the validation-cascade
    // lookup) deliberately never matches — the fix had to reuse linkChildren()'s
    // broader, label-linking priority list instead, specifically to cover this.
    it('also dims the label for a disabled standalone aegov-radio', async () => {
      const page = await newE2EPage();
      await page.setContent(MARKUP('aegov-radio', 'is-disabled="true"'));
      await page.waitForChanges();

      const wrapper = await page.find('aegov-form-field div.aegov-form-field');
      expect(wrapper).toHaveClass('is-control-disabled');
    });

    it('also dims the label for a disabled aegov-checkbox', async () => {
      const page = await newE2EPage();
      await page.setContent(MARKUP('aegov-checkbox', 'is-disabled="true"'));
      await page.waitForChanges();

      const wrapper = await page.find('aegov-form-field div.aegov-form-field');
      expect(wrapper).toHaveClass('is-control-disabled');
    });

    it('also dims the label for a disabled aegov-toggle', async () => {
      const page = await newE2EPage();
      await page.setContent(MARKUP('aegov-toggle', 'is-disabled="true"'));
      await page.waitForChanges();

      const wrapper = await page.find('aegov-form-field div.aegov-form-field');
      expect(wrapper).toHaveClass('is-control-disabled');
    });
  });

  // Regression coverage for #47. `variant` previously defaulted to 'primary',
  // the same string used for "explicitly chose primary" — so a child that
  // deliberately set variant="primary" was indistinguishable from one that
  // never touched it, and got silently overridden to match the wrapper.
  it("does not override a child's explicit variant=\"primary\" (#47)", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-form-field variant="secondary">
        <aegov-label>Explicit primary checkbox</aegov-label>
        <aegov-checkbox id="explicit-primary" variant="primary"></aegov-checkbox>
      </aegov-form-field>
      <aegov-form-field variant="secondary">
        <aegov-label>Unset checkbox</aegov-label>
        <aegov-checkbox id="unset"></aegov-checkbox>
      </aegov-form-field>
    `);
    await page.waitForChanges();

    const explicitPrimary = await page.find('#explicit-primary');
    const unset = await page.find('#unset');

    expect(await explicitPrimary.getProperty('variant')).toBe('primary');
    expect(await unset.getProperty('variant')).toBe('secondary');
  });

  describe('accessible name for the linked control (#51)', () => {
    // Native <label for> resolution can only reach the shadow-DOM host, never
    // the real internal <input> one level deeper — so the browser's
    // accessible-name computation stays stuck on the host's own placeholder
    // (or no name at all), even though focus delegation still works.
    it('sets aria-label on the real internal input, derived from the label text', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-form-field>
          <aegov-label>Full name as on Emirates ID</aegov-label>
          <aegov-input placeholder="Your full legal name"></aegov-input>
        </aegov-form-field>
      `);
      await page.waitForChanges();

      const name = await page.evaluate(() => {
        const input = document.querySelector('aegov-input');
        return input.shadowRoot.querySelector('input').getAttribute('aria-label');
      });
      expect(name).toBe('Full name as on Emirates ID');
    });

    it('sets aria-label on a standalone aegov-checkbox with no label prop of its own', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-form-field>
          <aegov-label>I confirm that the information provided is true and accurate</aegov-label>
          <aegov-checkbox></aegov-checkbox>
        </aegov-form-field>
      `);
      await page.waitForChanges();

      const name = await page.evaluate(() => {
        const cb = document.querySelector('aegov-checkbox');
        return cb.shadowRoot.querySelector('input').getAttribute('aria-label');
      });
      expect(name).toBe('I confirm that the information provided is true and accurate');
    });

    it("never overrides a control's own explicit aria-label", async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-form-field>
          <aegov-label>Visible Label Text</aegov-label>
          <aegov-input aria-label="Custom explicit label" placeholder="hint"></aegov-input>
        </aegov-form-field>
      `);
      await page.waitForChanges();

      const name = await page.evaluate(() => {
        const input = document.querySelector('aegov-input');
        return input.shadowRoot.querySelector('input').getAttribute('aria-label');
      });
      expect(name).toBe('Custom explicit label');
    });

    it('updates the accessible name when the label text changes at runtime', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-form-field>
          <aegov-label id="dyn-label">Original Label</aegov-label>
          <aegov-input placeholder="hint"></aegov-input>
        </aegov-form-field>
      `);
      await page.waitForChanges();

      await page.evaluate(() => {
        document.getElementById('dyn-label').textContent = 'Updated Label Text';
      });
      await page.waitForChanges();

      const name = await page.evaluate(() => {
        const input = document.querySelector('aegov-input');
        return input.shadowRoot.querySelector('input').getAttribute('aria-label');
      });
      expect(name).toBe('Updated Label Text');
    });
  });
});
