import { Component, signal, inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DesignSystemModule } from '@aegov/designsystem-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DesignSystemModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  readonly #doc = inject(DOCUMENT);

  isLoading = signal(false);
  isDark = signal(false);
  isRtl = signal(false);

  readonly badgeColors = [
    'default','primary','secondary','aegreen','aegold','aered','aeblack',
    'techblue','seablue','camel','desert','fuchsia','slate','purple','pink','indigo','lime',
  ] as const;

  readonly buttonVariants = ['primary','secondary','danger','neutral-min','neutral-max'] as const;
  readonly buttonSizes = ['xs','sm','base','lg','xl'] as const;

  readonly colorPalettes: { name: string; split: number; shades: string[]; bg: Record<string, string> }[] = [
    { name: 'aeblack', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
      bg: {'50':'bg-aeblack-50','100':'bg-aeblack-100','200':'bg-aeblack-200','300':'bg-aeblack-300','400':'bg-aeblack-400','500':'bg-aeblack-500','600':'bg-aeblack-600','700':'bg-aeblack-700','800':'bg-aeblack-800','900':'bg-aeblack-900','950':'bg-aeblack-950'} },
    { name: 'aegold', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
      bg: {'50':'bg-aegold-50','100':'bg-aegold-100','200':'bg-aegold-200','300':'bg-aegold-300','400':'bg-aegold-400','500':'bg-aegold-500','600':'bg-aegold-600','700':'bg-aegold-700','800':'bg-aegold-800','900':'bg-aegold-900','950':'bg-aegold-950'} },
    { name: 'aegreen', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
      bg: {'50':'bg-aegreen-50','100':'bg-aegreen-100','200':'bg-aegreen-200','300':'bg-aegreen-300','400':'bg-aegreen-400','500':'bg-aegreen-500','600':'bg-aegreen-600','700':'bg-aegreen-700','800':'bg-aegreen-800','900':'bg-aegreen-900','950':'bg-aegreen-950'} },
    { name: 'aered', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
      bg: {'50':'bg-aered-50','100':'bg-aered-100','200':'bg-aered-200','300':'bg-aered-300','400':'bg-aered-400','500':'bg-aered-500','600':'bg-aered-600','700':'bg-aered-700','800':'bg-aered-800','900':'bg-aered-900','950':'bg-aered-950'} },
    { name: 'primary', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
      bg: {'50':'bg-primary-50','100':'bg-primary-100','200':'bg-primary-200','300':'bg-primary-300','400':'bg-primary-400','500':'bg-primary-500','600':'bg-primary-600','700':'bg-primary-700','800':'bg-primary-800','900':'bg-primary-900','950':'bg-primary-950'} },
    { name: 'primary-support', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
      bg: {'50':'bg-primary-support-50','100':'bg-primary-support-100','200':'bg-primary-support-200','300':'bg-primary-support-300','400':'bg-primary-support-400','500':'bg-primary-support-500','600':'bg-primary-support-600','700':'bg-primary-support-700','800':'bg-primary-support-800','900':'bg-primary-support-900','950':'bg-primary-support-950'} },
    { name: 'secondary', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
      bg: {'50':'bg-secondary-50','100':'bg-secondary-100','200':'bg-secondary-200','300':'bg-secondary-300','400':'bg-secondary-400','500':'bg-secondary-500','600':'bg-secondary-600','700':'bg-secondary-700','800':'bg-secondary-800','900':'bg-secondary-900','950':'bg-secondary-950'} },
    { name: 'secondary-support', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
      bg: {'50':'bg-secondary-support-50','100':'bg-secondary-support-100','200':'bg-secondary-support-200','300':'bg-secondary-support-300','400':'bg-secondary-support-400','500':'bg-secondary-support-500','600':'bg-secondary-support-600','700':'bg-secondary-support-700','800':'bg-secondary-support-800','900':'bg-secondary-support-900','950':'bg-secondary-support-950'} },
    { name: 'techblue', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
      bg: {'50':'bg-techblue-50','100':'bg-techblue-100','200':'bg-techblue-200','300':'bg-techblue-300','400':'bg-techblue-400','500':'bg-techblue-500','600':'bg-techblue-600','700':'bg-techblue-700','800':'bg-techblue-800','900':'bg-techblue-900','950':'bg-techblue-950'} },
    { name: 'seablue', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
      bg: {'50':'bg-seablue-50','100':'bg-seablue-100','200':'bg-seablue-200','300':'bg-seablue-300','400':'bg-seablue-400','500':'bg-seablue-500','600':'bg-seablue-600','700':'bg-seablue-700','800':'bg-seablue-800','900':'bg-seablue-900','950':'bg-seablue-950'} },
    { name: 'camel', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
      bg: {'50':'bg-camel-50','100':'bg-camel-100','200':'bg-camel-200','300':'bg-camel-300','400':'bg-camel-400','500':'bg-camel-500','600':'bg-camel-600','700':'bg-camel-700','800':'bg-camel-800','900':'bg-camel-900','950':'bg-camel-950'} },
    { name: 'desert', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
      bg: {'50':'bg-desert-50','100':'bg-desert-100','200':'bg-desert-200','300':'bg-desert-300','400':'bg-desert-400','500':'bg-desert-500','600':'bg-desert-600','700':'bg-desert-700','800':'bg-desert-800','900':'bg-desert-900','950':'bg-desert-950'} },
    { name: 'fuchsia', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
      bg: {'50':'bg-fuchsia-50','100':'bg-fuchsia-100','200':'bg-fuchsia-200','300':'bg-fuchsia-300','400':'bg-fuchsia-400','500':'bg-fuchsia-500','600':'bg-fuchsia-600','700':'bg-fuchsia-700','800':'bg-fuchsia-800','900':'bg-fuchsia-900','950':'bg-fuchsia-950'} },
    { name: 'purple', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
      bg: {'50':'bg-purple-50','100':'bg-purple-100','200':'bg-purple-200','300':'bg-purple-300','400':'bg-purple-400','500':'bg-purple-500','600':'bg-purple-600','700':'bg-purple-700','800':'bg-purple-800','900':'bg-purple-900','950':'bg-purple-950'} },
    { name: 'pink', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
      bg: {'50':'bg-pink-50','100':'bg-pink-100','200':'bg-pink-200','300':'bg-pink-300','400':'bg-pink-400','500':'bg-pink-500','600':'bg-pink-600','700':'bg-pink-700','800':'bg-pink-800','900':'bg-pink-900','950':'bg-pink-950'} },
    { name: 'indigo', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
      bg: {'50':'bg-indigo-50','100':'bg-indigo-100','200':'bg-indigo-200','300':'bg-indigo-300','400':'bg-indigo-400','500':'bg-indigo-500','600':'bg-indigo-600','700':'bg-indigo-700','800':'bg-indigo-800','900':'bg-indigo-900','950':'bg-indigo-950'} },
    { name: 'slate', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
      bg: {'50':'bg-slate-50','100':'bg-slate-100','200':'bg-slate-200','300':'bg-slate-300','400':'bg-slate-400','500':'bg-slate-500','600':'bg-slate-600','700':'bg-slate-700','800':'bg-slate-800','900':'bg-slate-900','950':'bg-slate-950'} },
    { name: 'whitely', split: 5, shades: ['50','100','200','300','400','500'],
      bg: {'50':'bg-whitely-50','100':'bg-whitely-100','200':'bg-whitely-200','300':'bg-whitely-300','400':'bg-whitely-400','500':'bg-whitely-500'} },
  ];

  onDarkToggle(e: CustomEvent<{ checked: boolean }>) {
    this.isDark.set(e.detail.checked);
    this.#doc.documentElement.classList.toggle('dark', e.detail.checked);
  }

  onRtlToggle(e: CustomEvent<{ checked: boolean }>) {
    this.isRtl.set(e.detail.checked);
    this.#doc.documentElement.dir = e.detail.checked ? 'rtl' : 'ltr';
    this.#doc.documentElement.lang = e.detail.checked ? 'ar' : 'en';
  }

  async handleButtonClick() {
    this.isLoading.set(true);
    await new Promise((r) => setTimeout(r, 2000));
    this.isLoading.set(false);
  }

  ngAfterViewInit() {
    const sections = this.#doc.querySelectorAll('section[id]');
    const navLinks = this.#doc.querySelectorAll<HTMLAnchorElement>('.nav-link');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
          }
        });
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
  }
}
