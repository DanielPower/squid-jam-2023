<script lang="ts">
	import Cell from './Cell.svelte';
	import { SocketIO } from 'boardgame.io/multiplayer';
	import { Client } from 'boardgame.io/client';
	import { TicTacToe } from '$lib/games/TicTacToe';
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';

	export let data: PageData;
	let gameState = writable(data.initialState);
	setContext('gameState', gameState);

	const gameClient = Client({
		game: TicTacToe,
		matchID: '0',
		playerID: '0',
		multiplayer: SocketIO({ server: 'http://localhost:8000' })
	});

	gameClient.subscribe((state) => {
		if (state === null) return;
		gameState.set(state);
	});
	gameClient.start();

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
						<!-- cell -->
					{/each}
				</div>
			{/each}
		</div>

		{#if gameState.ctx.gameover}
			<div class="bg-white p-4 rounded-lg shadow-lg">
				{#if gameState.ctx.gameover.winner === '0'}
					⭕️ You won!
				{:else if gameState.ctx.gameover.winner === '1'}
					❌ You lost!
				{:else}
					🤝 It's a tie!
				{/if}
			</div>
		{/if}
	</div>
{/if}
