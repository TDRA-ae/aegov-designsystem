import { newE2EPage } from '@stencil/core/testing';

describe('aegov-progress-step e2e', () => {
  // ============================================
  // RENDERING
  // ============================================

  it('renders inside parent', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress>
        <aegov-progress-step status="active">Step 1</aegov-progress-step>
      </aegov-progress>
    `);
    const step = await page.find('aegov-progress-step');
    expect(step).not.toBeNull();
  });

  it('renders multiple steps', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress>
        <aegov-progress-step status="completed">Step 1</aegov-progress-step>
        <aegov-progress-step status="active">Step 2</aegov-progress-step>
        <aegov-progress-step status="pending">Step 3</aegov-progress-step>
      </aegov-progress>
    `);
    const steps = await page.findAll('aegov-progress-step');
    expect(steps.length).toBe(3);
  });

  // ============================================
  // DEFAULT VARIANT — INDICATOR
  // ============================================

  it('renders numbered indicator for pending step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress>
        <aegov-progress-step status="pending">Review</aegov-progress-step>
      </aegov-progress>
    `);
    const indicator = await page.find('aegov-progress-step .step__indicator');
    expect(indicator).not.toBeNull();
    expect(indicator).toHaveClass('step__indicator--pending');
    const number = await page.find('aegov-progress-step .step__number');
    expect(number.textContent).toBe('1');
  });

  it('renders numbered indicator for active step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress>
        <aegov-progress-step status="active">Current</aegov-progress-step>
      </aegov-progress>
    `);
    const indicator = await page.find('aegov-progress-step .step__indicator');
    expect(indicator).toHaveClass('step__indicator--active');
    const number = await page.find('aegov-progress-step .step__number');
    expect(number.textContent).toBe('1');
  });

  it('renders checkmark for completed step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress>
        <aegov-progress-step status="completed">Done</aegov-progress-step>
      </aegov-progress>
    `);
    const indicator = await page.find('aegov-progress-step .step__indicator');
    expect(indicator).toHaveClass('step__indicator--completed');
    const checkmark = await page.find('aegov-progress-step .step__checkmark');
    expect(checkmark).not.toBeNull();
    const number = await page.find('aegov-progress-step .step__number');
    expect(number).toBeNull();
  });

  // ============================================
  // SIZES
  // ============================================

  it('applies sm size class', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress size="sm">
        <aegov-progress-step status="active">Step</aegov-progress-step>
      </aegov-progress>
    `);
    const indicator = await page.find('aegov-progress-step .step__indicator--sm');
    expect(indicator).not.toBeNull();
  });

  it('applies lg size class', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress size="lg">
        <aegov-progress-step status="active">Step</aegov-progress-step>
      </aegov-progress>
    `);
    const indicator = await page.find('aegov-progress-step .step__indicator--lg');
    expect(indicator).not.toBeNull();
  });

  // ============================================
  // COMPACT VARIANT
  // ============================================

  it('renders dot for compact variant', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress variant="compact">
        <aegov-progress-step status="active">Step</aegov-progress-step>
      </aegov-progress>
    `);
    const dot = await page.find('aegov-progress-step .step__dot');
    expect(dot).not.toBeNull();
    const indicator = await page.find('aegov-progress-step .step__indicator');
    expect(indicator).toBeNull();
  });

  it('applies dot status classes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress variant="compact">
        <aegov-progress-step status="completed">S1</aegov-progress-step>
        <aegov-progress-step status="active">S2</aegov-progress-step>
        <aegov-progress-step status="pending">S3</aegov-progress-step>
      </aegov-progress>
    `);
    const dots = await page.findAll('aegov-progress-step .step__dot');
    expect(dots[0]).toHaveClass('step__dot--completed');
    expect(dots[1]).toHaveClass('step__dot--active');
    expect(dots[2]).toHaveClass('step__dot--pending');
  });

  it('hides labels in compact horizontal mode', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress variant="compact" orientation="horizontal">
        <aegov-progress-step status="active">Hidden Label</aegov-progress-step>
      </aegov-progress>
    `);
    const text = await page.find('aegov-progress-step .step__text');
    expect(text).toBeNull();
  });

  // ============================================
  // CONNECTORS
  // ============================================

  it('first step has spacer instead of before-connector', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress>
        <aegov-progress-step status="completed">First</aegov-progress-step>
        <aegov-progress-step status="pending">Second</aegov-progress-step>
      </aegov-progress>
    `);
    const steps = await page.findAll('aegov-progress-step');
    const beforeConnector = await steps[0].find('.step__connector--before');
    expect(beforeConnector).toBeNull();
    const spacer = await steps[0].find('.step__spacer');
    expect(spacer).not.toBeNull();
  });

  it('last step has spacer instead of after-connector', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress>
        <aegov-progress-step status="completed">First</aegov-progress-step>
        <aegov-progress-step status="pending">Last</aegov-progress-step>
      </aegov-progress>
    `);
    const steps = await page.findAll('aegov-progress-step');
    const afterConnector = await steps[1].find('.step__connector--after');
    expect(afterConnector).toBeNull();
  });

  it('solid connector after completed step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress>
        <aegov-progress-step status="completed">First</aegov-progress-step>
        <aegov-progress-step status="active">Second</aegov-progress-step>
      </aegov-progress>
    `);
    const steps = await page.findAll('aegov-progress-step');
    const afterConnector = await steps[0].find('.step__connector--after');
    expect(afterConnector).toHaveClass('step__connector--solid');
  });

  it('dashed connector after non-completed step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress>
        <aegov-progress-step status="active">First</aegov-progress-step>
        <aegov-progress-step status="pending">Second</aegov-progress-step>
      </aegov-progress>
    `);
    const steps = await page.findAll('aegov-progress-step');
    const afterConnector = await steps[0].find('.step__connector--after');
    expect(afterConnector).toHaveClass('step__connector--dashed');
  });

  // ============================================
  // VERTICAL LAYOUT
  // ============================================

  it('renders vertical layout', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress orientation="vertical">
        <aegov-progress-step status="completed">S1</aegov-progress-step>
        <aegov-progress-step status="active">S2</aegov-progress-step>
      </aegov-progress>
    `);
    const verticalRow = await page.find('aegov-progress-step .step__vertical-row');
    expect(verticalRow).not.toBeNull();
  });

  it('renders vertical connector on non-last step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress orientation="vertical">
        <aegov-progress-step status="completed">S1</aegov-progress-step>
        <aegov-progress-step status="active">S2</aegov-progress-step>
      </aegov-progress>
    `);
    const steps = await page.findAll('aegov-progress-step');
    const connector = await steps[0].find('.step__connector--vertical');
    expect(connector).not.toBeNull();
  });

  it('no vertical connector on last step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress orientation="vertical">
        <aegov-progress-step status="completed">S1</aegov-progress-step>
        <aegov-progress-step status="active">S2</aegov-progress-step>
      </aegov-progress>
    `);
    const steps = await page.findAll('aegov-progress-step');
    const connector = await steps[1].find('.step__connector--vertical');
    expect(connector).toBeNull();
  });

  // ============================================
  // LABELS & DESCRIPTIONS
  // ============================================

  it('renders step label', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress>
        <aegov-progress-step status="active">Account Setup</aegov-progress-step>
      </aegov-progress>
    `);
    const label = await page.find('aegov-progress-step .step__label');
    expect(label).not.toBeNull();
    expect(label.textContent).toBe('Account Setup');
  });

  it('renders description when provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress>
        <aegov-progress-step status="active" description="Fill in your details">Details</aegov-progress-step>
      </aegov-progress>
    `);
    const desc = await page.find('aegov-progress-step .step__description');
    expect(desc).not.toBeNull();
    expect(desc.textContent).toBe('Fill in your details');
  });

  it('does not render description when not provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress>
        <aegov-progress-step status="active">Details</aegov-progress-step>
      </aegov-progress>
    `);
    const desc = await page.find('aegov-progress-step .step__description');
    expect(desc).toBeNull();
  });

  // ============================================
  // ACCESSIBILITY
  // ============================================

  it('sets aria-current="step" on active step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress>
        <aegov-progress-step status="completed">S1</aegov-progress-step>
        <aegov-progress-step status="active">S2</aegov-progress-step>
        <aegov-progress-step status="pending">S3</aegov-progress-step>
      </aegov-progress>
    `);
    const lis = await page.findAll('aegov-progress-step li');
    expect(lis[0].getAttribute('aria-current')).toBeNull();
    expect(lis[1].getAttribute('aria-current')).toBe('step');
    expect(lis[2].getAttribute('aria-current')).toBeNull();
  });

  it('includes sr-only text with step info', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress>
        <aegov-progress-step status="active">Details</aegov-progress-step>
      </aegov-progress>
    `);
    const srOnly = await page.find('aegov-progress-step .sr-only');
    expect(srOnly).not.toBeNull();
    expect(srOnly.textContent).toContain('Step 1 of 1');
  });

  it('connector has aria-hidden', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress>
        <aegov-progress-step status="completed">S1</aegov-progress-step>
        <aegov-progress-step status="active">S2</aegov-progress-step>
      </aegov-progress>
    `);
    const connector = await page.find('aegov-progress-step .step__connector');
    expect(connector.getAttribute('aria-hidden')).toBe('true');
  });
});
