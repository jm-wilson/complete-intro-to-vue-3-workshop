<script setup lang="ts">
import type { Player } from '@/types';
import FavoritePlayersPane from './components/FavoritePlayersPane.vue';
import TopPlayer from './components/TopPlayer.vue';
import AddTopPlayerForm from './components/AddTopPlayerForm.vue';
import { players } from '@/data/players';
import BaseLayout from './components/BaseLayout.vue';
import { reactive, ref } from 'vue';

const favoriteTeam = 'Pittsburgh';
const favoritePlayers = reactive<Player[]>([]);
const allPlayers = ref<Player[]>([...players]);

function addPlayer(player: Player) {
  allPlayers.value.push(player);
}

function addFavoritePlayer(player: Player) {
  // A real app might make sure the player isn't already a favorite, or store this data in a different format
  favoritePlayers.push(player);
}
</script>

<template>
  <BaseLayout>
    <template v-slot:main>
      <!-- v-slot:[slotname] is the longhand directive -->
      <h2>Top players this week</h2>
      <div class="top-players-grid">
        <div v-if="allPlayers.length === 0" class="not-found">Top players were not found</div>
        <div v-else class="player player--top" v-for="player in allPlayers" :key="player.name">
          <TopPlayer
            :player="player"
            :favoriteTeam="favoriteTeam"
            @addFavorite="addFavoritePlayer"
          />
        </div>
      </div>
    </template>
    <template #utility>
      <!-- #[slotname] is the shorthand of v-slot:[slotname] -->
      <AddTopPlayerForm @addPlayer="addPlayer" />
      <FavoritePlayersPane :favorite-players="favoritePlayers" />
    </template>
  </BaseLayout>
</template>
