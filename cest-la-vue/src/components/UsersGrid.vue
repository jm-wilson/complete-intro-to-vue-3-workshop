<script setup lang="ts">
import type { UsersPageComponentProps } from "@/types";
import UserCard from "./UserCard.vue";

const { users } = defineProps<UsersPageComponentProps>();
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
