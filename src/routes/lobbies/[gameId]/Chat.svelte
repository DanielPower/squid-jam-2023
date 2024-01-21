<script lang="ts">
	import type { TicTacToePlayerView } from '$lib/games/TicTacToe';
	import type { Writable } from 'svelte/store';

	export let gameState: Writable<TicTacToePlayerView>;
</script>

<div class="flex flex-col">
	{#each $gameState.messages as { user, message }}
		<p>{user}: {message}</p>
	{/each}
</div>
