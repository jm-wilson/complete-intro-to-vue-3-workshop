<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";
import { JSONPlaceholderUser } from "../types";

export default defineComponent({
  props: {
    as: {
      type: String as PropType<"div" | "li">,
      default: "div",
    },
    user: {
      type: Object as PropType<JSONPlaceholderUser>,
      required: true,
    },
  },
});
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
