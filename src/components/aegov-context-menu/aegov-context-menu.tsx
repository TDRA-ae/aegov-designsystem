import { Component, Host, h, Prop, Element, State, Listen, Event, EventEmitter, Watch, Method } from '@stencil/core';
import { getFocusableElements, MENU_FOCUSABLE_SELECTORS, cycleFocus } from '../../utils/focus-management';
import { createPortal, removePortal } from '../../utils/portal-manager';
import { createKeyboardHandler } from '../../utils/keyboard-handler';

/**
 * Design token values used in portal-injected styles.
 * Portal elements live outside Stencil's scope, so Tailwind utilities aren't available.
 * Keep in sync with the Tailwind theme.
 */
const PORTAL_TOKENS = {
  borderColor: 'oklch(0.817 0.014 264.536)',   // --color-slate-300
  dividerColor: 'oklch(0.896 0.006 264.531)',   // --color-slate-200
  hoverBg: 'oklch(0.976 0.003 264.542)',        // --color-slate-50
  focusRing: 'oklch(0.546 0.184 259.939)',      // --color-blue-600
  focusBg: 'oklch(0.942 0.032 254.599)',        // --color-blue-50
  shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  radius: '0.5rem',
} as const;

/** CSS injected into the portal element (scoped CSS can't reach it). */
const CONTEXT_MENU_PORTAL_STYLES = `
  .aegov-context-menu-portal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    pointer-events: none;
  }

  .aegov-context-menu-portal .aegov-context-menu {
    background: white;
    border: 1px solid ${PORTAL_TOKENS.borderColor};
    border-radius: ${PORTAL_TOKENS.radius};
    box-shadow: ${PORTAL_TOKENS.shadow};
    position: fixed;
    visibility: hidden;
    pointer-events: auto;
    padding: 0.5rem;
    width: auto;
    min-width: 12rem;
    max-width: 20rem;
    z-index: 9999;
    opacity: 0;
    transform: scale(0.95);
    transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
  }

  .aegov-context-menu-portal .aegov-context-menu[data-state="open"] {
    opacity: 1;
    transform: scale(1);
  }

  .aegov-context-menu-portal .aegov-context-menu button {
    width: 100%;
    text-align: left;
    padding: 0.5rem 0.75rem;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 0.25rem;
    transition: background-color 150ms ease-in-out;
  }

  .aegov-context-menu-portal .aegov-context-menu button:hover {
    background-color: ${PORTAL_TOKENS.hoverBg};
  }

  .aegov-context-menu-portal .aegov-context-menu button:focus {
    outline: 2px solid ${PORTAL_TOKENS.focusRing};
    outline-offset: -2px;
    background-color: ${PORTAL_TOKENS.focusBg};
  }

  .aegov-context-menu-portal .aegov-context-menu button:disabled,
  .aegov-context-menu-portal .aegov-context-menu button[aria-disabled="true"] {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .aegov-context-menu-portal .aegov-context-menu hr {
    border: none;
    border-top: 1px solid ${PORTAL_TOKENS.dividerColor};
    margin: 0.5rem 0;
  }
`;

// Singleton to track currently open context menu
let currentOpenContextMenu: AegovContextMenu | null = null;

/**
 * Context menu component that displays positioned content on right-click
 *
 * @slot - Menu content (any HTML/components)
 */
@Component({
  tag: 'aegov-context-menu',
  styleUrl: 'aegov-context-menu.css',
  scoped: true,
})
export class AegovContextMenu {
  @Element() el: HTMLElement;

  @State() isOpen: boolean = false;
  @State() hasContent: boolean = false;

  private menuRef?: HTMLDivElement;
  private portalElement?: HTMLDivElement;
  private lastTriggerElement?: HTMLElement;
  private cursorX: number = 0;
  private cursorY: number = 0;
  private menuId: string;
  private focusableElements: HTMLElement[] = [];
  private currentFocusIndex: number = -1;

  /**
   * CSS selector for target elements that trigger the context menu
   * @required
   */
  @Prop() target!: string;

  /**
   * Offset from cursor position (in pixels)
   * @default 0
   */
  @Prop() offset: number = 0;

  /**
   * Close menu when an item is clicked
   * @default true
   */
  @Prop() closeOnItemClick: boolean = true;

  /**
   * Whether the context menu is disabled
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * Emitted when context menu opens
   */
  @Event() aegovContextMenuOpen: EventEmitter<{ x: number; y: number; targetElement: HTMLElement }>;

