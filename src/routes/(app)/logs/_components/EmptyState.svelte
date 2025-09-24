<script lang="ts">
	import type { ComponentType } from 'svelte';
	import type { SvelteComponent } from 'svelte';

	export let icon: ComponentType<SvelteComponent>;
	export let title: string;
	export let message: string;
</script>

<div class="text-center h-full flex flex-col justify-center items-center">
	<svelte:component this={icon} class="mx-auto mb-4 text-muted-foreground" size={48} />
	<p class="font-bold text-xl">{title}</p>
	<p class="text-sm text-muted-foreground mt-1">{message}</p>
</div>