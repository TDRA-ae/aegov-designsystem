import { newE2EPage } from '@stencil/core/testing';

describe('aegov-textarea (e2e)', () => {
  it('renders a native textarea', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-textarea></aegov-textarea>');
    const ta = await page.find('aegov-textarea textarea');
    expect(ta).not.toBeNull();
    expect(ta).toHaveClass('aegov-textarea');
  });

  it('typing fires aegovTextareaInput', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-textarea></aegov-textarea>');
    const host = await page.find('aegov-textarea');
    const spy = await host.spyOnEvent('aegovTextareaInput');
    const ta = await page.find('aegov-textarea textarea');
    await ta.press('a');
    await page.waitForChanges();
    expect(spy).toHaveReceivedEvent();
  });

  it('disables native textarea when is-disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-textarea is-disabled="true"></aegov-textarea>');
    const ta = await page.find('aegov-textarea textarea');
    expect(await ta.getProperty('disabled')).toBe(true);
  });

  it('renders character counter when maxlength is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-textarea maxlength="10" value="hi"></aegov-textarea>');
    const counter = await page.find('aegov-textarea .textarea__counter');
    expect(counter).not.toBeNull();
    expect(counter.textContent).toContain('2 / 10');
  });

  it('shows copy button only when readonly+copyable and clicking it sets copied state', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-textarea is-readonly="true" is-copyable="true" value="hello"></aegov-textarea>');
    await page.evaluate(() => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: () => Promise.resolve() },
        configurable: true,
      });
    });
    const btn = await page.find('aegov-textarea button.textarea__copy-btn');
    expect(btn).not.toBeNull();
    await btn.click();
    await page.waitForChanges();
    const updated = await page.find('aegov-textarea button.textarea__copy-btn');
    expect(updated).toHaveClass('textarea__copy-btn--copied');
  });

  it('forwards aria and data attributes to native textarea', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-textarea aria-label="message" data-foo="bar"></aegov-textarea>');
    const ta = await page.find('aegov-textarea textarea');
    expect(ta.getAttribute('aria-label')).toBe('message');
    expect(ta.getAttribute('data-foo')).toBe('bar');
  });

  it('reflects fieldId to native textarea id', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-textarea field-id="ta1"></aegov-textarea>');
    const ta = await page.find('aegov-textarea textarea');
    expect(ta.id).toBe('ta1');
  });
});
