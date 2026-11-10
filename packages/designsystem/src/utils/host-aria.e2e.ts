import { newE2EPage, E2EPage } from '@stencil/core/testing';

/**
 * Labels and descriptions set on a control's HOST reach the real element in
 * its shadow root, the way they reach a native control (utils/host-aria).
 * Each test reads Chrome's accessibility tree, i.e. what a screen reader gets.
 * DS-A11Y-input-01, -label-01, -otp-01, -form-field-01, -input-group-01.
 */
type AxNode = { role: string; name: string; description: string };

/** Accessible nodes inside `selector`'s host (roles that matter), from Chrome's full AX tree. */
async function axInside(page: E2EPage, selector: string): Promise<AxNode[]> {
  const cdp = await (page as any).target().createCDPSession();
  const { nodes } = await cdp.send('Accessibility.getFullAXTree');
  const { result } = await cdp.send('Runtime.evaluate', { expression: `document.querySelector(${JSON.stringify(selector)})` });
  const { node } = await cdp.send('DOM.describeNode', { objectId: result.objectId });
  const byId = new Map<string, any>(nodes.map((n: any) => [n.nodeId, n]));
  const host = nodes.find((n: any) => n.backendDOMNodeId === node.backendNodeId);
  const roles = ['textbox', 'checkbox', 'radio', 'switch', 'slider', 'group', 'radiogroup', 'combobox', 'button'];
  const out: AxNode[] = [];
  const walk = (n: any) => {
    if (!n) return;
    if (!n.ignored && roles.includes(n.role?.value)) {
      out.push({ role: n.role.value, name: n.name?.value ?? '', description: n.description?.value ?? '' });
    }
    (n.childIds ?? []).forEach((id: string) => walk(byId.get(id)));
  };
  walk(host);
  await cdp.detach();
  return out;
}

describe('host labels and descriptions reach the inner control', () => {
  it('aria-labelledby and aria-describedby on the host name and describe the inner control (input-01)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <span id="l1">Applicant name</span><aegov-input id="a" aria-labelledby="l1"></aegov-input>
      <p id="d1">As on your passport</p><aegov-input id="b" aria-label="Full name" aria-describedby="d1" hint="Own hint"></aegov-input>
      <span id="l2">Services</span><aegov-checkbox-group id="g" aria-labelledby="l2"><aegov-checkbox label="A" value="a"></aegov-checkbox></aegov-checkbox-group>
      <span id="l3">Travel date</span><aegov-datepicker id="dp" aria-labelledby="l3"></aegov-datepicker>`);
    await page.waitForChanges();
    expect(await axInside(page, '#a')).toEqual([{ role: 'textbox', name: 'Applicant name', description: '' }]);
    expect(await axInside(page, '#b')).toEqual([{ role: 'textbox', name: 'Full name', description: 'As on your passport Own hint' }]);
    expect((await axInside(page, '#g'))[0]).toEqual({ role: 'group', name: 'Services', description: '' });
    expect((await axInside(page, '#dp'))[0].name).toBe('Travel date');
  });

  it('names and descriptions follow changes to the referenced text', async () => {
    const page = await newE2EPage();
    await page.setContent('<span id="l1">Old name</span><p id="d1">Old help</p><aegov-input id="a" aria-labelledby="l1" aria-describedby="d1"></aegov-input>');
    await page.waitForChanges();
    await page.evaluate(() => {
      document.getElementById('l1')!.textContent = 'New name';
      document.getElementById('d1')!.textContent = 'New help';
    });
    await page.waitForChanges();
    expect(await axInside(page, '#a')).toEqual([{ role: 'textbox', name: 'New name', description: 'New help' }]);
  });

  it('standalone aegov-label for="<field-id>" names the field and a click focuses it (label-01)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-label id="la" for="applicant-name">Applicant name</aegov-label><aegov-input id="a" field-id="applicant-name" placeholder="Full legal name"></aegov-input>
      <aegov-label id="lt" for="notes">Notes</aegov-label><aegov-textarea id="t" field-id="notes"></aegov-textarea>`);
    await page.waitForChanges();
    expect(await axInside(page, '#a')).toEqual([{ role: 'textbox', name: 'Applicant name', description: '' }]);
    expect(await axInside(page, '#t')).toEqual([{ role: 'textbox', name: 'Notes', description: '' }]);
    await page.click('#lt');
    expect(await page.evaluate(() => document.activeElement?.id)).toBe('t');
    expect(await page.evaluate(() => document.getElementById('t')!.shadowRoot!.activeElement?.tagName)).toBe('TEXTAREA');
  });

  it('OTP: the documented label pairing names the group and cells keep their own names (otp-01)', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-label field-id="mfa">Enter the 6-digit code</aegov-label><aegov-otp id="o" field-id="mfa" length="3"></aegov-otp>');
    await page.waitForChanges();
    expect(await axInside(page, '#o')).toEqual([
      { role: 'group', name: 'Enter the 6-digit code', description: '' },
      { role: 'textbox', name: 'Character 1 of 3', description: '' },
      { role: 'textbox', name: 'Character 2 of 3', description: '' },
      { role: 'textbox', name: 'Character 3 of 3', description: '' },
    ]);
  });

  it('inside aegov-form-field, multi-part controls keep their per-part names (form-field-01)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-form-field><aegov-label>Verification code</aegov-label><aegov-otp id="o" length="2"></aegov-otp></aegov-form-field>
      <aegov-form-field><aegov-label>Price</aegov-label><aegov-range id="r" mode="range" value="20,60"></aegov-range></aegov-form-field>`);
    await page.waitForChanges();
    expect((await axInside(page, '#o')).map(n => n.name)).toEqual(['Verification code', 'Character 1 of 2', 'Character 2 of 2']);
    expect((await axInside(page, '#r')).map(n => n.name)).toEqual(['Price — Range minimum', 'Price — Range maximum']);
  });

  it('input group prefix and suffix are part of the input description, also in Arabic (input-group-01)', async () => {
    const page = await newE2EPage();
    await page.setContent(`<meta charset="utf-8">
      <aegov-input-group addon-prefix="AED"><aegov-input id="a" aria-label="Amount"></aegov-input></aegov-input-group>
      <div dir="rtl"><aegov-input-group addon-suffix=".gov.ae"><aegov-input id="d" aria-label="النطاق"></aegov-input></aegov-input-group></div>`);
    await page.waitForChanges();
    expect(await axInside(page, '#a')).toEqual([{ role: 'textbox', name: 'Amount', description: 'AED' }]);
    expect(await axInside(page, '#d')).toEqual([{ role: 'textbox', name: 'النطاق', description: '.gov.ae' }]);
  });
});
