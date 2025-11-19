# Accessibility Quick Reference Guide

Quick accessibility checklist for AEGOV Design System components.

---

## ✅ Component Usage Checklist

### Before Using Any Component

- [ ] Does it have visible text? (not icon-only)
- [ ] Is color the only indicator? (add text/icon)
- [ ] Can it be keyboard operated? (test with Tab, Enter, Space)
- [ ] Does it have proper contrast? (check with DevTools)

---

## 🎯 Component-Specific Guidelines

### aegov-button

```html
<!-- ✅ Good -->
<aegov-button variant="solid" appearance="primary">
  Save Document
</aegov-button>

<!-- ✅ Good - Icon with label -->
<aegov-button icon-only aria-label="Delete item">
  <svg>...</svg>
</aegov-button>

<!-- ❌ Bad - Icon without label -->
<aegov-button icon-only>
  <svg>...</svg>
</aegov-button>
```

**Required:**
- Icon-only buttons MUST have `aria-label`

---

### aegov-badge

```html
<!-- ✅ Good - Meaningful text -->
<aegov-badge color="success">Approved</aegov-badge>

<!-- ✅ Good - Dismissible with context -->
<aegov-badge color="primary" dismissible>
  New Feature Available
</aegov-badge>

<!-- ❌ Bad - Color only -->
<aegov-badge color="error"></aegov-badge>
```

**Required:**
- Always include meaningful text
- Don't rely on color alone

---

### aegov-avatar

```html
<!-- ✅ Good - Descriptive alt -->
<aegov-avatar
  src="user.jpg"
  alt="John Doe, Senior Developer">
</aegov-avatar>

<!-- ✅ Good - Status with context -->
<aegov-avatar
  src="user.jpg"
  alt="Jane Smith"
  status="online">
</aegov-avatar>

<!-- ✅ Good - Decorative -->
<aegov-avatar src="icon.jpg" alt=""></aegov-avatar>

<!-- ❌ Bad - Missing alt -->
<aegov-avatar src="user.jpg"></aegov-avatar>
```

**Required:**
- Always include `alt` attribute
- Use empty `alt=""` for decorative images only

---

### aegov-link

```html
<!-- ✅ Good - Descriptive text -->
<aegov-link href="/downloads">
  Download Annual Report (PDF, 2.5 MB)
</aegov-link>

<!-- ✅ Good - External with security -->
<aegov-link
  href="https://external.com"
  target="_blank">
  External Resource
</aegov-link>

<!-- ❌ Bad - Generic text -->
<aegov-link href="/page">Click here</aegov-link>

<!-- ❌ Bad - External without security -->
<aegov-link
  href="https://external.com"
  target="_blank"
  rel="">
  External Link
</aegov-link>
```

**Required:**
- Use descriptive link text
- External links automatically get `rel="noopener noreferrer"`

---

### aegov-callout

```html
<!-- ✅ Good - Error with icon and text -->
<aegov-callout variant="error" with-icon>
  Your password must be at least 8 characters long.
</aegov-callout>

<!-- ✅ Good - Dismissible announcement -->
<aegov-callout variant="info" dismissible>
  New features are now available. Check them out!
</aegov-callout>

<!-- ⚠️ Warning - Multiple callouts -->
<!-- Use sparingly - one callout per page recommended -->
```

**Required:**
- Use `role="alert"` (automatically applied)
- Combine icon + color + text

---

### aegov-breadcrumbs

```html
<!-- ✅ Good - Clear hierarchy -->
<aegov-breadcrumbs>
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Current Page</aegov-breadcrumbs-item>
</aegov-breadcrumbs>

<!-- ❌ Bad - Too many levels -->
<aegov-breadcrumbs>
  <!-- More than 5 levels is hard to navigate -->
</aegov-breadcrumbs>
```

**Required:**
- Last item is automatically marked as current page
- Use semantic navigation structure

---

### aegov-tooltip

```html
<!-- ✅ Good - Simple tooltip -->
<aegov-tooltip content="Save your changes" position="top">
  <aegov-button icon-only aria-label="Save">
    <svg>...</svg>
  </aegov-button>
</aegov-tooltip>

<!-- ✅ Good - Interactive tooltip -->
<aegov-tooltip interactive position="right">
  <aegov-button>Help</aegov-button>
  <div slot="tooltip-content">
    <p>Need help? <a href="/docs">View Documentation</a></p>
  </div>
</aegov-tooltip>

<!-- ❌ Bad - Essential info in tooltip -->
<!-- Don't hide critical information in tooltips -->
```

**Required:**
- Use for supplementary information only
- Not for essential content
- Keyboard dismissible (Escape key)

---

### aegov-accordion

```html
<!-- ✅ Good - Semantic headings -->
<aegov-accordion>
  <aegov-accordion-item heading="Section 1" open>
    Content for section 1
  </aegov-accordion-item>
  <aegov-accordion-item heading="Section 2">
    Content for section 2
  </aegov-accordion-item>
</aegov-accordion>

<!-- ⚠️ Consider - Long content -->
<!-- Ensure content is scannable within panels -->
```

**Required:**
- Use clear, descriptive headings
- Support keyboard navigation (Tab, Enter, Space)

---

### aegov-modal

```html
<!-- ✅ Good - With heading -->
<aegov-modal open heading="Confirm Deletion">
  <p>Are you sure you want to delete this item?</p>
  <div slot="footer">
    <aegov-button variant="outline">Cancel</aegov-button>
    <aegov-button variant="solid">Delete</aegov-button>
  </div>
</aegov-modal>

<!-- ❌ Bad - Missing heading -->
<aegov-modal open>
  <p>Content without title</p>
</aegov-modal>
```

