<script setup lang="ts">
import { useUserStore } from "@/composables/useUserStore";
import UserCard from "@/components/UserCard.vue";
import Loading from "@/components/Loading.vue";

const { users, loadingUsers, errorGettingUsers } = useUserStore();
</script>

<style module>
/* module styles work well to prevent generic classnames from leaking,
   but are a little bit tedious to use in the template */
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
    <Loading v-else-if="loadingUsers" />
    <div v-else>
      <h1>Users:</h1>
      <ul :class="$style['user-grid']">
        <UserCard v-for="user in users" :key="user.id" :user="user" as="li" />
      </ul>
    </div>
  </div>
</template>
