<script lang="ts">
	import InteractiveCalendar from '$lib/calendar/InteractiveCalendar.svelte';
	import type { ScheduleEvent } from '$lib/calendar/types';
	import { TZDate } from '@date-fns/tz';

	// TODO: 실제 앱에서는 API를 통해 모든 그룹의 확정된 일정을 가져와야 합니다.
	// 현재는 InteractiveCalendar가 자체적으로 날짜를 관리하므로 props 전달이 간소화됩니다.
	const today = new TZDate();

	function handleCreateEvent(event: CustomEvent<ScheduleEvent>) {
		console.log("New event created on My Schedule page!", event.detail);
		// TODO: 이 데이터를 백엔드 API로 전송하는 로직
	}
</script>

<div class="flex h-full flex-col">
	<div class="p-8 pb-4">
		<h1 class="text-3xl font-bold text-slate-900">내 스케줄</h1>
		<p class="mt-2 text-slate-600">모든 그룹의 확정된 일정을 한 곳에서 확인하세요.</p>
	</div>
	<div class="flex-1 overflow-hidden px-8 pb-8">
		<div class="h-full w-full rounded-lg border bg-white">
			<InteractiveCalendar
				{today}
				on:create={handleCreateEvent}
			/>
		</div>
	</div>
</div>