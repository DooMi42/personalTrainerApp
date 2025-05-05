import { useState } from 'react';
import dayjs from 'dayjs';
import TrainingForm from './TrainingForm';

const TrainingList = ({ trainings, setTrainings, customers }) => {
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState('date');
    const [sortAsc, setSortAsc] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    // Helper function to get customer name
    const getCustomerName = (customerId) => {
        const customer = customers.find(c => c.id === customerId);
        return customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown';
    };

    // Handle search input changes
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // Handle column sorting
    const handleSort = (field) => {
        if (field === sortField) {
            setSortAsc(!sortAsc);
        } else {
            setSortField(field);
            setSortAsc(true);
        }
    };

    // Filter trainings based on search text
    const filteredTrainings = trainings.filter((training) => {
        const customerName = getCustomerName(training.customerId).toLowerCase();
        const activity = training.activity.toLowerCase();
        const query = search.toLowerCase();
        return customerName.includes(query) || activity.includes(query);
    });

    // Sort filtered trainings
    const sortedTrainings = [...filteredTrainings].sort((a, b) => {
        if (sortField === 'customer') {
            const aCustomer = getCustomerName(a.customerId).toLowerCase();
            const bCustomer = getCustomerName(b.customerId).toLowerCase();

            if (aCustomer < bCustomer) return sortAsc ? -1 : 1;
            if (aCustomer > bCustomer) return sortAsc ? 1 : -1;
            return 0;
        } else if (sortField === 'date') {
            const aDate = new Date(a.date).getTime();
            const bDate = new Date(b.date).getTime();

            if (aDate < bDate) return sortAsc ? -1 : 1;
            if (aDate > bDate) return sortAsc ? 1 : -1;
            return 0;
        } else {
            const aValue = a[sortField]?.toString().toLowerCase() || '';
            const bValue = b[sortField]?.toString().toLowerCase() || '';

            if (aValue < bValue) return sortAsc ? -1 : 1;
            if (aValue > bValue) return sortAsc ? 1 : -1;
            return 0;
        }
    });

    // Handle adding new training
    const handleAddTraining = (newTraining) => {
        setTrainings([...trainings, newTraining]);
        setShowAddForm(false);
    };

    // Handle deleting training
    const handleDeleteTraining = (id) => {
        if (window.confirm('Are you sure you want to delete this training session?')) {
            setTrainings(trainings.filter((training) => training.id !== id));
        }
    };

    return (
        <div>
            <h1>Training Sessions</h1>

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

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
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
                        {sortedTrainings.map((training) => (
                            <tr key={training.id}>
                                <td>{dayjs(training.date).format('DD.MM.YYYY HH:mm')}</td>
                                <td>{training.activity}</td>
                                <td>{training.duration}</td>
                                <td>{getCustomerName(training.customerId)}</td>
                                <td>
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

            {/* Add Training Form Modal */}
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