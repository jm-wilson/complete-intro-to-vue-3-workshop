<script lang="ts">
import HomePage from "./components/HomePage.vue";
import LoginPage from "./components/LoginPage.vue";
import UsersPage from "./components/UsersPage.vue";

export default {
  components: {
    HomePage,
    LoginPage,
    UsersPage,
  },
  data: () => ({
    currentPage: "HomePage",
  }),
  methods: {
    showPage(pageName: string) {
      this.currentPage = `${pageName}Page`;
    },
  },
};
</script>

<template>
  <header class="header">
    <span class="logo">
      <img src="@/assets/vue-heart.png" width="30" />C'est La Vue
    </span>
    <nav class="nav">
      <a href="#" @click.prevent="showPage('Home')">Home</a>
      <a href="#" @click.prevent="showPage('Login')">Login</a>
      <a href="#" @click.prevent="showPage('Users')">Users</a>
    </nav>
  </header>
  <component :is="currentPage" />
</template>
