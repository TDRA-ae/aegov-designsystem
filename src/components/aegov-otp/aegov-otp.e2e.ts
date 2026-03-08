import { newE2EPage } from '@stencil/core/testing';

describe('aegov-otp e2e', () => {
  // ============================================
  // BASIC RENDERING
  // ============================================

  it('renders cells', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp></aegov-otp>`);
    const cells = await page.findAll('aegov-otp .otp__cell');
    expect(cells.length).toBe(5);
  });

  it('renders hidden input', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp name="code"></aegov-otp>`);
    const hidden = await page.find('aegov-otp input[type="hidden"]');
    expect(hidden).toBeTruthy();
    expect(hidden.getAttribute('name')).toBe('code');
  });

  // ============================================
  // TYPING & FOCUS
  // ============================================

  it('accepts numeric input and moves focus', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp></aegov-otp>`);

    const firstCell = await page.find('aegov-otp .otp__cell');
    await firstCell.click();
    await page.keyboard.type('1');

    const val = await page.evaluate(() => {
      const cells = document.querySelectorAll('aegov-otp .otp__cell') as NodeListOf<HTMLInputElement>;
      return cells[0].value;
    });
    expect(val).toBe('1');

    // Focus should have moved to cell 2
    const focusedIndex = await page.evaluate(() => {
      const cells = document.querySelectorAll('aegov-otp .otp__cell');
      return Array.from(cells).indexOf(document.activeElement as Element);
    });
    expect(focusedIndex).toBe(1);
  });

  it('rejects letter input in numeric mode', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp></aegov-otp>`);

    const firstCell = await page.find('aegov-otp .otp__cell');
    await firstCell.click();
    await page.keyboard.type('a');

    const val = await page.evaluate(() => {
      const cell = document.querySelector('aegov-otp .otp__cell') as HTMLInputElement;
      return cell.value;
    });
    expect(val).toBe('');
  });

  it('accepts letters in alphanumeric mode', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp alphanumeric></aegov-otp>`);

    const firstCell = await page.find('aegov-otp .otp__cell');
    await firstCell.click();
    await page.keyboard.type('A');

    const val = await page.evaluate(() => {
      const cell = document.querySelector('aegov-otp .otp__cell') as HTMLInputElement;
      return cell.value;
    });
    expect(val).toBe('A');
  });

  it('types full OTP across all cells', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp></aegov-otp>`);

    const firstCell = await page.find('aegov-otp .otp__cell');
    await firstCell.click();
    await page.keyboard.type('12345');

    const values = await page.evaluate(() => {
      const cells = document.querySelectorAll('aegov-otp .otp__cell') as NodeListOf<HTMLInputElement>;
      return Array.from(cells).map(c => c.value);
    });
    expect(values).toEqual(['1', '2', '3', '4', '5']);
  });

  // ============================================
  // KEYBOARD NAVIGATION
  // ============================================

  it('backspace on empty cell moves to previous', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp></aegov-otp>`);

    const firstCell = await page.find('aegov-otp .otp__cell');
    await firstCell.click();
    await page.keyboard.type('12');

    // Now at cell 3 (index 2). Press backspace to clear cell 2 and move to cell 1
    await page.keyboard.press('Backspace'); // clears cell 2 (value '2')
    await page.keyboard.press('Backspace'); // cell 2 is now empty, moves to cell 1

    const focusedIndex = await page.evaluate(() => {
      const cells = document.querySelectorAll('aegov-otp .otp__cell');
      return Array.from(cells).indexOf(document.activeElement as Element);
    });
    // Should be on cell 0 (previous cell cleared)
    expect(focusedIndex).toBe(0);
  });

  it('arrow left moves to previous cell', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp></aegov-otp>`);

    const firstCell = await page.find('aegov-otp .otp__cell');
    await firstCell.click();
    await page.keyboard.type('1');
    // Focus is on cell 2 (index 1)
    await page.keyboard.press('ArrowLeft');

    const focusedIndex = await page.evaluate(() => {
      const cells = document.querySelectorAll('aegov-otp .otp__cell');
      return Array.from(cells).indexOf(document.activeElement as Element);
    });
    expect(focusedIndex).toBe(0);
  });

  it('arrow right moves to next cell', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp></aegov-otp>`);

    const firstCell = await page.find('aegov-otp .otp__cell');
    await firstCell.click();
    await page.keyboard.press('ArrowRight');

    const focusedIndex = await page.evaluate(() => {
      const cells = document.querySelectorAll('aegov-otp .otp__cell');
      return Array.from(cells).indexOf(document.activeElement as Element);
    });
    expect(focusedIndex).toBe(1);
  });

  // ============================================
  // PASTE
  // ============================================

  it('paste distributes value across cells', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp></aegov-otp>`);

    await page.evaluate(() => {
      const cell = document.querySelector('aegov-otp .otp__cell') as HTMLInputElement;
      cell.focus();
      const dt = new DataTransfer();
      dt.setData('text/plain', '98765');
      cell.dispatchEvent(new ClipboardEvent('paste', {
        clipboardData: dt,
        bubbles: true,
        cancelable: true,
      }));
    });

    await page.waitForChanges();

    const values = await page.evaluate(() => {
      const cells = document.querySelectorAll('aegov-otp .otp__cell') as NodeListOf<HTMLInputElement>;
      return Array.from(cells).map(c => c.value);
    });
    expect(values).toEqual(['9', '8', '7', '6', '5']);
  });

  it('paste strips spaces from value', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp></aegov-otp>`);

    await page.evaluate(() => {
      const cell = document.querySelector('aegov-otp .otp__cell') as HTMLInputElement;
      cell.focus();
      const dt = new DataTransfer();
      dt.setData('text/plain', '1 2 3 4 5');
      cell.dispatchEvent(new ClipboardEvent('paste', {
        clipboardData: dt,
        bubbles: true,
        cancelable: true,
      }));
    });

    await page.waitForChanges();

    const values = await page.evaluate(() => {
      const cells = document.querySelectorAll('aegov-otp .otp__cell') as NodeListOf<HTMLInputElement>;
      return Array.from(cells).map(c => c.value);
    });
    expect(values).toEqual(['1', '2', '3', '4', '5']);
  });

  it('paste always fills from cell 0', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp></aegov-otp>`);

    // Focus cell 3 (index 2) and paste — should fill from cell 0
    await page.evaluate(() => {
      const cells = document.querySelectorAll('aegov-otp .otp__cell') as NodeListOf<HTMLInputElement>;
      cells[2].focus();
      const dt = new DataTransfer();
      dt.setData('text/plain', '54321');
      cells[2].dispatchEvent(new ClipboardEvent('paste', {
        clipboardData: dt,
        bubbles: true,
        cancelable: true,
      }));
    });

    await page.waitForChanges();

    const values = await page.evaluate(() => {
      const cells = document.querySelectorAll('aegov-otp .otp__cell') as NodeListOf<HTMLInputElement>;
      return Array.from(cells).map(c => c.value);
    });
    expect(values).toEqual(['5', '4', '3', '2', '1']);
  });

  // ============================================
  // EVENTS
  // ============================================

  it('fires change event on input', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp></aegov-otp>`);

    const changeSpy = await page.spyOnEvent('aegovOtpChange');

    const firstCell = await page.find('aegov-otp .otp__cell');
    await firstCell.click();
    await page.keyboard.type('1');

    expect(changeSpy).toHaveReceivedEvent();
    expect(changeSpy.lastEvent.detail.value).toBe('1');
  });

  it('fires complete event when all filled', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp length="3"></aegov-otp>`);

    const completeSpy = await page.spyOnEvent('aegovOtpComplete');

    const firstCell = await page.find('aegov-otp .otp__cell');
    await firstCell.click();
    await page.keyboard.type('123');

    expect(completeSpy).toHaveReceivedEvent();
    expect(completeSpy.lastEvent.detail.value).toBe('123');
  });

  it('fires invalid event when pattern fails', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp length="3" pattern="^999$"></aegov-otp>`);

    const invalidSpy = await page.spyOnEvent('aegovOtpInvalid');
    const completeSpy = await page.spyOnEvent('aegovOtpComplete');

    const firstCell = await page.find('aegov-otp .otp__cell');
    await firstCell.click();
    await page.keyboard.type('123');

    expect(invalidSpy).toHaveReceivedEvent();
    expect(invalidSpy.lastEvent.detail.value).toBe('123');
    expect(invalidSpy.lastEvent.detail.pattern).toBe('^999$');
    expect(completeSpy).not.toHaveReceivedEvent();
  });

  it('fires complete event when pattern passes', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp length="3" pattern="^\\d{3}$"></aegov-otp>`);

    const completeSpy = await page.spyOnEvent('aegovOtpComplete');

    const firstCell = await page.find('aegov-otp .otp__cell');
    await firstCell.click();
    await page.keyboard.type('456');

    expect(completeSpy).toHaveReceivedEvent();
    expect(completeSpy.lastEvent.detail.value).toBe('456');
  });

  // ============================================
  // DISABLED
  // ============================================

  it('disabled cells do not accept input', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp disabled></aegov-otp>`);

    const firstCell = await page.find('aegov-otp .otp__cell');
    expect(firstCell.getAttribute('disabled')).not.toBeNull();
  });

  // ============================================
  // HIDDEN INPUT SYNC
  // ============================================

  it('syncs typed value to hidden input', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp name="pin"></aegov-otp>`);

    const firstCell = await page.find('aegov-otp .otp__cell');
    await firstCell.click();
    await page.keyboard.type('12345');

    const hiddenVal = await page.evaluate(() => {
      const hidden = document.querySelector('aegov-otp input[type="hidden"]') as HTMLInputElement;
      return hidden.value;
    });
    expect(hiddenVal).toBe('12345');
  });

  // ============================================
  // VALUE PROP
  // ============================================

  it('pre-fills cells from value prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp value="54321"></aegov-otp>`);

    const values = await page.evaluate(() => {
      const cells = document.querySelectorAll('aegov-otp .otp__cell') as NodeListOf<HTMLInputElement>;
      return Array.from(cells).map(c => c.value);
    });
    expect(values).toEqual(['5', '4', '3', '2', '1']);
  });

  it('updates cells when value changes via JS', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp></aegov-otp>`);

    await page.$eval('aegov-otp', (el: any) => {
      el.value = '99999';
    });
    await page.waitForChanges();

    const values = await page.evaluate(() => {
      const cells = document.querySelectorAll('aegov-otp .otp__cell') as NodeListOf<HTMLInputElement>;
      return Array.from(cells).map(c => c.value);
    });
    expect(values).toEqual(['9', '9', '9', '9', '9']);
  });

  // ============================================
  // CLEAR METHOD
  // ============================================

  it('clear method resets all cells', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp value="12345"></aegov-otp>`);

    const otp = await page.find('aegov-otp');
    await otp.callMethod('clear');
    await page.waitForChanges();

    const values = await page.evaluate(() => {
      const cells = document.querySelectorAll('aegov-otp .otp__cell') as NodeListOf<HTMLInputElement>;
      return Array.from(cells).map(c => c.value);
    });
    expect(values).toEqual(['', '', '', '', '']);
  });

  // ============================================
  // VARIANTS
  // ============================================

  it('continuous variant has dividers', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp variant="continuous"></aegov-otp>`);
    const dividers = await page.findAll('aegov-otp .otp__divider');
    expect(dividers.length).toBe(4);
  });

  it('individual variant has no dividers', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp variant="individual"></aegov-otp>`);
    const dividers = await page.findAll('aegov-otp .otp__divider');
    expect(dividers.length).toBe(0);
  });

  // ============================================
  // FULL SCENARIO
  // ============================================

  it('handles complete OTP flow', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp length="4" variant="individual"></aegov-otp>`);

    const completeSpy = await page.spyOnEvent('aegovOtpComplete');
    const changeSpy = await page.spyOnEvent('aegovOtpChange');

    const firstCell = await page.find('aegov-otp .otp__cell');
    await firstCell.click();
    await page.keyboard.type('1234');

    // Should have fired 4 change events
    expect(changeSpy).toHaveReceivedEventTimes(4);
    // Should have fired complete event
    expect(completeSpy).toHaveReceivedEvent();
    expect(completeSpy.lastEvent.detail.value).toBe('1234');

    // Hidden input should have the value
    const hiddenVal = await page.evaluate(() => {
      const hidden = document.querySelector('aegov-otp input[type="hidden"]') as HTMLInputElement;
      return hidden.value;
    });
    expect(hiddenVal).toBe('1234');
  });
});
