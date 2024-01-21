<script lang="ts">
	import type { PageData } from './$types';
	import Cell from './Cell.svelte';
	import Chat from './Chat.svelte';

	export let data: PageData;
	const gameState = data.gameState;
</script>

<div class="absolute inset-0 flex flex-col items-center justify-center">
	<div>
		{#each { length: 3 } as _, i}
			<div class="flex">
				{#each { length: 3 } as _, j}
					<Cell {gameState} id={i * 3 + j} />
				{/each}
			</div>
		{/each}
	</div>

	{#if $gameState.winner}
		<div class="bg-white p-4 rounded-lg shadow-lg">
			{#if $gameState.winner === '0'}
				⭕️ You won!
			{:else if $gameState.winner === '1'}
				❌ You lost!
			{:else}
				🤝 It's a tie!
			{/if}
		</div>
	{/if}
	<Chat {gameState} />
</div>
