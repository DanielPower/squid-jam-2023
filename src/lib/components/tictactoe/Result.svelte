<script lang="ts">
	import type { TicTacToeState } from '$lib/server/games/TicTacToe';
	import type { Writable } from 'svelte/store';
	export let gameState: Writable<TicTacToeState>;
	export let userId: string;
</script>

{#if $gameState.gameover}
	<div class="bg-white p-4 rounded-lg shadow-lg">
		{#if $gameState.winner === userId}
			🎉 You won!
		{:else if $gameState.winner}
			😢 You lost!
		{:else}
			🤝 It's a tie!
		{/if}
	</div>
{/if}
