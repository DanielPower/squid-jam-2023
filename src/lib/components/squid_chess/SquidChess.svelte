<script lang="ts">
	import type { SquidChessUserView } from '$lib/server/games/squid_chess';
	import type { Writable } from 'svelte/store';
	import Board from './Board.svelte';
	import Chat from '../Chat.svelte';
	import Hand from './Hand.svelte';
	import Join from './Join.svelte';

	export let gameState: Writable<SquidChessUserView>;
</script>

<div class="flex flex-col">
	<Hand {gameState} player="white" />
	<Board {gameState} />
	<Hand {gameState} player="black" />
	<Join {gameState} />
	<Chat {gameState} />
</div>
