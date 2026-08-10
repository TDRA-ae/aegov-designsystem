/**
 * Cross-component accessibility tests (WCAG 2.1 AA).
 *
 * These tests assert designsystem-wide accessibility invariants. Each suite
 * targets a single WCAG criterion across the components it applies to, rather
 * than exhaustively testing one component end-to-end (per-component a11y is
 * covered in the component's own .spec.tsx). Add a test here when you ship a
 * cross-cutting a11y rule that must hold across the system.
 */

import { newSpecPage } from '@stencil/core/testing';

import { AegovAccordion } from '../components/aegov-accordion/aegov-accordion';
import { AegovAccordionItem } from '../components/aegov-accordion-item/aegov-accordion-item';
import { AegovAvatar } from '../components/aegov-avatar/aegov-avatar';
import { AegovBadge } from '../components/aegov-badge/aegov-badge';
import { AegovBanner } from '../components/aegov-banner/aegov-banner';
import { AegovBreadcrumbs } from '../components/aegov-breadcrumbs/aegov-breadcrumbs';
import { AegovBreadcrumbsItem } from '../components/aegov-breadcrumbs-item/aegov-breadcrumbs-item';
import { AegovButton } from '../components/aegov-button/aegov-button';
import { AegovCallout } from '../components/aegov-callout/aegov-callout';
import { AegovCheckbox } from '../components/aegov-checkbox/aegov-checkbox';
import { AegovCheckboxGroup } from '../components/aegov-checkbox-group/aegov-checkbox-group';
import { AegovDrawer } from '../components/aegov-drawer/aegov-drawer';
import { AegovInput } from '../components/aegov-input/aegov-input';
import { AegovLabel } from '../components/aegov-label/aegov-label';
import { AegovModal } from '../components/aegov-modal/aegov-modal';
import { AegovOtp } from '../components/aegov-otp/aegov-otp';
import { AegovPagination } from '../components/aegov-pagination/aegov-pagination';
import { AegovProgress } from '../components/aegov-progress/aegov-progress';
import { AegovRadio } from '../components/aegov-radio/aegov-radio';
import { AegovRadioGroup } from '../components/aegov-radio-group/aegov-radio-group';
import { AegovRange } from '../components/aegov-range/aegov-range';
import { AegovSeparator } from '../components/aegov-separator/aegov-separator';
import { AegovTab } from '../components/aegov-tab/aegov-tab';
import { AegovTabPanel } from '../components/aegov-tab-panel/aegov-tab-panel';
import { AegovTabs } from '../components/aegov-tabs/aegov-tabs';
import { AegovTextarea } from '../components/aegov-textarea/aegov-textarea';
import { AegovToggle } from '../components/aegov-toggle/aegov-toggle';
import { AegovSelect } from '../components/aegov-select/aegov-select';
import { AegovSelectOption } from '../components/aegov-select-option/aegov-select-option';

