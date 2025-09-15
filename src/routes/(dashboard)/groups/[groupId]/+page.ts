// src/routes/(dashboard)/groups/[groupId]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { mockGroups } from '$lib/data/mockGroups';
import { mockMembers } from '$lib/data/mockMembers';
import { mockEvents } from '$lib/data/mockEvents';

export const load: PageLoad = ({ params }) => {
	const group = mockGroups.find((g) => g.id === params.groupId);

	if (!group) {
		throw error(404, '그룹을 찾을 수 없습니다.');
	}

	// 실제 앱에서는 API를 호출하여 해당 그룹의 멤버와 이벤트를 가져옵니다.
	const members = mockMembers;
	const events = mockEvents.filter((e) => e.groupId === params.groupId);

	return {
		group,
		members,
		events,
	};
};