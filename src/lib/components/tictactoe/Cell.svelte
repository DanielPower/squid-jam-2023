<script lang="ts">
	import type {
		TicTacToeActions,
		TicTacToeState,
		TicTacToeUserView,
	} from '$lib/server/games/tictactoe';
	import { action } from '$lib/util/action';
	import type { Writable } from 'svelte/store';

	const move = (cellId: number) => action<TicTacToeActions, 'takeCell'>('takeCell', { cellId });

	export let id: number;
	export let gameState: Writable<TicTacToeUserView>;
	$: playerId = $gameState.cells[id];
	$: disabled =
		!!$gameState.cells[id] || !($gameState.players[$gameState.turnIndex] === $gameState.userId);
</script>

<button {disabled} class="cell" class:disabled on:click={() => move(id)}>
	{#if playerId === $gameState.players[0]}
		⭕️
	{:else if playerId === $gameState.players[1]}
		❌
	{/if}
</button>

<style>
	.cell {
		width: 3rem;
		height: 3rem;
		border: 1px solid black;
	}
	.cell:not(.disabled):hover {
		background-color: #eee;
	}
</style>
