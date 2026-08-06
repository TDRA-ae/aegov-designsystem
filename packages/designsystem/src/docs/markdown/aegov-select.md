# Select

<p class="text-lg text-aeblack-500 mb-8">A Select lets the user choose from a list of options. It ships two renderings behind one API: a native <code>&lt;select&gt;</code> for short, simple lists, and a fully-styled listbox with optional search, multiple selection and a clear button for longer or richer ones. Both accept the same option children and expose the same validation surface.</p>

## Introduction

Declare options as `aegov-select-option` children. The component reads their values and labels and renders whichever appearance you asked for.

```html
<aegov-form-field>
  <aegov-label>Emirate of residence</aegov-label>
  <aegov-select name="emirate" placeholder="Select an emirate">
    <aegov-select-option value="AZ">Abu Dhabi</aegov-select-option>
    <aegov-select-option value="DU">Dubai</aegov-select-option>
    <aegov-select-option value="SH">Sharjah</aegov-select-option>
    <aegov-select-option value="AJ">Ajman</aegov-select-option>
    <aegov-select-option value="UQ">Umm Al Quwain</aegov-select-option>
    <aegov-select-option value="RK">Ras Al Khaimah</aegov-select-option>
    <aegov-select-option value="FJ">Fujairah</aegov-select-option>
  </aegov-select>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-form-field>
      <aegov-label>Emirate of residence</aegov-label>
      <aegov-select field-id="sel-intro" name="emirate" placeholder="Select an emirate">
        <aegov-select-option value="AZ">Abu Dhabi</aegov-select-option>
        <aegov-select-option value="DU">Dubai</aegov-select-option>
        <aegov-select-option value="SH">Sharjah</aegov-select-option>
        <aegov-select-option value="AJ">Ajman</aegov-select-option>
        <aegov-select-option value="UQ">Umm Al Quwain</aegov-select-option>
        <aegov-select-option value="RK">Ras Al Khaimah</aegov-select-option>
        <aegov-select-option value="FJ">Fujairah</aegov-select-option>
      </aegov-select>
    </aegov-form-field>
  </div>
</div>

`aegov-select-option` must be used inside `aegov-select` — it throws a descriptive error if mounted anywhere else, rather than failing silently.

---

## Appearance

`appearance` chooses the rendering.

| Appearance | Renders | Choose it when |
| --- | --- | --- |
| `default` | A native `<select>`, styled as far as the platform allows. | The list is short and simple. You get the OS picker on mobile, which is the most familiar and accessible experience available. |
| `listbox` | A custom button plus a styled dropdown. | You need search, multiple selection, a clear button, or option styling the native control cannot express. |

```html
<aegov-select appearance="default" placeholder="Native select">…</aegov-select>
<aegov-select appearance="listbox" placeholder="Custom listbox">…</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <div>
      <p class="text-sm text-aeblack-500 mb-2">default — native select</p>
      <aegov-select field-id="sel-ap-1" appearance="default" placeholder="Select a service">
        <aegov-select-option value="eid">Emirates ID renewal</aegov-select-option>
        <aegov-select-option value="visa">Visa services</aegov-select-option>
        <aegov-select-option value="licence">Driving licence</aegov-select-option>
      </aegov-select>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-2">listbox — custom dropdown</p>
      <aegov-select field-id="sel-ap-2" appearance="listbox" placeholder="Select a service">
        <aegov-select-option value="eid">Emirates ID renewal</aegov-select-option>
        <aegov-select-option value="visa">Visa services</aegov-select-option>
        <aegov-select-option value="licence">Driving licence</aegov-select-option>
      </aegov-select>
    </div>
  </div>
</div>

Prefer `default` unless you need something it cannot do. The native control is smaller, faster, and on a phone it opens the platform picker that users already know.

**`is-multiple` forces the listbox rendering** regardless of what you set `appearance` to, because native multi-select is unusable on touch devices.

---

## Sizes

Five tokens, matching the rest of the form family.

