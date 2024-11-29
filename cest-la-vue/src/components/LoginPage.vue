<script setup></script>

<template>
  <main>
    <h1>Login</h1>
    <label for="email">Email</label>
    <input type="email" />
    <button>Continue with email</button>
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
  border: 1px solid green;
  padding: 10px;
  color: green;
  background-color: rgb(213, 255, 213);
  cursor: pointer;
}
</style>
