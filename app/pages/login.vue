<script setup lang="ts">
import { z } from "zod/v4";
import type { FormSubmitEvent } from "@nuxt/ui";

const state = ref({
  email: "",
  password: "",
});
const toast = useToast()

const schema = z.object({
  email: z.email("Invalid email adress"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type Schema = z.output<typeof schema>;
async function onLogin(event: FormSubmitEvent<Schema>) {
  try {
      const response = await $fetch('/api/auth/login',{
        method:'POST',
        body:{
          email:event.data.email,
          password:event.data.password
        }
      })

      if(!response.success){
        throw new Error('Login failed')  
      }
      console.log(1)
      await navigateTo("/")


  } catch (error) {
    toast.add({
      color:'error',
      title:'Failed to login',
      description:'Please check your email and password and try again'
    })
  }



}
</script>

<template>
  <UContainer class="h-screen flex justify-center items-center">
    <UForm @submit="onLogin" :schema :state class="w-1/4 space-y-5">
      <UFormField name="email" label="Email">
        <UInput
          type="email"
          v-model="state.email"
          placeholder="Enter your email"
          class="w-full"
        ></UInput>
      </UFormField>
      <UFormField name="password" label="Password">
        <UInput
          type="password"
          v-model="state.password"
          placeholder="Enter your password"
          class="w-full"
        ></UInput>
      </UFormField>
      <UButton type="submit" label="Login"> </UButton>
    </UForm>
  </UContainer>
</template>

<style scoped></style>
