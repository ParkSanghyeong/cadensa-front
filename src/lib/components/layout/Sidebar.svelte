<script lang="ts">
	import { page } from '$app/stores';
	import authStore from '$lib/stores/authStore';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import SidebarLink from '$lib/components/layout/SidebarLink.svelte';
	import { LayoutDashboard, CalendarDays, Users, LogOut, PlusCircle } from '@lucide/svelte';

	// --- 데이터 로딩 (실제 앱에서는 API 호출) ---
	import { mockGroups } from '$lib/data/mockGroups';

	// 고정 네비게이션 링크
	const mainLinks = [
		{ href: '/dashboard', label: '대시보드', icon: LayoutDashboard },
		{ href: '/schedule', label: '내 스케줄', icon: CalendarDays }
	];

	function handleLogout() {
		authStore.set({ isLoggedIn: false, user: null });
		goto('/');
	}
</script>

<aside class="flex h-screen w-64 flex-col border-r bg-white">
	<div class="border-b p-4">
		<a href="/" class="text-2xl font-bold text-slate-900">Cadensa</a>
	</div>

	<nav class="p-4">
		{#each mainLinks as link}
			<SidebarLink href={link.href} label={link.label} icon={link.icon} />
		{/each}
	</nav>

	<div class="flex-1 overflow-y-auto px-4">
		<div class="mb-2 flex items-center justify-between">
			<h2 class="text-sm font-semibold text-slate-500">내 그룹</h2>
			<Button variant="ghost" size="icon" class="h-7 w-7">
				<PlusCircle class="h-4 w-4 text-slate-500" />
			</Button>
		</div>
		<div class="space-y-1">
			{#each mockGroups as group (group.id)}
				<a
					href="/groups/{group.id}"
					class="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors"
					class:bg-slate-100={$page.url.pathname.startsWith(`/groups/${group.id}`)}
					class:text-slate-900={$page.url.pathname.startsWith(`/groups/${group.id}`)}
					class:text-slate-600={!$page.url.pathname.startsWith(`/groups/${group.id}`)}
					class:hover:bg-slate-100={true}
				>
					<span class="truncate font-medium">{group.name}</span>
				</a>
			{/each}
		</div>
	</div>


	<div class="mt-auto border-t p-4">
		<div class="flex items-center gap-4">
			<div
				class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-600"
			>
				{$authStore.user?.name?.charAt(0) ?? 'G'}
			</div>
			<div class="flex-1">
				<p class="text-sm font-semibold text-slate-800">{$authStore.user?.name ?? 'Guest'}</p>
				<p class="text-xs text-slate-500">{$authStore.user?.email ?? 'Welcome!'}</p>
			</div>
			<Button on:click={handleLogout} variant="ghost" size="icon">
				<LogOut class="h-5 w-5 text-slate-600" />
			</Button>
		</div>
	</div>
</aside>