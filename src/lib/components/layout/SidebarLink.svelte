<script lang="ts">
	import type { ComponentType } from 'svelte';
	import { page } from '$app/stores';

	// Props: 이 컴포넌트가 부모로부터 받을 데이터들입니다.
	export let href: string; // 이동할 경로 (e.g., '/dashboard')
	export let label: string; // 보여줄 텍스트 (e.g., '대시보드')
	export let icon: ComponentType; // 아이콘 컴포넌트

	// $: 는 Svelte의 반응성(reactivity) 문법입니다.
	// page.url.pathname이 바뀔 때마다 isActive 변수가 자동으로 다시 계산됩니다.
	$: isActive = href === '/dashboard'
		? $page.url.pathname === href
		: $page.url.pathname.startsWith(href);
</script>

<a
	{href}
	class="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900"
	class:bg-slate-100={isActive}
	class:text-slate-900={isActive}
>
	<svelte:component this={icon} class="h-4 w-4" />
	{label}
</a>