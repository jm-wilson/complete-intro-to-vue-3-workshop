<script lang="ts">
import type { Player } from '@/types';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
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
    onSubmit() {
      // Although we can put "validation" in the emits option, we must put validation
      // here in order to trigger different logic based on whether it passes/fails
      if (this.validateFields()) {
        this.$emit('addPlayer', this.newPlayer);
        this.resetForm();
      } else {
        console.warn('Blocking form submission due to failed validation');
      }
    },
    /**
     * Basic validation to ensure added players have a name, (nonzero) number, position and team
     * Focuses the first invalid field if validation fails
     */
    validateFields() {
      return (
        this.newPlayer.name &&
        this.newPlayer.number &&
        this.newPlayer.position &&
        this.newPlayer.team
      );
    },
    /**
     * Clears newPlayer state, resets the form state and focuses the first form field
     */
    resetForm() {
      // Clear the form by setting the bound variable to an empty object
      this.newPlayer = {
        name: '',
        team: '',
        position: '',
        number: undefined,
        captaincy: '',
      };

      // Reset the form (includes the browser's builtin validation state)
      this.$el.reset();

      // Move focus to the name field
      this.$el.querySelector('input[name="name"]')?.focus();
    },
  },
  emits: {
    addPlayer(player: Player) {
      // Basic validation to ensure added players have a name, (nonzero) number, position and team
      // We can call things like `console.log` here, but can't access `this` or do anything interactive. It seems like
      // the same validation must be duplicated elsewhere in order to be useful, so why do we do it again here?
      // I hope I eventually understand this, but 20 minutes of research and arguing with LLMs got me nowhere
      if (player.name && player.number && player.position && player.team) {
        return true;
      }

      console.warn('addPlayer validation failed');
      return false;
    },
  },
});
</script>

<template>
  <form class="pane add-player-form" @submit.prevent="onSubmit">
    <label>
      Name:
      <input v-model="newPlayer.name" type="text" name="name" id="name" required />
    </label>
    <label>
      Team:
      <input v-model="newPlayer.team" type="text" name="team" id="team" required />
    </label>
    <label>
      Position:
      <select v-model="newPlayer.position" name="position" id="position" required>
        <option value="C">Center</option>
        <option value="LW">Left Wing</option>
        <option value="RW">Right Wing</option>
        <option value="D">Defense</option>
        <option value="G">Goaltender</option>
      </select>
    </label>
    <label>
      Number:
      <input
        v-model="newPlayer.number"
        type="number"
        name="number"
        id="number"
        required
        min="1"
        max="99"
      />
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
</template>
