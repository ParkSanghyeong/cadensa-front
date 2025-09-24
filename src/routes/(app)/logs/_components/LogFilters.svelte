<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { SlidersHorizontal, Users, Calendar, Terminal, Tag, Check } from '@lucide/svelte';
	import { slide } from 'svelte/transition';
	import type { LogType } from './types';

	export let selectedDateRange: 'Today' | '7d' | '30d' | 'Custom';
	export let selectedLogTypes: Set<LogType>;

	let isFilterVisible = true;

	const dispatch = createEventDispatcher();

	const toggleLogType = (type: LogType) => {
		selectedLogTypes.has(type) ? selectedLogTypes.delete(type) : selectedLogTypes.add(type);
		selectedLogTypes = new Set(selectedLogTypes); // Trigger reactivity
	};

	const resetFilters = () => {
		selectedLogTypes = new Set(['SYSTEM', 'INVITE', 'EVENT', 'GROUP']);
		selectedDateRange = '7d';
	};

	const logTypes: { id: LogType; label: string; icon: any }[] = [
		{ id: 'SYSTEM', label: 'System', icon: Terminal },
		{ id: 'INVITE', label: 'Invitations', icon: Users },
		{ id: 'EVENT', label: 'Schedules', icon: Calendar },
		{ id: 'GROUP', label: 'Groups', icon: Tag }
	];

	$: areFiltersActive = selectedLogTypes.size < logTypes.length || selectedDateRange !== '7d';
</script>

<aside
	class="w-full lg:w-80 lg:min-w-[320px] flex-shrink-0 border-b-2 lg:border-r-1 lg:border-b-0 border-foreground/20 p-6 flex flex-col gap-6
         lg:sticky lg:top-[60px] lg:h-[calc(100vh-60px)]"
>
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<SlidersHorizontal size={24} />
			<h2 class="font-mono text-2xl font-bold">Filters</h2>
		</div>
		<button on:click={() => (isFilterVisible = !isFilterVisible)} class="lg:hidden p-1 text-muted-foreground hover:text-foreground">
			{isFilterVisible ? 'Hide' : 'Show'}
		</button>
	</div>

	{#if isFilterVisible}
		<div transition:slide={{ duration: 200 }} class="flex flex-col gap-6 flex-grow">
			<div class="bg-muted/30 border border-foreground/10 rounded-lg p-4">
				<h3 class="font-mono text-sm uppercase text-muted-foreground mb-3">// Date Range</h3>
				<div class="grid grid-cols-2 gap-2 text-sm font-mono">
					<button on:click={() => (selectedDateRange = 'Today')} class="p-2 rounded text-left transition-all border {selectedDateRange === 'Today' ? 'bg-foreground text-background border-foreground' : 'bg-background border-foreground/20 hover:border-foreground'}">Today</button>
					<button on:click={() => (selectedDateRange = '7d')} class="p-2 rounded text-left transition-all border {selectedDateRange === '7d' ? 'bg-foreground text-background border-foreground' : 'bg-background border-foreground/20 hover:border-foreground'}">Last 7 days</button>
					<button on:click={() => (selectedDateRange = '30d')} class="p-2 rounded text-left transition-all border {selectedDateRange === '30d' ? 'bg-foreground text-background border-foreground' : 'bg-background border-foreground/20 hover:border-foreground'}">Last 30 days</button>
					<button on:click={() => (selectedDateRange = 'Custom')} class="p-2 rounded text-left transition-all border {selectedDateRange === 'Custom' ? 'bg-foreground text-background border-foreground' : 'bg-background border-foreground/20 hover:border-foreground'}">Custom</button>
				</div>
			</div>

			<div class="bg-muted/30 border border-foreground/10 rounded-lg p-4 flex-grow lg:flex-grow-0">
				<h3 class="font-mono text-sm uppercase text-muted-foreground mb-3">// Log Type</h3>
				<div class="space-y-2 text-sm font-mono">
					{#each logTypes as typeInfo}
						<button on:click={() => toggleLogType(typeInfo.id)} class="w-full flex items-center justify-between p-2 rounded transition-colors {selectedLogTypes.has(typeInfo.id) ? 'text-foreground hover:bg-muted/80' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}">
							<span class="flex items-center gap-2"><svelte:component this={typeInfo.icon} size={16} /> {typeInfo.label}</span>
							<div class="w-4 h-4 rounded-sm border-2 flex items-center justify-center {selectedLogTypes.has(typeInfo.id) ? 'bg-foreground border-foreground' : 'border-foreground/20 bg-background'}">
								{#if selectedLogTypes.has(typeInfo.id)}<Check size={12} class="text-background" />{/if}
							</div>
						</button>
					{/each}
				</div>
			</div>

			{#if areFiltersActive}
				<div class="flex-shrink-0 pt-4 border-t border-foreground/10 text-center">
					<button on:click={resetFilters} class="font-mono text-sm text-muted-foreground hover:text-accent transition-colors">
						Reset Filters
					</button>
				</div>
			{/if}
		</div>
	{/if}
</aside>