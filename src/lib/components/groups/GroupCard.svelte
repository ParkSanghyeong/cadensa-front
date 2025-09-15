<script lang="ts">
	import type { Group } from '$lib/data/mockGroups';

	export let group: Group;
</script>

<a href="/groups/{group.id}" class="block rounded-lg border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md">
	<div class="flex items-center justify-between">
		<h3 class="text-lg font-semibold text-slate-900">{group.name}</h3>
		<span class="text-xs text-slate-500">{group.lastActivity}</span>
	</div>
	<p class="mt-2 text-sm text-slate-600">{group.description}</p>
	<div class="mt-4 text-sm text-slate-500">
		<span>멤버 {group.memberCount}명</span>
	</div>
</a>