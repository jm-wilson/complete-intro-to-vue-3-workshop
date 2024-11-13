<script lang="ts">
import type { Player } from '@/types';
import type { PropType } from 'vue';

export default {
  props: {
    player: {
      type: Object as PropType<Player>,
      required: true,
    },
    favoriteTeam: {
      type: String,
      default: '',
    },
  },
  emits: {
    addFavorite: true,
  },
};
</script>

<template>
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
  <button @click="$emit('addFavorite', player)">Add favorite</button>
</template>
