'use client'
import Image from "next/image";
import toast from "react-hot-toast";
import { useState , useEffect} from "react";
export default function EditableImage({ link, setLink }) {
  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "bellachao"); // Your Cloudinary preset

      // Using fetch to upload the file
      const uploadPromise = fetch("https://api.cloudinary.com/v1_1/dtydbtb67/image/upload", {
        method: "POST",
        body: data,
      })
        .then(response => {
          if (response.ok) {
            return response.json(); // Parse JSON response
          }
          throw new Error("Something went wrong during upload");
        })
        .then(data => {
          const secureUrl = data.secure_url; // Correctly access the secure URL
          setLink(secureUrl); // Set the Cloudinary image URL in state
        });

      // Use toast to show upload status
      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete",
        error: "Upload error",
      });
    }
  }


  return (
    <>
      {link ? (
        <Image
        className="rounded-lg w-full h-full mb-1"
        src={link}
        width={250}
        height={250}
        alt="avatar"
      />
      ) : (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
          Change image
        </span>
      </label>
    </>
  );
}
