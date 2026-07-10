/**
 * Stencil globalScript entry point.
 * Code here runs once when the library initialises — before any component is loaded.
 */
import './toast-helper';

export default function () {
  // Pre-create the toast live region so screen readers register it at page load
  // (aria-live regions must be in the DOM before announcements to be reliably captured).
  if (typeof document !== 'undefined' && !document.getElementById('aegov-toast-live-region')) {
    const region = document.createElement('div');
    region.id = 'aegov-toast-live-region';
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.setAttribute('style',
      'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;',
    );
    document.body.appendChild(region);
  }
}
