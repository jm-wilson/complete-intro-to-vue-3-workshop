<script lang="ts">
import { defineComponent } from 'vue';
import type { Player } from '@/types';
import FavoritePlayersPane from './components/FavoritePlayersPane.vue';
import TopPlayer from './components/TopPlayer.vue';
import { players } from '@/data/players';

export default defineComponent({
  components: { FavoritePlayersPane, TopPlayer },
  data() {
    return {
      favoriteTeam: 'Pittsburgh',
      players,
      favoritePlayers: [] as Player[],
      newPlayer: {
        name: '',
        team: '',
        position: '',
        number: undefined,
        captaincy: '',
      },
    };
  },
  methods: {
    addPlayer(event: Event) {
      // A real app might validate the new player before adding it
      this.players.push(this.newPlayer);
      // Clear the form by setting the bound variable to an empty object
      this.newPlayer = {
        name: '',
        team: '',
        position: '',
        number: undefined,
        captaincy: '',
      };
      // Move focus to the name field, found within the submitted form
      const nameInput: HTMLInputElement | null = (event.target as HTMLElement).querySelector(
        'input[name="name"]',
      );
      nameInput?.focus();
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
    <!-- .prevent does the same as event.preventDefault() would -->
    <form class="pane add-player-form" @submit.prevent="addPlayer">
      <label>
        Name:
        <input v-model="newPlayer.name" type="text" name="name" id="name" />
      </label>
      <label>
        Team:
        <input v-model="newPlayer.team" type="text" name="team" id="team" />
      </label>
      <label>
        Position:
        <select v-model="newPlayer.position" name="position" id="position">
          <option value="C">Center</option>
          <option value="LW">Left Wing</option>
          <option value="RW">Right Wing</option>
          <option value="D">Defense</option>
          <option value="G">Goaltender</option>
        </select>
      </label>
      <label>
        Number:
        <input v-model="newPlayer.number" type="number" name="number" id="number" />
      </label>
      <label>
        Captaincy:
        <select v-model="newPlayer.captaincy" name="captaincy" id="captaincy">
          <option value="C">Captain</option>
          <option value="A">Alternate</option>
          <option value="">N/A</option>
        </select>
      </label>
      <button>Add player</button>
    </form>
    <FavoritePlayersPane :favorite-players="favoritePlayers" />
  </div>
</template>
