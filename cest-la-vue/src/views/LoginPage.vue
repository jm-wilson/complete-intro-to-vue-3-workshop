<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function onLogin(event: SubmitEvent) {
  if (!(event.target instanceof HTMLFormElement)) {
    throw new Error("Something hit onLogin that shouldn't have");
  }

  // Let's pretend this is real auth
  const data = new FormData(event.target);
  const email = data.get("email");
  const username = email.slice(0, email.toString().indexOf("@"));

  router.push({ path: `/dashboard/${username}` });
}
</script>

<template>
  <main>
    <h1>Login</h1>
    <form @submit.prevent="onLogin">
      <label for="email">Email: <input required type="email" name="email" /></label>
      <button>Continue with email</button>
    </form>
  </main>
</template>

<style scoped>
/* scoped styles work well with generic selectors like elements, which would otherwise be very leaky */
label {
  margin-bottom: 5px;
}

input[type="email"] {
  padding: 0.5rem;
  margin-bottom: 30px;
}

button {
  padding: 10px;

  :has(:user-valid) & {
    border: 1px solid green;
    background-color: rgb(213, 255, 213);
    color: green;
    cursor: pointer;
  }

  :has(:user-invalid) & {
    border: 1px solid red;
    background-color: rgb(255, 213, 213);
    color: red;
  }
}
</style>
