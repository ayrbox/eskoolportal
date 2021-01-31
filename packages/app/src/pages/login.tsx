import { useState, FC } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/client';

import Layout from '@components/ExternalLayout';
import { sign } from 'jsonwebtoken';

const Login: FC = () => {
  const [email, setEmail] = useState('admin@eskoolportal.com');
  const [password, setPassword] = useState('Passw0rd!23');
  const router = useRouter();

  const [session] = useSession();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth', { email, password }); // TODO: verify response for message and status
      if (res.status === 200) {
        router.push('/');
      }
    } catch (err) {
      console.error(err);
      // console.error(err.response.data.message);
    }
  };

  const handleInputChange = (setValue) => (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Layout>
      <div>
        <h1 className="logo-name">esk+</h1>
      </div>
      <h3>Welcome to eskoolPortal</h3>
      <p>Please enter email and password.</p>
      <form className="m-t" role="form" onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            required
            onChange={handleInputChange(setEmail)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            required
            onChange={handleInputChange(setPassword)}
          />
        </div>
        <button type="submit" className="btn btn-primary block full-width m-b">
          Login
        </button>

        <hr />

        {session ? (
          <>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <button
              className="btn btn-primary block full-width m-b"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            className="btn btn-primary block full-width m-b"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        )}
      </form>
    </Layout>
  );
};

export default Login;
