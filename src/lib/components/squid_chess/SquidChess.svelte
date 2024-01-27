<script lang="ts">
	import type { SquidChessUserView } from '$lib/server/games/squid_chess';
	import type { Writable } from 'svelte/store';

	export let gameState: Writable<SquidChessUserView>;
</script>

<p>Squid Chess</p>
