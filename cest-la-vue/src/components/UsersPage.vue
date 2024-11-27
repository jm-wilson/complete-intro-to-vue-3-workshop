<script lang="ts">
import { defineComponent } from "vue";
import { JSONPlaceholderUser } from "../types";
import UserCard from "./UserCard.vue";

export default defineComponent({
  components: { UserCard },
  data() {
    return {
      users: [] as JSONPlaceholderUser[],
      errorGettingUsers: false,
    };
  },
  methods: {
    async loadUsers() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response?.ok) {
          throw Error("Error fetching users");
        }

        this.users = await response.json();
      } catch {
        this.errorGettingUsers = true;
      }
    },
  },
  created() {
    this.loadUsers();
  },
});
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
    <div class="fullscreen-message" v-else-if="users.length === 0">Loading users...</div>
    <div v-else>
      <h1>Users:</h1>
      <ul class="user-grid">
        <UserCard v-for="user in users" :key="user.id" :user="user" as="li" />
      </ul>
    </div>
  </div>
</template>