```html
<aegov-select size="sm" placeholder="Small">…</aegov-select>
<aegov-select size="base" placeholder="Base">…</aegov-select>
<aegov-select size="lg" placeholder="Large">…</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-4">
    <aegov-select field-id="sel-s-xs" size="xs" placeholder="Extra small"><aegov-select-option value="a">Option A</aegov-select-option></aegov-select>
    <aegov-select field-id="sel-s-sm" size="sm" placeholder="Small"><aegov-select-option value="a">Option A</aegov-select-option></aegov-select>
    <aegov-select field-id="sel-s-base" size="base" placeholder="Base"><aegov-select-option value="a">Option A</aegov-select-option></aegov-select>
    <aegov-select field-id="sel-s-lg" size="lg" placeholder="Large"><aegov-select-option value="a">Option A</aegov-select-option></aegov-select>
    <aegov-select field-id="sel-s-xl" size="xl" placeholder="Extra large"><aegov-select-option value="a">Option A</aegov-select-option></aegov-select>
  </div>
</div>

### Responsive sizes

`size` accepts a responsive string with the prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`.

```html
<aegov-select size="sm md:base xl:lg" placeholder="Adapts to the viewport">…</aegov-select>
```

---

## Option groups

Wrap options in `aegov-select-option-group` to add headings. Groups work in both appearances — as `<optgroup>` in the native select, and as labelled groups in the listbox.

```html
<aegov-select name="service" placeholder="Select a service">
  <aegov-select-option-group label="Identity">
    <aegov-select-option value="eid-new">New Emirates ID</aegov-select-option>
    <aegov-select-option value="eid-renew">Renew Emirates ID</aegov-select-option>
    <aegov-select-option value="eid-replace">Replace lost Emirates ID</aegov-select-option>
  </aegov-select-option-group>

  <aegov-select-option-group label="Vehicles">
    <aegov-select-option value="lic-renew">Renew driving licence</aegov-select-option>
    <aegov-select-option value="veh-reg">Vehicle registration</aegov-select-option>
  </aegov-select-option-group>

  <aegov-select-option-group label="Residency">
    <aegov-select-option value="visa-new">New residency visa</aegov-select-option>
    <aegov-select-option value="visa-renew">Renew residency visa</aegov-select-option>
  </aegov-select-option-group>
</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-select field-id="sel-g-1" name="service" placeholder="Select a service">
      <aegov-select-option-group label="Identity">
        <aegov-select-option value="eid-new">New Emirates ID</aegov-select-option>
        <aegov-select-option value="eid-renew">Renew Emirates ID</aegov-select-option>
      </aegov-select-option-group>
      <aegov-select-option-group label="Vehicles">
        <aegov-select-option value="lic-renew">Renew driving licence</aegov-select-option>
        <aegov-select-option value="veh-reg">Vehicle registration</aegov-select-option>
      </aegov-select-option-group>
    </aegov-select>
    <aegov-select field-id="sel-g-2" appearance="listbox" name="service2" placeholder="Select a service (listbox)">
      <aegov-select-option-group label="Identity">
        <aegov-select-option value="eid-new">New Emirates ID</aegov-select-option>
        <aegov-select-option value="eid-renew">Renew Emirates ID</aegov-select-option>
      </aegov-select-option-group>
      <aegov-select-option-group label="Vehicles">
        <aegov-select-option value="lic-renew">Renew driving licence</aegov-select-option>
        <aegov-select-option value="veh-reg">Vehicle registration</aegov-select-option>
      </aegov-select-option-group>
    </aegov-select>
  </div>
</div>

---

## Disabled options

`is-disabled` on an individual option makes it unselectable while keeping it visible, which is useful when an option is temporarily unavailable and its absence would be confusing.

```html
<aegov-select name="appointment" placeholder="Select a time">
  <aegov-select-option value="0900">09:00</aegov-select-option>
  <aegov-select-option value="1000" is-disabled>10:00 — fully booked</aegov-select-option>
  <aegov-select-option value="1100">11:00</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-select field-id="sel-d-1" name="appointment" placeholder="Select a time">
      <aegov-select-option value="0900">09:00</aegov-select-option>
      <aegov-select-option value="1000" is-disabled>10:00 — fully booked</aegov-select-option>
      <aegov-select-option value="1100">11:00</aegov-select-option>
    </aegov-select>
    <aegov-select field-id="sel-d-2" appearance="listbox" name="appointment2" placeholder="Select a time (listbox)">
      <aegov-select-option value="0900">09:00</aegov-select-option>
      <aegov-select-option value="1000" is-disabled>10:00 — fully booked</aegov-select-option>
      <aegov-select-option value="1100">11:00</aegov-select-option>
    </aegov-select>
  </div>
