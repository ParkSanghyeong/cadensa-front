<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = false;
	let currentTime = new Date();
	let currentScheduleIndex = 0;
	let scheduleInterval: ReturnType<typeof setInterval>;

	const dashboardData = {
		upcomingEvents: [
			{ id: 'e1', time: '14:00 — 15:00', date: '2025.09.20', title: '팀 프로젝트 회의', group: 'PROJECT_ALPHA', status: 'CONFIRMED', attendees: 5 },
			{ id: 'e2', time: '19:00 — 20:30', date: '2025.09.20', title: 'CS 스터디 세션', group: 'STUDY_GROUP', status: 'PENDING', attendees: 8 },
			{ id: 'e3', time: '21:30 — 23:00', date: '2025.09.21', title: '영화 감상 모임', group: 'MOVIE_CLUB', status: 'CONFIRMED', attendees: 12 }
		],
		notifications: [
			{ id: 'n1', type: 'INVITE', message: '김민지님이 "프로젝트 회의"에 초대했습니다', time: '5분 전', unread: true },
			{ id: 'n2', type: 'SCHEDULE', message: '"CS 스터디 세션" 시간이 변경되었습니다', time: '1시간 전', unread: true },
			{ id: 'n3', type: 'REMINDER', message: '오늘 오후 2시 회의가 예정되어 있습니다', time: '2시간 전', unread: false },
			{ id: 'n4', type: 'SYSTEM', message: '서버 점검이 9월 21일 02:00에 예정되어 있습니다.', time: '8시간 전', unread: false },
			{ id: 'n5', type: 'MENTION', message: '박도윤님이 "기획서_v2" 문서에 회원님을 언급했습니다.', time: '1일 전', unread: false },
		]
	};

	const totalSchedules = dashboardData.upcomingEvents.length;
	$: unreadCount = dashboardData.notifications.filter((n) => n.unread).length;

	const handleScheduleNav = (direction: 'next' | 'prev') => {
		clearInterval(scheduleInterval);
		if (direction === 'next') {
			currentScheduleIndex = (currentScheduleIndex + 1) % totalSchedules;
		} else {
			currentScheduleIndex = (currentScheduleIndex - 1 + totalSchedules) % totalSchedules;
		}
		startAutoSlide();
	};

	const goToSchedule = (index: number) => {
		clearInterval(scheduleInterval);
		currentScheduleIndex = index;
		startAutoSlide();
	};

	const startAutoSlide = () => {
		scheduleInterval = setInterval(() => handleScheduleNav('next'), 7000);
	};

	const formatTime = (date: Date) => date.toLocaleTimeString('en-US', { hour12: false });

	const getStatusIndicator = (status: string) => {
		switch (status) {
			case 'CONFIRMED': return { symbol: '●', class: 'text-green-400' };
			case 'PENDING': return { symbol: '◐', class: 'text-yellow-400' };
			default: return { symbol: '○', class: 'text-gray-500' };
		}
	};

	onMount(() => {
		mounted = true;
		const timeInterval = setInterval(() => {
			currentTime = new Date();
		}, 1000);
		startAutoSlide();
		return () => {
			clearInterval(timeInterval);
			clearInterval(scheduleInterval);
		};
	});
</script>

