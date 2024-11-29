<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const { user } = route.params;
</script>

<template>
  <main>
    <h1>Dashboard</h1>
    <p>
      You logged in as <span class="user">{{ user }}</span>
    </p>
  </main>
</template>

<style scoped>
.user {
  color: darkblue;
  font-style: italic;
}
</style>
