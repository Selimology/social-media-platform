import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdVerifiedUser } from 'react-icons/md';
import useAuthStore from '../store/authStore';
import { User } from '../types/types';
const Recommended = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="xl:border-b-2 border-gray-200 b-4 p-4">
      <p className="hidden xl:block  text-gray-400 text-base tracking-wider m-2">
        Recommended Account
      </p>
      <div>
        {allUsers.slice(0, 3).map((user: User) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex cursor-pointer p-2 font-bold gap-3 hover:bg-gray-100">
              <div className="w-8 h-8 ">
                <Image
                  src={user.image}
                  width="32"
                  height="32"
                  className="rounded object-cover"
                  alt="user"
                />
              </div>

              <div className="hidden xl:block">
                <p className="flex gap-1 items-center lowercase text-small font-semibold text-black">
                  {user.userName.replaceAll(' ', '')}
                  <MdVerifiedUser className="text-blue-400" />
                </p>
                <p className="capitalize text-gray-400 text-xs">
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
