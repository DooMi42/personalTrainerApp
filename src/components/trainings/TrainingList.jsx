/**
 * TrainingList component
 * Displays a list of training sessions with search, sort, and CRUD capabilities
 */
import { useState } from 'react';
import dayjs from 'dayjs';
import TrainingForm from './TrainingForm';

const TrainingList = ({ trainings, setTrainings, customers }) => {
    // State for managing UI functionality
    const [search, setSearch] = useState(''); // Tracks search input value
    const [sortField, setSortField] = useState('date'); // Current sort column
    const [sortAsc, setSortAsc] = useState(true); // Sort direction (ascending/descending)
    const [showAddForm, setShowAddForm] = useState(false); // Controls add form visibility

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
     * Handle search input changes
     * @param {Event} e - Input change event
     */
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    /**
     * Handle column sorting
     * If clicking the same column, toggle sort direction
     * If clicking a new column, sort ascending by that column
     * 
     * @param {string} field - Field name to sort by
     */
    const handleSort = (field) => {
        if (field === sortField) {
            setSortAsc(!sortAsc);
        } else {
            setSortField(field);
            setSortAsc(true);
        }
    };

    /**
     * Filter trainings based on search text
     * Searches across customer name and activity
     */
    const filteredTrainings = trainings.filter((training) => {
        const customerName = getCustomerName(training.customerId).toLowerCase();
        const activity = training.activity.toLowerCase();
        const query = search.toLowerCase();
        return customerName.includes(query) || activity.includes(query);
    });

    /**
     * Sort filtered trainings based on current sort field and direction
     * Special handling for customer names and dates
     */
    const sortedTrainings = [...filteredTrainings].sort((a, b) => {
        // Special handling for sorting by customer name
        if (sortField === 'customer') {
            const aCustomer = getCustomerName(a.customerId).toLowerCase();
            const bCustomer = getCustomerName(b.customerId).toLowerCase();

            if (aCustomer < bCustomer) return sortAsc ? -1 : 1;
            if (aCustomer > bCustomer) return sortAsc ? 1 : -1;
            return 0;
        }
        // Special handling for sorting by date
        else if (sortField === 'date') {
            const aDate = new Date(a.date).getTime();
            const bDate = new Date(b.date).getTime();

            if (aDate < bDate) return sortAsc ? -1 : 1;
            if (aDate > bDate) return sortAsc ? 1 : -1;
            return 0;
        }
        // Default sorting for other fields
        else {
            const aValue = a[sortField]?.toString().toLowerCase() || '';
            const bValue = b[sortField]?.toString().toLowerCase() || '';

            if (aValue < bValue) return sortAsc ? -1 : 1;
            if (aValue > bValue) return sortAsc ? 1 : -1;
            return 0;
        }
    });

    /**
     * Handle adding a new training session
     * @param {Object} newTraining - The training object to add
     */
    const handleAddTraining = (newTraining) => {
        setTrainings([...trainings, newTraining]);
        setShowAddForm(false);
    };

    /**
     * Handle deleting a training session with confirmation
     * @param {string} id - ID of the training to delete
     */
    const handleDeleteTraining = (id) => {
        if (window.confirm('Are you sure you want to delete this training session?')) {
            setTrainings(trainings.filter((training) => training.id !== id));
        }
    };

    return (
        <div>
            <h1>Training Sessions</h1>

            {/* Search and action buttons */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search trainings..."
                    value={search}
                    onChange={handleSearchChange}
                />
                <button className="btn-primary" onClick={() => setShowAddForm(true)}>
                    Add Training
                </button>
            </div>

            {/* Training data table */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            {/* Column headers with sort indicators */}
                            <th onClick={() => handleSort('date')}>
                                Date
                                {sortField === 'date' && (
                                    <span className="sort-indicator">
                                        {sortAsc ? ' ▲' : ' ▼'}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => handleSort('activity')}>
                                Activity
                                {sortField === 'activity' && (
                                    <span className="sort-indicator">
                                        {sortAsc ? ' ▲' : ' ▼'}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => handleSort('duration')}>
                                Duration (min)
                                {sortField === 'duration' && (
                                    <span className="sort-indicator">
                                        {sortAsc ? ' ▲' : ' ▼'}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => handleSort('customer')}>
                                Customer
                                {sortField === 'customer' && (
                                    <span className="sort-indicator">
                                        {sortAsc ? ' ▲' : ' ▼'}
                                    </span>
                                )}
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map through sorted trainings to create table rows */}
                        {sortedTrainings.map((training) => (
                            <tr key={training.id}>
                                {/* Format date with dayjs for better readability */}
                                <td>{dayjs(training.date).format('DD.MM.YYYY HH:mm')}</td>
                                <td>{training.activity}</td>
                                <td>{training.duration}</td>
                                <td>{getCustomerName(training.customerId)}</td>
                                <td>
                                    {/* Delete button */}
                                    <button
                                        className="btn-danger"
                                        onClick={() => handleDeleteTraining(training.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Training Form Modal - conditionally rendered */}
            {showAddForm && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <TrainingForm
                            onSave={handleAddTraining}
                            onCancel={() => setShowAddForm(false)}
                            customers={customers}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainingList;