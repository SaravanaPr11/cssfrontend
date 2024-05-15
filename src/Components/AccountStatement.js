import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountStatement.css";
import api from "./api/Api";
import { useParams } from "react-router-dom";
import moment from 'moment';

const AccountStatement = () => {
    const navigate = useNavigate();
    const { accountNumber } = useParams();
    const [responseData, setResponseData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    useEffect(() => {
        getStatementDetails();
    }, []);

    const getStatementDetails = async () => {
        try {
            const response = await api.get(`getstatement/${accountNumber}`);
            setResponseData(response.data);
            console.log("api response", response.data);
        } catch (error) {
            console.error("Error fetching account statement:", error);
        }
    }

    const handleBack = () => {
        navigate("/MyAccount");
    }

    const formatDate = (date) => {
        return moment(date).format("DD-MM-YYYY");
    }

    const handleLogout = () => {
        navigate('/');
    }

    let currentItems = [];
    if (Array.isArray(responseData) && responseData.length > 0) {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        currentItems = responseData.slice(indexOfFirstItem, indexOfLastItem);
    }

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className="accbody">
            <button className="statelogout" type="button" onClick={handleLogout}>Logout</button>
            <div className="account-statement">
                <div className="background">
                    <h2>Account Statement</h2>
                </div>

                <p className="statname">Account number: {accountNumber}</p>

                <table className="tablestate">
                    <thead>
                        <tr className="titstat">
                            <th>TransactionDate</th>
                            <th>Description</th>
                            <th>Credit/Debit</th>
                            <th>Cheque/Ref No</th>
                            <th>Closing Balance</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentItems.map((accno, index) => (
                            <tr className="tablerow" key={index}>
                                <td>{formatDate(accno.date)}</td>
                                <td>{accno.description}</td>
                                <td>{accno.creditOrDebitAmount}</td>
                                <td>{accno.chequeNo}</td>
                                <td>{accno.closingBalance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <button type="button" className="back-button2" onClick={handleBack}>Back</button>
            </div>
            <div className="Pagination">
                <button
                    className="PrevButton"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="PageNumber">{currentPage}</span>
                <button
                    className="NextButton"
                    onClick={nextPage}
                    disabled={currentItems.length < itemsPerPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AccountStatement;