</div>

Disabled options are skipped by keyboard navigation and by typeahead, so they never trap focus.

---

## Searchable listbox

`is-searchable` adds a filter input at the top of the dropdown. It applies to the listbox appearance only. Use it once a list passes roughly ten options.

```html
<aegov-select appearance="listbox" is-searchable name="country" placeholder="Select a country">
  <aegov-select-option value="ae">United Arab Emirates</aegov-select-option>
  <aegov-select-option value="sa">Saudi Arabia</aegov-select-option>
  <aegov-select-option value="kw">Kuwait</aegov-select-option>
  <!-- … -->
</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-select field-id="sel-search" appearance="listbox" is-searchable name="country" placeholder="Select a country">
      <aegov-select-option value="ae">United Arab Emirates</aegov-select-option>
      <aegov-select-option value="sa">Saudi Arabia</aegov-select-option>
      <aegov-select-option value="kw">Kuwait</aegov-select-option>
      <aegov-select-option value="qa">Qatar</aegov-select-option>
      <aegov-select-option value="bh">Bahrain</aegov-select-option>
      <aegov-select-option value="om">Oman</aegov-select-option>
      <aegov-select-option value="eg">Egypt</aegov-select-option>
      <aegov-select-option value="jo">Jordan</aegov-select-option>
      <aegov-select-option value="lb">Lebanon</aegov-select-option>
      <aegov-select-option value="in">India</aegov-select-option>
      <aegov-select-option value="pk">Pakistan</aegov-select-option>
      <aegov-select-option value="ph">Philippines</aegov-select-option>
    </aegov-select>
  </div>
</div>

The search input is focused automatically when the dropdown opens, and its label and placeholder are translated in RTL contexts. `emptyMessage` overrides the "No results found" text shown when nothing matches — which is also translated by default.

```html
<aegov-select appearance="listbox" is-searchable empty-message="No matching emirates">…</aegov-select>
```

---

## Multiple selection

`is-multiple` allows several values and forces the listbox rendering. Selected options show a checkmark, and the trigger displays a count.

```html
<aegov-select
  appearance="listbox"
  is-multiple
  is-searchable
  is-clearable
  name="languages"
  placeholder="Select languages"
>
  <aegov-select-option value="ar">Arabic</aegov-select-option>
  <aegov-select-option value="en">English</aegov-select-option>
  <aegov-select-option value="ur">Urdu</aegov-select-option>
  <aegov-select-option value="hi">Hindi</aegov-select-option>
  <aegov-select-option value="fa">Persian</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-select field-id="sel-multi" appearance="listbox" is-multiple is-searchable is-clearable name="languages" placeholder="Select languages">
      <aegov-select-option value="ar">Arabic</aegov-select-option>
      <aegov-select-option value="en">English</aegov-select-option>
      <aegov-select-option value="ur">Urdu</aegov-select-option>
      <aegov-select-option value="hi">Hindi</aegov-select-option>
      <aegov-select-option value="fa">Persian</aegov-select-option>
      <aegov-select-option value="tl">Tagalog</aegov-select-option>
    </aegov-select>
  </div>
</div>

The dropdown stays open as you select, so a user can pick several values without reopening it.

### The value format

In multiple mode the `value` property is a **comma-separated string**, while the `FormData` payload is one entry per value under the same `name`:

```js
const select = document.querySelector('#languages');

select.value;                                  // 'ar,en,ur'
await select.getValue?.();                     // (no such method — read .value)

new FormData(form).getAll('languages');        // ['ar', 'en', 'ur']
```

Set it the same way:

```js
select.value = 'ar,en';
```

Because the value is comma-delimited, **option values must not contain commas.** Use codes rather than free text.

---

## Clearable

`is-clearable` adds a clear button that appears once something is selected. Listbox appearance only.

