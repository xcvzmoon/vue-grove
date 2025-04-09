import '@/assets/css/tailwind.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { PiniaColada } from '@pinia/colada';

import App from '@/App.vue';
import router from '@/router';
import ui from '@nuxt/ui/vue-plugin';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(PiniaColada, {});
app.use(ui);

app.mount('#app');
