import { newE2EPage } from '@stencil/core/testing';

describe('aegov-timeline-step e2e', () => {
  // ============================================
  // RENDERING
  // ============================================

  it('renders inside parent', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="active">Step 1</aegov-timeline-step>
      </aegov-timeline>
    `);
    const step = await page.find('aegov-timeline-step');
    expect(step).not.toBeNull();
  });

  it('renders multiple steps', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="completed">Step 1</aegov-timeline-step>
        <aegov-timeline-step status="active">Step 2</aegov-timeline-step>
        <aegov-timeline-step status="pending">Step 3</aegov-timeline-step>
      </aegov-timeline>
    `);
    const steps = await page.findAll('aegov-timeline-step');
    expect(steps.length).toBe(3);
  });

  // ============================================
  // DEFAULT VARIANT — INDICATOR
  // ============================================

  it('renders numbered indicator for pending step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="pending">Review</aegov-timeline-step>
      </aegov-timeline>
    `);
    const indicator = await page.find('aegov-timeline-step .step__indicator');
    expect(indicator).not.toBeNull();
    expect(indicator).toHaveClass('step__indicator--pending');
    const number = await page.find('aegov-timeline-step .step__number');
    expect(number.textContent).toBe('1');
  });

  it('renders numbered indicator for active step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="active">Current</aegov-timeline-step>
      </aegov-timeline>
    `);
    const indicator = await page.find('aegov-timeline-step .step__indicator');
    expect(indicator).toHaveClass('step__indicator--active');
    const number = await page.find('aegov-timeline-step .step__number');
    expect(number.textContent).toBe('1');
  });

  it('renders checkmark for completed step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="completed">Done</aegov-timeline-step>
      </aegov-timeline>
    `);
    const indicator = await page.find('aegov-timeline-step .step__indicator');
    expect(indicator).toHaveClass('step__indicator--completed');
    const checkmark = await page.find('aegov-timeline-step .step__checkmark');
    expect(checkmark).not.toBeNull();
    const number = await page.find('aegov-timeline-step .step__number');
    expect(number).toBeNull();
  });

  // ============================================
  // SIZES
  // ============================================

  it('applies sm size class', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline size="sm">
        <aegov-timeline-step status="active">Step</aegov-timeline-step>
      </aegov-timeline>
    `);
    const indicator = await page.find('aegov-timeline-step .step__indicator--sm');
    expect(indicator).not.toBeNull();
  });

  it('applies lg size class', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline size="lg">
        <aegov-timeline-step status="active">Step</aegov-timeline-step>
      </aegov-timeline>
    `);
    const indicator = await page.find('aegov-timeline-step .step__indicator--lg');
    expect(indicator).not.toBeNull();
  });

  // ============================================
  // COMPACT VARIANT
  // ============================================

  it('renders dot for compact variant', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline variant="compact">
        <aegov-timeline-step status="active">Step</aegov-timeline-step>
      </aegov-timeline>
    `);
    const dot = await page.find('aegov-timeline-step .step__dot');
    expect(dot).not.toBeNull();
    const indicator = await page.find('aegov-timeline-step .step__indicator');
    expect(indicator).toBeNull();
  });

  it('applies dot status classes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline variant="compact">
        <aegov-timeline-step status="completed">S1</aegov-timeline-step>
        <aegov-timeline-step status="active">S2</aegov-timeline-step>
        <aegov-timeline-step status="pending">S3</aegov-timeline-step>
      </aegov-timeline>
    `);
    const dots = await page.findAll('aegov-timeline-step .step__dot');
    expect(dots[0]).toHaveClass('step__dot--completed');
    expect(dots[1]).toHaveClass('step__dot--active');
    expect(dots[2]).toHaveClass('step__dot--pending');
  });

  it('hides labels in compact horizontal mode', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline variant="compact" orientation="horizontal">
        <aegov-timeline-step status="active">Hidden Label</aegov-timeline-step>
      </aegov-timeline>
    `);
    const text = await page.find('aegov-timeline-step .step__text');
    expect(text).toBeNull();
  });

  // ============================================
  // CONNECTORS
  // ============================================

  it('first step has spacer instead of before-connector', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="completed">First</aegov-timeline-step>
        <aegov-timeline-step status="pending">Second</aegov-timeline-step>
      </aegov-timeline>
    `);
    const steps = await page.findAll('aegov-timeline-step');
    const beforeConnector = await steps[0].find('.step__connector--before');
    expect(beforeConnector).toBeNull();
    const spacer = await steps[0].find('.step__spacer');
    expect(spacer).not.toBeNull();
  });

  it('last step has spacer instead of after-connector', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="completed">First</aegov-timeline-step>
        <aegov-timeline-step status="pending">Last</aegov-timeline-step>
      </aegov-timeline>
    `);
    const steps = await page.findAll('aegov-timeline-step');
    const afterConnector = await steps[1].find('.step__connector--after');
    expect(afterConnector).toBeNull();
  });

  it('solid connector after completed step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="completed">First</aegov-timeline-step>
        <aegov-timeline-step status="active">Second</aegov-timeline-step>
      </aegov-timeline>
    `);
    const steps = await page.findAll('aegov-timeline-step');
    const afterConnector = await steps[0].find('.step__connector--after');
    expect(afterConnector).toHaveClass('step__connector--solid');
  });

  it('dashed connector after non-completed step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="active">First</aegov-timeline-step>
        <aegov-timeline-step status="pending">Second</aegov-timeline-step>
      </aegov-timeline>
    `);
    const steps = await page.findAll('aegov-timeline-step');
    const afterConnector = await steps[0].find('.step__connector--after');
    expect(afterConnector).toHaveClass('step__connector--dashed');
  });

  // ============================================
  // VERTICAL LAYOUT
  // ============================================

  it('renders vertical layout', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline orientation="vertical">
        <aegov-timeline-step status="completed">S1</aegov-timeline-step>
        <aegov-timeline-step status="active">S2</aegov-timeline-step>
      </aegov-timeline>
    `);
    const verticalRow = await page.find('aegov-timeline-step .step__vertical-row');
    expect(verticalRow).not.toBeNull();
  });

  it('renders vertical connector on non-last step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline orientation="vertical">
        <aegov-timeline-step status="completed">S1</aegov-timeline-step>
        <aegov-timeline-step status="active">S2</aegov-timeline-step>
      </aegov-timeline>
    `);
    const steps = await page.findAll('aegov-timeline-step');
    const connector = await steps[0].find('.step__connector--vertical');
    expect(connector).not.toBeNull();
  });

  it('no vertical connector on last step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline orientation="vertical">
        <aegov-timeline-step status="completed">S1</aegov-timeline-step>
        <aegov-timeline-step status="active">S2</aegov-timeline-step>
      </aegov-timeline>
    `);
    const steps = await page.findAll('aegov-timeline-step');
    const connector = await steps[1].find('.step__connector--vertical');
    expect(connector).toBeNull();
  });

  // ============================================
  // LABELS & DESCRIPTIONS
  // ============================================

  it('renders step label', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="active">Account Setup</aegov-timeline-step>
      </aegov-timeline>
    `);
    const label = await page.find('aegov-timeline-step .step__label');
    expect(label).not.toBeNull();
    expect(label.textContent).toBe('Account Setup');
  });

  it('renders description when provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="active" description="Fill in your details">Details</aegov-timeline-step>
      </aegov-timeline>
    `);
    const desc = await page.find('aegov-timeline-step .step__description');
    expect(desc).not.toBeNull();
    expect(desc.textContent).toBe('Fill in your details');
  });

  it('does not render description when not provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="active">Details</aegov-timeline-step>
      </aegov-timeline>
    `);
    const desc = await page.find('aegov-timeline-step .step__description');
    expect(desc).toBeNull();
  });

  // ============================================
  // ACCESSIBILITY
  // ============================================

  it('sets aria-current="step" on active step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="completed">S1</aegov-timeline-step>
        <aegov-timeline-step status="active">S2</aegov-timeline-step>
        <aegov-timeline-step status="pending">S3</aegov-timeline-step>
      </aegov-timeline>
    `);
    const lis = await page.findAll('aegov-timeline-step li');
    expect(lis[0].getAttribute('aria-current')).toBeNull();
    expect(lis[1].getAttribute('aria-current')).toBe('step');
    expect(lis[2].getAttribute('aria-current')).toBeNull();
  });

  it('includes sr-only text with step info', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="active">Details</aegov-timeline-step>
      </aegov-timeline>
    `);
    const srOnly = await page.find('aegov-timeline-step .sr-only');
    expect(srOnly).not.toBeNull();
    expect(srOnly.textContent).toContain('Step 1 of 1');
  });

  it('connector has aria-hidden', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="completed">S1</aegov-timeline-step>
        <aegov-timeline-step status="active">S2</aegov-timeline-step>
      </aegov-timeline>
    `);
    const connector = await page.find('aegov-timeline-step .step__connector');
    expect(connector.getAttribute('aria-hidden')).toBe('true');
  });
});
