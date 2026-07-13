import { Plugin } from 'vue';
import { defineCustomElements } from '@aegov/designsystem/loader';

export const ComponentLibrary: Plugin = {
  async install() {
    defineCustomElements();
  },
};