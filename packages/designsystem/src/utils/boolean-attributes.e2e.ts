import { newE2EPage } from '@stencil/core/testing';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

/**
 * `is-*="false"` must turn a flag off on every component, as the docs promise.
 *
 * Stencil 4.45.2 reads any present boolean attribute as `true` on form-associated
 * components (stenciljs/core#6908), so `<aegov-button is-disabled="false">` would be
 * disabled. stencil-runtime-patch.ts restores `"false"` → false; this test fails if
 * the patch is missing or a Stencil upgrade changes that code path.
 *
 * Every boolean @Prop of every form-associated component is read from source, so
 * new props are covered automatically.
 */
const componentsDir = join(__dirname, '..', 'components');

const formComponents = readdirSync(componentsDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(({ name: dir }) => {
    const source = readFileSync(join(componentsDir, dir, `${dir}.tsx`), 'utf8');
    if (!/formAssociated:\s*true/.test(source)) return null;
    const tag = source.match(/tag:\s*'([^']+)'/)[1];
    const props = [...source.matchAll(/@Prop\([^)]*\)\s+(is\w+)\??:\s*boolean/g)].map(m => m[1]);
    return { tag, props };
  })
  .filter(Boolean);

const toAttr = (prop: string) => prop.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`);

describe('boolean attributes on form-associated components', () => {
  it('finds the form-associated components and their boolean props', () => {
    expect(formComponents.length).toBe(11);
    expect(formComponents.reduce((n, c) => n + c.props.length, 0)).toBe(54);
  });

  for (const { tag, props } of formComponents) {
    it(`${tag}: is-*="false" is off, a bare attribute is on, and setAttribute toggles both ways`, async () => {
      const page = await newE2EPage();
      const markup = props
        .map(p => `<${tag} data-prop="${p}" data-case="false" ${toAttr(p)}="false"></${tag}><${tag} data-prop="${p}" data-case="bare" ${toAttr(p)}></${tag}>`)
        .join('');
      await page.setContent(markup);

      const results = await page.evaluate(async (props: string[], tag: string) => {
        const out: Record<string, unknown> = {};
        const wait = () => new Promise(r => setTimeout(r, 0));
        for (const p of props) {
          const attr = p.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`);
          const off = document.querySelector(`${tag}[data-prop="${p}"][data-case="false"]`) as any;
          const on = document.querySelector(`${tag}[data-prop="${p}"][data-case="bare"]`) as any;
          out[`${p} markup "false"`] = off[p];
          out[`${p} bare attribute`] = on[p];
          off.setAttribute(attr, 'true');
          await wait();
          out[`${p} setAttribute "true"`] = off[p];
          off.setAttribute(attr, 'false');
          await wait();
          out[`${p} setAttribute "false"`] = off[p];
          on.removeAttribute(attr);
          await wait();
          out[`${p} removeAttribute`] = on[p];
        }
        return out;
      }, props, tag);

      const expected: Record<string, boolean> = {};
      for (const p of props) {
        expected[`${p} markup "false"`] = false;
        expected[`${p} bare attribute`] = true;
        expected[`${p} setAttribute "true"`] = true;
        expected[`${p} setAttribute "false"`] = false;
        expected[`${p} removeAttribute`] = false;
      }
      expect(results).toEqual(expected);
    });
  }
});
