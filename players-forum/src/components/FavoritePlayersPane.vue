<script setup lang="ts">
import type { Player } from '@/types';
import { computed } from 'vue';

interface Props {
  favoritePlayers: Player[];
}

const { favoritePlayers } = defineProps<Props>();

const favoriteCaptains = computed<Player[]>((previous) => {
  // This depends on favoritePlayers and runs every time a favorite is added
  console.log('Recomputing favorite captains');
  const newList = favoritePlayers.filter((player) => player.captaincy === 'C');

  console.log({ previousList: { ...previous }, newList });

  // Preserve the old reference if list length hasn't changed so dependents won't recompute
  // Depending on the application, a more thorough deep equality check may be necessary
  if (previous && previous.length === newList.length) {
    console.log('Preserving previous favorite captains list');
    return previous;
  }

  console.log('Updated favorite captains list');
  return newList;
});

const totalFavoriteCaptains = computed(() => {
  // This depends on favoriteCaptains and runs every time a captain is added.
  // It does not run if a non-captain is added, because favoriteCaptains will keep the same reference
  console.log('Counting favorite captains');
  return favoriteCaptains.value.length;
});

const doubleTotalFavoriteCaptains = computed(() => {
  // This depends on totalFavoriteCaptains and runs every time a captain is added
  // It does not run if a non-captain is added, because totalFavoriteCaptains remains unchanged
  console.log('Doubling totalFavoriteCaptains');
  return totalFavoriteCaptains.value * 2;
});

const favoriteAlternates = computed(() => {
  // This depends on favoritePlayers and runs every time a favorite is added
  console.log('Recomputing favorite alternates');
  return favoritePlayers.filter((player) => player.captaincy === 'A');
});

const totalFavoriteAlternates = computed(() => {
  // This depends on favoriteAlternates and runs every time a favorite is added
  // It runs even if a non-alternate is added because favoriteAlternates will have a new reference
  console.log('Counting favorite alternates');
  return favoriteAlternates.value.length;
});

const doubleTotalFavoriteAlternates = computed(() => {
  // This depends on totalFavoriteAlternates and runs every time an alternate is added
  // It does not run if a non-alternate is added, because totalFavoriteAlternates remains unchanged
  console.log('Doubling totalFavoriteAlternates');
  return totalFavoriteAlternates.value * 2;
});

// Calculating percents depends on the entire favorites array, so using those computed properties makes all others run again
// const totalFavorites = computed(() => {
//   // This depends on favoritePlayers and runs every time a favorite is added
//   console.log('Counting favorites');
//   return favoritePlayers.length;
// });
// const favoritesPercentCaptains = computed(() => {
//   console.log('Calculating % captains in favorites');
//   if (totalFavorites.value === 0) return 0; // Avoid divide by zero
//   return Math.round((totalFavoriteCaptains.value / totalFavorites.value) * 100);
// });

// const favoritesPercentAlternates = computed(() => {
//   console.log('Calculating % alternates in favorites');
//   if (totalFavorites.value === 0) return 0; // Avoid divide by zero
//   return Math.round((totalFavoriteAlternates.value / totalFavorites.value) * 100);
// });
</script>

<template>
  <div v-if="favoritePlayers.length > 0" class="pane favorite-players-pane">
    <h2>Favorite players</h2>
    <dl>
      <dt>Captains:</dt>
      <dd>{{ totalFavoriteCaptains }} (double: {{ doubleTotalFavoriteCaptains }})</dd>
      <!-- <dd>{{totalFavoriteCaptains}} ({{favoritesPercentCaptains}}%)</dd> -->

      <dt>Alternates:</dt>
      <dd>{{ totalFavoriteAlternates }} (double: {{ doubleTotalFavoriteAlternates }})</dd>
      <!-- <dd>{{totalFavoriteAlternates}} ({{favoritesPercentAlternates}}%)</dd> -->
    </dl>
    <ul>
      <li class="player player--favorite" v-for="player in favoritePlayers" :key="player.name">
        <h3>{{ player.name }}</h3>
        <aside>({{ player.team }})</aside>
      </li>
    </ul>
  </div>
</template>
