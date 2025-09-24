// src/lib/data/mockGroups.ts
export type Group = {
	id: string;
	name: string;
	description: string;
	memberCount: number;
	tags: string[];
	members: { id: string; avatarUrl?: string; name: string }[];
};

export const mockGroups: Group[] = [
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