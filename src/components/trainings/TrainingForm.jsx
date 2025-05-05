import { useState } from 'react';
import { generateId, activityOptions } from '../../data/mockData';

const TrainingForm = ({ onSave, onCancel, customers }) => {
    const [formData, setFormData] = useState({
        id: '',
        date: new Date().toISOString().substring(0, 16), // Format: YYYY-MM-DDTHH:MM
        activity: '',
        duration: 30,
        customerId: customers.length > 0 ? customers[0].id : ''
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Special handling for duration to ensure it's a number
        if (name === 'duration') {
            const durationValue = parseInt(value, 10);
            if (!isNaN(durationValue) && durationValue > 0) {
                setFormData((prev) => ({
                    ...prev,
                    [name]: durationValue
                }));
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure the date is in ISO format
        let dateStr = formData.date;
        if (!dateStr.includes('T')) {
            dateStr += 'T00:00:00';
        }

        const trainingToSave = {
            ...formData,
            id: generateId(),
            date: new Date(dateStr).toISOString()
        };

        onSave(trainingToSave);
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2 className="form-title">Add New Training</h2>

            <div className="form-group">
                <label htmlFor="customerId">Customer</label>
                <select
                    id="customerId"
                    name="customerId"
                    value={formData.customerId}
                    onChange={handleChange}
                    required
                >
                    {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.firstName} {customer.lastName}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="date">Date and Time</label>
                <input
                    type="datetime-local"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="activity">Activity</label>
                <select
                    id="activity"
                    name="activity"
                    value={formData.activity}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select an activity</option>
                    {activityOptions.map((activity) => (
                        <option key={activity} value={activity}>
                            {activity}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="duration">Duration (minutes)</label>
                <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    min="1"
                    required
                />
            </div>

            <div className="button-group">
                <button type="button" className="btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="btn-primary">
                    Save
                </button>
            </div>
        </form>
    );
};

export default TrainingForm;