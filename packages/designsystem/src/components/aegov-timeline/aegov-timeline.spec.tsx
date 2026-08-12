import { newSpecPage } from '@stencil/core/testing';
import { AegovTimeline } from './aegov-timeline';
import { AegovTimelineStep } from '../aegov-timeline-step/aegov-timeline-step';

const baseHtml = `
  <aegov-timeline>
    <aegov-timeline-step status="completed">Done</aegov-timeline-step>
    <aegov-timeline-step status="active">Now</aegov-timeline-step>
    <aegov-timeline-step status="pending">Later</aegov-timeline-step>
  </aegov-timeline>
`;

describe('aegov-timeline', () => {
  it('renders a labelled section with an ordered list', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: baseHtml,
    });
    const nav = page.root.querySelector('section.aegov-timeline');
    expect(nav).not.toBeNull();
    expect(nav.getAttribute('aria-label')).toBe('Timeline');
    expect(page.root.querySelector('ol.timeline__list')).not.toBeNull();
  });

  it('auto-generates fieldId when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline],
      html: `<aegov-timeline></aegov-timeline>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-timeline-\d+$/);
    expect(page.root.querySelector('section.aegov-timeline').id).toBe(page.rootInstance.fieldId);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline],
      html: `<aegov-timeline field-id="t1"></aegov-timeline>`,
    });
    expect(page.root.querySelector('section.aegov-timeline').id).toBe('t1');
  });

  it('applies compact variant class', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline],
      html: `<aegov-timeline variant="compact"></aegov-timeline>`,
    });
    expect(page.root.querySelector('section.aegov-timeline').className).toContain('aegov-timeline--compact');
  });

  it('applies orientation class on the list', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline],
      html: `<aegov-timeline orientation="vertical"></aegov-timeline>`,
    });
    const ol = page.root.querySelector('ol.timeline__list');
    expect(ol.className).toContain('timeline__list--vertical');
  });

  it('horizontal orientation by default', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline],
      html: `<aegov-timeline></aegov-timeline>`,
    });
    expect(page.root.querySelector('ol.timeline__list').className).toContain('timeline__list--horizontal');
  });

  it('syncs variant/size/orientation onto child steps', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline variant="compact" size="lg" orientation="vertical">
          <aegov-timeline-step>One</aegov-timeline-step>
          <aegov-timeline-step>Two</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    await page.waitForChanges();
    const steps = page.root.querySelectorAll('aegov-timeline-step');
    expect((steps[0] as any).variant).toBe('compact');
    expect((steps[0] as any).size).toBe('lg');
    expect((steps[0] as any).orientation).toBe('vertical');
  });

  it('cascades a SANITIZED orientation to children, not the raw invalid value', async () => {
    // Previously the raw (possibly invalid) orientation cascaded unvalidated. A child only
    // checks `orientation === 'horizontal'`, so an invalid string made it render vertical
    // while the parent's own wrapper still rendered horizontal-oriented classes.
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline orientation="not-real">
          <aegov-timeline-step>One</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    await page.waitForChanges();
    const step = page.root.querySelector('aegov-timeline-step');
    expect((step as any).orientation).toBe('horizontal');
    expect(step.querySelector('li').className).toContain('step--horizontal');
    expect(page.root.querySelector('ol.timeline__list').className).toContain('timeline__list--horizontal');
  });

  it('cascades a SANITIZED variant to children, not the raw invalid value', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline variant="not-real">
          <aegov-timeline-step>One</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    await page.waitForChanges();
    const step = page.root.querySelector('aegov-timeline-step');
    expect((step as any).variant).toBe('default');
  });

  it('assigns stepIndex, stepCount, isFirst, isLast on children', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: baseHtml,
    });
    await page.waitForChanges();
    const steps = page.root.querySelectorAll('aegov-timeline-step');
    expect((steps[0] as any).stepIndex).toBe(0);
    expect((steps[0] as any).stepCount).toBe(3);
    expect((steps[0] as any).isFirst).toBe(true);
    expect((steps[0] as any).isLast).toBe(false);
    expect((steps[2] as any).isFirst).toBe(false);
    expect((steps[2] as any).isLast).toBe(true);
  });

  it('marks isConnectorSolid for steps that follow a completed step', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: baseHtml,
    });
    await page.waitForChanges();
    const steps = page.root.querySelectorAll('aegov-timeline-step');
    // First has no before-connector
    expect((steps[0] as any).isConnectorSolid).toBe(false);
    // Second follows completed → solid
    expect((steps[1] as any).isConnectorSolid).toBe(true);
    // Third follows active (not completed) → not solid
    expect((steps[2] as any).isConnectorSolid).toBe(false);
  });

  it('forwards aria-* and data-* attributes', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline],
      html: `<aegov-timeline data-test="x" aria-describedby="d"></aegov-timeline>`,
    });
    const nav = page.root.querySelector('section.aegov-timeline');
    expect(nav.getAttribute('data-test')).toBe('x');
    expect(nav.getAttribute('aria-describedby')).toBe('d');
  });
});
