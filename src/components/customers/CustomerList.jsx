import { useState } from 'react';
import CustomerForm from './CustomerForm';
import { exportToCSV } from '../../utils/csvExport';

const CustomerList = ({ customers, setCustomers }) => {
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState('lastName');
    const [sortAsc, setSortAsc] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);

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

    // Filter customers based on search text
    const filteredCustomers = customers.filter((customer) =>
        `${customer.firstName} ${customer.lastName} ${customer.email}`.toLowerCase()
            .includes(search.toLowerCase())
    );

    // Sort filtered customers
    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
        const aValue = a[sortField]?.toString().toLowerCase() || '';
        const bValue = b[sortField]?.toString().toLowerCase() || '';

        if (aValue < bValue) return sortAsc ? -1 : 1;
        if (aValue > bValue) return sortAsc ? 1 : -1;
        return 0;
    });

    // Handle adding new customer
    const handleAddCustomer = (newCustomer) => {
        setCustomers([...customers, newCustomer]);
        setShowAddForm(false);
    };

    // Handle updating customer
    const handleUpdateCustomer = (updatedCustomer) => {
        setCustomers(
            customers.map((customer) =>
                customer.id === updatedCustomer.id ? updatedCustomer : customer
            )
        );
        setEditingCustomer(null);
    };

    // Handle deleting customer
    const handleDeleteCustomer = (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            setCustomers(customers.filter((customer) => customer.id !== id));
        }
    };

    // Handle export to CSV
    const handleExportCSV = () => {
        exportToCSV(customers, 'customers.csv');
    };

    return (
        <div>
            <h1>Customers</h1>

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

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
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
                        {sortedCustomers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.firstName}</td>
                                <td>{customer.lastName}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>
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

            {/* Add Customer Form Modal */}
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

            {/* Edit Customer Form Modal */}
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