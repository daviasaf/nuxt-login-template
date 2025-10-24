<script setup>
const session = useUserSession();
async function logout() {
  await session.clear();
  await navigateTo("/login");
}

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UHeader title="Nuxt-Login">
        <template #right>
          <AuthState>
            <template #default="{ loggedIn }">
              <button v-if="loggedIn" @click="logout" class="cursor-pointer">
                Logout
              </button>
              <NuxtLink v-else to="/login" class="cursor-pointer"
                >Login</NuxtLink
              >
            </template>
          </AuthState>
        </template>
      </UHeader>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style scoped></style>
