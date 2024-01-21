<script lang="ts">
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	import Cell from './Cell.svelte';
	import Chat from './Chat.svelte';
	import { onMount } from 'svelte';

	export let data: PageData;
	const gameState = writable(data.initialPlayerView);

	onMount(() => {
		const shortPoll = async () => {
			// WebSockets and SvelteKit go together like cats and water.
			// https://github.com/sveltejs/kit/issues/1491
			// The proposed workarounds don't handle upgrade requests and cookies
			// Can revisit when websockets are natively supported
			const response = await fetch(`${window.location.href}/state`);
			const newGameState = await response.json();
			gameState.set(newGameState);
			setTimeout(shortPoll, 100);
		};
		shortPoll();
	});
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

	{#if $gameState.gameover}
		<div class="bg-white p-4 rounded-lg shadow-lg">
			{#if $gameState.winner === data.userId}
				🎉 You won!
			{:else if $gameState.winner}
				😢 You lost!
			{:else}
				🤝 It's a tie!
			{/if}
		</div>
	{/if}
	<Chat {gameState} />
</div>
