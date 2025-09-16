<script lang="ts">
	import authStore from '$lib/stores/authStore';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { mockEvents } from '$lib/data/mockEvents';

	// 모든 그룹의 일정 조율중인 항목과 확정된 다가오는 일정을 필터링합니다.
	const pendingPolls = mockEvents.filter(e => e.status === '조율중');
	const upcomingEvents = mockEvents.filter(e => e.status === '확정' && e.date >= new Date()).sort((a,b) => a.date.getTime() - b.date.getTime());
</script>

<div class="w-full space-y-8">
	<div>
		<h1 class="text-3xl font-bold text-slate-900">
			안녕하세요, {$authStore.user?.name || '사용자'}님!
		</h1>
		<p class="mt-2 text-slate-600">모든 그룹의 새로운 소식을 확인해보세요.</p>
	</div>

	<Card>
		<CardHeader>
			<CardTitle>빠른 응답이 필요해요 ⚡️</CardTitle>
		</CardHeader>
		<CardContent class="space-y-4">
			{#if pendingPolls.length > 0}
				{#each pendingPolls as item (item.id)}
					<div class="flex items-center justify-between rounded-md border p-4">
						<div>
							<p class="font-semibold">{item.title}</p>
							<p class="text-sm text-slate-500">'{item.groupId}' 그룹에서 시간을 조율하고 있어요.</p>
						</div>
						<Button size="sm" href="/groups/{item.groupId}">투표하기</Button>
					</div>
				{/each}
			{:else}
				<p class="text-sm text-slate-500">응답할 항목이 없습니다. 👍</p>
			{/if}
		</CardContent>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>다가오는 모든 일정 🗓️</CardTitle>
		</CardHeader>
		<CardContent class="space-y-4">
			{#if upcomingEvents.length > 0}
				{#each upcomingEvents.slice(0, 5) as event (event.id)}
					<div class="flex items-start gap-4">
						<div class="flex flex-col items-center">
							<span class="text-xs text-primary">{event.date.toLocaleDateString('ko-KR', { month: 'short' })}</span>
							<span class="text-lg font-bold">{event.date.toLocaleDateString('ko-KR', { day: 'numeric' })}</span>
						</div>
						<div class="flex-1 border-l pl-4">
							<p class="font-semibold">{event.title}</p>
							<p class="text-sm text-slate-500">{event.time} &middot; {event.groupId}</p>
						</div>
					</div>
				{/each}
			{:else}
				<p class="text-sm text-slate-500">예정된 일정이 없습니다.</p>
			{/if}
		</CardContent>
	</Card>
</div>