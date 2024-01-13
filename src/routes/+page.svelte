<script lang="ts">
	import { gameState } from '$lib/game';
	import Cell from './Cell.svelte';
</script>

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

	{#if $gameState.ctx.gameover}
		<div class="bg-white p-4 rounded-lg shadow-lg">
			{#if $gameState.ctx.gameover.winner === '0'}
				⭕️ You won!
			{:else if $gameState.ctx.gameover.winner === '1'}
				❌ You lost!
			{:else}
				🤝 It's a tie!
			{/if}
		</div>
	{/if}
</div>
