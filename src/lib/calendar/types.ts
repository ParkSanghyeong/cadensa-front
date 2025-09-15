
// 외부에서 받는 이벤트 데이터 타입 (요청하신 epoch time 사용)
export interface ScheduleEvent {
	start: { epochSecond: number; timeZone: string };
	end: { epochSecond: number; timeZone: string };
	title: string;
}
