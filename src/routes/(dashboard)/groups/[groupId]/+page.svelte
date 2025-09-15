<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';

	export let data: PageData;
	const { group, members, events } = data;
</script>

<div class="w-full">
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-slate-900">{group.name}</h1>
		<p class="mt-2 text-slate-600">{group.description}</p>
		<div class="mt-4 flex gap-2">
			<Button>+ 새 일정 만들기</Button>
			<Button variant="outline">멤버 초대</Button>
		</div>
	</div>

	<Tabs value="schedule" class="w-full">
		<TabsList>
			<TabsTrigger value="schedule">일정</TabsTrigger>
			<TabsTrigger value="members">멤버 ({members.length})</TabsTrigger>
		</TabsList>

		<TabsContent value="schedule" class="mt-4">
			<Card>
				<CardHeader>
					<CardTitle>예정된 일정</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					{#if events.length > 0}
						{#each events as event (event.id)}
							<div class="flex items-center justify-between">
								<div>
									<p class="font-semibold">{event.title}</p>
									<p class="text-sm text-slate-600">{event.date.toLocaleDateString()} &middot; {event.time}</p>
								</div>
								<span class="rounded-full px-2 py-0.5 text-xs"
											class:bg-blue-100={event.status === '확정'}
											class:text-blue-800={event.status === '확정'}
											class:bg-yellow-100={event.status === '조율중'}
											class:text-yellow-800={event.status === '조율중'}
								>{event.status}</span>
							</div>
						{/each}
					{:else}
						<p class="text-sm text-slate-500">예정된 일정이 없습니다.</p>
					{/if}
				</CardContent>
			</Card>
		</TabsContent>

		<TabsContent value="members" class="mt-4">
			<Card>
				<CardHeader>
					<CardTitle>멤버 목록</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					{#each members as member (member.id)}
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-3">
								<Avatar>
									<AvatarImage src={member.avatar} alt={member.name} />
									<AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
								</Avatar>
								<span class="font-medium">{member.name}</span>
							</div>
							<span class="text-sm text-slate-500">{member.role}</span>
						</div>
					{/each}
				</CardContent>
			</Card>
		</TabsContent>
	</Tabs>
</div>