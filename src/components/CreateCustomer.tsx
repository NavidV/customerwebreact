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
        <div className="container my-5">
            <h1 className="mb-5">Create Customer</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="customerId" className="form-label">Customer ID:</label>
                    <input type="number" className="form-control" id="customerId" onChange={(event) => setCustomerId(parseInt(event.target.value))} />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" className="form-control" id="name" onChange={(event) => setName(event.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary mb-3">Create Customer</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateCustomer;