  /**
   * Emitted when context menu closes
   */
  @Event() aegovContextMenuClose: EventEmitter<void>;

  componentWillLoad() {
    // Generate stable menu ID once
    this.menuId = `aegov-context-menu-${Math.random().toString(36).substr(2, 9)}`;

    // Check if slot has content
    this.checkSlotContent();
  }

  componentDidLoad() {
    // Create portal element for menu content
    this.createPortalElement();

    // Validate selector early so authors see errors at load time
    this.validateTarget();

    // Single delegated listener replaces per-element binding
    document.addEventListener('contextmenu', this.delegatedContextMenuHandler);
  }

  disconnectedCallback() {
    document.removeEventListener('contextmenu', this.delegatedContextMenuHandler);
    this.removePortalElement();
  }

  private checkSlotContent() {
    const hasSlot = this.el.childNodes.length > 0;
    this.hasContent = hasSlot;
  }

  private validateTarget() {
    if (!this.target) return;
    try {
      document.querySelector(this.target);
    } catch (error) {
      console.error(`aegov-context-menu: Invalid selector "${this.target}"`, error);
    }
  }

  private createPortalElement() {
    if (!this.portalElement) {
      this.portalElement = createPortal('aegov-context-menu-portal');
    }
  }

  private removePortalElement() {
    this.portalElement = removePortal(this.portalElement);
  }

  /**
   * Delegated contextmenu handler. A single listener on `document` replaces
   * per-element binding — no DOM scanning, no unbind/rebind on target change.
   */
  private delegatedContextMenuHandler = (event: MouseEvent) => {
    if (this.disabled || !this.target) return;

    try {
      const matchedTarget = (event.target as HTMLElement).closest?.(this.target) as HTMLElement;
      if (!matchedTarget) return;

      event.preventDefault();
      this.cursorX = event.clientX;
      this.cursorY = event.clientY;
      this.lastTriggerElement = matchedTarget;
      this.showMenu();
    } catch {
      // Invalid selector at event time — already warned at load via validateTarget()
    }
  };

  /**
   * Direct contextmenu handler for programmatic / test use.
   * The delegated handler is preferred at runtime.
   */
  handleContextMenu = (event: MouseEvent) => {
    if (this.disabled) return;

    event.preventDefault();
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;
    // When called directly (e.g. tests), use currentTarget as trigger element
    if (event.currentTarget && event.currentTarget !== document) {
      this.lastTriggerElement = event.currentTarget as HTMLElement;
    }
    this.showMenu();
  };

