<script lang="ts">
	import Chat from '$lib/components/Chat.svelte';
	import Board from '$lib/components/tictactoe/Board.svelte';
	import Join from '$lib/components/tictactoe/Join.svelte';
	import Result from '$lib/components/tictactoe/Result.svelte';
	import type { TicTacToeUserView } from '$lib/server/games/tictactoe';
	import type { Writable } from 'svelte/store';

	export let gameState: Writable<TicTacToeUserView>;
</script>

<div class="flex flex-col w-full h-svh p-4">
	<div class="flex items-center justify-center">
		<div class="flex flex-col gap-4">
			<Result {gameState} />
			<Board {gameState} />
			<Join {gameState} />
		</div>
	</div>
	<div class="flex-grow">
		<Chat {gameState} />
	</div>
</div>
