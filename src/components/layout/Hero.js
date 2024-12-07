"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Right from "../icons/Right";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSliding, setIsSliding] = useState(true);

  useEffect(() => {
    // Set the loaded state after initial page load
    setIsLoaded(true);

    // Trigger sliding effect after 0.5 seconds
    setTimeout(() => {
      setIsSliding(false); // Trigger sliding animation after half a second
    }, 500); // Delay the sliding animation
  }, []);

  return (
    <div className="relative mt-0  overflow-hidden">
      {/* Sliding divs */}
      <div
  className={`position-fixed w-full h-screen bg-transparent left-0 z-10 flex transition-transform duration-1000`}
>
  {/* Left Div */}
  <div
    className={`left-half bg-primary flex justify-center items-center transition-transform duration-1000 ${
      !isSliding ? "transform-translate-left" : ""
    }`}
    style={{
      background: 'linear-gradient(90deg, #f13a01 25%, #f56a28 25%, #f56a28 50%, #f13a01 50%, #f13a01 75%, #f56a28 75%, #f56a28 100%)', 
      backgroundSize: '100px 100px', /* Doubled spacing between lines */
      boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.2)', /* Optional: gives a fabric depth effect */
    }}
  >
    {/* Left content */}
  </div>

  {/* Right Div */}
  <div
    className={`right-half bg-primary flex justify-center items-center transition-transform duration-1000 ${
      !isSliding ? "transform-translate-right" : ""
    }`}
    style={{
      background: 'linear-gradient(90deg, #f13a01 25%, #f56a28 25%, #f56a28 50%, #f13a01 50%, #f13a01 75%, #f56a28 75%, #f56a28 100%)', 
      backgroundSize: '100px 100px', /* Same texture as left div with doubled spacing */
      boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.2)', /* Optional: adds depth to the fabric effect */
    }}
  >
    {/* Right content */}
  </div>
</div>


      {/* Main content below */}
      <section className="hero flex justify-center items-center gap-12 md:gap-48 relative top-0 py-8 md:py-12">
        <div className="text-center md:text-left">
          <h1 className="text-6xl font-semibold">
            Everything
            <br />
            is better
            <br />
            with a&nbsp;
            <span className="text-primary">Pizza</span>
          </h1>
          <p className="my-6 text-gray-500">
            Pizza is the missing piece that makes every day complete, a simple yet
            delicious joy in life.
          </p>
          <div className="flex gap-4 text-sm justify-center md:justify-start">
            <Link href="/menu" passHref>
              <button className="flex justify-center cursor-pointer bg-primary uppercase items-center gap-2 text-white px-4 py-2 rounded-full min-w-[200px]">
                Explore
                <Right />
              </button>
            </Link>
            <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold min-w-[150px]">
              Learn more
              <Right />
            </button>
          </div>
        </div>

        <div className="relative hidden md:block image-container">
          <Image
            width={600}
            height={600}
            src="/pizza.png"
            alt="Pizza Image"
            className={isLoaded ? "rotate-on-load" : ""}
          />
        </div>
      </section>
    </div>
  );
}