  @Watch('isOpen')
  handleOpenChange(newValue: boolean) {
    if (newValue) {
      // Close any other open context menu before opening this one
      if (currentOpenContextMenu && currentOpenContextMenu !== this) {
        currentOpenContextMenu.close();
      }
      currentOpenContextMenu = this;

      // Render portal content
      this.renderPortalContent();

      // Schedule position update after menu is rendered
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (this.isOpen && this.menuRef) {
            this.updateMenuPosition();
          }
        });
      });

      // Emit open event
      this.aegovContextMenuOpen.emit({
        x: this.cursorX,
        y: this.cursorY,
        targetElement: this.lastTriggerElement,
      });

      // Set up focus trap after a tick
      setTimeout(() => this.setupFocusTrap(), 0);
    } else {
      // Clear reference if this was the currently open menu
      if (currentOpenContextMenu === this) {
        currentOpenContextMenu = null;
      }

      // Clear menu ref when hiding
      this.menuRef = undefined;

      // Clear portal content
      if (this.portalElement) {
        this.portalElement.innerHTML = '';
      }

      // Restore focus to the element that triggered the context menu
      if (this.lastTriggerElement) {
        this.lastTriggerElement.focus();
      }

      // Emit close event
      this.aegovContextMenuClose.emit();
    }
  }

  /**
   * Public method to show the context menu at specific coordinates
   */
  @Method()
  async show(x: number, y: number) {
    this.cursorX = x;
    this.cursorY = y;
    this.isOpen = true;
  }

  /**
   * Public method to close the context menu
   */
  @Method()
  async close() {
    this.isOpen = false;
  }

  private showMenu() {
    this.isOpen = true;
  }

  private updateMenuPosition() {
    if (!this.menuRef) return;

    const menuRect = this.menuRef.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let finalX = this.cursorX + this.offset;
    let finalY = this.cursorY + this.offset;

    // Determine transform origin for animation
    let originX = '0%';
    let originY = '0%';

    // Flip horizontally if too close to right edge
    if (finalX + menuRect.width > viewportWidth - 8) {
      finalX = Math.max(8, viewportWidth - menuRect.width - 8);
      originX = '100%';
    }

    // Flip vertically if too close to bottom edge
    if (finalY + menuRect.height > viewportHeight - 8) {
      finalY = Math.max(8, viewportHeight - menuRect.height - 8);
      originY = '100%';
    }

    // Ensure menu doesn't go off left edge
    if (finalX < 8) {
      finalX = 8;
      originX = '0%';
    }

    // Ensure menu doesn't go off top edge
    if (finalY < 8) {
      finalY = 8;
      originY = '0%';
    }

    // Apply styles directly to DOM
    this.menuRef.style.left = `${finalX}px`;
    this.menuRef.style.top = `${finalY}px`;
    this.menuRef.style.transformOrigin = `${originX} ${originY}`;
    this.menuRef.style.visibility = 'visible';
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (this.isOpen) {
      const target = event.target as Node;

      // Close if click is outside menu
      if (this.portalElement && !this.portalElement.contains(target)) {
        this.isOpen = false;
      } else if (this.closeOnItemClick && this.portalElement && this.portalElement.contains(target)) {
        // Close if click is on a menu item and closeOnItemClick is true
        const clickedElement = target as HTMLElement;
        const isMenuItem =
          clickedElement.tagName === 'BUTTON' ||
          clickedElement.closest('button') ||
          clickedElement.hasAttribute('role') && clickedElement.getAttribute('role') === 'menuitem' ||
          clickedElement.closest('[role="menuitem"]');

        if (isMenuItem) {
          this.isOpen = false;
        }
      }
    }
  }

  private keyHandler = createKeyboardHandler({
    onEscape: () => { this.isOpen = false; },
    onTab: (reverse) => { this.focusNextElement(reverse); },
    onArrowDown: () => { this.focusNextElement(false); },
    onArrowUp: () => { this.focusNextElement(true); },
    onEnter: () => { this.activateFocusedElement(); },
    onSpace: () => { this.activateFocusedElement(); },
  });

  @Listen('keydown', { target: 'document' })
  handleKeyDown(event: KeyboardEvent) {
    if (!this.isOpen) return;
    this.keyHandler(event);
  }

  private setupFocusTrap() {
    if (!this.menuRef) return;

    this.focusableElements = getFocusableElements(this.menuRef, MENU_FOCUSABLE_SELECTORS);

    if (this.focusableElements.length > 0) {
      this.currentFocusIndex = 0;
      this.focusableElements[0].focus();
    }
  }

  private focusNextElement(reverse: boolean = false) {
    this.currentFocusIndex = cycleFocus(this.focusableElements, this.currentFocusIndex, reverse);
  }

  private activateFocusedElement() {
    if (this.currentFocusIndex >= 0 && this.focusableElements[this.currentFocusIndex]) {
      this.focusableElements[this.currentFocusIndex].click();
    }
  }

  private renderPortalContent() {
    if (!this.portalElement || !this.hasContent) return;

    // Clear portal
    this.portalElement.innerHTML = '';

    // Inject styles for portal content (scoped CSS can't reach portal elements)
    const styleElement = document.createElement('style');
    styleElement.textContent = CONTEXT_MENU_PORTAL_STYLES;
    this.portalElement.appendChild(styleElement);

    // Create menu container
    const menuContainer = document.createElement('div');
    menuContainer.className = 'aegov-context-menu';
    menuContainer.id = this.menuId;
    menuContainer.setAttribute('role', 'menu');
    menuContainer.setAttribute('aria-label', 'Context menu');
    menuContainer.setAttribute('data-state', 'open');

    // Clone slot content
    const slotContent = Array.from(this.el.childNodes)
      .filter(node => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()))
      .map(node => node.cloneNode(true));

    slotContent.forEach(node => {
      menuContainer.appendChild(node);
    });

    // Ensure focusable children have role="menuitem" for screen readers
    const focusable = menuContainer.querySelectorAll('button, a, [tabindex]');
    focusable.forEach(el => {
      if (!el.getAttribute('role')) {
        el.setAttribute('role', 'menuitem');
      }
    });

    // Append to portal
    this.portalElement.appendChild(menuContainer);

    // Store reference
    this.menuRef = menuContainer;
  }

  render() {
    return (
      <Host style={{ display: 'none' }}>
        <slot />
      </Host>
    );
  }
}
