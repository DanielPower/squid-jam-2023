<script lang="ts">
	import type { TPiece, SquidChessUserView } from '$lib/games/squid_chess';
	import { makeGridUtils } from '$lib/util/grid';
	import type { Writable } from 'svelte/store';
	import Piece from './Piece.svelte';
	import Cell from './Cell.svelte';

	export let gameState: Writable<SquidChessUserView>;
	const { toIndex, toCoord } = makeGridUtils(7);

	let rows: TPiece[][] = [];
	const makeRows = (board: TPiece[]) => {
		const rows = [];
		for (let y = 0; y < 7; y++) {
			const row = [];
			for (let x = 0; x < 7; x++) {
				row.push(board[toIndex(x, y)]);
			}
			rows.push(row);
		}
		return rows;
	};
	$: rows = makeRows($gameState.board);
</script>

<div>
	{#each rows as row, i}
		<div class="flex">
			{#each row as piece, j}
				<Cell id={i + j}><Piece {piece} /></Cell>
			{/each}
		</div>
	{/each}
</div>
