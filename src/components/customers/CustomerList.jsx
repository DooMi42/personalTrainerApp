/**
 * CustomerList component
 * Displays a list of customers with search, sort, and CRUD capabilities
 */
import { useState } from 'react';
import CustomerForm from './CustomerForm';
import { exportToCSV } from '../../utils/csvExport';

const CustomerList = ({ customers, setCustomers }) => {
    // State for managing UI functionality
    const [search, setSearch] = useState(''); // Tracks search input value
    const [sortField, setSortField] = useState('lastName'); // Current sort column
    const [sortAsc, setSortAsc] = useState(true); // Sort direction (ascending/descending)
    const [showAddForm, setShowAddForm] = useState(false); // Controls add form visibility
    const [editingCustomer, setEditingCustomer] = useState(null); // Tracks customer being edited

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

    // Filter customers based on search text
    // Searches across first name, last name, and email
    const filteredCustomers = customers.filter((customer) =>
        `${customer.firstName} ${customer.lastName} ${customer.email}`.toLowerCase()
            .includes(search.toLowerCase())
    );

    // Sort filtered customers based on current sort field and direction
    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
        const aValue = a[sortField]?.toString().toLowerCase() || '';
        const bValue = b[sortField]?.toString().toLowerCase() || '';

        if (aValue < bValue) return sortAsc ? -1 : 1;
        if (aValue > bValue) return sortAsc ? 1 : -1;
        return 0;
    });

    /**
     * Handle adding a new customer
     * @param {Object} newCustomer - The customer object to add
     */
    const handleAddCustomer = (newCustomer) => {
        setCustomers([...customers, newCustomer]);
        setShowAddForm(false);
    };

    /**
     * Handle updating an existing customer
     * @param {Object} updatedCustomer - The updated customer object
     */
    const handleUpdateCustomer = (updatedCustomer) => {
        setCustomers(
            customers.map((customer) =>
                customer.id === updatedCustomer.id ? updatedCustomer : customer
            )
        );
        setEditingCustomer(null);
    };

    /**
     * Handle deleting a customer with confirmation
     * @param {string} id - ID of the customer to delete
     */
    const handleDeleteCustomer = (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            setCustomers(customers.filter((customer) => customer.id !== id));
        }
    };

    /**
     * Handle exporting customer data to CSV format
     */
    const handleExportCSV = () => {
        exportToCSV(customers, 'customers.csv');
    };

    return (
        <div>
            <h1>Customers</h1>

            {/* Search and action buttons */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search customers..."
                    value={search}
                    onChange={handleSearchChange}
                />
                <button className="btn-primary" onClick={() => setShowAddForm(true)}>
                    Add Customer
                </button>
                <button className="btn-secondary" onClick={handleExportCSV}>
                    Export to CSV
                </button>
            </div>

            {/* Customer data table */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            {/* Column headers with sort indicators */}
                            <th onClick={() => handleSort('firstName')}>
                                First Name
                                {sortField === 'firstName' && (
                                    <span className="sort-indicator">
                                        {sortAsc ? ' ▲' : ' ▼'}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => handleSort('lastName')}>
                                Last Name
                                {sortField === 'lastName' && (
                                    <span className="sort-indicator">
                                        {sortAsc ? ' ▲' : ' ▼'}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => handleSort('email')}>
                                Email
                                {sortField === 'email' && (
                                    <span className="sort-indicator">
                                        {sortAsc ? ' ▲' : ' ▼'}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => handleSort('phone')}>
                                Phone
                                {sortField === 'phone' && (
                                    <span className="sort-indicator">
                                        {sortAsc ? ' ▲' : ' ▼'}
                                    </span>
                                )}
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map through sorted customers to create table rows */}
                        {sortedCustomers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.firstName}</td>
                                <td>{customer.lastName}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>
                                    {/* Edit and Delete buttons */}
                                    <button
                                        className="btn-secondary"
                                        onClick={() => setEditingCustomer(customer)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn-danger"
                                        onClick={() => handleDeleteCustomer(customer.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Customer Form Modal - conditionally rendered */}
            {showAddForm && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <CustomerForm
                            onSave={handleAddCustomer}
                            onCancel={() => setShowAddForm(false)}
                        />
                    </div>
                </div>
            )}

            {/* Edit Customer Form Modal - conditionally rendered */}
            {editingCustomer && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <CustomerForm
                            customer={editingCustomer}
                            onSave={handleUpdateCustomer}
                            onCancel={() => setEditingCustomer(null)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerList;