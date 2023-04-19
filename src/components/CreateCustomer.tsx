import React, { useState } from 'react';
import axios from 'axios';

interface CustomerData {
    CustomerId: number;
    name: string;
}

const API_ENDPOINT = 'https://customertestapiservice.azurewebsites.net/api/Customer';

const CreateCustomer: React.FC = () => {
    const [customerId, setCustomerId] = useState<number | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post<CustomerData>(API_ENDPOINT, { CustomerId: customerId, name });
            if (response.status === 201) {
                setMessage('Customer created successfully!');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred while creating the customer.');
        }
    };

    return (
        <div>
            <h1>Create Customer</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Customer ID:
                    <input type="number" onChange={(event) => setCustomerId(parseInt(event.target.value))} />
                </label>
                <br />
                <label>
                    Name:
                    <input type="text" onChange={(event) => setName(event.target.value)} />
                </label>
                <br />
                <button type="submit">Create Customer</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateCustomer;