```html
<aegov-select appearance="listbox" is-clearable name="emirate" placeholder="Select an emirate">…</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-select field-id="sel-clear" appearance="listbox" is-clearable name="emirate" placeholder="Select an emirate" value="DU">
      <aegov-select-option value="AZ">Abu Dhabi</aegov-select-option>
      <aegov-select-option value="DU">Dubai</aegov-select-option>
      <aegov-select-option value="SH">Sharjah</aegov-select-option>
    </aegov-select>
  </div>
</div>

The button is a real `<button>` with a translated `aria-label` ("Clear selection" / "مسح التحديد"), and it is hidden while the select is disabled.

Offer it on optional fields. On a required field, clearing puts the form back into an invalid state, which is rarely what the user wants — a placeholder option is usually better.

---

## Dropdown height

`visible-items` sets how many options are visible before the listbox scrolls. Default is `6`. The dropdown measures the available space and flips above the trigger when there is not enough room below.

```html
<aegov-select appearance="listbox" visible-items="3" placeholder="Three at a time">…</aegov-select>
<aegov-select appearance="listbox" visible-items="10" placeholder="Ten at a time">…</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-select field-id="sel-vis" appearance="listbox" visible-items="3" placeholder="Three visible at a time">
      <aegov-select-option value="1">Option one</aegov-select-option>
      <aegov-select-option value="2">Option two</aegov-select-option>
      <aegov-select-option value="3">Option three</aegov-select-option>
      <aegov-select-option value="4">Option four</aegov-select-option>
      <aegov-select-option value="5">Option five</aegov-select-option>
      <aegov-select-option value="6">Option six</aegov-select-option>
    </aegov-select>
  </div>
</div>

---

## States

```html
<aegov-select is-disabled placeholder="Disabled">…</aegov-select>
<aegov-select is-required placeholder="Required">…</aegov-select>
<aegov-select is-invalid error-message="Select your emirate of residence">…</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-4">
    <aegov-select field-id="sel-st-d" is-disabled placeholder="Disabled"><aegov-select-option value="a">A</aegov-select-option></aegov-select>
    <aegov-select field-id="sel-st-req" is-required placeholder="Required"><aegov-select-option value="a">A</aegov-select-option></aegov-select>
    <aegov-select field-id="sel-st-inv" is-invalid error-message="Select your emirate of residence" placeholder="Select an emirate"><aegov-select-option value="a">Abu Dhabi</aegov-select-option></aegov-select>
    <aegov-select field-id="sel-st-hint" hint="You can change this later in your profile" placeholder="With hint"><aegov-select-option value="a">A</aegov-select-option></aegov-select>
  </div>
</div>

---

## Variant

`variant` sets the colour family. As everywhere in the form family, the **focus ring stays camel** and the **error state stays aered**.

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-4">
    <aegov-select field-id="sel-v-1" variant="primary" value="a"><aegov-select-option value="a">Primary</aegov-select-option></aegov-select>
    <aegov-select field-id="sel-v-2" variant="secondary" value="a"><aegov-select-option value="a">Secondary</aegov-select-option></aegov-select>
    <aegov-select field-id="sel-v-3" variant="neutral-max" value="a"><aegov-select-option value="a">Neutral max</aegov-select-option></aegov-select>
  </div>
</div>

---

## Composite example — appointment booking

```html
<form id="booking" novalidate>
  <aegov-form-field>
    <aegov-label>Service</aegov-label>
    <aegov-select name="service" is-required placeholder="Select a service">
      <aegov-select-option-group label="Identity">
        <aegov-select-option value="eid-renew">Renew Emirates ID</aegov-select-option>
        <aegov-select-option value="eid-replace">Replace lost Emirates ID</aegov-select-option>
      </aegov-select-option-group>
      <aegov-select-option-group label="Residency">
        <aegov-select-option value="visa-renew">Renew residency visa</aegov-select-option>
      </aegov-select-option-group>
    </aegov-select>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Service centre</aegov-label>
    <aegov-select
      appearance="listbox"
      is-searchable
      name="centre"
      is-required
      placeholder="Search for a centre"
      hint="Choose the centre most convenient for you"
    >
      <aegov-select-option value="az-01">Abu Dhabi — Al Bahia</aegov-select-option>
      <aegov-select-option value="du-01">Dubai — Al Barsha</aegov-select-option>
      <aegov-select-option value="du-02">Dubai — Al Karama</aegov-select-option>
      <aegov-select-option value="sh-01">Sharjah — Al Majaz</aegov-select-option>
    </aegov-select>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Languages you are comfortable in</aegov-label>
    <aegov-select appearance="listbox" is-multiple is-clearable name="languages" placeholder="Select languages">
      <aegov-select-option value="ar">Arabic</aegov-select-option>
      <aegov-select-option value="en">English</aegov-select-option>
      <aegov-select-option value="ur">Urdu</aegov-select-option>
    </aegov-select>
  </aegov-form-field>

  <aegov-button type="submit" variant="primary" size="lg">Book appointment</aegov-button>
