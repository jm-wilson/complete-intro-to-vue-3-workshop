<script lang="ts">
import { defineComponent } from 'vue';
import type { Player } from '@/types';
import FavoritePlayersPane from './components/FavoritePlayersPane.vue';
import TopPlayer from './components/TopPlayer.vue';
import AddTopPlayerForm from './components/AddTopPlayerForm.vue';
import { players } from '@/data/players';

export default defineComponent({
  components: { FavoritePlayersPane, TopPlayer, AddTopPlayerForm },
  data() {
    return {
      favoriteTeam: 'Pittsburgh',
      players,
      favoritePlayers: [] as Player[],
    };
  },
  methods: {
    addPlayer(player: Player) {
      this.players.push(player);
    },
    addFavoritePlayer(player: Player) {
      // A real app might make sure the player isn't already a favorite, or store this data in a different format
      this.favoritePlayers.push(player);
    },
  },
});
</script>

<template>
  <div class="pane top-players-pane">
    <h2>Top players this week</h2>
    <div class="top-players-grid">
      <div v-if="players.length === 0" class="not-found">Top players were not found</div>
      <div v-else class="player player--top" v-for="player in players" :key="player.name">
        <TopPlayer :player="player" :favoriteTeam="favoriteTeam" @addFavorite="addFavoritePlayer" />
      </div>
    </div>
  </div>
  <div class="utility-panes">
    <AddTopPlayerForm @addPlayer="addPlayer" />
    <FavoritePlayersPane :favorite-players="favoritePlayers" />
  </div>
</template>
