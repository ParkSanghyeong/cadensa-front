<script lang="ts">
	import { Users, Calendar, Terminal, Tag, ExternalLink, CircleDotDashed, Circle } from '@lucide/svelte';
	import type { NotificationLog, LogType } from './types';
	import { format } from 'date-fns';

	export let notification: NotificationLog;
	export let showReference = true;
	export let isLastInGroup = false;
	export let isFirstInGroup = false;

	// 원본 색상 시스템을 유지합니다.
	const getLogTypeInfo = (type: LogType) => {
		const info = {
			SYSTEM: {
				icon: Terminal, label: 'SYSTEM',
				timelineDotColor: 'text-gray-400',
				tagBg: 'bg-gray-200', tagText: 'text-gray-500',
			},
			INVITE: {
				icon: Users, label: 'INVITE',
				timelineDotColor: 'text-green-400',
				tagBg: 'bg-black', tagText: 'text-green-400',
			},
			EVENT: {
				icon: Calendar, label: 'EVENT',
				timelineDotColor: 'text-blue-500',
				tagBg: 'bg-blue-500', tagText: 'text-white',
			},
			GROUP: {
				icon: Tag, label: 'GROUP',
				timelineDotColor: 'text-purple-500',
				tagBg: 'bg-purple-500', tagText: 'text-white',
			}
		};
		return info[type];
	};

	const parseMessage = (message: string) => {
		const match = message.match(/^(\S+[이가|님|에서])\s/);
		if (match) return { actor: match[1], rest: message.substring(match[0].length) };
		return { actor: null, rest: message };
	};

	// 레퍼런스 추출 로직
	const extractReferences = () => {
		if (!notification.metadata) return [];
		const references = [];
		const { Group, Event } = notification.metadata;
		if (Group) references.push({ type: 'GROUP', name: Group, url: `/groups/${Group}` });
		if (Event) references.push({ type: 'EVENT', name: Event, url: notification.referenceUrl || `/events/${Event}` });
		return references;
	};

	$: typeInfo = getLogTypeInfo(notification.type);
	$: parsedMessage = parseMessage(notification.message);
	$: references = extractReferences();
</script>

<div class="relative flex min-h-[60px]">
	<div class="flex flex-col items-center mr-4 w-5">
		<div class="w-px h-1/2 {isFirstInGroup ? 'bg-transparent' : 'bg-gray-200'}"></div>

		<div class="z-10">
			{#if !notification.isRead}
				<CircleDotDashed class="w-4 h-4 {typeInfo.timelineDotColor}" strokeWidth={2.5} />
			{:else}
				<Circle class="w-4 h-4 text-gray-300" strokeWidth={2.5} />
			{/if}
		</div>

		<div class="w-px h-1/2 {isLastInGroup ? 'bg-transparent' : 'bg-gray-200'}"></div>
	</div>

	<div class="flex-1 pb-6 pt-1">
		<div
			class="
        relative p-3 rounded-lg border transition-all duration-300
        {!notification.isRead
          ? 'border-gray-300 bg-white shadow-sm'
          : 'border-transparent bg-transparent opacity-70 hover:opacity-100'
        }
      "
		>
			<div class="flex justify-between items-center mb-2">
				<div class="flex items-center gap-1.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full {typeInfo.tagBg} {typeInfo.tagText}">
					<svelte:component this={typeInfo.icon} size={10} />
					<span>{typeInfo.label}</span>
				</div>
				<div class="flex items-center gap-2">
          <span class="text-[10px] text-gray-400 font-mono">
            {format(new Date(notification.createdAt), 'HH:mm')}
          </span>
					{#if !notification.isRead}
						<div class="w-1.5 h-1.5 bg-black rounded-full"></div>
					{/if}
				</div>
			</div>

			<div class="mb-3 text-sm leading-relaxed text-gray-800">
				{#if parsedMessage.actor}
					<span class="font-bold text-black">{parsedMessage.actor}</span>
				{/if}
				<span>{parsedMessage.rest}</span>
			</div>

			{#if notification.type === 'INVITE'}
				<div class="flex gap-2">
					<button class="font-mono text-[10px] font-bold px-3 py-1 bg-black text-green-400 rounded-lg hover:bg-gray-800 transition-colors">
						ACCEPT
					</button>
					<button class="font-mono text-[10px] font-bold px-3 py-1 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors">
						DECLINE
					</button>
				</div>
			{/if}

			{#if showReference && references.length > 0}
				<div class="mt-2 pt-2 border-t border-gray-200">
					<div class="flex flex-wrap items-center gap-2">
						{#each references as ref}
							<a
								href={ref.url}
								class="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-black px-2 py-1 rounded-full text-xs transition-colors group/ref"
							>
								<span class="font-mono uppercase text-gray-500 font-medium">{ref.type}</span>
								<span class="font-semibold text-gray-900">{ref.name}</span>
								<ExternalLink class="w-3.5 h-3.5 text-gray-400" />
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>