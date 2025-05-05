/**
 * Utility function for exporting customer data to CSV format
 */

/**
 * Exports an array of customers to a CSV file and triggers a download
 * 
 * @param {Array} customers - Array of customer objects to export
 * @param {string} filename - Name of the file to download (defaults to 'customers.csv')
 */
export const exportToCSV = (customers, filename = 'customers.csv') => {
    // Define the columns we want to export (excluding any action columns)
    const columns = ['First Name', 'Last Name', 'Email', 'Phone', 'Address', 'City'];
    const keys = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];

    // Create CSV header row
    let csvContent = columns.join(',') + '\n';

    // Add each customer as a row
    customers.forEach(customer => {
        const row = keys.map(key => {
            // Get the property value, or empty string if undefined
            const value = customer[key] || '';

            // Wrap value in quotes and escape any internal quotes (CSV standard)
            return `"${String(value).replace(/"/g, '""')}"`;
        });

        // Add the row to CSV content
        csvContent += row.join(',') + '\n';
    });

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    // Set up and trigger download
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up DOM
};