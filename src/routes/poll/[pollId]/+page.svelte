<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import { CheckCircle2, Clock, Video } from '@lucide/svelte';
	import InteractiveCalendar from '$lib/calendar/InteractiveCalendar.svelte';
	import { TZDate } from '@date-fns/tz';

	// --- Mock Data ---
	const poll = {
		groupName: '🚀 사이드 프로젝트 A팀',
		duration: '30분'
	};
	const participants = [
		{ id: 'user1', name: '박상현', responded: true },
		{ id: 'user2', name: '김민지', responded: false },
		{ id: 'user3', name: '이서준', responded: true }
	];
	// ------------------
</script>

<main class="min-h-screen overflow-hidden">
	<div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 h-screen">

		<div class="col-span-1 md:col-span-1 lg:col-span-2 border-r flex flex-col p-4 space-y-6">
			<div>
				<p class="text-slate-500">{poll.groupName}</p>
				<div class="mt-4 space-y-2 text-sm text-slate-700">
					<p class="flex items-center gap-2"><Clock size={16}/> {poll.duration}</p>
				</div>
			</div>

			<div class="border-t pt-6">
				<!-- <MiniCalendar /> -->
			</div>

			<div class="border-t pt-6 mt-auto">
				<h3 class="text-lg font-semibold mb-4">진행 현황</h3>
				<div class="space-y-3 mb-6">
					{#each participants as participant}
						<div class="flex items-center gap-3">
							<Avatar class="h-8 w-8"><AvatarFallback>{participant.name.charAt(0)}</AvatarFallback></Avatar>
							<span class="flex-1 font-medium" class:text-slate-400={!participant.responded}>
								{participant.name}
							</span>
							{#if participant.responded}
								<CheckCircle2 class="h-5 w-5 text-green-500" />
							{/if}
						</div>
					{/each}
				</div>
				<div class="border-t pt-4">
					<div class="mb-4">
						<input type="text" placeholder="내 이름 입력..." class="w-full rounded-md border p-2 text-sm" />
					</div>
					<Button class="w-full">응답 완료하기</Button>
				</div>
			</div>
		</div>

		<div class="col-span-1 md:col-span-3 lg:col-span-4 h-screen overflow-hidden">
			<InteractiveCalendar today={new TZDate()} />
		</div>

	</div>
</main>
