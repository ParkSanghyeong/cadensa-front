<script lang="ts">
	import "../../app.css";
	import Header from '$lib/components/layout/Header.svelte';
</script>

<div class="bg-slate-50">
	<Header />

	<main class="flex-1">
		<slot />
	</main>
</div>