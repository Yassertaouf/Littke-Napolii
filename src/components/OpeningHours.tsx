import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DayHours {
  day: string;
  slots: string[];
}

const hours: DayHours[] = [
  { day: 'Montag', slots: [] },
  { day: 'Dienstag', slots: ['17:00–21:00'] },
  { day: 'Mittwoch', slots: ['11:30–14:30', '17:00–21:00'] },
  { day: 'Donnerstag', slots: ['11:30–14:30', '17:00–21:00'] },
  { day: 'Freitag', slots: ['11:30–14:30', '17:00–21:00'] },
  { day: 'Samstag', slots: ['11:30–14:30', '17:00–21:00'] },
  { day: 'Sonntag', slots: ['11:30–14:30', '17:00–21:00'] },
];

// JS getDay(): 0 = Sunday ... 6 = Saturday. Map to our Monday-first array index.
const todayIndex = (new Date().getDay() + 6) % 7;

export default function OpeningHours() {
  const [expanded, setExpanded] = useState(false);
  const today = hours[todayIndex];
  const isClosedToday = today.slots.length === 0;

  return (
    <div className="hours-widget">
      <button className="hours-today-row" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>
        <span className="hours-today-status">
          <span className={isClosedToday ? 'hours-status-dot is-closed' : 'hours-status-dot'} />
          <span className="hours-today-day">Oggi</span>
          <span className="hours-today-time">
            {isClosedToday ? 'Chiuso' : today.slots.join(' · ')}
          </span>
        </span>
        <span className="hours-toggle-label">
          {expanded ? 'Réduire' : 'Toute la semaine'}
          <ChevronDown size={16} className={expanded ? 'hours-chevron is-open' : 'hours-chevron'} />
        </span>
      </button>

      <div className="hours-week" style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}>
        <div className="hours-week-inner">
          {hours.map((entry, index) => {
            const isToday = index === todayIndex;
            const isClosed = entry.slots.length === 0;
            return (
              <div key={entry.day} className={isToday ? 'hours-week-row is-today' : 'hours-week-row'}>
                <span className="hours-week-day">
                  {entry.day}
                  {isToday && <em>oggi</em>}
                </span>
                <span className="hours-week-time">
                  {isClosed ? (
                    <span className="hours-closed">Chiuso</span>
                  ) : (
                    entry.slots.map((slot) => <span key={slot}>{slot}</span>)
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