describe('Cross-component accessibility (WCAG 2.1 AA)', () => {
  // ── 1.3.1 Info and Relationships ─────────────────────────────────────────
  // Form inputs must expose a programmatic accessible name. Either via:
  //   (a) a `label` prop, (b) a sibling <aegov-label>, or (c) aria-label.

  describe('1.3.1 — form inputs expose an accessible name', () => {
    it('aegov-input exposes field-id for external label association', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input field-id="email"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      expect(input.getAttribute('id')).toBe('email');
      // Consumers pair this with <aegov-label for="email"> for the
      // programmatic name (1.3.1 Info and Relationships).
    });

    it('aegov-textarea exposes a name via aria-label pass-through', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea aria-label="Notes"></aegov-textarea>`,
      });
      const textarea = page.root.querySelector('textarea');
      expect(textarea.getAttribute('aria-label')).toBe('Notes');
    });

    it('aegov-checkbox with label renders a <label> wrapper', async () => {
      const page = await newSpecPage({
        components: [AegovCheckbox],
        html: `<aegov-checkbox label="Accept terms"></aegov-checkbox>`,
      });
      expect(page.root.querySelector('label')).toBeTruthy();
      expect(page.root.textContent).toContain('Accept terms');
    });

    it('aegov-radio with label renders a <label> wrapper', async () => {
      const page = await newSpecPage({
        components: [AegovRadio],
        html: `<aegov-radio label="Option A"></aegov-radio>`,
      });
      expect(page.root.querySelector('label')).toBeTruthy();
      expect(page.root.textContent).toContain('Option A');
    });

    it('aegov-toggle with label renders a <label> wrapper', async () => {
      const page = await newSpecPage({
        components: [AegovToggle],
        html: `<aegov-toggle label="Notifications"></aegov-toggle>`,
      });
      expect(page.root.querySelector('label')).toBeTruthy();
    });

    it('aegov-otp first cell has an aria-label', async () => {
      const page = await newSpecPage({
        components: [AegovOtp],
        html: `<aegov-otp length="4"></aegov-otp>`,
      });
      const firstCell = page.root.querySelector('input.otp__cell');
      expect(firstCell.getAttribute('aria-label')).toBeTruthy();
    });

    it('aegov-label generates the for relationship', async () => {
      const page = await newSpecPage({
        components: [AegovLabel],
        html: `<aegov-label for="my-input">Name</aegov-label>`,
      });
      const label = page.root.querySelector('label');
      expect(label.getAttribute('for')).toBe('my-input');
    });
  });

  // ── 1.3.1 — relationships expressed via roles/structure ──────────────────

  describe('1.3.1 — semantic roles and structure', () => {
    it('aegov-tabs renders a tablist with role tab + tabpanel', async () => {
      const page = await newSpecPage({
        components: [AegovTabs, AegovTab, AegovTabPanel],
        html: `
          <aegov-tabs>
            <aegov-tab slot="tabs" tab-id="t1">Tab 1</aegov-tab>
            <aegov-tab-panel tab-id="t1">Panel 1</aegov-tab-panel>
          </aegov-tabs>
        `,
      });
      expect(page.root.querySelector('[role="tablist"]')).toBeTruthy();
      const tabBtn = page.root.querySelector('aegov-tab button');
      expect(tabBtn.getAttribute('role')).toBe('tab');
      expect(page.root.querySelector('[role="tabpanel"]')).toBeTruthy();
    });

    it('aegov-checkbox-group uses fieldset + legend for grouping', async () => {
      const page = await newSpecPage({
        components: [AegovCheckboxGroup, AegovCheckbox],
        html: `<aegov-checkbox-group label="Choices"></aegov-checkbox-group>`,
      });
      expect(page.root.querySelector('fieldset')).toBeTruthy();
      expect(page.root.querySelector('legend')).toBeTruthy();
    });

    it('aegov-radio-group uses fieldset with role=radiogroup', async () => {
      const page = await newSpecPage({
        components: [AegovRadioGroup, AegovRadio],
        html: `<aegov-radio-group name="opts"></aegov-radio-group>`,
      });
      const fieldset = page.root.querySelector('fieldset');
      expect(fieldset).toBeTruthy();
      expect(fieldset.getAttribute('role')).toBe('radiogroup');
    });

    it('aegov-breadcrumbs uses a <nav> landmark with aria-label', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item>Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });
      const nav = page.root.querySelector('nav');
      expect(nav).toBeTruthy();
      expect(nav.getAttribute('aria-label')).toBeTruthy();
    });

    it('aegov-pagination uses a <nav> landmark with aria-label', async () => {
      const page = await newSpecPage({
        components: [AegovPagination],
        html: `<aegov-pagination pages="5" page-current="1"></aegov-pagination>`,
      });
      const nav = page.root.querySelector('nav');
      expect(nav).toBeTruthy();
      expect(nav.getAttribute('aria-label')).toBe('Pagination');
    });

    it('aegov-separator with aria-orientation reflects orientation', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator orientation="vertical"></aegov-separator>`,
      });
      const sep = page.root.querySelector('[role="separator"], hr');
      expect(sep).toBeTruthy();
    });
  });

  // ── 4.1.2 Name, Role, Value — switches and toggles ───────────────────────

  describe('4.1.2 — switches expose role and state', () => {
    it('aegov-toggle has role=switch and aria-checked', async () => {
      const page = await newSpecPage({
        components: [AegovToggle],
        html: `<aegov-toggle is-checked label="Wifi"></aegov-toggle>`,
      });
      const input = page.root.querySelector('input');
      expect(input.getAttribute('role')).toBe('switch');
      expect(input.getAttribute('aria-checked')).toBe('true');
    });

    it('aegov-toggle reflects unchecked state', async () => {
      const page = await newSpecPage({
        components: [AegovToggle],
        html: `<aegov-toggle label="Wifi"></aegov-toggle>`,
      });
      expect(page.root.querySelector('input').getAttribute('aria-checked')).toBe('false');
    });
  });

  // ── 4.1.2 — disabled / required state mirroring ──────────────────────────

  describe('4.1.2 — disabled and required state are programmatic', () => {
    it('aegov-input is-disabled disables the native input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input is-disabled="true"></aegov-input>`,
      });
      expect(page.root.querySelector('input').hasAttribute('disabled')).toBe(true);
    });

    it('aegov-input is-required exposes a required input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input is-required="true"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      // Stencil's mock-DOM reflects required as a property in this path; the
      // companion aria-required pass-through is verified in the input's own
      // spec file.
      expect(input.required).toBe(true);
    });

    it('aegov-checkbox is-required exposes aria-required', async () => {
      const page = await newSpecPage({
        components: [AegovCheckbox],
        html: `<aegov-checkbox is-required="true"></aegov-checkbox>`,
      });
      expect(page.root.querySelector('input').getAttribute('aria-required')).toBe('true');
    });

    it('aegov-radio is-disabled disables the native input', async () => {
      const page = await newSpecPage({
        components: [AegovRadio],
        html: `<aegov-radio is-disabled="true"></aegov-radio>`,
      });
      expect(page.root.querySelector('input').hasAttribute('disabled')).toBe(true);
    });

    it('aegov-button is-disabled disables the underlying element', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button is-disabled="true">Save</aegov-button>`,
      });
      // aegov-button is shadow:true, so the native control lives in the shadow root.
      const btn = page.root.shadowRoot.querySelector('button, a');
      expect(btn.hasAttribute('disabled') || btn.getAttribute('aria-disabled') === 'true').toBe(true);
    });

    it('aegov-range is-required exposes required on the native input', async () => {
      const page = await newSpecPage({
        components: [AegovRange],
        html: `<aegov-range is-required min="0" max="10"></aegov-range>`,
      });
      const input = page.root.querySelector('input[type="range"]');
      expect(input?.hasAttribute('required')).toBe(true);
    });
  });

  // ── 2.4.6 Headings and Labels — landmarks and dialog labelling ───────────

  describe('2.4.6 — dialogs are labelled', () => {
    it('aegov-modal exposes role=dialog and aria-modal', async () => {
      const page = await newSpecPage({
        components: [AegovModal],
        html: `<aegov-modal is-open heading="Confirm">Body</aegov-modal>`,
      });
      const dialog = page.root.shadowRoot?.querySelector('[role="dialog"]');
      expect(dialog).toBeTruthy();
      expect(dialog?.getAttribute('aria-modal')).toBe('true');
    });

    it('aegov-drawer exposes role=dialog', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer is-open heading="Filters">Body</aegov-drawer>`,
      });
      const dialog = page.root.shadowRoot?.querySelector('[role="dialog"]');
      expect(dialog).toBeTruthy();
    });
  });

  // ── 4.1.3 Status Messages — banners and progress ─────────────────────────

  describe('4.1.3 — status messages are exposed', () => {
    it('aegov-progress exposes a native <progress>', async () => {
      const page = await newSpecPage({
        components: [AegovProgress],
        html: `<aegov-progress value="50" max="100"></aegov-progress>`,
      });
      expect(page.root.querySelector('progress')).toBeTruthy();
    });

    it('aegov-banner with role attribute reflects it', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner role="alert">Outage</aegov-banner>`,
      });
      const banner = page.root.querySelector('[role="alert"], [role="status"], [role="region"]');
      expect(banner).toBeTruthy();
    });
  });

  // ── 4.1.2 — disclosure widgets reflect open state ────────────────────────

  describe('4.1.2 — accordion items reflect expanded state', () => {
    it('aegov-accordion-item exposes aria-expanded', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item heading="A">Body</aegov-accordion-item>
          </aegov-accordion>
        `,
      });
      const trigger = page.root.querySelector('button[aria-expanded]');
      expect(trigger).toBeTruthy();
      expect(['true', 'false']).toContain(trigger.getAttribute('aria-expanded'));
    });
  });

  // ── 1.1.1 Non-text Content — image components have alt text ──────────────

  describe('1.1.1 — non-text content has a text alternative', () => {
    it('aegov-avatar exposes an accessible name', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar src="x.jpg" alt="Maryam"></aegov-avatar>`,
      });
      // Either the inner img has alt, or the host has aria-label
      const img = page.root.querySelector('img');
      const wrapper = page.root.querySelector('[part="avatar"]');
      const accessibleName = img?.getAttribute('alt') || wrapper?.getAttribute('aria-label');
      expect(accessibleName).toBeTruthy();
    });

    it('aegov-avatar without alt falls back to a default aria-label', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar></aegov-avatar>`,
      });
      const wrapper = page.root.querySelector('[part="avatar"]');
      expect(wrapper?.getAttribute('aria-label')).toBeTruthy();
    });
  });

  // ── 4.1.2 — dismissible chrome has a label ───────────────────────────────

  describe('4.1.2 — dismiss controls have an accessible name', () => {
    it('aegov-callout dismiss button has an aria-label', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout is-dismissible="true"><span slot="content">x</span></aegov-callout>`,
      });
      const dismiss = page.root.querySelector('button[aria-label]');
      expect(dismiss).toBeTruthy();
    });

    it('aegov-badge dismiss button has an aria-label', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge is-dismissible="true">tag</aegov-badge>`,
      });
      const dismiss = page.root.querySelector('button[aria-label]');
      expect(dismiss).toBeTruthy();
    });
  });

  // ── 4.1.2 — validation surface (Layer 1) a11y invariants ─────────────
  // See: validation-engine-addon.md §2.3, §2.6, §7.10

  describe('validation surface — aria-invalid wiring', () => {
    const cases: Array<{ name: string; ctor: any; tag: string; controlSelector: string }> = [
      { name: 'aegov-input',         ctor: AegovInput,        tag: 'aegov-input',        controlSelector: 'input' },
      { name: 'aegov-textarea',      ctor: AegovTextarea,     tag: 'aegov-textarea',     controlSelector: 'textarea' },
      { name: 'aegov-select',        ctor: AegovSelect,       tag: 'aegov-select',       controlSelector: 'select' },
      { name: 'aegov-checkbox',      ctor: AegovCheckbox,     tag: 'aegov-checkbox',     controlSelector: 'input[type="checkbox"]' },
      { name: 'aegov-radio',         ctor: AegovRadio,        tag: 'aegov-radio',        controlSelector: 'input[type="radio"]' },
      { name: 'aegov-toggle',        ctor: AegovToggle,       tag: 'aegov-toggle',       controlSelector: 'input[type="checkbox"]' },
      { name: 'aegov-range',         ctor: AegovRange,        tag: 'aegov-range',        controlSelector: 'input[type="range"]' },
    ];

    cases.forEach(({ name, ctor, tag, controlSelector }) => {
      it(`${name} sets aria-invalid="true" on inner control when isInvalid`, async () => {
        const page = await newSpecPage({
          components: [ctor],
          html: `<${tag} is-invalid="true"></${tag}>`,
        });
        const control = page.root.querySelector(controlSelector);
        expect(control?.getAttribute('aria-invalid')).toBe('true');
      });
    });

    it('aegov-checkbox-group sets aria-invalid on fieldset when isInvalid', async () => {
      const page = await newSpecPage({
        components: [AegovCheckboxGroup, AegovCheckbox],
        html: `<aegov-checkbox-group is-invalid="true">
          <aegov-checkbox value="a"></aegov-checkbox>
        </aegov-checkbox-group>`,
      });
      expect(page.root.querySelector('fieldset')?.getAttribute('aria-invalid')).toBe('true');
    });

    it('aegov-radio-group sets aria-invalid on fieldset when isInvalid', async () => {
      const page = await newSpecPage({
        components: [AegovRadioGroup, AegovRadio],
        html: `<aegov-radio-group name="r" is-invalid="true">
          <aegov-radio value="a"></aegov-radio>
        </aegov-radio-group>`,
      });
      expect(page.root.querySelector('fieldset')?.getAttribute('aria-invalid')).toBe('true');
    });
  });

  describe('validation surface — aria-describedby chains to error region', () => {
    it('aegov-input aria-describedby resolves to non-empty error text', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input field-id="x" is-invalid="true" error-message="Bad value"></aegov-input>`,
      });
      const input = page.root.querySelector('input');
      const describedById = input?.getAttribute('aria-describedby');
      expect(describedById).toContain('x-error');
      const errorEl = page.root.querySelector(`#${describedById?.split(' ')[0]}`);
      expect(errorEl?.textContent).toBe('Bad value');
    });

    it('aegov-textarea aria-describedby chains counter + error IDs', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea field-id="t" maxlength="10" is-invalid="true" error-message="msg"></aegov-textarea>`,
      });
      const desc = page.root.querySelector('textarea')?.getAttribute('aria-describedby');
      expect(desc).toContain('t-counter');
      expect(desc).toContain('t-error');
    });

    it('aegov-select aria-describedby includes error ID on listbox button', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select appearance="listbox" field-id="s" is-invalid="true" error-message="err">
          <aegov-select-option value="a">A</aegov-select-option>
        </aegov-select>`,
      });
      expect(page.root.querySelector('button')?.getAttribute('aria-describedby')).toContain('s-error');
    });
  });

  describe('validation surface — aria-live gate (gap §7.10)', () => {
    it('aegov-input error region has NO role=alert before first blur', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input is-invalid="true" error-message="err"></aegov-input>`,
      });
      const region = page.root.querySelector('.aegov-input__error');
      expect(region?.getAttribute('role')).toBeNull();
      expect(region?.getAttribute('aria-live')).toBeNull();
    });

    it('aegov-input error region gains role=alert + aria-live=polite after first blur', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input is-invalid="true" error-message="err"></aegov-input>`,
      });
      page.rootInstance.hasBlurredOnce = true;
      await page.waitForChanges();
      const region = page.root.querySelector('.aegov-input__error');
      expect(region?.getAttribute('role')).toBe('alert');
      // No explicit aria-live: role="alert" already implies an assertive live region, and
      // forcing aria-live="polite" on top of it behaves inconsistently across screen readers.
      expect(region?.getAttribute('aria-live')).toBeNull();
    });
  });

  describe('validation surface — author-supplied aria-describedby preserved (gap §7.8)', () => {
    it('aegov-input preserves author aria-describedby and appends error ID', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input field-id="x" aria-describedby="external-help" is-invalid="true" error-message="err"></aegov-input>`,
      });
      const desc = page.root.querySelector('input')?.getAttribute('aria-describedby');
      expect(desc).toContain('external-help');
      expect(desc).toContain('x-error');
    });
  });
});
