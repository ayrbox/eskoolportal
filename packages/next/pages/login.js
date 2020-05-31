import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Layout from "../components/ExternalLayout";
import Router from "next/router";

const Login = ({ message }) => {
  const [email, setEmail] = useState("admin@eskoolportal.com");
  const [password, setPassword] = useState("Passw0rd1!");

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password
      });
      alert("Login successful.");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const handleInputChange = setValue => e => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <Layout>
      <div>
        <h1 class="logo-name">esk+</h1>
      </div>
      <h3>Welcome to eskoolPortal</h3>
      <p>Please enter email and password.</p>
      <form class="m-t" role="form" onSubmit={handleLogin}>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            placeholder="Email"
            value={email}
            required
            onChange={handleInputChange(setEmail)}
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            value={password}
            required
            onChange={handleInputChange(setPassword)}
          />
        </div>
        <button type="submit" class="btn btn-primary block full-width m-b">
          Login
        </button>
      </form>
    </Layout>
  );
};

export async function getServerSideProps({ req, query }) {
  // const { class: classQuery } = query;

  // const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : ''; // REVISIT: not ideal but could be passed into via context.

  // const classRes = await axios.get(`${baseUrl}/api/classes`);
  // // const sectionRes = await axios.get(`${baseUrl}/sections`);

  // const classId = classQuery || classRes.data[0]["id"];

  // const res = await axios.get(`${baseUrl}/api/students?class=${classId}`);

  return {
    props: {
      message: "Hello"
    }
  };
}

export default Login;
