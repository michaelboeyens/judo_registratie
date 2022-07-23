import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["normalize.css", "@formkit/themes/genesis", "~/assets/scss/main.scss"],
  modules: ["@formkit/nuxt"],
  typescript: {
    shim: false,
  },
});
