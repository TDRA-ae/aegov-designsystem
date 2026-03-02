import { newSpecPage } from '@stencil/core/testing';
import { AegovProgress } from '../aegov-progress/aegov-progress';
import { AegovProgressStep } from './aegov-progress-step';

describe('aegov-progress-step', () => {
  // ============================================
  // RENDERING
  // ============================================

  it('renders inside parent', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="active">Step 1</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const step = page.root.querySelector('aegov-progress-step');
    expect(step).toBeTruthy();
  });

  it('throws error when used outside parent', async () => {
    await expect(
      newSpecPage({
        components: [AegovProgressStep],
        html: `<aegov-progress-step>Orphan</aegov-progress-step>`,
      })
    ).rejects.toThrow('[aegov-progress-step]');
  });

  // ============================================
  // DEFAULT VARIANT — INDICATOR
  // ============================================

  it('renders numbered indicator for pending step', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="pending">Review</aegov-progress-step>
        </aegov-progress>
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
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="active">Current</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const indicator = page.root.querySelector('.step__indicator');
    expect(indicator.classList.contains('step__indicator--active')).toBe(true);
    expect(indicator.querySelector('.step__number').textContent).toBe('1');
  });

  it('renders checkmark for completed step', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="completed">Done</aegov-progress-step>
        </aegov-progress>
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
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress size="sm">
          <aegov-progress-step status="active">Step</aegov-progress-step>
        </aegov-progress>
      `,
    });
    expect(page.root.querySelector('.step__indicator--sm')).toBeTruthy();
  });

  it('applies base size class by default', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="active">Step</aegov-progress-step>
        </aegov-progress>
      `,
    });
    expect(page.root.querySelector('.step__indicator--base')).toBeTruthy();
  });

  it('applies lg size class', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress size="lg">
          <aegov-progress-step status="active">Step</aegov-progress-step>
        </aegov-progress>
      `,
    });
    expect(page.root.querySelector('.step__indicator--lg')).toBeTruthy();
  });

  // ============================================
  // COMPACT VARIANT (dots)
  // ============================================

  it('renders dot for compact variant', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress variant="compact">
          <aegov-progress-step status="active">Step</aegov-progress-step>
        </aegov-progress>
      `,
    });
    expect(page.root.querySelector('.step__dot')).toBeTruthy();
    expect(page.root.querySelector('.step__indicator')).toBeNull();
  });

  it('applies dot status classes', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress variant="compact">
          <aegov-progress-step status="completed">S1</aegov-progress-step>
          <aegov-progress-step status="active">S2</aegov-progress-step>
          <aegov-progress-step status="pending">S3</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const dots = page.root.querySelectorAll('.step__dot');
    expect(dots[0].classList.contains('step__dot--completed')).toBe(true);
    expect(dots[1].classList.contains('step__dot--active')).toBe(true);
    expect(dots[2].classList.contains('step__dot--pending')).toBe(true);
  });

  it('hides labels in compact horizontal mode', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress variant="compact" orientation="horizontal">
          <aegov-progress-step status="active">Hidden Label</aegov-progress-step>
        </aegov-progress>
      `,
    });
    expect(page.root.querySelector('.step__text')).toBeNull();
  });

  it('shows labels in compact vertical mode', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress variant="compact" orientation="vertical">
          <aegov-progress-step status="active">Visible Label</aegov-progress-step>
        </aegov-progress>
      `,
    });
    expect(page.root.querySelector('.step__label')).toBeTruthy();
  });

  // ============================================
  // HORIZONTAL CONNECTORS (before + after)
  // ============================================

  it('first step has no before-connector (uses spacer)', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="completed">First</aegov-progress-step>
          <aegov-progress-step status="pending">Second</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-progress-step');
    // First step has a spacer, not a before-connector
    expect(steps[0].querySelector('.step__connector--before')).toBeNull();
    expect(steps[0].querySelector('.step__spacer')).toBeTruthy();
  });

  it('first step has an after-connector', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="completed">First</aegov-progress-step>
          <aegov-progress-step status="pending">Second</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-progress-step');
    expect(steps[0].querySelector('.step__connector--after')).toBeTruthy();
  });

  it('last step has no after-connector (uses spacer)', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="completed">First</aegov-progress-step>
          <aegov-progress-step status="pending">Last</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-progress-step');
    expect(steps[1].querySelector('.step__connector--after')).toBeNull();
    // Last step has a spacer on the right side
    const spacers = steps[1].querySelectorAll('.step__spacer');
    expect(spacers.length).toBeGreaterThan(0);
  });

  it('renders solid before-connector when previous step is completed', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="completed">First</aegov-progress-step>
          <aegov-progress-step status="active">Second</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-progress-step');
    const connector = steps[1].querySelector('.step__connector--before');
    expect(connector).toBeTruthy();
    expect(connector.classList.contains('step__connector--solid')).toBe(true);
  });

  it('renders dashed before-connector when previous step is not completed', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="active">First</aegov-progress-step>
          <aegov-progress-step status="pending">Second</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-progress-step');
    const connector = steps[1].querySelector('.step__connector--before');
    expect(connector.classList.contains('step__connector--dashed')).toBe(true);
  });

  it('renders solid after-connector when step is completed', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="completed">First</aegov-progress-step>
          <aegov-progress-step status="active">Second</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-progress-step');
    const afterConnector = steps[0].querySelector('.step__connector--after');
    expect(afterConnector).toBeTruthy();
    expect(afterConnector.classList.contains('step__connector--solid')).toBe(true);
  });

  it('renders dashed after-connector when step is not completed', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="active">First</aegov-progress-step>
          <aegov-progress-step status="pending">Second</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-progress-step');
    const afterConnector = steps[0].querySelector('.step__connector--after');
    expect(afterConnector.classList.contains('step__connector--dashed')).toBe(true);
  });

  it('renders horizontal connectors', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="completed">S1</aegov-progress-step>
          <aegov-progress-step status="active">S2</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const connector = page.root.querySelectorAll('aegov-progress-step')[1].querySelector('.step__connector');
    expect(connector.classList.contains('step__connector--horizontal')).toBe(true);
  });

  // ============================================
  // VERTICAL CONNECTORS
  // ============================================

  it('renders vertical connectors', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress orientation="vertical">
          <aegov-progress-step status="completed">S1</aegov-progress-step>
          <aegov-progress-step status="active">S2</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const connector = page.root.querySelectorAll('aegov-progress-step')[0].querySelector('.step__connector');
    expect(connector.classList.contains('step__connector--vertical')).toBe(true);
  });

  it('renders vertical connector below indicator (not last step)', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress orientation="vertical">
          <aegov-progress-step status="completed">S1</aegov-progress-step>
          <aegov-progress-step status="active">S2</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const firstStep = page.root.querySelectorAll('aegov-progress-step')[0];
    const connector = firstStep.querySelector('.step__connector--vertical');
    expect(connector).toBeTruthy();
  });

  it('does not render vertical connector on last step', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress orientation="vertical">
          <aegov-progress-step status="completed">S1</aegov-progress-step>
          <aegov-progress-step status="active">S2</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const lastStep = page.root.querySelectorAll('aegov-progress-step')[1];
    const connector = lastStep.querySelector('.step__connector--vertical');
    expect(connector).toBeNull();
  });

  // ============================================
  // LABELS & DESCRIPTIONS
  // ============================================

  it('renders step label', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="active">Account Setup</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const label = page.root.querySelector('.step__label');
    expect(label).toBeTruthy();
    expect(label.textContent).toBe('Account Setup');
  });

  it('renders description when provided', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="active" description="Fill in your details">Details</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const desc = page.root.querySelector('.step__description');
    expect(desc).toBeTruthy();
    expect(desc.textContent).toBe('Fill in your details');
  });

  it('does not render description when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="active">Details</aegov-progress-step>
        </aegov-progress>
      `,
    });
    expect(page.root.querySelector('.step__description')).toBeNull();
  });

  it('applies status classes to labels', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="completed">S1</aegov-progress-step>
          <aegov-progress-step status="active">S2</aegov-progress-step>
          <aegov-progress-step status="pending">S3</aegov-progress-step>
        </aegov-progress>
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
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="completed">S1</aegov-progress-step>
          <aegov-progress-step status="active">S2</aegov-progress-step>
          <aegov-progress-step status="pending">S3</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const lis = page.root.querySelectorAll('li');
    expect(lis[0].getAttribute('aria-current')).toBeNull();
    expect(lis[1].getAttribute('aria-current')).toBe('step');
    expect(lis[2].getAttribute('aria-current')).toBeNull();
  });

  it('includes sr-only text with step numbers', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="active">Details</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const srOnly = page.root.querySelector('.sr-only');
    expect(srOnly).toBeTruthy();
    expect(srOnly.textContent).toContain('Step 1 of 1');
  });

  it('connector has aria-hidden', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="completed">S1</aegov-progress-step>
          <aegov-progress-step status="active">S2</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const connector = page.root.querySelectorAll('aegov-progress-step')[1].querySelector('.step__connector');
    expect(connector.getAttribute('aria-hidden')).toBe('true');
  });

  // ============================================
  // CUSTOM ICON SLOT
  // ============================================

  it('renders custom icon slot (no default number shown)', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="active">
            <span slot="icon">★</span>
            Custom
          </aegov-progress-step>
        </aegov-progress>
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
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress orientation="vertical">
          <aegov-progress-step status="completed">S1</aegov-progress-step>
          <aegov-progress-step status="active">S2</aegov-progress-step>
        </aegov-progress>
      `,
    });
    expect(page.root.querySelector('.step--vertical')).toBeTruthy();
    expect(page.root.querySelector('.step__vertical-row')).toBeTruthy();
    expect(page.root.querySelector('.step__vertical-indicator')).toBeTruthy();
  });
});
