<script lang="ts">
	import Cell from './Cell.svelte';
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';

	export let data: PageData;
	let gameState = writable(data.initialPlayerView);
	setContext('gameState', gameState);

	$: console.log(gameState);
</script>

{#if gameState == null}
	<div>Loading...</div>
{:else}
	<div class="absolute inset-0 flex flex-col items-center justify-center">
		<div>
			{#each { length: 3 } as _, i}
				<div class="flex">
					{#each { length: 3 } as _, j}
						<Cell id={i * 3 + j} />
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
	</div>
{/if}
