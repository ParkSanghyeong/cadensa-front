<script lang="ts">
	// 전역 스타일시트를 import 합니다.
	import "../../app.css";
</script>

<main
	class="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 p-4"
>
	<div class="w-full max-w-sm">
		<div class="mb-4 text-center">
			<h1 class="text-3xl font-bold text-slate-900">
				<a href="/">Schedulify</a>
			</h1>
		</div>

		<div class="rounded-lg bg-white p-6 pt-8 shadow-sm">
			<slot />
		</div>

		<div class="mt-4 px-4 text-center text-xs text-slate-600">
			<p>
				계속 진행하면 <a href="/terms" class="underline hover:text-primary">서비스 약관</a>
				및
				<a href="/privacy" class="underline hover:text-primary">개인정보 처리방침</a>에
				동의하는 것으로 간주됩니다.
			</p>
		</div>
	</div>
</main>