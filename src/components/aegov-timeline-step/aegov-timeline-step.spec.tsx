import { newSpecPage } from '@stencil/core/testing';
import { AegovTimeline } from '../aegov-timeline/aegov-timeline';
import { AegovTimelineStep } from './aegov-timeline-step';

describe('aegov-timeline-step', () => {
  // ============================================
  // RENDERING
  // ============================================

  it('renders inside parent', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="active">Step 1</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const step = page.root.querySelector('aegov-timeline-step');
    expect(step).toBeTruthy();
  });

  it('throws error when used outside parent', async () => {
    await expect(
      newSpecPage({
        components: [AegovTimelineStep],
        html: `<aegov-timeline-step>Orphan</aegov-timeline-step>`,
      })
    ).rejects.toThrow('[aegov-timeline-step]');
  });

  // ============================================
  // DEFAULT VARIANT — INDICATOR
  // ============================================

  it('renders numbered indicator for pending step', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="pending">Review</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const indicator = page.root.querySelector('.step__indicator');
    expect(indicator).toBeTruthy();
    expect(indicator.classList.contains('step__indicator--pending')).toBe(true);
    const number = indicator.querySelector('.step__number');
    expect(number.textContent).toBe('1');
  });

  it('renders numbered indicator for active step', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="active">Current</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const indicator = page.root.querySelector('.step__indicator');
    expect(indicator.classList.contains('step__indicator--active')).toBe(true);
    expect(indicator.querySelector('.step__number').textContent).toBe('1');
  });

  it('renders checkmark for completed step', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="completed">Done</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const indicator = page.root.querySelector('.step__indicator');
    expect(indicator.classList.contains('step__indicator--completed')).toBe(true);
    expect(indicator.querySelector('.step__checkmark')).toBeTruthy();
    expect(indicator.querySelector('.step__number')).toBeNull();
  });

  // ============================================
  // SIZES
  // ============================================

  it('applies sm size class', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline size="sm">
          <aegov-timeline-step status="active">Step</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    expect(page.root.querySelector('.step__indicator--sm')).toBeTruthy();
  });

  it('applies base size class by default', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="active">Step</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    expect(page.root.querySelector('.step__indicator--base')).toBeTruthy();
  });

  it('applies lg size class', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline size="lg">
          <aegov-timeline-step status="active">Step</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    expect(page.root.querySelector('.step__indicator--lg')).toBeTruthy();
  });

  // ============================================
  // COMPACT VARIANT (dots)
  // ============================================

  it('renders dot for compact variant', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline variant="compact">
          <aegov-timeline-step status="active">Step</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    expect(page.root.querySelector('.step__dot')).toBeTruthy();
    expect(page.root.querySelector('.step__indicator')).toBeNull();
  });

  it('applies dot status classes', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline variant="compact">
          <aegov-timeline-step status="completed">S1</aegov-timeline-step>
          <aegov-timeline-step status="active">S2</aegov-timeline-step>
          <aegov-timeline-step status="pending">S3</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const dots = page.root.querySelectorAll('.step__dot');
    expect(dots[0].classList.contains('step__dot--completed')).toBe(true);
    expect(dots[1].classList.contains('step__dot--active')).toBe(true);
    expect(dots[2].classList.contains('step__dot--pending')).toBe(true);
  });

  it('hides labels in compact horizontal mode', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline variant="compact" orientation="horizontal">
          <aegov-timeline-step status="active">Hidden Label</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    expect(page.root.querySelector('.step__text')).toBeNull();
  });

  it('shows labels in compact vertical mode', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline variant="compact" orientation="vertical">
          <aegov-timeline-step status="active">Visible Label</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    expect(page.root.querySelector('.step__label')).toBeTruthy();
  });

  // ============================================
  // HORIZONTAL CONNECTORS (before + after)
  // ============================================

  it('first step has no before-connector (uses spacer)', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="completed">First</aegov-timeline-step>
          <aegov-timeline-step status="pending">Second</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-timeline-step');
    // First step has a spacer, not a before-connector
    expect(steps[0].querySelector('.step__connector--before')).toBeNull();
    expect(steps[0].querySelector('.step__spacer')).toBeTruthy();
  });

  it('first step has an after-connector', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="completed">First</aegov-timeline-step>
          <aegov-timeline-step status="pending">Second</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-timeline-step');
    expect(steps[0].querySelector('.step__connector--after')).toBeTruthy();
  });

  it('last step has no after-connector (uses spacer)', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="completed">First</aegov-timeline-step>
          <aegov-timeline-step status="pending">Last</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-timeline-step');
    expect(steps[1].querySelector('.step__connector--after')).toBeNull();
    // Last step has a spacer on the right side
    const spacers = steps[1].querySelectorAll('.step__spacer');
    expect(spacers.length).toBeGreaterThan(0);
  });

  it('renders solid before-connector when previous step is completed', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="completed">First</aegov-timeline-step>
          <aegov-timeline-step status="active">Second</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-timeline-step');
    const connector = steps[1].querySelector('.step__connector--before');
    expect(connector).toBeTruthy();
    expect(connector.classList.contains('step__connector--solid')).toBe(true);
  });

  it('renders dashed before-connector when previous step is not completed', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="active">First</aegov-timeline-step>
          <aegov-timeline-step status="pending">Second</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-timeline-step');
    const connector = steps[1].querySelector('.step__connector--before');
    expect(connector.classList.contains('step__connector--dashed')).toBe(true);
  });

  it('renders solid after-connector when step is completed', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="completed">First</aegov-timeline-step>
          <aegov-timeline-step status="active">Second</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-timeline-step');
    const afterConnector = steps[0].querySelector('.step__connector--after');
    expect(afterConnector).toBeTruthy();
    expect(afterConnector.classList.contains('step__connector--solid')).toBe(true);
  });

  it('renders dashed after-connector when step is not completed', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="active">First</aegov-timeline-step>
          <aegov-timeline-step status="pending">Second</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-timeline-step');
    const afterConnector = steps[0].querySelector('.step__connector--after');
    expect(afterConnector.classList.contains('step__connector--dashed')).toBe(true);
  });

  it('renders horizontal connectors', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="completed">S1</aegov-timeline-step>
          <aegov-timeline-step status="active">S2</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const connector = page.root.querySelectorAll('aegov-timeline-step')[1].querySelector('.step__connector');
    expect(connector.classList.contains('step__connector--horizontal')).toBe(true);
  });

  // ============================================
  // VERTICAL CONNECTORS
  // ============================================

  it('renders vertical connectors', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline orientation="vertical">
          <aegov-timeline-step status="completed">S1</aegov-timeline-step>
          <aegov-timeline-step status="active">S2</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const connector = page.root.querySelectorAll('aegov-timeline-step')[0].querySelector('.step__connector');
    expect(connector.classList.contains('step__connector--vertical')).toBe(true);
  });

  it('renders vertical connector below indicator (not last step)', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline orientation="vertical">
          <aegov-timeline-step status="completed">S1</aegov-timeline-step>
          <aegov-timeline-step status="active">S2</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const firstStep = page.root.querySelectorAll('aegov-timeline-step')[0];
    const connector = firstStep.querySelector('.step__connector--vertical');
    expect(connector).toBeTruthy();
  });

  it('does not render vertical connector on last step', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline orientation="vertical">
          <aegov-timeline-step status="completed">S1</aegov-timeline-step>
          <aegov-timeline-step status="active">S2</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const lastStep = page.root.querySelectorAll('aegov-timeline-step')[1];
    const connector = lastStep.querySelector('.step__connector--vertical');
    expect(connector).toBeNull();
  });

  // ============================================
  // LABELS & DESCRIPTIONS
  // ============================================

  it('renders step label', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="active">Account Setup</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const label = page.root.querySelector('.step__label');
    expect(label).toBeTruthy();
    expect(label.textContent).toBe('Account Setup');
  });

  it('renders description when provided', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="active" description="Fill in your details">Details</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const desc = page.root.querySelector('.step__description');
    expect(desc).toBeTruthy();
    expect(desc.textContent).toBe('Fill in your details');
  });

  it('does not render description when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="active">Details</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    expect(page.root.querySelector('.step__description')).toBeNull();
  });

  it('applies status classes to labels', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="completed">S1</aegov-timeline-step>
          <aegov-timeline-step status="active">S2</aegov-timeline-step>
          <aegov-timeline-step status="pending">S3</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const labels = page.root.querySelectorAll('.step__label');
    expect(labels[0].classList.contains('step__label--completed')).toBe(true);
    expect(labels[1].classList.contains('step__label--active')).toBe(true);
    expect(labels[2].classList.contains('step__label--pending')).toBe(true);
  });

  // ============================================
  // ACCESSIBILITY
  // ============================================

  it('sets aria-current="step" on active step', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="completed">S1</aegov-timeline-step>
          <aegov-timeline-step status="active">S2</aegov-timeline-step>
          <aegov-timeline-step status="pending">S3</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const lis = page.root.querySelectorAll('li');
    expect(lis[0].getAttribute('aria-current')).toBeNull();
    expect(lis[1].getAttribute('aria-current')).toBe('step');
    expect(lis[2].getAttribute('aria-current')).toBeNull();
  });

  it('includes sr-only text with step numbers', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="active">Details</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const srOnly = page.root.querySelector('.sr-only');
    expect(srOnly).toBeTruthy();
    expect(srOnly.textContent).toContain('Step 1 of 1');
  });

  it('connector has aria-hidden', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="completed">S1</aegov-timeline-step>
          <aegov-timeline-step status="active">S2</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const connector = page.root.querySelectorAll('aegov-timeline-step')[1].querySelector('.step__connector');
    expect(connector.getAttribute('aria-hidden')).toBe('true');
  });

  // ============================================
  // CUSTOM ICON SLOT
  // ============================================

  it('renders custom icon slot (no default number shown)', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="active">
            <span slot="icon">★</span>
            Custom
          </aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const indicator = page.root.querySelector('.step__indicator');
    expect(indicator).toBeTruthy();
    // When icon slot is present, the default number should not render
    expect(indicator.querySelector('.step__number')).toBeNull();
  });

  // ============================================
  // VERTICAL LAYOUT
  // ============================================

  it('renders vertical layout structure', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline orientation="vertical">
          <aegov-timeline-step status="completed">S1</aegov-timeline-step>
          <aegov-timeline-step status="active">S2</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    expect(page.root.querySelector('.step--vertical')).toBeTruthy();
    expect(page.root.querySelector('.step__vertical-row')).toBeTruthy();
    expect(page.root.querySelector('.step__vertical-indicator')).toBeTruthy();
  });

  // ============================================
  // INVALID PROP VALUES
  // ============================================

  describe('invalid prop values', () => {
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
      warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    it('falls back to default status class when status is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovTimeline, AegovTimelineStep],
        html: `
          <aegov-timeline>
            <aegov-timeline-step status="nope">Bad</aegov-timeline-step>
          </aegov-timeline>
        `,
      });
      expect(page.root.querySelector('.step__indicator--pending')).toBeTruthy();
    });

    it('warns with component name, prop name, invalid value, and fallback', async () => {
      await newSpecPage({
        components: [AegovTimeline, AegovTimelineStep],
        html: `
          <aegov-timeline>
            <aegov-timeline-step status="nope">Bad</aegov-timeline-step>
          </aegov-timeline>
        `,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const statusWarn = messages.find(m => m.includes('[aegov-timeline-step]') && m.includes('"nope"'));
      expect(statusWarn).toBeDefined();
      expect(statusWarn).toContain('"status"');
    });

    it('does not warn when all props are valid', async () => {
      await newSpecPage({
        components: [AegovTimeline, AegovTimelineStep],
        html: `
          <aegov-timeline>
            <aegov-timeline-step status="active">Good</aegov-timeline-step>
          </aegov-timeline>
        `,
      });
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('warns again via @Watch when status is updated to an invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovTimeline, AegovTimelineStep],
        html: `
          <aegov-timeline>
            <aegov-timeline-step status="pending">Step</aegov-timeline-step>
          </aegov-timeline>
        `,
      });
      expect(warnSpy).not.toHaveBeenCalled();

      const step = page.root.querySelector('aegov-timeline-step');
      step.setAttribute('status', 'broken');
      await page.waitForChanges();

      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const invalidWarn = messages.find(m => m.includes('[aegov-timeline-step]') && m.includes('"broken"'));
      expect(invalidWarn).toBeDefined();
      expect(invalidWarn).toContain('"status"');
    });
  });
});
