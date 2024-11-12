<script lang="ts">
import type { Player } from '@/types';
import type { PropType } from 'vue';

export default {
  props: {
    favoritePlayers: {
        type: Array as PropType<Player[]>,
        required: true,
    }
  },

  // Each computed property function begins with a log to easily see when they run
  computed: {
    // Something seems wrong about previous not having an inferred type
    favoriteCaptains(previous: { favoriteCaptains: Player[] }): Player[] {
      // This depends on favoritePlayers and runs every time a favorite is added
      console.log('Recomputing favorite captains');
      const newList = this.favoritePlayers.filter((player) => player.captaincy === 'C');

      // It seems like previous is a proxy to an object containing all computeds/methods,
      // so we really want to compare/return `previous.favoriteCaptains` and not `previous`.
      // Is this inconsistent with the docs or am I reading them wrong?
      //  https://vuejs.org/guide/essentials/computed.html#previous
      console.log({ previousList: { ...previous.favoriteCaptains }, newList });

      // Preserve the old reference if list length hasn't changed so dependents won't recompute
      // Depending on the application, a more thorough deep equality check may be necessary
      if (previous.favoriteCaptains && previous.favoriteCaptains.length === newList.length) {
        console.log('Preserving previous favorite captains list');
        return previous.favoriteCaptains;
      }

      console.log('Updated favorite captains list');
      return newList;
    },
    totalFavoriteCaptains() {
      // This depends on favoriteCaptains and runs every time a captain is added.
      // It does not run if a non-captain is added, because favoriteCaptains will keep the same reference
      console.log('Counting favorite captains');
      return this.favoriteCaptains.length;
    },
    doubleTotalFavoriteCaptains() {
      // This depends on totalFavoriteCaptains and runs every time a captain is added
      // It does not run if a non-captain is added, because totalFavoriteCaptains remains unchanged
      console.log('Doubling totalFavoriteCaptains');
      return this.totalFavoriteCaptains * 2;
    },
    favoriteAlternates(): Player[] {
      // This depends on favoritePlayers and runs every time a favorite is added
      console.log('Recomputing favorite alternates');
      return this.favoritePlayers.filter((player) => player.captaincy === 'A');
    },
    totalFavoriteAlternates() {
      // This depends on favoriteAlternates and runs every time a favorite is added
      // It runs even if a non-alternate is added because favoriteAlternates will have a new reference
      console.log('Counting favorite alternates');
      return this.favoriteAlternates.length;
    },
    doubleTotalFavoriteAlternates() {
      // This depends on totalFavoriteAlternates and runs every time an alternate is added
      // It does not run if a non-alternate is added, because totalFavoriteAlternates remains unchanged
      console.log('Doubling totalFavoriteAlternates');
      return this.totalFavoriteAlternates * 2;
    },
    // Calculating percents depends on the entire favorites array, so using those computed properties makes all others run again
    // totalFavorites() {
    //   // This depends on favoritePlayers and runs every time a favorite is added
    //   console.log('Counting favorites');
    //   return this.favoritePlayers.length;
    // },
    // favoritesPercentCaptains() {
    //   console.log('Calculating % captains in favorites');
    //   if (this.totalFavorites === 0) return 0; // Avoid divide by zero
    //   return Math.round((this.totalFavoriteCaptains / this.totalFavorites) * 100);
    // },
    // favoritesPercentAlternates() {
    //   console.log('Calculating % alternates in favorites');
    //   if (this.totalFavorites === 0) return 0; // Avoid divide by zero
    //   return Math.round((this.totalFavoriteAlternates / this.totalFavorites) * 100);
    // },
  },
};
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
