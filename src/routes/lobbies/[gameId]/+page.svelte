<script lang="ts">
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	import Chat from '$lib/components/Chat.svelte';
	import { onMount } from 'svelte';
	import { subscribe } from '$lib/util/eventStream';
	import Board from '$lib/components/tictactoe/Board.svelte';
	import Join from '$lib/components/tictactoe/Join.svelte';
	import Result from '$lib/components/tictactoe/Result.svelte';

	export let data: PageData;
	const { userId } = data;
	const gameState = writable(data.initialPlayerView);

	let result: string[] = [];

	onMount(() => {
		subscribe((message) => {
			gameState.set(message);
		});
	});
</script>

{#each result as str}
	<p>{str}</p>
{/each}

<div class="flex w-full h-svh p-4">
	<div class="flex flex-grow items-center justify-center">
		<div class="flex flex-col gap-4">
			<Result {gameState} {userId} />
			<Board {gameState} />
			<Join {gameState} {userId} />
		</div>
	</div>
	<Chat {gameState} />
</div>
