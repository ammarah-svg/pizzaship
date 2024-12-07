'use client';

export default function SectionHeaders({subHeader,mainHeader}) {
  return (
    <>
      <h3 className="uppercase text-gray-500 font-semibold leading-4">
        {subHeader}
      </h3>
      <h2 className="text-primary font-bold py-3 text-4xl ">
        {mainHeader}
      </h2>
    </>
  );
}