<script lang="ts">
	export let id: number;
	const isDark = id % 2 === 0;
</script>

<div class={`w-10 h-10 flex justify-center items-center`} class:dark={isDark} class:light={!isDark}>
	<slot />
</div>

<style>
	.light {
		background-color: bisque;
	}
	.dark {
		background-color: burlywood;
	}
</style>
