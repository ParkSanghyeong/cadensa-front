<script lang="ts">
	import { page } from '$app/stores';
	import authStore from '$lib/stores/authStore';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';

	// 1. 재사용할 링크 컴포넌트와 아이콘들을 임포트합니다.
	import SidebarLink from '$lib/components/layout/SidebarLink.svelte';
	import { LayoutDashboard, Users, LogOut } from '@lucide/svelte'

	// 2. 네비게이션 링크들을 데이터 배열로 관리합니다.
	//    새로운 메뉴를 추가하려면 이 배열에 객체 하나만 추가하면 됩니다.
	const navLinks = [
		{ href: '/dashboard', label: '대시보드', icon: LayoutDashboard },
		{ href: '/groups', label: '내 그룹', icon: Users },
		// 예시: { href: '/settings', label: '설정', icon: Settings },
	];

	// 3. 로그아웃 함수는 그대로 유지합니다.
	function handleLogout() {
		authStore.set({ isLoggedIn: false, user: null });
		goto('/');
	}
</script>

<aside class="flex h-screen w-64 flex-col border-r bg-white">
	<div class="border-b p-4">
		<a href="/" class="text-2xl font-bold text-slate-900">Cadensa</a>
	</div>

	<nav class="flex-1 space-y-1 p-4">
		{#each navLinks as link (link.href)}
			<SidebarLink href={link.href} label={link.label} icon={link.icon} />
		{/each}
	</nav>

	<div class="mt-auto border-t p-4">
		<div class="flex items-center gap-4">
			<div class="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
				{$authStore.user?.name?.charAt(0) ?? 'G'}
			</div>

			<div class="flex-1">
				<p class="text-sm font-semibold text-slate-800">
					{$authStore.user?.name ?? 'Guest'}
				</p>
				<p class="text-xs text-slate-500">
					{$authStore.user?.email ?? 'Welcome!'}
				</p>
			</div>

			<Button on:click={handleLogout} variant="ghost" size="icon">
				<LogOut class="h-5 w-5 text-slate-600" />
			</Button>
		</div>
	</div>
</aside>