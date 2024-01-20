<script lang="ts">
	import { getContext } from 'svelte';

	export let id: number;
	const gameState = getContext('gameState');
	$: playerID = $gameState.cells[id];
	// on:click={() => gameClient.moves.clickCell(id)}
</script>

<button disabled={!!$gameState.cells[id]} class="w-12 h-12 border border-black">
	{#if playerID === '0'}
		⭕️
	{:else if playerID === '1'}
		❌
	{/if}
</button>
