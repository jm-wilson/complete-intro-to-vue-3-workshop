<script lang="ts">
import { defineComponent } from 'vue';
import type { Player } from '@/types';
import FavoritePlayersPane from './components/FavoritePlayersPane.vue';

const errorGettingPlayers = Math.random() > 1; // Change to simulate intermittent errors

const players: Player[] = errorGettingPlayers
  ? []
  : [
      { name: 'Crosby', team: 'Pittsburgh', position: 'C', number: 87, captaincy: 'C' },
      { name: 'Malkin', team: 'Pittsburgh', position: 'C', number: 71, captaincy: 'A' },
      { name: 'Luongo', team: 'Vancouver', position: 'G', number: 1, captaincy: 'C' },
      { name: 'Kunitz', team: 'Pittsburgh', position: 'LW', number: 14, captaincy: '' },
      { name: 'Letang', team: 'Pittsburgh', position: 'D', number: 58, captaincy: 'A' },
      { name: 'Engelland', team: 'Pittsburgh', position: 'D', number: 5, captaincy: '' },
      { name: 'Chara', team: 'Boston', position: 'D', number: 33, captaincy: 'C' },
      { name: 'Blueger', team: 'Pittsburgh', position: 'C', number: 53, captaincy: '' },
      { name: 'Miller', team: 'Vancouver', position: 'C', number: 9, captaincy: '' },
      { name: 'Fleury', team: 'Pittsburgh', position: 'G', number: 29, captaincy: '' },
      { name: 'McDavid', team: 'Edmonton', position: 'C', number: 97, captaincy: 'C' },
      { name: 'Burns', team: 'Carolina', position: 'D', number: 88, captaincy: '' },
      { name: 'Kessel', team: 'Pittsburgh', position: 'RW', number: 72, captaincy: '' },
      { name: 'Talbot', team: 'Pittsburgh', position: 'C', number: 25, captaincy: '' },
      { name: 'Kennedy', team: 'Pittsburgh', position: 'C', number: 48, captaincy: '' },
    ];

export default defineComponent({
  components: { FavoritePlayersPane },
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
        <div class="star" v-if="player.team === favoriteTeam">⭐</div>

        <h3>{{ player.name }}</h3>
        <aside v-if="player.captaincy === 'C'">(Captain)</aside>
        <aside v-if="player.captaincy === 'A'">(Alternate Captain)</aside>

        <dl>
          <dt>Team</dt>
          <dd>
            {{ player.team === favoriteTeam ? player.team.toUpperCase() + '!' : player.team }}
          </dd>

          <dt>Position</dt>
          <dd>{{ player.position }}</dd>

          <dt>Goals this week</dt>
          <dd>{{ Math.floor(Math.random() * 4 + 2) }}</dd>
        </dl>
        <button @click="addFavoritePlayer(player)">Add favorite</button>
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
