<script lang="ts">
	// --- Mock Data ---
	const currentUserId = 'm1';
	const data = {
		group: { name: 'PROJECT_ALPHA', description: '차세대 대시보드 UI/UX 기획 및 개발 프로젝트입니다.' },
		members: [
			{ id: 'm1', name: '김민준', role: 'Owner', avatar: '/avatars/01.png' },
			{ id: 'm2', name: '이서연', role: 'Member', avatar: '/avatars/02.png' },
			{ id: 'm3', name: '박도윤', role: 'Member', avatar: '/avatars/03.png' },
			{ id: 'm4', name: '최지우', role: 'Member', avatar: '/avatars/04.png' },
			{ id: 'm5', name: '정시우', role: 'Member', avatar: '/avatars/05.png' }
		],
		events: [
			{ id: 'e1', title: '1차 UI/UX 리뷰 미팅', date: '2025.09.24', time: '14:00 - 15:00', status: '확정', attendees: [ 'm1', 'm2', 'm3' ] },
			{ id: 'e2', title: '2차 개발 스프린트 계획', date: null, time: null, status: '조율중', attendees: [ 'm1', 'm2', 'm3', 'm4', 'm5' ] },
			{ id: 'e3', title: '최종 결과물 발표', date: '2025.10.15', time: '16:00 - 17:00', status: '확정', attendees: [ 'm1', 'm2', 'm3', 'm4', 'm5' ] }
		]
	};
	const { group, members, events } = data;
	let activeTab = 'schedule';

	// --- Filter State ---
	let eventSearchTerm = '';
	let memberSearchTerm = '';
	let showMyEventsOnly = false;
	let selectedStatuses = new Set<'확정' | '조율중'>();
	let selectedRoles = new Set<'Owner' | 'Member'>();

	let showEventFilterPopup = false;
	let showMemberFilterPopup = false;

	// --- Filter Toggling Functions ---
	const toggleStatus = (status: '확정' | '조율중') => {
		selectedStatuses.has(status) ? selectedStatuses.delete(status) : selectedStatuses.add(status);
		selectedStatuses = new Set(selectedStatuses);
	};
	const toggleRole = (role: 'Owner' | 'Member') => {
		selectedRoles.has(role) ? selectedRoles.delete(role) : selectedRoles.add(role);
		selectedRoles = new Set(selectedRoles);
	};
	const resetEventFilters = () => {
		eventSearchTerm = '';
		showMyEventsOnly = false;
		selectedStatuses.clear();
		selectedStatuses = new Set(selectedStatuses);
	};
	const resetMemberFilters = () => {
		memberSearchTerm = '';
		selectedRoles.clear();
		selectedRoles = new Set(selectedRoles);
	};

	// --- Derived Filtered Data ---
	$: filteredEvents = events.filter(event => {
		const searchTermMatch = event.title.toLowerCase().includes(eventSearchTerm.toLowerCase());
		const myEventsMatch = !showMyEventsOnly || event.attendees.includes(currentUserId);
		const statusMatch = selectedStatuses.size === 0 || selectedStatuses.has(event.status as '확정' | '조율중');
		return searchTermMatch && myEventsMatch && statusMatch;
	});

	$: filteredMembers = members.filter(member => {
		const searchTermMatch = member.name.toLowerCase().includes(memberSearchTerm.toLowerCase());
		const roleMatch = selectedRoles.size === 0 || selectedRoles.has(member.role as 'Owner' | 'Member');
		return searchTermMatch && roleMatch;
	});
</script>