</form>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-form-field>
      <aegov-label>Service</aegov-label>
      <aegov-select field-id="sel-cx-1" name="service" is-required placeholder="Select a service">
        <aegov-select-option-group label="Identity">
          <aegov-select-option value="eid-renew">Renew Emirates ID</aegov-select-option>
          <aegov-select-option value="eid-replace">Replace lost Emirates ID</aegov-select-option>
        </aegov-select-option-group>
        <aegov-select-option-group label="Residency">
          <aegov-select-option value="visa-renew">Renew residency visa</aegov-select-option>
        </aegov-select-option-group>
      </aegov-select>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Service centre</aegov-label>
      <aegov-select field-id="sel-cx-2" appearance="listbox" is-searchable name="centre" is-required placeholder="Search for a centre" hint="Choose the centre most convenient for you">
        <aegov-select-option value="az-01">Abu Dhabi — Al Bahia</aegov-select-option>
        <aegov-select-option value="du-01">Dubai — Al Barsha</aegov-select-option>
        <aegov-select-option value="du-02">Dubai — Al Karama</aegov-select-option>
        <aegov-select-option value="sh-01">Sharjah — Al Majaz</aegov-select-option>
      </aegov-select>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Languages you are comfortable in</aegov-label>
      <aegov-select field-id="sel-cx-3" appearance="listbox" is-multiple is-clearable name="languages" placeholder="Select languages">
        <aegov-select-option value="ar">Arabic</aegov-select-option>
        <aegov-select-option value="en">English</aegov-select-option>
        <aegov-select-option value="ur">Urdu</aegov-select-option>
      </aegov-select>
    </aegov-form-field>
    <aegov-button type="submit" variant="primary" size="lg">Book appointment</aegov-button>
  </div>
</div>

---

## Listening for events

```html
<aegov-select id="service" appearance="listbox" name="service">…</aegov-select>

<script type="module">
  const select = document.querySelector('#service');

  select.addEventListener('aegovSelectChange', (e) => {
    console.log(e.detail.value);   // string, or string[] in multiple mode
    console.log(e.detail.label);   // string, or string[] in multiple mode
    loadDependentOptions(e.detail.value);
  });

  select.addEventListener('aegovSelectOpen', () => trackOpen());
  select.addEventListener('aegovSelectClose', () => trackClose());
</script>
```

`aegovSelectOpen` and `aegovSelectClose` fire for the listbox appearance only — the native control's picker is owned by the OS and reports nothing.

### Dependent selects

Repopulating a second select from the first is the most common pattern here. Clear the dependent value when the parent changes, or you can be left with a value that no longer exists in the list.

```js
emirate.addEventListener('aegovSelectChange', async (e) => {
  centre.value = '';                                    // clear stale selection
  centre.replaceChildren(...await optionsFor(e.detail.value));
});
```

---

## RTL Support

Both appearances are direction-aware. In a `dir="rtl"` container text aligns right, the native select's arrow and the listbox's chevron move to the inline-start edge, the clear button and option checkmarks swap sides, and the dropdown aligns to the trigger's inline-start edge.

The built-in strings are translated automatically: the search field's label and placeholder become "البحث في الخيارات" and "بحث...", the empty state becomes "لم يتم العثور على نتائج", and the clear button's label becomes "مسح التحديد".

