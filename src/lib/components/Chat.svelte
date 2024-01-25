<script lang="ts">
	import type { TicTacToeState } from '$lib/server/games/TicTacToe';
	import type { Writable } from 'svelte/store';

	export let gameState: Writable<TicTacToeState>;

	let message = '';
	const sendMessage = () => {
		fetch(`${window.location.href}/action`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				action: 'sendMessage',
				message,
			}),
		});
		message = '';
	};
</script>

<div class="flex flex-col justify-end">
	{#each $gameState.messages as { userId, message }}
		<p>{userId}: {message}</p>
	{/each}
	<div class="flex">
		<input
			type="text"
			bind:value={message}
			on:keypress={({ key }) => key === 'Enter' && sendMessage()}
			class="w-full border border-black"
		/>
		<button class="w-12 h-12 border border-black" on:click={sendMessage}>Send</button>
	</div>
</div>
