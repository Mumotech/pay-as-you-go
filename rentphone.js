/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
import axios from 'axios';
import React, { useState } from 'react';

const RentPhone = () => {
    const [phoneId, setPhoneId] = useState('');
    const [installments, setInstallments] = useState('');

    const handleRent = async () => {
        const token = localStorage.getItem('token');
        await axios.post('/rent-phone', { phoneId, installments }, { headers: { Authorization: token } });
        alert('Phone rented');
    };

    return (
        <div>
            <h2>Rent Phone</h2>
            <input type="text" placeholder="Phone ID" value={phoneId} onChange={(e) => setPhoneId(e.target.value)} />
            <input type="number" placeholder="Number of Installments" value={installments} onChange={(e) => setInstallments(e.target.value)} />
            <button onClick={handleRent}>Rent Phone</button>
        </div>
    );
};

export default RentPhone;