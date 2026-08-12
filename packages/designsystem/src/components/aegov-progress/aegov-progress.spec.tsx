import { newSpecPage } from '@stencil/core/testing';
import { AegovProgress } from './aegov-progress';

describe('aegov-progress', () => {
  it('renders with default classes', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50"></aegov-progress>`,
    });
    const wrapper = page.root.querySelector('div.aegov-progress');
    expect(wrapper).not.toBeNull();
    expect(page.root.querySelector('.progress__track')).not.toBeNull();
    expect(page.root.querySelector('.progress__fill')).not.toBeNull();
  });

  it('auto-generates fieldId when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="20"></aegov-progress>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-progress-\d+$/);
    expect(page.root.querySelector('progress').id).toBe(page.rootInstance.fieldId);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="20" field-id="p1"></aegov-progress>`,
    });
    expect(page.root.querySelector('progress').id).toBe('p1');
  });

  it('computes fill width from value/max', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="25" max="100"></aegov-progress>`,
    });
    const fill = page.root.querySelector('.progress__fill') as HTMLElement;
    expect(fill.style.width).toBe('25%');
  });

  it('clamps percentage to max 100', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="500" max="100"></aegov-progress>`,
    });
    const fill = page.root.querySelector('.progress__fill') as HTMLElement;
    expect(fill.style.width).toBe('100%');
  });

  it('applies custom max', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="5" max="10"></aegov-progress>`,
    });
    const fill = page.root.querySelector('.progress__fill') as HTMLElement;
    expect(fill.style.width).toBe('50%');
    expect(page.root.querySelector("progress").getAttribute("max")).toBe("10");
  });

  it('renders indeterminate state when value is not set', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress></aegov-progress>`,
    });
    const track = page.root.querySelector('.progress__track');
    expect(track.className).toContain('progress__track--indeterminate');
    expect(page.root.querySelector('.progress__fill')).toBeNull();
  });

  it('applies height in rem from Tailwind spacing scale', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="10" height="4"></aegov-progress>`,
    });
    const track = page.root.querySelector('.progress__track') as HTMLElement;
    expect(track.style.height).toBe('1rem');
  });

  it('shows trailing counter when counter="trailing" and value set', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="40" counter="trailing"></aegov-progress>`,
    });
    expect(page.root.querySelector('.progress__counter--trailing')).not.toBeNull();
  });

  it('shows top counter when counter="top" and value set', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="40" counter="top"></aegov-progress>`,
    });
    expect(page.root.querySelector('.progress__counter--top')).not.toBeNull();
  });

  it('appends counter-suffix to counter value', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="40" counter="trailing" counter-suffix="%"></aegov-progress>`,
    });
    const counter = page.root.querySelector('.progress__counter--trailing');
    expect(counter.textContent).toBe('40%');
  });

  it('hides counter when indeterminate', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress counter="trailing"></aegov-progress>`,
    });
    expect(page.root.querySelector('.progress__counter')).toBeNull();
  });

  it('renders description when provided', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50" description="Almost there"></aegov-progress>`,
    });
    const desc = page.root.querySelector('.progress__description');
    expect(desc).not.toBeNull();
    expect(desc.textContent).toBe('Almost there');
  });

  it('applies extra-class', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="20" extra-class="custom"></aegov-progress>`,
    });
    expect(page.root.querySelector('div.aegov-progress').className).toContain('custom');
  });

  it('forwards aria-* and data-* to host', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="20" aria-label="upload" data-test="x"></aegov-progress>`,
    });
    expect(page.root.getAttribute('aria-label')).toBe('upload');
    expect(page.root.getAttribute('data-test')).toBe('x');
  });

  describe('accessible-label warning', () => {
    let warnSpy: jest.SpyInstance;
    beforeEach(() => { warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {}); });
    afterEach(() => { warnSpy.mockRestore(); });

    it('warns when no label, aria-label, or field-id is provided', async () => {
      await newSpecPage({ components: [AegovProgress], html: `<aegov-progress value="20"></aegov-progress>` });
      expect(warnSpy.mock.calls.some(c => String(c[0]).includes('no accessible label'))).toBe(true);
    });

    it('does NOT warn when the label prop is set', async () => {
      await newSpecPage({ components: [AegovProgress], html: `<aegov-progress value="20" label="Upload"></aegov-progress>` });
      expect(warnSpy.mock.calls.some(c => String(c[0]).includes('no accessible label'))).toBe(false);
    });

    it('does NOT warn when aria-label is set via pass-through, even without the label prop', async () => {
      await newSpecPage({ components: [AegovProgress], html: `<aegov-progress value="20" aria-label="Upload"></aegov-progress>` });
      expect(warnSpy.mock.calls.some(c => String(c[0]).includes('no accessible label'))).toBe(false);
    });

    it('still warns when field-id is provided but no matching <label for> exists and no label/aria-label is set', async () => {
      // Previously this case was silently treated as "probably labeled" just because
      // field-id was supplied — even with no label anywhere in the document.
      await newSpecPage({ components: [AegovProgress], html: `<aegov-progress value="20" field-id="p1"></aegov-progress>` });
      expect(warnSpy.mock.calls.some(c => String(c[0]).includes('no accessible label'))).toBe(true);
    });

    it('does NOT warn when a real <label for="fieldId"> exists in the document', async () => {
      await newSpecPage({
        components: [AegovProgress],
        html: `<label for="p2">Upload progress</label><aegov-progress value="20" field-id="p2"></aegov-progress>`,
      });
      expect(warnSpy.mock.calls.some(c => String(c[0]).includes('no accessible label'))).toBe(false);
    });
  });
});
