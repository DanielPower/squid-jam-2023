<script lang="ts">
	import { gameClient, gameState } from '$lib/game';
	export let id: number;
	$: playerID = $gameState.G.cells[id];
</script>

<button
	on:click={() => gameClient.moves.clickCell(id)}
	disabled={!!$gameState.G.cells[id]}
	class="w-12 h-12 border border-black"
>
	{#if playerID === '0'}
		⭕️
	{:else if playerID === '1'}
		❌
	{/if}
</button>
