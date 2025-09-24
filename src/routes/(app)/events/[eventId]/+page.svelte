<script lang="ts">
	import { Calendar, Clock, Video, MapPin, Users, Paperclip, Check, X, HelpCircle } from '@lucide/svelte';

	// --- Type Definitions ---
	type RsvpStatus = 'Attending' | 'Maybe' | 'Declined' | 'Pending';
	type Attendee = {
		id: string;
		name: string;
		avatar: string;
		status: RsvpStatus;
	};

	// --- Mock Data ---
	const event = {
		title: '1차 UI/UX 리뷰 미팅',
		groupName: '🚀 사이드 프로젝트 A팀',
		date: '2025년 9월 24일',
		day: '수요일',
		time: '14:00 - 15:00',
		location: {
			type: 'online',
			url: 'https://meet.google.com/sample-link'
		},
		description: '이번 스프린트에서 작업한 UI/UX 디자인 시안에 대한 피드백을 공유하고, 다음 단계의 액션 아이템을 논의하기 위한 미팅입니다. 참여 전 Figma 링크를 꼭 확인해주세요.',
		attachments: [
			{ name: '디자인 시안.fig', url: '#' }
		]
	};

	let attendees: Attendee[] = [
		{ id: 'm1', name: '김민준', avatar: '/avatars/01.png', status: 'Attending' },
		{ id: 'm2', name: '이서연', avatar: '/avatars/02.png', status: 'Attending' },
		{ id: 'm3', name: '박도윤', avatar: '/avatars/03.png', status: 'Declined' },
		{ id: 'm4', name: '최지우', avatar: '/avatars/04.png', status: 'Maybe' },
		{ id: 'm5', name: '정시우', avatar: '/avatars/05.png', status: 'Pending' }
	];

	// 현재 사용자의 RSVP 상태 (m5, 정시우라고 가정)
	let currentUserRsvp: RsvpStatus = 'Pending';

	function handleRsvp(status: RsvpStatus) {
		currentUserRsvp = status;
		// 실제 애플리케이션에서는 서버로 업데이트 요청
		const userIndex = attendees.findIndex(a => a.id === 'm5');
		if (userIndex !== -1) {
			attendees[userIndex].status = status;
			attendees = [...attendees];
		}
	}

	const getStatusInfo = (status: RsvpStatus) => {
		switch (status) {
			case 'Attending': return { icon: Check, color: 'text-success' };
			case 'Declined': return { icon: X, color: 'text-error' };
			case 'Maybe': return { icon: HelpCircle, color: 'text-warning' };
			default: return { icon: Clock, color: 'text-muted-foreground' };
		}
	};
</script>

<div class="w-full h-full p-6 bg-background font-sans text-foreground">
	<div class="bg-foreground text-background font-mono p-6 border-b-2 border-foreground">
		<p class="text-sm text-accent">{event.groupName}</p>
		<h1 class="text-4xl font-bold tracking-tighter mt-1">{event.title}</h1>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
		<div class="lg:col-span-2 space-y-8">
			<div class="border-2 border-foreground/10 p-6 rounded-lg">
				<h2 class="font-mono text-lg uppercase text-muted-foreground tracking-wider mb-4">// DETAILS</h2>
				<div class="space-y-4">
					<div class="flex items-start gap-4">
						<div class="bg-muted/50 p-2 rounded-lg"><Calendar class="text-accent" size={20} /></div>
						<div>
							<p class="font-bold">{event.date} ({event.day})</p>
							<p class="text-sm text-muted-foreground">{event.time}</p>
						</div>
					</div>
					<div class="flex items-start gap-4">
						{#if event.location.type === 'online'}
							<div class="bg-muted/50 p-2 rounded-lg"><Video class="text-accent" size={20} /></div>
							<div>
								<p class="font-bold">화상 회의</p>
								<a href={event.location.url} target="_blank" class="text-sm text-muted-foreground hover:text-accent transition-colors underline">
									{event.location.url}
								</a>
							</div>
						{:else}
							<div class="bg-muted/50 p-2 rounded-lg"><MapPin class="text-accent" size={20} /></div>
						{/if}
					</div>
				</div>
				<hr class="border-t border-dashed border-foreground/10 my-6" />
				<div class="text-sm leading-relaxed whitespace-pre-wrap">
					{event.description}
				</div>
			</div>

			{#if event.attachments.length > 0}
				<div class="border-2 border-foreground/10 p-6 rounded-lg">
					<h2 class="font-mono text-lg uppercase text-muted-foreground tracking-wider mb-4">// ATTACHMENTS</h2>
					<div class="space-y-3">
						{#each event.attachments as attachment}
							<a href={attachment.url} class="flex items-center gap-3 bg-muted/50 p-3 rounded-lg border border-transparent hover:border-accent/50 transition-colors">
								<Paperclip size={18} class="text-muted-foreground" />
								<span class="font-medium text-sm">{attachment.name}</span>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<div class="space-y-8">
			<div class="border-2 border-foreground/10 p-6 rounded-lg">
				<h2 class="font-mono text-lg uppercase text-muted-foreground tracking-wider mb-4">// YOUR STATUS</h2>
				<div class="grid grid-cols-3 gap-2 font-mono text-sm">
					<button
						on:click={() => handleRsvp('Attending')}
						class="py-3 border-2 transition-all {currentUserRsvp === 'Attending' ? 'bg-success text-success-foreground border-success' : 'border-foreground/20 hover:border-foreground'}"
					>ATTENDING</button>
					<button
						on:click={() => handleRsvp('Maybe')}
						class="py-3 border-2 transition-all {currentUserRsvp === 'Maybe' ? 'bg-warning text-warning-foreground border-warning' : 'border-foreground/20 hover:border-foreground'}"
					>MAYBE</button>
					<button
						on:click={() => handleRsvp('Declined')}
						class="py-3 border-2 transition-all {currentUserRsvp === 'Declined' ? 'bg-error text-error-foreground border-error' : 'border-foreground/20 hover:border-foreground'}"
					>DECLINED</button>
				</div>
			</div>

			<div class="border-2 border-foreground/10 p-6 rounded-lg">
				<h2 class="font-mono text-lg uppercase text-muted-foreground tracking-wider mb-4 flex items-center gap-2">
					<Users size={16} />
					<span>ATTENDEES ({attendees.length})</span>
				</h2>
				<div class="space-y-3">
					{#each attendees as attendee (attendee.id)}
						<div class="flex items-center gap-3">
							<img src={attendee.avatar} alt={attendee.name} class="w-8 h-8 rounded-full ring-2 ring-foreground/10" />
							<span class="font-medium flex-grow">{attendee.name}</span>
							<svelte:component this={getStatusInfo(attendee.status).icon} size={16} class={getStatusInfo(attendee.status).color} />
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>