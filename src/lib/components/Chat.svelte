<script lang="ts">
	import { action } from '$lib/util/action';
	import type { Writable } from 'svelte/store';

	export let gameState: Writable<{ messages: Array<{ userId: string; message: string }> }>;

	let message = '';
	const sendMessage = () => {
		const trimmedMessage = message.trim();
		if (!trimmedMessage) return;
		action('sendMessage', { message: trimmedMessage });
		message = '';
	};
	$: reversedMessages = $gameState.messages.toReversed();
</script>

<div class="flex flex-col justify-end max-w-96 max-h-lvh bg-sky-100 p-2">
	<div class="flex flex-col-reverse flex-grow overflow-y-auto">
		{#each reversedMessages as { userId, message }}
			<p>{userId}: {message}</p>
		{/each}
	</div>
	<div class="flex">
		<input
			type="text"
			bind:value={message}
			on:keypress={({ key }) => key === 'Enter' && sendMessage()}
			class="p-1 w-full border border-black"
		/>
		<button class="p-1 border border-black" on:click={sendMessage}>Send</button>
	</div>
</div>
