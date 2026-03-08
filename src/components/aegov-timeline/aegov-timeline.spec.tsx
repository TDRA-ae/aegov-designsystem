import { newSpecPage } from '@stencil/core/testing';
import { AegovTimeline } from './aegov-timeline';
import { AegovTimelineStep } from '../aegov-timeline-step/aegov-timeline-step';

describe('aegov-timeline', () => {
  // ============================================
  // RENDERING
  // ============================================

  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="completed">Step 1</aegov-timeline-step>
          <aegov-timeline-step status="active">Step 2</aegov-timeline-step>
          <aegov-timeline-step status="pending">Step 3</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    expect(page.root).toBeTruthy();
    const nav = page.root.querySelector('nav');
    expect(nav).toBeTruthy();
    expect(nav.getAttribute('aria-label')).toBe('Timeline');
  });

  it('renders an ordered list', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step>Step 1</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const ol = page.root.querySelector('ol');
    expect(ol).toBeTruthy();
    expect(ol.classList.contains('timeline__list')).toBe(true);
  });

  // ============================================
  // DEFAULT PROPS
  // ============================================

  it('has correct default props', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline],
      html: `<aegov-timeline></aegov-timeline>`,
    });
    const instance = page.rootInstance;
    expect(instance.variant).toBe('default');
    expect(instance.size).toBe('base');
    expect(instance.orientation).toBe('horizontal');
  });

  // ============================================
  // ORIENTATION
  // ============================================

  it('applies horizontal list class by default', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step>Step 1</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const ol = page.root.querySelector('ol');
    expect(ol.classList.contains('timeline__list--horizontal')).toBe(true);
  });

  it('applies vertical list class', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline orientation="vertical">
          <aegov-timeline-step>Step 1</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const ol = page.root.querySelector('ol');
    expect(ol.classList.contains('timeline__list--vertical')).toBe(true);
  });

  // ============================================
  // PROP PASSING TO CHILDREN
  // ============================================

  it('passes variant to children', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline variant="compact">
          <aegov-timeline-step>Step 1</aegov-timeline-step>
          <aegov-timeline-step>Step 2</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-timeline-step');
    steps.forEach(step => {
      expect((step as any).variant).toBe('compact');
    });
  });

  it('passes size to children', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline size="lg">
          <aegov-timeline-step>Step 1</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const step = page.root.querySelector('aegov-timeline-step') as any;
    expect(step.size).toBe('lg');
  });

  it('passes orientation to children', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline orientation="vertical">
          <aegov-timeline-step>Step 1</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const step = page.root.querySelector('aegov-timeline-step') as any;
    expect(step.orientation).toBe('vertical');
  });

  it('passes stepIndex and stepCount to children', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step>Step 1</aegov-timeline-step>
          <aegov-timeline-step>Step 2</aegov-timeline-step>
          <aegov-timeline-step>Step 3</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-timeline-step');
    expect((steps[0] as any).stepIndex).toBe(0);
    expect((steps[1] as any).stepIndex).toBe(1);
    expect((steps[2] as any).stepIndex).toBe(2);
    expect((steps[0] as any).stepCount).toBe(3);
  });

  it('passes isFirst and isLast flags', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step>Step 1</aegov-timeline-step>
          <aegov-timeline-step>Step 2</aegov-timeline-step>
          <aegov-timeline-step>Step 3</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-timeline-step');
    expect((steps[0] as any).isFirst).toBe(true);
    expect((steps[0] as any).isLast).toBe(false);
    expect((steps[1] as any).isFirst).toBe(false);
    expect((steps[1] as any).isLast).toBe(false);
    expect((steps[2] as any).isFirst).toBe(false);
    expect((steps[2] as any).isLast).toBe(true);
  });

  it('passes connectorSolid based on previous step status', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="completed">Step 1</aegov-timeline-step>
          <aegov-timeline-step status="active">Step 2</aegov-timeline-step>
          <aegov-timeline-step status="pending">Step 3</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-timeline-step');
    // First step: no connector (isFirst)
    expect((steps[0] as any).connectorSolid).toBe(false);
    // Step 2: previous (step 1) is completed → solid
    expect((steps[1] as any).connectorSolid).toBe(true);
    // Step 3: previous (step 2) is active → dashed
    expect((steps[2] as any).connectorSolid).toBe(false);
  });

  // ============================================
  // PASS-THROUGH ATTRIBUTES
  // ============================================

  it('passes through data attributes', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline],
      html: `<aegov-timeline data-testid="my-timeline"></aegov-timeline>`,
    });
    const nav = page.root.querySelector('nav');
    expect(nav.getAttribute('data-testid')).toBe('my-timeline');
  });

  it('passes through aria attributes', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline],
      html: `<aegov-timeline aria-describedby="desc"></aegov-timeline>`,
    });
    const nav = page.root.querySelector('nav');
    expect(nav.getAttribute('aria-describedby')).toBe('desc');
  });
});
