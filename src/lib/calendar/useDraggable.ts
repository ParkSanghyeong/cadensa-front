import { TZDate } from '@date-fns/tz';
import { TIME_AXIS_WIDTH, CELL_HEIGHT } from './constants';

interface Params {
	displayedDates: TZDate[];
}

export function draggable(node: HTMLElement, params: Params) {
	let { displayedDates } = params;
	let isDragging = false;
	let dragStartDate: TZDate | null = null;
	let dragCurrentDate: TZDate | null = null;

	function getDateFromCoordinates(x: number, y: number): TZDate | null {
		const rect = node.getBoundingClientRect();
		const dayCount = displayedDates.length;
		const dayWidth = (rect.width - TIME_AXIS_WIDTH) / dayCount;
		const relX = x - rect.left - TIME_AXIS_WIDTH;
		const relY = y - rect.top;
		if (relX < 0 || relY < 0 || relX > rect.width - TIME_AXIS_WIDTH || relY > rect.height)
			return null;
		const dayIndex = Math.min(dayCount - 1, Math.floor(relX / dayWidth));
		const day = displayedDates[dayIndex];
		const totalMinutes = Math.floor(relY / CELL_HEIGHT) * 15;
		const newDate = new TZDate(day);
		newDate.setHours(Math.floor(totalMinutes / 60), totalMinutes % 60, 0, 0);
		return newDate;
	}

	function handleMouseDown(e: MouseEvent) {
		const startDate = getDateFromCoordinates(e.clientX, e.clientY);
		if (!startDate) return;
		isDragging = true;
		dragStartDate = startDate;
		dragCurrentDate = startDate;
		node.dispatchEvent(new CustomEvent('dragstart', { detail: { start: dragStartDate, current: dragCurrentDate } }));
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDragging) return;
		const currentDate = getDateFromCoordinates(e.clientX, e.clientY);
		if (currentDate) {
			dragCurrentDate = currentDate;
			node.dispatchEvent(new CustomEvent('dragmove', { detail: { start: dragStartDate, current: dragCurrentDate } }));
		}
	}

	function handleMouseUp() {
		if (isDragging) {
			node.dispatchEvent(new CustomEvent('dragend', { detail: { start: dragStartDate, end: dragCurrentDate } }));
		}
		isDragging = false;
	}

	node.addEventListener('mousedown', handleMouseDown);
	window.addEventListener('mousemove', handleMouseMove);
	window.addEventListener('mouseup', handleMouseUp);
	window.addEventListener('mouseleave', handleMouseUp); // 창을 벗어났을 때도 처리

	return {
		destroy() {
			node.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
			window.removeEventListener('mouseleave', handleMouseUp);
		},
		update(newParams: Params) {
			displayedDates = newParams.displayedDates;
		}
	};
}