import { newSpecPage } from '@stencil/core/testing';
import { AegovSeparator } from './aegov-separator';

describe('aegov-separator', () => {
  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator></aegov-separator>`,
    });

    expect(page.root).toEqualHtml(`
      <aegov-separator>
        <mock:shadow-root>
          <hr aria-orientation="horizontal" class="separator separator--horizontal" role="presentation"></hr>
        </mock:shadow-root>
      </aegov-separator>
    `);
  });

  it('should have default orientation of horizontal', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator></aegov-separator>`,
    });

    expect(page.rootInstance.orientation).toBe('horizontal');
  });

  it('should accept vertical orientation', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator orientation="vertical"></aegov-separator>`,
    });

    expect(page.rootInstance.orientation).toBe('vertical');
  });

  it('should render vertical separator correctly', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator orientation="vertical"></aegov-separator>`,
    });

    const hr = page.root.shadowRoot.querySelector('hr');
    expect(hr.classList.contains('separator--vertical')).toBe(true);
    expect(hr.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('should have default variant of default', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator></aegov-separator>`,
    });

    expect(page.rootInstance.variant).toBe('default');
  });

  it('should accept subtle variant', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator variant="subtle"></aegov-separator>`,
    });

    expect(page.rootInstance.variant).toBe('subtle');
  });

  it('should render subtle variant correctly', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator variant="subtle"></aegov-separator>`,
    });

    const hr = page.root.shadowRoot.querySelector('hr');
    expect(hr.classList.contains('separator--subtle')).toBe(true);
  });

  it('should have decorative default to true', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator></aegov-separator>`,
    });

    expect(page.rootInstance.decorative).toBe(true);
  });

  it('should accept decorative prop', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator decorative="false"></aegov-separator>`,
    });

    expect(page.rootInstance.decorative).toBe(false);
  });

  it('should use presentation role when decorative is true', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator decorative="true"></aegov-separator>`,
    });

    const hr = page.root.shadowRoot.querySelector('hr');
    expect(hr.getAttribute('role')).toBe('presentation');
  });

  it('should use separator role when decorative is false', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator decorative="false"></aegov-separator>`,
    });

    const hr = page.root.shadowRoot.querySelector('hr');
    expect(hr.getAttribute('role')).toBe('separator');
  });

  it('should accept text prop', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator text="or"></aegov-separator>`,
    });

    expect(page.rootInstance.text).toBe('or');
  });

  it('should render separator with text correctly', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator text="or"></aegov-separator>`,
    });

    const text = page.root.shadowRoot.querySelector('.separator__text');
    expect(text).not.toBeNull();
    expect(text.textContent).toBe('or');
  });

  it('should render separator with slot content', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator>OR</aegov-separator>`,
    });

    const text = page.root.shadowRoot.querySelector('.separator__text');
    expect(text).not.toBeNull();
  });

  it('should have separator--with-text class when text is provided', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator text="or"></aegov-separator>`,
    });

    const container = page.root.shadowRoot.querySelector('.separator');
    expect(container.classList.contains('separator--with-text')).toBe(true);
  });

  it('should render separator lines when text is provided', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator text="or"></aegov-separator>`,
    });

    const lines = page.root.shadowRoot.querySelectorAll('.separator__line');
    expect(lines.length).toBe(2);
  });

  it('should prefer text prop over slot content', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator text="PROP">SLOT</aegov-separator>`,
    });

    const text = page.root.shadowRoot.querySelector('.separator__text');
    expect(text.textContent).toBe('PROP');
  });

  it('should combine orientation and variant classes', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator orientation="vertical" variant="subtle"></aegov-separator>`,
    });

    const hr = page.root.shadowRoot.querySelector('hr');
    expect(hr.classList.contains('separator--vertical')).toBe(true);
    expect(hr.classList.contains('separator--subtle')).toBe(true);
  });

  it('should apply aria-orientation attribute', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator orientation="horizontal"></aegov-separator>`,
    });

    const hr = page.root.shadowRoot.querySelector('hr');
    expect(hr.getAttribute('aria-orientation')).toBe('horizontal');
  });
});
