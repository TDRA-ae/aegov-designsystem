import { createApp } from 'vue';
import './styles.css';
import App from './App.vue';
import { ComponentLibrary } from '@aegov/designsystem-vue';

createApp(App)
  .use(ComponentLibrary)
  .mount('#app');
