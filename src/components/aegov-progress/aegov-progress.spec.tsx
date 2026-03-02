import { newSpecPage } from '@stencil/core/testing';
import { AegovProgress } from './aegov-progress';
import { AegovProgressStep } from '../aegov-progress-step/aegov-progress-step';

describe('aegov-progress', () => {
  // ============================================
  // RENDERING
  // ============================================

  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="completed">Step 1</aegov-progress-step>
          <aegov-progress-step status="active">Step 2</aegov-progress-step>
          <aegov-progress-step status="pending">Step 3</aegov-progress-step>
        </aegov-progress>
      `,
    });
    expect(page.root).toBeTruthy();
    const nav = page.root.querySelector('nav');
    expect(nav).toBeTruthy();
    expect(nav.getAttribute('aria-label')).toBe('Progress');
  });

  it('renders an ordered list', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step>Step 1</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const ol = page.root.querySelector('ol');
    expect(ol).toBeTruthy();
    expect(ol.classList.contains('progress__list')).toBe(true);
  });

  // ============================================
  // DEFAULT PROPS
  // ============================================

  it('has correct default props', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress></aegov-progress>`,
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
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step>Step 1</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const ol = page.root.querySelector('ol');
    expect(ol.classList.contains('progress__list--horizontal')).toBe(true);
  });

  it('applies vertical list class', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress orientation="vertical">
          <aegov-progress-step>Step 1</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const ol = page.root.querySelector('ol');
    expect(ol.classList.contains('progress__list--vertical')).toBe(true);
  });

  // ============================================
  // PROP PASSING TO CHILDREN
  // ============================================

  it('passes variant to children', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress variant="compact">
          <aegov-progress-step>Step 1</aegov-progress-step>
          <aegov-progress-step>Step 2</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-progress-step');
    steps.forEach(step => {
      expect((step as any).variant).toBe('compact');
    });
  });

  it('passes size to children', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress size="lg">
          <aegov-progress-step>Step 1</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const step = page.root.querySelector('aegov-progress-step') as any;
    expect(step.size).toBe('lg');
  });

  it('passes orientation to children', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress orientation="vertical">
          <aegov-progress-step>Step 1</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const step = page.root.querySelector('aegov-progress-step') as any;
    expect(step.orientation).toBe('vertical');
  });

  it('passes stepIndex and stepCount to children', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step>Step 1</aegov-progress-step>
          <aegov-progress-step>Step 2</aegov-progress-step>
          <aegov-progress-step>Step 3</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-progress-step');
    expect((steps[0] as any).stepIndex).toBe(0);
    expect((steps[1] as any).stepIndex).toBe(1);
    expect((steps[2] as any).stepIndex).toBe(2);
    expect((steps[0] as any).stepCount).toBe(3);
  });

  it('passes isFirst and isLast flags', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step>Step 1</aegov-progress-step>
          <aegov-progress-step>Step 2</aegov-progress-step>
          <aegov-progress-step>Step 3</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-progress-step');
    expect((steps[0] as any).isFirst).toBe(true);
    expect((steps[0] as any).isLast).toBe(false);
    expect((steps[1] as any).isFirst).toBe(false);
    expect((steps[1] as any).isLast).toBe(false);
    expect((steps[2] as any).isFirst).toBe(false);
    expect((steps[2] as any).isLast).toBe(true);
  });

  it('passes connectorSolid based on previous step status', async () => {
    const page = await newSpecPage({
      components: [AegovProgress, AegovProgressStep],
      html: `
        <aegov-progress>
          <aegov-progress-step status="completed">Step 1</aegov-progress-step>
          <aegov-progress-step status="active">Step 2</aegov-progress-step>
          <aegov-progress-step status="pending">Step 3</aegov-progress-step>
        </aegov-progress>
      `,
    });
    const steps = page.root.querySelectorAll('aegov-progress-step');
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
      components: [AegovProgress],
      html: `<aegov-progress data-testid="my-progress"></aegov-progress>`,
    });
    const nav = page.root.querySelector('nav');
    expect(nav.getAttribute('data-testid')).toBe('my-progress');
  });

  it('passes through aria attributes', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress aria-describedby="desc"></aegov-progress>`,
    });
    const nav = page.root.querySelector('nav');
    expect(nav.getAttribute('aria-describedby')).toBe('desc');
  });
});
