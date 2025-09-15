<script lang="ts">
	import { goto } from '$app/navigation';
	import authStore from '$lib/stores/authStore.js';
	import { Button } from "$lib/components/ui/button/index.js";
	import GoogleIcon from "$lib/components/icons/GoogleIcon.svelte";
	import { page } from '$app/stores';

	function handleGoogleLogin() {
		console.log("Signing in with Google...");

		// --- 임시 로그인 처리 로직 ---
		const mockUser = {
			name: 'nnn',
			email: 'sanghyeon@example.com',
			avatar: `https://i.pravatar.cc/48?u=sanghyeon`
		};
		authStore.set({ isLoggedIn: true, user: mockUser });

		// 로그인 후 원래 가려던 페이지나 대시보드로 이동
		const redirectTo = $page.url.searchParams.get('redirectTo') || '/dashboard';
		goto(redirectTo);
	}
</script>

<div class="w-full">
	<Button onclick={handleGoogleLogin} variant="outline" class="w-full">
		<GoogleIcon class="mr-2 h-4 w-4" />
		Sign in with Google
	</Button>
</div>