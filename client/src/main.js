import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
import maska from "maska";

loadFonts();

const app = createApp(App);
app.use(router).use(vuetify).use(maska).mount("#app");

app.config.globalProperties.$baseURL = "http://localhost:3000/api";
