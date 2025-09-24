export type LogType = 'SYSTEM' | 'INVITE' | 'EVENT' | 'GROUP';

export type NotificationLog = {
	id: string;
	type: LogType;
	message: string;
	metadata: Record<string, string | number>;
	referenceUrl?: string;
	isRead: boolean;
	createdAt: number; // epoch ms (UTC 기준)
};