<script lang="ts">
import { ref } from "vue";
import HomePage from "./components/HomePage.vue";
import Loading from "./components/Loading.vue";
import LoginPage from "./components/LoginPage.vue";
import UsersPage from "./components/UsersPage.vue";

export default {
  setup() {
    const currentPage = ref("HomePage");
    return { currentPage };
  },
  components: {
    HomePage,
    LoginPage,
    UsersPage,
    Loading,
  },
  methods: {
    showPage(pageName: string) {
      // This makes sure we get at least one tick on the loading page, so any page that suspends will show that instead of the previous page.
      // I have a feeling there's a better way to do this, but in the real  world, I'd probably use a real router instead anyways

      // First we set the page to loading...
      this.currentPage = "Loading";

      // ...then we queue a microtask to actually set the page
      // If we don't defer this somehow, both this.currentPage updates seem to get batched
      // If we use setTimeout(fn, 0), the Loading page is always briefly visible when switching to pages that aren't asynchronous
      // If we use queueMicrotask(fn), the Loading page is only visible when switching to async pages
      queueMicrotask(() => {
        this.currentPage = `${pageName}Page`;
      });
    },
  },
};
</script>

<template>
  <header class="header">
    <span class="logo"> <img src="@/assets/vue-heart.png" width="30" />C'est La Vue </span>
    <nav class="nav">
      <a href="#" @click.prevent="showPage('Home')">Home</a>
      <a href="#" @click.prevent="showPage('Login')">Login</a>
      <a href="#" @click.prevent="showPage('Users')">Users</a>
    </nav>
  </header>
  <Suspense>
    <!-- 
    Suspense seems to keep the previous page shown until the new page is ready, instead of showing the fallback in the meantime.
    We only see the fallback on initial load if the first page being loaded is asynchronous
     -->
    <component :is="currentPage" :key="currentPage" />
    <template #fallback>
      <div class="fullscreen-message">TEST FALLBACK</div>
    </template>
  </Suspense>
</template>
