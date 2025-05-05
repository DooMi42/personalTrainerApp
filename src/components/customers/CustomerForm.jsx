import { useState, useEffect } from 'react';
import { generateId } from '../../data/mockData';

const CustomerForm = ({ customer, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: ''
    });

    // Initialize form with customer data if editing
    useEffect(() => {
        if (customer) {
            setFormData(customer);
        }
    }, [customer]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Generate id if adding new customer
        const customerToSave = customer
            ? formData
            : { ...formData, id: generateId() };

        onSave(customerToSave);
    };

    // Form title based on whether we're adding or editing
    const formTitle = customer ? 'Edit Customer' : 'Add New Customer';

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2 className="form-title">{formTitle}</h2>

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