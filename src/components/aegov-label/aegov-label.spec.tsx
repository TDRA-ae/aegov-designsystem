import { newSpecPage } from '@stencil/core/testing';
import { AegovLabel } from './aegov-label';

describe('aegov-label', () => {
  describe('rendering', () => {
    it('renders a label element', async () => {
      const page = await newSpecPage({
        components: [AegovLabel],
        html: `<aegov-label>Email</aegov-label>`,
      });
      const label = page.root.querySelector('label');
      expect(label).not.toBeNull();
    });

    it('renders slot content', async () => {
      const page = await newSpecPage({
        components: [AegovLabel],
        html: `<aegov-label>Email Address</aegov-label>`,
      });
      const label = page.root.querySelector('label');
      expect(label.textContent).toBe('Email Address');
    });

    it('renders with aegov-label class', async () => {
      const page = await newSpecPage({
        components: [AegovLabel],
        html: `<aegov-label>Email</aegov-label>`,
      });
      const label = page.root.querySelector('label');
      expect(label.className).toContain('aegov-label');
    });
  });

  describe('for prop', () => {
    it('sets for attribute on the label when for is provided', async () => {
      const page = await newSpecPage({
        components: [AegovLabel],
        html: `<aegov-label for="input-1">Email</aegov-label>`,
      });
      const label = page.root.querySelector('label');
      expect(label.getAttribute('for')).toBe('input-1');
    });

    it('does not set for attribute when for is not provided', async () => {
      const page = await newSpecPage({
        components: [AegovLabel],
        html: `<aegov-label>Email</aegov-label>`,
      });
      const label = page.root.querySelector('label');
      expect(label.getAttribute('for')).toBeNull();
    });

    it('updates for attribute when htmlFor prop changes', async () => {
      const page = await newSpecPage({
        components: [AegovLabel],
        html: `<aegov-label for="old-id">Email</aegov-label>`,
      });
      page.rootInstance.htmlFor = 'new-id';
      await page.waitForChanges();
      const label = page.root.querySelector('label');
      expect(label.getAttribute('for')).toBe('new-id');
    });
  });

  describe('custom class', () => {
    it('merges custom class with defaults', async () => {
      const page = await newSpecPage({
        components: [AegovLabel],
        html: `<aegov-label class="text-red-500">Email</aegov-label>`,
      });
      const label = page.root.querySelector('label');
      expect(label.className).toContain('aegov-label');
      expect(label.className).toContain('text-red-500');
    });
  });

  describe('pass-through attributes', () => {
    it('passes data-* attributes to label', async () => {
      const page = await newSpecPage({
        components: [AegovLabel],
        html: `<aegov-label data-testid="email-label">Email</aegov-label>`,
      });
      const label = page.root.querySelector('label');
      expect(label.getAttribute('data-testid')).toBe('email-label');
    });

    it('passes aria-* attributes to label', async () => {
      const page = await newSpecPage({
        components: [AegovLabel],
        html: `<aegov-label aria-hidden="true">Email</aegov-label>`,
      });
      const label = page.root.querySelector('label');
      expect(label.getAttribute('aria-hidden')).toBe('true');
    });

    it('passes id attribute to label', async () => {
      const page = await newSpecPage({
        components: [AegovLabel],
        html: `<aegov-label id="my-label">Email</aegov-label>`,
      });
      const label = page.root.querySelector('label');
      expect(label.getAttribute('id')).toBe('my-label');
    });
  });
});
