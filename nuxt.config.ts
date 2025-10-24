// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["nuxt-auth-utils", "@nuxt/ui"],
  css: ["~/assets/style/main.css"],
  runtimeConfig: {
    session: {
      password: "",
      name: "nuxt-session",
      cookie: {
        maxAge: 60 * 24 * 7, // 7 days
      },
    },
  },
});