**Required:**
- Always include `heading` prop
- Focus trap when open
- Dismissible with Escape key

---

### aegov-banner

```html
<!-- ✅ Good - Announcement -->
<aegov-banner
  variant="info"
  position="top"
  dismissible>
  New features are available! <a href="/updates">Learn more</a>
</aegov-banner>

<!-- ⚠️ Warning - Multiple banners -->
<!-- Only use one banner at a time -->
```

**Required:**
- Use sparingly (one per page)
- Provide dismiss option for non-critical messages

---

## 🎨 Color Contrast Guidelines

### Text Contrast Requirements

**Normal Text (< 18px):** 4.5:1 minimum
**Large Text (≥ 18px or bold ≥ 14px):** 3:1 minimum
**UI Components:** 3:1 minimum

### Approved Color Combinations

| Background | Text Color | Ratio | Status |
|------------|-----------|-------|--------|
| White (#FFFFFF) | AEGold (#C5A572) | 4.7:1 | ✅ Pass |
| White (#FFFFFF) | AEBlack (#1A1A1A) | 18.5:1 | ✅ Pass |
| AEGold (#C5A572) | White (#FFFFFF) | 4.7:1 | ✅ Pass |
| AERed Light (#FEE2E2) | AERed Dark (#991B1B) | 7.1:1 | ✅ Pass |
| Camel Light (#FEF3C7) | Camel Dark (#92400E) | 9.2:1 | ✅ Pass |
| AEGreen Light (#D1FAE5) | AEGreen Dark (#065F46) | 8.4:1 | ✅ Pass |
| TechBlue Light (#DBEAFE) | TechBlue Dark (#1E40AF) | 8.6:1 | ✅ Pass |

### Test Your Colors

```bash
# Use WebAIM Contrast Checker
https://webaim.org/resources/contrastchecker/

# Or Chrome DevTools
1. Inspect element
2. Open "Accessibility" panel
3. Check "Contrast" section
```

---

## ⌨️ Keyboard Navigation Testing

### Test Every Component:

1. **Tab Key:** Navigate to component
2. **Enter/Space:** Activate component
3. **Escape:** Close/dismiss (if applicable)
4. **Arrow Keys:** Navigate within component (if applicable)

### Common Issues:

- ❌ Can't reach component with Tab
- ❌ Enter/Space doesn't activate
- ❌ No visible focus indicator
- ❌ Focus lost after interaction

---

## 🔍 ARIA Attributes Reference

### Common Patterns

**Buttons:**
```html
<button aria-label="Close" aria-disabled="true">
```

**Links:**
```html
<a href="/" aria-current="page">
```

**Expandable:**
```html
<button aria-expanded="true" aria-controls="content-id">
```

**Alerts:**
```html
<div role="alert">Important message</div>
```

**Dialogs:**
```html
<div role="dialog" aria-modal="true" aria-labelledby="title-id">
```

**Navigation:**
```html
<nav aria-label="Breadcrumb">
```

### When to Use ARIA

✅ **Use ARIA when:**
- Adding semantic meaning to generic elements
- Describing state changes (expanded, selected)
- Connecting related elements (describedby, controls)
- Creating custom widgets

❌ **Don't use ARIA when:**
- Semantic HTML exists (`<button>` not `<div role="button">`)
- Making non-interactive elements interactive
- Duplicating implicit roles

---

## 🧪 Testing Checklist

### Before Committing Code

- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast passes
- [ ] ARIA attributes correct
- [ ] Alt text for images
- [ ] Screen reader tested (optional but recommended)

### Tools to Use

**Browser Extensions:**
- axe DevTools
- WAVE
- Lighthouse

**Screen Readers:**
- NVDA (Windows - Free)
- JAWS (Windows - Trial)
- VoiceOver (Mac - Built-in)

**Command Line:**
```bash
# Run accessibility tests
npm test -- accessibility.spec.ts

# Run all tests
npm test
```

---

## 📚 Resources

**WCAG Guidelines:**
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

**Testing Tools:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)

**Training:**
- [Web Accessibility by Google](https://www.udacity.com/course/web-accessibility--ud891)
- [Deque University](https://dequeuniversity.com/)

---

## 🆘 Common Fixes

### "Button not keyboard accessible"
```html
<!-- ❌ Wrong -->
<div onclick="...">Click me</div>

<!-- ✅ Correct -->
<button onclick="...">Click me</button>
```

### "Image missing alt text"
```html
<!-- ❌ Wrong -->
<img src="photo.jpg">

<!-- ✅ Correct -->
<img src="photo.jpg" alt="Team photo at annual conference">

<!-- ✅ Decorative -->
<img src="decorative.jpg" alt="">
```

### "Low contrast text"
```html
<!-- ❌ Wrong -->
<p style="color: #999;">Light gray text</p>

<!-- ✅ Correct -->
<p style="color: #595959;">Darker gray text (4.5:1)</p>
```

### "Focus not visible"
```css
/* ❌ Wrong */
button:focus {
  outline: none;
}

/* ✅ Correct */
button:focus-visible {
  outline: 2px solid #0066CC;
  outline-offset: 2px;
}
```

---

## 💡 Pro Tips

1. **Test with keyboard first** - If you can't use it with keyboard, fix it
2. **Don't remove focus outlines** - Use `:focus-visible` instead of `:focus`
3. **Use semantic HTML** - `<button>` not `<div onclick>`
4. **Test with screen reader** - Even 5 minutes helps
5. **Color is not enough** - Use icon + text + color
6. **Write good alt text** - Describe purpose, not appearance
7. **Keep it simple** - Simpler UIs are more accessible

---

**Last Updated:** November 2025
**Questions?** Check `/docs/ACCESSIBILITY.md` for detailed guide
