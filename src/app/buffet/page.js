"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RateUs from "@/components/layout/RateUs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Right from "@/components/icons/Right";

// Sample data for the buffet cards
const buffetItems = [
  {
    title: "All-you-can-eat Pizza",
    description:
      "Choose from classics pizzas, specialty pizzas, thin crust flatbreads, and deep dish pizzas. If you don’t see your favorite pizza, just ask and we will make it for you. It’s a fresh-from-the-oven pizza feast to enjoy endlessly!",
    imageSrc: "/card1.jpg",
    link: "/menu",
  },
  {
    title: "Endless Salad bar",
    description:
      "Everything is unlimited, including our fresh salad buffet. Mix crisp lettuce with toppings like tomatoes, carrots, cucumbers, olives, croutons, and more, drizzled with your favorite salad dressing.",
    imageSrc: "/card2.jpg",
    link: "/menu",
  },
  {
    title: "Unlimited Pasta",
    description:
      "Unlimited pasta and pizza are the perfect pair. Enjoy all-you-can-eat pasta topped with your pick of satisfying marinara sauce or cheesy alfredo sauce, or keep it cool and create your own refreshing pasta salad.",
    imageSrc: "/card3.webp",
    link: "/menu",
  },
  {
    title: "Infinite Dessert",
    description:
      "Satisfy any sweet tooth with as much dessert as you'd like, all included in our buffet. Make sure to save room for our famous cinnamon rolls, decadent fudge brownies, and unique dessert pizzas.",
    imageSrc: "/card4.jpg",
    link: "/menu",
  },
  {
    title: "Hit The Game Zone Anytime",
    description:
      "Keep the fun going at our Game Zone arcade, featuring classics like SkeeBall and a claw machine for the whole family to enjoy. Play as long as you like, you may even win exciting prizes.",
    imageSrc: "/card5.jpg",
    link: "/drinks",
  },
];

export default function BuffetPage() {
  const heroImages = [
    "/hero.avif",
    "/hero.jpg",
    "/hero4.jpg",
    "/hero5.jpg",
    "/hero6.jpg",
    "/hero7.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <section className="relative mt-16">
        <Slider {...settings}>
          {heroImages.map((src, index) => (
            <div key={index} className="rounded-lg">
              <Image
                src={src}
                alt={`Buffet Hero Image ${index + 1}`}
                width={2000}
                height={800}
                className="w-full h-[600px] rounded-lg object-cover" // Updated for more rounded corners
              />
            </div>
          ))}
        </Slider>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold text-center">
            Buffet Feast
          </h1>
        </div>
      </section>

      <h1 className="mt-20 mb-12 text-4xl text-center text-primary capitalize font-bold">
        ANY DAY CAN BE A PIZZA BUFFET DAY
      </h1>

      <div className="text-gray-500 w-[850px] mx-auto mt-9 flex flex-col gap-4">
        <p className="text-center PrentonRPCond-Light ">
          Welcome friends, family, and pizza fans! Fantastic flavors, endless
          offerings, and classic to custom pizza creations are here at our
          all-you-can-eat buffet. See what we have on our buffet. Enjoy our
          endless offerings, and classic to custom pizza creations are here at
          our all-you-can-eat buffet. See what we have on our buffet.
        </p>
      </div>

      <section className="py-12">
        <div className="max-w-5xl mx-auto space-y-8 px-4">
          {buffetItems.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 p-6 bg-white rounded-lg shadow-lg ${
                index % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              <Image
                src={item.imageSrc}
                alt={item.title}
                width={600}
                height={600}
                className="rounded-md w-full md:w-auto"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Link
  href={item.link}
  className="text-primary font-semibold hover:text-primary-dark hover:underline decoration-solid"
>
  Learn More
</Link>

              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta ">
        <div className="container row justify-content-center align-items-center m-auto py-5">
          <div className="content col-lg-9">
            <h3 className="p-4 fw-bold  mt-6 text-4xl text-center text-white uppercase font-bold">
              CRUST & C0. BUFFET HOURS & PRICES NEAR YOU
            </h3>
            <div className="d-flex ">
              <p className=" text-center PrentonRPCond-Light text-white max-w-md text-1xl mx-auto mt-4 flex flex-col gap-">
                Crust & Co. buffets are open for lunch and dinner, but hours and
                prices may vary by each individually owned location. Find a
                location near you and visit our pizza buffet today.
              </p>

              <div className="flex justify-center align-middle gap-3 text-sm mt-6">
                <Link href="/menu" passHref>
                  <button className="flex justify-center bg-white mt-4 uppercase items-center gap-2 text-primary px-4 py-2 rounded-full min-w-[350px] outline-none focus:outline-none focus:bg-primary focus:text-white active:bg-primary active:text-white">
                    Use my current location
                    <Right />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RateUs />
    </div>
  );
}
