<script lang="ts">
	import { page } from '$app/stores';
	import authStore from '$lib/stores/authStore';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const navItems = [
		{
			href: '/dashboard',
			label: 'DASHBOARD',
			desc: 'OVERVIEW'
		},
		{
			href: '/calendar',
			label: 'CALENDAR',
			desc: 'SCHEDULE'
		},
		{
			href: '/groups',
			label: 'GROUPS',
			desc: 'TEAMS'
		}
	];

	let currentTime = new Date();
	let mounted = false;

	// Enhanced active state detection
	$: isActiveRoute = (href: string) => {
		if (href === '/dashboard') {
			return $page.url.pathname === href;
		}
		return $page.url.pathname.startsWith(href);
	};

	function handleLogout() {
		authStore.set({ isLoggedIn: false, user: null });
		goto('/');
	}

	function getTimeString() {
		return currentTime.toLocaleTimeString('en-US', {
			hour12: false,
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function getDateString() {
		return currentTime.toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		}).replace(/\//g, '.');
	}

	onMount(() => {
		mounted = true;
		const timer = setInterval(() => {
			currentTime = new Date();
		}, 1000);

		return () => clearInterval(timer);
	});
</script>

{#if mounted}
	<aside
		class="flex h-screen w-80 flex-col bg-background border-r-2 border-foreground relative"
		role="navigation"
		aria-label="Main navigation"
	>
		<!-- ASCII Art Header -->
		<div class="border-b-2 border-foreground bg-card p-6">

			<div class="space-y-2">
				<pre class="font-mono text-xs text-foreground leading-tight">
╔═══════════════════════════╗
║       C A D E N S A       ║
╚═══════════════════════════╝</pre>
				<div class="font-mono text-xs text-muted-foreground">
					<div class="flex justify-between">
						<span>DATE: {getDateString()}</span>
						<span class="cursor">TIME: {getTimeString()}</span>
					</div>
				</div>
			</div>

		</div>

		<!-- Navigation Menu -->
		<nav class="flex-1 p-6 space-y-2" aria-label="Main menu">
			<div class="font-mono text-xs text-muted-foreground mb-4 uppercase tracking-widest">
				// NAVIGATION
			</div>

			{#each navItems as item (item.href)}
				<a
					href={item.href}
					class="block group relative"
					class:bg-foreground={isActiveRoute(item.href)}
					class:text-background={isActiveRoute(item.href)}
					aria-current={isActiveRoute(item.href) ? 'page' : undefined}
				>
					<div class="card-brutal p-4 text-left">
						<div class="font-mono text-sm font-bold">
							<div class="uppercase tracking-wider">{item.label}</div>
							<div class="text-xs text-muted-foreground mt-1">// {item.desc}</div>
						</div>

						{#if isActiveRoute(item.href)}
							<div class="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-xs">
								[●]
							</div>
						{/if}
					</div>
				</a>
			{/each}
		</nav>

		<!-- Terminal-like Status Section -->
		<div class="border-t-2 border-foreground bg-muted p-6">
			<!-- User Profile -->
			<div class="font-mono text-xs border-t border-foreground pt-3">
				<div class="text-muted-foreground mb-2">// USER PROFILE</div>
				<div class="flex items-start justify-between">
					<div class="flex-1">
						<div class="font-bold uppercase text-foreground">
							{$authStore.user?.name ?? 'ANONYMOUS'}
						</div>
						<div class="text-xs text-muted-foreground truncate">
							{$authStore.user?.email ?? 'guest@system.local'}
						</div>
					</div>
				</div>

				<!-- Logout Button -->
				<button
					onclick={handleLogout}
					class="mt-3 w-full btn-ghost-brutal text-xs"
					aria-label="Sign out"
				>
					LOGOUT
				</button>
			</div>
		</div>
	</aside>
{/if}

<style>
    /* Custom animations for brutal style */
    a {
        transition: all 0.1s ease-out;
    }

    a:hover {
        transform: translate(-1px, -1px);
    }

    a:active {
        transform: translate(1px, 1px);
    }

    pre {
        font-family: 'JetBrains Mono', 'SF Mono', monospace;
        font-size: inherit;
        line-height: inherit;
    }
</style>