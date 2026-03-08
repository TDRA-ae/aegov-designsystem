import { newE2EPage } from '@stencil/core/testing';

describe('aegov-timeline e2e', () => {
  // ============================================
  // BASIC RENDERING
  // ============================================

  it('renders with steps', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="completed">Step 1</aegov-timeline-step>
        <aegov-timeline-step status="active">Step 2</aegov-timeline-step>
        <aegov-timeline-step status="pending">Step 3</aegov-timeline-step>
      </aegov-timeline>
    `);
    const nav = await page.find('aegov-timeline nav');
    expect(nav).toBeTruthy();
    expect(await nav.getAttribute('aria-label')).toBe('Timeline');
  });

  it('renders ordered list', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="active">Step 1</aegov-timeline-step>
      </aegov-timeline>
    `);
    const ol = await page.find('aegov-timeline ol');
    expect(ol).toBeTruthy();
  });

  // ============================================
  // HORIZONTAL LAYOUT (default)
  // ============================================

  it('renders horizontal layout by default', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="completed">S1</aegov-timeline-step>
        <aegov-timeline-step status="active">S2</aegov-timeline-step>
      </aegov-timeline>
    `);
    const ol = await page.find('aegov-timeline .timeline__list--horizontal');
    expect(ol).toBeTruthy();
  });

  it('renders step indicators in horizontal mode', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="completed">S1</aegov-timeline-step>
        <aegov-timeline-step status="active">S2</aegov-timeline-step>
        <aegov-timeline-step status="pending">S3</aegov-timeline-step>
      </aegov-timeline>
    `);
    const indicators = await page.findAll('aegov-timeline-step .step__indicator');
    expect(indicators.length).toBe(3);
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
    const ol = await page.find('aegov-timeline .timeline__list--vertical');
    expect(ol).toBeTruthy();
    const verticalRow = await page.find('aegov-timeline-step .step__vertical-row');
    expect(verticalRow).toBeTruthy();
  });

  // ============================================
  // STATUSES
  // ============================================

  it('renders completed step with checkmark', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="completed">Done</aegov-timeline-step>
      </aegov-timeline>
    `);
    const checkmark = await page.find('aegov-timeline-step .step__checkmark');
    expect(checkmark).toBeTruthy();
  });

  it('renders active step with number', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="active">Current</aegov-timeline-step>
      </aegov-timeline>
    `);
    const indicator = await page.find('aegov-timeline-step .step__indicator--active');
    expect(indicator).toBeTruthy();
    const number = await page.find('aegov-timeline-step .step__number');
    expect(number).toBeTruthy();
  });

  it('renders pending step with number', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="pending">Future</aegov-timeline-step>
      </aegov-timeline>
    `);
    const indicator = await page.find('aegov-timeline-step .step__indicator--pending');
    expect(indicator).toBeTruthy();
  });

  // ============================================
  // SIZES
  // ============================================

  it('applies sm size class', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline size="sm">
        <aegov-timeline-step status="active">S</aegov-timeline-step>
      </aegov-timeline>
    `);
    const indicator = await page.find('aegov-timeline-step .step__indicator--sm');
    expect(indicator).toBeTruthy();
  });

  it('applies lg size class', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline size="lg">
        <aegov-timeline-step status="active">S</aegov-timeline-step>
      </aegov-timeline>
    `);
    const indicator = await page.find('aegov-timeline-step .step__indicator--lg');
    expect(indicator).toBeTruthy();
  });

  // ============================================
  // COMPACT VARIANT
  // ============================================

  it('renders dots in compact variant', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline variant="compact">
        <aegov-timeline-step status="completed">S1</aegov-timeline-step>
        <aegov-timeline-step status="active">S2</aegov-timeline-step>
        <aegov-timeline-step status="pending">S3</aegov-timeline-step>
      </aegov-timeline>
    `);
    const dots = await page.findAll('aegov-timeline-step .step__dot');
    expect(dots.length).toBe(3);
    const indicators = await page.findAll('aegov-timeline-step .step__indicator');
    expect(indicators.length).toBe(0);
  });

  it('applies dot status classes in compact mode', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline variant="compact">
        <aegov-timeline-step status="completed">S1</aegov-timeline-step>
        <aegov-timeline-step status="active">S2</aegov-timeline-step>
        <aegov-timeline-step status="pending">S3</aegov-timeline-step>
      </aegov-timeline>
    `);
    expect(await page.find('.step__dot--completed')).toBeTruthy();
    expect(await page.find('.step__dot--active')).toBeTruthy();
    expect(await page.find('.step__dot--pending')).toBeTruthy();
  });

  // ============================================
  // HORIZONTAL CONNECTORS (before + after)
  // ============================================

  it('first step has spacer instead of before-connector', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="completed">S1</aegov-timeline-step>
        <aegov-timeline-step status="active">S2</aegov-timeline-step>
      </aegov-timeline>
    `);
    const beforeConnector = await page.find('aegov-timeline-step:first-child .step__connector--before');
    expect(beforeConnector).toBeNull();
    const spacer = await page.find('aegov-timeline-step:first-child .step__spacer');
    expect(spacer).toBeTruthy();
  });

  it('renders solid before-connector after completed step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="completed">S1</aegov-timeline-step>
        <aegov-timeline-step status="active">S2</aegov-timeline-step>
      </aegov-timeline>
    `);
    const connector = await page.find('aegov-timeline-step:nth-child(2) .step__connector--solid');
    expect(connector).toBeTruthy();
  });

  it('renders dashed before-connector after non-completed step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="active">S1</aegov-timeline-step>
        <aegov-timeline-step status="pending">S2</aegov-timeline-step>
      </aegov-timeline>
    `);
    const connector = await page.find('aegov-timeline-step:nth-child(2) .step__connector--dashed');
    expect(connector).toBeTruthy();
  });

  it('completed step has solid after-connector', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="completed">S1</aegov-timeline-step>
        <aegov-timeline-step status="active">S2</aegov-timeline-step>
      </aegov-timeline>
    `);
    const afterConnector = await page.find('aegov-timeline-step:first-child .step__connector--after.step__connector--solid');
    expect(afterConnector).toBeTruthy();
  });

  it('active step has dashed after-connector', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="active">S1</aegov-timeline-step>
        <aegov-timeline-step status="pending">S2</aegov-timeline-step>
      </aegov-timeline>
    `);
    const afterConnector = await page.find('aegov-timeline-step:first-child .step__connector--after.step__connector--dashed');
    expect(afterConnector).toBeTruthy();
  });

  // ============================================
  // DESCRIPTIONS
  // ============================================

  it('renders description when provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="active" description="Enter your details">Details</aegov-timeline-step>
      </aegov-timeline>
    `);
    const desc = await page.find('aegov-timeline-step .step__description');
    expect(desc).toBeTruthy();
    expect(await desc.getProperty('textContent')).toBe('Enter your details');
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

  it('sets aria-current="step" on active step only', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="completed">S1</aegov-timeline-step>
        <aegov-timeline-step status="active">S2</aegov-timeline-step>
        <aegov-timeline-step status="pending">S3</aegov-timeline-step>
      </aegov-timeline>
    `);
    const lis = await page.findAll('aegov-timeline-step li');
    expect(await lis[0].getAttribute('aria-current')).toBeNull();
    expect(await lis[1].getAttribute('aria-current')).toBe('step');
    expect(await lis[2].getAttribute('aria-current')).toBeNull();
  });

  it('has sr-only text for screen readers', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="active">Details</aegov-timeline-step>
      </aegov-timeline>
    `);
    const srOnly = await page.find('aegov-timeline-step .sr-only');
    expect(srOnly).toBeTruthy();
  });

  // ============================================
  // VERTICAL CONNECTORS
  // ============================================

  it('renders vertical connectors between steps', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline orientation="vertical">
        <aegov-timeline-step status="completed">S1</aegov-timeline-step>
        <aegov-timeline-step status="active">S2</aegov-timeline-step>
        <aegov-timeline-step status="pending">S3</aegov-timeline-step>
      </aegov-timeline>
    `);
    const verticalConnectors = await page.findAll('.step__connector--vertical');
    // First and second steps should have vertical connectors (not last)
    expect(verticalConnectors.length).toBe(2);
  });

  it('does not render vertical connector on last step', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline orientation="vertical">
        <aegov-timeline-step status="completed">S1</aegov-timeline-step>
        <aegov-timeline-step status="active">S2</aegov-timeline-step>
      </aegov-timeline>
    `);
    const lastStep = await page.find('aegov-timeline-step:last-child .step__connector--vertical');
    expect(lastStep).toBeNull();
  });

  // ============================================
  // MULTIPLE STEPS FULL WORKFLOW
  // ============================================

  it('renders a complete 5-step workflow correctly', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="completed">Account</aegov-timeline-step>
        <aegov-timeline-step status="completed">Profile</aegov-timeline-step>
        <aegov-timeline-step status="active">Documents</aegov-timeline-step>
        <aegov-timeline-step status="pending">Review</aegov-timeline-step>
        <aegov-timeline-step status="pending">Submit</aegov-timeline-step>
      </aegov-timeline>
    `);

    // Completed steps have checkmarks
    const checkmarks = await page.findAll('.step__checkmark');
    expect(checkmarks.length).toBe(2);

    // Active step has number
    const activeIndicator = await page.find('.step__indicator--active .step__number');
    expect(activeIndicator).toBeTruthy();

    // Pending steps have numbers
    const pendingIndicators = await page.findAll('.step__indicator--pending');
    expect(pendingIndicators.length).toBe(2);
  });
});
