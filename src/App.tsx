import React from 'react';
import CustomerDetails from './components/CustomerDetails';
import CreateCustomerDetails from './components/CreateCustomer';
import CreateCustomer from './components/CreateCustomer';

function App() {
    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
                <CustomerDetails />
            </div>
            <div style={{ flex: 1 }}>
                <CreateCustomer />
            </div>
        </div>
    );
}

export default App;