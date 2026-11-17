import { isRtl } from './rtl';

describe('isRtl', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('dir');
    document.body.innerHTML = '';
  });

  it('falls back to <html dir>', () => {
    const el = document.createElement('span');
    document.body.appendChild(el);
    expect(isRtl(el)).toBe(false);
    document.documentElement.setAttribute('dir', 'rtl');
    expect(isRtl(el)).toBe(true);
  });

  it('uses the nearest ancestor dir over <html dir>', () => {
    document.documentElement.setAttribute('dir', 'rtl');
    document.body.innerHTML = '<div dir="ltr"><span></span></div>';
    expect(isRtl(document.querySelector('span'))).toBe(false);
  });

  it('crosses shadow boundaries to find an ancestor dir', () => {
    document.body.innerHTML = '<div dir="rtl"><x-host></x-host></div>';
    const host = document.querySelector('x-host');
    const root = host.attachShadow({ mode: 'open' });
    const inner = document.createElement('span');
    root.appendChild(inner);
    expect(isRtl(inner)).toBe(true);
  });

  it('prefers a dir inside the shadow root over one outside it', () => {
    document.body.innerHTML = '<div dir="rtl"><x-host></x-host></div>';
    const root = document.querySelector('x-host').attachShadow({ mode: 'open' });
    const wrap = document.createElement('div');
    wrap.setAttribute('dir', 'ltr');
    const inner = document.createElement('span');
    wrap.appendChild(inner);
    root.appendChild(wrap);
    expect(isRtl(inner)).toBe(false);
  });
});
