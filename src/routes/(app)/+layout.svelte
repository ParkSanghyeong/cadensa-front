<script lang="ts">
	import Header from "$lib/components/layout/Header.svelte";
	import "../../app.css";
</script>

<div class="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
	<Header />
	<main class="container mx-auto px-4 py-8">
		<slot />
	</main>
</div>