```html
<div dir="rtl">
  <aegov-form-field>
    <aegov-label>إمارة الإقامة</aegov-label>
    <aegov-select appearance="listbox" is-searchable name="emirate" is-required placeholder="اختر الإمارة">
      <aegov-select-option value="AZ">أبوظبي</aegov-select-option>
      <aegov-select-option value="DU">دبي</aegov-select-option>
      <aegov-select-option value="SH">الشارقة</aegov-select-option>
    </aegov-select>
  </aegov-form-field>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-form-field>
      <aegov-label>إمارة الإقامة</aegov-label>
      <aegov-select field-id="sel-rtl-1" appearance="listbox" is-searchable name="emirate" is-required placeholder="اختر الإمارة">
        <aegov-select-option value="AZ">أبوظبي</aegov-select-option>
        <aegov-select-option value="DU">دبي</aegov-select-option>
        <aegov-select-option value="SH">الشارقة</aegov-select-option>
        <aegov-select-option value="AJ">عجمان</aegov-select-option>
        <aegov-select-option value="RK">رأس الخيمة</aegov-select-option>
      </aegov-select>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>الخدمة</aegov-label>
      <aegov-select field-id="sel-rtl-2" name="service" placeholder="اختر الخدمة">
        <aegov-select-option-group label="الهوية">
          <aegov-select-option value="eid-renew">تجديد الهوية الإماراتية</aegov-select-option>
        </aegov-select-option-group>
        <aegov-select-option-group label="الإقامة">
          <aegov-select-option value="visa-renew">تجديد تأشيرة الإقامة</aegov-select-option>
        </aegov-select-option-group>
      </aegov-select>
    </aegov-form-field>
    <aegov-select field-id="sel-rtl-3" appearance="listbox" is-multiple is-clearable placeholder="اختر اللغات">
      <aegov-select-option value="ar">العربية</aegov-select-option>
      <aegov-select-option value="en">الإنجليزية</aegov-select-option>
    </aegov-select>
  </div>
</div>

One thing you must handle: **the multiple-selection count on the trigger renders as "N selected" in English regardless of direction.** If you support Arabic, either avoid `is-multiple` in favour of a [checkbox group](aegov-checkbox.html), or overlay your own localised summary next to the field.

---

## API Reference

### aegov-select Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the inner control. Auto-generated when omitted, reflected to the host. | `string` | _generated_ |
| `appearance` | `appearance` | Rendering mode. `is-multiple` forces `listbox`. | `'default' \| 'listbox'` | `'default'` |
| `size` | `size` | Size token or responsive string. | `string` — `xs \| sm \| base \| lg \| xl` | `'base'` |
| `variant` | `variant` | Colour family. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `value` | `value` | Selected value. **Comma-separated string** in multiple mode. Mutable. | `string` | `''` |
| `name` | `name` | Form field name. | `string` | — |
| `placeholder` | `placeholder` | Text shown when nothing is selected. In the native appearance this becomes a disabled first `<option>`. | `string` | — |
| `isMultiple` | `is-multiple` | Allow several values. Forces the listbox rendering. | `boolean` | `false` |
| `isSearchable` | `is-searchable` | Adds a filter input in the dropdown. Listbox only. | `boolean` | `false` |
| `isClearable` | `is-clearable` | Adds a clear button once something is selected. Listbox only. | `boolean` | `false` |
| `visibleItems` | `visible-items` | Options visible before the dropdown scrolls. Listbox only. | `number` | `6` |
| `emptyMessage` | `empty-message` | Text shown when a search matches nothing. Defaults to a translated "No results found". | `string` | `''` |
| `isDisabled` | `is-disabled` | Disables the control. | `boolean` | `false` |
| `isRequired` | `is-required` | Marks the field required. | `boolean` | `false` |
| `isInvalid` | `is-invalid` | Invalid state. Reflected to the host. | `boolean` | `false` |
| `errorMessage` | `error-message` | Error text shown while invalid. | `string` | `''` |
| `hint` | `hint` | Helper text shown when no error is showing. | `string` | `''` |
| `extraClass` | `extra-class` | Extra classes on the inner control. | `string` | — |

### aegov-select-option Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `value` | `value` | The option's value. Must not contain a comma when `is-multiple` is used. | `string` | `''` |
| `isDisabled` | `is-disabled` | Unselectable but still visible. Skipped by keyboard navigation and typeahead. | `boolean` | `false` |

The option's label is its slotted text content, captured on load. Must be a descendant of `aegov-select` — it throws otherwise.

### aegov-select-option-group Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `label` | `label` | Group heading. Renders as `<optgroup label>` in the native appearance and as a labelled group in the listbox. | `string` | `''` |

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | `aegov-select-option` and `aegov-select-option-group` children. |
| `hint` | Rich hint markup. Takes precedence over the `hint` property. |
| `error` | Rich error markup. Takes precedence over `error-message`. Rendered only while `is-invalid`. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovSelectChange` | `SelectChangeDetail` — `{ value: string \| string[]; label: string \| string[] }` | Selection changed. Arrays in multiple mode. |
| `aegovSelectOpen` | `void` | Dropdown opened. **Listbox appearance only.** |
| `aegovSelectClose` | `void` | Dropdown closed. **Listbox appearance only.** |
| `aegovValidate` | `AegovValidationDetail<AegovSelectValue>` | Unified validation event — see [Validation Surface](validation-overview.html). |

### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `validate(trigger?)` | `Promise<AegovValidationResult>` | Re-runs validation and emits `aegovValidate`. |
| `setCustomValidity(message)` | `Promise<void>` | Sets `error-message` and `is-invalid`. In listbox mode it also writes the validity through `ElementInternals` so native form validity agrees. Empty string clears. |

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `autofocus`, `form` | Yes | Forwarded to the inner control. |
| `aria-*` | Yes | Forwarded — **except** `aria-invalid` and `aria-describedby`. |
| `data-*` | Yes | Forwarded to the inner control. |
| `aria-invalid` | **No** | Owned by the component, driven by `is-invalid`. |
| `aria-describedby` | Composed | Your value is preserved; the hint and error region IDs are appended. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host. Use `extra-class` to reach the inner control. |

Note the pass-through set is deliberately small here — most native `<select>` attributes have no meaning for the listbox rendering, so they are exposed as properties instead.

### CSS classes

| Class | Element |
| --- | --- |
| `.aegov-select` | The inner native `<select>`, or the listbox trigger. |
| `.select--xs` … `.select--xl` | Size modifier. |
| `.select-variant-*` | Variant modifier. |
| `.select--open`, `.select--disabled`, `.select--placeholder` | State modifiers. |
| `.select__listbox` | The dropdown panel. |
| `.select__listbox--above`, `.select__listbox--below` | Which way the dropdown opened. |
| `.select__option`, `.select__option--selected`, `.select__option--focused` | Option states in the listbox. |
| `.select__clear`, `.select__empty` | The clear button and the empty-results message. |
| `.is-invalid` | Added to the **host** while `is-invalid`. |

---

## Validation

### Surface

`aegov-select` implements the shared contract: `is-invalid`, `error-message`, `hint`, the `error` and `hint` slots, `aegovValidate`, and `validate()` / `setCustomValidity()`. Full reference: [Validation Surface](validation-overview.html).

How it participates in the form depends on the appearance:

- **`default`** — the inner native `<select name>` carries the value, and `validity` in the event is the browser's real `ValidityState`.
- **`listbox`** — the component is a **form-associated custom element** using `ElementInternals.setFormValue()`, and `validity` is synthesized to the same shape. In multiple mode it appends one `FormData` entry per value.

Either way `form.checkValidity()`, `reportValidity()` and `FormData` behave as they would with a native control. The listbox path is why Safari 16.4 is the support floor.

### Common recipes

Required-selection rule:

```js
const select = document.querySelector('#emirate');

select.addEventListener('aegovValidate', (e) => {
  if (e.detail.trigger === 'input') return;
  const empty = !e.detail.value || e.detail.value.length === 0;
  select.isInvalid = empty;
  select.errorMessage = empty ? 'Select your emirate of residence' : '';
});
```

A minimum number of selections in multiple mode:

```js
languages.addEventListener('aegovValidate', (e) => {
  const count = Array.isArray(e.detail.value)
    ? e.detail.value.length
    : String(e.detail.value || '').split(',').filter(Boolean).length;

  const ok = count >= 1;
  languages.isInvalid = !ok;
  languages.errorMessage = ok ? '' : 'Select at least one language';
});
```

