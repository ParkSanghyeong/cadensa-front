<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { format, startOfDay } from 'date-fns';
	import { ko } from 'date-fns/locale';
	import { TZDate } from '@date-fns/tz';
	import type { ScheduleEvent } from './types';
	import { TIME_AXIS_WIDTH, CELL_HEIGHT, HEADER_HEIGHT } from './constants';
	import { calendar } from './calendar'; // 분리된 스토어 import
	import { draggable } from './useDraggable'; // 분리된 Action import
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';

	export let today: TZDate;
	const dispatch = createEventDispatcher<{ create: ScheduleEvent }>();

	let gridEl: HTMLElement;
	let selectionBox: { dayIndex: number; top: number; height: number } | null = null;
	let currentTimePosition = 0;
	let timer: ReturnType<typeof setInterval>;

	onMount(() => {
		const checkMobile = () => calendar.setIsMobile(window.innerWidth < 1024);
		checkMobile();
		window.addEventListener('resize', checkMobile);

		const updateCurrentTime = () => {
			const now = new TZDate();
			currentTimePosition = (now.getHours() * 60 + now.getMinutes()) / 15 * CELL_HEIGHT;
		};
		updateCurrentTime();
		timer = setInterval(updateCurrentTime, 60000);

		return () => {
			window.removeEventListener('resize', checkMobile);
			clearInterval(timer);
		};
	});

	function isSameDay(d1: Date, d2: Date) { return startOfDay(d1).getTime() === startOfDay(d2).getTime(); }

	// Action에서 전달된 이벤트 처리
	function handleDrag(detail: { start: TZDate, current: TZDate } | null) {
		if (!detail) {
			selectionBox = null;
			return;
		}
		const start = detail.start < detail.current ? detail.start : detail.current;
		const end = detail.start < detail.current ? detail.current : detail.start;
		const dayIndex = $calendar.displayedDates.findIndex((d) => isSameDay(d, start));

		if (dayIndex === -1) return;

		const startMinutes = start.getHours() * 60 + start.getMinutes();
		const endMinutes = end.getHours() * 60 + end.getMinutes() + 15;

		selectionBox = { dayIndex, top: (startMinutes / 15) * CELL_HEIGHT, height: ((endMinutes - startMinutes) / 15) * CELL_HEIGHT };
	}

	function handleDragEnd(e: CustomEvent<{ start: TZDate, end: TZDate }>) {
		const { start, end } = e.detail;
		if (!start || !end) {
			handleDrag(null);
			return;
		}

		const finalStart = start < end ? start : end;
		const finalEnd = start < end ? end : start;
		const finalEndDate = new TZDate(finalEnd.getTime() + 15 * 60 * 1000);

		dispatch('create', {
			start: { epochSecond: Math.floor(finalStart.getTime() / 1000), timeZone: 'Asia/Seoul' },
			end: { epochSecond: Math.floor(finalEndDate.getTime() / 1000), timeZone: 'Asia/Seoul' },
			title: '새로운 일정'
		});
		handleDrag(null);
	}
</script>

<div class="flex h-full w-full select-none flex-col overflow-hidden bg-gray-50 font-mono">
	<div class="flex shrink-0 items-center justify-between border-b border-gray-200 p-4">
		<div class="flex items-center gap-2">
			<button on:click={() => calendar.navigate('today')} class="bg-black text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">Today</button>
			<button on:click={() => calendar.navigate('prev')} class="p-2 text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"><ChevronLeft size={18}/></button>
			<button on:click={() => calendar.navigate('next')} class="p-2 text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"><ChevronRight size={18}/></button>
			<span class="text-base font-bold text-black">{$calendar.headerTitle}</span>
		</div>
		<div class="hidden items-center gap-2 md:flex">
			<div class="flex rounded-full bg-gray-100 p-1 text-xs font-bold">
				<button on:click={() => calendar.setView('day')} class="px-3 py-1.5 rounded-full" class:bg-white={$calendar.currentView === 'day'} class:shadow-sm={$calendar.currentView === 'day'} class:text-black={$calendar.currentView === 'day'}>하루</button>
				<button on:click={() => calendar.setView('week')} class="px-3 py-1.5 rounded-full" class:bg-white={$calendar.currentView === 'week'} class:shadow-sm={$calendar.currentView === 'week'} class:text-black={$calendar.currentView === 'week'}>일주일</button>
			</div>
		</div>
	</div>

	<div class="grid shrink-0 items-center border-b border-gray-200" style="grid-template-columns: {TIME_AXIS_WIDTH}px repeat({$calendar.displayedDates.length}, 1fr); height: {HEADER_HEIGHT}px;">
		<div class="border-r border-gray-200 h-full"></div>
		{#each $calendar.displayedDates as date}
			<div class="flex items-center justify-center gap-1 border-r border-gray-200 p-1 text-center last:border-r-0">
				<div class="text-xs text-gray-500">{format(date, 'EEE')}</div>
				<div class="flex h-8 w-8 items-center justify-center rounded-full text-xl font-bold" class:bg-black={isSameDay(date, today)} class:text-white={isSameDay(date, today)}>
					{format(date, 'd')}
				</div>
			</div>
		{/each}
	</div>

	<div class="relative flex-grow overflow-y-auto">
		<div
			bind:this={gridEl}
			role="grid"
			class="relative grid"
			style="grid-template-columns: {TIME_AXIS_WIDTH}px repeat({$calendar.displayedDates.length}, 1fr);"
			use:draggable={{ displayedDates: $calendar.displayedDates }}
			on:dragstart={(e) => handleDrag(e.detail)}
			on:dragmove={(e) => handleDrag(e.detail)}
			on:dragend={handleDragEnd}
		>
			<div class="border-r border-gray-200">
				{#each { length: 24 } as _, i}
					<div class="relative text-right" style="height: {CELL_HEIGHT * 4}px">
						{#if i > 0}
        <span class="absolute -top-2.5 left-2 pr-2 text-xs text-gray-400">
         {format(new Date(2000, 0, 1, i), 'ha')}
        </span>
						{/if}
					</div>
				{/each}
			</div>

			{#each $calendar.displayedDates as day, dayIndex}
				<div role="gridcell" class="relative border-r border-gray-200 last:border-r-0">
					<div class="pointer-events-none absolute inset-0 z-0">
						{#each { length: 96 } as _, cellIndex}
							<div class="border-b" class:border-gray-200={(cellIndex + 1) % 4 === 0} class:border-gray-100={(cellIndex + 1) % 4 !== 0} style="height: {CELL_HEIGHT}px"/>
						{/each}
					</div>
					{#if selectionBox && selectionBox.dayIndex === dayIndex}
						<div class="pointer-events-none absolute z-10 rounded-lg border border-black bg-black/10" style="top: {selectionBox.top}px; height: {selectionBox.height}px; left: 0; right: 0;"/>
					{/if}
				</div>
			{/each}
			{#if $calendar.displayedDates.some(d => isSameDay(d, today))}
				<div class="pointer-events-none absolute z-20 flex items-center" style="left: {TIME_AXIS_WIDTH}px; right: 0; top: {currentTimePosition}px;">
					<div class="absolute -ml-1.5 h-3 w-3 rounded-full bg-red-500 border-2 border-white"></div>
					<div class="h-0.5 w-full bg-red-500"></div>
				</div>
			{/if}
		</div>
	</div>
</div>