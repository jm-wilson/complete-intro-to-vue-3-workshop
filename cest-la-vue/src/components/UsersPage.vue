<script setup lang="ts">
import { useUserStore } from "../composables/useUserStore";
import UserCard from "./UserCard.vue";

const { users, errorGettingUsers } = await useUserStore();
</script>

<style>
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

<template>
  <div>
    <div class="fullscreen-message" v-if="errorGettingUsers">Error getting users</div>
    <div v-else>
      <h1>Users:</h1>
      <ul class="user-grid">
        <UserCard v-for="user in users" :key="user.id" :user="user" as="li" />
      </ul>
    </div>
  </div>
</template>
