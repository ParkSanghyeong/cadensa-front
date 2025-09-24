<script lang="ts">
	import InteractiveCalendar from '$lib/calendar/InteractiveCalendar.svelte';
	import type { ScheduleEvent } from '$lib/calendar/types';
	import { TZDate } from '@date-fns/tz';

	// 실제로는 API로부터 이 데이터를 받아옵니다.
	const weekDates = getWeekDates(new Date()); // 한 주의 날짜 배열을 만드는 헬퍼 함수
	const today = new TZDate();

	function handleCreateEvent(event: CustomEvent<ScheduleEvent>) {
		console.log("New event created!", event.detail);
		// 이 데이터를 백엔드 API로 전송하는 로직
	}

	function getWeekDates(date: Date): TZDate[] {
		const start = new TZDate(date);
		start.setDate(date.getDate() - date.getDay());
		return Array.from({ length: 7 }, (_, i) => {
			const day = new TZDate(start);
			day.setDate(start.getDate() + i);
			return new TZDate(day);
		});
	}
</script>

<div class="w-full h-[700px]">
	<InteractiveCalendar
		{weekDates}
		{today}
		on:create={handleCreateEvent}
	/>
</div>