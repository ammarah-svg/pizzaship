"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image"; // Import Image component

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((users) => {
        setUsers(users);
      })
      .catch((err) => console.error(err)); // Handle errors
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!data?.admin) {
    return "Not an admin";
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
    <UserTabs isAdmin={true} />
    <div className="mt-8">
      {users?.length > 0 &&
        users.map((user) => {
          console.log(user); // Log user to console
          return (
            <div
              key={user?._id}
              className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex justify-between items-center gap-3"
            >
              <div className="flex items-center gap-3"> {/* Changed grid to flex for layout */}
                <Image
                  className="rounded-full object-cover" // Circular image with proper fitting
                  src={user?.image} // Use user's image or a placeholder
                  width={35} // Set width to 35px
                  height={35} // Set height to 35px
                  alt={user.name || "User Avatar"} // Provide alt text
                />
                <div className="flex flex-col">
                 
                  <span className="text-gray-500">{user?.email}</span>
                </div>
              </div>
  
              <div>
                <Link className="button" href={"/users/" + user?._id}>
                  Edit
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  </section>
  
  );
}
