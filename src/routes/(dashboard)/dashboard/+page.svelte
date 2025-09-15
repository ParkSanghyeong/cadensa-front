<script lang="ts">
	import authStore from '$lib/stores/authStore';
</script>

<div class="w-full">
	<h1 class="text-3xl font-bold text-slate-900">
		안녕하세요, {$authStore.user?.name || '사용자'}님!
	</h1>
	<p class="mt-2 text-slate-600">오늘의 일정을 확인하고 새로운 그룹 약속을 잡아보세요.</p>

	<div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		<div class="rounded-lg border border-slate-200 bg-white p-6">
			<h3 class="text-lg font-semibold">내 그룹</h3>
			<p class="mt-2 text-slate-600">현재 3개의 그룹에 참여하고 있습니다.</p>
			<a href="/groups" class="mt-4 inline-block text-sm font-medium text-primary hover:underline">그룹 관리하기 →</a>
		</div>
		<div class="rounded-lg border border-slate-200 bg-white p-6">
			<h3 class="text-lg font-semibold">다가오는 일정</h3>
			<p class="mt-2 text-slate-600">오늘 오후 3시, '팀 프로젝트 회의'가 있습니다.</p>
			<a href="/calendar" class="mt-4 inline-block text-sm font-medium text-primary hover:underline">전체 일정 보기 →</a>
		</div>
		<div class="rounded-lg border border-slate-200 bg-white p-6">
			<h3 class="text-lg font-semibold">새 일정 만들기</h3>
			<p class="mt-2 text-slate-600">새로운 그룹 일정을 생성하여 멤버들을 초대하세요.</p>
			<a href="/events/new" class="mt-4 inline-block text-sm font-medium text-primary hover:underline">생성하기 →</a>
		</div>
	</div>
</div>