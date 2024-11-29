<script setup lang="ts">
import { useUserStore } from "@/stores/useUserStore";
import UserCard from "./UserCard.vue";

// This doesn't to be reactive, because it:
// 1. has to have loaded by the time this component renders, and
// 2. won't be updated after the initial load
const { users } = useUserStore();
</script>

<template>
  <h1>Users:</h1>
  <ul class="user-grid">
    <UserCard v-for="user in users" :key="user.id" :user="user" as="li" />
  </ul>
</template>

<style scoped>
.user-grid {
  display: grid;
  margin: 50px auto;
  max-width: 1200px;
  gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  li {
    list-style: none;
  }
}
</style>