More patterns in [Bring Your Own Validator](validation-byo.html).

### Use with `@aegov/designsystem-validation`

The optional companion package drives this surface from a schema. **Not required.**

```ts
import { createForm } from '@aegov/designsystem-validation';
import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';
import * as v from 'valibot';

createForm(form, v.object({
  emirate: v.pipe(v.string(), v.nonEmpty('Select your emirate of residence')),
}), valibotAdapter());
```

---

## Accessibility

### Built-in behaviour

**Native appearance**

- A real `<select>`, so the combobox role, keyboard behaviour, the mobile OS picker and form participation all come from the platform.
- Groups render as real `<optgroup>` elements, and disabled options as `disabled` options.

**Listbox appearance**

- The trigger has `role="combobox"` with `aria-expanded`, `aria-haspopup="listbox"`, `aria-controls` pointing at the dropdown, and `aria-activedescendant` tracking the focused option — so the currently highlighted option is announced without moving DOM focus.
- `aria-required` and `aria-invalid` are set from the corresponding properties.
- Options carry `role="option"`, groups carry `role="group"` with an accessible name from `label`, and disabled options carry `aria-disabled`.
- The empty-results message is a `role="status"` region, so a search that matches nothing is announced.
- The clear button is a real `<button>` with a translated `aria-label`.
- The dropdown flips above the trigger when space below is insufficient, so options are not clipped off-screen.
- Clicking outside closes the dropdown, and `Tab` closes it rather than trapping focus.

**Both**

- `aria-describedby` is composed, preserving any value you set and appending the hint and error region IDs.
- The error region takes `role="alert"` only after the field's first blur.
- The focus ring is a high-contrast camel outline held constant across variants, meeting the 3:1 non-text contrast requirement of WCAG 2.2 SC 1.4.11.

### Developer responsibilities

- **Always provide a visible label** via [`aegov-label`](aegov-label.html) inside [`aegov-form-field`](aegov-form-field.html). A placeholder is not a label.
- **Prefer the native appearance** unless you need search, multiple selection or a clear button. It is more accessible on more devices, particularly on mobile.
- **Do not use commas in option values** when `is-multiple` is set — the value is comma-delimited.
- **Provide your own localised count for multiple selection.** The trigger's "N selected" text is English-only.
- **Add search once the list is long.** Roughly ten options is the point at which scanning becomes work; beyond about fifty, consider a search-driven pattern instead of a select.
- **Label option groups meaningfully.** `label` is exposed as the group's accessible name.
- **Clear a dependent select's value** when its parent changes, so no stale value survives.
- **Never signal an error with colour alone** (WCAG 2.2 SC 1.4.1) — populate `error-message` or the `error` slot.
- **Reach for a [checkbox group](aegov-checkbox.html)** when there are only a handful of multi-select options and they all fit on screen. It needs no dropdown, no count string, and no arrow-key model.

### Keyboard support

**Native appearance** — standard platform `<select>` behaviour.

**Listbox appearance**

| Key | Action |
| --- | --- |
| `Enter`, `Space` | Open the dropdown when closed. Select the focused option when open. |
| `ArrowDown` | Open the dropdown, or move focus to the next enabled option. |
| `ArrowUp` | Open the dropdown, or move focus to the previous enabled option. |
| `Alt` + `ArrowUp` | Close the dropdown. |
| `Home` | Move focus to the first option. |
| `End` | Move focus to the last option. |
| `Escape` | Close the dropdown without changing the selection. |
| `Tab` | Close the dropdown and move focus onward. |
| Printable characters | Typeahead — jumps to the next option whose label starts with what you typed. Buffer clears after 500ms. When `is-searchable` is on, typing goes to the search field instead. |

Disabled options are skipped by both arrow navigation and typeahead.

---

## Where to next

- [Checkbox](aegov-checkbox.html) — often a better multi-select than a listbox.
- [Radio](aegov-radio.html) — for a small single choice that should always be visible.
- [Input](aegov-input.html) and [Form Field](aegov-form-field.html) — the rest of a form field.
- [Dropdown](aegov-dropdown.html) — for menus of actions, not form values.
- [Validation Surface](validation-overview.html) and [Bring Your Own Validator](validation-byo.html).
