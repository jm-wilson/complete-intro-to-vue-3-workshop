<script setup lang="ts"></script>

<template>
  <header class="header">
    <span class="logo"> <img src="@/assets/vue-heart.png" width="30" />C'est La Vue </span>
    <nav class="nav">
      <RouterLink to="/" active-class="active">Home</RouterLink>
      <RouterLink to="/login" active-class="active">Login</RouterLink>
      <RouterLink to="/users" active-class="active">Users</RouterLink>
    </nav>
  </header>
  <Suspense>
    <RouterView />
    <template #fallback>
      <div class="fullscreen-message">TEST FALLBACK</div>
    </template>
  </Suspense>
</template>

<style scoped>
nav a.active {
  font-weight: bold;
}
</style>
