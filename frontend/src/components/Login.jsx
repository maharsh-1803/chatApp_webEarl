import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting to log in with:', { username, password });
      const response = await axios.post('https://chatapp-webearl.onrender.com/api/auth/login', {
        username: username,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Server response:', response.data);

      localStorage.setItem('token', response.data.data.token); 
      console.log(response.data.data.token); 
      if (response.data.message === 'login successfuly') {
        navigate("/")
        setMessage('Login successful!');
        setMessageType('success');
        setIsLoggedIn(true); // Update isLoggedIn state to true
      } else {
        setMessage(response.data.message || 'Login failed. Please check your credentials.');
        setMessageType('error');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response from server:', error.response);
        // setMessage(Error: ${error.response.data.message || 'Login failed. Please check your credentials.'});
        setMessageType('error');
      } else if (error.request) {
        console.error('No response received:', error.request);
        setMessage('No response from server. Please try again later.');
        setMessageType('error');
      } else {
        console.error('Error setting up request:', error.message);
        // setMessage(Error: ${error.message});
        setMessageType('error');
      }
    }
  };

  return (
    <div className="login-container flex items-center justify-center min-h-screen bg-gray-100">
      <div className="login-box bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Login Form</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username:</label>
            <input
              className="w-full p-2 border border-gray-300 rounded mt-1"
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              className="w-full p-2 border border-gray-300 rounded mt-1"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" type="submit">Submit</button>
          </div>
        </form>
        {message && (
          <p className={`text-center mt-4 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;