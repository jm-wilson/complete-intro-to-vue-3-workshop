<script setup lang="ts">
import { JSONPlaceholderUser } from "../types";

interface Props {
  as: "div" | "li";
  user: JSONPlaceholderUser;
}

const { as = "li", user } = defineProps<Props>();
</script>

<style>
.user-card {
  background-color: goldenrod;
  padding: 0.5em;
  border-radius: 10px;
  display: grid;
  gap: 0.5em;

  .name {
    font-weight: 700;
  }
}
</style>

<template>
  <component :is="as" class="user-card">
    <p class="name">{{ user.name }}</p>
    <p>
      <a :href="`mailto:${user.email}`">{{ user.email }}</a>
    </p>
    <p>
      <a :href="`tel:${user.phone}`">{{ user.phone }}</a>
    </p>
  </component>
</template>
