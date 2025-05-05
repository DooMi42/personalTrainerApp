/**
 * Mock data for the Personal Trainer application
 * Contains customer data, training sessions, and utility functions
 */

import { v4 as uuidv4 } from 'uuid';

// Initial mock data for customers
// Each customer has basic identification and contact information
export const initialCustomers = [
    {
        id: "c1",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "555-123-4567",
        address: "123 Main St",
        city: "Anytown"
    },
    {
        id: "c2",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "555-987-6543",
        address: "456 Oak Ave",
        city: "Somewhere"
    },
    {
        id: "c3",
        firstName: "Robert",
        lastName: "Johnson",
        email: "robert@example.com",
        phone: "555-555-5555",
        address: "789 Pine Rd",
        city: "Nowhere"
    },
    {
        id: "c4",
        firstName: "Sarah",
        lastName: "Williams",
        email: "sarah@example.com",
        phone: "555-222-3333",
        address: "101 Elm St",
        city: "Elsewhere"
    },
    {
        id: "c5",
        firstName: "Michael",
        lastName: "Brown",
        email: "michael@example.com",
        phone: "555-444-7777",
        address: "202 Cedar Ln",
        city: "Anytown"
    }
];

// Initial mock data for training sessions
// Each training session links to a customer via customerId
export const initialTrainings = [
    {
        id: "t1",
        date: "2025-04-15T10:30:00", // ISO format date string
        activity: "Running",
        duration: 30, // in minutes
        customerId: "c1" // references customer with id "c1"
    },
    {
        id: "t2",
        date: "2025-04-16T14:00:00",
        activity: "Yoga",
        duration: 60,
        customerId: "c2"
    },
    {
        id: "t3",
        date: "2025-04-17T09:15:00",
        activity: "Strength Training",
        duration: 45,
        customerId: "c1"
    },
    {
        id: "t4",
        date: "2025-04-18T16:30:00",
        activity: "Spinning",
        duration: 45,
        customerId: "c3"
    },
    {
        id: "t5",
        date: "2025-04-19T11:00:00",
        activity: "Swimming",
        duration: 60,
        customerId: "c4"
    },
    {
        id: "t6",
        date: "2025-04-20T13:45:00",
        activity: "Yoga",
        duration: 75,
        customerId: "c2"
    },
    {
        id: "t7",
        date: "2025-04-21T08:00:00",
        activity: "Running",
        duration: 45,
        customerId: "c5"
    }
];

/**
 * Generates a unique ID using UUID v4
 * Used for creating new customers and training sessions
 * @returns {string} A unique identifier
 */
export const generateId = () => uuidv4();

/**
 * List of available activities for the training dropdown
 * Used in the TrainingForm component
 */
export const activityOptions = [
    "Running",
    "Yoga",
    "Strength Training",
    "Spinning",
    "Swimming",
    "Pilates",
    "Boxing",
    "Cycling",
    "HIIT",
    "Stretching"
];