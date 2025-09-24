<script lang="ts">
	// GroupCard 컴포넌트를 사용하지 않고, 이 페이지 내에서 직접 스타일링합니다.
	// 실제 데이터 구조에 맞게 타입을 정의해야 합니다.
	type Group = {
		id: string;
		name: string;
		description: string;
		memberCount: number;
		tags: string[];
		members: { id: string; avatarUrl?: string; name: string }[];
	};

	const mockGroups: Group[] = [
		{
			id: 'g1',
			name: 'PROJECT_ALPHA',
			description: '차세대 대시보드 UI/UX 기획 및 개발 프로젝트입니다. 함께 멋진 결과물을 만들어봐요.',
			memberCount: 5,
			tags: ['Development', 'UI/UX'],
			members: [
				{ id: 'm1', name: 'User 1' },
				{ id: 'm2', name: 'User 2' },
				{ id: 'm3', name: 'User 3' },
				{ id: 'm4', name: 'User 4' },
				{ id: 'm5', name: 'User 5' }
			]
		},
		{
			id: 'g2',
			name: 'CS 스터디',
			description: '알고리즘, 자료구조, 운영체제 등 CS 핵심 지식을 함께 공부하고 공유하는 스터디입니다.',
			memberCount: 8,
			tags: ['CS', 'Study', 'Algorithm'],
			members: [
				{ id: 'm1', name: 'User 1' },
				{ id: 'm2', name: 'User 2' },
				{ id: 'm3', name: 'User 3' },
				{ id: 'm4', name: 'User 4' },
				{ id: 'm5', name: 'User 5' },
				{ id: 'm6', name: 'User 6' },
				{ id: 'm7', name: 'User 7' },
				{ id: 'm8', name: 'User 8' },
			]
		},
		{
			id: 'g3',
			name: '영화 감상 모임',
			description: '매주 토요일 밤, 함께 영화를 보고 자유롭게 이야기를 나누는 소셜 클럽입니다.',
			memberCount: 12,
			tags: ['Hobby', 'Movie', 'Social'],
			members: [
				{ id: 'm1', name: 'User 1' },
				{ id: 'm2', name: 'User 2' },
				{ id: 'm3', name: 'User 3' }
			]
		}
	];
</script>

<div class="w-full p-6 bg-background font-sans">

	<div class="bg-foreground text-background font-mono p-6 mb-8 border-b-2 border-foreground">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold tracking-tighter">My <span class="text-green-400">Groups</span></h1>
				<p class="mt-2 text-sm text-white/80">현재 참여하고 있는 그룹 목록입니다.</p>
			</div>
			<button class="font-mono text-sm uppercase px-4 py-2 border-2 border-background bg-transparent text-background transition-all hover:bg-background hover:text-foreground">
				+ New Group
			</button>
		</div>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each mockGroups as group (group.id)}
			<a href="/groups/{group.id}" class="group block bg-background rounded-xl border border-foreground/15 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
				<div class="p-5 flex flex-col h-full">
					<div class="flex justify-between items-start mb-4">
						<h3 class="font-bold text-lg text-foreground">{group.name}</h3>
						<span class="text-muted-foreground group-hover:text-accent transition-transform duration-300 group-hover:-rotate-45">→</span>
					</div>

					<p class="text-sm text-muted-foreground flex-grow mb-5">
						{group.description}
					</p>

					<div class="flex items-center mb-5">
						<div class="flex -space-x-2 overflow-hidden">
							{#each group.members.slice(0, 4) as member}
								<div class="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-muted border border-foreground/20 flex items-center justify-center text-xs text-muted-foreground">
									{member.name.charAt(0)}
								</div>
							{/each}
						</div>
						{#if group.memberCount > 4}
							<div class="text-sm font-medium text-muted-foreground ml-3">
								+ {group.memberCount - 4} members
							</div>
						{/if}
					</div>

					<div class="flex flex-wrap gap-2 pt-4 border-t border-foreground/10">
						{#each group.tags as tag}
              <span class="font-mono text-xs px-2 py-1 bg-accent/10 text-accent rounded">
                #{tag}
              </span>
						{/each}
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>