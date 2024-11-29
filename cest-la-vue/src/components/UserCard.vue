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

<template>
  <router-link :class="$style.link" :to="'/users/' + user.id">
    <component :is="as" :class="$style.card">
      <p :class="$style.name">{{ user.name }}</p>
      <p>{{ user.email }}</p>
      <p :class="$style.phone">{{ user.phone }}</p>
    </component>
  </router-link>
</template>

<style module>
/* module styles work well to prevent generic classnames from leaking,
   but are a little bit tedious to use in the template */

.link {
  text-decoration: none;
}

.card {
  background-color: mediumaquamarine;
  padding: 0.5em;
  border-radius: 10px;
  display: grid;
  gap: 0.5em;

  &:hover {
    translate: 0 -2px;
    box-shadow: #11222240 0 5px 5px 1px;
  }
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
