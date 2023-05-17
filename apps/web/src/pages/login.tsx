import {
  useState,
  FunctionComponent,
  FormEventHandler,
  ChangeEventHandler,
} from "react";
import { getCsrfToken, signIn } from "next-auth/react";

import { useRouter } from "next/router";
import { NextPageContext } from "next";

interface LoginProps {
  csrfToken: string;
}

const Login: FunctionComponent<LoginProps> = ({ csrfToken }) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("admin@eskoolportal.com");
  const [password, setPassword] = useState<string>("Passw0rd!23");

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    signIn("credentials", { email, password, callbackUrl: "/" });
  };

  const handleInputChange =
    (setValue: Function): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      e.preventDefault();
      setValue(e.target.value);
    };

  const message = router.query?.message;

  return (
    <div className="middle-box text-center loginscreen animated fadeInDown">
      <div>
        <h1 className="logo-name">esk+</h1>
      </div>
      <h3>Welcome to eskoolPortal</h3>
      <p>Please enter email and password.</p>

      {message && <div className="alert alert-danger">{message}</div>}

      <form className="m-t" role="form" onSubmit={handleLogin}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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
      </form>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Login;
