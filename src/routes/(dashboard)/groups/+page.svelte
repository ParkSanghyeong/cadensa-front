<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import GroupCard from '$lib/components/groups/GroupCard.svelte';
	import { mockGroups } from '$lib/data/mockGroups';
</script>

<div class="w-full">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold text-slate-900">내 그룹</h1>
			<p class="mt-2 text-slate-600">참여하고 있는 그룹 목록입니다.</p>
		</div>
		<Button>+ 새 그룹 만들기</Button>
	</div>

	<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each mockGroups as group (group.id)}
			<GroupCard {group} />
		{/each}
	</div>
</div>