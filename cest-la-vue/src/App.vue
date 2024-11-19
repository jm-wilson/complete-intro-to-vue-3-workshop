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

<style>
* {
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
  margin: 0;
  padding: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ccc;
}

span.logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
}

span.logo img {
  margin-right: 8px;
}

.nav {
  display: flex;
  align-items: center;
}

.nav a {
  padding: 0.5rem;
  font-size: 0.9rem;
}

.nav a:last-child {
  padding-right: 0;
}
</style>
