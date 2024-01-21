<script lang="ts">
	import type { TicTacToePlayerView } from '$lib/games/TicTacToe';
	import type { Writable } from 'svelte/store';

	export let id: number;
	export let gameState: Writable<TicTacToePlayerView>;
	$: playerID = $gameState.cells[id];
	// on:click={() => gameClient.moves.clickCell(id)}
</script>

<button disabled={!!$gameState.cells[id]} class="w-12 h-12 border border-black">
	{#if playerID === 0}
		⭕️
	{:else if playerID === 1}
		❌
	{/if}
</button>
