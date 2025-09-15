<script lang="ts">
	import { Button } from "$lib/components/ui/button";
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm"
>
	<div class="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
		<a href="/" class="text-xl font-bold text-slate-900"> Schedulify </a>
		<nav class="hidden items-center space-x-6 text-sm font-medium md:flex">
			<a href="/features" class="transition-colors hover:text-primary">Features</a>
			<a href="/pricing" class="transition-colors hover:text-primary">Pricing</a>
			<a href="/contact" class="transition-colors hover:text-primary">Contact</a>
		</nav>
		<div>
			<Button href="/login">Sign In</Button>
		</div>
	</div>
</header>