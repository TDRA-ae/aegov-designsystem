import { createApp } from 'vue';
import './styles.css';
import App from './App.vue';
import { ComponentLibrary } from '@aegov/design-system-vue';

createApp(App)
  .use(ComponentLibrary)
  .mount('#app');
