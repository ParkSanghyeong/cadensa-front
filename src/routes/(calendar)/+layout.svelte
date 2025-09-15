<script lang="ts">
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import "../../app.css";
</script>

<div class="flex bg-slate-50">
	<Sidebar />
	<main class="flex-1">
		<slot />
	</main>
</div>