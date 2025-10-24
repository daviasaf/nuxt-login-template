<script setup>

const session = useUserSession()
async function logout() {
  await session.clear()
  await navigateTo('/login')
}


definePageMeta({
  middleware:['auth']
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UHeader title="Login">
        <AuthState>
          <template #default="{loggedIn}">
          <button v-if="loggedIn" @click="logout">Logout</button>
            <NuxtLink v-else to="/login">Login</NuxtLink>
          </template>
        </AuthState>
      </UHeader>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style scoped></style>
