<script setup lang="ts">
import type { Player } from '@/types';
import { useTemplateRef } from 'vue';

const emit = defineEmits({
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
});

let newPlayer = {
  name: '',
  team: '',
  position: '',
  number: undefined,
  captaincy: '',
};

function onSubmit() {
  // Although we can put "validation" in the emits option, we must put validation
  // here in order to trigger different logic based on whether it passes/fails
  if (validateFields()) {
    emit('addPlayer', newPlayer);
    resetForm();
  } else {
    console.warn('Blocking form submission due to failed validation');
  }
}

/**
 * Basic validation to ensure added players have a name, (nonzero) number, position and team
 * Focuses the first invalid field if validation fails
 */
function validateFields() {
  return newPlayer.name && newPlayer.number && newPlayer.position && newPlayer.team;
}

const form = useTemplateRef('form');

/**
 * Clears newPlayer state, resets the form state and focuses the first form field
 */
function resetForm() {
  // Clear the form by setting the bound variable to an empty object
  newPlayer = {
    name: '',
    team: '',
    position: '',
    number: undefined,
    captaincy: '',
  };

  if (form.value) {
    // Reset the form (includes the browser's builtin validation state)
    form.value.reset();

    // Move focus to the name field
    form.value.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
  }
}
</script>

<template>
  <form ref="form" class="pane add-player-form" @submit.prevent="onSubmit">
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
