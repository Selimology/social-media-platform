import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useRouter from 'next/router';
import { MdOutlineLogout, MdOutlineSearch } from 'react-icons/md';
import { IoAdd } from 'react-icons/io5';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { createOrSignUser } from '../utils';
import useAuthStore from '../store/auth';

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  return (
    <div className="w-full bg-white justify-between items-center flex border-b-2 border-gray-300 px-4 py-2 ">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <h2 className="font-bold text-3xl">NotTiktok</h2>
        </div>
      </Link>
      <div>SEARCH</div>
      <div>
        {userProfile ? (
          <div className="flex gap-4">
            <Link href="/upload">
              <button className="border-2 bg-black text-white  hover:bg-white hover:text-black ease-in-out transform duration-200 shadow-sm px-2 py-1 rounded md:px-6 text-md font-semibold flex items-center gap-2">
                <IoAdd className="text-xl" />
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <Image
                  width={35}
                  height={35}
                  className="rounded object-cover"
                  src={userProfile.image}
                  alt="profile"
                />
              </Link>
            )}
            <button
              type="button"
              className="p-1 md:p-2 bg-gray-200 rounded-full"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <MdOutlineLogout className=" text-xl md:text-2xl" />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrSignUser(response, addUser)}
            onError={() => console.log('error')}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
