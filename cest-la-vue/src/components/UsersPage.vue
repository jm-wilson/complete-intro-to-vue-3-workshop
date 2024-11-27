<script setup lang="ts">
import { reactive, ref } from "vue";
import { JSONPlaceholderUser } from "../types";
import UserCard from "./UserCard.vue";

let users = reactive<JSONPlaceholderUser[]>([]);
let errorGettingUsers = ref<boolean>(false);

if (!errorGettingUsers.value) {
  try {
    // Artificial slowdown to see loading states
    console.log("Waiting 500ms to show loading state...");
    await new Promise((res) => setTimeout(res, 500));
    console.log("Finished waiting 500ms");

    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response?.ok) {
      throw Error("Error fetching users");
    }

    users = await response.json();
  } catch {
    errorGettingUsers.value = true;
  }
}
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
