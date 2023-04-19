import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateCustomer from './components/CreateCustomer';
import CustomerDetails from './components/CustomerDetails';
import Header from './components/Header';
import Home from './components/Home';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/customer-details" element={<CustomerDetails />} />
                <Route path="/create-customer" element={<CreateCustomer />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;