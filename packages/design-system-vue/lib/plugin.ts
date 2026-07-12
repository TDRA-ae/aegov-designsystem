import { Plugin } from 'vue';
import { defineCustomElements } from '@aegov/design-system/loader';

export const ComponentLibrary: Plugin = {
  async install() {
    defineCustomElements();
  },
};