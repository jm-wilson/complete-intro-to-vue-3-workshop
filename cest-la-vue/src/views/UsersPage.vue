<script setup lang="ts">
import Loading from "@/components/Loading.vue";
import { useUserStore } from "@/composables/useUserStore";

const { users, loadingUsers, errorGettingUsers } = useUserStore();
</script>

<template>
  <div>
    <div class="fullscreen-message" v-if="errorGettingUsers">Error getting users</div>
    <Loading v-else-if="loadingUsers" />
    <!-- 
       Awkward way to pass the same props down to any child route components.
       This works assuming they all accept the same props, which is a rare use case but fits here
       https://router.vuejs.org/guide/essentials/passing-props.html#Via-RouterView
      -->
    <router-view v-else v-slot="{ Component }">
      <component :is="Component" :users="users" />
    </router-view>
  </div>
</template>
