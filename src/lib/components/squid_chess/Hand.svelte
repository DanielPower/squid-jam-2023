<script lang="ts">
	import { type SquidChessUserView, myColor } from '$lib/games/squid_chess';
	import type { Writable } from 'svelte/store';

	import cardBack from '$lib/assets/squid_chess/cardback.png';
	import cardborder from '$lib/assets/squid_chess/cardborder.png';
	import { action } from '$lib/util/action';

	export let gameState: Writable<SquidChessUserView>;
	export let player: 'white' | 'black';

	$: hand = $gameState.players[player].hand;
	$: hoveredCard = $gameState.players[player].hoveredCard;

	const hoverCard = (cardId: number | null) => {
		if (player !== myColor($gameState)) return;
		action('hoverCard', { cardId });
	};
</script>

<div class="flex" on:mouseleave={() => hoverCard(null)}>
	{#each hand as card, i}
		<div
			class="card flex w-32 text-sm"
			class:hovered-white={player === 'white' && i === hoveredCard}
			class:hovered-black={player === 'black' && i === hoveredCard}
			on:mouseenter={() => hoverCard(i)}
		>
			{#if card.type === 'hidden'}
				<img alt="Card" src={cardBack} />
			{:else}
				<img alt="Card" src={cardborder} />
				<div class="p-3 absolute">{card.title}</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.card {
		transform: scale(1) translateY(0);
		transition: transform 0.2s;
	}
	.card.hovered-white {
		transform: scale(1.25) translateY(1rem);
		transition: transform 0.2s;
		z-index: 1;
	}
	.card.hovered-black {
		transform: scale(1.25) translateY(-1rem);
		transition: transform 0.2s;
		z-index: 1;
	}
</style>
