"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((users) => {
        setUsers(users);
      })
      .catch((err) => console.error(err));
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
            console.log(user);
            return (
              <div
                key={user?._id}
                className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex justify-between items-center gap-3"
              >
                <div className="flex items-center gap-3">
                  <Image
                    className="rounded-full object-cover"
                    src={user?.image || '/default-avatar.png'}
                    width={35}
                    height={35}
                    alt={user?.name || "User Avatar"}
                    unoptimized // Optional: Allows displaying non-optimized images if needed
                    onError={(e) => (e.target.src = '/default-avatar.png')}
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
