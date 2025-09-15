// src/lib/data/mockMembers.ts
export type Member = {
	id: string;
	name:string;
	avatar: string;
	role: 'Admin' | 'Member';
};

export const mockMembers: Member[] = [
	{ id: 'user1', name: '박상현', avatar: 'https://i.pravatar.cc/48?u=user1', role: 'Admin' },
	{ id: 'user2', name: '김민지', avatar: 'https://i.pravatar.cc/48?u=user2', role: 'Member' },
	{ id: 'user3', name: '이서준', avatar: 'https://i.pravatar.cc/48?u=user3', role: 'Member' },
	{ id: 'user4', name: '최유나', avatar: 'https://i.pravatar.cc/48?u=user4', role: 'Member' },
	{ id: 'user5', name: '정하윤', avatar: 'https://i.pravatar.cc/48?u=user5', role: 'Member' },
];