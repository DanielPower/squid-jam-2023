<script lang="ts">
	import type { TicTacToePlayerView } from '$lib/games/TicTacToe';
	import type { Writable } from 'svelte/store';

	const move = (cellId: number) => {
		fetch(`${window.location.href}/action`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				action: 'takeCell',
				cellId,
			}),
		});
	};

	export let id: number;
	export let gameState: Writable<TicTacToePlayerView>;
	$: playerId = $gameState.cells[id];
	$: o = $gameState.users[0];
	$: x = $gameState.users[1];
</script>

<button
	disabled={!!$gameState.cells[id]}
	class="w-12 h-12 border border-black"
	on:click={() => move(id)}
>
	{#if playerId === o}
		⭕️
	{:else if playerId === x}
		❌
	{/if}
</button>
