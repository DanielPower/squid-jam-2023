<script lang="ts">
	import type { TPiece } from '$lib/server/games/squid_chess';

	export let piece: TPiece;
</script>

{#if piece.type === 'king'}
	{#if piece.owner === 'white'}
		♔
	{:else}
		♚
	{/if}
{:else if piece.type === 'queen'}
	{#if piece.owner === 'white'}
		♕
	{:else}
		♛
	{/if}
{:else if piece.type === 'rook'}
	{#if piece.owner === 'white'}
		♖
	{:else}
		♜
	{/if}
{:else if piece.type === 'bishop'}
	{#if piece.owner === 'white'}
		♗
	{:else}
		♝
	{/if}
{:else if piece.type === 'knight'}
	{#if piece.owner === 'white'}
		♘
	{:else}
		♞
	{/if}
{:else if piece.type === 'pawn'}
	{#if piece.owner === 'white'}
		♙
	{:else}
		♟
	{/if}
{:else if piece.type === 'wall'}
	⬜
{/if}
