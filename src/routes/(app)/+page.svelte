<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowRight } from '@lucide/svelte';
	import GoogleIcon from '$lib/components/icons/GoogleIcon.svelte';
</script>

<div class="flex flex-col items-center justify-center pt-20 text-center">
	<section class="max-w-3xl">
		<h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
			그룹 일정을 손쉽게, <br />
			<span class="text-primary">Cadensa</span>와 함께
		</h1>
		<p class="mt-6 text-lg leading-8 text-slate-600">
			복잡한 단체 일정 조율은 이제 그만. Cadensa를 통해 팀, 스터디 그룹,
			친구들과의 약속을 스마트하게 관리하고 모두가 만족하는 최적의 시간을
			찾아보세요.
		</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<Button href="/login" size="lg">
				<GoogleIcon class="mr-2 h-5 w-5" />
				Getting started
				<ArrowRight class="mr-2 h-5 w-5" />
			</Button>
		</div>
	</section>

	<section class="mt-24 w-full max-w-5xl">
		<div class="text-center">
			<h2 class="text-3xl font-bold tracking-tight text-slate-900">주요 기능</h2>
			<p class="mt-4 text-md text-slate-600">그룹 일정 관리를 위한 모든 것</p>
		</div>
		<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h3 class="text-lg font-semibold">그룹 생성</h3>
				<p class="mt-2 text-slate-600">프로젝트, 팀, 스터디 등 목적에 맞는 다양한 그룹을 무제한으로 생성하세요.</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h3 class="text-lg font-semibold">가능 시간 입력</h3>
				<p class="mt-2 text-slate-600">멤버들은 각자 가능한 시간을 캘린더에 간편하게 표시할 수 있습니다.</p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-sm">
				<h3 class="text-lg font-semibold">최적 시간 제안</h3>
				<p class="mt-2 text-slate-600">모두의 가능 시간을 분석하여 겹치는 최적의 미팅 시간을 자동으로 찾아줍니다.</p>
			</div>
		</div>
	</section>
</div>