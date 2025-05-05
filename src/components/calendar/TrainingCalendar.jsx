/**
 * TrainingCalendar component
 * Displays training sessions in a calendar view with multiple viewing options
 */
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

// Setup the localizer for react-big-calendar using moment.js
const localizer = momentLocalizer(moment);

const TrainingCalendar = ({ trainings, customers }) => {
    // State to track the current calendar view (month, week, day)
    const [view, setView] = useState('month');

    /**
     * Helper function to get customer name from customerId
     * Returns customer's full name or "Unknown" if not found
     * 
     * @param {string} customerId - ID of the customer to look up
     * @returns {string} Customer's full name
     */
    const getCustomerName = (customerId) => {
        const customer = customers.find(c => c.id === customerId);
        return customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown';
    };

    /**
     * Convert trainings to calendar events format
     * Each training becomes an event with:
     * - title combining activity and customer name
     * - start time from training date
     * - end time calculated by adding duration minutes to start time
     */
    const events = trainings.map(training => {
        const customerName = getCustomerName(training.customerId);
        const start = new Date(training.date);
        const end = new Date(start);
        // Calculate end time by adding duration minutes
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

            {/* View selector buttons */}
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

            {/* Calendar component from react-big-calendar */}
            <div className="calendar-container">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    view={view}
                    onView={setView}
                    views={['month', 'week', 'day']}
                    step={60} // Time slot increments in minutes
                    showMultiDayTimes
                    defaultDate={new Date()} // Current date as default view
                />
            </div>
        </div>
    );
};

export default TrainingCalendar;