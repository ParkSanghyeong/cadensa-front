<script lang="ts">
	import { page } from '$app/stores';
	import authStore from '$lib/stores/authStore';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const navItems = [
		{
			href: '/dashboard',
			label: 'DASHBOARD',
		},
		{
			href: '/events',
			label: 'EVENTS',
		},
		{
			href: '/groups',
			label: 'GROUPS',
		},
		{
			href: '/logs',
			label: 'LOGS',
		}
	];

	let mounted = false;

	// Active route detection logic remains the same.
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

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<header
		class="sticky top-0 z-50 flex w-full items-center justify-between bg-background border-b-1 border-foreground/20 p-3 font-mono"
		role="banner"
	>
		<!-- Logo Section -->
		<div class="flex items-center gap-3 md:gap-6">
			<a class="text-sm text-foreground" href="/dashboard">
				<pre class="leading-tight text-sm">[ CADENSA ]</pre>
			</a>
		</div>

		<!-- Navigation - now always visible -->
		<nav aria-label="Main menu">
			<div class="flex items-center gap-1 md:gap-2">
				{#each navItems as item (item.href)}
					<a
						href={item.href}
						class="group relative px-2 py-1.5 text-xs sm:text-sm lg:px-4 uppercase tracking-wider transition-all duration-100 ease-out"
						class:bg-foreground={isActiveRoute(item.href)}
						class:text-background={isActiveRoute(item.href)}
						aria-current={isActiveRoute(item.href) ? 'page' : undefined}
					>
						{item.label}
						{#if !isActiveRoute(item.href)}
							<div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-foreground opacity-0 group-hover:opacity-100"></div>
						{/if}
					</a>
				{/each}
			</div>
		</nav>

		<!-- User Info Section - now responsive -->
		<div class="flex items-center gap-2 md:gap-4 text-xs">
			<!-- User name and email are hidden on smaller screens (below md) -->
			<div class="text-right hidden md:block">
				<div class="font-bold uppercase text-foreground">
					{$authStore.user?.name ?? 'ANONYMOUS'}
				</div>
				<div class="text-muted-foreground truncate">
					{$authStore.user?.email ?? 'guest@system.local'}
				</div>
			</div>
			<button
				onclick={handleLogout}
				class="btn-ghost-brutal px-3 py-2 text-xs"
				aria-label="Sign out"
			>
				LOGOUT
			</button>
		</div>
	</header>
{/if}

<style>
    /* Styles are unchanged as requested */
    a, button {
        transition: all 0.1s ease-out;
    }

    a:hover, button:hover {
        transform: translate(-1px, -1px);
    }

    a:active, button:active {
        transform: translate(1px, 1px);
    }

    @keyframes blink {
        from, to { opacity: 1; }
        50% { opacity: 0; }
    }

    .btn-ghost-brutal {
        border: 1px solid transparent;
    }
    .btn-ghost-brutal:hover {
        border: 1px solid currentColor;
        background-color: hsl(var(--muted));
    }
</style>
