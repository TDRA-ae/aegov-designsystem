import { newE2EPage } from '@stencil/core/testing';

describe('aegov-form-field E2E', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-form-field></aegov-form-field>`);
      const element = await page.find('aegov-form-field');
      expect(element).toBeTruthy();
    });

    it('should render a div with aegov-form-field class', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-form-field></aegov-form-field>`);
      const div = await page.find('aegov-form-field div');
      expect(await div.getAttribute('class')).toContain('aegov-form-field');
    });
  });

  describe('auto-linking', () => {
    it('should auto-link label for to input id', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-form-field>
          <aegov-label>Email</aegov-label>
          <aegov-input type="email"></aegov-input>
        </aegov-form-field>
      `);
      const input = await page.find('aegov-form-field aegov-input input');
      const label = await page.find('aegov-form-field aegov-label label');
      const inputId = await input.getAttribute('id');
      const labelFor = await label.getAttribute('for');
      expect(labelFor).toBe(inputId);
    });

    it('should focus input when label is clicked', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-form-field>
          <aegov-label>Email</aegov-label>
          <aegov-input type="email"></aegov-input>
        </aegov-form-field>
      `);
      const label = await page.find('aegov-form-field aegov-label label');
      await label.click();
      const inputId = await page.evaluate(() => document.activeElement?.id);
      expect(inputId).toMatch(/^aegov-input-\d+$/);
    });

    it('should link label to input with custom input-id', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-form-field>
          <aegov-label>Email</aegov-label>
          <aegov-input input-id="custom-email" type="email"></aegov-input>
        </aegov-form-field>
      `);
      const label = await page.find('aegov-form-field aegov-label label');
      expect(await label.getAttribute('for')).toBe('custom-email');
    });
  });

  describe('multiple fields', () => {
    it('should link each label to its own input independently', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-form-field>
          <aegov-label>First Name</aegov-label>
          <aegov-input type="text"></aegov-input>
        </aegov-form-field>
        <aegov-form-field>
          <aegov-label>Last Name</aegov-label>
          <aegov-input type="text"></aegov-input>
        </aegov-form-field>
      `);

      const fields = await page.findAll('aegov-form-field');
      for (const field of fields) {
        const input = await field.find('aegov-input input');
        const label = await field.find('aegov-label label');
        const inputId = await input.getAttribute('id');
        const labelFor = await label.getAttribute('for');
        expect(labelFor).toBe(inputId);
      }
    });
  });

  describe('custom class', () => {
    it('should merge custom class with defaults', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-form-field class="mb-8"></aegov-form-field>`);
      const div = await page.find('aegov-form-field div');
      const cls = await div.getAttribute('class');
      expect(cls).toContain('aegov-form-field');
      expect(cls).toContain('mb-8');
    });
  });

  describe('with disabled input', () => {
    it('should render disabled input within form field', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-form-field>
          <aegov-label>Email</aegov-label>
          <aegov-input type="email" disabled></aegov-input>
        </aegov-form-field>
      `);
      const input = await page.find('aegov-form-field aegov-input input');
      expect(await input.getProperty('disabled')).toBe(true);
    });
  });

  describe('with readonly input', () => {
    it('should render readonly input within form field', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-form-field>
          <aegov-label>Email</aegov-label>
          <aegov-input type="email" readonly value="test@example.com"></aegov-input>
        </aegov-form-field>
      `);
      const input = await page.find('aegov-form-field aegov-input input');
      expect(await input.getProperty('readOnly')).toBe(true);
    });
  });
});
