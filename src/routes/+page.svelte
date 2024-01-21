<script lang="ts">
	import squid from '$lib/assets/squid.png';
</script>

<div class="p-8 min-h-svh flex justify-center items-center">
	<div class="flex flex-col items-center gap-5">
		<img src={squid} alt="Logo" class="max-h-40" />
		<h1 class="text-gray-800 text-5xl">TicTacToe</h1>
		<form method="POST" action="/lobbies/?/new">
			<button
				type="submit"
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xl"
			>
				Play
			</button>
		</form>
	</div>
</div>
