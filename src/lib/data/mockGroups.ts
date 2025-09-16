// src/lib/data/mockGroups.ts
export type Group = {
	id: string;
	name: string;
	description: string;
	memberCount: number;
	lastActivity: string;
};

export const mockGroups: Group[] = [
	{
		id: 'project-a',
		name: '사이드 프로젝트 A팀',
		description: '일정 관리 서비스 개발을 위한 팀입니다.',
		memberCount: 5,
		lastActivity: '어제',
	},
	{
		id: 'study-group',
		name: 'CS 스터디 그룹',
		description: '매주 CS 관련 주제를 정해 발표하고 토론합니다.',
		memberCount: 8,
		lastActivity: '3일 전',
	},
	{
		id: 'hobby-club',
		name: '영화 감상 동호회',
		description: '매달 2회, 함께 영화를 보고 이야기를 나눕니다.',
		memberCount: 12,
		lastActivity: '1주 전',
	},
];