<script lang="ts">
	import type { SquidChessUserView } from '$lib/server/games/squid_chess';
	import type { Writable } from 'svelte/store';

	import cardBack from '$lib/assets/squid_chess/cardback.png';

	export let gameState: Writable<SquidChessUserView>;
	export let player: 'white' | 'black';

	$: hand = $gameState.players[player].hand;
</script>

<div class="flex h-40">
	{#each hand as card}
		<img alt="Card" src={cardBack} />
	{/each}
</div>
