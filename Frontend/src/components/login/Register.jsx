import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/api/register', {
          username: username,
          email: email,
          password: password,
        });
        console.log(response.data); // Handle the response as needed
      } catch (error) {
        console.error('Error:', error);
      }
    };  

    return (
        <div className="max-w-md mx-auto my-10 p-5 border rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-5">Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border rounded-md px-3 py-2 w-full" />
                </div>
                <div className="mb-4">
                    <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-md px-3 py-2 w-full" />
                </div>
                <div className="mb-4">
                    {/* <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded-md px-3 py-2 w-full" /> */}
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded-md px-3 py-2 w-full" />

                </div>
                <button type="submit" className="bg-black-500 hover:bg-blue-600 text-blue font-semibold px-4 py-2 rounded-md">Register</button>
            </form>
        </div>
    );
}

export default Register;
