import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

const TrainingCalendar = ({ trainings, customers }) => {
    const [view, setView] = useState('month');

    // Helper function to get customer name
    const getCustomerName = (customerId) => {
        const customer = customers.find(c => c.id === customerId);
        return customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown';
    };

    // Convert trainings to calendar events
    const events = trainings.map(training => {
        const customerName = getCustomerName(training.customerId);
        const start = new Date(training.date);
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + training.duration);

        return {
            id: training.id,
            title: `${training.activity} – ${customerName}`,
            start,
            end
        };
    });

    return (
        <div>
            <h1>Training Calendar</h1>

            <div className="view-selector" style={{ marginBottom: '1rem' }}>
                <button
                    className={`btn-secondary ${view === 'month' ? 'active' : ''}`}
                    onClick={() => setView('month')}
                >
                    Month
                </button>
                <button
                    className={`btn-secondary ${view === 'week' ? 'active' : ''}`}
                    onClick={() => setView('week')}
                >
                    Week
                </button>
                <button
                    className={`btn-secondary ${view === 'day' ? 'active' : ''}`}
                    onClick={() => setView('day')}
                >
                    Day
                </button>
            </div>

            <div className="calendar-container">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    view={view}
                    onView={setView}
                    views={['month', 'week', 'day']}
                    step={60}
                    showMultiDayTimes
                    defaultDate={new Date()}
                />
            </div>
        </div>
    );
};

export default TrainingCalendar;