<div class="w-full p-6 bg-background font-sans text-foreground">
	<!-- Header -->
	<div class="bg-foreground text-background font-mono p-6 mb-8 border-b-2 border-foreground">
		<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
			<div>
				<h1 class="text-3xl font-bold tracking-tighter flex items-center">{group.name}<span class="animate-pulse ml-2">_</span></h1>
				<p class="mt-2 text-background/60 text-sm font-sans">// {group.description}</p>
			</div>
			<div class="flex gap-2">
				<button class="font-mono text-sm uppercase px-4 py-2 border-2 border-accent bg-accent text-accent-foreground transition-all hover:bg-transparent hover:text-accent">+ New Event</button>
				<button class="font-mono text-sm uppercase px-4 py-2 border-2 border-background/50 bg-transparent text-background/80 transition-all hover:bg-background hover:text-foreground">Invite Members</button>
			</div>
		</div>
	</div>

	<!-- Tabs -->
	<div class="w-full">
		<div class="border-b-2 border-foreground/10 flex items-center gap-2 mb-6">
			<button on:click={() => activeTab = 'schedule'} class="font-mono uppercase tracking-wider px-4 py-2 text-sm transition-all {activeTab === 'schedule' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}">Schedule</button>
			<button on:click={() => activeTab = 'members'} class="font-mono uppercase tracking-wider px-4 py-2 text-sm transition-all {activeTab === 'members' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}">Members ({members.length})</button>
		</div>

		<!-- Schedule Tab -->
		{#if activeTab === 'schedule'}
			<div class="relative">
				<!-- Filter Bar -->
				<div class="bg-muted/50 border border-foreground/10 rounded-lg p-3 flex items-center gap-3 font-mono text-sm">
					<!-- 내 일정만 보기 -->
					<button
						on:click={() => (showMyEventsOnly = !showMyEventsOnly)}
						class:bg-foreground={showMyEventsOnly}
						class:text-background={showMyEventsOnly}
						class="px-3 py-1 border border-foreground/20 transition-colors hover:border-foreground rounded">
						내 일정만 보기
					</button>

					<!-- 필터 버튼 -->
					<button
						on:click={() => (showEventFilterPopup = !showEventFilterPopup)}
						class="px-3 py-1 border border-foreground/20 transition-colors hover:border-foreground rounded">
						필터
					</button>

					<div class="flex-grow"></div>
				</div>

				<!-- Event Filter Popup -->
				{#if showEventFilterPopup}
					<div
						class="absolute mt-2 right-0 z-50 bg-background border border-foreground/20 rounded-lg shadow-lg p-4 w-64 space-y-3">
						<input
							type="text"
							bind:value={eventSearchTerm}
							placeholder="Search event title..."
							class="w-full bg-background border-2 border-foreground/20 px-3 py-1.5 focus:border-accent outline-none transition-colors rounded" />

						<div class="flex items-center gap-2 flex-wrap">
							<span class="text-muted-foreground text-xs">Status:</span>
							<button
								on:click={() => toggleStatus('확정')}
								class:bg-foreground={selectedStatuses.has('확정')}
								class:text-background={selectedStatuses.has('확정')}
								class="px-2 py-1 border border-foreground/20 text-xs rounded hover:border-foreground transition-colors">
								확정
							</button>
							<button
								on:click={() => toggleStatus('조율중')}
								class:bg-foreground={selectedStatuses.has('조율중')}
								class:text-background={selectedStatuses.has('조율중')}
								class="px-2 py-1 border border-foreground/20 text-xs rounded hover:border-foreground transition-colors">
								조율중
							</button>
						</div>

						<button
							on:click={resetEventFilters}
							class="text-muted-foreground hover:text-accent transition-colors text-xs">
							초기화
						</button>
					</div>
				{/if}

				<!-- Event List -->
				<div class="space-y-4 mt-4">
					{#each filteredEvents as event (event.id)}
						<div class="bg-background rounded-lg border border-foreground/15 p-4 flex flex-col md:flex-row items-start md:items-center gap-4 transition-all hover:border-foreground/50">
							<div class="flex-shrink-0 text-center font-mono border-r border-foreground/10 pr-4 w-full md:w-24">
								{#if event.status === '확정'}
									<div class="text-xs text-muted-foreground">{event.date.substring(0, 7)}</div>
									<div class="text-3xl font-bold text-accent">{event.date.substring(8)}</div>
									<div class="text-xs text-muted-foreground">{event.time}</div>
								{:else}
									<div class="text-sm font-bold text-warning">조율중</div>
									<div class="text-xs text-muted-foreground mt-1">투표를 통해<br>시간 결정</div>
								{/if}
							</div>
							<div class="flex-grow">
								<p class="font-bold text-lg">{event.title}</p>
							</div>
							<div class="flex-shrink-0 w-full md:w-auto">
								{#if event.status === '확정'}
									<span class="font-mono text-xs px-3 py-1 bg-success/10 text-success rounded border border-success/20">✅ CONFIRMED</span>
								{:else if event.status === '조율중'}
									<button class="font-mono text-sm w-full bg-accent text-accent-foreground px-4 py-2 transition-all hover:opacity-80">투표 참여 →</button>
								{/if}
							</div>
						</div>
					{/each}
					{#if filteredEvents.length === 0}
						<div class="text-center py-12 border-2 border-dashed border-foreground/20 rounded-lg">
							<p class="text-muted-foreground">조건에 맞는 일정이 없습니다.</p>
						</div>
					{/if}
				</div>
			</div>
		{/if}

		<!-- Members Tab -->
		{#if activeTab === 'members'}
			<div class="relative">
				<!-- Filter Bar -->
				<div class="bg-muted/50 border border-foreground/10 rounded-lg p-3 flex items-center gap-3 font-mono text-sm">
					<button
						on:click={() => (showMemberFilterPopup = !showMemberFilterPopup)}
						class="px-3 py-1 border border-foreground/20 transition-colors hover:border-foreground rounded">
						필터
					</button>
					<div class="flex-grow"></div>
				</div>

				<!-- Member Filter Popup -->
				{#if showMemberFilterPopup}
					<div
						class="absolute mt-2 right-0 z-50 bg-background border border-foreground/20 rounded-lg shadow-lg p-4 w-64 space-y-3">
						<input
							type="text"
							bind:value={memberSearchTerm}
							placeholder="Search member name..."
							class="w-full bg-background border-2 border-foreground/20 px-3 py-1.5 focus:border-accent outline-none transition-colors rounded" />

						<div class="flex items-center gap-2 flex-wrap">
							<span class="text-muted-foreground text-xs">Role:</span>
							<button
								on:click={() => toggleRole('Owner')}
								class:bg-foreground={selectedRoles.has('Owner')}
								class:text-background={selectedRoles.has('Owner')}
								class="px-2 py-1 border border-foreground/20 text-xs rounded hover:border-foreground transition-colors">
								Owner
							</button>
							<button
								on:click={() => toggleRole('Member')}
								class:bg-foreground={selectedRoles.has('Member')}
								class:text-background={selectedRoles.has('Member')}
								class="px-2 py-1 border border-foreground/20 text-xs rounded hover:border-foreground transition-colors">
								Member
							</button>
						</div>

						<button
							on:click={resetMemberFilters}
							class="text-muted-foreground hover:text-accent transition-colors text-xs">
							초기화
						</button>
					</div>
				{/if}

				<!-- Member Grid -->
				<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
					{#each filteredMembers as member (member.id)}
						<div class="bg-muted/50 rounded-lg border border-foreground/10 p-4 text-center transition-all hover:bg-muted hover:border-foreground/30">
							<div class="relative w-20 h-20 mx-auto">
								<img src={member.avatar || `https://api.dicebear.com/8.x/pixel-art/svg?seed=${member.name}`} alt={member.name} class="w-full h-full rounded-full ring-2 ring-offset-2 ring-offset-muted/50 ring-foreground/20" />
								{#if member.role === 'Owner'}
									<span class="absolute bottom-0 right-0 text-xl" title="Group Owner">👑</span>
								{/if}
							</div>
							<p class="font-bold mt-3">{member.name}</p>
							<p class="text-xs text-muted-foreground">{member.role}</p>
						</div>
					{/each}
					{#if filteredMembers.length === 0}
						<div class="text-center py-12 border-2 border-dashed border-foreground/20 rounded-lg col-span-full">
							<p class="text-muted-foreground">조건에 맞는 멤버가 없습니다.</p>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>
