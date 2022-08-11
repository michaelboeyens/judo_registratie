import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Inschrijving Koninklijke Judoclub Bazel",
      htmlAttrs: { lang: "nl" },
    },
  },
  css: ["normalize.css", "@formkit/themes/genesis", "~/assets/scss/main.scss"],
  modules: ["@formkit/nuxt"],
  nitro: { preset: "netlify" },
  runtimeConfig: {
    emailServername: "",
    emailPassword: "",
    emailHost: "",
    emailRecipient: "",
    emailSender: "",
  },
  telemetry: false,
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true,
  },
});
