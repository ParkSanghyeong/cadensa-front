<script lang="ts">
	import InteractiveCalendar from '$lib/calendar/InteractiveCalendar.svelte';
	import { TZDate } from '@date-fns/tz';
	import { CheckCircle2, Clock, Video, User, ChevronRight } from '@lucide/svelte';

	// --- Mock Data ---
	const poll = {
		title: '2차 개발 스프린트 계획',
		groupName: '사이드 프로젝트 A팀',
		duration: '30분',
		type: '화상 회의'
	};
	const participants = [
		{ id: 'user1', name: '박상현', responded: true },
		{ id: 'user2', name: '김민지', responded: false },
		{ id: 'user3', name: '이서준', responded: true }
	];
	// ------------------
</script>

<main class="min-h-screen bg-background text-foreground font-sans overflow-hidden">
	<div class="grid grid-cols-1 lg:grid-cols-5 h-screen">
		<div class="col-span-1 lg:col-span-2 bg-muted/30 border-r-2 border-foreground/10 flex flex-col p-6">
			<div class="font-mono pb-6">
				<p class="text-sm text-accent">{poll.groupName}</p>
				<h1 class="text-3xl font-bold text-foreground my-2">{poll.title}</h1>
				<div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
					<span class="flex items-center gap-1.5"><Clock size={14} /> {poll.duration}</span>
					<span class="flex items-center gap-1.5"><Video size={14} /> {poll.type}</span>
				</div>
			</div>

			<div class="border-t-2 border-foreground/10 pt-6 space-y-4 flex-grow">
				<h3 class="font-mono uppercase text-sm text-muted-foreground tracking-wider">[PARTICIPANTS] ({participants.length})</h3>
				<div class="space-y-3">
					{#each participants as participant}
						<div class="flex items-center gap-3 text-sm transition-opacity" class:opacity-50={!participant.responded}>
							<div class="flex h-8 w-8 items-center justify-center rounded-full bg-background border border-foreground/20 text-muted-foreground">
								{participant.name.charAt(0)}
							</div>
							<span class="flex-1 font-medium">{participant.name}</span>
							{#if participant.responded}
								<CheckCircle2 class="h-5 w-5 text-success" />
								<span class="font-mono text-xs text-success">DONE</span>
							{:else}
								<span class="font-mono text-xs text-muted-foreground">PENDING</span>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<div class="border-t-2 border-foreground/10 pt-6 mt-auto font-mono">
				<div class="mb-4">
					<label for="userName" class="text-xs text-muted-foreground mb-2 block">// ENTER YOUR NAME</label>
					<div class="relative flex items-center">
						<User size={16} class="absolute left-3 text-muted-foreground" />
						<input
							type="text"
							id="userName"
							placeholder="Your name..."
							class="w-full bg-background border-2 border-foreground/20 px-4 py-3 pl-9 focus:border-accent outline-none transition-colors"
						/>
					</div>
				</div>
				<button class="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground px-4 py-3 text-sm uppercase font-bold tracking-wider transition-all hover:opacity-80">
					응답 완료하기
					<ChevronRight size={16} />
				</button>
			</div>
		</div>

		<div class="col-span-1 lg:col-span-3 h-screen overflow-hidden">
			<InteractiveCalendar today={new TZDate()} />
		</div>
	</div>
</main>