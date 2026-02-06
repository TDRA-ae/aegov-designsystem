import { Component, Host, h, Prop, Element, State, Listen, Event, EventEmitter, Watch, Method } from '@stencil/core';

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
  private targetElements: HTMLElement[] = [];
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

    // Bind to target elements
    this.bindToTargets();
  }

  disconnectedCallback() {
    this.unbindFromTargets();
    this.removePortalElement();
  }

  @Watch('target')
  handleTargetChange() {
    this.unbindFromTargets();
    this.bindToTargets();
  }

  private checkSlotContent() {
    const hasSlot = this.el.childNodes.length > 0;
    this.hasContent = hasSlot;
  }

  private createPortalElement() {
    if (!this.portalElement) {
      this.portalElement = document.createElement('div');
      this.portalElement.className = 'aegov-context-menu-portal';
      document.body.appendChild(this.portalElement);
    }
  }

  private removePortalElement() {
    if (this.portalElement) {
      document.body.removeChild(this.portalElement);
      this.portalElement = undefined;
    }
  }

  private bindToTargets() {
    if (!this.target || this.disabled) return;

    try {
      const allElements = document.querySelectorAll(this.target);
      this.targetElements = Array.from(allElements) as HTMLElement[];

      this.targetElements.forEach(el => {
        el.addEventListener('contextmenu', this.handleContextMenu);
      });
    } catch (error) {
      console.error(`aegov-context-menu: Invalid selector "${this.target}"`, error);
    }
  }

  private unbindFromTargets() {
    this.targetElements.forEach(el => {
      el.removeEventListener('contextmenu', this.handleContextMenu);
    });
    this.targetElements = [];
  }

  private handleContextMenu = (event: MouseEvent) => {
    if (this.disabled) return;

    event.preventDefault();
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;
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
        targetElement: this.targetElements.find(el => el.contains(event?.target as Node)) || this.targetElements[0],
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

  @Listen('keydown', { target: 'document' })
  handleKeyDown(event: KeyboardEvent) {
    if (!this.isOpen) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.isOpen = false;
        break;
      case 'Tab':
        event.preventDefault();
        this.focusNextElement(event.shiftKey);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusNextElement(false);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusNextElement(true);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.activateFocusedElement();
        break;
    }
  }

  private setupFocusTrap() {
    if (!this.menuRef) return;

    // Get all focusable elements within menu
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[role="menuitem"]:not([aria-disabled="true"])',
    ];

    this.focusableElements = Array.from(
      this.menuRef.querySelectorAll(focusableSelectors.join(', '))
    ) as HTMLElement[];

    // Focus first element
    if (this.focusableElements.length > 0) {
      this.currentFocusIndex = 0;
      this.focusableElements[0].focus();
    }
  }

  private focusNextElement(reverse: boolean = false) {
    if (this.focusableElements.length === 0) return;

    if (reverse) {
      this.currentFocusIndex--;
      if (this.currentFocusIndex < 0) {
        this.currentFocusIndex = this.focusableElements.length - 1;
      }
    } else {
      this.currentFocusIndex++;
      if (this.currentFocusIndex >= this.focusableElements.length) {
        this.currentFocusIndex = 0;
      }
    }

    this.focusableElements[this.currentFocusIndex].focus();
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
    styleElement.textContent = `
      .aegov-context-menu-portal {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        pointer-events: none;
      }

      .aegov-context-menu-portal .context-menu {
        background: white;
        border: 1px solid #cbd5e0;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
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

      .aegov-context-menu-portal .context-menu[data-state="open"] {
        opacity: 1;
        transform: scale(1);
      }

      .aegov-context-menu-portal .context-menu button {
        width: 100%;
        text-align: left;
        padding: 0.5rem 0.75rem;
        border: none;
        background: transparent;
        cursor: pointer;
        border-radius: 0.25rem;
        transition: background-color 150ms ease-in-out;
      }

      .aegov-context-menu-portal .context-menu button:hover {
        background-color: #f7fafc;
      }

      .aegov-context-menu-portal .context-menu button:focus {
        outline: 2px solid #3182ce;
        outline-offset: -2px;
        background-color: #ebf8ff;
      }

      .aegov-context-menu-portal .context-menu button:disabled,
      .aegov-context-menu-portal .context-menu button[aria-disabled="true"] {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }

      .aegov-context-menu-portal .context-menu hr {
        border: none;
        border-top: 1px solid #e2e8f0;
        margin: 0.5rem 0;
      }
    `;
    this.portalElement.appendChild(styleElement);

    // Create menu container
    const menuContainer = document.createElement('div');
    menuContainer.className = 'context-menu';
    menuContainer.id = this.menuId;
    menuContainer.setAttribute('role', 'menu');
    menuContainer.setAttribute('data-state', 'open');

    // Clone slot content
    const slotContent = Array.from(this.el.childNodes)
      .filter(node => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()))
      .map(node => node.cloneNode(true));

    slotContent.forEach(node => {
      menuContainer.appendChild(node);
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
