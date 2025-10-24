<script setup>
definePageMeta({
  middleware: ['auth']
})

const user = useUserSession()

</script>

<template>
  <h1> Olá {{ user.user.value.name }}</h1>
</template>

<style scoped>

</style>