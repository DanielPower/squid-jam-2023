<script lang="ts">
	import type { TicTacToeActions, TicTacToeUserView } from '$lib/server/games/tictactoe';
	import { action } from '$lib/util/action';
	import type { Writable } from 'svelte/store';

	export let gameState: Writable<TicTacToeUserView>;
	const join = () => action<TicTacToeActions, 'becomePlayer'>('becomePlayer');
	$: alreadyJoined = $gameState.players.includes($gameState.userId);
</script>

{#if $gameState.players.length < 2 && !alreadyJoined}
	<button
		class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xl"
		on:click={() => join()}
	>
		Join
	</button>
{/if}
