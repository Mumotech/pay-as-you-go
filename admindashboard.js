/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [phoneId, setPhoneId] = useState('');

    const handleTrack = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(/track-phone/${phoneId}, { headers: { Authorization: token } });
        alert(Phone location: ${response.data.location});
    };

    const handleLock = async () => {
        const token = localStorage.getItem('token');
        await axios.post(/lock-phone/${phoneId}, {}, { headers: { Authorization: token } });
        alert('Phone locked');
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <input type="text" placeholder="Phone ID" value={phoneId} onChange={(e) => setPhoneId(e.target.value)} />
            <button onClick={handleTrack}>Track Phone</button>
            <button onClick={handleLock}>Lock Phone</button>
        </div>
    );
};

export default AdminDashboard;