"use client"; // Mark this as a client-side component

import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { hydrateRoot } from "react-dom/client";

export default function Home() {
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      hydrateRoot(root); // Hydrate the root if necessary
    }
  }, []);

  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
        <div className="text-gray-500 w-[750px] mx-auto mt-4 flex flex-col gap-4">
          <p>
            At Crust & Co., every slice of pizza tells a story, a story that
            began long before our ovens ever fired up. It all started with a
            simple yet ambitious vision: to craft not just great pizza, but an
            experience. An experience that would bring people together,
            celebrate community, and make every bite unforgettable.
          </p>
          <p>
            Our story dates back to the year 2000, a time when the world was
            beginning to embrace the possibilities of technology, new trends,
            and global flavors. At Crust & Co., we decided to blend these
            influences into something familiar yet innovative. We wanted to
            bring high-quality, delicious pizza to the world, but with a
            twist—crafting it with passion, care, and an unwavering commitment.
          </p>
      
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="my-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+46738123123"
          >
            +92 328 123 123
          </a>
        </div>
      </section>
    </>
  );
}
