import { newSpecPage } from '@stencil/core/testing';
import { AegovTimeline } from '../aegov-timeline/aegov-timeline';
import { AegovTimelineStep } from './aegov-timeline-step';

describe('aegov-timeline-step', () => {
  it('renders an li with status modifier class', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="active">Current</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    const li = page.root.querySelector('li.aegov-step');
    expect(li).not.toBeNull();
    expect(li.className).toContain('step--active');
  });

  it('throws when used outside aegov-timeline', async () => {
    await expect(
      newSpecPage({
        components: [AegovTimelineStep],
        html: `<aegov-timeline-step>Standalone</aegov-timeline-step>`,
      })
    ).rejects.toThrow(/must be used inside <aegov-timeline>/);
  });

  it('completed step shows checkmark icon', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="completed">Done</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    await page.waitForChanges();
    expect(page.root.querySelector('.step__checkmark')).not.toBeNull();
  });

  it('pending step shows numbered indicator', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="pending">First</aegov-timeline-step>
          <aegov-timeline-step status="pending">Second</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    await page.waitForChanges();
    const numbers = page.root.querySelectorAll('.step__number');
    expect(numbers.length).toBe(2);
    expect(numbers[0].textContent).toBe('1');
    expect(numbers[1].textContent).toBe('2');
  });

  it('active step gets aria-current=step', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="active">Now</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    await page.waitForChanges();
    const li = page.root.querySelector('li.aegov-step');
    expect(li.getAttribute('aria-current')).toBe('step');
  });

  it('non-active step does not get aria-current', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="completed">A</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    await page.waitForChanges();
    const li = page.root.querySelector('li.aegov-step');
    expect(li.getAttribute('aria-current')).toBeNull();
  });

  it('renders description when provided', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="active" description="Step details">Title</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    await page.waitForChanges();
    const desc = page.root.querySelector('.step__description');
    expect(desc).not.toBeNull();
    expect(desc.textContent).toContain('Step details');
  });

  it('compact variant horizontal hides label', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline variant="compact" orientation="horizontal">
          <aegov-timeline-step status="active">My label</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    await page.waitForChanges();
    expect(page.root.querySelector('.step__label')).toBeNull();
    expect(page.root.querySelector('.step__dot')).not.toBeNull();
  });

  it('compact variant vertical shows label', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline variant="compact" orientation="vertical">
          <aegov-timeline-step status="active">My label</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    await page.waitForChanges();
    expect(page.root.querySelector('.step__label')).not.toBeNull();
  });

  it('renders icon slot when provided in default (non-compact) variant', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="active">
            <svg slot="icon" class="custom-ic"></svg>
            Step
          </aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    await page.waitForChanges();
    expect(page.root.querySelector('svg[slot="icon"]')).not.toBeNull();
  });

  it('exposes a screen-reader-only status label', async () => {
    const page = await newSpecPage({
      components: [AegovTimeline, AegovTimelineStep],
      html: `
        <aegov-timeline>
          <aegov-timeline-step status="active">Identity check</aegov-timeline-step>
        </aegov-timeline>
      `,
    });
    await page.waitForChanges();
    const sr = page.root.querySelector('.sr-only');
    expect(sr).toBeTruthy();
    expect(sr.textContent).toContain('(current)');
  });
});
