'use client';
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState(null);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    setError(null);
  
    try {
      const result = await signIn('credentials', {
        email,  // This should match the field name in the authorize method
        password,
        redirect: false,
        callbackUrl: '/'
      });
  
      if (result.error) {
        setError("Invalid email or password");
      } else {
        window.location.href = result.url; // Manually redirect on success
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoginInProgress(false);
    }
  }
  

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <label htmlFor="email" className="sr-only">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          disabled={loginInProgress}
          onChange={(ev) => setEmail(ev.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-primary"
          required
        />

        <label htmlFor="password" className="sr-only">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          disabled={loginInProgress}
          onChange={(ev) => setPassword(ev.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-primary"
          required
        />

        <button
          type="submit"
          disabled={loginInProgress}
          aria-busy={loginInProgress}
          className="w-full p-2 mb-4 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50"
        >
          {loginInProgress ? "Logging in..." : "Login"}
        </button>

        <div className="my-4 text-center text-gray-500">or login with provider</div>

        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="flex gap-4 justify-center w-full p-2 border rounded hover:bg-gray-100"
        >
          <Image src={'/google.png'} alt="Google icon" width={24} height={24} />
          Login with Google
        </button>
      </form>
    </section>
  );
}
