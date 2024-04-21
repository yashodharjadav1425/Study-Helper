import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/api/login', {
              email: email,
              password: password,
          });
      
          console.log('Server Response:', response.data); // Log server response
          
          if (response.data.success) {
              setSuccessMessage(response.data.message);
              setError('');
              
              window.location.href = '/learning';
          } else {
              setError('Email or password incorrect');
              setSuccessMessage('');
          }
      } catch (error) {
          console.error('Error:', error);
      }
      
    };

    return (
        <div className="max-w-md mx-auto my-10 p-5 border rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-5">Login</h2>
            {error && <p className="text-red-500 mb-3">{error}</p>}
            {successMessage && <p className="text-green-500 mb-3">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-md px-3 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-md px-3 py-2 w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-black-500 hover:bg-blue-600 text-blue font-semibold px-4 py-2 rounded-md"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
