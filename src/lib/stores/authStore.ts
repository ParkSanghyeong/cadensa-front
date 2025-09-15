// src/lib/stores/authStore.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type User = {
	name: string;
	email: string;
	avatar: string;
};

type AuthState = {
	isLoggedIn: boolean;
	user: User | null;
};

const initialValue: AuthState = {
	isLoggedIn: false,
	user: null,
};

// 브라우저 환경에서만 localStorage를 사용하도록 처리
const storedValue = browser ? window.localStorage.getItem('authState') : null;

const authStore = writable<AuthState>(
	storedValue ? JSON.parse(storedValue) : initialValue
);

// 스토어 값이 변경될 때마다 localStorage에 저장
authStore.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('authState', JSON.stringify(value));
	}
});

export default authStore;