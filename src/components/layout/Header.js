'use client';
import { CartContext } from "@/components/AppContext";
import Bars2 from "@/components/icons/Bars2";
import ShoppingCart from "@/components/icons/ShoppingCart";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";

function AuthLinks({ status, userName }) {
  if (status === 'loading') {
    return <span>Loading...</span>;
  }
  if (status === 'authenticated') {
    return (
      <>
        <Link href="/profile" className="whitespace-nowrap">Hello, {userName}</Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Logout
        </button>
      </>
    );
  }
  return (
    <>
      <Link href="/login">Login</Link>
      <Link href="/register" className="bg-primary rounded-full text-white px-8 py-2">
        Register
      </Link>
    </>
  );
}

export default function Header() {
  const { data: session, status } = useSession();
  const userData = session?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (userData?.email) {
    const emailParts = userData.email.split('@');
    userName = emailParts[0]; // Use the part before '@' as username
    
  }

  return (
    <header>
      <div className="flex items-center md:hidden justify-between">
        <Link className="text-primary font-semibold text-2xl" href="/">Crust & Co.</Link>
        <div className="flex gap-8 items-center">
         
          <button
            aria-label="Toggle mobile navigation"
            className="p-1 border"
            onClick={() => setMobileNavOpen(prev => !prev)}
          >
            <Bars2 />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center"
        >
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href="/">Crust & Co.</Link>
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} userName={userName} />
        
        </nav>
      </div>
    </header>
  );
}
