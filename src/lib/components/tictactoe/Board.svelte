<script lang="ts">
	import type { TicTacToeState } from '$lib/games/tictactoe';
	import type { Writable } from 'svelte/store';
	import Cell from './Cell.svelte';

	export let gameState: Writable<TicTacToeState>;
</script>

<div>
	{#each { length: 3 } as _, i}
		<div class="flex">
			{#each { length: 3 } as _, j}
				<Cell {gameState} id={i * 3 + j} />
			{/each}
		</div>
	{/each}
</div>
