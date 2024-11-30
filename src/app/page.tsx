'use client'

import { useEffect, useState } from 'react';

const serverIp = '192.168.10.52';

const Login = () => {
  const [code, setCode] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      const queryCode = queryParams.get('code');
      if (queryCode) {
        setCode(queryCode);

        const postUrl = `http://${serverIp}:8080/get-token`;
        fetch(postUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: queryCode }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('-----', data);
            setResponseMessage(data || 'Success!');
          })
          .catch((error) => {
            console.error('Error:', error);
            setResponseMessage('An error occurred. Check the console.');
          });
      }
    }
  }, []);

  const handleLogin = () => {
    const authUrl = `http://${serverIp}:8080/app-login?appName=app1`;
    window.location.href = authUrl;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Login Page</h1>
      {!code ? (
        <>
          <p>Click the button below to log in.</p>
          <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Login
          </button>
        </>
      ) : (
        <p>Processing code: {code}</p>
      )}
      {responseMessage && <p>{JSON.stringify(responseMessage)}</p>}
    </div>
  );
};

export default Login;
