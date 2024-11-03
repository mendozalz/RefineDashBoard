import { useLogin } from "@refinedev/core";

const Login = () => {
  const { mutate, isLoading } = useLogin();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    mutate(data);
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          // We're providing default values for demo purposes.
          defaultValue="demo@demo.com"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          // We're providing default values for demo purposes.
          defaultValue="demodemo"
        />

        {isLoading && <span>loading...</span>}
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
