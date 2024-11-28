import type { Player } from '@/types';
import { ref } from 'vue';

export function usePlayerList(defaultList?: Player[]) {
  const players = ref(defaultList ?? []);

  function addPlayer(player: Player) {
    players.value.push(player);
  }

  return [players, addPlayer] as const;
}
