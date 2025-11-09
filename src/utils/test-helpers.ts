/**
 * Test Utilities and Helpers
 *
 * Common utilities for testing AEGOV components
 */

/**
 * Wait for a specified amount of time
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Create a mock mouse event
 */
export function createMouseEvent(type: string, options?: MouseEventInit): MouseEvent {
  return new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    view: window,
    ...options,
  });
}

/**
 * Create a mock keyboard event
 */
export function createKeyboardEvent(
  type: string,
  key: string,
  options?: KeyboardEventInit
): KeyboardEvent {
  return new KeyboardEvent(type, {
    bubbles: true,
    cancelable: true,
    key,
    ...options,
  });
}

/**
 * Create a mock focus event
 */
export function createFocusEvent(type: string, options?: FocusEventInit): FocusEvent {
  return new FocusEvent(type, {
    bubbles: true,
    cancelable: true,
    ...options,
  });
}

/**
 * Check if an element has a specific class
 */
export function hasClass(element: HTMLElement, className: string): boolean {
  return element.classList.contains(className);
}

/**
 * Check if multiple classes exist on an element
 */
export function hasClasses(element: HTMLElement, classNames: string[]): boolean {
  return classNames.every((className) => element.classList.contains(className));
}

/**
 * Get computed style property
 */
export function getComputedStyleProperty(
  element: HTMLElement,
  property: string
): string {
  return window.getComputedStyle(element).getPropertyValue(property);
}

/**
 * Check if element is visible
 */
export function isVisible(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element);
  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    parseFloat(style.opacity) > 0
  );
}

/**
 * Mock event listener
 */
export class MockEventListener {
  private events: CustomEvent[] = [];

  handleEvent = (event: CustomEvent) => {
    this.events.push(event);
  };

  getEventCount(): number {
    return this.events.length;
  }

  getLastEvent(): CustomEvent | undefined {
    return this.events[this.events.length - 1];
  }

  getAllEvents(): CustomEvent[] {
    return this.events;
  }

  reset(): void {
    this.events = [];
  }
}

/**
 * Test data generators
 */
export const testData = {
  /**
   * Generate random string
   */
  randomString(length: number = 10): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  /**
   * Generate random number in range
   */
  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Generate random boolean
   */
  randomBoolean(): boolean {
    return Math.random() >= 0.5;
  },
};

/**
 * Accessibility test helpers
 */
export const a11y = {
  /**
   * Check if element has required ARIA attributes
   */
  hasAriaLabel(element: HTMLElement): boolean {
    return (
      element.hasAttribute('aria-label') ||
      element.hasAttribute('aria-labelledby')
    );
  },

  /**
   * Check if element is keyboard focusable
   */
  isFocusable(element: HTMLElement): boolean {
    const tabIndex = element.getAttribute('tabindex');
    return (
      element.tagName === 'BUTTON' ||
      element.tagName === 'A' ||
      element.tagName === 'INPUT' ||
      element.tagName === 'SELECT' ||
      element.tagName === 'TEXTAREA' ||
      (tabIndex !== null && parseInt(tabIndex) >= 0)
    );
  },

  /**
   * Get element's accessible name
   */
  getAccessibleName(element: HTMLElement): string {
    return (
      element.getAttribute('aria-label') ||
      element.textContent?.trim() ||
      ''
    );
  },

  /**
   * Check if element is disabled
   */
  isDisabled(element: HTMLElement): boolean {
    return (
      element.hasAttribute('disabled') ||
      element.getAttribute('aria-disabled') === 'true'
    );
  },
};

/**
 * Component test helpers
 */
export const component = {
  /**
   * Get shadow root from element
   */
  getShadowRoot(element: HTMLElement): ShadowRoot | null {
    return element.shadowRoot;
  },

  /**
   * Query selector in shadow DOM
   */
  shadowQuery(element: HTMLElement, selector: string): Element | null {
    const shadowRoot = element.shadowRoot;
    return shadowRoot ? shadowRoot.querySelector(selector) : null;
  },

  /**
   * Query all selectors in shadow DOM
   */
  shadowQueryAll(element: HTMLElement, selector: string): Element[] {
    const shadowRoot = element.shadowRoot;
    return shadowRoot ? Array.from(shadowRoot.querySelectorAll(selector)) : [];
  },

  /**
   * Check if component is hydrated
   */
  isHydrated(element: HTMLElement): boolean {
    return element.classList.contains('hydrated');
  },
};

/**
 * Assertion helpers
 */
export const assert = {
  /**
   * Assert element exists
   */
  exists(element: Element | null, message?: string): void {
    if (!element) {
      throw new Error(message || 'Element does not exist');
    }
  },

  /**
   * Assert element has class
   */
  hasClass(element: HTMLElement, className: string, message?: string): void {
    if (!element.classList.contains(className)) {
      throw new Error(
        message || `Element does not have class: ${className}`
      );
    }
  },

  /**
   * Assert element has attribute
   */
  hasAttribute(
    element: HTMLElement,
    attribute: string,
    value?: string,
    message?: string
  ): void {
    if (!element.hasAttribute(attribute)) {
      throw new Error(
        message || `Element does not have attribute: ${attribute}`
      );
    }
    if (value !== undefined && element.getAttribute(attribute) !== value) {
      throw new Error(
        message ||
          `Attribute ${attribute} has value "${element.getAttribute(
            attribute
          )}" instead of "${value}"`
      );
    }
  },

  /**
   * Assert arrays are equal
   */
  arrayEquals<T>(arr1: T[], arr2: T[], message?: string): void {
    if (arr1.length !== arr2.length) {
      throw new Error(message || 'Arrays have different lengths');
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        throw new Error(
          message || `Arrays differ at index ${i}: ${arr1[i]} !== ${arr2[i]}`
        );
      }
    }
  },
};
