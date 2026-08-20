import { newSpecPage } from '@stencil/core/testing';
import { AegovFooterHighlights } from './aegov-footer-highlights';
import { AegovLink } from '../aegov-link/aegov-link';

describe('aegov-footer-highlights', () => {
  it('renders the start card with the default slot content', async () => {
    const page = await newSpecPage({
      components: [AegovFooterHighlights, AegovLink],
      html: `<aegov-footer-highlights><p>Sign up for updates.</p></aegov-footer-highlights>`,
    });
    const startCard = page.root.querySelector('.aegov-footer-highlights__card--start');
    expect(startCard).not.toBeNull();
    expect(startCard.querySelector('p').textContent).toBe('Sign up for updates.');
  });

  it('renders the start card as a plain div with no imposed background/shadow classes', async () => {
    const page = await newSpecPage({
      components: [AegovFooterHighlights, AegovLink],
      html: `<aegov-footer-highlights><div class="bg-primary-900 shadow-lg rounded-xl p-6"><p>Sign up for updates.</p></div></aegov-footer-highlights>`,
    });
    const startCard = page.root.querySelector('.aegov-footer-highlights__card--start');
    expect(startCard.tagName).toBe('DIV');
    expect(startCard.className.trim()).toBe('aegov-footer-highlights__card aegov-footer-highlights__card--start');
    // The background/shadow/radius/padding all come from the author's own slotted div, not this wrapper.
    const authored = startCard.querySelector('.bg-primary-900');
    expect(authored).not.toBeNull();
  });

  it('always renders the fixed Tawasul block with tel/whatsapp links — no prop to hide it', async () => {
    const page = await newSpecPage({
      components: [AegovFooterHighlights, AegovLink],
      html: `<aegov-footer-highlights></aegov-footer-highlights>`,
    });
    const endCard = page.root.querySelector('.aegov-footer-highlights__card--end');
    expect(endCard).not.toBeNull();
    expect(endCard.querySelector('a[href="tel:171"]')).not.toBeNull();
    expect(endCard.querySelector('a[href="https://wa.me/97147771777"]')).not.toBeNull();
  });

  it('does not render a contact-number row when entityContactNumber is not provided', async () => {
    const page = await newSpecPage({
      components: [AegovFooterHighlights, AegovLink],
      html: `<aegov-footer-highlights></aegov-footer-highlights>`,
    });
    expect(page.root.querySelector('.aegov-footer-highlights__row')).toBeNull();
  });

  it('makes the entity contact number a tappable tel: link, sanitizing formatting characters', async () => {
    const page = await newSpecPage({
      components: [AegovFooterHighlights, AegovLink],
      html: `<aegov-footer-highlights entity-contact-number="800 8877"></aegov-footer-highlights>`,
    });
    const link = page.root.querySelector('.aegov-footer-highlights__row a');
    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe('tel:8008877');
    expect(link.textContent.trim()).toBe('800 8877');
  });

  it('defaults the contact-number label to the bilingual "Toll free" text', async () => {
    const page = await newSpecPage({
      components: [AegovFooterHighlights, AegovLink],
      html: `<aegov-footer-highlights entity-contact-number="800 8877"></aegov-footer-highlights>`,
    });
    const label = page.root.querySelector('.aegov-footer-highlights__row-label');
    expect(label.textContent.trim()).toBe('Toll free');
  });

  it('overrides the contact-number label with entityContactNumberLabel', async () => {
    const page = await newSpecPage({
      components: [AegovFooterHighlights, AegovLink],
      html: `<aegov-footer-highlights entity-contact-number="800 8877" entity-contact-number-label="Hotline"></aegov-footer-highlights>`,
    });
    const label = page.root.querySelector('.aegov-footer-highlights__row-label');
    expect(label.textContent.trim()).toBe('Hotline');
  });

  it('renders a mailto: link for entityEmail, defaulting the label to "Email"', async () => {
    const page = await newSpecPage({
      components: [AegovFooterHighlights, AegovLink],
      html: `<aegov-footer-highlights entity-email="info@example.gov.ae"></aegov-footer-highlights>`,
    });
    const rows = page.root.querySelectorAll('.aegov-footer-highlights__row');
    expect(rows.length).toBe(1);
    const link = rows[0].querySelector('a');
    expect(link.getAttribute('href')).toBe('mailto:info@example.gov.ae');
    expect(rows[0].querySelector('.aegov-footer-highlights__row-label').textContent.trim()).toBe('Email');
  });

  it('renders both contact-number and email rows together when both are provided', async () => {
    const page = await newSpecPage({
      components: [AegovFooterHighlights, AegovLink],
      html: `<aegov-footer-highlights entity-contact-number="800 8877" entity-email="info@example.gov.ae"></aegov-footer-highlights>`,
    });
    const rows = page.root.querySelectorAll('.aegov-footer-highlights__row');
    expect(rows.length).toBe(2);
  });

  it('does not render the fixed "Contact us" link when entityContactHref is not provided', async () => {
    const page = await newSpecPage({
      components: [AegovFooterHighlights, AegovLink],
      html: `<aegov-footer-highlights entity-contact-number="800 8877"></aegov-footer-highlights>`,
    });
    expect(page.root.querySelector('.aegov-footer-highlights__contact-link')).toBeNull();
  });

  it('renders the fixed "Contact us" link pointing at entityContactHref', async () => {
    const page = await newSpecPage({
      components: [AegovFooterHighlights, AegovLink],
      html: `<aegov-footer-highlights entity-contact-href="/contact"></aegov-footer-highlights>`,
    });
    const link = page.root.querySelector('.aegov-footer-highlights__contact-link');
    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe('/contact');
    expect(link.textContent.trim()).toContain('Contact us');
  });

  it('translates the fixed strings under an RTL ancestor', async () => {
    const page = await newSpecPage({
      components: [AegovFooterHighlights, AegovLink],
      html: `<div dir="rtl"><aegov-footer-highlights></aegov-footer-highlights></div>`,
    });
    const eyebrow = page.body.querySelector('.aegov-footer-highlights__eyebrow');
    expect(eyebrow.textContent.trim()).toBe('التعليقات أو الشكاوى');
  });
});
