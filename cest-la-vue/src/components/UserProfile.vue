<script setup lang="ts">
import type { UsersPageComponentProps } from "@/types";
import { useRoute } from "vue-router";

const route = useRoute();
const idParam = route.params.id;
const currentId = parseInt(Array.isArray(idParam) ? idParam[0] : idParam);

const { users } = defineProps<UsersPageComponentProps>();
const user = users.find((user) => user.id === currentId);
</script>

<template>
  <div class="wrapper">
    <div class="flex">
      <RouterLink class="all-users-link" to="/users">Return to all users</RouterLink>
      <h1 v-if="user">{{ user.name }}</h1>
      <h1 v-else>Error</h1>
    </div>
    <div class="card">
      <dl v-if="user">
        <div class="flex" v-for="(value, key) in user" :key="`${user.id}-${key}`">
          <dt>{{ key }}</dt>
          <dd>{{ value }}</dd>
        </div>
      </dl>
      <div v-else>Error getting user data</div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 1200px;
  margin-inline: auto;
}

.all-users-link {
  display: inline-block;
  padding: 1em 0.5em;
  margin-block: 0.5em;
  border-radius: 0.5em;
  background-color: mediumseagreen;
  font-weight: bold;
}

.card {
  background-color: mediumaquamarine;
  padding: 0.5em;
  border-radius: 10px;
  display: grid;
  gap: 0.5em;
}

.flex {
  display: flex;
  align-items: center;
  gap: 1em;
}

dt {
  font-weight: bold;
  &::after {
    content: ":";
  }
}
</style>
