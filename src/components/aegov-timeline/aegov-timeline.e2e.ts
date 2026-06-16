import { newE2EPage } from '@stencil/core/testing';

const baseHtml = `
  <aegov-timeline>
    <aegov-timeline-step status="completed">Done</aegov-timeline-step>
    <aegov-timeline-step status="active">Current</aegov-timeline-step>
    <aegov-timeline-step status="pending">Pending</aegov-timeline-step>
  </aegov-timeline>
`;

describe('aegov-timeline (e2e)', () => {
  it('renders nav and list with steps', async () => {
    const page = await newE2EPage();
    await page.setContent(baseHtml);
    const nav = await page.find('aegov-timeline nav.aegov-timeline');
    expect(nav).not.toBeNull();
    expect(nav.getAttribute('aria-label')).toBe('Timeline');
    const steps = await page.findAll('aegov-timeline aegov-timeline-step');
    expect(steps.length).toBe(3);
  });

  it('applies compact variant class', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline variant="compact">
        <aegov-timeline-step>One</aegov-timeline-step>
      </aegov-timeline>
    `);
    const nav = await page.find('aegov-timeline nav.aegov-timeline');
    expect(nav).toHaveClass('aegov-timeline--compact');
  });

  it('applies orientation class on the list', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-timeline orientation="vertical">
        <aegov-timeline-step>One</aegov-timeline-step>
      </aegov-timeline>
    `);
    const ol = await page.find('aegov-timeline ol.timeline__list');
    expect(ol).toHaveClass('timeline__list--vertical');
  });

  it('marks the active step with aria-current=step', async () => {
    const page = await newE2EPage();
    await page.setContent(baseHtml);
    const li = await page.find('aegov-timeline-step:nth-of-type(2) li');
    expect(li.getAttribute('aria-current')).toBe('step');
  });

  it('renders step labels from slot content', async () => {
    const page = await newE2EPage();
    await page.setContent(baseHtml);
    const labels = await page.findAll('aegov-timeline-step .step__label');
    expect(labels[0].textContent).toContain('Done');
    expect(labels[1].textContent).toContain('Current');
    expect(labels[2].textContent).toContain('Pending');
  });
});
