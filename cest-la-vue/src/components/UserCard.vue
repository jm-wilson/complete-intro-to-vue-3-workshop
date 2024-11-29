<script setup lang="ts">
import type { CSSProperties } from "vue";
import type { JSONPlaceholderUser } from "../types";

interface Props {
  as: "div" | "li";
  user: JSONPlaceholderUser;
}

const { as = "li", user } = defineProps<Props>();

const phoneHasExtension = user.phone.includes(" x");
const phoneStyle: CSSProperties["font-style"] = phoneHasExtension ? "italic" : "normal";
const phoneWeight: CSSProperties["font-weight"] = phoneHasExtension ? "bold" : "normal";
</script>

<style module>
/* module styles work well to prevent generic classnames from leaking,
   but are a little bit tedious to use in the template */
.card {
  background-color: goldenrod;
  padding: 0.5em;
  border-radius: 10px;
  display: grid;
  gap: 0.5em;
}

.name {
  font-weight: 700;
}

.phone {
  /* v-bind lets us use JS variables in our CSS, and works both with or without CSS modules */
  font-style: v-bind(phoneStyle);
  font-weight: v-bind(phoneWeight);
}
</style>

<template>
  <component :is="as" :class="$style.card">
    <p :class="$style.name">{{ user.name }}</p>
    <p>
      <a :href="`mailto:${user.email}`">{{ user.email }}</a>
    </p>
    <p>
      <a :class="$style.phone" :href="`tel:${user.phone}`">{{ user.phone }}</a>
    </p>
  </component>
</template>
