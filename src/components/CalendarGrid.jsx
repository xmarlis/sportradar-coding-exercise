import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, format } from "date-fns";
import DayCell from "./DayCell.jsx";

export default function CalendarGrid({ currentDate, eventsByDate }) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const rows = [];
  let day = gridStart;

  while (day <= gridEnd) {
    const cells = [];
    for (let i = 0; i < 7; i++) {
      const iso = format(day, "yyyy-MM-dd");
      cells.push(
        <DayCell
          key={iso}
          dateObj={day}
          isoDate={iso}
          inMonth={isSameMonth(day, monthStart)}
          events={eventsByDate.get(iso) || []}
        />
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="week" key={`w-${format(addDays(day, -1), "yyyy-MM-dd")}`}>{cells}</div>
    );
  }

  return (
    <div className="calendar">
      <div className="week head">
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => <div key={d} className="dow">{d}</div>)}
      </div>
      {rows}
    </div>
  );
}
