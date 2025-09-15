// src/routes/(dashboard)/+layout.ts
import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';
import authStore from '$lib/stores/authStore';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => {
	if (browser) {
		const auth = get(authStore);
		if (!auth.isLoggedIn) {
			// 로그인 페이지로 리디렉션, 원래 가려던 경로를 쿼리로 전달
			throw redirect(307, `/login?redirectTo=${url.pathname}`);
		}
	}
	return {};
};