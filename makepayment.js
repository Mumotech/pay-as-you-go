/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
import axios from 'axios';
import React, { useState } from 'react';

const MakePayment = () => {
    const [phoneId, setPhoneId] = useState('');
    const [amount, setAmount] = useState('');

    const handlePayment = async () => {
        const token = localStorage.getItem('token');
        await axios.post('/make-payment', { phoneId, amount }, { headers: { Authorization: token } });
        alert('Payment made');
    };

    return (
        <div>
            <h2>Make Payment</h2>
            <input type="text" placeholder="Phone ID" value={phoneId} onChange={(e) => setPhoneId(e.target.value)} />
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button onClick={handlePayment}>Make Payment</button>
        </div>
    );
};

export default MakePayment;