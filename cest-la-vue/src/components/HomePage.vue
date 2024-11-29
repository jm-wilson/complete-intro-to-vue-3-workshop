<script setup></script>

<template>
  <main>
    <h1>Welcome to <br />C'est La Vue</h1>
    <p>
      This is a place to manage various things: todos, users, posts, etc. Whatever your mind
      desires!
    </p>
    <button>Don't click me</button>
  </main>
</template>

<style scoped>
/* scoped styles work well with generic selectors like elements, which would otherwise be very leaky */
button {
  background-color: lightcyan;
  padding: 5px;
  margin-block: 15px;
}
</style>
