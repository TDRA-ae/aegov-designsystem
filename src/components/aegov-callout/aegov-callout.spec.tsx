import { newSpecPage } from '@stencil/core/testing';
import { AegovCallout } from './aegov-callout';

describe('aegov-callout', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [AegovCallout],
      html: `<aegov-callout><span slot="content">Hello</span></aegov-callout>`,
    });
    const root = page.root.querySelector('[data-aegov-callout]');
    expect(root).not.toBeNull();
    expect(root.className).toContain('aegov-callout');
    expect(root.className).toContain('callout-default');
    expect(root.className).toContain('callout-soft');
    expect(root.className).toContain('callout-base');
    expect(root.getAttribute('role')).toBe('alert');
  });

  it('auto-generates fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovCallout],
      html: `<aegov-callout></aegov-callout>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-callout-\d+$/);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovCallout],
      html: `<aegov-callout field-id="c1"></aegov-callout>`,
    });
    expect(page.rootInstance.fieldId).toBe('c1');
    const root = page.root.querySelector('[data-aegov-callout]');
    expect(root.id).toBe('c1');
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [AegovCallout],
      html: `<aegov-callout variant="error"></aegov-callout>`,
    });
    expect(page.root.querySelector('[data-aegov-callout]').className).toContain('callout-error');
  });

  it('applies appearance="solid" class', async () => {
    const page = await newSpecPage({
      components: [AegovCallout],
      html: `<aegov-callout appearance="solid"></aegov-callout>`,
    });
    expect(page.root.querySelector('[data-aegov-callout]').className).toContain('callout-solid');
  });

  it('applies size="lg" classes', async () => {
    const page = await newSpecPage({
      components: [AegovCallout],
      html: `<aegov-callout size="lg"></aegov-callout>`,
    });
    const cls = page.root.querySelector('[data-aegov-callout]').className;
    expect(cls).toContain('callout-lg');
    expect(cls).toContain('text-lg');
  });

  it('does not render dismiss button by default', async () => {
    const page = await newSpecPage({
      components: [AegovCallout],
      html: `<aegov-callout></aegov-callout>`,
    });
    expect(page.root.querySelector('button[aria-label="Close callout"]')).toBeNull();
  });

  it('renders dismiss button when is-dismissible', async () => {
    const page = await newSpecPage({
      components: [AegovCallout],
      html: `<aegov-callout is-dismissible="true"></aegov-callout>`,
    });
    expect(page.root.querySelector('button[aria-label="Close callout"]')).not.toBeNull();
  });

  it('emits aegovCalloutDismiss and hides on dismiss', async () => {
    const page = await newSpecPage({
      components: [AegovCallout],
      html: `<aegov-callout is-dismissible="true"></aegov-callout>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovCalloutDismiss', spy);
    const btn = page.root.querySelector('button[aria-label="Close callout"]') as HTMLButtonElement;
    btn.click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(page.rootInstance.isVisible).toBe(false);
    // After dismiss, render returns null
    expect(page.root.querySelector('[data-aegov-callout]')).toBeNull();
  });

  it('detects actions slot when present', async () => {
    const page = await newSpecPage({
      components: [AegovCallout],
      html: `<aegov-callout><div slot="actions">act</div></aegov-callout>`,
    });
    expect(page.rootInstance.hasActionsSlot).toBe(true);
    expect(page.root.querySelector('.callout__actions')).not.toBeNull();
  });

  it('detects icon slot when present', async () => {
    const page = await newSpecPage({
      components: [AegovCallout],
      html: `<aegov-callout><svg slot="icon"></svg></aegov-callout>`,
    });
    expect(page.rootInstance.hasIconSlot).toBe(true);
  });

  it('renders content slot', async () => {
    const page = await newSpecPage({
      components: [AegovCallout],
      html: `<aegov-callout><p slot="content">Body</p></aegov-callout>`,
    });
    expect(page.root.textContent).toContain('Body');
  });
});
