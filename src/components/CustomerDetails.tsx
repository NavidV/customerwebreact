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
        <div>
            <h2>Customer Details</h2>
            <div>
                <label htmlFor="customerId">Customer ID:</label>
                <input
                    type="number"
                    id="customerId"
                    value={customerId ?? ''}
                    onChange={(event) => setCustomerId(Number(event.target.value))}
                />
                <button onClick={handleClick}>Fetch Customer</button>
            </div>
            {errorMessage && <div>{errorMessage}</div>}
            <div>
                <p>ID: {customerId}</p>
                {customerName && <p>Customer Name: {customerName}</p>}
            </div>
        </div>
    );
};

export default CustomerDetails;
