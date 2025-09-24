<script lang="ts">
	import { ArrowRight, Bot, CalendarDays, Users } from '@lucide/svelte';
	import GoogleIcon from '$lib/components/icons/GoogleIcon.svelte';

	const features = [
		{
			icon: Users,
			title: '1. 그룹 생성',
			description: '모든 일정 조율은 그룹에서 시작됩니다. 스터디, 팀 프로젝트 등 목적에 맞는 그룹을 만드세요.'
		},
		{
			icon: CalendarDays,
			title: '2. 시간 공유',
			description: '그룹 멤버들은 캘린더에서 가능한 시간을 드래그하여 간편하게 자신의 일정을 공유합니다.'
		},
		{
			icon: Bot,
			title: '3. 최적 시간 확인',
			description: 'Cadensa가 모두의 일정을 취합하여 모두가 만날 수 있는 최적의 시간대를 찾아 제안합니다.'
		}
	];
</script>

<div class="w-full bg-background text-foreground font-sans flex flex-col lg:flex-row">
	<section class="relative w-full lg:w-3/5 h-[calc(100vh-60px)] bg-foreground text-background font-mono flex flex-col p-8 md:p-12">
		<div class="relative z-10 flex flex-col flex-grow justify-center">
			<h1 class="text-4xl font-bold tracking-tight sm:text-5xl text-left">
				그룹 중심 스케줄링,<br />
				<span class="text-green-400">Cadensa</span>
			</h1>
			<p class="mt-6 text-lg leading-relaxed text-background/70 max-w-lg text-left font-sans">
				// 그룹을 만들고, 멤버들과 가능한 시간을 공유하세요. Cadensa가 최적의 시간을 찾아드립니다.
			</p>
			<div class="mt-10 flex items-center justify-start">
				<a
					href="/login"
					class="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 text-sm uppercase font-bold tracking-wider transition-all hover:bg-green-400 hover:text-black border-2 border-transparent hover:border-black"
				>
					<GoogleIcon class="h-5 w-5" />
					<span>START WITH GOOGLE</span>
					<ArrowRight class="h-5 w-5" />
				</a>
			</div>
		</div>
	</section>

	<section class="hidden lg:flex w-full lg:w-2/5 h-[calc(100vh-60px)] flex-col p-8 md:p-12 overflow-y-auto">
		<div class="my-auto">
			<h2 class="text-3xl font-bold tracking-tight font-mono sm:text-4xl text-foreground mb-10">> How It Works</h2>

			<div class="space-y-8">
				{#each features as feature}
					<div class="flex items-start gap-6">
						<div class="flex-shrink-0">
							<div class="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center border border-foreground/10">
								<svelte:component this={feature.icon} class="text-accent" size={24} aria-hidden="true" />
							</div>
						</div>
						<div>
							<h3 class="text-lg font-bold font-mono text-foreground">{feature.title}</h3>
							<p class="mt-1 text-muted-foreground text-sm">{feature.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</div>