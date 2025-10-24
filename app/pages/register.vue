<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

//tutu@gmail.com

const state = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
});
const loading = ref(false);
const toast = useToast();


const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email adress"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordConfirm"],
        message: "Passwords do not match",
      });
    }
  });

type Schema = z.output<typeof schema>;
async function onRegister(event: FormSubmitEvent<Schema>) {
  try {
    const response = await $fetch("/api/auth/register", {
      method: "POST",
      body: {
        name: event.data.name,
        email: event.data.email,
        password: event.data.password,
      },
    });
    if (!response.success) {
      throw new Error("Registeration failed");
    }
      await navigateTo('/')




  } catch (error) {
    toast.add({
      color: "error",
      title: "Failed to create account",
      description: "Please check your details and try again",
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <UContainer class="h-screen flex justify-center items-center">
    <UForm @submit="onRegister" :schema :state class="w-1/4 space-y-5">
      <UFormField name="name" label="Name">
        <UInput
          type="text"
          v-model="state.name"
          placeholder="Enter your name"
          class="w-full"
        ></UInput>
      </UFormField>
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
      <UFormField name="passwordConfirm" label="Confirmação de Senha">
        <UInput
          type="password"
          v-model="state.passwordConfirm"
          placeholder="Confirme sua senha"
          class="w-full"
        ></UInput>
      </UFormField>
      <UButton :loading type="submit" label="Register"> </UButton>
    </UForm>
  </UContainer>
</template>

<style scoped></style>
