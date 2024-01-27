<script lang="ts">
	import type { TicTacToeActions, TicTacToeState } from '$lib/server/games/TicTacToe';
	import { action } from '$lib/util/action';
	import type { Writable } from 'svelte/store';

	const move = (cellId: number) => action<TicTacToeActions, 'takeCell'>('takeCell', { cellId });

	export let id: number;
	export let gameState: Writable<TicTacToeState>;
	$: playerId = $gameState.cells[id];
</script>

<button
	disabled={!!$gameState.cells[id]}
	class="w-12 h-12 border border-black"
	on:click={() => move(id)}
>
	{#if playerId === $gameState.players[0]}
		⭕️
	{:else if playerId === $gameState.players[1]}
		❌
	{/if}
</button>
