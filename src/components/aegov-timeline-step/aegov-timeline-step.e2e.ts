import { newE2EPage } from '@stencil/core/testing';

describe('aegov-timeline-step (e2e)', () => {
  it('renders inside a timeline with the correct label', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="active">Step label</aegov-timeline-step>
      </aegov-timeline>
    `);
    const label = await page.find('aegov-timeline-step .step__label');
    expect(label).not.toBeNull();
    expect(label.textContent).toContain('Step label');
  });

  it('completed step renders the checkmark icon', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="completed">Done</aegov-timeline-step>
      </aegov-timeline>
    `);
    const check = await page.find('aegov-timeline-step .step__checkmark');
    expect(check).not.toBeNull();
  });

  it('pending step shows the step number', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="pending">First</aegov-timeline-step>
        <aegov-timeline-step status="pending">Second</aegov-timeline-step>
      </aegov-timeline>
    `);
    const numbers = await page.findAll('aegov-timeline-step .step__number');
    expect(numbers.length).toBe(2);
    expect(numbers[0].textContent).toBe('1');
    expect(numbers[1].textContent).toBe('2');
  });

  it('active step has aria-current="step"', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="active">Now</aegov-timeline-step>
      </aegov-timeline>
    `);
    const li = await page.find('aegov-timeline-step li.aegov-step');
    expect(li.getAttribute('aria-current')).toBe('step');
  });

  it('renders description when provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline>
        <aegov-timeline-step status="active" description="Helpful detail">A</aegov-timeline-step>
      </aegov-timeline>
    `);
    const desc = await page.find('aegov-timeline-step .step__description');
    expect(desc).not.toBeNull();
    expect(desc.textContent).toContain('Helpful detail');
  });

  it('compact horizontal variant hides label', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline variant="compact" orientation="horizontal">
        <aegov-timeline-step status="active">Hidden label</aegov-timeline-step>
      </aegov-timeline>
    `);
    const label = await page.find('aegov-timeline-step .step__label');
    expect(label).toBeNull();
    const dot = await page.find('aegov-timeline-step .step__dot');
    expect(dot).not.toBeNull();
  });
});
