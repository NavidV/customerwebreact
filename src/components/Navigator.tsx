import React, { useState } from "react";
import CustomerDetails from "./CustomerDetails";
import CreateCustomer from "./CreateCustomer";

enum Page {
    CustomerDetails = "Customer Detail",
    CreateCustomer = "Create Customer",
}

const Navigator: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(Page.CustomerDetails);

    const handleClick = (page: Page) => {
        setCurrentPage(page);
    };

    const renderPage = () => {
        switch (currentPage) {
            case Page.CustomerDetails:
                return <CustomerDetails />;
            case Page.CreateCustomer:
                return <CreateCustomer />;
            default:
                return <CustomerDetails />;
        }
    };

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <button onClick={() => handleClick(Page.CustomerDetails)}>
                            {Page.CustomerDetails}
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleClick(Page.CreateCustomer)}>
                            {Page.CreateCustomer}
                        </button>
                    </li>
                </ul>
            </nav>
            {renderPage()}
        </div>
    );
};

export default Navigator;
