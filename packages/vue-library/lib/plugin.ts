import { Plugin } from 'vue';
import { defineCustomElements } from '@aegov/designsystem-testing/loader';

export const ComponentLibrary: Plugin = {
  async install() {
    defineCustomElements();
  },
};