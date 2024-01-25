<script lang="ts">
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	import Chat from '$lib/components/Chat.svelte';
	import { onMount } from 'svelte';
	import { subscribe } from '$lib/util/eventStream';
	import Board from '$lib/components/tictactoe/Board.svelte';

	export let data: PageData;
	const gameState = writable(data.initialPlayerView);

	const join = () => {
		fetch(`${window.location.href}/action`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				action: 'becomePlayer',
			}),
		});
	};

	$: alreadyJoined = $gameState.players.includes(data.userId);

	let result: string[] = [];

	onMount(() => {
		subscribe((message) => {
			gameState.set(JSON.parse(message));
		});
	});
</script>

{#each result as str}
	<p>{str}</p>
{/each}

<div class="flex w-full h-svh p-4">
	<div class="flex flex-grow items-center justify-center">
		<div>
			<Board {gameState} />
			{#if $gameState.players.length < 2 && !alreadyJoined}
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xl"
					on:click={() => join()}
				>
					Join
				</button>
			{/if}
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
		</div>
	</div>
	<Chat {gameState} />
</div>
