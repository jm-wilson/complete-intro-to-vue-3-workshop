<script setup lang="ts">
import Loading from "@/components/Loading.vue";
import { useUserStore } from "@/stores/useUserStore";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

// storeToRefs keeps these reactive
const { errorGettingUsers, loadingUsers } = storeToRefs(userStore);
</script>

<template>
  <div>
    <div class="fullscreen-message" v-if="errorGettingUsers">Error getting users</div>
    <Loading v-else-if="loadingUsers" />
    <router-view v-else />
  </div>
</template>
