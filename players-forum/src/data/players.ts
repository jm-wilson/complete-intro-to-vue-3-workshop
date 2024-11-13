import type { Player } from '@/types';

const errorGettingPlayers = Math.random() > 1; // Change to simulate intermittent errors

export const players: Player[] = errorGettingPlayers
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
