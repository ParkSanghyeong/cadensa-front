// src/lib/data/mockEvents.ts
export type Event = {
	id: string;
	groupId: string;
	title: string;
	date: Date;
	time: string;
	status: '확정' | '조율중';
};

export const mockEvents: Event[] = [
	{ id: 'event1', groupId: 'project-a', title: '1차 기능 기획 회의', date: new Date('2025-09-15'), time: '14:00 - 15:00', status: '확정' },
	{ id: 'event2', groupId: 'project-a', title: '디자인 시스템 리뷰', date: new Date('2025-09-22'), time: '16:00 - 16:30', status: '조율중' },
	{ id: 'event3', groupId: 'study-group', title: '자료구조 스터디', date: new Date('2025-09-12'), time: '19:00 - 21:00', status: '확정' },
];