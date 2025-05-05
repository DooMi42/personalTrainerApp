/**
 * CustomerForm component
 * Form for adding new customers or editing existing ones
 */
import { useState, useEffect } from 'react';
import { generateId } from '../../data/mockData';

const CustomerForm = ({ customer, onSave, onCancel }) => {
    // Form data state with default empty values
    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: ''
    });

    /**
     * Initialize form with customer data if editing an existing customer
     * This effect runs when the customer prop changes
     */
    useEffect(() => {
        if (customer) {
            setFormData(customer);
        }
    }, [customer]);

    /**
     * Handle form input changes
     * Updates the formData state when any field changes
     * 
     * @param {Event} e - Input change event
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * Handle form submission
     * Either updates an existing customer or creates a new one
     * 
     * @param {Event} e - Form submit event
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Generate id if adding new customer, or use existing id if editing
        const customerToSave = customer
            ? formData
            : { ...formData, id: generateId() };

        onSave(customerToSave);
    };

    // Determine form title based on whether we're adding or editing
    const formTitle = customer ? 'Edit Customer' : 'Add New Customer';

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2 className="form-title">{formTitle}</h2>

            {/* First Name field */}
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Last Name field */}
            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Email field */}
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Phone field */}
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Address field - optional */}
            <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                />
            </div>

            {/* City field - optional */}
            <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleChange}
                />
            </div>

            {/* Form action buttons */}
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

export default CustomerForm;