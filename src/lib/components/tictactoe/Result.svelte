<script lang="ts">
	import type { TicTacToeUserView } from '$lib/server/games/tictactoe';
	import type { Writable } from 'svelte/store';
	export let gameState: Writable<TicTacToeUserView>;
</script>

{#if $gameState.gameover}
	<div class="bg-white p-4 rounded-lg shadow-lg">
		{#if $gameState.winner === $gameState.userId}
			🎉 You won!
		{:else if $gameState.winner}
			😢 You lost!
		{:else}
			🤝 It's a tie!
		{/if}
	</div>
{/if}
