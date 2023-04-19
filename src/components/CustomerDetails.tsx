import React, { useState } from 'react';
import axios from 'axios';

interface CustomerData {
    isSuccess: boolean;
    result: {
        customerId: number;
        name: string;
    }[];
}

interface Props { }

const API_ENDPOINT = 'https://customertestapiservice.azurewebsites.net/api/Customer';

const CustomerDetails: React.FC<Props> = () => {
    const [customerId, setCustomerId] = useState<number | null>(null);
    const [customerName, setCustomerName] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleClick = async () => {
        if (!customerId) {
            setErrorMessage('Please enter a customer ID.');
            return;
        }

        try {
            const response = await axios.get<CustomerData>(`${API_ENDPOINT}?id=${customerId}`);
            const jsonString: string = JSON.stringify(response.data);
            const data: CustomerData = JSON.parse(jsonString) as CustomerData;

            if (data) {
                setCustomerId(data.result[0].customerId);
                setCustomerName(data.result[0].name);
                setErrorMessage(null);
            } else {
                setErrorMessage(`No customer found with ID ${customerId}.`);
                setCustomerName('');
                setCustomerId(0);
            }
        } catch (error) {
            console.error(error);
            setCustomerName('');
            setCustomerId(0);
            setErrorMessage('An error occurred while fetching customer data.');
        }
    };

    return (
        <div className="container my-5">
            <h2 className="mb-4">Customer Details</h2>
            <div className="row mb-3">
                <div className="col-auto">
                    <label htmlFor="customerId" className="form-label">Customer ID:</label>
                    <input type="number" className="form-control" id="customerId"
                        value={customerId ?? ''}
                        onChange={(event) => setCustomerId(Number(event.target.value))} />

                    <button className="btn btn-primary" onClick={handleClick}>Fetch Customer</button>
                </div>
            </div>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div>
                <p>ID: {customerId}</p>
                <p>Customer Name: {customerName}</p>
            </div>
        </div>
    );
};

export default CustomerDetails;
