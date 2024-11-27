<script setup lang="ts"></script>

<template>
  <div class="pane main-pane">
    <slot name="main"></slot>
  </div>

  <div v-if="$slots.utility" class="utility-panes">
    <!-- v-if="$slots.utility" renders the wrapping div conditionally based on whether this slot is used -->
    <slot name="utility"></slot>
  </div>
</template>
