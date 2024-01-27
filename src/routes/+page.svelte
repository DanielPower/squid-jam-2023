<script lang="ts">
	import squid from '$lib/assets/squid.png';
</script>

<div class="p-8 min-h-svh flex justify-center items-center">
	<div class="flex flex-col items-center gap-5">
		<img src={squid} alt="Logo" class="max-h-40" />
		<h1 class="text-gray-800 text-5xl">TicTacToe</h1>
		<form method="POST" action="/lobbies/?/new">
			<select
				name="gameMode"
				class="bg-white border border-gray-400 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-xl"
			>
				<option value="squidChess">Squid</option>
				<option value="tictactoe">TicTacToe</option>
			</select>
			<button
				type="submit"
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xl"
			>
				Play
			</button>
		</form>
	</div>
</div>
