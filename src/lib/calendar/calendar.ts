import { writable, derived, get } from 'svelte/store';
import { format, addDays, subDays, startOfWeek } from 'date-fns';
import { ko } from 'date-fns/locale';
import { TZDate } from '@date-fns/tz';

function createCalendarStore() {
	// --- 1. 내부 상태를 관리하는 비공개(private) 스토어들 ---
	const viewDate = writable(new TZDate());
	const currentView = writable<'week' | 'day'>('week');
	const timeFormat = writable<'12h' | '24h'>('12h');
	const isMobile = writable(false);

	// --- 2. UI에 필요한 상태를 계산하는 파생(derived) 스토어들 ---
	const effectiveView = derived([isMobile, currentView], ([$isMobile, $currentView]) =>
		$isMobile ? 'day' : $currentView
	);

	const weekDates = derived(viewDate, ($viewDate) => {
		const start = startOfWeek($viewDate, { weekStartsOn: 0 }); // 일요일을 주의 시작으로
		return Array.from({ length: 7 }, (_, i) => addDays(start, i));
	});

	const displayedDates = derived(
		[effectiveView, weekDates, viewDate],
		([$effectiveView, $weekDates, $viewDate]) =>
			$effectiveView === 'week' ? $weekDates : [$viewDate]
	);

	const headerTitle = derived(
		[effectiveView, viewDate, displayedDates],
		([$effectiveView, $viewDate, $displayedDates]) => {
			if ($effectiveView === 'day') {
				return format($viewDate, 'yyyy년 M월 d일 (EEE)', { locale: ko });
			}
			const start = $displayedDates[0];
			const end = $displayedDates[$displayedDates.length - 1];
			if (start.getMonth() === end.getMonth()) {
				return `${format(start, 'yyyy년 M월')} ${format(start, 'd')}일 - ${format(end, 'd')}일`;
			}
			return `${format(start, 'yyyy년 M월 d일')} – ${format(end, 'M월 d일')}`;
		}
	);

	// --- 3. 컴포넌트에서 사용할 모든 상태 값을 하나의 객체로 묶는 최종 파생 스토어 ---
	// 이 스토어의 .subscribe 메소드를 외부로 노출할 것입니다.
	const store = derived(
		[displayedDates, headerTitle, currentView, timeFormat],
		([$displayedDates, $headerTitle, $currentView, $timeFormat]) => {
			return {
				displayedDates: $displayedDates,
				headerTitle: $headerTitle,
				currentView: $currentView,
				timeFormat: $timeFormat
			};
		}
	);

	// --- 4. 상태를 변경하는 공개(public) 메소드들 ---
	function navigate(direction: 'prev' | 'next' | 'today') {
		const view = get(effectiveView);
		if (direction === 'today') {
			viewDate.set(new TZDate());
			return;
		}
		const increment = view === 'week' ? 7 : 1;
		viewDate.update((d) => (direction === 'prev' ? subDays(d, increment) : addDays(d, increment)));
	}

	// --- 5. 커스텀 스토어 객체 반환 ---
	// .subscribe 메소드와 상태 변경 메소드를 함께 노출합니다.
	return {
		subscribe: store.subscribe, // Svelte가 구독할 수 있도록 .subscribe를 노출
		navigate,
		setView: currentView.set,
		setTimeFormat: timeFormat.set,
		setIsMobile: isMobile.set
	};
}

// 최종적으로 export되는 calendar는 .subscribe 메소드를 가진 커스텀 스토어입니다.
export const calendar = createCalendarStore();