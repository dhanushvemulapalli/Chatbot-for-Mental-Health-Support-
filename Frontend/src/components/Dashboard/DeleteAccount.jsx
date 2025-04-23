import React, { useState } from 'react';

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleDeleteAccount = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/delete-logged-in-user/', {
        method: 'POST',
        credentials: 'include', // 👈 VERY IMPORTANT to include session cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.success || 'Account deleted successfully.');
        // Optional: Redirect to login/home page
        // window.location.href = '/login';
      } else {
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error occurred.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Delete Your Account</h2>
      <p>Warning: This will permanently delete your data.</p>
      <button onClick={handleDeleteAccount} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete My Account'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteAccount;
