<script lang="ts">
	import type { SquidChessUserView } from '$lib/server/games/squid_chess';
	import type { Writable } from 'svelte/store';
	import Board from './Board.svelte';

	export let gameState: Writable<SquidChessUserView>;
</script>

<p>Squid Chess</p>
<Board {gameState} />
