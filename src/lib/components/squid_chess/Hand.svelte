<script lang="ts">
	import type { SquidChessUserView } from '$lib/server/games/squid_chess';
	import type { Writable } from 'svelte/store';

	import cardBack from '$lib/assets/squid_chess/cardback.png';
	import cardborder from '$lib/assets/squid_chess/cardborder.png';

	export let gameState: Writable<SquidChessUserView>;
	export let player: 'white' | 'black';

	$: hand = $gameState.players[player].hand;
</script>

<div class="flex">
	{#each hand as card}
		<div class="flex w-40">
			{#if card.type === 'hidden'}
				<img alt="Card" src={cardBack} />
			{:else}
				<img alt="Card" src={cardborder} />
				<div class="p-3 absolute">{card.title}</div>
			{/if}
		</div>
	{/each}
</div>