{#if mounted}
	<div class="min-h-[calc(100vh-60px)] font-mono bg-gray-50 p-6 space-y-6">
		<div class="bg-black p-6 overflow-hidden relative">
			<div class="absolute inset-0 opacity-10">
				<div class="absolute inset-0" style="background-image: linear-gradient(rgba(0, 255, 0, 0.3) 1px, transparent 1px), linear-gradient(to right, rgba(0, 255, 0, 0.3) 1px, transparent 1px); background-size: 2rem 2rem;"></div>
			</div>
			<div class="relative z-10">
				<div class="flex justify-between items-start mb-4">
					<h1 class="text-4xl font-bold text-white tracking-tight">Upcoming <span class="text-green-400">Events</span></h1>
					<div class="text-right text-green-400 text-xs space-y-1">
						<div>TimeZone: KST</div>
						<div>Now: {formatTime(currentTime)}</div>
					</div>
				</div>
				<div class="relative my-6 h-48 overflow-hidden">
					<div class="absolute top-0 left-0 h-full flex transition-transform duration-500 ease-in-out" style="width: {totalSchedules * 100}%; transform: translateX(-{currentScheduleIndex * (100 / totalSchedules)}%);">
						{#each dashboardData.upcomingEvents as event (event.id)}
							<div class="p-2" style="width: {100 / totalSchedules}%">
								<div class="bg-gray-900/50 border border-gray-700 rounded-2xl p-4 h-full flex flex-col justify-between">
									<div>
										<div class="flex justify-between items-start mb-2">
											<div class="font-mono text-green-400 text-sm">{event.time}</div>
											<div class="flex items-center space-x-1 text-xs">
												<span class={getStatusIndicator(event.status).class}>{getStatusIndicator(event.status).symbol}</span>
												<span>{event.status}</span>
											</div>
										</div>
										<h3 class="font-bold text-white text-lg mb-2">{event.title}</h3>
									</div>
									<div class="flex items-center space-x-2 text-xs">
										<div class="w-7 h-7 rounded-full flex items-center justify-center bg-gray-800">👥</div>
										<div>
											<div class="font-mono text-gray-300">{event.group}</div>
											<div class="text-[10px] text-gray-400">{event.attendees} members</div>
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="absolute top-1/2 left-0 right-0 flex justify-between items-center px-1 z-20">
					<button on:click={() => handleScheduleNav('prev')} class="w-8 h-8 bg-gray-800/50 hover:bg-gray-700 rounded-full text-green-400 flex items-center justify-center transition-all" aria-label="Previous event">←</button>
					<button on:click={() => handleScheduleNav('next')} class="w-8 h-8 bg-gray-800/50 hover:bg-gray-700 rounded-full text-green-400 flex items-center justify-center transition-all" aria-label="Next event">→</button>
				</div>
				<div class="flex justify-center space-x-1">
					{#each { length: totalSchedules } as _, index}
						<button on:click={() => goToSchedule(index)} class="h-2 w-2 rounded-full transition-all {currentScheduleIndex === index ? 'bg-green-400 w-4' : 'bg-gray-700 hover:bg-gray-600'}" aria-label="Go to event {index + 1}"></button>
					{/each}
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<div class="lg:col-span-1">
				<div class="bg-white p-6 shadow-sm border border-gray-200 h-full rounded-2xl">
					<h2 class="text-xl font-bold text-black mb-6">Quick Actions</h2>
					<div class="flex flex-col gap-4">
						<a href="/groups" class="group flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-black transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
							<div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-black group-hover:bg-gray-800 group-hover:text-green-400 transition-all duration-300">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
							</div>
							<div>
								<div class="font-bold text-base text-black group-hover:text-white transition-colors duration-300">내 그룹</div>
								<div class="text-xs text-gray-500 group-hover:text-gray-300 transition-colors duration-300">그룹 관리 및 현황</div>
							</div>
						</a>
						<a href="/events/new" class="group flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-black transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
							<div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-black group-hover:bg-gray-800 group-hover:text-green-400 transition-all duration-300">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
							</div>
							<div>
								<div class="font-bold text-base text-black group-hover:text-white transition-colors duration-300">새 일정</div>
								<div class="text-xs text-gray-500 group-hover:text-gray-300 transition-colors duration-300">이벤트 생성</div>
							</div>
						</a>
					</div>
				</div>
			</div>

			<div class="lg:col-span-2">
				<div class="bg-white p-6 shadow-sm border border-gray-200 h-full rounded-2xl">
					<div class="flex justify-between items-center mb-6">
						<h2 class="text-xl font-bold text-black">Notifications</h2>
						<div class="bg-black text-white text-[10px] font-mono px-3 py-1 rounded-full">{unreadCount} unread</div>
					</div>
					<div class="space-y-3">
						{#each dashboardData.notifications as notification (notification.id)}
							<div class="p-4 rounded-2xl border-2 transition-all cursor-pointer hover:shadow-md {notification.unread ? 'border-black bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-300'}">
								<div class="flex justify-between items-start mb-2">
									<div class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full {notification.unread ? 'bg-black text-green-400' : 'bg-gray-200 text-gray-500'}">
										[{notification.type}]
									</div>
									<span class="text-[10px] text-gray-400 font-mono">{notification.time}</span>
								</div>
								<div class="text-xs leading-snug {notification.unread ? 'text-black font-medium' : 'text-gray-600'}">
									{notification.message}
								</div>
								{#if notification.unread}
									<div class="mt-2 w-full h-px bg-gradient-to-r from-black via-gray-300 to-transparent"></div>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}