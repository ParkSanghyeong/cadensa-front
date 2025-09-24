<script lang="ts">
	import { onMount } from 'svelte';
	import { format, subDays, isToday, isYesterday } from 'date-fns';
	import LogFilters from './_components/LogFilters.svelte';
	import LogItem from './_components/LogItem.svelte';
	import EmptyState from './_components/EmptyState.svelte';
	import { Inbox, Filter } from '@lucide/svelte';
	import type { NotificationLog, LogType } from './_components/types';

	// --- Mock Data (Updated to NotificationLog type) ---
	const now = new Date();
	// prettier-ignore
	const notifications: NotificationLog[] = [
		{ id: 'l1', type: 'INVITE', message: '김민지님이 회원님을 그룹에 초대했습니다.', metadata: { Group: 'PROJECT_ALPHA', Event: 'e1' }, isRead: false, createdAt: subDays(now, 0).getTime(), referenceUrl: '/groups/alpha' },
		{ id: 'l2', type: 'EVENT', message: '박도윤님이 일정을 확정했습니다.', metadata: { Event: '1차 UI/UX 리뷰 미팅' }, isRead: false, createdAt: subDays(now, 0).getTime(), referenceUrl: '/events/123' },
		{ id: 'l3', type: 'GROUP', message: '이서연님이 그룹 설명을 변경했습니다.', metadata: { Group: 'CS 스터디' }, isRead: true, createdAt: subDays(now, 1).getTime(), referenceUrl: '/groups/cs-study' },
		{ id: 'l4', type: 'SYSTEM', message: 'System에서 서버 정기 점검이 완료되었습니다.', metadata: { Version: 'v1.2.1' }, isRead: true, createdAt: subDays(now, 1).getTime() },
		{ id: 'l5', type: 'EVENT', message: '김민준님이 새로운 시간 조율을 시작했습니다.', metadata: { Event: '최종 결과물 발표' }, isRead: true, createdAt: subDays(now, 2).getTime(), referenceUrl: '/events/456' },
		{ id: 'l11', type: 'INVITE', message: '김민지님이 회원님을 그룹에 초대했습니다.', metadata: { Group: 'PROJECT_ALPHA' }, isRead: false, createdAt: subDays(now, 0).getTime(), referenceUrl: '/groups/alpha' },
		{ id: 'l21', type: 'EVENT', message: '박도윤님이 일정을 확정했습니다.', metadata: { Event: '1차 UI/UX 리뷰 미팅' }, isRead: false, createdAt: subDays(now, 0).getTime(), referenceUrl: '/events/123' },
		{ id: 'l31', type: 'GROUP', message: '이서연님이 그룹 설명을 변경했습니다.', metadata: { Group: 'CS 스터디' }, isRead: true, createdAt: subDays(now, 1).getTime(), referenceUrl: '/groups/cs-study' },
		{ id: 'l41', type: 'SYSTEM', message: 'System에서 서버 정기 점검이 완료되었습니다.', metadata: { Version: 'v1.2.1' }, isRead: true, createdAt: subDays(now, 1).getTime() },
		{ id: 'l51', type: 'EVENT', message: '김민준님이 새로운 시간 조율을 시작했습니다.', metadata: { Event: '최종 결과물 발표' }, isRead: true, createdAt: subDays(now, 2).getTime(), referenceUrl: '/events/456' },

	];

	let mounted = false;
	onMount(() => (mounted = true));

	// --- State Management ---
	let selectedDateRange: 'Today' | '7d' | '30d' | 'Custom' = '7d';
	let selectedLogTypes = new Set<LogType>(['SYSTEM', 'INVITE', 'EVENT', 'GROUP']);

	// --- Reactive Data Processing ---
	$: filteredNotifications = notifications.filter(log => {
		return selectedLogTypes.has(log.type);
	});

	$: groupedNotifications = filteredNotifications.reduce((acc, log) => {
		const dateKey = format(new Date(log.createdAt), 'yyyy-MM-dd');
		if (!acc[dateKey]) acc[dateKey] = [];
		acc[dateKey].push(log);
		return acc;
	}, {} as Record<string, NotificationLog[]>);

	// --- UI Helpers ---
	const formatDateGroup = (dateKey: string) => {
		const date = new Date(dateKey);
		if (isToday(date)) return 'Today';
		if (isYesterday(date)) return 'Yesterday';
		return format(date, 'yyyy년 M월 d일');
	};
</script>

{#if mounted}
	<div class="w-full min-h-[calc(100vh-60px)] bg-background text-foreground font-sans flex flex-col">
		<header class="bg-foreground text-background font-mono p-6 border-b-2 border-foreground">
			<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 class="text-3xl font-bold tracking-tighter">Activity <span class="text-green-400">Log</span></h1>
					<p class="mt-2 text-background/60 text-sm font-sans">// System events, invitations, and schedule changes.</p>
				</div>
				<button class="font-mono text-sm uppercase px-4 py-2 border-2 border-background/50 bg-transparent text-background/80 transition-all hover:bg-background hover:text-foreground">
					Mark all as read
				</button>
			</div>
		</header>

		<div class="flex-grow flex flex-col lg:flex-row">
			<LogFilters bind:selectedDateRange bind:selectedLogTypes />

			<main class="flex-1 overflow-y-auto p-6 md:p-8">
				{#if notifications.length === 0}
					<EmptyState icon={Inbox} title="No Activity Yet" message="When something happens, you'll see it here." />
				{:else if filteredNotifications.length === 0}
					<EmptyState icon={Filter} title="No Matching Logs Found" message="Try adjusting your filters." />
				{:else}
					<div class="space-y-6">
						{#each Object.entries(groupedNotifications) as [dateKey, notificationsForDate]}
							<div class="relative">
								<h3 class="font-mono text-sm text-muted-foreground font-semibold bg-background pr-4 inline-block">{formatDateGroup(dateKey)}</h3>
								<div class="space-y-2 mt-3">
									{#each notificationsForDate as notification (notification.id)}
										<LogItem notification={notification} />
									{/each}
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</main>
		</div>
	</div>
{/if}