import React from 'react';
import CustomerDetails from './components/CustomerDetails';
import CreateCustomer from './components/CreateCustomer';

function App() {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6">
                    <CustomerDetails />
                </div>
                <div className="col-md-6">
                    <CreateCustomer />
                </div>
            </div>
        </div>
    );
}
export default App;
